import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const ResendConfirm = () => {
    const [success, setSuccess] = useState(null)
    const [isEmailValid, setIsEmailValid] = useState(null)
    
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
    
                const response = await fetch("/auth/confirm/resend-email", {
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
    
          if(success)
            return <Message
              success
              header='Success!'
              content="Check your e-mail for a confirmation link to get started."
            />
          
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
                content='Resend confirmation email'
                style={{
                fontFamily: 'sketch-3d',
                fontSize: '3.8em',
                fontWeight: 'normal',
                }}
            />
            <Form size='large'>
                <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' required/>
                <Button onClick={ValidateForm} secondary fluid size='large'>
                    Resend Confirmation
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

export default ResendConfirm