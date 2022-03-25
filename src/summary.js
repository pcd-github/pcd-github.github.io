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
                            {makePct(1 - (props.fails / props.cycles))} success ({props.cycles - props.fails} / {props.cycles})
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            { makePct(props.netpositivepct)} net positive years 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Minimum failure age : {props.minfailage}
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            End Value ($)
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {makePct(props.numgreaterthanstart / props.cycles)} finished greater than started
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            median : {makeCurrency(props.medianendvalue)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            mean : {makeCurrency(props.avgendvalue)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        min : {makeCurrency(props.minendvalue)} max : {makeCurrency(props.maxendvalue)}
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
                        min : { makePct(props.minreturns) } max : { makePct(props.maxreturns) }
                        </Typography>
                    </CardContent>
                </Card>  
            </Stack>             
        </div>
    );    
};

export default SummaryCards;
