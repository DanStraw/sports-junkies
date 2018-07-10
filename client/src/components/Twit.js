import React, { Component } from 'react';
import { Card, CardActions, CardTitle } from 'react-mdl';

class Twit extends Component {
    constructor(props) {
        super(props);
        this.state= { activeTab: 0 };
    }

    toggleCategories() {

        if(this.state.activeTab === 0){
            return(

            <div className="projects-twit">
              <Card shadow={5} style={{width: '256px', height: '256px', background: 'url(https://logos-download.com/wp-content/uploads/2016/02/Twitter_logo_bird_transparent_png.png) center / cover', margin: 'auto'}}>
                <CardTitle expand />
                <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}> 
                <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
            
                </span>
                </CardActions>
              </Card>
            </div>
            )
        }    
    } 

    render() {
        return(
        
        <div className="category-tabs">
           <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
     
            <Layout style={{background: 'url(../assets/.jpg) center / cover'}}>
    
           <Grid>
            <Cell col={12}>
        <div className="content">{this.toggleCategories()}</div>
        </Cell>
      </Grid>  
    </Layout> 
    </Tabs>
 </div>

 )
}
}    

export default Twit;