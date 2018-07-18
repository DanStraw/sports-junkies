import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';

const SavedBet = (props) => {
    const team2 = props.bet.team2;
    if (team2 !== undefined) {
        return (
            <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
                <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff', height: '40px' }}>{props.bet.team1} vs. {props.bet.team2}</CardTitle>
                <CardText style={{color: '#fff'}}>
                    <p>Game Day: {props.bet.date}</p>
                    <p>{props.bet.team1} MoneyLine: {props.bet.team1Line}</p>
                    <p>{props.bet.team2} MoneyLine: {props.bet.team2Line}</p>
                    <p>Your Wager on {props.bet.wager_team}: {props.bet.wager}</p>
                </CardText>
            </Card>
        )
    } else {
        return (
            <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
                <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff', height: '40px' }}>{props.bet.team1} - Odds to win Title</CardTitle>
                <CardText style={{color: '#fff'}}>
                    <p>{props.bet.team1} Odds: {props.bet.team1Line}</p>
                </CardText>
            </Card>
        )
    }
    
}
export default SavedBet;