import { logo } from "./logo"

interface SpinnerPrms {
    visible: boolean
}

 export default function Spinner(prms: SpinnerPrms)
{
    return(
        prms.visible ? <div style={{backgroundColor: "rgb(0, 0, 0, 0.3)"}} className="w-full h-full fixed top-0 left-0 text-white items-center justify-center flex">
        <img className="animate-ping rounded-full max-w-[100px] max-h-[100px]" src={logo} alt="spinner-logo" />
    </div> : <div></div>
    )
}
