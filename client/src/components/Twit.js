import React, { Component } from 'react';
import { ListItem, ListItemContent } from 'react-mdl';

class Twit extends Component {

    render() {
        return(
            <div className="projects-twit">
              <ListItem style={{borderBottom: 'black ridge 2px', width: 'auto'}} threeLine>
                <ListItemContent style={{color: '#eae5e5', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>{this.props.user}</ListItemContent>
                <ListItemContent style={{color: '#eae5e5', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>{this.props.text}</ListItemContent>
                <ListItemContent style={{color: '#eae5e5', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>{this.props.created}</ListItemContent>
              </ListItem>
            </div>
        )
    }
}    

export default Twit;