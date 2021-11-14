import { useState } from 'react'
import {Button, Card, Checkbox, Container, Select, Form, Header} from 'semantic-ui-react'

const NewUserPage = ({user}) => {
  const [newUserData, setNewUserData] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [major, setMajor] = useState('')
  const [startSemester, setStartSemester] = useState('')
  const [startYear, setStartYear] = useState('')

  const majorOptions = [
    { key: 'cs', value: 'cs', text: 'Computer Science' },
    { key: 'se', value: 'se', text: 'Software Engineering' }
  ]
  const semesterOptions = [
    { key: 'fall', value: 'fall', text: 'Fall' },
    { key: 'spring', value: 'spring', text: 'Spring' },
    { key: 'summer', value: 'summer', text: 'Summer' }
  ]
  const yearOptions = [
    { key: '2018', value: '2018', text: '2018' },
    { key: '2019', value: '2019', text: '2019' },
    { key: '2020', value: '2020', text: '2020' },
    { key: '2021', value: '2021', text: '2021' },
    { key: '2022', value: '2022', text: '2022' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('major', major)
    formData.append('startSemester', startSemester)
    formData.append('startYear', startYear)
    formData.append('name', user.name)
    formData.append('email', user.email)
   
    fetch(`${process.env.REACT_APP_API_URL}/v1/create_user`, {
      method: 'POST',
      body: formData
    })
  }

  return (
    <Container>
      <Header 
            size='huge'
            style={{
              marginTop: '2em',
              textAlign: 'center'
            }}
          >
            Setup Profile
          </Header>
      <Card centered fluid>
      <Form onSubmit={handleSubmit} style = {{
        margin: '2em 2em 2em 2em',
      }}>
        <Form.Field>
          <label>First Name</label>
          <input name='first_name' placeholder='John' onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input name='last_name' placeholder='Doe' onChange={(e) => setLastName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Major</label>
          <Select name='major' placeholder='Choose Major' options={majorOptions} onChange={(e) => setMajor(e.target.textContent)}/>
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Starting Semester</label>
            <Select name='start_semester' placeholder='Choose Semester' options={semesterOptions} onChange={(e) => setStartSemester(e.target.textContent)}/>
          </Form.Field>
          <Form.Field>
            <label>Starting Year</label>
            <Select name='start_year' placeholder='Choose Year' options={yearOptions} onChange={(e) => setStartYear(e.target.textContent)}/>
          </Form.Field>
        </Form.Group>
        <Button type='submit'>Finish Setup</Button>
      </Form>
      </Card>
    </Container>
  );
}

export default NewUserPage;