import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';

const SeasonBetDiv = (props) => {
    return (
        <Card className="bet-div" shadow={1} style={{width: '230px', height: '70px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff' }}>#{props.rank}: {props.team}</CardTitle>
            <CardText style={{color: '#fff'}}>
                <p>Odds: {props.odds}</p>
            </CardText>
            <CardActions border>
                <Button colored onClick={props.saveClickHandler}>Save Bet</Button>
            </CardActions>
        </Card>
    )
}
export default SeasonBetDiv;