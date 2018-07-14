import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl';

class Articles extends Component {
  render() {
    return( 
      <Card shadow={0} style={{width: '40%', height: 'auto', float: 'left', marginBottom: '5px', marginLeft: '5%', backgroundColor: '#6f2929', opacity: '0.9'}}>
        <CardTitle style={{ color: '#fff' }}>{this.props.title} by {this.props.author}</CardTitle>
        <CardText style={{ color: '#fff' }}>
          <p>from {this.props.source}<img src={this.props.image} width="75px" height="75px" alt="N/A"/></p>
          <p>{this.props.description}</p>
          <p>Published: {this.props.pubDate}</p>
        </CardText>
        <CardActions border>
          <a href={this.props.url} target="_blank">Link</a>
        </CardActions>
      </Card>
    )
  }
}

export default Articles;