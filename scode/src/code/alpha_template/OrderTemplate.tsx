
export default class OrderTemplate
{
    static reverse(msg: string): string
    {
        let msg_slices = msg.split(" ")
        let formated_msg = ""

        if(msg_slices.length > 1)
        {
            msg_slices.forEach((slice, i)=>{
                formated_msg += msg_slices[(msg_slices.length - i) - 1]
                if(i < (msg_slices.length - 1)) formated_msg += " "
            })
        }else {
            formated_msg = msg
        }

        return formated_msg
    }

    static mixed(msg: string): string
    {
        let msg_slices = msg.split(" ")
        let formated_msg = ""

        msg_slices.forEach((slice, i)=>{
            for(let i = slice.length-1; i > -1; i--)
            {
                formated_msg += slice[i]
            }
            if(i < (msg_slices.length - 1)) formated_msg += " "
        })

        return formated_msg
    }

    static mixedReverse(msg: string): string
    {
        return this.mixed(this.reverse(msg))
    }
}