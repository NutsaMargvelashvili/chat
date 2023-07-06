import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Message from "./Components/Message";

interface IMessage {
  room: string;
  author: string;
  message: string;
  time: string;
}

interface IChat {
  socket: any;
  username: any;
  room: any;
}

const Chat: React.FC<IChat> = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [reactOpen, setReactOpen] = useState(false);

  const closeReact = () => {
    setReactOpen(false);
  };
  useEffect(() => {
    console.log(reactOpen, "changed");
  }, [reactOpen]);

  const sendMessage = async (): Promise<void> => {
    if (currentMessage !== "") {
      const messageData: IMessage = {
        room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now())
          .getHours()
          .toString()
          .padStart(2, "0")}:${new Date(Date.now())
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
      };
      await socket.emit("send_message", messageData);
      setMessageList((prevState) => [...prevState, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data: IMessage): void => {
      setMessageList((prevState) => [...prevState, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  // @ts-ignore
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {reactOpen && <div onClick={closeReact} className="blur"></div>}
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <Message
              username={username}
              index={index}
              author={messageContent.author}
              message={messageContent.message}
              time={messageContent.time}
              reactOpen={reactOpen}
              setReactOpen={setReactOpen}
            ></Message>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          value={currentMessage}
          type="text"
          placeholder="Hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button className={"send-btn"} onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} fade />
        </button>
      </div>
    </div>
  );
};

export default Chat;
