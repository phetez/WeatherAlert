// // 'use client';

// // import dynamic from 'next/dynamic';

// // // Dynamically import the MapWrapper
// // const MapWithNoSSR = dynamic(
// //   () => import('../components/MapWrapper'), 
// //   {
// //     ssr: false,
// //     loading: () => (
// //       <div className="flex h-screen w-screen items-center justify-center">
// //         <p className="text-lg">กำลังโหลดแผนที่...</p>
// //       </div>
// //     ),
// //   }
// // );

// // export default function Home() {
// //   return (
// //     // We use a flexbox layout to ensure the child fills the screen
// //     // เราจะใช้ Flexbox เพื่อให้แน่ใจว่าองค์ประกอบลูกจะขยายเต็มจอ
// //     <main className="h-screen w-screen flex flex-col">
// //       <MapWithNoSSR />
// //     </main>
// //   );
// // }

// 'use client';

// import dynamic from 'next/dynamic';

// // Dynamically import the MapWrapper to prevent SSR issues
// const MapWithNoSSR = dynamic(
//   () => import('../components/MapWrapper'), 
//   {
//     ssr: false, // This is crucial
//     loading: () => (
//       <div className="flex-grow flex items-center justify-center">
//         <p className="text-lg">กำลังโหลดแผนที่...</p>
//       </div>
//     ),
//   }
// );

// export default function Home() {
//   return (
//     // This main tag provides the full-screen, flexbox container
//     <main className="flex-grow flex flex-col">
//       <MapWithNoSSR />
//     </main>
//   );
// }

'use client';

import dynamic from 'next/dynamic';

// Disable SSR for the map
const MapWithNoSSR = dynamic(
  () => import('../components/MapWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg">กำลังโหลดแผนที่...</p>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <MapWithNoSSR />
    </main>
  );
}

