import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Social from './pages/Social';
import ErrorPage from "./pages/Error";
import './App.css';
import API from "./utils/API"


class App extends Component { 
  constructor(props) {
    super(props)
    this.state = {
        loggedIn: false,
        user: null
    }
    this._getUser = this._getUser.bind(this)
    }
    componentDidMount() {
        this._getUser()
    }

    _getUser() {
        API.getUser()
            .then(res=> {
                this.setState({loggedIn: true, user: res.data.user })
            })
            .catch(err=>console.log(err))
    }
    render() {
      if (this.state.user === null) {
        return (
          <Router basename="/">
            <div>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/social" component={Social} />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </Router>
        )  
      }
      if (this.state.user !== null) {
        return (
          <Router basename="/">
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/saved" component={Saved} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/social" component={Social} />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </Router>
        )
      }
    }
  }
  

 (
  
);

export default App;
