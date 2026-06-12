import React, { useEffect, useState } from 'react'
import route from '../assets/route.jpg'
import shipping from '../assets/shipping.jpg'
import API from '../api/api'


const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null)

  const trackShipments = async () => {
    try {
      const res = await API.get(`api/shipments/track/${trackingId}`)
      setShipment(res.data.tracking)
    } catch (error) {
      console.log("Tracking error", error);

    }
  }

  return (
    <section className="relative w-full h-[50%] overflow-hidden bg-transparent p-30">
      <input placeholder='Enter tracking number'
        onClick={(e) => setTrackingId(e.target.value)}
      />
      <button onClick={trackShipments}>Track</button>

      {shipment && (
        <div>
          <p>status:{shipment.status}</p>
          <p>Pick up: {shipment.pickup_address}</p>
          <p>Destination: {shipment.destination_address}</p>
          <p>Amount: {shipment.amount}</p>
        </div>
      )}
    </section>
  )
}

export default TrackShipment