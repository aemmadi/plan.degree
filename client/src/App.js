import React, { useState } from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import Navbar from './Components/Core/Navbar'
import { getSessionId } from './util'

const App = () => {
  const [cookie, setCookie] = useCookies()
  const [user, setUser] = useState(null)
  const [activeItem, setActiveItem] = useState("dashboard")
  const history = useHistory()

  const sessionId = getSessionId(cookie)
  if(!sessionId) {
    history.push("/login")
  }

  (async () => {
    const response = await fetch(`/session/${sessionId}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })

    const content = await response.json()
    console.log(content.data)
  })()

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