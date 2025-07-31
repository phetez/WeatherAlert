'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Legend from './Legend';
import MapControls from './MapControls';

// โหลดแผนที่แบบ dynamic เพื่อไม่ให้ render ฝั่ง server
const RainForecastMap = dynamic(() => import('./RainForecastMap'), { ssr: false });

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

        if (!response.ok) throw new Error(result.message || 'Error fetching data');
        if (result && result.last_image && result.bound) {
          const leafletBounds = [
            [result.bound.S, result.bound.W],
            [result.bound.N, result.bound.E]
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
    const interval = setInterval(fetchRadarData, 600000); // 10 นาที
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-grow relative">
      <div className="absolute inset-0">
        <RainForecastMap radarData={radarData} />
      </div>

      {/* กล่องข้อมูล */}
      <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-80 p-2 rounded-lg shadow-md max-w-sm">
        <h2 className="text-lg font-bold text-gray-800">Rain Forecast</h2>
        <p className="text-sm text-gray-600">
          {isLoading
            ? 'กำลังโหลดข้อมูล...'
            : error
              ? `ผิดพลาด: ${error}`
              : `สถานีเรดาร์: อมก๋อย (ล่าสุด: ${lastUpdated})`}
        </p>
      </div>

      <MapControls />
      <Legend />
    </div>
  );
} 
