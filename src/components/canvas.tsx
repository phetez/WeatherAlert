'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// CanvasOverlay component แสดงภาพเรดาร์บน canvas แล้วเอาไปวางเป็น overlay บนแผนที่
function CanvasOverlay({ imageUrl, bounds }) {
  const map = useMap();
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !map) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      // ตั้งขนาด canvas ให้เท่าภาพ
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // --- ตัวอย่างแก้ไขสี pixel ---
      // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // for (let i = 0; i < imageData.data.length; i += 4) {
      //   // แก้สีตัวอย่าง เช่น ลดความเข้มสีแดง
      //   imageData.data[i] = imageData.data[i] * 0.8; // red channel
      // }
      // ctx.putImageData(imageData, 0, 0);
    };

    // สร้าง overlay จาก canvas
    if (overlayRef.current) {
      map.removeLayer(overlayRef.current);
    }
    overlayRef.current = L.imageOverlay(canvas.toDataURL(), bounds);
    overlayRef.current.addTo(map);

    // ล้างเมื่อ component unmount หรือเปลี่ยน imageUrl/bounds
    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
        overlayRef.current = null;
      }
    };
  }, [imageUrl, bounds, map]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
}

// Map component แสดงแผนที่ Leaflet พร้อม overlay ฝน
function RainForecastMap({ radarData }) {
  const { imageUrl, bounds } = radarData;

  if (!imageUrl || !bounds) return <p>ไม่มีข้อมูลเรดาร์ฝน</p>;

  return (
    <MapContainer
      bounds={new LatLngBounds(bounds)}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <CanvasOverlay imageUrl={imageUrl} bounds={new LatLngBounds(bounds)} />

      <Marker position={[17.82, 98.37]}>
        <Popup>สถานีเรดาร์อมก๋อย</Popup>
      </Marker>
    </MapContainer>
  );
}

// ตัว wrapper โหลดข้อมูล API และแสดงแผนที่
export default function MapWrapper() {
  const [radarData, setRadarData] = useState({ imageUrl: null, bounds: null });
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadarData = async () => {
      setIsLoading(true);
      const API_URL = '/api/radar';
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
        if (result && result.last_image && result.bound) {
          const leafletBounds = [
            [result.bound.S, result.bound.W],
            [result.bound.N, result.bound.E],
          ];
          setRadarData({ imageUrl: result.last_image, bounds: leafletBounds });
          setLastUpdated(result.last_update_datetime || new Date().toLocaleString('th-TH'));
          setError(null);
        } else {
          setError('รูปแบบข้อมูลที่ได้รับจาก API ไม่ถูกต้อง');
          setRadarData({ imageUrl: null, bounds: null });
        }
      } catch (err) {
        setError(err.message);
        setRadarData({ imageUrl: null, bounds: null });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRadarData();
    const interval = setInterval(fetchRadarData, 600000); // รีเฟรชทุก 10 นาที
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex-grow">
      <div className="absolute inset-0 z-0">
        <RainForecastMap radarData={radarData} />
      </div>

      {/* กล่องข้อมูลแสดงสถานะ */}
      <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-90 p-3 rounded shadow max-w-sm">
        <h2 className="text-lg font-bold text-gray-800">Rain Forecast</h2>
        <p className="text-sm text-gray-600">
          {isLoading
            ? 'กำลังโหลดข้อมูล...'
            : error
            ? `เกิดข้อผิดพลาด: ${error}`
            : `สถานีเรดาร์: อมก๋อย (อัพเดตล่าสุด: ${lastUpdated})`}
        </p>
      </div>
    </div>
  );
}
