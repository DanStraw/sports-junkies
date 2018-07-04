// import './login.js';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import React from 'react';
import { Link } from 'react-router-dom';
// style={{ backgroundColor: '#194d33' }}
// style={{ height: '300px', position: 'relative' }}
const Navbar = () => (

    <div id ="myNav">
        <Layout fixedHeader>
            <Header className="header-color" title={<span><span > </span><strong>Sports Junkies</strong></span>}>
                <Navigation>
                    <Link to="/home">Home</Link>
                    <a href="#">Dashboard</a>
                    <a href="#">Contact</a>
                    <a href="#">Login</a>
                </Navigation>
            </Header>
            <Drawer title="Sports Junkies">
                <Navigation>
                    <a href="#">Home</a>
                    <a href="#">Dashboard</a>
                    <a href="#">Contact</a>
                    <a href="#">Login</a>
                </Navigation>
            </Drawer>
            <Content />
        </Layout>
    </div>

)
export default Navbar;