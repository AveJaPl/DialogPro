import './App.css'
import {useState, useRef, useEffect} from 'react'
import Header from "./Components/Layout/Header.tsx";
import Body from "./Components/Layout/Body.tsx";
import Footer from "./Components/Layout/Footer.tsx";
import axios from 'axios'

function App() {
    const [show, setShow] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const handleClose = () => {
        setShow(false)
    }
    const handleSetLoading = (value: boolean) => {
        setLoading(value)
    }
    const handleSetMessages = (new_messages: any[]) => {
        if(new_messages.length === 1 && new_messages[0]['role'] === 'user'){
            setMessages(prevState => [...prevState, new_messages[0]])
        }
        else{
            setMessages(new_messages)
        }
    }
    const fetchMessages = async() => {
        try{
            const res = await axios.post("https://localhost/history", {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            const chatHistory = res.data['chat_history']
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
            <Footer loading={loading} setLoading={handleSetLoading} setMessages={handleSetMessages}/>
        </div>
        <div className={`chatbot-btn`} onClick={()=>setShow(!show)}>
            <span>?</span>
        </div>

    </>
  )
}

export default App
