// TODO : add monte-carlo option
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
import Chart from './chart.js';

const defaultPortfolioValue = 2200000;
const defaultAge = 57;
const maxAge = 110;
const defaultExpectancy = 95;
const defaultSpendValue = 105000;
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
            currentAge: defaultAge,
            lifeExpectancy: defaultExpectancy,
            portfolioValue: defaultPortfolioValue,
            spendValue: defaultSpendValue,
            spendModel: 'dollars',
            stockAllocPct: defaultStocks,
            feePct: defaultFeePct,
            ssOn: false,
            socialSecurityIncome: defaultSSIncome,
            socialSecurityAge: 67,
            useAllHistData: true,
            startDataYear: defaultStartDataYear,
            endDataYear: defaultEndDataYear,
            dataRange: [defaultStartDataYear, defaultEndDataYear],
        }
    }

    render () {

        const handleAgeChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {currentAge : newValue } );    
        }

        const handleExpectChange = (event, newValue) => {
            this.setState( {lifeExpectancy : newValue} );
        }

        const handlePortfolioValueChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( { portfolioValue: newValue } );
        }

        const handleSpendingValueChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {spendValue : newValue});
        }

        const handleAllocChange = (event) => {             
            var newValue = +(event.target.value);
            this.setState( {stockAllocPct : newValue} );
        }

        const handleFeePctChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( {feePct : newValue} ); 
        }

        const handleSSToggle = (event, newValue) => {
            this.setState( {ssOn: newValue} );
        }

        const handleChangeSSAge = (event) => {
            var newValue = +(event.target.value);
            this.setState( {socialSecurityAge: newValue});
        }

        const handleSocialSecurityIncomeChange = (event) => {
            var newValue = +(event.target.value);
            this.setState( { socialSecurityIncome : newValue });
        }

        const handleDataRangeChange = (event, newValue) => {
            this.setState( {dataRange : newValue } );
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
                                        type="number" defaultValue={defaultAge}
                                        onChange={handleAgeChange}
                                        InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </ListItem>
                                <ListItem >
                                    <div >Life Expectancy: </div>
                                    <div id="lifeExpectDiv" >{this.state.lifeExpectancy}</div>
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
                                    <div id="sAlloc" >{this.state.stockAllocPct}%</div>
                                    <div >&nbsp; Bonds: </div>
                                    <div id="bAlloc" >{100-this.state.stockAllocPct}%</div>
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
                                    <div>Historical data from {this.state.dataRange[0]} to {this.state.dataRange[1]}</div>                                 
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
                                            <TextField disabled={!(this.state.ssOn)} 
                                             sx={{ m: '10px' }}
                                             type="number" label="Annual SS $" 
                                             defaultValue={defaultSSIncome}
                                             onChange={handleSocialSecurityIncomeChange} />
                                            <FormControl disabled={!(this.state.ssOn)} component="fieldset">
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
                       currentage={this.state.currentAge} lifeexpectancy={this.state.lifeExpectancy} 
                       portfoliovalue={this.state.portfolioValue} spendvalue={this.state.spendValue}
                       stockallocation={this.state.stockAllocPct} bondallocation={100 - this.state.stockAllocPct}
                       feepct={this.state.feePct}
                       ssincome={(this.state.ssOn) ? this.state.socialSecurityIncome : 0} 
                       ssage={this.state.socialSecurityAge}
                       startdatayear={this.state.dataRange[0]}
                       enddatayear={this.state.dataRange[1]}
                       ymin='default' ymax='default'
                />
            </Stack>
            </div>
        );
    }

}

  export default SWRCalc;