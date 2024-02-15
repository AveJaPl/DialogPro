import axios from 'axios'
import TMessage from '../Types/TMessage.ts'

const getHistory = async (): Promise<TMessage[]> => {
  try {
    const response = await axios.post(
      'https://localhost/history',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    return response.data.chat_history
  } catch (e) {
    console.log(e)
    return [
      {
        id: '',
        role: 'assistant',
        content: 'Wystąpił błąd!',
        timestamp: 'date'
      },
    ]
  }
}

export default getHistory
