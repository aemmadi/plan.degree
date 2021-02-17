import React from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import Navbar from './Components/Core/Navbar'
import Logout from './Components/Core/Logout'
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: 'Bob Smith'
    }
  }

  componentDidMount() {

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
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
}