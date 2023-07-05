import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from "react";
import Chat from "./chat";
import { Helmet } from 'react-helmet';



function App() {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://chat-nutsamargvelashvili.onrender.com/hello');
            const jsonData = await response.json();
            console.log(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const joinRoom = () => {
       if(username !== '' && room !== ''){
           // socket.emit("join_room", room)
           setShowChat(true)
       }
    }
  return (
    <div className="App">
        <Helmet>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />


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
            <div></div>
            // (<Chat socket={''} room={room} username={username}/>)
        }
        </Helmet>
    </div>
  );
}

export default App;
