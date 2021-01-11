const tempData = {
  courses: {
    'course-1': {id: 'course-1', content: 'CS 1200'},
    'course-2': {id: 'course-2', content: 'CS 1336'},
    'course-3': {id: 'course-3', content: 'CS 1136'},
    'course-4': {id: 'course-4', content: 'ECS 1100'},
  },
  rows: {
    'semester-1': {
      id: 'semester-1',
      title: 'Fall 2021',
      courseIds: ['course-1', 'course-2', 'course-3', 'course-4'],
    },
    'semester-2': {
      id: 'semester-2',
      title: 'Spring 2022',
      courseIds: [],
    },
    'semester-3': {
      id: 'semester-3',
      title: 'Summer 2022',
      courseIds: [],
    },
  },
  // Facilitate reordering of semesters
  rowOrder: ['semester-1', 'semester-2', 'semester-3']
}

export default tempData