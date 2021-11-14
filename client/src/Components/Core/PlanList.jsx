import React, { useState, useEffect } from 'react'
import {Card, Button, Modal} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const PlanList = (props) => {
    const [plans, setPlans] = useState([
        {
            id: uuidv4(),
            name: 'My First Degree Plan',
            description: 'Defaultly Generated Plan',
        }
    ])
    const [user, setUser] = useState(props.user)
    const [newPlan, setNewPlan] = useState(null)

    useEffect(() => {
       setUser(props);
   }, [props]) 

   console.log(user.user)

    return (
        <>
        <center style={{marginBottom: '1.5em'}}>
            <Button color='blue'>New Degree Plan</Button>{' '}
        </center>
        <Card.Group>
            {plans.map(plan => {
                return <Card
                    fluid
                    key={plan.id}
                    header={plan.name}
                    meta={plan.description}
                    as={Link}
                    to={`/plan/${plan.id}/${user.user}`}
                    color='orange' />
            })}
         </Card.Group>
        </>
    )
}

export default PlanList