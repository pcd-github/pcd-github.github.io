import * as React from "react";
import {useState} from "react";
import * as d3 from "d3";
import SummaryCards from "./summary.js";
import EndValueChart from './endvaluechart.js';
import "./chartdata.css";
import { histData } from "./histdata.js";
import { getAvgEquityReturn, getStdDevEquityReturn } from "./histdata.js";
import { makeCurrency, makePct, getColorStringForRelativeValue, getPerRunClassName, getPortfolioLineClassName, cleanupPrev, findByID} from './common.js';

function Chart (props) {
  
    const [allCycleDataState, setAllCycleDataState] = useState([]);
    const [allCycleMetaState, setAllCycleMetaState] = useState([]);

    const [avgAdjEndValueState, setAvgAdjEndValueState] = useState(0);
    const [medianAdjEndValueState, setMedianAdjEndValueState] = useState(0);
    const [minAdjEndValueState, setMinAdjEndValueState] = useState(0);
    const [maxAdjEndValueState, setMaxAdjEndValueState] = useState(0);

    const [avgReturnsState, setAvgReturnsState] = useState(0);
    const [medianReturnsState, setMedianReturnsState] = useState(0);
    const [minReturnsState, setMinReturnsState] = useState(0);
    const [maxReturnsState, setMaxReturnsState] = useState(0);

    const [pctPositiveNetState, setPctPositiveNetState] = useState(0);
    const [numCyclesState, setNumCyclesState] = useState(0);
    const [numFailsState, setNumFailsState] = useState(0);
    const [minFailAgeState, setMinFailAgeState] = useState(0);
    const [medianFailAgeState, setMedianFailAgeState] = useState(0);

    const svgCycleChartID = 'd3cycletarget';
    const perRunClass = getPerRunClassName();
    const hoverLineID = 'hoverLine';
    const ttWrapID = 'ttwrapper';
    const ttBackID = 'ttbackground';
    const ttAgeID = 'ttage';
    const margin = { top: 40, right: 65, bottom: 40, left: 65 };
    const totalWidth = 960;
    const totalHeight = 500;
    const boundedWidth = totalWidth - margin.left - margin.right;
    const boundedHeight = totalHeight - margin.top - margin.bottom;
    const tooltipWidth = 75;
    const tooltipHeight = 75;
    const marginTranslate = "translate(" + margin.left + "," + margin.top + ")";
    const normalStrokeWidth = 1.5;
    var allCycleMeta = [];

    const getXScale = () => { 
        var xExt = [props.currentage, props.lifeexpectancy];
        return d3.scaleLinear()
                    .domain(xExt)
                    .range([ 0, boundedWidth ]);
    }

    const getYScale = (rangeMin, rangeMax) => {
        var yExt = [rangeMin, rangeMax];
        return d3.scaleLinear()
                    .domain(yExt)
                    .range([ boundedHeight, 0 ]);
    }

    const drawAxes = (svg, xScaleIn, yScaleIn, rangeMin, rangeMax) => {
 
        svg.append("g")
            .attr("class", perRunClass)
            .attr("transform", "translate(0," + boundedHeight + ")")
            .call(d3.axisBottom(xScaleIn));
        svg.append("g")
            .attr("class", perRunClass)
            .call(d3.axisLeft(yScaleIn));
    };

    const drawPortfolioLine = (svg, xScaleIn, yScaleIn, oneCycleMeta, oneCycle) => {

        const classNames = perRunClass + ' ' 
                            + getPortfolioLineClassName() + ' ' 
                            + oneCycleMeta.lineColor;
        svg.append("path")
            .datum(oneCycle)
            .attr('id', oneCycleMeta.startYear)
            .attr('class', classNames)
            .attr("fill", "none")
            .attr("pointer-events", "none")
            .style("opacity", 1)
            .attr("stroke", oneCycleMeta.lineColor)
            .attr("stroke-width", normalStrokeWidth)
            .attr("d", d3.line()
                        .x(function(d) { return xScaleIn(d.age) })
                        .y(function(d) { return yScaleIn(d.adjEndValue) })
            );        
    }

    const prepHoverStuff = (svg) => {
        const tooltipWrapper = svg
                .append('g')
                .attr('id', ttWrapID)
                .attr('display', 'none');
        
        tooltipWrapper.append('rect')
                        .style('opacity', 0.70)
                        .attr('id', ttBackID)
                        .attr('width', tooltipWidth)
                        .attr('height', tooltipHeight)
                        .attr("pointer-events", "none")
                        .attr("fill", "#e8e8e8"); 

        const tooltipText = tooltipWrapper.append('g').append('text');

        tooltipText.attr("pointer-events", "none")
                    .attr('font-weight', 900)
                    .attr('text-anchor', 'left');
                    
        tooltipText.append('tspan')
                    .attr('id', ttAgeID)
                    .attr('x', '5')
                    .attr('y', '5')
                    .attr('dy', '15px')
                    .attr("pointer-events", "none");

        svg.append("g")
           .append("rect")
            .style('opacity', 0)
            .attr('id', hoverLineID)
            .attr("pointer-events", "none")
            .attr("class", "dotted")
            .attr("stroke-width", "1px")
            .attr("width", ".5px")
            .attr("height", boundedHeight);
        
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

    const handleMouseDown = (e) => {
        var bondReturns = getBondReturns();
        var avgBondReturns = d3.mean(bondReturns);
        var stdBondReturns = d3.deviation(bondReturns);

        console.log('equity avg return:' + 
                    makePct(getAvgEquityReturn()) + 
                    ' equity sdev:' + makePct(getStdDevEquityReturn()) +
                    ' bond avg return:' + makePct(avgBondReturns) +
                    ' bond sdev:' + makePct(stdBondReturns)
                    );
    }

    const handleMouseOver = (e) => {
        getHoverLine().style('opacity', 1);
        getTooltipWrapper().attr('display', null);
    }

    const handleMouseMove = (e) => {
        const bisect = d3.bisector((d) => d.age).left;
        var xScaleIn = getXScale();
        const coords = d3.pointer(e);
        const x0 = xScaleIn.invert(coords[0]);
        const oneCycleData = allCycleDataState[0];
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

    /*
    const dumpCycleData = (oneCycle) => {
        for (var i = 0; i < oneCycle.length; i++) {

            console.log(oneCycle[i].year + 
                ' st:' + makeCurrency(oneCycle[i].beginValue) +
                ' cpi:' + Number(oneCycle[i].cumulativeCPI).toFixed(2) + 
                ' sp:' + makeCurrency(oneCycle[i].actualSpend) + 
                ' e$:' + makeCurrency(oneCycle[i].equityAppr) +
                ' d$:' + makeCurrency(oneCycle[i].divAppr) +
                ' b$:' + makeCurrency(oneCycle[i].bondAppr) +
                ' f$: ' + makeCurrency(oneCycle[i].fees) + 
                ' ae$: ' + makeCurrency(oneCycle[i].adjEndValue)
                );
        }
    }
     */

    const calcBondYield = (bondStake, histIndex) => {
        
        var retValue = 0;

        // if we're at the end of the cycle, use the simplified calculation
        if (histData.length <= (histIndex + 1)) {
            retValue = bondStake * histData[histIndex].bonds;
        }
        else {
            var bg1 = (1 - Math.pow(1 + histData[histIndex + 1].bonds, -9 ))
                      * histData[histIndex].bonds;
            bg1 = bg1 / histData[histIndex + 1].bonds;
            
            var bg2 = 1 / Math.pow(1 + histData[histIndex + 1].bonds, 9);
            bg2 = bg2 - 1;

            retValue = bondStake * (bg1 + bg2 + histData[histIndex].bonds);
        }

        return retValue;
    }

    const findHistStartIndex = (startDataYear) => {
        const firstYear = histData[0].year;
        const offset = startDataYear - firstYear;

        return offset;
    }

    const calcAnnualAggReturn = (oneYear, stockPct, bondPct) => {

        var retVal = (oneYear.equityReturn * stockPct) + (oneYear.bondReturn * bondPct);
        
        if (isNaN(retVal)) {
            if (1 === stockPct) {
                retVal = oneYear.equityReturn;
            }
            else if (1 === bondPct) {
                retVal = oneYear.bondReturn;
            }
            else {
                retVal = 0;
                console.log('unexpected aggReturn result- equity :(' + 
                            makePct(oneYear.equityReturn) + ',' + makePct(stockPct) + ') ' +
                            ' bond:(' +
                            makePct(oneYear.bondReturn) + ',' + makePct(bondPct) + ')');
            }
        }

        return retVal;
    }
    const runCycle = (startIndex, numYears) => {
        var cycleData = [];
        const stockPct = +(props.stockallocation) / 100;
        const bondPct = +(props.bondallocation) / 100;
        const feePct = +(props.feepct) / 100;
        const ssAge = +(props.ssage);
        const ssIncome = +(props.ssincome);
        const startCPI = histData[startIndex].cpi;

        for(var i = 0; i < numYears; i++){
            var obj = { "year": histData[startIndex + i].year,
                        "age": +(props.currentage) + i,
                        "beginValue": (i > 0) ? cycleData[i - 1].endValue : +(props.portfoliovalue),
                        "equityReturn": histData[startIndex + i].equity,
                        "equityAppr": 0,
                        "divAppr": 0,
                        "bondReturn": 0,
                        "bondAppr": 0,
                        "aggReturn": 0,
                        "cumulativeCPI": histData[startIndex + i].cpi / startCPI,
                        "spend": +(props.spendvalue),
                        "actualSpend": +(props.spendvalue),
                        "fees": 0,
                        "netDelta": 0,
                        "endValue": 0,
                        "adjEndValue": 0,
                        "appr": 0,
                        "adjAppr": 0,
                      };
            // adjust spend for cumultative cpi
            obj.actualSpend = obj.spend * obj.cumulativeCPI;
            // apply ss adjustment if applicable
            var adjustment = (ssAge <= obj.age) ? (ssIncome * obj.cumulativeCPI) : 0;
            obj.actualSpend -= adjustment;
            // port1 = subtract spend from start port
            obj.endValue = obj.beginValue - obj.actualSpend;
            if (0 < obj.endValue) {
                var startStockValue = obj.endValue * stockPct;
                // e growth = port1 * e-share * e-growth
                obj.equityAppr = startStockValue * obj.equityReturn;
                // calc dividends
                obj.divAppr = startStockValue * histData[startIndex + i].dividends;
                // b growth = port1 * b=share * b-growth
                obj.bondAppr = calcBondYield(obj.endValue * bondPct, startIndex + i);
                obj.bondReturn = obj.bondAppr / (obj.beginValue * bondPct);
                obj.aggReturn = calcAnnualAggReturn(obj, stockPct, bondPct);
                // port2 = port1 + e-growth + b-growth
                obj.appr = obj.equityAppr + obj.divAppr + obj.bondAppr;
                obj.endValue += obj.appr;
                // end port = port2 - (fees (based on cpi-adj value))
                obj.fees = (obj.beginValue + obj.appr) * feePct;
                obj.endValue -= obj.fees;

                // total +/- for the year
                obj.netDelta = obj.appr - obj.actualSpend - obj.fees;

                /*
                console.log('y:' + obj.year + ' agg%:' + makePct(obj.aggReturn) + 
                            ' appr$:' + makeCurrency(obj.appr) + 
                            ' spend+fee$:' + makeCurrency((obj.actualSpend + obj.fees)) + 
                            ' delta$' + makeCurrency(obj.netDelta));
                            */

                obj.adjEndValue = obj.endValue / obj.cumulativeCPI;
                obj.adjAppr = obj.appr / obj.cumulativeCPI;
                cycleData.push(obj);
            }
            else {
                obj.endValue = obj.adjEndValue = 0;
                cycleData.push(obj);
                break;
            }
        }
        return cycleData;
    }

    const getBondReturns = () => {
        var retVal = [];

        for (var iCycle = 0; iCycle < allCycleDataState.length; iCycle++) {
            for (var year = 0; year < allCycleDataState[iCycle].length; year++) {
                const oneYear = allCycleDataState[iCycle][year];
                retVal.push(oneYear.bondReturn);
            }
        }

        return retVal;
    }

    const getAggReturns = (allCycles) => {
        var retVal = [];

        for (var iCycle = 0; iCycle < allCycles.length; iCycle++) {
            for (var year = 0; year < allCycles[iCycle].length; year++) {
                const oneYear = allCycles[iCycle][year];
                retVal.push(oneYear.aggReturn);
            }
        }

        return retVal;
    }

    const getNetDeltas = (allCycles) => {
        var retVal = [];

        for (var iCycle = 0; iCycle < allCycles.length; iCycle++) {
            for (var year = 0; year < allCycles[iCycle].length; year++) {
                const oneYear = allCycles[iCycle][year];
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

    const calcCycleMeta = (oneCycle) => {
        var extAdjEndValue = d3.extent(oneCycle, (d) => d.adjEndValue);
        var avgAdjEndValue = d3.mean(oneCycle, (d) => d.adjEndValue);
        var medAdjEndValue = d3.median(oneCycle, (d) => d.adjEndValue);
        var totalSpend = d3.sum(oneCycle, (d) => d.actualSpend);
        var totalAppr = d3.sum(oneCycle, (d) => d.appr);
        var totalAdjAppr = d3.sum(oneCycle, (d) => d.adjAppr);
        var pctStart = oneCycle[oneCycle.length - 1].adjEndValue / props.portfoliovalue;
        const thisLineColor = getColorStringForRelativeValue(pctStart);
        var extAggReturn = d3.extent(oneCycle, (d) => d.aggReturn);
        var avgAggReturn = d3.mean(oneCycle, (d) => d.aggReturn);
        var medAggReturn = d3.median(oneCycle, (d) => d.aggReturn);

        var oneMeta = {
            'startCycleValue': props.portfoliovalue,
            'endCycleValue': oneCycle[oneCycle.length - 1].endValue,
            'adjEndCycleValue': oneCycle[oneCycle.length - 1].adjEndValue,
            'extent': extAdjEndValue,
            'mean': avgAdjEndValue,
            'median': medAdjEndValue,
            'pctOfStart': pctStart,
            'totalSpend': totalSpend,
            'totalAppreciation': totalAppr,
            'totalAdjAppreciation': totalAdjAppr,
            'extAggReturn': extAggReturn,
            'avgAggReturn': avgAggReturn,
            'medAggReturn': medAggReturn,
            'fail': (0 >= oneCycle[oneCycle.length - 1].adjEndValue),
            'failAge': (0 >= oneCycle[oneCycle.length - 1].adjEndValue) ? 
                       (oneCycle.length + props.currentage) :
                       undefined,
            'startYear': oneCycle[0].year,
            'cycleData': oneCycle,
            'lineColor': thisLineColor,
        };

        return oneMeta;
    }

    const calcSummaryData = (allCycles) => {

        var extAdjEnd = d3.extent(allCycleMeta, (d) => d.adjEndCycleValue);
        var avgAdjEnd = d3.mean(allCycleMeta, (d) => d.adjEndCycleValue);
        var medAdjEnd = d3.median(allCycleMeta, (d) => d.adjEndCycleValue);

        var aggReturns = getAggReturns(allCycles);
        var avgReturns = d3.mean(aggReturns);
        var medianReturns = d3.median(aggReturns);
        var extReturns = d3.extent(aggReturns);

        var netDeltas = getNetDeltas(allCycles);
        var pctPositiveNet = getPctPositiveNet(netDeltas);

        var numFails = 0;
        var minFailAge = props.lifeexpectancy + 1;
        var failAges = [];

        for (var i = 0; i < allCycleMeta.length; i++) {
            if (allCycleMeta[i].fail) {
                minFailAge = Math.min(allCycleMeta[i].failAge, minFailAge);
                failAges[numFails] = allCycleMeta[i].failAge;
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
        setNumCyclesState(allCycleMeta.length);
        setNumFailsState(numFails);
        setMinFailAgeState(minFailAge);
        setMedianFailAgeState(d3.median(failAges));
    }

    const calcCycles = (svg) => {
        const lifetime = props.lifeexpectancy - props.currentage + 1;
        const startDataYear = props.startdatayear;
        const endDataYear = props.enddatayear;
        // TODO : require numCycles to be greater than zero
        const numCycles = (endDataYear - startDataYear + 2) - lifetime;
        const startIndex = findHistStartIndex(startDataYear);
        var portMin = Number.POSITIVE_INFINITY;
        var portMax = Number.NEGATIVE_INFINITY;
        var allCycles = [];

        cleanupPrev();

        for (var i = 0; i < numCycles; i++) {
            var oneCycle = runCycle(startIndex + i, lifetime);
            var cycleMeta = calcCycleMeta(oneCycle);
            
            allCycleMeta[i] = cycleMeta;
            allCycles[i] = oneCycle;

            portMin = Math.min(portMin, cycleMeta.extent[0]);
            portMax = Math.max(portMax, cycleMeta.extent[1]);
        }

        setAllCycleDataState(allCycles);
        setAllCycleMetaState(allCycleMeta);

        calcSummaryData(allCycles);

        const xScale = getXScale();
        const yScale = getYScale(portMin, portMax);

        drawAxes(svg, xScale, yScale, portMin, portMax);
        for (i = 0; i < numCycles; i++) {
            drawPortfolioLine(svg, xScale, yScale, allCycleMeta[i], allCycles[i]);
        }
    }

   React.useEffect(() => {

        const svg = findByID(svgCycleChartID)
                      .append("g")
                      .attr("transform", marginTranslate);
        calcCycles(svg);

        prepHoverStuff(svg);
    }, [props] );

    return (
        <div>
            <SummaryCards 
             fails={numFailsState} cycles={numCyclesState}
             minfailage={minFailAgeState} medianfailage={medianFailAgeState} 
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
                    onMouseDown={handleMouseDown}
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
             metadata={allCycleMetaState} 
             cyclechartid={svgCycleChartID} />            
        </div>
    );
};

export default Chart;
