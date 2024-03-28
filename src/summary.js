import * as React from "react";
import { Stack } from "@mui/material";
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
                        <Typography variant="h6" component="h6">
                            summary
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {makePct(1 - (props.fails / props.cycles))} success ({props.cycles - props.fails} / {props.cycles} )
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Life expectancy : {props.lifetime} years
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Minimum failure age : {(Number.POSITIVE_INFINITY === props.minfailage) ? 'n/a' : props.minfailage}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {makePct(props.numgreaterthanstart / props.cycles)} positive cycles
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            { makePct(props.netpositivepct)} positive years
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h6" component="h6">
                            end value
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            median: {makeCurrency(props.quantile50endvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            range: ({ makeCurrency(props.minendvalue) }, { makeCurrency(props.maxendvalue) })
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
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" >
                            annualized return
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            median: { makePct(props.medianreturns) } | range: ({ makePct(props.minreturns) }, { makePct(props.maxreturns) })
                        </Typography>
                        <Typography variant="subtitle1" >
                            net annualized growth
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            median: { makePct(props.mediannetgrowth) } | range: ({ makePct(props.minnetgrowth) }, { makePct(props.maxnetgrowth) })
                        </Typography>
                        <Typography variant="subtitle1" >
                            asset allocation metrics
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            avg return: { makePct(props.allocavgreturn) } |
                            std dev : { makePct(props.allocstddeviationreturn) } | harvest ratio {Number(props.allocharvestratio).toFixed(2)}
                        </Typography>
                        </CardContent>
                </Card>  
            </Stack>             
        </div>
    );    
};

export default SummaryCards;
