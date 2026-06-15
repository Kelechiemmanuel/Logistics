import { Menu, X, User, CircleUser} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavLink = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div>
            <ul className='gap-10 md:flex hidden'>
                <Link to='/'>Home</Link>
                <Link to='/services'>Services</Link>
                <Link to='/offices'>Offices</Link>
                <Link to='/contacts'>Contacts</Link>
                <Link to='/about'>About</Link>
            </ul>


            <div className='flex md:hidden lg:hidden cursor-pointer'>
                <button onClick={() => setOpenMenu(!openMenu)}>
                    {openMenu ? <X /> : <Menu />}
                </button>
            </div>
            {openMenu && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-12 md:hidden flex'>
                    <div className='flex justify-between items-start p-10 fixed left-0 h-screen bg-white top-0 gap-5 overflow-y-auto w-[60%] z-20 md:hidden"'>
                        <ul className=' mt-10'>
                            <button onClick={() => setOpenMenu(false)} className='absolute right-5 top-5 cursor-pointer'>
                                <X size={28} />
                            </button>
                            <div className='flex flex-col gap-10'>
                                <Link to='/' onClick={() => setOpenMenu(false)}>Home</Link>
                                <Link to='/services' onClick={() => setOpenMenu(false)}>Services</Link>
                                <Link to='/offices' onClick={() => setOpenMenu(false)}>Offices</Link>
                                <Link to='/contacts' onClick={() => setOpenMenu(false)}>Contacts</Link>
                                <Link to='/about' onClick={() => setOpenMenu(false)}>About</Link>

                                <div className='flex gap-2' onClick={() => setOpenMenu(false)}>
                                    <CircleUser />
                                    <Link to='/account'>Account</Link>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            )}
        </div>


    )
}

export default NavLink