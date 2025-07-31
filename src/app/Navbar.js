// components/Navbar.js
export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-white shadow flex items-center justify-between px-6 z-[1001]">
      <div className="text-xl font-bold">🌧️ Rain Forecast</div>
      <div className="text-sm text-gray-500">ระบบพยากรณ์ฝนด้วย OpenStreetMap</div>
    </nav>
  );
}
