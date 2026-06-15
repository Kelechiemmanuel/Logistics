import React, { useEffect, useState } from 'react'
import route from '../assets/route.jpg'
import shipping from '../assets/shipping.jpg'
import API from '../api/api'


const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null)
  const [message, setMessage] = useState("")

  const trackShipments = async () => {
    if (!trackingId) {
      setMessage("Please enter tracking ID");
      return;
    }
    try {
      const res = await API.get(`api/shipments/track/${trackingId}`)
      setShipment(res.data.tracking)
      setMessage(`Shipment found for Tracking ID ${trackingId}`)

    } catch (error) {
      console.log("Tracking error", error);
      setMessage(error.res?.data?.message || "Shipment not found or invalid tracking ID")

    }
  }

  return (
    <section className="relative w-full h-[50%] p-10">
      <div className="absolute inset-0 z-0 bg-black/80"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.3)),
      url(${shipping})
    `,
        }}
      />
      <div className='flex justify-center items-center relative z-10 h-80'>
        <div className='w-full'>
          <p className="text-red-700 font-medium mb-3">
            {message}
          </p>
          <p className='text-[#BDD9D7] font-medium mb-5 md:text-3xl'>Track Shipment</p>
          <div className='flex justify-between items-center outline-0 bg-[#BDD9D7] w-full md:w-[50%] rounded-lg pl-3'>
            <input placeholder="Enter tracking number" value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className='w-full'
            />
            <button onClick={trackShipments} className='bg-[#093856] p-4 rounded-r-lg text-[#BDD9D7]'>Track</button>
          </div>
        </div>
      </div>



      {shipment && (
        <div>
          <p>Vehicle: {shipment.vehicle}</p>
          <p>Service: {shipment.service_type}</p>
          <p>status: {shipment.status}</p>
          <p>Pick up: {shipment.pickup_address}</p>
          <p>Destination: {shipment.destination_address}</p>
          <p>Amount: {shipment.amount}</p>
        </div>
      )}
    </section>
  )
}

export default TrackShipment