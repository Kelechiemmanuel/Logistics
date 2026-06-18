import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../pages/DashboardHeader';
import { Banknote, Bell, ChevronDown, ChevronUp, CircleUser, DoorOpen, LogOut, Receipt, User, X } from "lucide-react";

const CustomerNav = () => {
    const [dropDown, setDropDown] = useState(false);
    return (
        <div>
            <div className=''>
                <div className='flex justify-center items-center gap-3 rounded-xl text-[#093856] relative'>
                    <button> <Bell /></button>
                    <div>
                        <DashboardHeader />
                    </div>


                    <div onClick={() => setDropDown(!dropDown)} className='cursor-pointer flex items-center justify-center gap-5'>
                        <div className='border border-[#093856] rounded-full p-1'>
                            <User fill='#093856' />
                        </div>
                        {dropDown ? <ChevronDown /> : <ChevronUp />}
                    </div>

                    {dropDown && (
                        <div className='absolute bg-[#f0f0f0] top-17 right-2 z-100 p-5 flex flex-col gap-3 border border-[#093856] shadow-2xl'>
                            <Link to='/' onClick={() => setDropDown(false)} className='flex items-center gap-3' >
                                <User />
                                <p>My Profile</p>
                            </Link>
                            <Link to='/services' onClick={() => setDropDown(false)} className='flex items-center gap-3'>
                                <Banknote />
                                <p>Transaction</p>
                            </Link>
                            <Link to='/services' onClick={() => setDropDown(false)} className='flex gap-3 items-center'>
                                <LogOut />
                                <p>Logout</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomerNav