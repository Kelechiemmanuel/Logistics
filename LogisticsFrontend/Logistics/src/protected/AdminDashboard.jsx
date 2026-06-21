import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { Import, Sparkle, TrendingDown, TrendingUp, Waves, X } from 'lucide-react';
import DashboardHeader from '../pages/DashboardHeader';
import API from '../api/api';
import ShipmentChart from '../pages/AnalyticsGraph';
import AnalyticsGraph from '../pages/AnalyticsGraph';
import AddDriver from '../pages/AddDriver';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [pop, setPop] = useState(false);
  const [shipment, setShipment] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get('api/admin/shipments')
      .then((res) => {
        // 🔥 SAFE FIX: handle different API shapes
        const data =
          res.data?.shipments ||
          res.data?.data ||
          res.data
        setShipment(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div className='flex py-20 bg-[#f3f4f6] px-20 h-full'>
      <div className='flex min-h-full'>
        <div className='fixed top-0 left-0'>
          <SideBar />
        </div>
        <div className='flex-1 ml-60'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
            <div className='flex justify-between bg-[#1d4ed8] w-full h-full p-8 rounded-2xl relative overflow-hidden'>
              <div className='text-[#ffffff]'>
                <p>On-Time Delivery Rate.</p>
                <h1 className='text-2xl font-bold leading-10'>47.5%</h1>
                <div className='flex items-center gap-1 text-xs leading-15'>
                  <TrendingDown size={20} />
                  <span>-2.1% vs last 7 days</span>
                </div>
              </div>
              <div className='bg-[#3460dc] p-20 rounded-full absolute -right-6 -top-6'>
                <div className='bg-[#5d80e3] p-2 rounded-lg'>
                  <Sparkle fill='white' stroke='white' />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='bg-[#ffffff] w-full h-full p-8 rounded-2xl'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              </div>
              <div className='bg-[#ffffff] w-full h-full p-8 rounded-2xl'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              </div>
            </div>
          </div>
          <div className=' w-full'>
            <AnalyticsGraph />
          </div>
          <div className='flex gap-5 my-10'>
            <div className='bg-[#ffffff] w-[90%] border border-gray-300 rounded-2xl'>
            <div className='flex flex-col justify-between py-10 px-4'>
              <h1 className='leading-20'>Get All Shipment</h1>
              <div className='flex justify-between'>
                <input type="text" placeholder='Search by name or tracking ID' onChange={(e) => setSearch(e.target.value)} className='outline-0 p-2 border border-gray-200 rounded-2xl text-xs' />
              <div className='flex items-center gap-5'>
                <p>{shipment.length}</p>
                <button onClick={() => setPop(true)}>
                  Add Driver
                </button>
              </div>
              </div>
  
            </div>
            <div className=''>
            {shipment
              .filter((ship) => {
                const searchValue = search.toLowerCase();

                const name = (ship?.customer_name ?? "").toLowerCase();
                const tracking = (ship?.tracking_id ?? "").toLowerCase();

                return (
                  name.includes(searchValue) ||
                  tracking.includes(searchValue)
                );
              })
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 8)
              .map((ship, index) => (
                <div key={ship.id || index} className='grid gap-5 grid-cols-8 text-xs p-4  border-t border-t-gray-200'>
                  <h1>{ship.customer_name || "N/A"}</h1>
                  <p>{ship.tracking_id || "N/A"}</p>
                  <p className='line-clamp-2'>{ship.pickup_address || "-"}</p>
                  <p>{ship.status || "Pending"}</p>
                  <p>{ship.service_type || "-"}</p>
                  <p>{ship.vehicle || "-"}</p>
                  <p>
                    {new Date(ship.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p>{ship.distance} kg</p>
                </div>
                
              ))}
          </div>
        </div>
         <div className='w-[20%] h-50 bg-[#ffff] rounded-2xl border border-gray-200'></div>
      </div>
      <div>
   {pop && (
  <div className="fixed inset-0 z-10 flex items-center justify-center">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setPop(false)}
    />
    {/* Modal Content */}
    <div className=" bg-white rounded-2xl p-6 w-[90%] md:w-175 max-h-[90vh] overflow-y-auto">
      
      <AddDriver />

      <button className="absolute top-4 right-5 text-red-500" onClick={() => setPop(false)} ><X /></button>

    </div>

  </div>
)}
      </div>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard
