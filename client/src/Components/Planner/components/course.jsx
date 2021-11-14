import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {Modal} from 'semantic-ui-react'
export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
    }

    this.handleCourseClick = this.handleCourseClick.bind(this);
  }

  handleCourseClick() {
    fetch(`${process.env.REACT_APP_API_URL}/course/search/${this.props.course.content}`).then(res => res.json()).then(data => {
      this.setState({
        course: data.results[0]
      })
    })
  }

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
            <Modal.Header>{this.props.course.content} - {this.state.course.title}</Modal.Header>
            <Modal.Content>
              <h3><strong>
                Description</strong></h3>
                {' '}
                {this.state.course.desc}

              <h3><strong>Pre-Reqs/Co-Reqs</strong></h3>
              {' '}
              {this.state.course.req_text}
            </Modal.Content>

          </Modal>
        )}
      </Draggable>
    )
  }
}