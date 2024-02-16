type MessageProps = {
  index: number
  message: any
  arr: any[]
  lastMessageRef: any
}

function Message({ index, message, arr, lastMessageRef }: MessageProps) {
  return (
    <div
      key={index}
      ref={index === arr.length - 1 ? lastMessageRef : null}
      className={`flex break-words ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`min-w-48 sm:min-w-28 max-w-96 sm:max-w-60 mb-2 px-4 py-2 rounded-2xl ${
          message.role === 'user'
            ? 'bg-red-500 text-white rounded-br-none rounded-bl-3xl rounded-tr-3xl'
            : 'bg-gray-200 rounded-bl-none rounded-br-3xl rounded-tl-3xl'
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
  )
}

export default Message
