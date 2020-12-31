import React from 'react'
import { Provider, NavLink, Small } from 'rebass'
import { Section, CallToAction, Flex } from 'react-landing-page'

import Splash from "./Sections/Splash"
import Features from "./Sections/Features"
import Footer from "./Sections/Footer"

const Landing = props => (
  <Provider>
    <Splash/>
    <Features/>

    <Section
    bg='#BCD3F2'
    heading="We are still in beta!"
    subhead="Feedback is highly encouraged for making the application better for everyone">
      <CallToAction href="/report-bug" mt={-4}>Report a Bug</CallToAction>
    </Section>

    <Footer/>
  </Provider>
)

export default Landing;
