import React from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';

const MlbBetDiv = (props) => {
    return (
        <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff' }}>{props.team1} vs. {props.team2}</CardTitle>
            <CardText style={{color: '#fff'}}>
                <p>{props.team1} MoneyLine: {props.t1MoneyLine}</p>
                <p>{props.team2} MoneyLine: {props.t2MoneyLine}</p>
                <p>OverUnder: {props.overUnder}</p>
            </CardText>
            <CardActions border>
                <Button colored onClick={props.saveClickHandler}>Save Bet</Button>
            </CardActions>
        </Card>
    )
}
export default MlbBetDiv;