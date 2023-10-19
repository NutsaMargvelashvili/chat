import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faPoop } from "@fortawesome/free-solid-svg-icons";
import { faMasksTheater } from "@fortawesome/free-solid-svg-icons";
import { faSmoking } from "@fortawesome/free-solid-svg-icons";

interface IMessage {
  username: string;
  index: number;
  author: string;
  message: string;
  time: string;
  reactOpen: boolean;
  setReactOpen: any;
  currentEmoji: string;
  setCurrentEmoji: any;
  setSelectedMessageId: any;
  messageId: string;
  emoji: any;
}

const Message: React.FC<IMessage> = ({
  username,
  index,
  author,
  message,
  time,
  reactOpen,
  setReactOpen,
  currentEmoji,
  setCurrentEmoji,
  setSelectedMessageId,
  messageId,
  emoji,
}) => {
  // const [react, setReact] = useState<any>();
  const [el, setEl] = useState("");
  const openReact = function (e: any) {
    setEl(e);
    setReactOpen(true);
    e.target.closest(".message-wrapper").style.zIndex = 12;
  };
  const closeReact = function (e: any) {
    if (!reactOpen) return;
    setReactOpen(false);
    setEl("");
    e.target.closest(".message-wrapper").style.zIndex = 10;
  };

  const handleReact = (e: any) => {
    e.stopPropagation();
    setCurrentEmoji(
      <FontAwesomeIcon style={{ color: "#6D61EB" }} icon={faBug} />
    );
  };

  const chooseReact = (emoji: any) => {
    setSelectedMessageId(messageId);
    setCurrentEmoji(emoji);
    closeReact(el);
  };

  return (
    <div
      className="message"
      id={username === author ? "you" : "other"}
      key={index}
    >
      <div
        onClick={closeReact}
        style={{ zIndex: 10 }}
        className={"message-wrapper"}
      >
        {reactOpen && el && (
          <div className="react-list">
            <div
              className={"react-list-item"}
              onClick={() =>
                chooseReact(
                  <FontAwesomeIcon
                    style={{ color: "#E1186B" }}
                    icon={faHeart}
                  />
                )
              }
            >
              <FontAwesomeIcon style={{ color: "#E1186B" }} icon={faHeart} />
            </div>
            <div
              className={"react-list-item"}
              onClick={() =>
                chooseReact(
                  <FontAwesomeIcon style={{ color: "#F57431" }} icon={faFire} />
                )
              }
            >
              <FontAwesomeIcon style={{ color: "#F57431" }} icon={faFire} />
            </div>
            <div
              className={"react-list-item"}
              onClick={() =>
                chooseReact(
                  <FontAwesomeIcon
                    style={{ color: "#F5E827" }}
                    icon={faSmoking}
                  />
                )
              }
            >
              <FontAwesomeIcon style={{ color: "#F5E827" }} icon={faSmoking} />
            </div>
            <div
              className={"react-list-item"}
              onClick={() =>
                chooseReact(
                  <FontAwesomeIcon style={{ color: "#7D8F52" }} icon={faPoop} />
                )
              }
            >
              <FontAwesomeIcon style={{ color: "#7D8F52" }} icon={faPoop} />
            </div>
            <div
              className={"react-list-item"}
              onClick={() =>
                chooseReact(
                  <FontAwesomeIcon
                    style={{ color: "#A260FA" }}
                    icon={faMasksTheater}
                  />
                )
              }
            >
              <FontAwesomeIcon
                style={{ color: "#A260FA" }}
                icon={faMasksTheater}
              />
            </div>
          </div>
        )}
        <div className="message-meta">
          <p id="author">{username === author ? "You" : author}</p>
        </div>
        <div onDoubleClick={handleReact} className="message-polygon">
          <div className="message-content">
            <p>{message}</p>
          </div>
        </div>
        <div className="message-meta">
          {username !== author && <p id="time">{time}</p>}
          <div onClick={openReact} className={"message-react"}>
            {emoji ? (
              <FontAwesomeIcon
                style={emoji.props.style}
                icon={emoji.props.icon}
              />
            ) : (
              <FontAwesomeIcon style={{ opacity: 0.5 }} icon={faCirclePlus} />
            )}
          </div>
          {username === author && <p id="time">{time}</p>}
        </div>
      </div>
    </div>
  );
};

export default Message;
