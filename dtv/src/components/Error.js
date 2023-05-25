import React from 'react'
import Spinner from './Spinner'
import sad from '../media/sad.gif'
import './CSS/Error.css'

export default function Error() {
  return (
    <div>
      <div className='errorline'> You are not Connected: Please Log In using MetaMask and relaod page </div>
      <Spinner message="error...!!!" src={sad} />
    </div>
  )
}
