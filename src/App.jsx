import React from 'react'
import './styles/index.scss'

import Header from './components/Header'
import Converter from './components/Converter'

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
