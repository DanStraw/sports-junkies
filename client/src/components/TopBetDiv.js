import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';

const TopBetDiv = (props) => {
    return (
        <Card className="bet-div" shadow={1} style={{width: '280px', height: '280px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', borderBottom: '1px solid #fff' }}>#{props.rank}: {props.team}</CardTitle>
            <CardText style={{color: '#fff'}}>
                <p>Bet Type: {props.type}</p>
                <p>League: {props.league}</p>
                <p>Line: {props.line}</p>
            </CardText>
        </Card>
    )
}
export default TopBetDiv;