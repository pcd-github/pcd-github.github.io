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
                        <Typography gutterBottom variant="h6" component="h2">
                            Summary Results
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {makePct(1 - (props.fails / props.cycles))} success ({props.cycles - props.fails} / {props.cycles} cycles)
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {makePct(props.numgreaterthanstart / props.cycles)} of cycles ended w/ more $$ than started
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            { makePct(props.netpositivepct)} of years w/ higher appreciation than spend (all cycles)
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Minimum failure age : {(Number.POSITIVE_INFINITY === props.minfailage) ? 'n/a' : props.minfailage}
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Inflation Adjusted End Value ($)
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            mean : {makeCurrency(props.avgendvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            max : {makeCurrency(props.maxendvalue)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            25% : {makeCurrency(props.quantile25endvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            50% : {makeCurrency(props.quantile50endvalue)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            75% : {makeCurrency(props.quantile75endvalue)} 
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Combined Returns (%)
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            median : { makePct(props.medianreturns) }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            mean : { makePct(props.avgreturns) }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            min: { makePct(props.minreturns) }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            max : { makePct(props.maxreturns) }
                        </Typography>
                    </CardContent>
                </Card>  
            </Stack>             
        </div>
    );    
};

export default SummaryCards;
