import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';

class Articles extends Component {
  render() {
    return(
      <Grid>
        <Cell col={3}>
        <p>{this.props.news} - {this.props.articles}</p>
        </Cell>
        <Cell col={9}>
         <h4 style={{marginTop: '0px'}}>{this.props.newsArticles}</h4>
         <p>{this.props.articleDescription}</p>
         
         </Cell>
      </Grid>  
    )
  }
}

export default Articles;