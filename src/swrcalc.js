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
import { histData } from "./histdata.js";
import { calcBondYield, findHistStartIndex } from "./histdata.js";
import { makePct, getColorStringForRelativeValue } from './common.js';
import Chart from './chart.js';

const defaultPortfolioValue = 1250000;
const defaultAge = 62;
const maxAge = 110;
const defaultExpectancy = 95;
const defaultSpendValue = 50000;
const defaultStocks = 80;
const defaultFeePct = 0.18;
const defaultSSIncome = 39312;
const defaultStartDataYear = 1871;
const defaultEndDataYear = 2020;
const chartCompID = 'chartComponent';

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
        }
    }

    zoomChart (minZoom, maxZoom, colorKey, selectedBin) {
        this.setState( {minZoomValueState : minZoom} );
        this.setState( {maxZoomValueState : maxZoom} );
        this.setState( {zoomColorState : colorKey} );
        this.setState( {selectedBinState : selectedBin });
    }

    render () {

        const lifetime = this.state.lifeExpectancyState - this.state.currentAgeState + 1;
        const numCycles = (this.state.endDataYearState - this.state.startDataYearState + 2) - lifetime;
        var portMin = this.state.portfolioValueState;
        var portMax = this.state.portfolioValueState;
        var allCycles = [];
        var allCyclesMeta = [];

        const handleAgeChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {currentAgeState : newValue } );    
        }

        const handleExpectChange = (event, newValue) => {
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

        const handleDataRangeChange = (event, newValue) => {
            this.setState( { startDataYearState: newValue[0] } );
            this.setState( { endDataYearState: newValue[1] } );
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
            const stockPct = this.state.stockAllocPctState / 100;
            const bondPct = (100 - this.state.stockAllocPctState) / 100;
            const feePct = this.state.feePctState / 100;
            const ssAge = this.state.socialSecurityAgeState;
            const ssIncome = (this.state.ssOnState) ? this.state.socialSecurityIncomeState : 0;
            const startCPI = histData[startIndex].cpi;
    
            for(var i = 0; i < numYears; i++){
                var obj = { "year": histData[startIndex + i].year,
                            "age": this.state.currentAgeState + i,
                            "beginValue": (i > 0) ? cycleData[i - 1].endValue : this.state.portfolioValueState,
                            "equityReturn": histData[startIndex + i].equity,
                            "equityAppr": 0,
                            "divAppr": 0,
                            "bondReturn": 0,
                            "bondAppr": 0,
                            "aggReturn": 0,
                            "cumulativeCPI": histData[startIndex + i].cpi / startCPI,
                            "spend": this.state.spendValueState,
                            "actualSpend": this.state.spendValueState,
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
                           (oneCycle.length + this.state.currentAgeState) :
                           undefined,
                'startYear': oneCycle[0].year,
                'cycleData': oneCycle,
                'lineColor': thisLineColor,
            };
    
            return oneMeta;
        }            

        const calcCycles = () => {

            // TODO : require numCycles to be greater than zero
            const startIndex = findHistStartIndex(this.state.startDataYearState);

            for (var i = 0; i < numCycles; i++) {
                var oneCycle = runCycle(startIndex + i, lifetime);
                var cycleMeta = calcCycleMeta(oneCycle);
                
                allCyclesMeta[i] = cycleMeta;
                allCycles[i] = oneCycle;

                portMin = Math.min(portMin, cycleMeta.extent[0]);
                portMax = Math.max(portMax, cycleMeta.extent[1]);
            }
        }

        // Calculate chart content (no actual rendering)
        calcCycles();

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
                                    <div>Historical data from {this.state.startDataYearState} to {this.state.endDataYearState}</div>                                 
                                </ListItem>
                                <ListItem> 
                                    <Slider  
                                    marks step={1}
                                    min={defaultStartDataYear} max={defaultEndDataYear}
                                    defaultValue={[defaultStartDataYear, defaultEndDataYear]}
                                    valueLabelDisplay="auto"                                     
                                    onChange={handleDataRangeChange}
                                    />

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
                       numcycles={numCycles}
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