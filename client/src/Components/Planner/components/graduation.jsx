import React from 'react';
import styled from 'styled-components';
import {Container} from 'semantic-ui-react'

// const Container = styled.div`
// margin: 8px;
// border: 1px solid lightgrey;
// border-radius: 2px;

// display: flex;
// flex-direction: row;
// `;

// const Title = styled.h3`
// padding: 8px;
// `;


export default class Graduation extends React.Component {
  render() {
    return (
      <Container style={{height: '500px'}}>
        <center><h1>Degree Progress</h1></center>
      </Container>
    )
  }
}