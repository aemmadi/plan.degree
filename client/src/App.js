import React from 'react'
import { Provider, Heading, Subhead, NavLink, Small, Relative, Absolute } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator, Flex
} from 'react-landing-page'

const App = props => (
  <Provider>

    <Relative pb={5}>
      <Absolute zIndex={1} left={0} right={0} top={0}>
        <Flex is="header" p={3}>
          <NavLink href="/" fontSize={3}>Plan.Degree</NavLink>
          <NavLink href="#" ml='auto'>Log in</NavLink>
          <NavLink href="#">Sign up</NavLink>
        </Flex>
      </Absolute>
    </Relative>

    <Hero
      color="black"
      bg="#545E75"
      backgroundImage="https://res.cloudinary.com/kannabox/image/upload/v1603777321/plan.degree/bg-1.jpg"
    >
        <Heading
          fontSize={[ 5, 6, 7 ]}
          color='white'>
            Plan.Degree
        </Heading>

        <Subhead color="white">Plan your college degree in minutes!</Subhead>
        <CallToAction href="/getting-started" mt={3}>Get Started</CallToAction>
        <CallToAction href="/getting-started" mt={3}>Learn More</CallToAction>
        <ScrollDownIndicator/>
    </Hero>
    <Flex is="footer" alignItems="center" p={2}>
      <NavLink children="About" href="#"/>
      <NavLink children="Donate" href="#"/>
      <Small color="grey" ml="auto">© Plan.Degree, 2020</Small>
    </Flex>
  </Provider>
)

export default App;
