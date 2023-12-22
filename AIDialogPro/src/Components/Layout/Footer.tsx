import React, {useCallback, useState} from 'react'
import axios from 'axios'

type FooterProps = {
    loading: boolean,
}

const Footer: React.FC<FooterProps> = ({loading}) => {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
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
        console.log(input)
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
            console.log(res)
        } catch(err){
            console.log(err)
            setError('Wygląda na to, że coś poszło nie tak. Spróbuj ponownie później.')
        }

    }, [])

    return(
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
                >{loading ? '...' : 'Wyślij'}</button>

            </div>
        </div>
    )
}

export default Footer