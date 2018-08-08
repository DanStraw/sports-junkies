import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import API from '../../utils/API';
import SavedBet from '../../components/SavedBet';
import { Grid, Cell } from 'react-mdl';
import './saved.css';


class Saved extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savedBets: [],
            loggedIn: false,
            user: null,
        }
        this.getUsersBets = this.getUsersBets.bind(this)
        this._getUser = this._getUser.bind(this)
    }
    
    componentDidMount() {
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
            .then(()=>{
                this.getUsersBets()
            })
            .catch(err=>console.log(err))
    }

    getUsersBets() {
        this.setState({savedBets: []})
        API.getUsersBets(this.state.user._id)
            .then(res=> {
                if (res.data !== "") {
                    this.setState({ savedBets: res.data.bets, user_name: res.data.username})
                }
            })
            .catch(err=> {
                console.log(err)
            })
    }
    render() {
        if (!this.state.user) {
            return (
                <div>
                    <Navbar />
                    <Grid className="demo-grid-1">
                        <Cell col={12}><h2>Tracked Bets</h2></Cell>
                    </Grid>
                    <div> 
                        <div style={{color: 'white', textAlign: 'center'}}><Cell col={12}><h4>No Saved Bets - Login to Save Bets</h4></Cell></div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Navbar logged={this.state.loggedIn} />
                    <Grid className="demo-grid-1">
                        <Cell col={12}><h2>{this.state.user.firstName}'s Tracked Bets</h2></Cell>
                    </Grid>
                    <div>
                        
                        {this.state.savedBets.length ? (
                            <div>
                               {this.state.savedBets.map(bet=> {
                                   console.log('hello bets')
                                  return (
                                    <div className="saved-bet">
                                      <Cell col={3} key={bet.key}>
                                        <SavedBet bet={bet} />
                                      </Cell>                                   
                                    </div> 
                                )})}
                            </div>
                        ) : (
                            <div style={{color: 'white', textAlign: 'center'}}><Cell col={12}><h4>No Saved Bets</h4></Cell></div>
                        )
                        }
                    </div>
                </div>
            )
        }
    }      
}

export default Saved;