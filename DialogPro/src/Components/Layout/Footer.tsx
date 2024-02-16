import React, { ChangeEvent, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import Copyright from '../Small/Copyright.tsx'
import getAnswer from '../../Services/getAnswer.ts'
import { useMessages } from '../../Context/messagesContext.tsx'
import TMessage from '../../Types/TMessage.ts'

const Footer = () => {
  const [input, setInput] = useState('')
  const { setMessages, loading, setLoading } = useMessages()

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSendMessage = async () => {
    if (input.trim() === '') {
      return
    }
    setLoading(true)
    const newMessage: TMessage = {
      id: 'generatedID', // Rozważ implementację generowania unikatowych ID
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setInput('') // Czyść input tutaj, aby użytkownik widział, że wiadomość została "wysłana"
    try {
      const { chat, message, status } = await getAnswer(input)
      if (status === 200) {
        setMessages(chat)
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: 'generatedID',
            role: 'assistant',
            content: message,
            timestamp: new Date().toLocaleTimeString(),
          },
        ])
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage()
    }
  }

  return (
    <div className={`w-full flex flex-col border-t-2 p-2`}>
      <div className={`flex justify-between p-2`}>
        <input
          className={`text-sm w-5/6 border-2 p-2 rounded-lg active:outline-none focus:outline-none focus:border-red-500`}
          placeholder={loading ? 'Pisze...' : 'Wpisz wiadomość...'}
          onChange={handleInput}
          value={input}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={`flex items-center justify-center w-1/6 bg-red-500 text-white rounded-lg ml-2`}
          onClick={handleSendMessage}
          disabled={loading}
        >
          <IoIosSend />
        </button>
      </div>
      <Copyright />
    </div>
  )
}

export default Footer
