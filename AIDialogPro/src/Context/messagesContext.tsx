import React, { createContext, useState, useContext, ReactNode } from 'react'
import TMessage from '../Types/TMessage.ts'

type TContext = {
  messages: TMessage[]
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<TContext | null>(null)

type TContextProvider = {
  children: ReactNode
}

export const ContextProvider = ({ children }: TContextProvider) => {
  const [messages, setMessages] = useState<TMessage[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Context.Provider value={{ messages, setMessages, loading, setLoading }}>
      {children}
    </Context.Provider>
  )
}

export const useMessages = (): TContext => {
  const context = useContext(Context)
  if (context === null) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }
  return context
}
