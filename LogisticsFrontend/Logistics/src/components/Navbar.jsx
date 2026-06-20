
import { Link, useLocation } from 'react-router-dom';
import { CircleUser } from "lucide-react";
import { useState } from 'react';
import NavLink from './NavLink';
import Logo from '../pages/Logo';
import AdminNav from './AdminNav';
import CustomerNav from './CustomerNav';

const Navbar = () => {
const [openMenu, setOpenMenu] = useState(false);
const location = useLocation();
const isLocalShippingDashboard = location.pathname.startsWith("/local/shipping")
const isCustomerDashboard = location.pathname.startsWith("/customer/dashboard")
const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');
const showDashboardNav = isLocalShippingDashboard || isCustomerDashboard;
return (
<>
{!isAdminDashboard && (
    <div className='fixed left-0 top-0 right-0 z-50 bg-[#f0f0f0]'>
<>
    {!showDashboardNav && (
        <nav className=' flex justify-between items-center p-8 md:px-20 px-5 bg-linear-to-b from-[#093856]/80 to-transparent'>
            <div>
                <Logo />
            </div>
            <NavLink />
            <div className='hidden md:block '>
                <div className='flex gap-3 bg-[#ff5c00] p-3 rounded-xl text-[#093856]'>
                <Link to='/account' className='flex'>
                    <CircleUser />
                    Account
                 </Link>
                </div>
            </div>
        </nav>
    )}
</>
<>
    {showDashboardNav &&  (
        <nav className=' flex justify-between items-center p-8 md:px-20 px-5 bg-linear-to-b from-[#093856]/80 to-transparent'>
            <div>
                <Logo />
            </div>
            <div className='flex'>
                <AdminNav />
            </div>
            <div className='hidden lg:flex'>
                <CustomerNav />
            </div>
        </nav>
    )}
</>
</div>
)}
</>

)
}

export default Navbar