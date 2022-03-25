import * as React from "react";
import {useState} from "react";
import * as d3 from "d3";
import SummaryCards from "./summary.js";
import EndValueChart from './endvaluechart.js';
import "./chartdata.css";
import { margin, marginTranslate, getSelectedOpacity, getUnselectedOpacity, getPerRunClassName, getPortfolioLineClassName, findByID, cleanupPrev, makeCurrency} from './common.js';

function Chart (props) {
  
    // TODO review all chart state vars after refactoring
    const [avgAdjEndValueState, setAvgAdjEndValueState] = useState(0);
    const [medianAdjEndValueState, setMedianAdjEndValueState] = useState(0);
    const [minAdjEndValueState, setMinAdjEndValueState] = useState(0);
    const [maxAdjEndValueState, setMaxAdjEndValueState] = useState(0);

    const [avgReturnsState, setAvgReturnsState] = useState(0);
    const [medianReturnsState, setMedianReturnsState] = useState(0);
    const [minReturnsState, setMinReturnsState] = useState(0);
    const [maxReturnsState, setMaxReturnsState] = useState(0);

    const [pctPositiveNetState, setPctPositiveNetState] = useState(0);
    const [numGreaterThanStartState, setNumGreaterThanStartState] = useState(0);
    const [numFailsState, setNumFailsState] = useState(0);
    const [minFailAgeState, setMinFailAgeState] = useState(0);

    const svgCycleChartID = 'd3cycletarget';
    const perRunClass = getPerRunClassName() + svgCycleChartID;
    const hoverLineID = 'hoverLine';
    const ttWrapID = 'ttwrapper';
    const ttBackID = 'ttbackground';
    const ttAgeID = 'ttage';
    const ttValueID = 'ttvalue';
    const ttClass = 'tooltip';
    const totalWidth = 960;
    const totalHeight = 400;
    const boundedWidth = totalWidth - margin.left - margin.right;
    const boundedHeight = totalHeight - margin.top - margin.bottom;
    const tooltipWidth = 75;
    const tooltipHeight = 50;
    const normalStrokeWidth = 1.5;

    const getXScale = () => { 
        var xExt = [props.currentage, props.lifeexpectancy];
        return d3.scaleLinear()
                    .domain(xExt)
                    .range([ 0, boundedWidth ]);
    }

    const getYDomain = () => {
        var yDom = [+(props.portmin), +(props.portmax)];

        if ((null !== props.minzoom) &&
            (null !== props.maxzoom)) {
            yDom[0] = +(props.minzoom);
            yDom[1] = +(props.maxzoom);
        }
        return yDom;
    }

    const getYScale = (rangeMin, rangeMax) => {
        var yExt = [rangeMin, rangeMax];
        return d3.scaleLinear()
                    .domain(yExt)
                    .range([ boundedHeight, 0 ]);
    }

    const getHoverLine = () => {
        return findByID(hoverLineID);
    }

    const getTooltipWrapper = () => {
        return findByID(ttWrapID);
    }

    const getTooltipBackground = () => {
        return findByID(ttBackID);
    }

    const getTooltipAgeSpan = () => {
        return findByID(ttAgeID);
    }

    const getTooltipValueSpan = () => {
        return findByID(ttValueID);
    }

    const handleMouseOver = (e) => {
        getHoverLine().style('opacity', 1);
        getTooltipWrapper().attr('display', null);
    }

    const handleMouseMove = (e) => {
        const bisect = d3.bisector((d) => d.age).left;
        var xScaleIn = getXScale();
        var yDom = getYDomain();
        var yScaleIn = getYScale(yDom[0], yDom[1]);
        const coords = d3.pointer(e);
        const x0 = xScaleIn.invert(coords[0]);
        const y0 = yScaleIn.invert(coords[1]);
        const oneCycleData = props.cycledata[0];
        const i = bisect(oneCycleData, x0, 1);
        const selectedData = oneCycleData[i];
        const clientX = xScaleIn(selectedData.age);
        var tooltipX = clientX;
        
        // prevent the tooltip from getting clipped.
        const tooltipWidth = 75;             
        if (boundedWidth <= (clientX + tooltipWidth)) {
            tooltipX = clientX - tooltipWidth;
        }
        getTooltipAgeSpan().text('age: ' + selectedData.age);

        getTooltipValueSpan().text(makeCurrency(y0));

        const ttBounds = getTooltipWrapper().node().getBBox();
        getTooltipBackground()                
            .attr('width', ttBounds.width)
            .attr('height', ttBounds.height);

        getTooltipWrapper().attr("transform", "translate(" + tooltipX + "," + coords[1] + ")");  

        getHoverLine().attr('x', clientX);
        getTooltipWrapper().attr('x', tooltipX);
    };
    
    const handleMouseLeave = () => {
        getHoverLine().style('opacity', 0);
        getTooltipWrapper().attr('display', 'none');
    };

    const getAggReturns = (allCycleData) => {
        var retVal = [];

        for (var iCycle = 0; iCycle < allCycleData.length; iCycle++) {
            for (var year = 0; year < allCycleData[iCycle].length; year++) {
                const oneYear = allCycleData[iCycle][year];
                retVal.push(oneYear.aggReturn);
            }
        }

        return retVal;
    }

    const getNetDeltas = (allCycleData) => {
        var retVal = [];

        for (var iCycle = 0; iCycle < allCycleData.length; iCycle++) {
            for (var year = 0; year < allCycleData[iCycle].length; year++) {
                const oneYear = allCycleData[iCycle][year];
                retVal.push(oneYear.netDelta);
            }
        }

        return retVal;
    }

    const getPctPositiveNet = (netDeltas) => {
        var numPos = 0;

        for (var i = 0; i < netDeltas.length; i++) {
            if (0 < netDeltas[i]) {
                numPos++;
            }
        }

        return (numPos / netDeltas.length);
    }

    React.useEffect(() => {
            
        const calcSummaryData = () => {
            const allCycles = props.cycledata;
            const allCyclesMeta = props.cyclemeta;
    
            var extAdjEnd = d3.extent(allCyclesMeta, (d) => d.adjEndCycleValue);
            var avgAdjEnd = d3.mean(allCyclesMeta, (d) => d.adjEndCycleValue);
            var medAdjEnd = d3.median(allCyclesMeta, (d) => d.adjEndCycleValue);
    
            var aggReturns = getAggReturns(allCycles);
            var avgReturns = d3.mean(aggReturns);
            var medianReturns = d3.median(aggReturns);
            var extReturns = d3.extent(aggReturns);
    
            var netDeltas = getNetDeltas(allCycles);
            var pctPositiveNet = getPctPositiveNet(netDeltas);
    
            var numGreaterThanStart = 0;
            var numFails = 0;
            var minFailAge = props.lifeexpectancy + 1;
            var failAges = [];
    
            for (var i = 0; i < allCyclesMeta.length; i++) {
                if (1 < (allCyclesMeta[i].pctOfStart)) {
                    numGreaterThanStart++;
                }
                // look at failure cycles
                else if (allCyclesMeta[i].fail) {
                    minFailAge = Math.min(allCyclesMeta[i].failAge, minFailAge);
                    failAges[numFails] = allCyclesMeta[i].failAge;
                    numFails++;
                }
            }
    
            setAvgAdjEndValueState(avgAdjEnd);
            setMedianAdjEndValueState(medAdjEnd);
            setMinAdjEndValueState(extAdjEnd[0]);
            setMaxAdjEndValueState(extAdjEnd[1]);
    
            setAvgReturnsState(avgReturns);
            setMedianReturnsState(medianReturns);
            setMinReturnsState(extReturns[0]);
            setMaxReturnsState(extReturns[1]);
    
            setPctPositiveNetState(pctPositiveNet);
            setNumFailsState(numFails);
            setNumGreaterThanStartState(numGreaterThanStart);
            setMinFailAgeState(minFailAge);
        }

        const drawAxes = (svg, xScaleIn, yScaleIn) => {
 
            svg.append("g")
                .attr("class", perRunClass)
                .attr("transform", "translate(0," + boundedHeight + ")")
                .call(d3.axisBottom(xScaleIn));
            svg.append("g")
                .attr("class", perRunClass)
                .call(d3.axisLeft(yScaleIn).tickFormat(d3.format('$,')));
        };
    
        const drawPortfolioLine = (svg, xScaleIn, yScaleIn, oneCycleMeta, oneCycle) => {
    
            const classNames = perRunClass + ' ' 
                                + getPortfolioLineClassName() + ' ' 
                                + oneCycleMeta.lineColor;
            var lineOpacity = getSelectedOpacity();

            if ((null != props.zoomcolor) && 
                (props.zoomcolor !== oneCycleMeta.lineColor)) {
                lineOpacity = getUnselectedOpacity();
            }

            svg.append("path")
                .datum(oneCycle)
                .attr('id', oneCycleMeta.startYear)
                .attr('class', classNames)
                .attr("fill", "none")
                .attr("pointer-events", "none")
                .style("opacity", lineOpacity)
                .attr("stroke", oneCycleMeta.lineColor)
                .attr("stroke-width", normalStrokeWidth)
                .attr("d", d3.line()
                            .x(function(d) { return xScaleIn(d.age) })
                            .y(function(d) { return yScaleIn(d.adjEndValue) }));
        }
                
        const drawChart = (svg) => {

            const xScale = getXScale();
            const yDom = getYDomain();
            const yScale = getYScale(yDom[0], yDom[1]);
            const allCyclesData = props.cycledata;
            const allCyclesMeta = props.cyclemeta;
            const numCycles = +(props.numcycles);
    
            drawAxes(svg, xScale, yScale);
            for (var i = 0; i < numCycles; i++) {
                drawPortfolioLine(svg, xScale, yScale, allCyclesMeta[i], allCyclesData[i]);
            }
        }    

        const prepHoverStuff = (svg) => {
            const className = perRunClass + ' ' + ttClass;
            const tooltipWrapper = svg
                    .append('g')
                    .attr('id', ttWrapID)
                    .attr('class', className)
                    .attr('display', 'none');
            
            tooltipWrapper.append('rect')
                            .style('opacity', 0.70)
                            .attr('id', ttBackID)
                            .attr('class', className)
                            .attr('width', tooltipWidth)
                            .attr('height', tooltipHeight)
                            .attr("pointer-events", "none")
                            .attr("fill", "#e8e8e8"); 
    
            const tooltipText = tooltipWrapper.append('g').append('text');
    
            tooltipText.attr("pointer-events", "none")
                        .attr('class', className)
                        .attr('font-weight', 'bolder')
                        .attr('text-anchor', 'left');
                        
            tooltipText.append('tspan')
                        .attr('id', ttAgeID)
                        .attr('class', className)
                        .attr("pointer-events", "none")
                        .attr('x', '5')
                        .attr('y', '5')
                        .attr('dy', '15px');
            
            tooltipText.append('tspan')
                        .attr('id', ttValueID)
                        .attr('class', className)
                        .attr("pointer-events", "none")
                        .attr('x', '5')
                        .attr('y', '5')
                        .attr('dy', '35px');
    
            svg.append("g")
               .append("rect")
                .style('opacity', 0)
                .attr('id', hoverLineID)
                .attr('class', className)
                .attr("pointer-events", "none")
                .attr("class", "dotted")
                .attr("stroke-width", "1px")
                .attr("width", ".5px")
                .attr("height", boundedHeight);
            
        }

        const svg = findByID(svgCycleChartID)
                      .append("g")
                      .attr("transform", marginTranslate);
        const chartGroup = svg.append('g');
        const tooltipGroup = svg.append('g');

        cleanupPrev(perRunClass);
        calcSummaryData();
        drawChart(chartGroup);
        prepHoverStuff(tooltipGroup);

        // console.log('chart : e');
        // eslint-disable-next-line
    }, [
        props.portfoliovalue,
        props.portmin, 
        props.portmax,
        props.cycledata, 
        props.cyclemeta, 
        props.numcycles, 
        props.currentage,
        props.lifeexpectancy, 
        props.minzoom,
        props.maxzoom,
        props.zoomcolor,
        props.selectedbin,
    ] );

    // console.log('chart : r');

    return (
        <div>
            <SummaryCards 
             fails={numFailsState} cycles={props.numcycles}
             numgreaterthanstart={numGreaterThanStartState}
             minfailage={minFailAgeState} 
             medianendvalue={medianAdjEndValueState} avgendvalue={avgAdjEndValueState}
             minendvalue={minAdjEndValueState} maxendvalue={maxAdjEndValueState}
             medianreturns={medianReturnsState} avgreturns={avgReturnsState}
             minreturns={minReturnsState} maxreturns={maxReturnsState}
             netpositivepct={pctPositiveNetState}
             />
            <svg id={svgCycleChartID} 
                    width={totalWidth}
                    height={totalHeight} 
            >
                <rect id='trackingRect'
                    style={{ opacity:0 }}
                    width={boundedWidth}
                    height={boundedHeight}
                    transform={marginTranslate}
                    fill='LightGrey'
                    onMouseEnter={handleMouseOver}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                />
            </svg>  
            <EndValueChart 
             startvalue={props.portfoliovalue} 
             minendvalue={minAdjEndValueState} 
             maxendvalue={maxAdjEndValueState} 
             medianendvalue={medianAdjEndValueState}
             metadata={props.cyclemeta} 
             cyclechartid={svgCycleChartID} 
             zoomcallback={props.zoomcallback}
             zoomcolor={props.zoomcolor}
             selectedbin={props.selectedbin}
             />            
        </div>
    );
};

export default Chart;
