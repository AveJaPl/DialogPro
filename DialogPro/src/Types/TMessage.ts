type TMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export default TMessage
