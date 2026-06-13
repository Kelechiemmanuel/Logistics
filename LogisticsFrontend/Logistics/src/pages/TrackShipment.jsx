import React, { useEffect, useState } from 'react'
import route from '../assets/route.jpg'
import shipping from '../assets/shipping.jpg'
import API from '../api/api'


const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null)
  const [message, setMessage] = useState("")

  const trackShipments = async () => {
    if(!trackingId){
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
    <section className="relative w-full h-[50%] overflow-hidden bg-transparent p-30">
      {message && (
  <p className="text-blue-600 font-medium mb-3">
    {message}
  </p>
)}
 <input
  placeholder="Enter tracking number"
  value={trackingId}
  onChange={(e) => setTrackingId(e.target.value)}
/>

<button onClick={trackShipments}>Track</button>

{shipment && (
  <div>
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