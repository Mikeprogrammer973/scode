import React, { useState } from 'react';
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
import SCVigenere from './code/type/SCVigenere';

function App() {

  const txt = "I am the one who does not"
  const order_rand = OrderTemplate.random(format_str(txt))
  const order_r = OrderTemplate.reverse(format_str(txt))
  const mutation_r = MutationTemplate.reciproque(format_str(txt))
  const mutation_d = MutationTemplate.decalage(format_str(txt))
  const msg = OrderTemplate.random(mutation_d.msg)
  //MutationTemplate.decalage(order_rand.msg)
  const enigmaKey = codificar(msg.msg)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" />
        <h1>SCode</h1>
        <div className='text-left text-2xl p-7'>
          {
            format_str(txt)
          }
          <br />
          ida msg:
          {
            msg.msg
          }
          <br />
          volta msg:
          {
            MutationTemplate.decalage(OrderTemplate.random(msg.msg, msg.alpha_ref, true).msg, true, mutation_d.decalage).msg
          }
          <br />
          ida reciproque:
          {
            mutation_r
          }
          <br />
          volta reciproque:
          {
            MutationTemplate.reciproque(mutation_r)
          }
          <br />
          ida reverse:
          {
            order_r
          }
          <br />
          volta reverse:
          {
            OrderTemplate.reverse(order_r)
          }
          <br />
          ida decalage:
          {
            mutation_d.msg
          }
          <br />
          volta decalage:
          {
            MutationTemplate.decalage(mutation_d.msg, true, mutation_d.decalage).msg
          }
          <br />
          ida rand:
          {
            order_rand.msg
          }
          <br />
          volta rand:
          {
            OrderTemplate.random(order_rand.msg, order_rand.alpha_ref, true).msg
          }
          <br />
          {
            new SCMorse().codificar(msg.msg)
          }
          <br />
          {
            new SCMorse().decodificar(new SCMorse().codificar(msg.msg))
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.a_num).codificar(msg.msg)
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.a_num).decodificar( new SCSimply(SCSCodeLevel.a_num).codificar(msg.msg))
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla).codificar(msg.msg)
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla).decodificar(new SCSimply(SCSCodeLevel.tecla).codificar(msg.msg))
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla_m).codificar(msg.msg)
          }
          <br />
          {
            new SCSimply(SCSCodeLevel.tecla_m).decodificar(new SCSimply(SCSCodeLevel.tecla_m).codificar(msg.msg))
          }
          <br />
          {
            new SCBinary().codificar(msg.msg)
          }
          <br />
          {
            new SCBinary().decodificar(new SCBinary().codificar(msg.msg))
          }
          <br />
          {
            new SCNavajo().codificar(msg.msg)
          }
          <br />
          {
            new SCNavajo().decodificar(new SCNavajo().codificar(msg.msg))
          }
          <br />
          {
            enigmaKey.encryptMsg
          }
          <br />
          {
            decodificar(enigmaKey)
          }
          <br />
          {
            new SCVigenere(format_str("key"), msg.msg).codificar()
          }
          <br />
          {
            new SCVigenere(format_str("key"), new SCVigenere(format_str("key"), msg.msg).codificar()).decodificar()
          }
        </div>
      </header>
    </div>
  );
}

export default App;
