import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const Login = () => (
  <Grid 
    textAlign='center'
    style={{ 
      height: '100vh', 
      backgroundImage: 'url("https://res.cloudinary.com/kannabox/image/upload/v1612077604/plan.degree/bg-2.png")' 
      }} 
    verticalAlign='middle'
  >
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header
        as='h1'
        content='Welcome Back!'
        style={{
          fontFamily: 'sketch-3d',
          fontSize: '3.8em',
          fontWeight: 'normal',
        }}
      />
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' required/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            required
          />

          <Button secondary fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        Forgot your password? <Link to="/reset-password">Reset</Link>
      </Message>
      <Message>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
)

export default Login