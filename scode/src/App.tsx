import React from 'react';
import { logo } from './util/logo';
import SCFrama from './code/type/SCFrama';
import AlphaTemplate from './code/alpha_template/Template';
import format_str from './util/format_str';
import SCMorse from './code/type/SCMorse';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" />
        <h1>SCode</h1>
        <div>
          {
            new SCMorse().codificar(AlphaTemplate.voisin(format_str("Eu te amo muito, Sarah!")))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
