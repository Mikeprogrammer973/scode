import { useState } from "react"
import format_str from "../util/in/format_str"
import Spinner from "../util/global/spinner"
import MsgBox from "../util/global/msgBox"
import { Alert } from "../util/global/alert"
import valid_pattern from "../util/encrypt/verify_pattern"
import encrypt_msg from "../util/encrypt/encrypt_msg"
import GeneratePDF from "../util/out/generate_pdf"

export default function Encrypt(): JSX.Element
{
    const [spinnerV, setSpinnerV] = useState<boolean>(false)
    const [msgBV, setMsgBV] = useState<boolean>(false)
    const [alert, setAlert] = useState<JSX.Element>(<div></div>)
    const [txt, setTxt] = useState<string>("")
    const [pattern, setPattern] = useState<string>("")

    function generateCrypt()
    {
        setSpinnerV(true)
        setTimeout(()=>{
            let msg: JSX.Element = <div></div>
            if(valid_pattern(pattern))
            {
                const encode = encrypt_msg(pattern, format_str(txt))
                if(encode.crypted_msg != "error")
                {
                    msg = <div className="">
                        <Alert color="success" title="SCode Encrypt" msg={<h3 className="font-semibold text-lg my-4">Message crypted successfully!</h3>} />
                        <br />
                        <br /><br />
                        <GeneratePDF pattern={pattern} msg={encode.msg} crypted_msg={encode.crypted_msg} decrypt_config={encode.decrypt_config} />
                    </div>
                } else{
                    msg = <Alert color="warning" title="SCode Encrypt" msg={<div className="font-semibold text-lg my-4">Your message shouldn't be empty!</div>} />
                }
            } else{
                msg = <Alert color="danger" title="SCode Encrypt" msg={<div className="font-semibold text-lg my-4">Invalid encrypt pattern!</div>} />
            }
            setSpinnerV(false)
            setAlert(msg)
            setMsgBV(true)
        }, 5000)
    }


    return(
        <section className="p-5">
            <Spinner visible={spinnerV} />
            <MsgBox visible={msgBV} msg={alert} setVisible={setMsgBV} />
            <div className="max-w-[100%] md:max-w-[60%] mx-auto p-5 rounded-lg shadow-lg bg-slate-200 dark:bg-slate-700">
                <div className="h-full">
                    <div  className="h-full w-full p-5">
                        <div className="bg-blue-100 border-t-4 border-blue-500 text-blue-900 px-4 py-3 shadow-md">Type your text here</div>
                        <textarea rows={10} onChange={e => {setTxt(e.target.value);}} value={format_str(txt)} className="block w-full rounded-b-md border-0 p-1.5 bg-transparent text-gray-800 dark:text-gray-200 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:text-xl sm:leading-6"></textarea>
                        <div className="my-4">
                            <p className="bg-blue-100 border-t-4 border-blue-500 text-blue-900 px-4 py-3 shadow-md">Type your pattern here</p>
                            <input value={pattern} onChange={(e)=>{setPattern(e.target.value)}} type="text" className="block w-full rounded-b-md border-0 p-1.5 bg-transparent text-gray-800 dark:text-gray-200 shadow-sm outline-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:text-xl sm:leading-6"  />
                        </div>
                        <br />
                        <button onClick={()=> generateCrypt()} className="flex w-full justify-center rounded-md bg-gray-800 dark:bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white dark:text-gray-700 hover:bg-gray-600 dark:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                            Encrypt message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}