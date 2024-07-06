import React from 'react';
import { logo } from './util/logo';
import SCFrama from './code/type/SCFrama';
import MutationTemplate from './code/alpha_template/MutationTemplate';
import format_str from './util/format_str';
import SCMorse from './code/type/SCMorse';
import OrderTemplate from './code/alpha_template/OrderTemplate';
import SCSimply, { SCSCodeLevel } from './code/type/SCSimply';
import SCBinary from './code/type/SCBinary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" />
        <h1>SCode</h1>
        <div>
          {
            format_str("Na verdade estou bem az")
          }
          <br />
          {
            MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str("Na verdade estou bem az")))
          }
          {
            new SCMorse().codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str("Na verdade estou bem az"))))
          }
          {
            new SCSimply(SCSCodeLevel.a_num).codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str("Na verdade estou bem az"))))
          }
          {
            new SCSimply(SCSCodeLevel.tecla).codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str("Na verdade estou bem az"))))
          }
          {
            new SCSimply(SCSCodeLevel.tecla_m).codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str("Na verdade estou bem az"))))
          }
          {
            new SCBinary().codificar(MutationTemplate.voisin(OrderTemplate.mixedReverse(format_str("Na verdade estou bem az"))))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
