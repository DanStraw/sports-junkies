import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';
import { Grid, Cell, Button } from 'react-mdl';
import './home.css';


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
    }
    componentDidMount() {
        this.getTopBets()
    }
    getTopBets() {
        API.getTrendingBets()
            .then(res=> {
                this.setState({ bets: res.data, mlbBets: [], seasonOdds: [], header: 'Top Trending Bets' })
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
    }
    handleSelectChange(event) {
        this.getSeasonOdds(event.target.value)
        
    }

    componentDidUpdate() {
        console.log(this.state.header)
    }

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
                                        <div className="betDiv">
                                            <ul>
                                                <li>{bet.rank}</li>
                                                <li>{bet.league}</li>
                                                <li>{bet.lvhCurrentLine}</li>
                                                <li>{bet.team}</li>
                                                <li>{bet.type}</li>
                                            </ul>
                                        </div>
                                    </Cell>
                                    )
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
                                    <div className="betDiv">
                                        <ul>
                                            <li>{mbet.team1.team}</li>
                                            <li>{mbet.team1.moneyLine}</li>
                                            <li>{mbet.team1.overUnder}</li>
                                            <li>{mbet.team2.team}</li>
                                            <li>{mbet.team2.moneyLine}</li>
                                        </ul>
                                    </div>
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
                                            break;
                                        default:
                                            return (
                                                <Cell col={2} key={team.key}>
                                                    <div className="betDiv">
                                                        <ul>
                                                            <li>{team.name}</li>
                                                            <li>{team.odds}</li>
                                                        </ul>
                                                    </div>
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

