import { usePDF } from "react-to-pdf";
import { logo } from "../global/logo";

export default function GeneratePDF(encode: {crypted_msg: string, decrypt_config: string | null, pattern: string, msg: string}): JSX.Element
{
    const { toPDF, targetRef } = usePDF({filename: "scode-decrypt-doc.pdf"})
    return (
        <div>
            <button className="flex w-full my-4 justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={() => toPDF()}>Download Decrypt Doc</button>
            <div className="p-4" ref={targetRef}>
                <header className="p-8 text-gray-900">
                    <div>
                        <img className='w-12 block' src={logo} alt="scode-logo" />
                        <h1 className='text-lg font-semibold tracking-[15px]'>SCode</h1>
                    </div>
                </header>
                <hr className="border-2" />
                <br /><br />
                <div>
                    <h3><strong>ORIGINAL MESSAGE</strong></h3>
                    <p>{encode.msg}</p>
                    <br />
                    <h3><strong>ENCRYPTED MESSAGE</strong></h3>
                    <p>{encode.crypted_msg}</p>
                    <br />
                    <h3><strong>DECRYPT CONFIGURATION</strong></h3>
                    <br />
                    <div className="p-4 border-2">
                        <h6><strong>PATTERN</strong></h6>
                        <p>{encode.pattern}</p>
                        <br />
                        {encode.decrypt_config != null && <><h6><strong>PARAMETERS</strong></h6><p className="w-full">{encode.decrypt_config}</p></>}
                    </div>
                </div>
            </div>
        </div>
    )
}