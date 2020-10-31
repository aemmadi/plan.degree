import React from 'react'
import { Provider } from 'rebass'

import Login from './Components/Login/Login'

const App = props => (
  <Provider>
    <Login/>
  </Provider>
)

export default App;
