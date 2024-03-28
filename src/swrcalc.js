import * as d3 from "d3";
import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, InputLabel, MenuItem } from '@mui/material';
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { Slider } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from '@mui/material/Select';

import { histData, generateSourceData, generatePortfolioTestData } from "./histdata.js";
import { getColorStringForRelativeValue, dumpAllToCSVFile, dumpBinToCSVFile, makeCurrency, makePct } from './common.js';
import Chart from './chart.js';

const defaultPortfolioValue = 1250000;
const defaultAge = 62;
const defaultExpectancy = 95;
const defaultSpendValue = 50000;
const defaultStocks = 80;
const defaultFeePct = 0.18;
const defaultSSIncome = 0;
const defaultStartDataYear = histData[0].year;
const defaultEndDataYear = histData[histData.length - 1].year;
const maxExpectancy = 120;
const chartCompID = 'chartComponent';
const monteCarloString = 'montecarlo';
const historicalString = 'historical';
const defaultMCProjection = false;

class SWRCalc extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            currentAgeState: defaultAge,
            lifeExpectancyState: defaultExpectancy,
            portfolioValueState: defaultPortfolioValue,
            spendValueState: defaultSpendValue,
            spendModelState: 'dollars',
            stockAllocPctState: defaultStocks,
            feePctState: defaultFeePct,
            monteCarloProjectionState: defaultMCProjection,
            socialSecurityIncomeState: defaultSSIncome,
            socialSecurityAgeState: 67,
            useAllHistDataState: true,
            startDataYearState: defaultStartDataYear,
            endDataYearState: defaultEndDataYear,
            minZoomValueState: null,
            maxZoomValueState: null,
            zoomColorState: null,
            selectedBinState: null,
            selectedBinDataState: null,
        }

        this.sourceData = generateSourceData(this.state.monteCarloProjectionState, 
                                             this.state.lifeExpectancyState - this.state.currentAgeState + 1,
                                             this.state.startDataYearState,
                                             this.state.endDataYearState);
    }

    zoomChart (minZoom, maxZoom, colorKey, selectedBin, binData) {
        this.setState( {minZoomValueState : minZoom} );
        this.setState( {maxZoomValueState : maxZoom} );
        this.setState( {zoomColorState : colorKey} );
        this.setState( {selectedBinState : selectedBin });
        this.setState( {selectedBinDataState : binData})
    }

    render () { 

        const ssAgeSliderMarks = [
            {value : this.state.currentAgeState, label : this.state.currentAgeState },
            {value : 62, label : '62'},
            {value : 67, label : '67'},
            {value : 70, label : '70'},
            {value : this.state.lifeExpectancyState, label : this.state.lifeExpectancyState },
        ];    

        var portMin = this.state.portfolioValueState;
        var portMax = this.state.portfolioValueState;
        var allCycles = [];
        var allCyclesMeta = [];

        const handleAgeChange = (event) => {
            var newValue = +(event.target.value);

            if (newValue < this.state.lifeExpectancyState) {
                this.sourceData = generateSourceData(this.state.monteCarloProjectionState, 
                                                     this.state.lifeExpectancyState - newValue + 1,
                                                     this.state.startDataYearState,
                                                     this.state.endDataYearState);

                this.setState( { currentAgeState : newValue } ); 
                if (newValue >  this.state.socialSecurityAgeState) {
                    this.setState( { socialSecurityAgeState : newValue } );
                }
            }                          
        }

        const handleSave = (event) => {

            if (null === this.state.selectedBinDataState) {
                console.log('save all');
                dumpAllToCSVFile(allCycles);
            }
            else {
                console.log('save bin');
                dumpBinToCSVFile(this.state.selectedBinDataState);               
            }
        }

        const handleExpectChange = (event, newValue) => {

            if (newValue > this.state.currentAgeState) {
                this.sourceData = generateSourceData(this.state.monteCarloProjectionState, 
                                                newValue - this.state.currentAgeState + 1,
                                                this.state.startDataYearState,
                                                this.state.endDataYearState);
                this.setState( {lifeExpectancyState : newValue} );
            }
        }

        const handlePortfolioValueChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( { portfolioValueState: newValue } );
        }

        const handleSpendingValueChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {spendValueState : newValue});
        }

        const handleAllocChange = (event) => {             
            var newValue = +(event.target.value);
            this.setState( {stockAllocPctState : newValue} );
        }

        const handleFeePctChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {feePctState : newValue} ); 
        }

        const handleChangeSSAge = (event) => {
            var newValue = +(event.target.value);
            this.setState( {socialSecurityAgeState: newValue});
        }

        const handleSocialSecurityIncomeChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( { socialSecurityIncomeState : newValue });
        }

        const handleProjectionToggle = (event) => {
            var mcProj = (monteCarloString === event.target.value);
            this.sourceData = generateSourceData(mcProj, 
                                                 this.state.lifeExpectancyState - this.state.currentAgeState + 1,
                                                 this.state.startDataYearState,
                                                 this.state.endDataYearState);

            this.setState( { monteCarloProjectionState : mcProj } );
        }

        const handleDataRangeChange = (event, newValue) => {
            // restrict the range from being smaller than the user lifetime
            // (life expectancy - age)
            // we could permit this with monte carlo, but maybe later
            var lifetime = this.state.lifeExpectancyState - this.state.currentAgeState + 1;
            var rangeSize = newValue[1] - newValue[0];

            if (rangeSize >= lifetime) {
                this.sourceData = generateSourceData(this.state.monteCarloProjectionState, 
                                                     lifetime,
                                                     newValue[0],
                                                     newValue[1]);

                this.setState( { startDataYearState : newValue[0] } );
                this.setState( { endDataYearState : newValue[1] } );
            }
            else {
                console.log('bzzt - range smaller than user lifetime');
            }

        }

        const calcAnnualAggReturn = (beginValue, appr) => {
            return appr / beginValue;
        }        

        const calcBondYield = (bondStake, sourceIndex, sourceData) => {
                
            var retValue = 0;
            var h0 = sourceData[sourceIndex];
            var h1 = h0 + 1;

            // if we're at the end of the cycle, use the simplified calculation
            if (histData.length <= h1) {
                retValue = bondStake * histData[h0].bonds;
            }
            else {
                var bg1 = (1 - Math.pow(1 + histData[h1].bonds, -9 ))
                        * histData[h0].bonds;
                bg1 = bg1 / histData[h1].bonds;
                
                var bg2 = 1 / Math.pow(1 + histData[h1].bonds, 9);
                bg2 = bg2 - 1;

                retValue = bondStake * (bg1 + bg2 + histData[h0].bonds);
            }            

            return retValue;
        }

        const calcAnnualInflationRate = (sourceIndex) => {
            var prevYearIndex = Math.max(0, sourceIndex - 1);
            var inflRate = ( (histData[sourceIndex].cpi) / 
                             (histData[prevYearIndex].cpi)
                           ) - 1;

            return inflRate;
        }

        const applySpend = (thisCycle, sourceDataIndex) => {
            const ssAge = this.state.socialSecurityAgeState;
            const ssIncome = (0 !== this.state.socialSecurityAgeState) ? this.state.socialSecurityIncomeState : 0;

            // get current spend (currently fixed)
            thisCycle.spend = this.state.spendValueState;
            // adjust spend for cumultative cpi
            thisCycle.actualSpend = thisCycle.spend * thisCycle.cumulativeCPI;
            // apply ss adjustment if applicable
            var adjustment = (ssAge <= thisCycle.age) ? (ssIncome * thisCycle.cumulativeCPI) : 0;
            thisCycle.actualSpend -= adjustment;
            // subtract spend from start value
            thisCycle.endValue = thisCycle.beginValue - thisCycle.actualSpend;
            // calculate % spend and % inflation
            thisCycle.pctSpend = thisCycle.spend / thisCycle.beginValue;
            thisCycle.pctActualSpend = thisCycle.actualSpend / thisCycle.beginValue;
            thisCycle.pctInflation = calcAnnualInflationRate(sourceDataIndex);
        }

        const applyAppreciation = (thisCycle, cycleNum, sourceData) => {
            const stockPct = this.state.stockAllocPctState / 100;
            const bondPct = 1 - stockPct;

            // Use endValue, as it has the annual spend deducted already
            thisCycle.beginEquityValue = thisCycle.endValue * stockPct;
            thisCycle.beginBondValue = thisCycle.endValue * bondPct;

            thisCycle.equityAppr = thisCycle.beginEquityValue * thisCycle.equityReturn;
            thisCycle.divAppr = thisCycle.beginEquityValue * histData[sourceData[cycleNum]].dividends;
            thisCycle.bondAppr = calcBondYield(thisCycle.beginBondValue, cycleNum, sourceData);
            thisCycle.bondReturn = thisCycle.bondAppr / thisCycle.beginBondValue;

            thisCycle.endEquityValue = thisCycle.beginEquityValue + thisCycle.equityAppr + thisCycle.divAppr;
            thisCycle.endBondValue = thisCycle.beginBondValue + thisCycle.bondAppr;

            thisCycle.endValue = thisCycle.endEquityValue + thisCycle.endBondValue;

            // used for informational/summary purposes later
            thisCycle.appr = thisCycle.equityAppr + thisCycle.divAppr + thisCycle.bondAppr;
            thisCycle.adjAppr = thisCycle.appr / thisCycle.cumulativeCPI;
            thisCycle.aggReturn = calcAnnualAggReturn(thisCycle.beginValue, thisCycle.appr);
        }

        const applyFees = (thisCycle) => {
            // endValue include spend-down + current appreciation
            const feePct = this.state.feePctState / 100;
            const totalFees = thisCycle.endValue * feePct;
            // end{Equity, Bond}Value includes per-class appreciation
            const currEquityPct = thisCycle.endEquityValue / thisCycle.endValue;
            const currBondPct = thisCycle.endBondValue / thisCycle.endValue;
            var equityFees = totalFees * currEquityPct;
            var bondFees = totalFees * currBondPct;

            thisCycle.endEquityValue -= equityFees;
            thisCycle.endBondValue -= bondFees;
            thisCycle.endValue = thisCycle.endEquityValue + thisCycle.endBondValue;

            thisCycle.fees = totalFees;
        }

        const calcNetDelta = (thisCycle) => {
            thisCycle.netDelta = thisCycle.appr - thisCycle.actualSpend - thisCycle.fees;
        }

        const calcAdjustedEndValue = (thisCycle) => {
            thisCycle.adjEndValue = thisCycle.endValue / thisCycle.cumulativeCPI;
        }
 
