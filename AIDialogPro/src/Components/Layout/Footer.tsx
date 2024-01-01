import React, {useCallback, useState} from 'react'
import axios from 'axios'
import { IoIosSend } from "react-icons/io";
type FooterProps = {
    loading: boolean,
    setMessages: (messages: any[]) => void
}

const Footer: React.FC<FooterProps> = ({loading, setMessages}) => {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const currentYear = new Date().getFullYear()

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }, [])
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleSendMessage(input)
            setInput('')
        }
    }

    const handleSendMessage = useCallback(async(input: string) => {
        if(input.trim() === ''){
            return
        }
        console.log("Wysyłam: ", input)
        setMessages([{
            role: 'user',
            content: input,
            // time: new Date().toLocaleTimeString()
        }])
        try{
            const res = await axios.post(
                'https://localhost/message',
                { message: input },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            console.log("Odpowiedź:\n")
            console.log(res)
            setMessages(res.data['chat_history'])
        } catch(err){
            console.log(err)
            setError('Wygląda na to, że coś poszło nie tak. Spróbuj ponownie później.')
        }

    }, [])

    return(
        <>
            <div className={`chatbot-box-footer`}>
                <div className={`chatbot-box-footer-wrapper`}>
                    <input
                        className={`chatbot-box-footer-input`}
                        placeholder={loading ? 'Pisze...' : 'Wpisz wiadomość...'}
                        onChange={e=>handleInput(e)}
                        value={input}
                        onKeyDown={e=>handleKeyDown(e)}
                        disabled={loading}
                    />
                    <button
                        className={`chatbot-box-footer-send-btn`}
                        onClick={()=> handleSendMessage(input)}
                        disabled={loading}
                    >
                        <IoIosSend />
                    </button>

                </div>
            </div>
            <div className={`chatbot-box-author`}>
                Copyright &copy; {currentYear} by <a href="https://github.com/AveJaPl" target="_blank">AveJaPl</a>
                &nbsp;All rights reserved.
            </div>
        </>

    )
}

export default Footer