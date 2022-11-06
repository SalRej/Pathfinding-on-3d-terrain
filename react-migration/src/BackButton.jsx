import React from 'react'
import {Link} from 'react-router-dom';

function BackButton({url}) {
  return (
    <Link to={url}>
        <button className='go_back_button'>
            <img src='back.png'></img>
            <p>GO BACK</p>
        </button>
    </Link>
  )
}

export default BackButton