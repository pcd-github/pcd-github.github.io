import * as React from "react";
import {useState} from "react";
import * as d3 from "d3";
import Button from '@mui/material/Button';
import { margin, getSelectedOpacity, getUnselectedOpacity, cleanupPrev, makeCurrency, makePct, getPerRunClassName, getThresholdValues, getColorStringForRelativeValue, findByID, dumpBinToCSVFile } from "./common.js";

function EndValueChart (props) {

    const [selectedBinDataState, setSelectedBinDataState] = useState(null);

    const svgBinChartID = 'endvaluechartsvg';
    const perRunClass = getPerRunClassName() + svgBinChartID;
    const ttBinSelectWrapID = 'ttbinselectwrap';
    const pathGroupID = 'pathgroupid';
    const selectBinString = 'select a bar to zoom to results';
    const totalWidth = 960;
    const totalHeight = 200;
    const evMargin = { top: 10, right: margin.right, bottom: 0, left: margin.left };
    const boundedWidth = totalWidth - evMargin.left - evMargin.right;
    const boundedHeight = totalHeight - evMargin.top - evMargin.bottom; 
    const evMarginTranslate = "translate(" + evMargin.left + "," + evMargin.top + ")";   
    const captionHeight = 45;

    const calcBinMetadata = (data) => {
        const oneBinMetadata = {
            'binData': data,
            'extBin': d3.extent(data, (d) => d.adjEndCycleValue),
            'extPctStartValue': d3.extent(data, (d) => d.pctOfStart),
            'binCount': data.length,
        }

        return oneBinMetadata;
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
        var thisBin = e.srcElement.__data__;
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
            setSelectedBinDataState(thisBin);
        }
        else {
            thisBin = null;
            setSelectedBinDataState(null);
        }

        props.zoomcallback(zoomMin, zoomMax, colorString, selectedBin, thisBin);
    }

    React.useEffect(() => {

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

        const getThresholdRange = (thresholdValues) => {
            const numThresholds = thresholdValues.length;
            var thresholdRange = [];
            var thresholdInc = boundedWidth / (numThresholds + 1);
    
            for (var i = 0; i <= thresholdValues.length; i++) {
                thresholdRange[i] = i * thresholdInc;
            }

            return thresholdRange;
        }
    
        const getXScaleForAxis = () => {
            const thresholdValues = getCurrencyThresholds();
            const thresholdRange = getThresholdRange(thresholdValues);
    
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

        const drawBinCaption = (svg, allBinData, xScale) => {

            const numCycles = props.metadata.length;

            // draw bin ranges below the x axis
            for (var i = 0; i < allBinData.length; i++) {
                if (0 !== allBinData[i].length) {
                    const binMeta = calcBinMetadata(allBinData[i]);
                    const xOffset = ((xScale(allBinData[i].x1) - xScale(allBinData[i].x0)) / 2 );      
                    const x = xOffset + xScale(allBinData[i].x0);
                    var y = boundedHeight - captionHeight; 
                    const binRangeWrapper = svg.append('g')
                                                .attr('id', ttBinSelectWrapID)
                                                .attr("class", perRunClass);

                    const axisText = binRangeWrapper.append('text')
                                    .attr('y', y)
                                    .style("font-size", "12px") 
                                    .attr('font-weight', 'bold')
                                    .attr('text-anchor', 'middle')                                   
                                    .attr("pointer-events", "none");

                    axisText.append('tspan')
                                    .text(makePct(allBinData[i].length / numCycles))
                                    .attr('x', x)
                                    .attr('dy', '0px')
                                    .attr("pointer-events", "none");
                    axisText.append('tspan')
                                    .text(makeCurrency(binMeta.extBin[0]))
                                    .attr('x', x)
                                    .attr('dy', '15px')
                                    .attr("pointer-events", "none");
                    if (binMeta.extBin[1] !== binMeta.extBin[0]) {
                        axisText.append('tspan')
                                .text('-' + makeCurrency(binMeta.extBin[1]))
                                .attr('x', x)
                                .attr('dy', '15px')
                                .attr("pointer-events", "none");
                    }
                }
            }
        }

        const drawSelectionText = (svg) => {
            const binSelectWrapper = svg.append('g')
                                      .attr('id', ttBinSelectWrapID)
                                      .attr("class", perRunClass);

            binSelectWrapper.append('g').append('text')
                            .text(selectBinString)
                            .attr('transform', evMarginTranslate)
                            .attr("pointer-events", "none")
                            .attr('font-weight', 'bold');
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
                .call(d3.axisBottom(xScale)
                        .tickFormat('')
                        .tickSize(20)
                     );
            svg.append("g")
                .attr("class", perRunClass)
                .call(d3.axisLeft(yScale)
                        .tickFormat('')
                        .tickSizeOuter(10)
                     );                 
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
                    .on('click', handleMouseDown);

            drawBinCaption(svg, bins, xScale);
            drawSelectionText(svg);
        }         

        const svg = findByID(svgBinChartID)
                      .append("g")
                      .attr("transform", evMarginTranslate);
        const chartGroup = svg.append('g');

        cleanupPrev(perRunClass);
        drawHistogram(chartGroup);
        // eslint-disable-next-line
    }, [props.metadata, props.startvalue, props.selectedbin, props.zoomcolor] );

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
