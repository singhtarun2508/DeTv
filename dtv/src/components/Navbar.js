import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/Navbar.css'

export default function Navbar() {
  const url = "http://localhost:3000/category/"

  return (
    <>
      <div className='navbar' >
        <Link onClick={() => { window.location.replace(`${url}education`) }} to="/category/education" className='navbarItem' > Education</Link>
        <Link onClick={() => { window.location.replace(`${url}comedy`) }} to="/category/comedy" className='navbarItem' > Comedy</Link>
        <Link onClick={() => { window.location.replace(`${url}kids`) }} to="/category/kids" className='navbarItem' > Kids</Link>
        <Link onClick={() => { window.location.replace(`${url}action`) }} to="/category/action" className='navbarItem' > Action</Link>
        <Link onClick={() => { window.location.replace(`${url}music`) }} to="/category/music" className='navbarItem' > Music</Link>
        <Link onClick={() => { window.location.replace(`${url}games`) }} to="/category/games" className='navbarItem' > Games</Link>
        <Link onClick={() => { window.location.replace(`${url}romance`) }} to="/category/romance" className='navbarItem' > Romance</Link>
        <Link onClick={() => { window.location.replace(`${url}adventure`) }} to="/category/adventure" className='navbarItem' > Adventure</Link>
        <Link onClick={() => { window.location.replace(`${url}horror`) }} to="/category/horror" className='navbarItem' > Horror</Link>
        <Link onClick={() => { window.location.replace(`${url}science`) }} to="/category/science" className='navbarItem' > Science</Link>
        <Link onClick={() => { window.location.replace(`${url}culture`) }} to="/category/culture" className='navbarItem' > Culture</Link>
        <Link onClick={() => { window.location.replace(`${url}facts`) }} to="/category/facts" className='navbarItem' > Facts</Link>
        <Link onClick={() => { window.location.replace(`${url}programming`) }} to="/category/programming" className='navbarItem' > Programming</Link>
        <Link onClick={() => { window.location.replace(`${url}news`) }} to="/category/news" className='navbarItem' > News</Link>
        <Link onClick={() => { window.location.replace(`${url}sports`) }} to="/category/sports" className='navbarItem' > Sports</Link>
        <Link onClick={() => { window.location.replace(`${url}thoughts`) }} to="/category/thoughts" className='navbarItem' > Thoughts</Link>
        <Link onClick={() => { window.location.replace(`${url}others`) }} to="/category/others" className='navbarItem' > Others</Link>
        <div className='navbarItem' > Others</div>
      </div>
    </>
  )
}
