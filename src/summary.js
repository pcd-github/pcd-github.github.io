import * as React from "react";
import { Stack, Tooltip } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { makeCurrency, makePct} from "./common.js";

function SummaryCards (props) {

    React.useEffect(() => {

    }, [props] );

    return (
        <div>
            <Stack direction="row">
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1">
                            summary
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {makePct(1 - (props.fails / props.cycles))} success ({props.cycles - props.fails} / {props.cycles} )
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Earliest failure age : {(Number.POSITIVE_INFINITY === props.minfailage) ? 'n/a' : props.minfailage}
                        </Typography>
                        <Tooltip title='% of cycles ending with more than we started with'>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {makePct(props.numgreaterthanstart / props.cycles)} positive cycles 
                            </Typography>
                        </Tooltip>
                        <Tooltip title='% of years (all cycles) ending with more than we started with'>
                            <Typography variant="body2" color="textSecondary" component="p">
                                { makePct(props.netpositivepct)} positive years
                            </Typography>
                        </Tooltip>
                        <Tooltip title='ratio of reward over risk' >
                            <Typography variant="body2" color="textSecondary" component="p">
                                sharpe ratio: { Number(props.sharperatio).toFixed(4) }
                            </Typography>                            
                        </Tooltip>
                        <Tooltip title='ratio of reward (less withdrawals and inflation) over risk' >
                            <Typography variant="body2" color="textSecondary" component="p">
                                harvesting ratio: {Number(props.harvestratio).toFixed(4)}
                            </Typography>                            
                        </Tooltip>
                    </CardContent>
                </Card>
                <Card>
                    <Tooltip title='range of portfolio value at end of life'>
                    <CardContent>
                        <Typography variant="subtitle1" >
                            end value
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            median: {makeCurrency(props.quantile50endvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            max: { makeCurrency(props.maxendvalue) }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            75% : {makeCurrency(props.quantile75endvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            25% : {makeCurrency(props.quantile25endvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            10% : {makeCurrency(props.quantile10endvalue)} 
                        </Typography>    
                        <Typography variant="body2" color="textSecondary" component="p">
                            min: { makeCurrency(props.minendvalue) }
                        </Typography>
                    </CardContent>                        
                    </Tooltip>
                </Card>
                <Card>
                    <CardContent>
                        <Tooltip title="annualized aggregate returns" >
                            <Typography variant="subtitle1" >
                                return
                            </Typography>                            
                        </Tooltip>
                        <Tooltip title='annualized aggregate returns per cycle'>
                            <Typography variant="body2" color="textSecondary" component="p">
                                median: { makePct(props.medianreturns) } 
                            </Typography>
                        </Tooltip>
                        <Tooltip title='annualized aggregate returns per cycle'>
                            <Typography variant="body2" color="textSecondary" component="p">
                                range: ({ makePct(props.minreturns) }, { makePct(props.maxreturns) })
                            </Typography>
                        </Tooltip>
                        <Typography variant="subtitle1" >
                            net growth
                        </Typography>
                        <Tooltip title="annualized returns, less withdrawals per cycle" >
                            <Typography variant="body2" color="textSecondary" component="p">
                                median: { makePct(props.mediannetgrowth) }
                            </Typography>
                        </Tooltip>
                        <Tooltip title="annualized returns, less withdrawals per cycle" >
                            <Typography variant="body2" color="textSecondary" component="p">
                                range: ({ makePct(props.minnetgrowth) }, { makePct(props.maxnetgrowth) })
                            </Typography>
                        </Tooltip>
                    </CardContent>
                </Card>  
            </Stack>             
        </div>
    );    
};

export default SummaryCards;
