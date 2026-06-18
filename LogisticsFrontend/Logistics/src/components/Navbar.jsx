
import { Link, useLocation } from 'react-router-dom';
import { CircleUser} from "lucide-react";
import { useState } from 'react';
import NavLink from './NavLink';
import Logo from '../pages/Logo';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const location = useLocation();
    const isLocalShippingDashboard = location.pathname.startsWith("/local/shipping")
    return (
        <div>
            <>
                {!isLocalShippingDashboard && (
                    <nav className=' flex justify-between items-center p-8 md:px-20 px-5 bg-linear-to-b from-[#093856]/80 to-transparent'>
                        <div>
                            <Logo />
                        </div>
                        <NavLink />
                        <div className='hidden md:block '>
                            <div className='flex gap-3 bg-[#ff5c00] p-3 rounded-xl text-[#093856]'>
                                <Link to='/account' className='flex'>
                                    <CircleUser />
                                    Account</Link>
                            </div>
                        </div>
                    </nav>
                )}
            </>
            <nav className=' flex justify-between items-center p-8 md:px-20 px-5 bg-linear-to-b from-[#093856]/80 to-transparent'>
                <div>
                    <Logo />
                </div>
                <NavLink />
                <div className='hidden md:block '>
                    <div className='flex gap-3 bg-[#ff5c00] p-3 rounded-xl text-[#093856]'>
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