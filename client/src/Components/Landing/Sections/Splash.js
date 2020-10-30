import React from 'react'
import { Heading, Subhead} from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'

const Splash = props => (
    <Hero
      color="black"
      bg="#545E75"
      backgroundImage="https://res.cloudinary.com/kannabox/image/upload/v1603777321/plan.degree/bg-1.jpg">

      <Heading
        fontSize={[ 5, 6, 7 ]}
        color='white'>
          Plan.Degree
      </Heading>
      <Subhead color="white">Plan your college degree in minutes!</Subhead>
      <CallToAction href="/getting-started" mt={3}>Get Started</CallToAction>
      <CallToAction href="#feat" mt={3}>Learn More</CallToAction>
      <ScrollDownIndicator/>
    </Hero>
)

export default Splash;
