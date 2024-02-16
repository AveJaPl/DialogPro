import React, { useCallback, useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import Copyright from '../Small/Copyright.tsx'
import getAnswer from '../../Services/getAnswer.ts'
import { useMessages } from '../../Context/messagesContext.tsx'

const Footer = () => {
  const [input, setInput] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)

  const { setMessages, loading, setLoading } = useMessages()
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(input)
    }
  }

  const handleSendMessage = async (input: string) => {
    if (input.trim() === '') {
      return
    }
    setLoading(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: 'generatedID',
        role: 'user',
        content: input,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
    setSent(true)
  }

  useEffect(() => {
    const getAnswerFromServer = async (user_prompt: string) => {
      let { chat, message, status } = await getAnswer(user_prompt)
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
      setLoading(false)
    }
    if (sent) {
      getAnswerFromServer(input).then(() => {
        setInput('')
      })
      setSent(false)
    }
  }, [sent])

  return (
    <div className={`w-full flex flex-col border-t-2 p-2`}>
      <div className={`flex justify-between p-2`}>
        <input
          className={`text-sm w-5/6 border-2 p-2 rounded-lg active:outline-none focus:outline-none focus:border-red-500`}
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
      <Copyright />
    </div>
  )
}

export default Footer
