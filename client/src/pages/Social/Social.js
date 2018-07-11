import React, { Component } from 'react';
import { Grid, Cell, List } from 'react-mdl';
import Navbar from '../../components/Navbar';
import './social.css';
import Twit from '../../components/Twit.js';
import API from '../../utils/API';

class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            news: props.newsArticles,
            account: '',
            tweets: [],
            articles: []
        };
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

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    handleFormSubmit() {
        console.log('ehhlo')
        // API.getArticles(this.state.search)
    }

    addContact(event) {
        event.preventDefault();
        console.log(this);
    }

    render() {
        const experts = ["billsimmons", "notthefakeSVP", "darrenrovell", "ColinCowherd", "VegasPointBlank", "kellyinvegas", "ESPNStatsInfo"];
        // let filteredArticles = this.state.articles.filter(
        //     (articles) => {
        //         return articles.name.toLowerCase().indexOf(this.state.search)
        //     } 
        // )
       
        return (
            <div>  
              <Navbar />
                <br />
                <Grid className="demo-grid-3">
                    <Cell col={6} tablet={6}>
                        <div>
                        <h3>Sports Articles</h3>
                            <div>
                                <input type="text"
                                    placeholder="Search"
                                    value={this.state.search}
                                    onChange={this.updateSearch.bind(this)}/>
                                <form onSubmit={this.handleFormSubmit.bind(this)}>
                                    <input type="text" ref="sports articles" />
                                    <button className="btn btn-default">Search News Articles</button>
                                </form>
                                {/* <ul>
                                    {filteredNews.map((news)=> {
                                    return <News articles={articles} key={articles.id}/>               
                                    })}
                                </ul>*/}
                            </div>
                        </div>
                    </Cell>
                    <Cell col={6} tablet={6}>
                        <div>
                            <h3>Sports Tweets</h3>
                            <select onChange={this.handleSelectChange} value={this.state.account}>
                                <option selected value="">Select an Expert</option>
                                {experts.map(expert => {
                                    return <option value={expert}>{expert}</option>
                                })}
                            </select>
                            <List style={{width: '650px'}}>
                                {this.state.tweets.map(tweet => {
                                    return <div className="tweet" key={tweet.number}><Twit user={tweet.account} avatar={tweet.avatar} text={tweet.text} created={tweet.created} /></div>
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