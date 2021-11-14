import React, { useEffect, useState } from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Navbar from './Components/Core/Navbar'

const App = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  

  if (!isAuthenticated) {
    return loginWithRedirect()
  }

  if(isAuthenticated && user) {
    const mainApp = () => {
      return (
         <Container>
          <Header 
            size='huge'
            style={{
              marginTop: '2em',
              textAlign: 'center'
            }}
          >
            Welcome {user.name}!
          </Header>
          <Header 
            as="h2"
            content="Degree Plans"
            style={{
              textAlign: 'center'
            }}
          />
          <center style={{marginBottom: '1.5em'}}>
            <Button color='blue'>New Degree Plan</Button>{' '}
            <Button color='red'>Remove Plan</Button>
          </center>
          <Card.Group>
            <Card fluid as={Link} to="/demo" color='orange' header="My First Degree Plan" meta="Automatically generated degree plan." />
          </Card.Group>
        </Container>
      )
    }

    return (
      <div id="app">
        <Navbar />
        {mainApp()}
      </div>
    )
  }
}

export default App