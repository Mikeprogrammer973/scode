import { NavigateFunction } from "react-router-dom"

const routes_names = ["", "documentation", "encrypt", "decrypt"]
export const routes = 
{
    home: `/${routes_names[0]}`,
    encrypt: `/${routes_names[2]}`,
    decrypt: `/${routes_names[3]}`,
    doc: `/${routes_names[1]}`
}


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

