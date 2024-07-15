import valid_decrypt_config from "./verify_decrypt_config";

export default function decrypt_msg(pattern: string, config: string | null, msg: string): string
{
    let decrypted_msg: string = "OK"

    if(!valid_decrypt_config(pattern, config))
    {
        return "Invalid decrypt configuration!"
    } else{
        // Decrypt message

    }

   return decrypted_msg
}