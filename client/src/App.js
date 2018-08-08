import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Social from './pages/Social';
import ErrorPage from "./pages/Error";
import './App.css';


class App extends Component { 
  
    render() {
        return (
          <Router basename="/">
            <div>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/saved" component={Saved} />
                <Route exact path="/social" component={Social} />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </Router>
        )  
    }
}

export default App;
