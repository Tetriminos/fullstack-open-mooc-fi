import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ country }) => {
  const [ expandInfo, setExpandInfo ] = useState(false)
  const languageList = () => country.languages.map(language => <li key={language.name}>{language.name}</li>)

  useEffect(() => {
    axios.get()
  }, [])

  if (!expandInfo) {
    return <div><p key={country.name}>{country.name} <button onClick={setExpandInfo}>show</button></p></div>
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {languageList()}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} height="100" />
      <h2>{`Weather in ${country.capital}`}</h2>
    </div>
  )
}

export default CountryInfo