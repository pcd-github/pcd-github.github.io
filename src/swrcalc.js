// TODO : add monte-carlo option
import * as d3 from "d3";
import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Box } from "@mui/system";
import { Checkbox } from "@mui/material";
import { TextField } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { Slider } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { Stack } from "@mui/material";
import { histData, getNumberOfCycles, generateSourceData } from "./histdata.js";
import { makePct, getColorStringForRelativeValue, makeCurrency } from './common.js';
import Chart from './chart.js';

const defaultPortfolioValue = 1250000;
const defaultAge = 62;
const maxAge = 110;
const defaultExpectancy = 95;
const defaultSpendValue = 50000;
const defaultStocks = 80;
const defaultFeePct = 0.18;
const defaultSSIncome = 39312;
const defaultStartDataYear = histData[0].year;
const defaultEndDataYear = histData[histData.length - 1].year;
const chartCompID = 'chartComponent';
const monteCarloString = 'montecarlo';
const historicalString = 'historical';
const defaultMCProjection = true;

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
            ssOnState: false,
            socialSecurityIncomeState: defaultSSIncome,
            socialSecurityAgeState: 67,
            useAllHistDataState: true,
            startDataYearState: defaultStartDataYear,
            endDataYearState: defaultEndDataYear,
            minZoomValueState: null,
            maxZoomValueState: null,
            zoomColorState: null,
            selectedBinState: null,
            sourceDataState: null,
        }
    }

    zoomChart (minZoom, maxZoom, colorKey, selectedBin) {
        this.setState( {minZoomValueState : minZoom} );
        this.setState( {maxZoomValueState : maxZoom} );
        this.setState( {zoomColorState : colorKey} );
        this.setState( {selectedBinState : selectedBin });
    }

    render () { 

        var portMin = this.state.portfolioValueState;
        var portMax = this.state.portfolioValueState;
        var allCycles = [];
        var allCyclesMeta = [];

        const handleAgeChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {currentAgeState : newValue } ); 
            var srcData = generateSourceData(this.state.monteCarloProjectionState, 
                this.state.lifeExpectancyState - newValue + 1,
                this.state.startDataYearState,
                this.state.endDataYearState);

            this.setState( { sourceDataState : srcData } );
        }

        const handleExpectChange = (event, newValue) => {
            var srcData = generateSourceData(this.state.monteCarloProjectionState, 
                newValue - this.state.currentAgeState + 1,
                this.state.startDataYearState,
                this.state.endDataYearState);

            this.setState( { sourceDataState : srcData } );
            this.setState( {lifeExpectancyState : newValue} );
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

        const handleSSToggle = (event, newValue) => {
            this.setState( {ssOnState: newValue} );
        }

        const handleChangeSSAge = (event) => {
            var newValue = +(event.target.value);
            this.setState( {socialSecurityAgeState: newValue});
        }

        const handleSocialSecurityIncomeChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( { socialSecurityIncomeState : newValue });
        }

        const handleProjectionToggle = (event, newValue) => {
            var mcProj = (monteCarloString === newValue);
            var srcData = generateSourceData(mcProj, 
                                             this.state.lifeExpectancyState - this.state.currentAgeState + 1,
                                             this.state.startDataYearState,
                                             this.state.endDataYearState);

            this.setState( { sourceDataState : srcData } );
            this.setState({monteCarloProjectionState : mcProj } );
        }

        const handleDataRangeChange = (event, newValue) => {
            var srcData = generateSourceData(this.state.monteCarloProjectionState, 
                this.state.lifeExpectancyState - this.state.currentAgeState + 1,
                newValue[0],
                newValue[1]);

            this.setState( { sourceDataState : srcData } );
            this.setState( { startDataYearState: newValue[0] } );
            this.setState( { endDataYearState: newValue[1] } );
        }

        const checkDistribution = (indeces) => {
            var countArray = [];

            for (var i = 0; i < histData.length; i++) {
                countArray[i] = 0;
            }

            for (i = 0; i < indeces.length; i++) {
                countArray[indeces[i]]++;
            }

            for (i = 0; i < countArray.length; i++) {
                console.log(i + ': ' + histData[i].year + ' ' + countArray[i]);
            }
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

/*
            // if we're at the end of the cycle, use the simplified calculation
            if (sourceData.length <= (sourceIndex + 1)) {
                retValue = bondStake * histData[h0].bonds;
            }
            else {
                var h1 = sourceData[sourceIndex + 1];
                var bg1 = (1 - Math.pow(1 + histData[h1].bonds, -9 ))
                        * histData[h0].bonds;
                bg1 = bg1 / histData[h1].bonds;
                
                var bg2 = 1 / Math.pow(1 + histData[h1].bonds, 9);
                bg2 = bg2 - 1;

                retValue = bondStake * (bg1 + bg2 + histData[h0].bonds);
            }
            */

            return retValue;
        }

        const applySpend = (thisCycle) => {
            const ssAge = this.state.socialSecurityAgeState;
            const ssIncome = (this.state.ssOnState) ? this.state.socialSecurityIncomeState : 0;

            // get current spend (currently fixed)
            thisCycle.spend = this.state.spendValueState;
            // adjust spend for cumultative cpi
            thisCycle.actualSpend = thisCycle.spend * thisCycle.cumulativeCPI;
            // apply ss adjustment if applicable
            var adjustment = (ssAge <= thisCycle.age) ? (ssIncome * thisCycle.cumulativeCPI) : 0;
            thisCycle.actualSpend -= adjustment;
            // subtract spend from start value
            thisCycle.endValue = thisCycle.beginValue - thisCycle.actualSpend;
        }

        const applyAppreciation = (thisCycle, cycleNum, sourceData) => {
            const stockPct = this.state.stockAllocPctState / 100;
            const bondPct = (100 - this.state.stockAllocPctState) / 100;
            const startStockValue = thisCycle.endValue * stockPct;

            thisCycle.equityAppr = startStockValue * thisCycle.equityReturn;
            thisCycle.divAppr = startStockValue * histData[sourceData[cycleNum]].dividends;
            thisCycle.bondAppr = calcBondYield(thisCycle.endValue * bondPct, cycleNum, sourceData);
            thisCycle.bondReturn = thisCycle.bondAppr / (thisCycle.beginValue * bondPct);
            thisCycle.aggReturn = calcAnnualAggReturn(thisCycle, stockPct, bondPct);

            thisCycle.appr = thisCycle.equityAppr + thisCycle.divAppr + thisCycle.bondAppr;
            thisCycle.endValue += thisCycle.appr;

            // used for informational purposes later
            thisCycle.adjAppr = thisCycle.appr / thisCycle.cumulativeCPI;
        }

        const applyFees = (thisCycle) => {
            const feePct = this.state.feePctState / 100;

            thisCycle.fees = (thisCycle.beginValue + thisCycle.appr) * feePct;
            thisCycle.endValue -= thisCycle.fees;
        }

        const calcNetDelta = (thisCycle) => {
            thisCycle.netDelta = thisCycle.appr - thisCycle.actualSpend - thisCycle.fees;
        }

        const calcAdjustedEndValue = (thisCycle) => {
            thisCycle.adjEndValue = thisCycle.endValue / thisCycle.cumulativeCPI;
        }

        const dumpYear = (oneYear) => {
            console.log(oneYear.age + 
                        ' y:' + oneYear.year +
                        ' bv:' + makeCurrency(oneYear.beginValue) +
                        // ' eRet:' + makePct(oneYear.equityReturn) +
                        // ' bRet:' + makePct(oneYear.bondReturn) +
                        // ' f:' + makeCurrency(oneYear.fees) +
                        // ' div:' + makeCurrency(oneYear.divAppr) + 
                        ' ccpi:' + oneYear.cumulativeCPI + 
                        ' sp:' + makeCurrency(oneYear.actualSpend) + 
                        ' ev:' + makeCurrency(oneYear.endValue) +
                        ' delta:' + makeCurrency(oneYear.netDelta)
                       );
        }

        const calcCumulativeCPI = (startCPI, thisYearCPI, sourceDataIndex, prevCCPI) => {

            var retVal = 1;

            // Historically-based sequence cumulative CPI calculated
            // relative to first year in the sequence.
            if (!(this.state.monteCarloProjectionState)) {
                retVal = thisYearCPI / startCPI;
            }
            // Monte-carlo sequence cumulative CPI can only be calculated
            // relative to previous year's value
            else {
                // calculate annual change - currCPI / prevCPI
                var prevYearIndex = (0 < sourceDataIndex) ? (sourceDataIndex - 1) : sourceDataIndex;
                var annualChange = (histData[sourceDataIndex].cpi / histData[prevYearIndex].cpi) - 1;
                retVal = prevCCPI + annualChange;
                // console.log(histData[prevYearIndex].year + '(' + histData[prevYearIndex].cpi + ')'
                //            + '-' + histData[sourceDataIndex].year + '(' + histData[sourceDataIndex].cpi + ')'
                //             + ' prevCCPI:' + makePct(prevCCPI) + ' currCCPI:' + makePct(retVal)
                //            );
            }

            return retVal;
        }

        const runCycle = (startIndex, numYears, sourceData) => {
            var cycleData = [];
            // need to calculate cumulative CPI for both
            // historically and monte-carlo sequences.
            const startCPI = histData[sourceData[startIndex]].cpi;
            var prevYearCCPI = 1;
    
            for(var i = 0; i < numYears; i++){
                var thisIndex = sourceData[startIndex + i];
                var thisYearSource = histData[thisIndex];
                // console.log(i + ' ' + (startIndex + i) + ' ' + thisIndex + ' ' + thisYearSource.year);
                var obj = { "year": thisYearSource.year,
                            "age": this.state.currentAgeState + i,
                            "beginValue": (i > 0) ? cycleData[i - 1].endValue : this.state.portfolioValueState,
                            "equityReturn": thisYearSource.equity,
                            "cumulativeCPI": calcCumulativeCPI(startCPI, thisYearSource.cpi, thisIndex, prevYearCCPI),
                            "spend": 0,
                            "endValue": 0,
                            // the rest of these fields are not updated when a failure is detected
                            "equityAppr": 0,
                            "divAppr": 0,
                            "bondReturn": 0,
                            "bondAppr": 0,
                            "aggReturn": 0,
                            "actualSpend": 0,
                            "fees": 0,
                            "netDelta": 0,
                            "adjEndValue": 0,
                            "appr": 0,
                            "adjAppr": 0,
                          };
                prevYearCCPI = obj.cumulativeCPI;
                // get spend adjusted for inflation and ss benefits
                applySpend(obj);

                // detect failure (out of funds), and terminate cycle.
                if (0 >= obj.endValue) {
                    obj.endValue = obj.adjEndValue = 0;
                    cycleData.push(obj);
                    break;
                }

                applyAppreciation(obj, startIndex + i, sourceData);
                applyFees(obj);
                // net delta is for informational purposes used later
                calcNetDelta (obj);
                calcAdjustedEndValue(obj);

                // dumpYear(obj);

                cycleData.push(obj);
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
            var numCycles = getNumberOfCycles(this.state.monteCarloProjectionState, 
                                              lifetime,
                                              this.state.startDataYearState,
                                              this.state.endDataYearState);

            for (var i = 0; i < numCycles; i++) {
                var startIndex = (i * lifetime);
                // console.log('cycle: ' + i);
                var oneCycle = runCycle(startIndex, lifetime, srcData);
                var cycleMeta = calcCycleMeta(oneCycle);
                
                allCyclesMeta[i] = cycleMeta;
                allCycles[i] = oneCycle;

                portMin = Math.min(portMin, cycleMeta.extent[0]);
                portMax = Math.max(portMax, cycleMeta.extent[1]);
            }
        }

        var srcData = this.state.sourceDataState;
        if (null == srcData) {
            srcData = generateSourceData(this.state.monteCarloProjectionState, 
                                         this.state.lifeExpectancyState - this.state.currentAgeState + 1,
                                         this.state.startDataYearState,
                                         this.state.endDataYearState);
            this.setState( { sourceDataState : srcData } );
        }
        calcCycles(srcData);

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
                                        type="number" defaultValue={defaultAge}
                                        onChange={handleAgeChange}
                                        InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </ListItem>
                                <ListItem >
                                    <div >Life Expectancy: </div>
                                    <div id="lifeExpectDiv" >{this.state.lifeExpectancyState}</div>
                                </ListItem>
                                <ListItem divider >
                                    <Slider id="lifeExpectSlider" size="small"
                                    label="Life Expectancy" marks step={1} 
                                    min={defaultAge} max={maxAge}
                                    valueLabelDisplay="auto" defaultValue={defaultExpectancy}  
                                    onChange={handleExpectChange} />
                                </ListItem>
                                <ListItem>
                                    <TextField required 
                                    sx={{ m: '10px' }}
                                    type="number" label="Portfolio Value $" 
                                    defaultValue={defaultPortfolioValue} 
                                    onChange={handlePortfolioValueChange} />
                                </ListItem>
                                <ListItem divider >
                                    <TextField required 
                                    sx={{ m: '10px' }}
                                    type="number" label="Annual Spend $" 
                                    defaultValue={defaultSpendValue} 
                                    onChange={handleSpendingValueChange} />
                                </ListItem>
                                <ListItem >
                                    <div >Stocks: </div>
                                    <div id="sAlloc" >{this.state.stockAllocPctState}%</div>
                                    <div >&nbsp; Bonds: </div>
                                    <div id="bAlloc" >{100-this.state.stockAllocPctState}%</div>
                                </ListItem> 
                                <ListItem >
                                    <Slider id="aAlloc" label="Stock Allocation" marks step={5} 
                                    valueLabelDisplay="auto" defaultValue={defaultStocks}  
                                    onChange={handleAllocChange} />
                                </ListItem>
                                <ListItem divider >
                                    <TextField required 
                                    sx={{ m: '10px' }}
                                    type="number" label="Annual Fee %" 
                                    defaultValue={defaultFeePct} 
                                    onChange={handleFeePctChange} />
                                </ListItem>
                                <ListItem>
                                    <Accordion>
                                        <AccordionSummary>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="projectionTypeID"
                                                    defaultValue="montecarlo"
                                                    name="radio-buttons-group"
                                                    row
                                                    onChange={handleProjectionToggle}
                                                >
                                                    <FormControlLabel value={historicalString} control={<Radio />} label="historical" />
                                                    <FormControlLabel value={monteCarloString} control={<Radio />} label="monte carlo" />
                                                </RadioGroup>
                                            </FormControl>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div disabled={this.state.monteCarloProjectionState}>Historical data from {this.state.startDataYearState} to {this.state.endDataYearState}</div>                                 
                                            <Slider  
                                            disabled={this.state.monteCarloProjectionState}
                                            marks step={1}
                                            min={defaultStartDataYear} max={defaultEndDataYear}
                                            defaultValue={[defaultStartDataYear, defaultEndDataYear]}
                                            valueLabelDisplay="auto"                                     
                                            onChange={handleDataRangeChange}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                </ListItem>
                                <ListItem >
                                    <Accordion>
                                        <AccordionSummary>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox />} label="include Social Security income" 
                                                    onChange={handleSSToggle}
                                                />
                                            </FormGroup>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <TextField disabled={!(this.state.ssOnState)} 
                                             sx={{ m: '10px' }}
                                             type="number" label="Annual SS $" 
                                             defaultValue={defaultSSIncome}
                                             onChange={handleSocialSecurityIncomeChange} />
                                            <FormControl disabled={!(this.state.ssOnState)} component="fieldset">
                                                <FormLabel component="legend">Start at age</FormLabel>
                                                <RadioGroup
                                                aria-label="ss-start"
                                                onChange={handleChangeSSAge}
                                                row
                                                defaultValue="67"
                                                name="radio-buttons-group">
                                                    <FormControlLabel value="62" control={<Radio />} label="62" />
                                                    <FormControlLabel value="67" control={<Radio />} label="67" />
                                                    <FormControlLabel value="70" control={<Radio />} label="70" />
                                                </RadioGroup>
                                            </FormControl>
                                        </AccordionDetails>
                                    </Accordion>
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
                       numcycles={getNumberOfCycles(this.state.monteCarloProjectionState,
                                                    this.state.lifeExpectancyState - this.state.currentAgeState + 1,
                                                    this.state.startDataYearState, this.state.endDataYearState
                                                   )}
                       currentage={this.state.currentAgeState}
                       lifeexpectancy={this.state.lifeExpectancyState}
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