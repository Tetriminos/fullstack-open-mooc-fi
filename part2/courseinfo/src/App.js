import React from 'react'

import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // the items are static so I use the index instead of importing
  // the shortid module or creating some counter to get the unique values
  const courseList = () => courses.map((course, i) => <Course key={i} course={course}/>)

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courseList()}
    </div>
  )
}

export default App