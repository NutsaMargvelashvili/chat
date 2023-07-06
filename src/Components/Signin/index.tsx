import React, { useEffect, useState } from "react";
import "./style.scss";

interface ISignup {
  socket: any;
  setShowChat: any;
  setRoom: any;
  setUsername: any;
  room: string;
  username: string;
}

const Signin: React.FC<ISignup> = ({
  socket,
  setShowChat,
  setUsername,
  setRoom,
  room,
  username,
}) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://chat-nutsamargvelashvili.onrender.com/hello"
      );
      const jsonData = await response.text();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const joinRoom = () => {
    console.log("clicked", username, room);
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="container">
      <h3>Chat with Me</h3>
      <div className="editor-field editor-field__textbox">
        <div className="editor-field__label-container">
          <label className="editor-field__label">Name</label>
        </div>

        <div className="editor-field__container">
          <input
            type="text"
            placeholder={"Nuka..."}
            className="editor-field__input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <span className="editor-field__bottom"></span>
        <div className="editor-field__noise"></div>
      </div>
      <div className="editor-field editor-field__textbox">
        <div className="editor-field__label-container">
          <label className="editor-field__label">Password</label>
        </div>

        <div className="editor-field__container">
          <input
            type="text"
            placeholder={"Room ID..."}
            className="editor-field__input"
            onChange={(e) => setRoom(e.target.value)}
            onKeyDown={(e) => {
              console.log(e.key);
              e.key === "Enter" && joinRoom();
            }}
          />
        </div>
        <span className="editor-field__bottom"></span>
        <div className="editor-field__noise"></div>
      </div>
      <div onClick={joinRoom} className="btn btn--primary">
        <div className="btn__container">Join a Room</div>
        <div className="btn__bottom"></div>
        <div className="btn__noise"></div>
      </div>
    </div>
  );
};

export default Signin;
