import React from 'react'
import './styles/index.scss'

import Header from './components/Header'
import Converter from './components/Converter'

import { getLatestCurrencyValues, exchangeCurrency } from './api/api'
import allowedValues from './config/allowedValues'


const { UAH, EUR, USD } = allowedValues

getLatestCurrencyValues('USD', ['UAH', 'EUR'])

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Converter />
      </main>
    </div>
  );
}

export default App;