/*
        const dumpYear = (oneYear) => {
            console.log(oneYear.age + 
                        ' y:' + oneYear.year +
                        ' bv:' + makeCurrency(oneYear.beginValue) +
                        ' eApp:' + makeCurrency(oneYear.equityAppr) +
                        ' bRet:' + makePct(oneYear.bondReturn) +
                        // ' f:' + makeCurrency(oneYear.fees) +
                        ' div:' + makeCurrency(oneYear.divAppr) + 
                        ' ccpi:' + oneYear.cumulativeCPI + 
                        ' sp:' + makeCurrency(oneYear.actualSpend) + 
                        ' ev:' + makeCurrency(oneYear.endValue) +
                        ' delta:' + makeCurrency(oneYear.netDelta)
                       );
        }
        const dumpCycle = (cycleData) => {
            for (var i = 0; i < cycleData.length; i++) {
                dumpYear(cycleData[i]);
            }
        }
        */

        const calcCumulativeCPI = (startCPI, thisYearCPI, sourceDataIndex, prevCCPI) => {

            var retVal = 1;

            // Historically-based sequence cumulative CPI calculated
            // relative to first year in the sequence.
            if (!(this.state.monteCarloProjectionState)) {
                retVal = thisYearCPI / startCPI;
            }
            // Monte-carlo sequence cumulative CPI can only be calculated
            // relative to previous year's value.  There can be as much as
            // a 2% difference in this method vs. this / start ratio, so I've left 
            // that one in for the purposes of historical precision.
            else {
                retVal = prevCCPI + calcAnnualInflationRate(sourceDataIndex);
            }

            return retVal;
        }

        const createYearObject = () => {
            var oneYear = { "year": 0,
                            "age": 0,
                            "beginValue": 0,
                            "beginEquityValue": 0,
                            "endEquityValue" : 0,
                            "beginBondValue" : 0,
                            "endBondValue" : 0,
                            "equityReturn": 0,
                            "cumulativeCPI": 1,
                            "spend": 0,
                            "endValue": 0,
                            "pctInflation": 0,
                            // not updated when a failure is detected
                            "equityAppr": 0,
                            "divAppr": 0,
                            "bondReturn": 0,
                            "bondAppr": 0,
                            "aggReturn": 0,
                            "actualSpend": 0,
                            "pctSpend": 0,
                            "pctActualSpend": 0,
                            "fees": 0,
                            "netDelta": 0,
                            "adjEndValue": 0,
                            "appr": 0,
                            "adjAppr": 0,
          };
          return oneYear;
        }

        const processOneYear = (thisYear, sourceDataIndex, sourceData) => {
            // precondition - these are set
            // year, age, beginValue, cumulative CPI, equityReturn
            var thisIndex = sourceData[sourceDataIndex];
            // get spend adjusted for inflation and ss benefits
            applySpend(thisYear, thisIndex);

            // detect failure (out of funds), and terminate cycle.
            if (0 < thisYear.endValue) {
                applyAppreciation(thisYear, sourceDataIndex, sourceData);
                applyFees(thisYear);
    
                // net delta is for informational purposes used later
                calcNetDelta (thisYear);
                calcAdjustedEndValue(thisYear);

            }
            else {
                thisYear.endValue = thisYear.adjEndValue = 0;
            }
        }

        const runCycle = (startIndex, numYears, sourceData) => {
            var cycleData = [];
            // need to calculate cumulative CPI for both
            // historically and monte-carlo sequences.
            const startCPI = histData[sourceData[startIndex]].cpi;
            var prevYearCCPI = 1;

            // console.log(histData[sourceData[startIndex]].year + '-' + histData[sourceData[startIndex + numYears - 1]].year)
    
            for(var i = 0; i < numYears; i++){
                var thisIndex = sourceData[startIndex + i];
                var thisYearSource = histData[thisIndex];
                var oneYear = createYearObject();

                oneYear.year = thisYearSource.year;
                oneYear.age = this.state.currentAgeState + i;
                oneYear.beginValue = (i > 0) ? cycleData[i - 1].endValue : this.state.portfolioValueState;
                oneYear.equityReturn = thisYearSource.equity;
                oneYear.cumulativeCPI = (0 === i) ? 1 : calcCumulativeCPI(startCPI, thisYearSource.cpi, thisIndex, prevYearCCPI);

                processOneYear(oneYear, startIndex + i, sourceData);

                prevYearCCPI = oneYear.cumulativeCPI;
                cycleData.push(oneYear);

                // detect failure (out of funds), and terminate cycle.
                if (0 >= oneYear.endValue) {
                    break;
                }
            }
            return cycleData;
        }

        const calcCycleMeta = (oneCycle) => {
            var extAdjEndValue = d3.extent(oneCycle, (d) => d.adjEndValue);
            var avgAdjEndValue = d3.mean(oneCycle, (d) => d.adjEndValue);
            var medAdjEndValue = d3.median(oneCycle, (d) => d.adjEndValue);
            var totalSpend = d3.sum(oneCycle, (d) => d.actualSpend);
            var totalAppr = d3.sum(oneCycle, (d) => d.appr);
            var totalAdjAppr = d3.sum(oneCycle, (d) => d.adjAppr);
            var pctStart = oneCycle[oneCycle.length - 1].adjEndValue / this.state.portfolioValueState;
            const thisLineColor = getColorStringForRelativeValue(pctStart);
            var extAggReturn = d3.extent(oneCycle, (d) => d.aggReturn);
            var avgAggReturn = d3.mean(oneCycle, (d) => d.aggReturn);
            var medAggReturn = d3.median(oneCycle, (d) => d.aggReturn);
    
            var oneMeta = {
                'startCycleValue': this.state.portfolioValueState,
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
                           (oneCycle[oneCycle.length - 1].age) :
                           undefined,
                'startYear': oneCycle[0].year,
                'cycleData': oneCycle,
                'lineColor': thisLineColor,
            };
    
            return oneMeta;
        }            

        const calcCycles = (srcData) => {

            var lifetime = this.state.lifeExpectancyState - this.state.currentAgeState + 1;
            var numCycles = srcData.length / lifetime;

            for (var i = 0; i < numCycles; i++) {  
                var startIndex = (i * lifetime);
                var oneCycle = runCycle(startIndex, lifetime, srcData);
                var cycleMeta = calcCycleMeta(oneCycle);
                
                allCyclesMeta[i] = cycleMeta;
                allCycles[i] = oneCycle;

                portMin = Math.min(portMin, cycleMeta.extent[0]);
                portMax = Math.max(portMax, cycleMeta.extent[1]);
            }
        }

        const cullOutliers = () => {
            // detect and eliminate outliers +- 3 std dev from mean adj end value
            var sdEndValBracket  = d3.deviation(allCyclesMeta, (d) => d.adjEndCycleValue) * 3;
            var meanEndVal = d3.mean(allCyclesMeta, (d) => d.adjEndCycleValue);
            const lowThreshold = Math.max(0, meanEndVal - sdEndValBracket);
            const highThreshold = meanEndVal + sdEndValBracket;
            var validCycleCount = 0;
            var newAllCycles = [];
            var newAllCyclesMeta = [];   
            
            portMin = portMax = 0;

            for (var i = 0; i < allCyclesMeta.length; i++) {
                if ( (lowThreshold <= allCyclesMeta[i].adjEndCycleValue) && 
                     (highThreshold >= allCyclesMeta[i].adjEndCycleValue) ) {
                    // copy valid cycle to new array
                    newAllCycles[validCycleCount] = allCycles[i];
                    // copy metadata to new meta array
                    newAllCyclesMeta[validCycleCount] = allCyclesMeta[i];
                    // increment valid cycle counter
                    validCycleCount++;
                    // update the portfolio min/max values
                    portMin = Math.min(portMin, allCyclesMeta[i].extent[0]);
                    portMax = Math.max(portMax, allCyclesMeta[i].extent[1]);    
                }
            }
            allCycles = newAllCycles;
            allCyclesMeta = newAllCyclesMeta;
        }

        const testPortfolio = () => {
            const testData = generatePortfolioTestData();
            var testResults = [];

            // run through the historical data with a constant start value each year
            // capture appreciation and inflation data
            for (var i = 0; i < testData.length; i++) {
                var thisIndex = testData[i];
                var thisYearSource = histData[thisIndex];
                var oneYear = createYearObject();

                oneYear.year = thisYearSource.year;
                oneYear.age = this.state.currentAgeState + i;
                oneYear.beginValue = this.state.portfolioValueState;
                oneYear.equityReturn = thisYearSource.equity;
                oneYear.cumulativeCPI = 1;
                processOneYear(oneYear, i, testData);

                // save it all
                testResults.push(oneYear);

                // detect failure (out of funds), and terminate cycle
                // this can happen when entering new data 
                // partial portfolio or spend data can look wonky
                // ... and so will the portfolio results
                if (0 >= oneYear.endValue) {
                    break;
                }
            }

            var avgReturn = d3.mean(testResults, (d) => d.aggReturn);
            var stdDeviationReturn = d3.deviation(testResults, (d) => d.aggReturn);
            var avgInflation = d3.mean(testResults, (d) => d.pctInflation);
            var avgPctSpend = d3.mean(testResults, (d) => d.pctSpend);

            return (avgReturn - (avgInflation + avgPctSpend)) / stdDeviationReturn;
        }

        if (null != this.sourceData) {
            var harvestRatio = testPortfolio ();

            calcCycles(this.sourceData);
            cullOutliers ();
        }

        return (

            <div>
            <Stack direction="row"> 
                  <div className="Inputs" >
                    <header className="Inputs-header">
                        <Box sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 10,
                            borderRadius: 10,
                            p: 2,
                            minWidth: 300,
                        }} >

                            <List> 
                                <ListItem >
                                    <TextField required label="Age" 
                                        sx={{ m: '10px' }}
                                        type="number"
                                        value={this.state.currentAgeState}
                                        onChange={handleAgeChange}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </ListItem>
                                <ListItem divider >
                                    <Accordion >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            <div >Life Expectancy: {this.state.lifeExpectancyState}</div>                                 
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Slider id="aExpect" label="Life Expectancy" marks step={1} 
                                                min={this.state.currentAgeState} max={maxExpectancy}
                                                valueLabelDisplay="auto" value={this.state.lifeExpectancyState}  
                                                onChange={handleExpectChange} />
                                        </AccordionDetails>
                                    </Accordion>                                    
                                </ListItem>
                                <ListItem >
                                    <TextField required 
                                    sx={{ m: '10px' }}
                                    type="number" label="Portfolio Value $" 
                                    defaultValue={defaultPortfolioValue} 
                                    onChange={handlePortfolioValueChange} />
                                </ListItem>
                                <ListItem  >
                                    <TextField required 
                                    sx={{ m: '10px' }}
                                    type="number" label="Annual Spend $" 
                                    defaultValue={defaultSpendValue} 
                                    onChange={handleSpendingValueChange} />
                                </ListItem>
                                <ListItem  >
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            <span id='portMix'>
                                                <span id="sAlloc" >{this.state.stockAllocPctState}% stocks</span>
                                                <span id="bAlloc" >&nbsp; {100-this.state.stockAllocPctState}% bonds</span>                                                                                                 
                                            </span>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <Slider id="aAlloc" label="Stock Allocation" marks step={5} 
                                                    valueLabelDisplay="auto" defaultValue={defaultStocks}  
                                                    onChange={handleAllocChange} />
                                                <TextField required 
                                                sx={{ m: '10px' }}
                                                type="number" label="Annual Fee %" 
                                                defaultValue={defaultFeePct} 
                                                onChange={handleFeePctChange} />
                                        </AccordionDetails>
                                    </Accordion>
                                </ListItem>
                                <ListItem >
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            Social Security: {makeCurrency(this.state.socialSecurityIncomeState)} at {this.state.socialSecurityAgeState} 
                                        </AccordionSummary>
                                        <AccordionDetails >

                                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                                <Slider valueLabelDisplay="auto" 
                                                        min={this.state.currentAgeState} max={this.state.lifeExpectancyState}
                                                        marks={ ssAgeSliderMarks }
                                                        value={this.state.socialSecurityAgeState} 
                                                        onChange={handleChangeSSAge} />
                                            </Stack>
                                            
                                            <TextField disabled={(0 === this.state.socialSecurityAgeState)} 
                                             sx={{ m: '10px' }}
                                             type="number" label="Annual SS $" 
                                             defaultValue={defaultSSIncome}
                                             onChange={handleSocialSecurityIncomeChange} />
                                        </AccordionDetails>
                                    </Accordion>
                                </ListItem>
                                <ListItem divider >
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                            <div>{(this.state.monteCarloProjectionState) ? monteCarloString : historicalString} simulation</div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <FormControl>
                                                <InputLabel id='proj-type-label' >Simulation Type</InputLabel>
                                                <Select
                                                labelId='proj-type-label'
                                                value={(this.state.monteCarloProjectionState) ? monteCarloString : historicalString}
                                                label='Simulation Type'
                                                onChange={handleProjectionToggle}>
                                                    <MenuItem value={historicalString}>historical</MenuItem>
                                                    <MenuItem value={monteCarloString}>monte carlo</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <div disabled={this.state.monteCarloProjectionState}> {this.state.startDataYearState} to {this.state.endDataYearState}</div>                                 
                                            <Slider  
                                            disabled={this.state.monteCarloProjectionState}
                                            marks step={1}
                                            min={defaultStartDataYear} max={defaultEndDataYear}
                                            defaultValue={[defaultStartDataYear, defaultEndDataYear]}
                                            value={ [this.state.startDataYearState, this.state.endDataYearState] }
                                            valueLabelDisplay="auto"                                     
                                            onChange={handleDataRangeChange}
                                            />
                                        </AccordionDetails>
                                    </Accordion>                                    
                                </ListItem> 
                                <ListItem>
                                    <Button variant="outlined" onClick={handleSave} >Save</Button>
                                </ListItem>
                            </List>                        
                        </Box>

                    </header>
                </div>              

                <Chart id={ chartCompID }
                       portfoliovalue={this.state.portfolioValueState}
                       portmin={portMin}
                       portmax={portMax}
                       cycledata={allCycles}
                       cyclemeta={allCyclesMeta}
                       numcycles={ allCycles.length  }
                       currentage={this.state.currentAgeState}
                       lifeexpectancy={this.state.lifeExpectancyState}
                       allocharvestratio={harvestRatio}
                       minzoom={this.state.minZoomValueState}
                       maxzoom={this.state.maxZoomValueState}
                       zoomcolor={this.state.zoomColorState}
                       zoomcallback={this.zoomChart.bind(this)}
                       selectedbin={this.state.selectedBinState}
                />
            </Stack>
            </div>
        );
    }

}

  export default SWRCalc;