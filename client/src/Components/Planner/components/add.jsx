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

    this.setState({
      loading: true
    })

    let arr = []
    let words = exp.split(/\s+/);
    let regex = new RegExp("(?=.*" + words.join(")(?=.*") + ").+", "i");

    this.props.classes.forEach(element => {
      if (element.course.match(regex))
        arr.push({
          title: element.course,
          description: element.title
        })
    });

    this.setState({
      results: arr,
      loading: false
    })
  }

  
  
  render() {
    return (
          <Search 
            loading={this.state.loading}
            showNoResults={true}
            onSearchChange={this.handleSearch}
            onResultSelect={this.props.onSelect}
            results={this.state.results}
          />
    )
  }
}