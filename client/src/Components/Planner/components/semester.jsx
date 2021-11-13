import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

import {Card} from 'semantic-ui-react'

import Course from './course'

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: 88rem;
height: 8rem;
display: flex;
flex-direction: column;
`;

const Title = styled.h3`
padding: 8px;
`;

const CourseList = styled.div`
padding: 8px;
background-color: ${props => (props.isDraggingOver ? 'grey' : 'white')};

display: flex;
`;

export default class Semester extends React.Component {
  render() {
    return (
      <Card fluid >
        <Card fluid header={this.props.row.title} style={{margin: '0em auto'}}/>
        <Droppable droppableId={this.props.row.id} direction="horizontal">
          {(provided, snapshot) => (
          <CourseList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
             
          >
              {this.props.courses.map((course, index) => (<Course key={course.id} course={course} index={index}/>
            ))}
            {provided.placeholder}
          </CourseList>
          )}
        </Droppable>
        <Card fluid>
          <Card.Meta textAlign="right" style={{margin: '0.2em auto'}}>Credits: 0 Hours</Card.Meta>
        </Card>
      </Card>
    )
  }
}