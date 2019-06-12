import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    const personWithNameExists = persons.filter(prsn => prsn.name === person.name).length > 0

    if (personWithNameExists) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(person))
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const personList = () => personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personList={personList}/>
    </div>
  )
}

export default App