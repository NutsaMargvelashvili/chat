import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import {useState} from "react";
import Chat from "./chat";

const socket = io.connect("https://chat-nutsamargvelashvili.onrender.com")
// https://nutsamargvelashvili.github.io/public/index.html
function App() {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
       if(username !== '' && room !== ''){
           socket.emit("join_room", room)
           setShowChat(true)
       }
    }
  return (
    <div className="App">
        {!showChat ? (
        <div className="joinChatContainer">
      <header className="App-header">
        <p> <code>Hi, I'm Nutsa Margvelashvili</code>
        </p>
         <h3>Join A Chat</h3>
          <input type="text" placeholder={"Nuka..."} onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder={"Room ID..."} onChange={e => setRoom(e.target.value)}/>
          <button onClick={joinRoom}>Join A Room</button>

      </header>
        </div>) :
            (<Chat socket={socket} room={room} username={username}/>)
        }
    </div>
  );
}

export default App;
