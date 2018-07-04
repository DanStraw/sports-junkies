import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from "./pages/Error";
import './App.css';


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
