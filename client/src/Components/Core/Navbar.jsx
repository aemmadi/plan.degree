import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("dashboard")
    const { logout } = useAuth0();

    const handleItemClick = (e, {name}) => setActiveItem(name)

    return (
        <Menu style={{height: '4em'}}>
            <Menu.Item
                name='dashboard'
                as={Link}
                to="/app"
                active={activeItem === 'dashboard'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='planner'
                as={Link}
                disabled
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
                disabled
                />
                <Menu.Item
                name='logout'
                onClick={() => {logout({returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI})}}
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

export default Navbar;