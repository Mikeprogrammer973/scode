
import { JSX } from 'react'

export default interface ICode
{
    codificar(msg : string) : string
    decodificar(msg: string): string
}