import BouncingDotsLoader from '../Small/BouncingDotsLoader.tsx'
import { useMessages } from '../../Context/messagesContext.tsx'
import TMessage from '../../Types/TMessage.ts'

type BodyProps = {
  lastMessageRef: any
}

const Body = (props: BodyProps) => {
  const { messages, loading } = useMessages()

  for (let i = 0; i < messages.length; i++) {
    let h = Math.floor(Math.random() * 24).toString()
    let m = Math.floor(Math.random() * 60).toString()
    if (h.length === 1) h = '0' + h
    if (m.length === 1) m = '0' + m
    messages[i].timestamp = `${h}:${m}`
  }
  return (
    <div className="flex flex-col flex-grow overflow-auto p-4 custom-scrollbar">
      <div className="space-y-2 w-full">
        {messages &&
          messages.map((message: TMessage, index: number, arr: any[]) => (
            <div
              key={index}
              ref={index === arr.length - 1 ? props.lastMessageRef : null}
              className={`flex break-words ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`min-w-48 sm:min-w-28 max-w-96 sm:max-w-60 mb-2 px-4 py-2 rounded-3xl ${
                  message.role === 'user'
                    ? 'bg-red-500 text-white rounded-br-none'
                    : 'bg-gray-200 rounded-bl-none '
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-2xs ${message.role === 'user' ? 'text-white' : 'text-black'} text-right mt-1`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
      </div>
      {loading && (
        <div ref={props.lastMessageRef} className={`mt-auto w-full`}>
          <BouncingDotsLoader />
        </div>
      )}
    </div>
  )
}

export default Body
