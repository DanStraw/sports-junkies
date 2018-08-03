import React, { Component } from 'react';
import { Grid, Cell, List } from 'react-mdl';
import Navbar from '../../components/Navbar';
import './social.css';
import Twit from '../../components/Twit.js';
import API from '../../utils/API';
import Article from '../../components/Article';

class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experts: ["TwitVI", "billsimmons", "notthefakeSVP", "darrenrovell", "ColinCowherd", "VegasPointBlank", "kellyinvegas", "ESPNStatsInfo"],
            search: '',
            news: props.newsArticles,
            account: '',
            tweets: [],
            articles: []
        };
    }
    componentDidMount() {
        this.displaytweets('TwitVI');
        this.getArticles('baseball')
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
        console.log(this.state.search)
    }

    handleFormSubmit = event => {
        this.getArticles(this.state.search)      
        event.preventDefault()
    }
    getArticles(searchTerm) {
        API.getArticles(searchTerm)
        .then(res => {
            this.setState({articles: res.data})
        })
        .catch(err => console.log(err))
    }

    render() {   
        return (
            <div>  
              <Navbar />
                <br />
                <Grid className="demo-grid-3">
                    <Cell col={6} tablet={6}>
                        <div>
                        <h3>Sports Articles</h3>
                            <div>
                                <form style={{marginBottom: '10px'}} onSubmit={this.handleFormSubmit.bind(this)}>
                                    <input type="text" ref="sports articles" placeholder="baseball" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                                    <button className="btn btn-default">Search News Articles</button>
                                </form>
                                {this.state.articles.map(article=>{
                                    return <Article title={article.title}
                                        author={article.author}
                                        description={article.description}
                                        source={article.source}
                                        url={article.url}
                                        image={article.image}
                                        pubDate={article.published}
                                    />
                                    })
                                }
                            </div>
                        </div>
                    </Cell>
                    <Cell col={6} tablet={6}>
                        <div>
                            <h3>Sports Tweets</h3>
                            <select onChange={this.handleSelectChange.bind(this)} value={this.state.account}>
                                <option selected value="">Select an Expert</option>
                                {this.state.experts.map(expert => {
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