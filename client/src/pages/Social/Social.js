import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Navbar from '../../components/Navbar';
import './social.css';

class Social extends Component {
   constructor(props) {
       super(props);
       this.state = {
           search: '',
           news: props.newsArticles
       };
   }

   updateSearch(event) {
       this.setState({search: event.target.value});
   }

   addContact(event) {
    event.preventDefault();
      console.log(this);
   }

    render() {
       let filteredArticles = this.props.articles.filter(
         (articles) => {
             return articles.name.toLowerCase().indexOf(this.state.search)
         }  
     )
        return (
            <div>
              <div>
              <input type="text"
                placeholder="Search"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}/>
              <form onSubmit={this.addButton.bind(this)}>
                <input type="text" ref="sports articles" />
                <button className="btn btn-default">Search News Articles</button>
              </form>
              <ul>
                {filteredNews.map((news)=> {
                  return <News articles={articles} key={articles.id}/>               
                })}
              </ul>       
            </div>
    
            <div>  
              <Navbar />
                <br />
                <Grid className="demo-grid-3">
                    <Cell col={6} tablet={6}>Sports Articles</Cell>
                    <Cell col={6} tablet={6}>Sports Tweets</Cell>
                </Grid>
            </div>
          </div>  
        )
    }
}
export default Social;