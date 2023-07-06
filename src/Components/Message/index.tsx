import React, { useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faBug } from "@fortawesome/free-solid-svg-icons";

interface IMessage {
  username: string;
  index: number;
  author: string;
  message: string;
  time: string;
}

const Message: React.FC<IMessage> = ({
  username,
  index,
  author,
  message,
  time,
}) => {
  const [react, setReact] = useState<any>();

  const handleReact = () => {
    setReact(<FontAwesomeIcon style={{ color: "#6D61EB" }} icon={faBug} />);
  };

  return (
    <div
      className="message"
      id={username === author ? "you" : "other"}
      key={index}
    >
      <div>
        <div className="message-meta">
          <p id="author">{username === author ? "You" : author}</p>
        </div>
        <div onDoubleClick={handleReact} className="message-polygon">
          <div className="message-content">
            <p>{message}</p>
          </div>
        </div>
        <div className="message-meta">
          <div className={"message-react"}>
            {react ? (
              react
            ) : (
              <FontAwesomeIcon style={{ opacity: 0.5 }} icon={faCirclePlus} />
            )}
          </div>
          <p id="time">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
