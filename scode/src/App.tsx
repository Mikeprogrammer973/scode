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

function App() {
  const msg = "odi at amo excrucior!"
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" />
        <h1>SCode</h1>
        <div className='text-left text-2xl p-7'>
          {
            format_str(msg)
          }
          <br />
          {
            MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg)))
          }
          <br />
          {
            new SCMorse().codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.a_num).codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla).codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla_m).codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
          <br />
          {
            new SCBinary().codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
          <br />
          {
            new SCNavajo().codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
          <br />
          {
            codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str(msg))))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
