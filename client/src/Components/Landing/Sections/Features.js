import React from 'react'
import { Heading} from 'rebass'
import {
  Feature, Flex
} from 'react-landing-page'

const Features = props => (
  <div>
    <Heading id="feat" textAlign="center" mt={4}>Features</Heading>
    <Flex flexWrap="wrap" justifyContent="center">
      <Feature icon="👋" description="View your entire degree plan visually and intuitively where you can drag and drop courses or simply remove them from your plan!">
          Visualizer
      </Feature>
      <Feature icon="🔥" description="Automatic pre-requisite and core class detection, enabling you to plan out your degree more responsibly.">
          Pre-req Management
      </Feature>
      <Feature icon="📩" description="A.I. Based elective recommendations keeping your best interests at heart :)">
          Elective Recommender
      </Feature>
    </Flex>
  </div>
)

export default Features;
