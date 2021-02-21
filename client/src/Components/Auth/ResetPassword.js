import React, { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { hashPassword } from './crypt'

const ResendConfirm = (props) => {
  const [success, setSuccess] = useState(null)
  const [isVerified, setIsVerified] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [isEmailValid, setIsEmailValid] = useState(null)
  const {token, id} = useParams()

  if(props.renderForm) {
    if(isVerified === null)
      (async () => {
        const response = await fetch(`/auth/password-reset/${token}/${id}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
        })

        const content = await response.json()
        if(content.data === "verified") {
          setIsVerified(true)
        }
        else {
          setIsVerified(false)
        }
      })()
    
    const ValidateForm = (e) => {
      if(isVerified === false)
        return

      const formData = e.target.form
      const initialPassword = formData[0].value
      const confirmPassword = formData[1].value

      let passFlag = false
      setIsPasswordValid(false)

      if(initialPassword.length >= 6 && initialPassword === confirmPassword) {
        passFlag = true
        setIsPasswordValid(true)  
      }

      if(passFlag) {
        (async () => {
          const password = hashPassword(initialPassword)
          const payload = {
            password: password
          }

          const response = await fetch(`/auth/password-reset/${token}/${id}`, {
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
        })()
      }
    }

    const RenderSubmitStatus = () => {
      if(isVerified === false) {
        return <Message
            error
            header='Token expired :('
            content="Go back and generate a new password reset email to restart the process."
          />
      }

      if(isPasswordValid != null) {
        if(success === false)
          return <Message
            error
            header='Something went wrong :('
            list={[
              "If this error persists, report the issue below, we will take a look at it as soon as possible."    
            ]}
        />  
  
        if(success)
          return <Message
            success
            header='Success!'
            content="Password successfully changed! Try logging in now."
          />
        
        if(!isPasswordValid)
          return <Message
            warning
            header='Could you check something!'
            list={["Password needs to at least contain 6 letters. Make sure create and confirm password are correct."]}
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
            content='Password reset'
            style={{
            fontFamily: 'sketch-3d',
            fontSize: '3.8em',
            fontWeight: 'normal',
            }}
        />
        <Form size='large'>
            <Segment stacked>
              <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='New password'
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
                  Change Password
              </Button>
            </Segment>
        </Form>
        {RenderSubmitStatus()}
        <Message>
            Already registered? <Link to="/login">Login</Link>
        </Message>
        </Grid.Column>
      </Grid>
    )
  }
  else {  
    const ValidateForm = (e) => {
        const formData = e.target.form
        const email = formData[0].value.toLowerCase()
        let emailFlag = false
        setIsEmailValid(false)

        if(email.includes("@")) {
            const domain = email.split("@")[1]
            if(domain.includes(".") && domain.substring(0, domain.indexOf(".")).length > 0 && domain.substring(domain.indexOf("."), domain.length).length > 1 ) {
              emailFlag = true
              setIsEmailValid(true)
            }
        }

        if(emailFlag) {
            (async () => {
                const payload = { email: email }
    
                const response = await fetch("/auth/password-reset", {
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
                else if(content.data === "unconfirmed") {
                  setSuccess(-1)
                }
                else {
                  setSuccess(false)
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
                "E-mail might already be confirmed or doesn't exist. Try logging in instead.",
                "If this error persists, report the issue below, we will take a look at it as soon as possible."    
              ]}
          />  
    
          if(success === true)
            return <Message
              success
              header='Success!'
              content="Check your e-mail for a confirmation link to get started."
            />
          
          if(success === -1)
            return <Message
            error
            header='Something went wrong :('
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
                content='Password reset'
                style={{
                fontFamily: 'sketch-3d',
                fontSize: '3.8em',
                fontWeight: 'normal',
                }}
            />
            <Form size='large'>
                <Segment stacked>
                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' required/>
                <Button onClick={ValidateForm} secondary fluid size='large'>
                    Send Instructions
                </Button>
                </Segment>
            </Form>
            {RenderSubmitStatus()}
            <Message>
                Already registered? <Link to="/login">Login</Link>
            </Message>
            </Grid.Column>
        </Grid>
    )
  }
}

export default ResendConfirm