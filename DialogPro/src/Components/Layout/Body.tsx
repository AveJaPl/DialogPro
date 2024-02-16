import BouncingDotsLoader from '../Small/BouncingDotsLoader.tsx'
import { useMessages } from '../../Context/messagesContext.tsx'
import TMessage from '../../Types/TMessage.ts'
import Message from '../Small/Message.tsx'

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
            <Message
              key={index}
              index={index}
              message={message}
              arr={arr}
              lastMessageRef={props.lastMessageRef}
            />
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
