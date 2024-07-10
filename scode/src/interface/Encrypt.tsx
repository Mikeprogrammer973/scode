import { useState } from "react"
import format_str from "../util/format_str"
import MutationTemplate from "../code/alpha_template/MutationTemplate"
import OrderTemplate from "../code/alpha_template/OrderTemplate"

export default function Encrypt(): JSX.Element
{

    const [cypherType, setCypherType] = useState<number>(0)
    const [txtMut, setTxtMut] = useState<number>(0)
    const [txtOrder, setTxtOrder] = useState<number>(0)
    const [key, setKey] = useState<string>("")
    const [txt, setTxt] = useState<string>("")
    const [fTxt, setFTxt] = useState<string>("")
    const [[prmsD, setPrmsD], [prmsR, setPrmsR]] = [useState<{msg: string, decalage: number}>(), useState<{alpha_ref: string[], msg: string}>()]

    /*if(txtMut == 0 && txtOrder == 0){
        setPrmsD(MutationTemplate.decalage(OrderTemplate.reverse(txt)))
        setFTxt(prmsD?.msg || "")
    }
    if(txtMut == 0 && txtOrder == 1){
        setPrmsR(OrderTemplate.random(txt))
        setPrmsD(MutationTemplate.decalage(prmsR?.msg || ""))
        setFTxt(prmsD?.msg || "")
    }
    if(txtMut == 1 && txtOrder == 0) setFTxt(MutationTemplate.reciproque(OrderTemplate.reverse(txt)))
    if(txtMut == 1 && txtOrder == 1){
        setPrmsR(OrderTemplate.random(txt))
        setFTxt(MutationTemplate.reciproque(prmsR?.msg || ""))
    }*/


    return(
        <section className="bg-slate-800">
            <div>ALERTA</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-5">
                <div className="aspect-[16/9] h-full bg-black">
                    <div  className="bg-white rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg h-full w-full p-5">
                        <textarea onChange={e => setTxt(e.target.value)} value={format_str(txt)} className="bg-slate-500 text-gray-300 text-xl w-full h-full p-5 outline-none"></textarea>
                    </div>
                </div>
                <div className="aspect-[16/9] h-full bg-orange-600">
                    <div className="bg-white rounded-bl-lg rounded-br-lg lg:rounded-bl-none lg:rounded-tr-lg h-full w-full p-5">
                        <div className="bg-blue-500">
                            <p className="p-2 flex gap-3 align-middle">
                                <abbr className="w-[50%]" title="Mutation">
                                    <select onChange={e => setTxtMut(e.target.selectedIndex)} className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        <option value="gap">Gap</option>
                                        <option value="reciprocal">Reciprocal</option>
                                    </select>
                                </abbr>
                                <abbr className="w-[50%]" title="Order">
                                    <select onChange={e => setTxtOrder(e.target.selectedIndex)}  className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                        <option value="reverse">Reverse</option>
                                        <option value="random">Random</option>
                                    </select>
                                </abbr>
                            </p>
                            <p className="p-2 text-xl text-white">
                                {fTxt}
                            </p>
                        </div>
                        <div className="bg-blue-700">
                        <p className="p-2">
                                <abbr title="Cypher type">
                                    <select onChange={e => setCypherType(e.target.selectedIndex)}  className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
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
                                    <input type="text" onChange={e => setKey(e.target.value)} value={format_str(key)} placeholder="Key" className="w-full my-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                </abbr>}
                            </p>
                            <p className="p-2 text-xl text-white">
                                CODED TEXT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}