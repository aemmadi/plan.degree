import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import 'semantic-ui-css/semantic.min.css'

import Login from './Components/Auth/Login'
import SignUp from './Components/Auth/SignUp'
import Confirm from './Components/Auth/Confirm'
import ResendConfirm from './Components/Auth/ResendConfirm'
import App from './App';
import Landing from './Components/Landing/Landing'
import Planner from './Components/Planner/Planner'

ReactDOM.render(
  <Router>
      <Route exact path = "/">
        <Landing/>
      </Route>
      <Route exact path = "/login">
        <Login/>
      </Route>
      <Route exact path = "/signup">
        <SignUp/>
      </Route>
      <Route exact path = "/auth/confirm/success">
        <Confirm success={true}/>
      </Route>
      <Route exact path = "/auth/confirm/error">
        <Confirm success={false}/>
      </Route>
      <Route exact path = "/resend-confirmation">
        <ResendConfirm/>
      </Route>
      <Route exact path = "/app">
        <App/>
      </Route>
      <Route exact path = "/demo">
        <Planner/>
      </Route>
  </Router>,
  document.getElementById('root')
);
