import React, { useEffect } from 'react'
import '../../styles/Loading.css'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

  const {path}=useParams()
  const navigate=useNavigate();
  useEffect(()=>{
    if(path){
      const timer=setTimeout(()=>{
        navigate(`/${path}`)
      },5000)
      return()=>{clearTimeout(timer);
        
      }
    }
  },[])
  return (
    <div className='loading_parent'>
      <div className='loading'>

      </div>
    </div>
  )
}

export default Loading