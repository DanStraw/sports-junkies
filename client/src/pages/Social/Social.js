import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Navbar from '../../components/Navbar';
import './social.css';

class Social extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <br />
                <Grid className="demo-grid-3">
                    <Cell col={6} tablet={6}>Sports Articles</Cell>
                    <Cell col={6} tablet={6}>Sports Tweets</Cell>
                </Grid>
            </div>
        )
    }
}
export default Social;