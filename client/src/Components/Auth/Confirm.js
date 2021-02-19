import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Button, Grid, Header } from 'semantic-ui-react'

const Confirm = (props) => {
    const [redirectFlag, setRedirectFlag] = useState(null)
    const isSuccess = props.success
    const history = useHistory()

    const redirectUser = () => {
        if(redirectFlag) {
            const url = isSuccess ? "/login" : "/resend-confirmation"
            return history.push(url)
        }
        else {
            setTimeout(
                function() {
                    setRedirectFlag(true)
                },
                2500
            )
        }
    }

    if(isSuccess) {
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
                        content='You are confirmed!'
                        style={{
                            fontFamily: 'sketch-3d',
                            fontSize: '3.8em',
                            fontWeight: 'normal',
                        }}
                    />
                    <p>If the page does not automatically redirect, click below.</p>
                    <Button as={Link} to="/login" secondary content="Click here to login" style={{marginTop: '1em'}}/>
                </Grid.Column>
                {redirectUser()}
            </Grid>
        )
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
                    content='There was an error confirming your account.'
                    style={{
                        fontFamily: 'sketch-3d',
                        fontSize: '2.8em',
                        fontWeight: 'normal',
                    }}
                />
                <p>Click on the button below to resend your confirmation email.</p>
                <Button as={Link} to="/resend-confirmation" secondary content="Resend Confirmation" style={{marginTop: '1em'}}/>
            </Grid.Column>
        </Grid>
    )
}

export default Confirm