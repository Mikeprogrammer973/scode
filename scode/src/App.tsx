import React from 'react';
import { logo } from './util/logo';
import SCFrama from './code/type/SCFrama';
import MutationTemplate from './code/alpha_template/MutationTemplate';
import format_str from './util/format_str';
import SCMorse from './code/type/SCMorse';
import OrderTemplate from './code/alpha_template/OrderTemplate';
import SCSimply, { SCSCodeLevel } from './code/type/SCSimply';
import SCBinary from './code/type/SCBinary';
import SCNavajo from './code/type/SCNavajo';
import codificar, { decodificar } from './code/type/SCEnigma/SCEnigma';
import Alphabet from './util/alphabet_reference';

function App() {

  const order = OrderTemplate.random(format_str("Deus"))
  const msg = MutationTemplate.voisin(order)
  const enigmaKey = codificar(msg)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" />
        <h1>SCode</h1>
        <div className='text-left text-2xl p-7'>
          {
            format_str("Deus")
          }
          <br />
          {
            MutationTemplate.voisin(order)
          }
          <br />
          {
            new SCMorse().codificar(msg)
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.a_num).codificar(msg)
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla).codificar(msg)
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla_m).codificar(msg)
          }
          <br />
          {
            new SCBinary().codificar(msg)
          }
          <br />
          {
            new SCNavajo().codificar(msg)
          }
          <br />
          {
            enigmaKey.encryptMsg
          }
          <br />
          {
            decodificar(enigmaKey)
          }
        </div>
      </header>
    </div>
  );
}

export default App;
