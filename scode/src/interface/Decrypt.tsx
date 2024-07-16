import { useState } from "react"
import Spinner from "../util/global/spinner"
import MsgBox from "../util/global/msgBox"
import format_str from "../util/in/format_str"
import valid_pattern from "../util/encrypt/verify_pattern"
import { Alert } from "../util/global/alert"
import decrypt_msg from "../util/decrypt/decrypt_msg"

export default function Decrypt(): JSX.Element
{
    const [spinnerV, setSpinnerV] = useState<boolean>(false)
    const [msgBV, setMsgBV] = useState<boolean>(false)
    const [alert, setAlert] = useState<JSX.Element>(<div></div>)
    const [txt, setTxt] = useState<string>("")
    const [pattern, setPattern] = useState<string>("")
    const [config, setConfig] = useState<string>("")

    function decrypt()
    {
        setSpinnerV(true)
        setTimeout(()=>{
            let msg: JSX.Element = <div></div>
            if(valid_pattern(pattern))
            {
                msg = decrypt_msg(pattern, config, txt)
                   
            } else{
                msg = <Alert color="danger" title="SCode Decrypt" msg={<div className="font-semibold text-lg my-4">Invalid encrypt pattern!</div>} />
            }
            setSpinnerV(false)
            setAlert(msg)
            setMsgBV(true)
        }, 5000)
    }

    return(
        <div>
            <Spinner visible={spinnerV} />
            <MsgBox setVisible={setMsgBV} visible={msgBV} msg={alert} />
            <div className="w-full">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="my-4">
                                <label htmlFor="txt" className="block text-sm font-medium leading-6 text-gray-900">
                                    Encrypted message
                                </label>
                                <div className="mt-2">
                                <textarea
                                    onChange={e => {setTxt(e.target.value);}} value={txt}
                                    rows={3}
                                    id="txt"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                ></textarea>
                                </div>
                            </div>
                            <div className="my-4">
                                <label htmlFor="config" className="block text-sm font-medium leading-6 text-gray-900">
                                    Decryptage configuration
                                </label>
                                <div className="mt-2">
                                <textarea
                                    value={config}
                                    onChange={e => setConfig(e.target.value)}
                                    rows={5}
                                    id="config"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                ></textarea>
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="flex items-center justify-between">
                                <label htmlFor="pattern" className="block text-sm font-medium leading-6 text-gray-900">
                                    Pattern
                                </label>
                                </div>
                                <div className="mt-2">
                                <input
                                    value={pattern} onChange={(e)=>{setPattern(e.target.value)}}
                                    id="pattern"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>
                            <div className="my-8">
                                <button
                                    onClick={()=>decrypt()}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Decrypt message
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

}