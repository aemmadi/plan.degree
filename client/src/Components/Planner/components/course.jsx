import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
  border: 2px solid lightgrey;
  border-radius: 10%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${props => props.isDragging ? 'lightGreen' : 'white'};
  width: 100px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Course extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.course.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.course.content}
          </Container>
        )}
      </Draggable>
    )
  }
}