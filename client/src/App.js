import React, { useEffect, useState } from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {generateSignature} from './util'
import Navbar from './Components/Core/Navbar'
import NewUserPage from './Components/Core/NewUserPage'
import PlanList from './Components/Core/PlanList'

const App = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [userData, setUserData] = useState(null)
  const [isNewUser, setNewUser] = useState(false)

  useEffect(() => {
    const hash = generateSignature()
    const getUserData = (hash) => {
      fetch(`${process.env.REACT_APP_API_URL}/v1/get_user?email=${user.email}&name=${user.name}&signature=${hash.signature}&key=${hash.key}`)
      .then(res => {
        if(res.status === 404)
          setNewUser(true)
        return res.json()
      })
      .then(data => {
        console.log(isNewUser, data)
        setUserData(data)
      })
    }
    if(user) {
      getUserData(hash)
    }
  }, [isAuthenticated, user])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return loginWithRedirect()
  }

  if(isAuthenticated && user) {   
    const newUserPage = () => {
      return <NewUserPage user={user} />
    }

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
          <PlanList user={user.email}/>
        </Container>
      )
    }

    return (
      <div id="app">
        <Navbar />
        {isNewUser ? newUserPage() : mainApp()}
      </div>
    )
  }
}

export default App