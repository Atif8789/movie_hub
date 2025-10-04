import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'
function NavBar() {
  return (
    <div className='flex justify-between w-full h-[60px] bg-blue-950'>
        <div className='flex items-center'>
           <img className='w-[60px] mx-6 mt-2' src={logo} alt='movie logo'/>
           <h1 className='text-2xl text-white font-semibold'>Movie Hub</h1>
        </div>
        <div className='flex items-center mr-10 gap-x-8 text-white font-semibold align-middle'>
            <Link to='/'>Movie</Link>
            <Link to='/watch'>Watch List</Link>
            <Link to='/mood'>Mood Selector</Link>
        </div>
    </div>
  )
}

export default NavBar
