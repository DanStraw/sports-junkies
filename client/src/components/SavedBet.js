import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';

const SavedBet = (props) => {
    console.log(props)
    return (
        <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff', height: '40px' }}>{props.bet.team1} vs. {props.bet.team2}</CardTitle>
            <CardText style={{color: '#fff'}}>
                <p>Game Day: {props.bet.date}</p>
                <p>{props.bet.team1} MoneyLine: {props.bet.team1Line}</p>
                <p>{props.bet.team2} MoneyLine: {props.bet.team2Line}</p>
            </CardText>
        </Card>
    )
}
export default SavedBet;