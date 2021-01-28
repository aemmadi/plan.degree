import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;

display: flex;
flex-direction: row;
`;

const Title = styled.h3`
padding: 8px;
`;


export default class Info extends React.Component {
  render() {
    return (
      <Container>
        <Title>Course Details</Title>
      </Container>
    )
  }
}