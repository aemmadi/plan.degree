import React from 'react'
import {Button, Card, Container, Header, Icon, Input, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import Logout from './Components/Core/Logout'
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: 'home',
      loggedInUser: 'Bob Smith'
    }
  }

  componentDidMount() {

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
  const { activeItem } = this.state
    return (
      <div id="app">
        <Menu style={{height: '4em'}}>
          <Menu.Item
            name='dashboard'
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='planner'
            active={activeItem === 'planner'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu 
            content="Plan.Degree" 
            position='right'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'sketch-3d',
              fontSize: '2em',
              fontWeight: 'light',
              marginRight: '0.9em'
          }}/>
          <Menu.Menu position='right'>
            <Menu.Item
              name='settings'
              active={activeItem === 'settings'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
              style={{
                color: '#b23b3b'
              }}
            />
          </Menu.Menu>
        </Menu>
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
          <center style={{marginBottom: '1em'}}>
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