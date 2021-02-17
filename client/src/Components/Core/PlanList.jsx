import React from 'react'
import {Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class PlanList extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <Card.Group>
                <Card 
                    fluid 
                    as={Link} 
                    to="/demo" 
                    color='orange' 
                    header="My First Degree Plan" 
                    meta="Automatically generated degree plan." 
                />
            </Card.Group>
        )
    }
}