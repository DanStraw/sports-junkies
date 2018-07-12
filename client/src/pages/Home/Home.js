import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';
import { Grid, Cell, Button } from 'react-mdl';
import './home.css';
import TopBetDiv from '../../components/TopBetDiv';
import MlbBetDiv from '../../components/MlbBetDiv.js';
import SeasonBetDiv from '../../components/SeasonBetDiv.js';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bets: [],
            mlbBets: [],
            seasonOdds: [],
            header: ''
        }
        this.getTopBets = this.getTopBets.bind(this)
        this.getMlbGames = this.getMlbGames.bind(this)
        this.getSeasonOdds = this.getSeasonOdds.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.saveBet = this.saveBet.bind(this)
    }
    componentDidMount() {
        this.getTopBets()
    }
    getTopBets() {
        API.getTrendingBets()
            .then(res=> {
                this.setState({ bets: res.data, mlbBets: [], seasonOdds: [], header: 'Most Popular Teams' })
            })
            .catch(err=>console.log(err));
    };
    getMlbGames() {
        API.getMlbGames()
            .then(res=> {
                this.setState({ bets: [], mlbBets: res.data, seasonOdds: [], header: "Today's MLB Games"  })
            })
            .catch(err=>console.log(err))
    };
    getSeasonOdds(league) {
        API.getSeasonOdds(league)
            .then(res=> {
                this.setState({ bets: [], mlbBets: [], seasonOdds: res.data, header: res.data[0] })
            })
            .catch(err=>console.log(err))
    };
    handleSelectChange(event) {
        this.getSeasonOdds(event.target.value)  
    };
    saveBet = betData => {
        console.log(betData)
    };

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <Grid className="demo-grid-1">
                        <Cell col={4}><Button raised colored onClick={this.getTopBets}>Top Bets</Button></Cell>
                        <Cell col={4}><Button raised colored onClick={this.getMlbGames}>Today's Games</Button></Cell>
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
                                            type={bet.type}/>
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
                    {this.state.mlbBets.length ? (
                        <Grid className="demo-grid-2">
                            {this.state.mlbBets.map(mbet => (
                                <Cell col={3} key={mbet.key}>
                                    <MlbBetDiv saveClickHandler={() => this.saveBet(mbet)}
                                        team1={mbet.team1.team}
                                        team2={mbet.team2.team}
                                        t1MoneyLine={mbet.team1.moneyLine}
                                        t2MoneyLine={mbet.team2.moneyLine}
                                        overUnder={mbet.team1.overUnder}
                                    />
                                </Cell>    
                            ))}
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

