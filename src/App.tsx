import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/car/:stockNumber" component={CarDetails} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
