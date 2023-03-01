import React from 'react'
import { useNavigate } from 'react-router-dom'
function NotFound() {

    const navigate = useNavigate();
  return (
    <div className='not_found_page'>
        <img src='404.png'></img>
        <button onClick={()=>{navigate('/')}}>Go back to home page</button>
    </div>
  )
}

export default NotFound