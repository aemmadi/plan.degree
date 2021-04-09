import React, { useEffect, useState } from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import Navbar from './Components/Core/Navbar'
import Onboarding from './Components/User/Onboarding'
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

  useEffect(() => {
    if(user === null) {
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
        setUser(content.data)
      })()
    }
  }, [])

  const handleItemClick = (e, {name}) => {
    setActiveItem(name)
  }

  const renderMain = () => {
    if(user !== null) {
      if(user.data.isOnboarding) {
        return <Onboarding user={user} />
      }

      return (
        <Container>
            <Header 
              size='huge'
              style={{
                marginTop: '2em',
                textAlign: 'center'
              }}
            >
              Welcome {user.firstName}!
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
  }

  return (
    <div id="app">
        <Navbar />
        {renderMain()}
      </div>
  )
}

export default App