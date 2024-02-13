import axios from "axios";

const getHistory = async()=>{
    try{
        const chat_history = await axios.post("https://localhost/history", {}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return chat_history.data['chat_history']
    } catch (e: any){
        console.log(e)
        return [{
            "role": "assistant",
            "content": "Wystąpił błąd!"
        }]
    }
}

export default getHistory