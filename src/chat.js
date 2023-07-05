import React, {useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageDate = {
                room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message", messageDate)
            setMessageList((prevState)=>[...prevState, messageDate])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((prevState)=>[...prevState, data])
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);
    return (
        <div className={"chat-window"}>
           <div className="chat-header">
               <p>Live Chat</p>
           </div>
            <div className="chat-body">
                <ScrollToBottom className={"message-container"}>
                {messageList.map(messageContent=>{
                    return (<div className="message" id={username === messageContent.author ? "you": "other"}>
                            <div>
                               <div className={"message-content"}>
                                  <p>{messageContent.message}</p>
                               </div>
                               <div className={"message-meta"}>
                                   <p id={"time"}>{messageContent.time}</p>
                                   <p id={"author"}>{messageContent.author}</p>
                               </div>
                            </div>
                    </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input value={currentMessage} typeof={"text"} placeholder={"Hey..."} onChange={e => setCurrentMessage(e.target.value)} onKeyPress={e=> {e.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
        )
}

export default Chat
