import React from 'react'
import Navbar from './Navbar'
import './CSS/Notification.css'

export default function Notification() {
  return (
    <div>
      <Navbar />
      <div className="notification">
        No New Notifications..!!
        <br />
      </div>
    </div>
  )
}
