import "./App.scss";
import React from "react";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./chat";
import Header from "./Components/Header";

const socket: Socket = io("https://chat-nutsamargvelashvili.onrender.com");

// const socket = io.connect("");

function App() {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);

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
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="joinChatContainer">
        {!showChat ? (
          <header className="chat-wrapper">
            <p>
              <code>Hi, I'm Nutsa Margvelashvili</code>
            </p>
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder={"Nuka..."}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder={"Room ID..."}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </header>
        ) : (
          <Chat socket={socket} room={room} username={username} />
        )}
      </div>
    </div>
  );
}

export default App;
