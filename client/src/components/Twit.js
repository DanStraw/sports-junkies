import React, { Component } from 'react';
import { ListItem, ListItemContent } from 'react-mdl';

class Twit extends Component {

    render() {
        return(
            <div>
              <ListItem style={{borderBottom: 'black ridge 2px'}} threeLine>
                <ListItemContent style={{color: 'black', textShadow: '-1px 0 #eae5e5, 0 1px #eae5e5, 1px 0 #eae5e5, 0 -1px #eae5e5'}}>{this.props.user}</ListItemContent>
                <ListItemContent style={{color: 'black', textShadow: '-1px 0 #eae5e5, 0 1px #eae5e5, 1px 0 #eae5e5, 0 -1px #eae5e5'}}>{this.props.text}</ListItemContent>
                <ListItemContent style={{color: 'black', textShadow: '-1px 0 #eae5e5, 0 1px #eae5e5, 1px 0 #eae5e5, 0 -1px #eae5e5'}}>{this.props.created}</ListItemContent>
              </ListItem>
            </div>
        )
    }
}    

export default Twit;