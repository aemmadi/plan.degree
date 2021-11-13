import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            activeItem: 'dashboard'
        }
    }

    handleItemClick = (e, { name }) => {
        if(!this.props.disable)
            this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (
            <Menu style={{height: '4em'}}>
                <Menu.Item
                    name='dashboard'
                    as={Link}
                    to="/dashboard"
                    active={activeItem === 'dashboard'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='planner'
                    as={Link}
                    to="/planner"
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
                    as={Link}
                    to="/settings"
                    active={activeItem === 'settings'}
                    />
                    <Menu.Item
                    name='logout'
                    as={Link}
                    to="/logout"
                    active={activeItem === 'logout'}
                    style={{
                        color: '#b23b3b'
                    }}
                    />
                </Menu.Menu>
            </Menu>
        )
    }
}