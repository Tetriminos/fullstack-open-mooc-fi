import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
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
      number: newNumber,
      id: persons.length + 1
    }

    const alreadyExistingPerson = persons.find(prsn => prsn.name === person.name)

    if (alreadyExistingPerson) {
      const update = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!update) {
        return
      }

      personService
        .update(alreadyExistingPerson.id, person)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        })
        return
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
  }

  const deletePerson = id => {
    const doWeDelete = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)

    if (!doWeDelete) {
      return
    }

    personService
      .remove(id)
      .then(_ => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const personList = () => personsToShow.map(person => <div key={person.name}><p>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p></div>)

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