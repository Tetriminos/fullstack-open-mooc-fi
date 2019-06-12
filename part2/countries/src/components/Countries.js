import React from 'react'

import CountryInfo from './CountryInfo'

const Filter = ({ countries, search }) => {
  const filteredCountries = () => {
    return countries
            .filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
  }

  const countryList = () => filteredCountries().map(country => {
    return <CountryInfo key={country.name} country={country}/>
  })

  if (filteredCountries().length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  return (
    <div>
      {countryList()}
    </div>
  )
}

export default Filter