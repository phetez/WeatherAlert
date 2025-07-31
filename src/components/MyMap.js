// src/app/components/MyMap.js
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";


const MyMap = () => { // <--- เปลี่ยนเป็นแบบนี้แทน
  useEffect(() => {
    // โค้ดส่วนนี้จะทำงานเฉพาะบน Client-Side เท่านั้น
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []); // ให้ useEffect ทำงานแค่ครั้งเดียวตอนเมาท์

  return (
    <MapContainer
      center={[13.7563, 100.5018]} // พิกัดกรุงเทพ
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[13.7563, 100.5018]}>
        <Popup>กรุงเทพมหานคร</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap; // <--- ย้ายมา export ตรงนี้