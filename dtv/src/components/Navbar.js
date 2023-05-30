import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './CSS/Navbar.css'
import fun from '../media/fun.png'
import book from '../media/book.png'
import kid from '../media/kid.png'
import act from '../media/act.png'
import mus from '../media/mus.png'
import gam from '../media/gam.png'
import rom from '../media/rom.png'
import adv from '../media/adv.png'
import hor from '../media/hor.png'
import fac from '../media/fac.png'
import news from '../media/news.png'
import tho from '../media/tho.png'
import oth from '../media/oth.png'
import nat from '../media/nat.png'
import pro from '../media/pro.png'
import spo from '../media/spo.png'
import sci from '../media/sci.png'

export default function Navbar() {
  const location = useLocation()
  const { pathname } = location;

  return (
    <>
      <div className='navbar' >
        <Link  to="/category/education" className={`navbarItem ${pathname === '/category/education' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={book} alt='category' />
          Education
        </Link>
        <Link to="/category/comedy" className={`navbarItem ${pathname === '/category/comedy' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={fun} alt='category' />
          Comedy
        </Link>
        <Link  to="/category/kids" className={`navbarItem ${pathname === '/category/kids' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={kid} alt='category' />
          Kids
        </Link>
        <Link  to="/category/action" className={`navbarItem ${pathname === '/category/action' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={act} alt='category' />
          Action
        </Link>
        <Link to="/category/music" className={`navbarItem ${pathname === '/category/music' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={mus} alt='category' />
          Music
        </Link>
        <Link  to="/category/games" className={`navbarItem ${pathname === '/category/games' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={gam} alt='category' />
          Games
        </Link>
        <Link  to="/category/romance" className={`navbarItem ${pathname === '/category/romance' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={rom} alt='category' />
          Romance
        </Link>
        <Link  to="/category/adventure" className={`navbarItem ${pathname === '/category/adventure' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={adv} alt='category' />
          Adventure
        </Link>
        <Link  to="/category/horror" className={`navbarItem ${pathname === '/category/horror' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={hor} alt='category' />
          Horror
        </Link>
        <Link  to="/category/science" className={`navbarItem ${pathname === '/category/science' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={sci} alt='category' />
          Science
        </Link>
        <Link  to="/category/nature" className={`navbarItem ${pathname === '/category/nature' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={nat} alt='category' />
          Nature
        </Link>
        <Link  to="/category/facts" className={`navbarItem ${pathname === '/category/facts' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={fac} alt='category' />
          Facts
        </Link>
        <Link  to="/category/programming" className={`navbarItem ${pathname === '/category/programming' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={pro} alt='category' />
          Programming
        </Link>
        <Link  to="/category/news" className={`navbarItem ${pathname === '/category/news' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={news} alt='category' />
          News
        </Link>
        <Link  to="/category/sports" className={`navbarItem ${pathname === '/category/sports' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={spo} alt='category' />
          Sports
        </Link>
        <Link to="/category/thoughts" className={`navbarItem ${pathname === '/category/thoughts' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={tho} alt='category' />
          Thoughts
        </Link>
        <Link to="/category/others" className={`navbarItem ${pathname === '/category/others' ? 'navbarItemSelect' : ''}`} >
          <img className='categoryicon' src={oth} alt='category' />
          Others
        </Link>
        <div className={`navbarItem ${pathname === '/category/education' ? 'navbarItemSelect' : ''}`} > Others</div>
      </div>
    </>
  )
}
