import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

export default class Course extends React.Component {
  constructor() {
    super()
    this.state = {
      clicked: false,
    }
  }

  handleCourseClick = (e) => {
    const course = e.target.innerText
    this.setState({
      spotlight: course,
      clicked: false
    })
  }

  handleCourseTrigger = () => {
    const click = this.state.clicked
    this.setState({
      clicked: !click
    })
  }
  
  render() {
    const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 10%;
    padding: 8px;
    margin-right: 8px;
    background-color: ${props => props.isDragging || this.state.clicked ? 'lightGrey' : 'white'};
    width: 100px;
    height: 50px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    `;
    return (
      <Draggable draggableId={this.props.course.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          content={this.props.course.content}
          onClick={this.handleCourseClick}
          onMouseDown={this.handleCourseTrigger}
          onMouseUp={this.handleCourseTrigger}
          >
            {console.log(this.state)}
            <strong>{this.props.course.content}</strong>
          </Container>
        )}
      </Draggable>
    )
  }
}