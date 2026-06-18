import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, CircleUser } from 'lucide-react';
import CustomerNav from './CustomerNav';

const AdminNav = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
    <div className='flex justify-between gap-10'>
    <ul className='gap-10 lg:flex hidden'>
    <Link to='/'>Home</Link>
    <Link to='/services'>Services</Link>
    <Link to='/offices'>Offices</Link>
    <Link to='/contacts'>Contacts</Link>
    <Link to='/about'>About</Link>
    </ul>

    <div className='lg:hidden flex'>
        <CustomerNav />
    </div>
    <div className='flex lg:hidden cursor-pointer'>
    <button onClick={() => setOpenMenu(!openMenu)} className='text-[#093856]'>
        {openMenu ? <X size={28}/> : <Menu size={28}/>}
    </button>
    </div>
    {openMenu && (
    <div className='fixed inset-0 bg-black/50 h-[50%] backdrop-blur-sm z-12 md:hidden flex'>
        <div className='flex justify-between items-start p-10 fixed left-0 h-full border border-b-amber-300 bg-[#f0f0f0] top-0 gap-5 overflow-y-auto w-screen z-20 md:hidden"'>
            <ul className=' mt-10'>
                <button onClick={() => setOpenMenu(false)} className='absolute right-5 top-10 cursor-pointer'>
                    <X size={28} />
                </button>
                <div className='flex flex-col gap-10'>
                    <Link to='/' onClick={() => setOpenMenu(false)}>Home</Link>
                    <Link to='/services' onClick={() => setOpenMenu(false)}>Services</Link>
                    <Link to='/offices' onClick={() => setOpenMenu(false)}>Offices</Link>
                    <Link to='/contacts' onClick={() => setOpenMenu(false)}>Contacts</Link>
                    <Link to='/about' onClick={() => setOpenMenu(false)}>About</Link>

                    <div className='bg-[#ff5c00] text-[#093856]' onClick={() => setOpenMenu(false)} >
                        <Link to='/account' className='flex'>
                        <CircleUser />
                        Account
                        </Link>
                    </div>
                </div>
            </ul>
        </div>
    </div>
    )}
    </div>


    )
}

export default AdminNav