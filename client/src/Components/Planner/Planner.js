import React from 'react'
import '@atlaskit/css-reset'
import styled from 'styled-components'
import {DragDropContext} from 'react-beautiful-dnd'

import tempData from './tempData'
import Semester from './components/semester'
import Search from './components/search'
import Info from './components/info'

const Grid = styled.div`
display: flex;
justify-content: center;
padding: .5rem;
`
const Container = styled.div``
const Button = styled.button`
margin-left: auto;
margin-right: auto;
border: 1px solid lightgrey;
border-radius: 2px;

display: block;
`;

class Planner extends React.Component {
  state = tempData
  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.rows[source.droppableId];
    const finish = this.state.rows[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.courseIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newRow = {
        ...start,
        courseIds: newTaskIds
      }
  
      const newState = {
        ...this.state,
        rows: {
          ...this.state.rows,
          [newRow.id]: newRow
        }
      }
  
      this.setState(newState)
      return;
    }

    // Moving from one list to another
    const startCourseIds = Array.from(start.courseIds);
    startCourseIds.splice(source.index, 1);
    const newStart = {
      ...start,
      courseIds: startCourseIds
    }

    const finishCourseIds = Array.from(finish.courseIds);
    finishCourseIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      courseIds: finishCourseIds
    }

    const newState = {
      ...this.state,
      rows: {
        ...this.state.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    this.setState(newState)
  }

  addNewSemester = () => {
    const semCount = this.state.rowOrder.length
    const newSem = {
      id: `semester-${semCount+1}`,
      title: `Semester ${semCount+1}`,
      courseIds: []
    }
    const newRowOrder = this.state.rowOrder
    newRowOrder.push(newSem.id)

    const newState = {
      ...this.state,
      rows: {
        ...this.state.rows,
        [newSem.id]: newSem
      },
      rowOrder: newRowOrder
    }

    this.setState(newState)
  }

  render() {
    return (
      <Grid>
        <Search />
        <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.rowOrder.map((rowId) => {
              const row = this.state.rows[rowId];
              const courses = row.courseIds.map(courseId => this.state.courses[courseId]);
        
              return <Semester key={row.id} row={row} courses={courses} />
            })}
          <Button onClick={this.addNewSemester}>New Semester</Button>
          </DragDropContext>
        </Container>
        <Info />
      </Grid>
      )
  }
}

export default Planner;
