import React from 'react';
import styled from 'styled-components';
import {Card, Container, Search} from 'semantic-ui-react'
import {DragDropContext} from 'react-beautiful-dnd'

import Course from './course'
import Semester from './semester'

const SearchList = styled.div`
padding: 8px;
background-color: ${props => (props.isDraggingOver ? 'grey' : 'white')};

display: flex;
`;

export default class Add extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      results: []
    }
  }

  handleSearch = (e) => {
    let exp = e.target.value
    console.log(exp)

    this.setState({
      loading: true
    })

    let arr = []
    this.props.classes.forEach(element => {
      if (element.course.includes(exp))
        arr.push({
          title: element.course,
          description: element.title
        })
    });

    this.setState({
      results: arr,
      loading: false
    })
    console.log(arr)

  }
  
  render() {
    return (
      <Container style={{height: '500px', width: '3000px'}}>
        <center>
          <h1>Add Course</h1>
          <Search 
            fluid
            loading={this.state.loading}
            showNoResults={true}
            onSearchChange={this.handleSearch}
            style={{marginTop: '1em'}}
            results={this.state.results}
          />
        </center>
      </Container>
    )
  }
}