import React from 'react'
import Spinner from './Spinner'
import sad from '../media/sad.gif'
import './CSS/Error.css'
import { useEffect,useContext } from 'react'
import web3context from '../Context/web3context'
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate();
  const context = useContext(web3context)
  const {connection}=context;
  useEffect(() => {
  if(connection){
    navigate('/')
  }
  }, [connection])
  return (
    <div>
      <div className='errorline'> You are not Connected: Please Log In using MetaMask and try again...!!! </div>
      <Spinner message="" src={sad} />
    </div>
  )
}
