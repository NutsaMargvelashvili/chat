import "./App.scss";
import React, { useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./chat";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";

// @ts-ignore
import { loadFull } from "tsparticles";
import Signin from "./Components/Signin";

const socket: Socket = io("https://chat-nutsamargvelashvili.onrender.com");

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

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <div className="App">
      <Header />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#10e956",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="main">
        <Home></Home>
        <div className={"joinChatContainer"}>
          {!showChat ? (
            <Signin
              socket={socket}
              setShowChat={setShowChat}
              setRoom={setRoom}
              setUsername={setUsername}
              room={room}
              username={username}
            ></Signin>
          ) : (
            // <div className="chat-wrapper">
            //   <p>
            //     <code>Hi, I'm Nutsa Margvelashvili</code>
            //   </p>
            //   <h3>Join A Chat</h3>
            //   <input
            //     type="text"
            //     placeholder={"Nuka..."}
            //     onChange={(e) => setUsername(e.target.value)}
            //   />
            //   <input
            //     type="text"
            //     placeholder={"Room ID..."}
            //     onChange={(e) => setRoom(e.target.value)}
            //   />
            //   <button onClick={joinRoom}>Join A Room</button>
            // </div>
            <Chat socket={socket} room={room} username={username} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
