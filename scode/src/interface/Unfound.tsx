import { Link } from "react-router-dom";
import { routes } from "../util/global";

export default function Unfound(): JSX.Element
{
    let route = routes.home

    if(sessionStorage.scode_slt_menu)
    {
        switch(Number(sessionStorage.scode_slt_menu))
        {
            case 1: route = routes.doc
                break
            case 2: route = routes.encrypt
                break
            case 3: route = routes.decrypt
        }
    }

    return(
        <div className="grid min-h-full place-items-center bg-white dark:bg-gray-700 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-300">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-200">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to={route} className="rounded-md text-gray-200 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back</Link>
                <a href="mailto:technopro.net@gmail.com" target="_blank" className="text-sm font-semibold text-gray-900 dark:text-gray-300">Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </div>
    )
}