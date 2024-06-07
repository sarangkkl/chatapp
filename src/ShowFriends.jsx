import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ChatDetail from './ChatDetail';


const ShowFriends = ({BASE_URL,access_token,user}) => {
    // console.log(BASE_URL,access_token)
    const [channels, setChannels] = useState()
    const [active_channel, setActive_channel] = useState()

    function fetch_channels(){
        axios.get(`${BASE_URL}/channels`,{
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        }).then((response)=>{
            // console.log(response.data)
            setChannels(response.data)
        }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        fetch_channels()
    },[])
  return (
    <div>
        <h1>Channels</h1>
        {channels ? channels.map((item,index)=>{
            return(
                <div key={index} onClick={()=>{setActive_channel(item.id)}}>
                    <h3>{item.name.name}</h3>
                    <p>{item.name.phone_number}</p>
                </div>
            )
        }) : null}
        { active_channel ? <ChatDetail BASE_URL={BASE_URL} CHANNEL_ID={active_channel} ACCESS_TOKEN={access_token} user={user}/>:<>
        No Active chat
        </>}
        
    </div>
  )
}

export default ShowFriends