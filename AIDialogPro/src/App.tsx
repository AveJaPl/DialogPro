import './App.css'
import { useState, useRef, useEffect } from 'react'
import Header from './Components/Layout/Header.tsx'
import Body from './Components/Layout/Body.tsx'
import Footer from './Components/Layout/Footer.tsx'
import getHistory from './Services/getHistory.ts'
import TMessage from './Types/TMessage.ts'
import { MdOutlineChatBubble } from 'react-icons/md'

function App() {
  const [show, setShow] = useState(false)
  const [messages, setMessages] = useState<TMessage[]>([])
  const [loading, setLoading] = useState(false)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const handleClose = () => {
    setShow(false)
  }

  const handleSetMessages = (new_messages: any[]) => {
    console.log('Nowe wiadomości:')
    console.log(new_messages)
    if (new_messages.length === 1 && new_messages[0]['role'] === 'user') {
      console.log('Ustawiam wiadomość użytkownika')
      setLoading(true)
      setMessages((prevState) => [...prevState, new_messages[0]])
    } else {
      setLoading(false)
      console.log('Ustawiam wszystkie wiadomości')
      setMessages(new_messages)
    }
  }

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [loading, messages, lastMessageRef])
  const fetchMessages = async () => {
    try {
      console.log('Ładowanie: ' + loading)
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
        className={`flex flex-col bg-neutral-50 w-80 h-110 absolute right-5 bottom-5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 -translate-y-10'}`}
      >
        <Header handleClose={handleClose} />
        <Body
          messages={messages}
          loading={loading}
          lastMessageRef={lastMessageRef}
        />
        <Footer loading={loading} setMessages={handleSetMessages} />
      </div>
      <div
        className={`fixed right-5 bottom-5 rounded-full p-4 bg-red-700 cursor-pointer shadow-md ${show && 'hidden'}`}
        onClick={() => setShow(!show)}
      >
        <MdOutlineChatBubble className="text-white text-2xl" />
      </div>
    </>
  )
}

export default App
