import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';
import { Grid, Cell, Button } from 'react-mdl';
import './home.css';
import TopBetDiv from '../../components/TopBetDiv';
import DailyBetDiv from '../../components/DailyBetDiv';
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
        }
        this.getTopBets = this.getTopBets.bind(this)
        this.getMlbGames = this.getMlbGames.bind(this)
        this.getSeasonOdds = this.getSeasonOdds.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    componentDidMount() {
        this.getTopBets()
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
        console.log(req)
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

    saveBet = (betData, event) => {
        event.preventDefault()
        betData.wager = this.state.wager;
        betData.wager_team = this.state.wager_team
        switch (betData.wager_team) {
            case betData.team1.team:
                betData.odds = betData.team1.moneyLine
                let odds = betData.odds
                let sign = odds.slice(0, 2).trim()
                break;
            case betData.team2.team:
                betData.odds = betData.team2.moneyLine
                odds = betData.odds
                sign = odds.slice(0, 2).trim()
                console.log(sign, sign.length)
        }
        // API.saveBet()
    };

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
                <Navbar />
                <div>
                    <Grid className="demo-grid-1">
                        <Cell col={4}><Button raised colored onClick={this.getTopBets}>Top Bets</Button></Cell>
                        <Cell col={4}>
                            <form>
                                <label for="month">Month</label>
                                <select  onChange={this.handleChange.bind(this)} value={this.state.month} name="month">
                                    <option value="">MM</option>
                                    {months.map(month=><option key={month} value={month}>{month}</option>)}   
                                </select>
                                <label for="day">Day</label>
                                <select  onChange={this.handleChange.bind(this)} value={this.state.day} name="day">
                                    <option value="">DD</option>
                                    {days.map(day=><option key={day} value={day}>{day}</option>)}   
                                </select>
                                <Button raised colored onClick={this.getMlbGames}>Today's Games</Button>
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
                                        <TopBetDiv saveClickHandler={() => this.saveBet(bet)} 
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
                                <div className="bet">
                                    <Cell col={3} key={dailyBet.key}>
                                        <DailyBetDiv saveClickHandler={() => this.saveBet(dailyBet)}
                                            bet={dailyBet}
                                        />
                                        <div><p>Wager on Money Line</p></div>
                                        <form onSubmit={this.saveBet.bind(this, dailyBet)}>
                                            <select onChange={this.handleChange.bind(this)} value={this.state.wager_team} name="wager_team">
                                                <option selected value="">Pick a Team</option>
                                                <option value={dailyBet.team1.team}>{dailyBet.team1.team}</option>
                                                <option value={dailyBet.team2.team}>{dailyBet.team2.team}</option>
                                            </select>
                                            <input value={this.props.wager} onChange={this.handleChange.bind(this)} name="wager" />
                                            <Button colored type="submit">Save Bet</Button>
                                        </form>   
                                        
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
                                                    <SeasonBetDiv saveClickHandler={() => this.saveBet(team)}
                                                        team={team.name}
                                                        rank={index}
                                                        odds={team.odds}
                                                    />
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

