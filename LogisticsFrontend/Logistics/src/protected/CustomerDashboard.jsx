import React from 'react'
import { useNavigate } from 'react-router-dom'


const services = [
  {
    id: 1,
    title: "Ship Now",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/local/shipping"
    
  },
  {
    id: 2,
    title: "Ship Now",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/global/shipping"
  },
  {
    id: 3,
    title: "Ship Now",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/personal/shopping"
  },
  {
    id: 4,
    title: "Ship Now",
    description: "Request a pick up, Delivery or Express Drop off",
    path: "/ware/housing"
  },
]

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='px-5 md:px-20 py-20 bg-[#f3f4f6]'>
      <h1 className='text-center mb-10 text-6xl'>SEAMLESS DELIVERY SERVICES</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 cursor-pointer'>
        {services.map((service, id) => (
          <div key={service.id} onClick={() => navigate(service.path)} className='border border-[#b6b6b6] p-15 bg-[#ffffff]'>
            <div className=''>
              <h1 className='leading-6'>{service.title}</h1>
              <p className='leading-10'>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerDashboard