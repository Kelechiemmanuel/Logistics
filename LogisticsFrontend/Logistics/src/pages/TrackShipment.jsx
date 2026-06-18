import React, { useEffect, useState } from 'react'
import route from '../assets/route.jpg'
import shipping from '../assets/shipping.jpg'
import API from '../api/api'
import { X } from 'lucide-react'


const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null)
  const [message, setMessage] = useState("")
  const [pop, setPop] = useState(false);

  const trackShipments = async () => {
    if (!trackingId) {
      setMessage("Please enter tracking ID");
      return;
    }
    try {
      const res = await API.get(`api/shipments/track/${trackingId}`)
      setShipment(res.data.tracking)
      setPop(true)
      setMessage(`Shipment found for Tracking ID ${trackingId}`)

    } catch (error) {
      console.log("Tracking error", error);
      setMessage(error.res?.data?.message || "Shipment not found or invalid tracking ID");
      setPop(false)

    }
  }

  return (
    <section className="relative w-full h-[50%] md:p-25 p-10">
      <div className="absolute inset-0 z-0 bg-black/50"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.3)),
      url(${shipping})
    `,
        }}
      />
      <div className='flex justify-center items-center relative z-10 h-80'>
        <div className='w-full'>
          <p className='text-[#BDD9D7] font-medium mb-5 md:text-3xl'>Track Shipment</p>
          <div className='flex justify-between items-center outline-0 bg-[#f0f0f0] w-full md:w-[50%] rounded-lg pl-3 p-2'>
            <input placeholder="Enter tracking number" value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className='w-full outline-0'
            />
            <button onClick={trackShipments} className='bg-[#ff5c00] p-3 px-7 text-[#093856] cursor-pointer transition rounded-lg'>Track</button>
          </div>

<>
    <section className="relative">
      {/* Entire page content */}

      <div className="relative z-10">
        {/* Background cards */}
      </div>

    </section>

    {/* POPUP OUTSIDE SECTION */}
    {pop && shipment && (
      <div className="fixed inset-0 z-99999">

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setPop(false)}
        />

        {/* Modal */}
        <div className="absolute inset-0 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[90%] md:w-125 relative">

            <button
              className="absolute right-4 top-2"
              onClick={() => setPop(false)}
            >
              <X />
            </button>

            <div className='flex justify-between my-4'>
            <h2 className="text-xl font-bold mb-4">
              {trackingId}
            </h2>
            <button className=' px-7 bg-[#ff5c00] rounded-full text-sm'>
              {shipment.status}
            </button>
            </div>


            <p>Vehicle: {shipment.vehicle}</p>
            <p>Service: {shipment.service_type}</p>
            <p>Status: {shipment.status}</p>
            <p>Pick up: {shipment.pickup_address}</p>
            <p>Destination: {shipment.destination_address}</p>
            <p>Amount: {shipment.amount}</p>

          </div>

        </div>

      </div>
    )}
  </>

        </div>
      </div>



      {/* {shipment && (
        <div className='text-white'>
          <p>Vehicle: {shipment.vehicle}</p>
          <p>Service: {shipment.service_type}</p>
          <p>status: {shipment.status}</p>
          <p>Pick up: {shipment.pickup_address}</p>
          <p>Destination: {shipment.destination_address}</p>
          <p>Amount: {shipment.amount}</p>
        </div>
      )} */}
    </section>
  )
}

export default TrackShipment