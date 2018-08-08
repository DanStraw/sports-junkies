import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';
import { Grid, Cell, Button } from 'react-mdl';
import './home.css';
import TopBetDiv from '../../components/TopBetDiv';
import MlbBetDiv from '../../components/MlbBetDiv';
import SeasonBetDiv from '../../components/SeasonBetDiv.js';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bets: [],
            dailyBets: [],
            seasonOdds: [],
            header: '',
            wager_team: '',
            wager: '',
            month: '',
            day: '',
            loggedIn: false,
            user: null
        }
        this.getTopBets = this.getTopBets.bind(this)
        this.getMlbGames = this.getMlbGames.bind(this)
        this.getSeasonOdds = this.getSeasonOdds.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this._getUser = this._getUser.bind(this)
    }
    componentDidMount() {
        this.getTopBets()
        this._getUser()
    }
    _getUser() {
        API.getUser()
            .then(res=> {
                if (res.data.user) {
                    this.setState({loggedIn: true, user: res.data.user })
                } else {
                    this.setState({loggedIn: false, user: null })
                }
                
            })
            .catch(err=>console.log(err))
    }
    getTopBets() {
        API.getTrendingBets()
            .then(res=> {
                this.setState({ bets: res.data, dailyBets: [], seasonOdds: [], header: 'Most Popular Teams' })
            })
            .catch(err=>console.log(err));
    };
    getMlbGames(event) {
        event.preventDefault()
        let req = {
            day: this.state.day,
            month: this.state.month,
        }
        API.getMlbGames(req)
            .then(res=> {
                this.setState({ bets: [], dailyBets: res.data, seasonOdds: [], header: this.state.month + "/" + this.state.day + "/18 MLB Games"  })
            })
            .catch(err=>console.log(err))
    };
    getSeasonOdds(league) {
        this.setState({seasonOdds: []})
        API.getSeasonOdds(league)
            .then(res=> {
                this.setState({ bets: [], dailyBets: [], seasonOdds: res.data, header: res.data[0] })
            })
            .catch(err=>console.log(err))
    };
    handleSelectChange(event) {
        this.getSeasonOdds(event.target.value)  
    };

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    saveBet = betData => {
        betData.wager = this.state.wager;
        betData.wager_team = this.state.wager_team
        switch (betData.wager_team) {
            case betData.team1.team:
                betData.odds = betData.team1.moneyLine
                let odds = betData.odds
                betData.sign = odds.slice(0, 2).trim()
                betData.wagerOdds = odds
                betData.wagerOdds = betData.wagerOdds.trim().slice(1, betData.wagerOdds.length)
                this.createBetModel(betData)
                break;
            case betData.team2.team:
                betData.odds = betData.team2.moneyLine
                odds = betData.odds
                betData.sign = odds.slice(0, 2).trim()
                betData.wagerOdds = odds
                betData.wagerOdds = betData.wagerOdds.trim().slice(1, betData.wagerOdds.length)
                this.createBetModel(betData)
                break;
            default:
                break;
        }
    };

    saveSeasonBet = team => {
        console.log(team)
        API.saveSeasonBet(team, this.state.user._id)
            .then(res=>{
                console.log('bet added:', res.data)
            })
            .catch(err=>console.log(err))
    }
    createBetModel(betData) {
        console.log('betdata:', betData)
        
        const betModel = {
            typeOfBet: 'moneyLine',
            team1: betData.team1.team,
            team2: betData.team2.team,
            team1Line: betData.team1.moneyLine.trim(),
            team2Line: betData.team2.moneyLine.trim(),
            key: betData.key,
            date: betData.key.slice(0,8),
            wager_team: this.state.wager_team,
            wager: this.state.wager,
        }
        if (betData.sign === "-") {
            betModel.payout = parseFloat(betModel.wager) / parseFloat(betData.wagerOdds) * 100
            betModel.payout = betModel.payout.toFixed(2)
        }
        if (betData.sign === "+") {
            betModel.payout = parseFloat(betModel.wager) * parseFloat(betData.wagerOdds) / 100
            betModel.payout = betModel.payout.toFixed(2)
        }
        API.saveBet(betModel, this.state.user._id)
            .then(res=>{
                console.log('bet added, ' + res.data)
            })
            .catch(err => console.log(err))
    }

    render() {
        let months = [];
        for (let i = 0; i < 12; i++) {
            months.push(i + 1)
        }
        let days = [];
        for (let i = 0; i < 31; i++) {
            days.push(i + 1)
        }
        return (
            <div>
                <Navbar logged={this.state.loggedIn}/>
                <div>
                    <Grid className="demo-grid-1">
                        <Cell col={4}><Button raised colored onClick={this.getTopBets}>Top Bets</Button></Cell>
                        <Cell col={4}>
                            <form>
                                <label htmlFor="month">Month</label>
                                <select  onChange={this.handleChange.bind(this)} value={this.state.month} name="month">
                                    <option value="">MM</option>
                                    {months.map(month=><option key={month} value={month}>{month}</option>)}   
                                </select>
                                <label htmlFor="day">Day</label>
                                <select  onChange={this.handleChange.bind(this)} value={this.state.day} name="day">
                                    <option value="">DD</option>
                                    {days.map(day=><option key={day} value={day}>{day}</option>)}   
                                </select>
                                <Button raised colored onClick={this.getMlbGames}>Get MLB Games</Button>
                            </form>
                        </Cell>
                        <Cell col={4}>
                        <label>Championship Odds </label>
                        <select value={this.state.league} onChange={this.handleSelectChange} >
                            <option value=''>-Choose a League-</option>
                            <option value="mlb">MLB</option>
                            <option value="nfl">NFL</option>
                            <option value="nba">NBA</option>
                            <option value="nhl">NHL</option>
                        </select></Cell>
                    </Grid>
                </div>
                <div>
                    <h4>{this.state.header}</h4>
                    {this.state.bets.length ? (
                        <Grid className="demo-grid-2">
                            {this.state.bets.map((bet, index)=> {
                                if (index <= 9) {
                                    return (
                                    <Cell col={4} key={bet.key}>                                     
                                        <TopBetDiv
                                            rank={bet.rank} 
                                            league={bet.league}
                                            line={bet.lvhCurrentLine}
                                            team={bet.team}
                                            type={bet.type}
                                            />
                                    </Cell>
                                    )
                                } else {
                                    return false;
                                }
                            })
                            }
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div>
                    {this.state.dailyBets.length ? (
                        <Grid className="demo-grid-2 daily-bets">
                            {this.state.dailyBets.map(dailyBet => {
                                return (
                                <div className="bet" key={dailyBet.key}>
                                    <Cell col={3}>
                                        <MlbBetDiv
                                            bet={dailyBet}
                                            changeHandler={this.handleChange.bind(this)}
                                            wager={this.state.wager}
                                            wager_team={this.state.wager_team}
                                        />        
                                        <Button colored onClick={() => this.saveBet(dailyBet)}>Save Bet</Button>                          
                                    </Cell>                                   
                                </div> 
                                )}   
                            )})
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div>
                    {this.state.seasonOdds.length ? (
                        <div>
                            <Grid className="demo-grid-2">
                                {this.state.seasonOdds.map((team, index) => {
                                    switch(index) {
                                        case 0:
                                            return false;
                                        default:
                                            return (
                                                <Cell col={2} key={team.key}>
                                                    <SeasonBetDiv
                                                        team={team.name}
                                                        rank={index}
                                                        odds={team.odds}
                                                    />
                                                    <Button raised colored onClick={() => this.saveSeasonBet(team)}>Track this Team</Button>
                                                </Cell> 
                                            )
                                        }
                                    }
                                )}
                            </Grid>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        )
    }
}
export default Home;

