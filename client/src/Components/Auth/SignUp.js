import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { GenerateHashWithSalt } from './crypt'

const SignUp = () => {
  const [success, setSuccess] = useState(null)
  const [isEmailValid, setIsEmailValid] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)

  const ValidateForm = (e) => {
    const formData = e.target.form
    const firstName = formData[0].value.charAt(0).toUpperCase() + formData[0].value.slice(1).toLowerCase()
    const lastName = formData[1].value.charAt(0).toUpperCase() + formData[1].value.slice(1).toLowerCase()
    const email = formData[2].value.toLowerCase()
    const initialPassword = formData[3].value
    const confirmPassword = formData[4].value

    if(!firstName || !lastName)
      return
    
    let emailFlag = false
    let passFlag = false
    setIsEmailValid(false)
    setIsPasswordValid(false)

    if(email.includes("@")) {
      const domain = email.split("@")[1]
      if(domain.includes(".") && domain.substring(0, domain.indexOf(".")).length > 0 && domain.substring(domain.indexOf("."), domain.length).length > 1 ) {
        emailFlag = true
        setIsEmailValid(true)
      }
    }

    if(initialPassword.length >= 6 && initialPassword === confirmPassword) {
      passFlag = true
      setIsPasswordValid(true)  
    }

    if(emailFlag && passFlag) {
        const password = GenerateHashWithSalt(initialPassword);
        (async () => {
            const payload = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            }

            const response = await fetch("/auth/signup", {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify(payload)
            })

            const content = await response.json()
            if(content.data === "success"){
              setSuccess(true)
            }
            else {
              setSuccess(false)
            }
          }
        )()
      }
  }

  const RenderSubmitStatus = () => {
    let errorMessage = []
    if(isEmailValid != null && isPasswordValid != null) {
      if(success === false)
        return <Message
          error
          header='Something went wrong :('
          list={[
            "E-mail might have already registered. Try logging in instead.",
            "If this error persists, report the issue below, we will take a look at it as soon as possible."    
          ]}
      />  

      if(success)
        return <Message
          success
          header='Success!'
          content="Check your e-mail for a confirmation link to get started."
        />

      if(!isEmailValid)
        errorMessage.push("Invalid e-mail address")
      
      if(!isPasswordValid)
        errorMessage.push("Password needs to at least contain 6 letters. Make sure create and confirm password are correct.")
      
      if(!isEmailValid || !isPasswordValid)
        return <Message
          warning
          header='Could you check something!'
          list={errorMessage}
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
          content='Get Started!'
          style={{
            fontFamily: 'sketch-3d',
            fontSize: '3.8em',
            fontWeight: 'normal',
          }}
        />
        <Form size='large'>
          <Segment stacked>
              <Form.Group widths='equal'>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder="First Name" required />
                  <Form.Input fluid icon='user' iconPosition='left' placeholder="Last Name" required />
              </Form.Group>
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' required/>
              <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Create password'
                  type='password'
                  required
              />
              <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm password'
                  type='password'
                  required
              />
              <Button onClick={ValidateForm} secondary fluid size='large'>
                  Sign Up!
              </Button>
          </Segment>
        </Form>
        {RenderSubmitStatus()}
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
)}

export default SignUp