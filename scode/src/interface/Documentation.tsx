
import { useState } from "react"
import { routes } from "../util/global"
import { NavigateFunction } from "react-router-dom"
import { logo } from "../util/global/logo"

export default function Documentation(prms: {navigate: NavigateFunction}): JSX.Element
{

  const [msgBV, setMsgBV] = useState(false)
  const [msgBox, setMsgBox] = useState<React.ReactNode>(<div>Loading...</div>)

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>DOCS</div>
  )
}