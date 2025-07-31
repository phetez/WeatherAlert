'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

// This is a very simple map component for testing purposes.
// It has no data fetching or extra UI.
export default function SimpleMap() {
  return (
    // The style prop here is crucial for giving the map a size.
    <MapContainer 
      center={[17.82, 98.37]} // Center on Omkoi
      zoom={8} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}