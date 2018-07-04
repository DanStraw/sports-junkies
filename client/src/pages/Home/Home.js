import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';

class Home extends Component {
    state = {
        bets: ''
    }

    componentDidMount() {
        API.getTrendingBets()
            .then(res=> {
                this.setState({ bets: res.data })
            })
            .catch(err=>console.log(err));
    }

    componentDidUpdate() {
        console.log(this.state.bets);
    }

    render() {
        return(
            <div>
                <Navbar />
                <div>
                </div>
                
            </div>
        )
    }
}
export default Home;

