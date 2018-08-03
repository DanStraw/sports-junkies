import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl';

const MlbBetDiv = (props) => {
    return (
        <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff', height: '40px' }}>{props.bet.team1.team} vs. {props.bet.team2.team}</CardTitle>
            <CardText style={{color: '#fff'}}>
                <p>{props.bet.team1.team} MoneyLine: {props.bet.team1.moneyLine}</p>
                <p>{props.bet.team2.team} MoneyLine: {props.bet.team2.moneyLine}</p>
                <p>OverUnder: {props.bet.team1.overUnder}</p>
                <p>Enter a Wager for a Money Line Bet:</p> 
            </CardText>
            <CardActions>
                <select onChange={props.changeHandler} value={props.wager_team} name="wager_team">
                    <option selected value="">Pick a Team</option>
                    <option value={props.bet.team1.team}>{props.bet.team1.team}</option>
                    <option value={props.bet.team2.team}>{props.bet.team2.team}</option>
                </select>
                <input onChange={props.changeHandler} name="wager" />
                
            </CardActions>
        </Card>
    )
}
export default MlbBetDiv;