import React from 'react'
import { useNavigate } from 'react-router-dom'
import TrackShipment from '../pages/TrackShipment';
import { Globe, ShoppingCart, Truck, Notebook, Icon } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Ship Now",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/local/shipping",
    Icon: Truck
    
  },
  {
    id: 2,
    title: "Global Shipping",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/global/shipping",
    Icon: Globe
  },
  {
    id: 3,
    title: "Get a Quick Quote",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/personal/shopping",
    Icon: Notebook
  },
  {
    id: 4,
    title: "Personal Shopper",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/ware/housing",
    Icon: ShoppingCart
  },
]

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='pt-25'>
      <TrackShipment />
    <div className='px-5 md:px-20 py-20 bg-[#f3f4f6]'>
      <h1 className='text-center text-[#093856] mb-10 text-2xl md:text-4xl font-semibold'>SEAMLESS DELIVERY SERVICES</h1>
      <div className='grid md:grid-cols-2 gap-2 lg:grid-cols-4 cursor-pointer'>
        {services.map((service, id) => {
          const Icon = service.Icon 
          return (
          <div key={service.id} onClick={() => navigate(service.path)} className='border border-[#093856] p-15 bg-[#ffffff] hover:bg-[#093856] hover:text-[#f0f0f0]'>
            <div className='flex justify-center items-center flex-col text-center gap-5'>
              <Icon size={40}/>
              <h1 className='leading-6 font-medium text-2xl'>{service.title}</h1>
              <p className='leading-5 text-sm'>{service.description}</p>
            </div>
          </div>
          )
      })}
      </div>
    </div>
    </div>
  )
}

export default CustomerDashboard