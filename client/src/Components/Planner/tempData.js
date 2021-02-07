const tempData = {
  courses: {
    'course-1': {id: 'course-1', content: 'CS 1200'},
    'course-2': {id: 'course-2', content: 'CS 1336'},
    'course-3': {id: 'course-3', content: 'CS 1136'},
    'course-4': {id: 'course-4', content: 'ECS 1100'},
    'course-5': {id: 'course-5', content: 'CS 2305'},
    'course-6': {id: 'course-6', content: 'CS 2336'},
    'course-7': {id: 'course-7', content: 'CS 3345'},
    'course-8': {id: 'course-8', content: 'CS 3305'},
    'course-9': {id: 'course-9', content: 'MATH 2417'},
    'course-10': {id: 'course-10', content: 'MATH 2419'},
    'course-11': {id: 'course-11', content: 'CS 1337'},
    'course-12': {id: 'course-12', content: 'MATH 2418'},
  },
  rows: {
    'semester-1': {
      id: 'semester-1',
      title: 'Semester 1',
      courseIds: ['course-1', 'course-2', 'course-3', 'course-4'],
    },
    'semester-2': {
      id: 'semester-2',
      title: 'Semester 2',
      courseIds: ['course-5', 'course-6', 'course-7', 'course-8'],
    },
    'semester-3': {
      id: 'semester-3',
      title: 'Semester 3',
      courseIds: ['course-9', 'course-10', 'course-11', 'course-12'],
    },
    'semester-4': {
      id: 'semester-4',
      title: 'Semester 4',
      courseIds: [],
    },
    'semester-5': {
      id: 'semester-5',
      title: 'Semester 5',
      courseIds: [],
    },
    'semester-6': {
      id: 'semester-6',
      title: 'Semester 6',
      courseIds: [],
    },
    'semester-7': {
      id: 'semester-7',
      title: 'Semester 7',
      courseIds: [],
    },
    'semester-8': {
      id: 'semester-8',
      title: 'Semester 8',
      courseIds: [],
    },  
  },
  // Facilitate reordering of semesters
  rowOrder: ['semester-1', 'semester-2', 'semester-3', 'semester-4', 'semester-5', 'semester-6', 'semester-7', 'semester-8']
}

export default tempData