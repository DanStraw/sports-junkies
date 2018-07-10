import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Navbar from '../../components/Navbar';
import './social.css';
import Twit from '../../components/Twit.js';
import API from '../../utils/API';
import { List } from 'react-mdl';

class Social extends Component {
    state = {
        account: 'billsimmons',
        tweets: [],
        
    }
    componentDidMount() {
        this.displaytweets(this.state.account)
    }

    displaytweets = account => {
        API.getTweets(account)
            .then(res => {
                this.setState({ tweets: res.data })
            })
            .catch(err => console.log(err))
    }

    handleSelectChange = event => {
        this.setState({account: event.target.value })
        this.displaytweets(event.target.value)
    }

    render() {
        const experts = ["billsimmons", "notthefakeSVP", "darrenrovell", "ColinCowherd", "VegasPointBlank", "kellyinvegas", "ESPNStatsInfo"]
        return (
            <div>
                <Navbar />
                <br />
                <Grid className="demo-grid-3">
                    <Cell col={6} tablet={6}>Sports Articles</Cell>
                    <Cell col={6} tablet={6}>
                        <div>
                            <h3>Sports Tweets</h3>
                            <select onChange={this.handleSelectChange} value={this.state.account}>
                                <option disabled selected value="">Select an Expert</option>
                                {experts.map(expert => {
                                    return <option value={expert}>{expert}</option>
                                })}
                            </select>
                            <List style={{width: '650px', background: 'url("/assets/twitter.png")'}}>
                                {this.state.tweets.map(tweet => {
                                    return <div className="tweet"><Twit user={tweet.account} avatar={tweet.avatar} text={tweet.text} created={tweet.created} /></div>
                                })

                                }
                            </List>
                        </div>
                    </Cell>
                </Grid>
            </div>
        )
    }
}
export default Social;