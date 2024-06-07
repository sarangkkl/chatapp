import React,{useState} from 'react'
import axios from 'axios'
import ShowFriends from './ShowFriends'
const App = () => {
  const BASE_URL = 'http://127.0.0.1:8000/api/v1'
  const [access_token, setAccess_token] = useState('')
  const [user, setUser] = useState(null)

  let user_data = [
    {
      "email":"sarangkkl2@gmail.com",
      "password":"123456",
      "name":"gaurav",
    },
    {
      "email":"sahgaurav832@gmail.com",
      "password":"123456",
      "name":"sarangkkl",
    }
  ]

  function perform_login(email,password){
    axios.post(`${BASE_URL}/login`,{
      email:email,
      password:password
    }).then((response)=>{
      // console.log(response.data.access_token)
      setAccess_token(response.data.access_token)
      setUser({"email":email,"password":password})
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div>
     
      {user_data.map((item,index)=>{
        return(
          <div key={index} className='my-2'>
            <button className='btn' onClick={()=>{perform_login(item.email,item.password)}}>Login as {item.name}</button>
          </div>
        )
      })}

      {user ? <div>
        <h1>Welcome {user.email}</h1>
      </div> : <h1>Not Logged In</h1>}

      {access_token ? <ShowFriends BASE_URL={BASE_URL} access_token={access_token} user={user}/> : null}
    </div>
  )
}

export default App