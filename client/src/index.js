import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import 'semantic-ui-css/semantic.min.css'

import App from './App';
import Landing from './Components/Landing/Landing'
import Planner from './Components/Planner/Planner'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI}
  >
      <Router>
          <Route exact path = "/">
            <Landing/>
          </Route>
          <Route exact path = "/app">
            <App/>
          </Route>
          <Route exact path = "/plan/:id/:email">
            <Planner/>
          </Route>
      </Router>
  </Auth0Provider>,
  document.getElementById('root')
);
