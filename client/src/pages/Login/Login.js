import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Navbar from '../../components/Navbar.js';
import { Button } from 'react-mdl';
import API from '../../utils/API';

class Login extends Component {
    state = {
        username: "",
        password: "",
        passwordPlaceHolder: '',
        contact: "",
        isRegistered:false,
        message: ''
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
            password: this.state.password,
            email: this.state.contact
        })
        .then(res => API.setID({id: res.data._id }))
        .then(this.setState({username: '', password: '', email: '', message: 'Account Created!'}))
        .catch(err => console.log(err));
    };

    googleLogin = event => {
        event.preventDefault()
        API.googleLogin()
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }



    render() {
        return (
         <div>
             <Navbar />
                <div>
                    <form className="login-page">
                        <div className="form">
                            <input
                                type="text"
                                placeholder="username"
                                name="username"
                                onChange={this.handleInputChange}
                                value={this.state.username} />
                            <input
                                type="text"
                                placeholder="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange} />
                            <input
                                className="text"
                                name="contact"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleInputChange} />
                            <button onClick={this.handleFormSubmit}>Create</button>
                            <p className="message">Already Registered?<Link to="/login">Login</Link></p>
                            <Button onClick={this.googleLogin} raised colored>Login with Google</Button> 
                            <p>{this.state.message}</p>
                            
                        </div>
                           
                    </form>
                    
                </div>
            </div>
        )


    }


}

export default Login;