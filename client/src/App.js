import React, { useState } from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link, useParams} from 'react-router-dom'

import Navbar from './Components/Core/Navbar'

const App = (props) => {
  const [user, setUser] = useState(null)
  const [activeItem, setActiveItem] = useState("dashboard")
  const {token, id} = useParams() 

  if (props.isAuth === true) {
    
  }

  const handleItemClick = (e, {name}) => {
    setActiveItem(name)
  }

  return (
    <div id="app">
        <Navbar />
        <Container>
          <Header 
            size='huge'
            content="Welcome Bob!"
            style={{
              marginTop: '2em',
              textAlign: 'center'
            }}
          />
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
      </div>
  )
}

export default App