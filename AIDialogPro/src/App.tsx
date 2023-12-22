import './App.css'
import {useState, useRef} from 'react'
import Header from "./Components/Layout/Header.tsx";
import Body from "./Components/Layout/Body.tsx";
import Footer from "./Components/Layout/Footer.tsx";
function App() {
    const [show, setShow] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const handleClose = () => {
        setShow(false)
    }

    return (

    <>
        <div className={`chatbot-box${show && ' active'}`}>
            <Header handleClose={handleClose} />
            <Body messages={messages} loading={loading} lastMessageRef={lastMessageRef} />
            <Footer loading={loading} />
        </div>

    </>
  )
}

export default App
