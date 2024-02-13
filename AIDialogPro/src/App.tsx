import './App.css'
import {useState, useRef, useEffect} from 'react'
import Header from "./Components/Layout/Header.tsx";
import Body from "./Components/Layout/Body.tsx";
import Footer from "./Components/Layout/Footer.tsx";
import axios from 'axios'
import getHistory from "./Services/getHistory.ts";

function App() {
    const [show, setShow] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const handleClose = () => {
        setShow(false)
    }
    const handleSetMessages = (new_messages: any[]) => {
        console.log("Nowe wiadomości:")
        console.log(new_messages)
        if(new_messages.length === 1 && new_messages[0]['role'] === 'user'){
            console.log("Ustawiam wiadomość użytkownika")
            setMessages(prevState => [...prevState, new_messages[0]])
        }
        else{
            console.log("Ustawiam wszystkie wiadomości")
            setMessages(new_messages)
        }
    }
    const fetchMessages = async() => {
        try{
            const chatHistory = await getHistory()
            if (chatHistory){
                setMessages(chatHistory)
            }
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchMessages()
    },[])
    return (

    <>
        <div className={show ? `chatbot-box active` : `chatbot-box`}>
            <Header handleClose={handleClose} />
            <Body messages={messages} loading={loading} lastMessageRef={lastMessageRef} />
            <Footer loading={loading} setMessages={handleSetMessages}/>
        </div>
        <div className={`chatbot-toggle-btn ${show && 'active'}`} onClick={(()=>setShow(!show))}>
            <span>ask</span>
        </div>

    </>
  )
}

export default App
