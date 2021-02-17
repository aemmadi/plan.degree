import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {Modal} from 'semantic-ui-react'
export default class Course extends React.Component {
  render() {
    const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 10%;
    padding: 8px;
    margin-right: 8px;
    background-color: ${props => props.isDragging ? 'lightGrey' : 'white'};
    width: 100px;
    height: 50px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    `;
    return (
      <Draggable draggableId={this.props.course.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Modal
            trigger={
              <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                onClick={this.handleCourseClick}
                title="View Details"
              >
                <strong>{this.props.course.content}</strong>
              </Container>
            }
          >
            <Modal.Header>{this.props.course.content}</Modal.Header>
          </Modal>
        )}
      </Draggable>
    )
  }
}