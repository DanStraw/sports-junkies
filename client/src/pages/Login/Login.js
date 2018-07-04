import React, { Component } from 'react';
import './login.css';
import Navbar from '../../components/Navbar.js';

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
    render() {
        return (
         <div>
             <Navbar />
                {this.state.username}
                {this.state.password}
                {this.state.contact}
                <form className="login-page">
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
                        <p className="message">Already Registered? <a href="#">Login</a></p>
                    </div>
                </form>
            </div>
        )


    }


}

export default Login;