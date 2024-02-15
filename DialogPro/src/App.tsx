import './App.css'
import { useState, useRef, useEffect } from 'react'
import Header from './Components/Layout/Header.tsx'
import Body from './Components/Layout/Body.tsx'
import Footer from './Components/Layout/Footer.tsx'
import getHistory from './Services/getHistory.ts'
import { MdOutlineChatBubble } from 'react-icons/md'
import { useMessages } from './Context/messagesContext.tsx'

function App() {
  const [show, setShow] = useState(false)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  const { messages, setMessages, loading } = useMessages()
  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [loading, messages, lastMessageRef])
  const fetchMessages = async () => {
    try {
      const chatHistory = await getHistory()
      if (chatHistory) {
        setMessages(chatHistory)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])
  return (
    <>
      <div
        className={`flex flex-col bg-neutral-50 w-full h-full sm:w-80 sm:h-110 fixed right-0 sm:right-5 bottom-0 sm:bottom-5 rounded-none sm:rounded-lg shadow-lg overflow-hidden transition-all z-50 ${show ? 'block' : 'hidden'}`}
      >
        <Header handleClose={handleClose} />
        <Body lastMessageRef={lastMessageRef} />
        <Footer />
      </div>
      <div
        className={`fixed right-5 bottom-5 rounded-full p-4 bg-red-500 cursor-pointer shadow-md ${show ? 'hidden' : 'block'}`}
        onClick={() => setShow(!show)}
      >
        <MdOutlineChatBubble className="text-white text-2xl" />
      </div>
    </>
  )
}

export default App
