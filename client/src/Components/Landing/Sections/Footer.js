import React from 'react'
import { NavLink, Small } from 'rebass'
import { Flex } from 'react-landing-page'

const Footer = props => (
    <Flex is="footer" alignItems="center" p={2}>
      <NavLink children="About" href="/about"/>
      <NavLink children="Donate" href="/donate"/>
      <Small color="grey" ml="auto">© Plan.Degree, 2020</Small>
    </Flex>
)

export default Footer;
