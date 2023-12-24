import BouncingDotsLoader from "../Small/BouncingDotsLoader.tsx";

type BodyProps = {
    messages: any[],
    loading: boolean,
    lastMessageRef: any
}

type Message = {
    role: string,
    content: string,
    time: string
}

const Body = (props: BodyProps) => {
    return (
        <div className={`chatbot-box-body`}>
            <div className={`chatbot-box-body-message`}>
                {props.messages && props.messages.map((message: Message,index: number, arr: string[])=>(
                        <div
                            key={index}
                            ref={index === arr.length - 1 ? props.lastMessageRef : null}
                        >
                            <div className={message['role'] === 'user' ? 'message user' : 'message'}>
                                <div className={`chatbot-box-body-message-text`}>
                                    {message['content']}
                                </div>
                                <div className={`chatbot-box-body-message-time`}>
                                    {message['time']}
                                </div>
                            </div>
                        </div>
                    )
                )}
                {props.loading && (
                    <div ref={props.lastMessageRef}>
                        <BouncingDotsLoader />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Body;