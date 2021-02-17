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
      results: [{id: 0, content: "RHET 1302"}, {id: 1, content: "HIST 1301"}]
    }
  }

  handleSearch = (e) => {
    console.log(e.target.value)
  }
  
  render() {
    return (
      <Container style={{height: '500px', width: '3000px'}}>
        <center>
          <h1>Add Course</h1>
          <Search 
            fluid
            loading={this.state.loading} 
            showNoResults={false}
            onSearchChange={this.handleSearch}
            style={{marginTop: '1em'}}
          />
        </center>
      </Container>
    )
  }
}