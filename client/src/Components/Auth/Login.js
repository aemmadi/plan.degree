import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { GenerateHash } from './crypt'

const Login = () => {
  const [success, setSuccess] = useState(null)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const history = useHistory()

  const ValidateForm = (e) => {
    const formData = e.target.form
    const email = formData[0].value.toLowerCase()
    const password = GenerateHash(formData[1].value)

    let emailFlag = false

    if(email.includes("@")) {
      const domain = email.split("@")[1]
      if(domain.includes(".") && domain.substring(0, domain.indexOf(".")).length > 0 && domain.substring(domain.indexOf("."), domain.length).length > 1 ) {
        emailFlag = true
        setIsEmailValid(true)
      }
    }

    if(emailFlag) {
      (async () => {
        const payload = { email: email, password: password }

        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(payload)
        })

        const content = await response.json()
        if(content.data === "unconfirmed") {
          setSuccess(-1)
        }
        else if(content.data === "error") {
          setSuccess(false)
        }
        else {
          const sessionId = content.data
          return history.push(`/app/${sessionId}`)
        }
      }
    )()
    }
  }

  const RenderSubmitStatus = () => {
    if(isEmailValid != null) {
      if(success === false)
        return <Message
          error
          header='Something went wrong :('
          list={[
            "If this error persists, report the issue below, we will take a look at it as soon as possible."    
          ]}
      />  

      if(success === -1)
        return <Message
        error
        header='Almost there!'
      >
        E-mail address is unconfirmed. Try resending your <Link to="/resend-confirmation">
        confirmation email</Link>.
        </Message>

      if(!isEmailValid)
        return <Message
          warning
          header='Could you check something!'
          list={["Invalid e-mail address"]}
        />
    }
  }

  return (
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

            <Button onClick={ValidateForm} secondary fluid size='large'>
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
}

export default Login