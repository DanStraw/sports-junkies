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
            user_name: ''
        }
        this.getUsersBets = this.getUsersBets.bind(this)
    }
    
    componentDidMount() {
        this.getUsersBets()
    }
    getUsersBets() {
        this.setState({savedBets: []})
        API.getUsersBets()
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
        return (
            <div>
                <Navbar />
                <Grid className="demo-grid-1">
                    <Cell col={12}><h2>{this.state.user_name}'s Tracked Bets</h2></Cell>
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

export default Saved;