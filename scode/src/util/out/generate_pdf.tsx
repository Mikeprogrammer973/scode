import generatePDF, { Options, Resolution, Margin } from "react-to-pdf";
import { logo } from "../global/logo";

const options: Options = {
    filename: "scode-decrypt-doc.pdf",
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.EXTREME,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "landscape"
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/jpeg",
      qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true
      }
    }
}

const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options)

export default function GeneratePDF(encode: {crypted_msg: string, decrypt_config: string | null, pattern: string, msg: string}): JSX.Element
{
    return (
        <div>
            <button className="flex my-4 justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={() => downloadPdf()}>Download decryptage doc</button>
            <p className="block sm:hidden">
                <em className="text-red-600">
                    To get a better view of the PDF document, rotate your screen to landscape mode!
                </em>
            </p>
            <div className="p-4 w-full" id="container">
                <header className="p-8 text-gray-900">
                    <div>
                        <img className='w-12 block' src={logo} alt="scode-logo" />
                        <h1 className='text-lg font-semibold tracking-[15px]' translate="no">SCode</h1>
                    </div>
                </header>
                <hr className="border-[1px] border-gray-700" />
                <br /><br />
                <div>
                    <h3><strong>ORIGINAL MESSAGE</strong></h3>
                    <p>{encode.msg}</p>
                    <br />
                    <h3><strong>ENCRYPTED MESSAGE</strong></h3>
                    <p>{encode.crypted_msg}</p>
                    <br />
                    <h3><strong>DECRYPTAGE CONFIGURATION</strong></h3>
                    <div className="p-4">
                        <h6><strong className="font-medium">PATTERN</strong></h6>
                        <p>{encode.pattern}</p>
                        <br />
                        {encode.decrypt_config != null && <><h6><strong className="font-medium">PARAMETERS</strong></h6><p className="w-full">{encode.decrypt_config}</p></>}
                    </div>
                </div>
            </div>
        </div>
    )
}