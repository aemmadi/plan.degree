import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import App from './App';
import Landing from './Components/Landing/Landing'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path = "/">
        <Landing/>
      </Route>
      <Route exact path = "/getting-started">
        <App/>
      </Route>
    </div>
  </Router>,
  document.getElementById('root')
);
