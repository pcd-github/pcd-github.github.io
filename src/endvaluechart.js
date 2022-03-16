import * as React from "react";
import * as d3 from "d3";
import { getSelectedOpacity, getUnselectedOpacity, cleanupPrev, makeCurrency, makePct, getPerRunClassName, getThresholdValues, getColorStringForRelativeValue, findByID } from "./common.js";

function EndValueChart (props) {

    const svgBinChartID = 'endvaluechartsvg';
    const perRunClass = getPerRunClassName() + svgBinChartID;
    const ttBinWrapID = 'ttevwrap';
    const ttBinBackID = 'ttevback';
    const ttBinRangeID = 'ttevrange';
    const ttBinPctID = 'ttevpct';
    const pathGroupID = 'pathgroupid';
    const totalWidth = 960;
    const totalHeight = 300;
    const tooltipWidth = 75;
    const tooltipHeight = 75;

    const calcBinMetadata = (data) => {
        const oneBinMetadata = {
            'binData': data,
            'extBin': d3.extent(data, (d) => d.adjEndCycleValue),
            'extPctStartValue': d3.extent(data, (d) => d.pctOfStart),
            'binCount': data.length,
        }

        return oneBinMetadata;
    }

    const getTooltip = () => {
        return findByID(ttBinWrapID);
    }

    const getTooltipBackground = () => {
        return findByID(ttBinBackID);
    }

    const getBinRangeSpan = () => {
        return findByID(ttBinRangeID);
    }

    const getBinPctSpan = () => {
        return findByID(ttBinPctID);
    }

    const getBinExtents = (thisBin) => {
        var retVal = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];

        for (var i = 0; i < thisBin.length; i++) {
            var oneExt = d3.extent(thisBin[i].cycleData, (d) => d.adjEndValue);
            retVal[0] = Math.min(retVal[0], oneExt[0]);
            retVal[1] = Math.max(retVal[1], oneExt[1]);
        }

        return retVal;
    }

    const handleMouseDown = (e) => {
        const thisBin = e.srcElement.__data__;
        var colorString = null;
        var zoomMin = null;
        var zoomMax = null;
        var selectedBin = null;

        if (props.selectedbin !== thisBin.x0) {
            const valueRatio = (thisBin.x0) / props.startvalue;
            var binExt = getBinExtents(thisBin);
            colorString = getColorStringForRelativeValue(valueRatio);   
            zoomMin = binExt[0];
            zoomMax = binExt[1]; 
            selectedBin = thisBin.x0;
        }

        props.zoomcallback(zoomMin, zoomMax, colorString, selectedBin);
    }

    const handleMouseOver = (e) => {
        getTooltip().style('opacity', 1);
    }

    const handleMouseMove = (e) => {

        const binData = e.srcElement.__data__;
        const binMeta = calcBinMetadata(binData);
        
        // set the tt content
        const rangeString = makeCurrency(+(binMeta.extBin[0])) + 
                            '-' + makeCurrency(+(binMeta.extBin[1]));
        const binSizeString = ' ' + makePct(binData.length / props.metadata.length) +
                              ' of cycles';
        getBinRangeSpan().text(rangeString);
        getBinPctSpan().text(binSizeString);

        // place the tt
        const tt = getTooltip();
        const ttBounds = tt.node().getBBox();
        getTooltipBackground()                
            .attr('width', ttBounds.width)
            .attr('height', ttBounds.height);
    };
    
    const handleMouseLeave = () => {
        getTooltip().style('opacity', 0);
    };

    React.useEffect(() => {

        const margin = { top: 40, right: 65, bottom: 40, left: 65 };
        const marginTranslate = "translate(" + margin.left + "," + margin.top + ")";    
        const boundedWidth = totalWidth - margin.left - margin.right;
        const boundedHeight = totalHeight - margin.top - margin.bottom;    

        const getCurrencyThresholds = () => {
            const pctThresholds = getThresholdValues();
            const currencyThresholds = [];
    
            // create failure bin
            currencyThresholds[0] = 0;
            currencyThresholds[1] = 0.01;
            // start at index 1, as we've handled the zero case.  
            // Consider removing zero from the common thresholds.
            // for now, offset the first entry in the currency array to accomodate the failure bin.
            for (var i = 1; i < pctThresholds.length; i++) {
                currencyThresholds[i+1] = pctThresholds[i] * props.startvalue;
            }
    
            return currencyThresholds;
        }
    
        const getXScaleForAxis = () => {
            const thresholdValues = getCurrencyThresholds();
            const numThresholds = thresholdValues.length;
            var thresholdRange = [];
            var thresholdInc = boundedWidth / (numThresholds + 1);
    
            for (var i = 0; i <= thresholdValues.length; i++) {
                thresholdRange[i] = i * thresholdInc;
            }
    
            return d3.scaleThreshold()
                     .domain(thresholdValues)
                     .range(thresholdRange);
        }
        
        const createBins = (currencyThresholdValues) => {

            const binFunc = d3.bin()
                              .value(function(d) { return d.adjEndCycleValue; })   
                              .domain([currencyThresholdValues[0], 
                                       currencyThresholdValues[currencyThresholdValues.length - 1]])
                              .thresholds(currencyThresholdValues); 
    
            return binFunc(props.metadata);
        }    

        const getBinOpacity = (thisBin) => {

            var retVal = getSelectedOpacity();

            if ((null !== props.selectedbin) &&
                (thisBin !== props.selectedbin) ) {
                retVal = getUnselectedOpacity();
            }

            return retVal;
        }

        const drawHistogram = (svg) => {
            const currencyThresholdValues = getCurrencyThresholds();
            const bins = createBins(currencyThresholdValues);        
            const xScale = getXScaleForAxis(currencyThresholdValues);
            const yScale = d3.scaleLinear()
                             .domain([0, d3.max(bins, function(d) { return d.length; })])
                             .range([boundedHeight, 0]);
            const histoBarClass = 'histobarclass';
    
            // x/y axes
            svg.append("g")
                .attr("class", perRunClass)
                .attr("transform", "translate(0," + boundedHeight + ")")
                .call(d3.axisBottom(xScale));
            svg.append("g")
                .attr("class", perRunClass)
                .call(d3.axisLeft(yScale));
                 
            var barGroup = svg.append('g')
                              .attr('class', perRunClass)
                              .attr('id', pathGroupID);
    
            // chart
            var bars = barGroup.selectAll('.' + histoBarClass);
            bars.data(bins)
                    .enter()
                    .append("rect")
                    .attr("class", perRunClass)
                    .attr("x", 1)
                    .attr("transform", function(d) { return "translate(" + xScale(d.x0) + "," + yScale(d.length) + ")"; })
                    .attr("width", function(d) { return xScale(d.x1) - xScale(d.x0) -1 ; })
                    .attr("height", function(d) { return boundedHeight - yScale(d.length); })
                    .style("fill",  function(d) { return getColorStringForRelativeValue(d.x0 / props.startvalue);})
                    .style("opacity", function(d) { return getBinOpacity(d.x0); } )
                    .on('mousedown', handleMouseDown)
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", handleMouseLeave)                
                    .on('mousemove', handleMouseMove);
        }
    
        const prepTooltip = (svg) => {
            // wrapper
            // background
            // text element
            //  tspan for each line
            //  x0, x1, % of start, % of results
    
            const tooltipWrapper = svg.append('g')
                                      .attr('id', ttBinWrapID)
                                      .attr("class", perRunClass)
                                      .style('opacity', 0);
            tooltipWrapper.append('rect')
                          .style('opacity', 0.70)
                          .attr('id', ttBinBackID)
                          .attr('width', tooltipWidth)
                          .attr('height', tooltipHeight)
                          .attr("pointer-events", "none")
                          .attr("fill", "#e8e8e8"); 
    
            const tooltipText = tooltipWrapper.append('g').append('text')
                                              .attr("pointer-events", "none")
                                              .attr('font-weight', 900)
                                              .attr('text-anchor', 'left');
            tooltipText.append('tspan')
                       .attr('id', ttBinRangeID)
                       .attr('x', '5')
                       .attr('y', '5')
                       .attr('dy', '15px')
                       .attr("pointer-events", "none");
            tooltipText.append('tspan')
                       .attr('id', ttBinPctID)
                       .attr('x', '5')
                       .attr('y', '5')
                       .attr('dy', '30px')
                       .attr("pointer-events", "none");
        }            

        const svg = findByID(svgBinChartID)
                      .append("g")
                      .attr("transform", marginTranslate);

        cleanupPrev(perRunClass);
        drawHistogram(svg);
        prepTooltip(svg);
        // eslint-disable-next-line
    }, [props.metadata, props.medianendvalue, props.startvalue, props.selectedbin, props.zoomcolor] );

    return (
        <div>
            <svg id={svgBinChartID}  
                width={totalWidth}
                height={totalHeight} 
             >
            </svg>
        </div>
    );
};

export default EndValueChart;
