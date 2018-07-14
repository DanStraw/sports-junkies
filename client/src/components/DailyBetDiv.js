import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';

const MlbBetDiv = (props) => {
    return (
        <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff', height: '40px' }}>{props.bet.team1.team} vs. {props.bet.team2.team}</CardTitle>
            <CardText style={{color: '#fff'}}>
                <p>{props.bet.team1.team} MoneyLine: {props.bet.team1.moneyLine}</p>
                <p>{props.bet.team2.team} MoneyLine: {props.bet.team2.moneyLine}</p>
                <p>OverUnder: {props.bet.team1.overUnder}</p>  
            </CardText>
        </Card>
    )
}
export default MlbBetDiv;