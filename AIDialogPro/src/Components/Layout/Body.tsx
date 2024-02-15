import BouncingDotsLoader from '../Small/BouncingDotsLoader.tsx'
import {useEffect} from "react";

type BodyProps = {
  messages: any[]
  loading: boolean
  lastMessageRef: any
}

type Message = {
  role: string
  content: string
  time: string
}

const Body = (props: BodyProps) => {
  //   foreach message set random time in format HH:MM
    for (let i = 0; i < props.messages.length; i++) {
        let h = (Math.floor(Math.random() * 24)).toString()
        let m = (Math.floor(Math.random() * 60)).toString()
        if(h.length === 1) h = '0' + h
        if(m.length === 1) m = '0' + m
        props.messages[i].time = `${h}:${m}`

    }
  return (
      <div className="flex flex-grow overflow-auto p-4 custom-scrollbar">
        <div className="space-y-2 w-full">
          {props.messages &&
              props.messages.map(
                  (message: Message, index: number, arr: any[]) => (
                      <div
                          key={index}
                          ref={index === arr.length - 1 ? props.lastMessageRef : null}
                          className={`flex break-words ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                      >
                        <div className={`min-w-28 max-w-60 mb-2 px-4 py-2 rounded-lg ${
                            message.role === 'user' ? 'bg-red-500 text-white rounded-br-none' : 'bg-gray-200 rounded-bl-none '
                        }`}>
                          <div className="text-sm">
                            {message.content}
                          </div>
                          <div className={`text-2xs ${message.role === 'user' ? 'text-white': 'text-black'} text-right mt-1`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                  ),
              )}
          {props.loading && (
              <div ref={props.lastMessageRef} className={`w-full`}>
                <BouncingDotsLoader />
              </div>
          )}
        </div>
      </div>
  )
}

export default Body
