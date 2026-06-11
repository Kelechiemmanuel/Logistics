import React, { useEffect, useState } from 'react'
import route from '../assets/route.jpg'
import shipping from '../assets/shipping.jpg'
import API from '../api/api'


const TrackShipment = () => {
  const [tracking, setTracking] = useState([])

  useEffect(() => {
    API.get('/track/:trackingId')
    .then((res) => setTracking(res.data))
    .catch((error) => {
      console.log("Error fetching tracking", error);
      
    })
  })
  return (
<section className="relative w-full h-[50%] overflow-hidden bg-transparent p-30">

      {/* 🌍 GLOBE */}
      <div className="absolute inset-0 -z-10 flex justify-between">
        <img src={route} alt="" className=''/>
        <img src={shipping} alt="" className=''/>
      </div>

      {/* 🌫️ GRADIENT OVERLAY (better than flat black) */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />

      {/* ✨ GLOW EFFECT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      {/* 📄 CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Track Your Shipment
        </h1>

        <p className="mt-4 text-base md:text-xl text-gray-300 max-w-xl">
          Best Logistics company in Lagos NigeriaStay Informed, Every Step of the Journey
        </p>

        {/* CTA */}
        <button className="mt-8 px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition">
          Discover More
        </button>

      </div>
    </section>
  )
}

export default TrackShipment