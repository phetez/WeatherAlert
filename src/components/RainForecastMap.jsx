'use client';

import { MapContainer, TileLayer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function RainForecastMap({ radarData }) {
  const { imageUrl, bounds } = radarData;

  if (!imageUrl || !bounds) return null;

  return (
    // 💡 ให้ container มีความสูงที่แน่นอน เช่น 100vh
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        bounds={new LatLngBounds(bounds)}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        {/* พื้นหลังแผนที่จาก OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Overlay รูปภาพเรดาร์ */}
        <ImageOverlay
          url={imageUrl}
          bounds={new LatLngBounds(bounds)}
          opacity={0.5}
        />

        {/* ตำแหน่งสถานี */}
        <Marker position={[17.82, 98.37]}>
          <Popup>สถานีเรดาร์อมก๋อย</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
