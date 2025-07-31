import { MagnifyingGlassIcon, BellIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function MapControls() {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
      </button>
      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        <MapPinIcon className="h-6 w-6 text-gray-700" />
      </button>
      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        <BellIcon className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
}