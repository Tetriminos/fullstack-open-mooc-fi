import React from 'react'

const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  )
}

const Content = ({ parts }) => {
  const partList = () => parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)

  return (
    <div>
      {partList()}
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course