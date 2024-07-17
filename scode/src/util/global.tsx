import { NavigateFunction } from "react-router-dom"

export const routes = 
{
    home: "/home",
    encrypt: "/encrypt",
    decrypt: "/decrypt",
    doc: "/doc"
}

const routes_names = ["home", "doc", "encrypt", "decrypt"]

export function HandleHistory(url: string, navigate: NavigateFunction)
{
    const route = url.split("/")[3].replace("-", " ")

    window.name = "SCode"
    
    if(route.length > 0) window.name = "SCode - " + route[0].toUpperCase() + route.slice(1)

    routes_names.map((u, i)=>{
        if(url.indexOf(u) != -1)
        {
            sessionStorage.scode_slt_menu = i
        }
    })
}

