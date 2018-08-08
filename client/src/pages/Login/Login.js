import React, { Component } from 'react';
import './login.css';
import Navbar from '../../components/Navbar.js';
import API from '../../utils/API';

class Login extends Component {
    state = {
        loggedIn: false,
        user: null,
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

    render() {
        return (
         <div>
             <Navbar logged={this.state.loggedIn} />
                <div>
                    <form className="login-page">
                      <div className="form">
                        <a className="google-btn" href="/auth/google">
                            Login with Google
                        </a>
                      </div>  
                    </form>                        
                </div>
         </div>
        )
    }
}

export default Login;