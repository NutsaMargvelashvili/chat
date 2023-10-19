import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Message from "./Components/Message";

interface IMessage {
  messageId: string;
  emoji: string;
  room: string;
  author: string;
  message: string;
  time: string;
}

interface IReact {
  emoji: string;
  messageId: string;
  room: string;
}

interface IChat {
  socket: any;
  username: any;
  room: any;
}

const Chat: React.FC<IChat> = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState<any>("");
  const [currentEmoji, setCurrentEmoji] = useState<string>("");
  const [selectedMessageId, setSelectedMessageId] = useState<string>("");
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [reactOpen, setReactOpen] = useState(false);

  const closeReact = () => {
    setReactOpen(false);
  };

  const setEmojiToMessage = (data: IReact) => {
    setMessageList((prevState) => {
      const updatedMessages = prevState.map((message) => {
        if (message.messageId === data.messageId) {
          return { ...message, emoji: data.emoji };
        } else {
          return message;
        }
      });
      return updatedMessages;
    });
  };
  const reactMessage = async (): Promise<void> => {
    if (currentEmoji !== "") {
      const reactData: IReact = {
        emoji: currentEmoji,
        messageId: selectedMessageId,
        room,
      };
      await socket.emit("react_message", reactData);
      setEmojiToMessage(reactData);
      setCurrentEmoji("");
      setSelectedMessageId("");
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (currentMessage !== "") {
      const messageData: IMessage = {
        emoji: "",
        messageId: Date.now().toString(), // TODO: change
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

    const handleReactedMessage = (data: IReact): void => {
      setEmojiToMessage(data);
    };
    socket.on("reacted_message", handleReactedMessage);

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("reacted_message", handleReactedMessage);
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    reactMessage();
  }, [currentEmoji, selectedMessageId]);
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
              messageId={messageContent.messageId}
              time={messageContent.time}
              reactOpen={reactOpen}
              setReactOpen={setReactOpen}
              currentEmoji={currentEmoji}
              setCurrentEmoji={setCurrentEmoji}
              setSelectedMessageId={setSelectedMessageId}
              emoji={messageContent.emoji}
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
