// export default function Legend() {
//   const legendItems = [
//     { color: 'bg-green-500', label: 'ฝนตก' },
//     { color: 'bg-yellow-400', label: 'ฝนตกปานกลาง' },
//     { color: 'bg-orange-500', label: 'ฝนตกหนัก' },
//     { color: 'bg-pink-500', label: 'ฝนตกหนักมาก' },
//     { color: 'bg-purple-600', label: 'ฝนรุนแรงมาก' },
//   ];

//   return (
//     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-gray-800 bg-opacity-70 text-white p-2 rounded-lg shadow-lg w-11/12 max-w-2xl">
//       <div className="flex justify-between items-center">
//         {legendItems.map((item, index) => (
//           <div key={index} className="text-center flex-1 px-1">
//             <div className={`h-2 ${item.color} rounded-full mb-1`}></div>
//             <span className="text-xs md:text-sm">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function Legend() {
  const levels = [
    { color: '#A0D8EF', label: 'ฝนตกเบา' },
    { color: '#00BFFF', label: 'ฝนตกปานกลาง' },
    { color: '#1E90FF', label: 'ฝนตกหนัก' },
    { color: '#00008B', label: 'ฝนตกหนักมาก' },
  ];

  return (
    <div className="bg-white p-3 rounded-md shadow-md text-sm">
      <strong>ระดับฝน:</strong>
      <ul>
        {levels.map((l, i) => (
          <li key={i} className="flex items-center gap-2 mt-1">
            <span style={{ backgroundColor: l.color }} className="w-4 h-4 inline-block rounded" />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
