// import './login.js';
import { Header, Navigation, Drawer, Content } from 'react-mdl';
import React from 'react';
import { Link } from 'react-router-dom';
// style={{ backgroundColor: '#194d33' }}
// style={{ height: '300px', position: 'relative' }}
const Navbar = () => (

    <div id ="myNav">
            <Header className="header-color" title={<span><span > </span><strong>Sports Junkies</strong></span>}>
                <Navigation>
                    <Link to="/home">Home</Link>
                    <Link to="/Saved">Dashboard</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">login</Link>
                </Navigation>
            </Header>
            <Drawer title="Sports Junkies">
                <Navigation>
                    <Link to="/home">Home</Link>
                    <Link to="/Saved">Dashboard</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">login</Link>
                </Navigation>
            </Drawer>
            <Content />
    </div>

)
export default Navbar;