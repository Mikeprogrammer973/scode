import React from 'react';
import { logo } from './util/logo';
import FM from './code/type/FM';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" />
        <h1>SCode</h1>
        <div>
          {
            new FM().codificar("INDO BEM!")
          }
        </div>
      </header>
    </div>
  );
}

export default App;
