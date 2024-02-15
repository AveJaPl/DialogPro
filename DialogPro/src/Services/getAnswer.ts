import axios from 'axios'
const getAnswer = async (question: string) => {
  try {
    const res = await axios.post(
      'https://localhost/message',
      { message: question },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    if (res) {
      return {
        chat: res.data['chat_history'],
        message: 'Poprawnie pobrano odpowiedź.',
        status: 200,
      }
    } else {
      return {
        chat: [],
        message: 'Nie udało się pobrać odpowiedzi.',
        status: 400,
      }
    }
  } catch (err) {
    console.log(err)
    return {
      chat: [],
      message: 'Coś poszło nie tak. Spróbuj ponownie później',
      status: 400,
    }
  }
}

export default getAnswer
