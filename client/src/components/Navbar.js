import { Header, Navigation, Content } from 'react-mdl';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        if (!this.props.logged) {
            return (
                <div id ="myNav">
                 <Header className="header-color" title={<span><span > </span><strong>Sports Junkies</strong></span>}>
                     <Navigation>
                         <Link to="/home">Home</Link>
                         <Link to="/login">My Tracked Bets</Link>
                         <Link to="/social">Get Informed</Link>
                         <Link to="/login">login</Link>
                     </Navigation>
                 </Header>
                 <Content />
              </div>
            )
        } else {
            return (
                <div id ="myNav">
                    <Header className="header-color" title={<span><span > </span><strong>Sports Junkies</strong></span>}>
                        <Navigation>
                            <Link to="/home">Home</Link>
                            <Link to="/saved">My Tracked Bets</Link>
                            <Link to="/social">Get Informed</Link>
                            <a href="/auth/logout">Log Out</a>
                        </Navigation>
                    </Header>
                    <Content />
                </div>
            )
        }
        
    }
}
export default Navbar;