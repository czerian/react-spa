import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, CityName, Population, NotFound } from './components'

class App extends Component {
  render() {
    return (

        <Router>
          <Switch>
            <Route exact path='/react-spa/' component={Home}/>
            <Route exact path='/city_name' component={CityName}/>
            <Route exact path='/population' component={Population}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>

    );
  }
}

export default App;
