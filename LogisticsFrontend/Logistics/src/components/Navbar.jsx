
import { Link } from 'react-router-dom';
import { CircleUser, Menu, X } from "lucide-react";
import { useState } from 'react';
import NavLink from './NavLink';
import Home from '../pages/Home';
import Offices from '../pages/Offices';
import Services from '../pages/Services';
import Contacts from '../pages/Contacts';
import About from '../pages/About';
import Account from '../pages/Account';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div>
            <nav className=' flex justify-between items-center p-10 md:p-10 bg-[#BDD9D7]'>
                <div>
                    <h1>Logistics</h1>
                </div>

                <NavLink />
                <div className='hidden md:block '>
                    <div className='flex gap-3'>
                        <Link to='/account' className='flex'> 
                        <CircleUser />
                        Account</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar