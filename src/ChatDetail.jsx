import React,{useEffect,useState} from 'react';
import axios from 'axios';


const ChatDetail = ({BASE_URL,CHANNEL_ID,ACCESS_TOKEN,user}) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');

    function fetch_message(){
        axios.get(`${BASE_URL}/channels/${CHANNEL_ID}`,{
            headers:{
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        }).then((response)=>{
            console.log(response.data)
        }
        ).catch((error)=>{
            console.log(error)
        })  
    }

    useEffect(()=>{
        fetch_message()
        const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/${CHANNEL_ID}?access_token=${ACCESS_TOKEN}`)
        // console.log("newsocket",newSocket)
        setSocket(newSocket);
        // return () => newSocket.close();
    },[])
    const sendMessage = () => {
        if (socket) {
            var data = {
                "type":"message",
                "body":{
                    "type":"text",
                    "data":message
                }
            }
            var message_string = JSON.stringify(data)
            socket.send(message_string);
            setMessage('');
        }
    }
  return (
    <div style={{
        border:"1px solid",
        height:"50vh"
    }}>
        <h1>Chat Detail</h1>
        <h2>Channel ID: {CHANNEL_ID}</h2>

        <div>
        <input type="text" style={{
            width:"80%",
            height:"5vh",
            border:"1px solid",
        }} onChange={(e)=>{setMessage(e.target.value)}}/>

        <button className='btn' onClick={()=>{sendMessage()}}>SEND MESSAGE</button>
        </div>
     
    </div>
  )
}

export default ChatDetail