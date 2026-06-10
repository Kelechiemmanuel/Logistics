import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className=' flex justify-between items-center p-10'>
            <div>
                <h1>Logistics</h1>
            </div>
            <ul className='flex gap-10'>
                <Link to='/'>Home</Link>
                <Link to='/services'>Services</Link>
                <Link to='/offices'>Offices</Link>
                <Link to='/contacts'>Contacts</Link>
                <Link to='/about'>About</Link>
            </ul>
            <div>
                <Link to='/account'>Account</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar