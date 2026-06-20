import React from 'react'
import Logo from '../pages/Logo'
import DashboardHeader from '../pages/DashboardHeader'

const SideBar = () => {
  return (
    <div className='flex justify-start items-center flex-col w-full h-screen bg-[#ffffff] border-r border-r-gray-200'>
        <div className='border-b border-b-gray-200 pl-5 pr-15 py-10'>
          <Logo />
        </div>
        <div className=''>
            <DashboardHeader />
        </div>
    </div>
  )
}

export default SideBar