
export default interface ICipher
{
    encode(msg : string) : string
    decode(msg: string): string
}