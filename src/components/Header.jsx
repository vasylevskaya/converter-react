import React, { useState, useEffect } from 'react'

import { getLatestCurrencyValues } from '../api/api'
import allowedValues from '../config/allowedValues'

const { UAH, EUR, USD } = allowedValues

const Header = () => {
  const [latestCurrencyValues, setLatestCurrencyValues] = useState({ EUR: null, USD: null })

  useEffect(() => {
    getLatestCurrencyValues([EUR, USD], UAH)
      .then(resolve => setLatestCurrencyValues(resolve))
      .catch(error => console.error(error))
  }, [])

  return (
    <header className="App-header">
      <p className="p-uah">1₴ UAH</p>
      <p className="p-equal">=</p>
      <div>
        <p>
          {latestCurrencyValues.EUR}
          € EUR
        </p>
        <p>
          {latestCurrencyValues.USD}
          $ USD
        </p>
      </div>
    </header>
  )
}

export default Header
