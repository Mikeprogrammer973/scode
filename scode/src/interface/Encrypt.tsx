import { useState } from "react"
import format_str from "../util/format_str"
import MutationTemplate from "../code/alpha_template/MutationTemplate"
import OrderTemplate from "../code/alpha_template/OrderTemplate"
import SCSimply, { SCSCodeLevel } from "../code/type/SCSimply"
import SCMorse from "../code/type/SCMorse"
import SCBinary from "../code/type/SCBinary"
import SCNavajo from "../code/type/SCNavajo"
import codificar, { SCEKey } from "../code/type/SCEnigma/SCEnigma"
import SCVigenere from "../code/type/SCVigenere"
import SCFrama from "../code/type/SCFrama"
import SCBacon from "../code/type/SCBacon"
import polybeEncode from "../code/type/SCPolybe"
import Spinner from "../util/spinner"
import MsgBox from "../util/msgBox"
import { Alert } from "../util/alert"

export default function Encrypt(): JSX.Element
{
    const [spinnerV, setSpinnerV] = useState<boolean>(false)
    const [msgBV, setMsgBV] = useState<boolean>(false)
    const [alert, setAlert] = useState<JSX.Element>(<div></div>)
    const [cypherType, setCypherType] = useState<number>(0)
    const [txtMut, setTxtMut] = useState<number>(0)
    const [txtOrder, setTxtOrder] = useState<number>(0)
    const [key, setKey] = useState<string>("")
    const [txt, setTxt] = useState<string>("")
    const [fTxt, setFTxt] = useState<string>("")
    const [cTxt, setCTxt] = useState<string>("")
    const [[prmsD, setPrmsD], [prmsR, setPrmsR]] = [useState<{msg: string, decalage: number}>(), useState<{alpha_ref: string[], msg: string}>()]

    function previweFormatation()
    {
        if(txtMut == 0 && txtOrder == 0){
            setPrmsD(MutationTemplate.decalage(OrderTemplate.reverse(format_str(txt))))
            setFTxt(prmsD?.msg || "")
        }
        if(txtMut == 0 && txtOrder == 1){
            setPrmsR(OrderTemplate.random(format_str(txt)))
            setPrmsD(MutationTemplate.decalage(prmsR?.msg || ""))
            setFTxt(prmsD?.msg || "")
        }
        if(txtMut == 1 && txtOrder == 0) setFTxt(MutationTemplate.reciproque(OrderTemplate.reverse(format_str(txt))))
        if(txtMut == 1 && txtOrder == 1){
            setPrmsR(OrderTemplate.random(format_str(txt)))
            setFTxt(MutationTemplate.reciproque(prmsR?.msg || ""))
        }

        let coded_txt: string | SCEKey = ""

        switch(cypherType)
        {
            case 0:
                coded_txt = new SCSimply(SCSCodeLevel.tecla).codificar(fTxt)
                break
            case 1:
                coded_txt = new SCSimply(SCSCodeLevel.tecla_m).codificar(fTxt)
                break
            case 2:
                coded_txt = new SCSimply(SCSCodeLevel.a_num).codificar(fTxt)
                break
            case 3:
                coded_txt = new SCMorse().codificar(fTxt)
                break
            case 4:
                coded_txt = new SCBinary().codificar(fTxt)
                break
            case 5:
                coded_txt = new SCNavajo().codificar(fTxt)
                break
            case 6: 
                coded_txt = codificar(fTxt)
                break
            case 7:
                if(key == "") setKey(format_str("my key"))
                coded_txt = new SCVigenere(key, fTxt).codificar()
                break
            case 8:
                if(key == "") setKey(format_str("my key"))
                coded_txt = new SCFrama(key).codificar(fTxt)
                break
            case 9:
                coded_txt = new SCBacon().codificar(fTxt)
                break
            case 10:
                coded_txt = polybeEncode(fTxt)
        }
        
        setCTxt((typeof(coded_txt) == "string" ? coded_txt : coded_txt.encryptMsg))
    }

    function generateCrypt()
    {
        setSpinnerV(true)
        setTimeout(()=>{
            setSpinnerV(false)
            setAlert(<Alert color="info" title="SCode Encrypt" msg={<div>Message crypted successfully! <br />Click <a href="#" className="underline font-semibold">here</a> to download the decrypt doc.</div>} />)
            setMsgBV(true)
        }, 5000)
    }


    return(
        <section className="bg-slate-800">
            <Spinner visible={spinnerV} />
            <MsgBox visible={msgBV} msg={alert} setVisible={setMsgBV} />
            <div className="grid grid-cols-1 lg:grid-cols-2 p-5">
                <div className="h-full bg-black">
                    <div  className="bg-white rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg h-full w-full p-5">
                        <div className="bg-blue-100 border-t-4 border-blue-500 text-blue-900 px-4 py-3 shadow-md">Type your text here</div>
                        <textarea rows={10} onChange={e => {setTxt(e.target.value); previweFormatation();}} value={format_str(txt)} className="bg-slate-500 text-gray-300 text-xl w-full p-5 outline-none"></textarea>
                        <button onClick={()=> generateCrypt()} className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                            Crypt message
                        </button>
                    </div>
                </div>
                <div className="h-full bg-orange-600">
                    <div className="bg-white rounded-bl-lg rounded-br-lg lg:rounded-bl-none lg:rounded-tr-lg h-full w-full p-5 overflow-y-scroll">
                        <div className="bg-blue-500 pb-5">
                            <div className="bg-green-100 border-t-4 border-green-500 text-green-900 px-4 py-3 mb-3 shadow-md">To update the preview, focus in the text area and click <button onClick={()=> previweFormatation()} className="rounded-md bg-green-800 px-3 py-1 text-sm font-semibold leading-6 shadow-sm text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">here</button></div>
                            <p className="p-2 flex gap-3 align-middle">
                                <abbr className="w-[50%]" title="Mutation">
                                    <select onChange={e => {setTxtMut(e.target.selectedIndex); previweFormatation();}} className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        <option value="gap">Gap</option>
                                        <option value="reciprocal">Reciprocal</option>
                                    </select>
                                </abbr>
                                <abbr className="w-[50%]" title="Order">
                                    <select onChange={e => {setTxtOrder(e.target.selectedIndex); previweFormatation();}}  className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        <option value="reverse">Reverse</option>
                                        <option value="random">Random</option>
                                    </select>
                                </abbr>
                            </p>
                            <textarea readOnly rows={7} value={fTxt} className="div-2 text-xl text-white w-full bg-transparent px-2 outline-none box-border"></textarea>
                        </div>
                        <div className="bg-blue-700 pb-5">
                        <p className="p-2">
                                <abbr title="Cypher type">
                                    <select onChange={e => {setCypherType(e.target.selectedIndex); previweFormatation();}}  className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        <option value="simply_t">SCSimply TK</option>
                                        <option value="simply_tm">SCSimply TM</option>
                                        <option value="simply_n">SCSimply Num</option>
                                        <option value="morse">SCMorse</option>
                                        <option value="binary">SCBinary</option>
                                        <option value="navajo">SCNavajo</option>
                                        <option value="enigma">SCEnigma</option>
                                        <option value="vigenere">SCVigenere</option>
                                        <option value="frama">SCFrama</option>
                                        <option value="bacon">SCBacon</option>
                                        <option value="polybe">SCPolybe</option>
                                    </select>
                                </abbr>
                                {(cypherType == 7 || cypherType == 8) && <abbr title="Key">
                                    <input type="text" onChange={e => {setKey(e.target.value); previweFormatation();}} value={format_str(key)} placeholder="Key" className="w-full my-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                </abbr>}
                            </p>
                            <textarea readOnly rows={7} value={cTxt} className="div-2 text-xl text-white w-full bg-transparent px-2 outline-none box-border"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}