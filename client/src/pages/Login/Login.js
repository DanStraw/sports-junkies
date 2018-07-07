import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';

class Login extends Component {
    state = {
        username: "",
        password: "",
        contact: "",
    isRegistered:false
    }
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const value = event.target.value;
        const name = event.target.name;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        API.saveUser({
            username: this.state.username,
            password: this.state.contact,
            email: this.state.contact
        })
        .then(res => console.log('saved user:', res))
        .catch(err => console.log(err));
    }

    render() {
        return (
         <div>
             <Navbar />
                {this.state.username}
                {this.state.password}
                {this.state.contact}
                <form onSubmit={this.handleFormSubmit} className="login-page">
                    <div className="form">
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={this.handleInputChange} />
                        <input
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={this.handleInputChange} />
                        <input
                            className="text"
                            name="contact"
                            placeholder="Email or Phone Number"
                            onChange={this.handleInputChange} />
                        <button>Create</button>
                        <p className="message">Already Registered?<Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        )


    }


}

export default Login;