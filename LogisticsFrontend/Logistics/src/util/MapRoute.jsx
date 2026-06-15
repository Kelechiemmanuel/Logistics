import React from 'react'
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";
function Routing({ pickup, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !pickup || !destination) return;

    const control = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      addWaypoints: false,
      routeWhileDragging: false,
      show: false,
    }).addTo(map);

    return () => map.removeControl(control);
  }, [map, pickup, destination]);

  return null;
}

const MapRoute = () => {
  return (
        <MapContainer
      center={[6.5244, 3.3792]} // Lagos
      zoom={12}
      style={{ height: "300px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
      {destination && <Marker position={[destination.lat, destination.lng]} />}

      <Routing pickup={pickup} destination={destination} />
    </MapContainer>
  )
}

export default MapRoute