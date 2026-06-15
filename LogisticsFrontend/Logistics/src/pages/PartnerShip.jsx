import React from 'react'
import Amazon from '../assets/Amazon.png';
import Dell from '../assets/Dell.png';
import harvard from '../assets/harvard.png';
import Health from '../assets/Health.png';
import Lendingtree from '../assets/Lendingtree.png';

const PartnerShip = () => {
    const slide = [Amazon, Dell, harvard, Health, Lendingtree, Amazon, harvard]
  return (
    <div className='flex flex-col overflow-hidden w-full bg-[#BDD9D7] py-15'>
        <div className='relative'>
            <div className='flex slide-track gap-10'>
                {slide.concat(slide).map((logos, index) => (
                    <div key={index} className='flex gap-10 shrink-0 items-center justify-center'>
                        <img src={logos} alt="logos" className='w-30'/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PartnerShip