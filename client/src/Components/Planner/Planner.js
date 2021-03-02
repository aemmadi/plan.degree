import React from 'react'
import '@atlaskit/css-reset'
import styled from 'styled-components'
import {DragDropContext} from 'react-beautiful-dnd'
import {Container, Button, Grid, Card} from 'semantic-ui-react'

import tempData from './tempData'
import Semester from './components/semester'
import Add from './components/add'
import Info from './components/info'
import Graduation from './components/graduation'
import Navbar from '../Core/Navbar'

// const Grid = styled.div`
// display: flex;
// justify-content: center;
// padding: .5rem;
// `
// const Container = styled.div``
// const Button = styled.button`
// margin-left: auto;
// margin-right: auto;
// border: 1px solid lightgrey;
// border-radius: 2px;

// display: block;
// `;

class Planner extends React.Component {
  constructor() {
    super()
    this.state = tempData
  }

  componentDidMount(){
     // api calls
     fetch('http://127.0.0.1:5000/course/search/all').then(res => res.json()).then(data => {
      this.setState({
        classes: data?.results
      })
    })
  }

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

  handleSelect = (e, data) => {
    let selected = data.result.title
    let terms = this.state.rows

    let tmp = {
      id: selected,
      content: selected
    }

    let courses = this.state.courses
    courses[selected] = tmp

    this.setState({
      courses: courses
    })

    let keys = Object.keys(terms)

    // ** Possible bug: no terms added yet, this code will not create a term to add the course too

    // add to latest term w/ classes. Ex. no classes added for fall 2021, so add to spring 2021
    for (let i = keys.length - 1; i > -1; i--)
    {
      let k = keys[i]
      let len = terms[k].courseIds.length

      if(len != 0 || i == 0) // add to latest term w/ classes, or first (and only) term
      {
        let tmp = this.state.rows
        tmp[k].courseIds.push(selected)
        this.setState({
          rows: tmp
        })
        i = -1 // end loop
      }
    }
  }

  render() {
    console.log(this.state.rows)
    return (
      <div id="planner">
        <Navbar />
        <Grid style={{margin: '1em 1em 1em 1em'}}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Grid.Row>
                <Add classes={this.state.classes} onSelect={this.handleSelect}/>
              </Grid.Row>
              <Grid.Row>
                <Info />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8}>
              <Container style={{marginTop: '1em'}}>
                <div style={{marginBottom: '1em'}}>
                  <Button onClick={this.addNewSemester}>New Semester</Button>{' '}
                  <Button disabled>Export Plan as PDF</Button>{' '}
                  <Button disabled>Validate Plan</Button>{' '}
                  <Button disabled>Save Plan</Button>{' '}
                </div>
                <Card.Group>
                  <DragDropContext onDragEnd={this.onDragEnd}>
                      {this.state.rowOrder.map((rowId) => {
                        const row = this.state.rows[rowId];
                        const courses = row.courseIds.map(courseId => this.state.courses[courseId]);
                  
                        return <Semester key={row.id} row={row} courses={courses} />
                    })}
                  </DragDropContext>
                </Card.Group>
              </Container>
            </Grid.Column>
            <Grid.Column width={4}>
              <Graduation />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      )
  }
}

export default Planner;
