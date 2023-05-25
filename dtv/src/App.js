import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import { useContext, useEffect } from 'react';

import Upload from './components/Upload';
import Topbar from './components/Topbar';
import Profile from './components/Profile';
import Video from './components/Video';
import web3context from './Context/web3context';
import Category from './components/Category';
import Notification from './components/Notification';
import Card from './components/Card';

function App() {

  const context = useContext(web3context)
  const {connect } = context

  useEffect(() => {
    connect()
  }, [])

  return (
    <>

      <Topbar />
      <Routes>
        <Route path='/' element={<Card />} />
        <Route path="video/:uri" element={<Video />} />
        <Route path="category/:uri" element={<Category/>}/>
        <Route path='Profile' element={<Profile />} />
        <Route path='Create' element={<Upload />} />
        <Route path='Notification' element={<Notification />} />
      </Routes>
    </>
  );
}

export default App;
