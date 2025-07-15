import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

  const token =localStorage.getItem("token")
  const navigate=useNavigate()

  useEffect(()=>{
    axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, // changed from get to post
      {},
      {
         headers: {
                Authorization: `Bearer ${token}` 
            }
      }
    ).then((response)=>{
      if(response.status==200){
        localStorage.removeItem('token')
        navigate('/login')
      }
    }).catch((error)=>{
        localStorage.removeItem('token')
        navigate('/login')
    })
  },[navigate,token])
  return (
    <div>Logout</div>
  )
}

export default Logout