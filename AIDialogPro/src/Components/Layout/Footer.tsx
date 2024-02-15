import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { IoIosSend } from 'react-icons/io'
type FooterProps = {
  loading: boolean
  setMessages: (messages: any[]) => void
}

const Footer: React.FC<FooterProps> = ({ loading, setMessages }) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const currentYear = new Date().getFullYear()

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(input)
      setInput('')
    }
  }

  const handleSendMessage = useCallback(async (input: string) => {
    if (input.trim() === '') {
      return
    }
    setMessages([
      {
        role: 'user',
        content: input,
        // time: new Date().toLocaleTimeString()
      },
    ])
    try {
      const res = await axios.post(
        'https://localhost/message',
        { message: input },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      setMessages(res.data['chat_history'])
    } catch (err) {
      console.log(err)
      setError(
        'Wygląda na to, że coś poszło nie tak. Spróbuj ponownie później.',
      )
    }
  }, [])

  return (
    <div className={`w-full flex flex-col border-t-2 p-2`}>
      <div className={`flex justify-between p-2`}>
        <input
          className={`w-5/6 border-2 p-2 rounded-lg`}
          placeholder={loading ? 'Pisze...' : 'Wpisz wiadomość...'}
          onChange={(e) => handleInput(e)}
          value={input}
          onKeyDown={(e) => handleKeyDown(e)}
          disabled={loading}
        />
        <button
          className={`flex items-center justify-center w-1/6 bg-red-500 text-white rounded-lg ml-2`}
          onClick={() => handleSendMessage(input)}
          disabled={loading}
        >
          <IoIosSend />
        </button>
      </div>
      <div
        className={`flex items-center justify-center w-full text-2xs opacity-40`}
      >
        Copyright &copy; {currentYear} by&nbsp;
        <a
            href="https://github.com/AveJaPl"
            target="_blank"
            className={`hover:underline font-semibold`}
        >
          AveJaPl
        </a>
        &nbsp;All rights reserved.
      </div>
    </div>
  )
}

export default Footer
