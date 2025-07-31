// import { NextResponse } from 'next/server';

// export async function GET() {
//   const EXTERNAL_API_URL = 'https://file.royalrain.go.th/opendata/radar_data/cappi/api.php?station=omkoi';

//   try {
//     const response = await fetch(EXTERNAL_API_URL, {
//       // เพิ่ม revalidate เพื่อให้ดึงข้อมูลใหม่ ไม่ใช้ cache เก่า
//       next: { revalidate: 600 } // 10 นาที
//     });

//     if (!response.ok) {
//       throw new Error(`External API responded with status: ${response.status}`);
//     }

//     const data = await response.json();
//     return NextResponse.json(data);

//   } catch (error) {
//     console.error('API Route Error:', error);
//     return NextResponse.json(
//       { message: 'Error fetching data from external API', error: error.message },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const EXTERNAL_API_URL = 'https://file.royalrain.go.th/opendata/radar_data/cappi/api.php?station=omkoi';

//   try {
//     const response = await fetch(EXTERNAL_API_URL, {
//       next: { revalidate: 600 } 
//     });

//     // We will get the raw text first to see what it is
//     const rawText = await response.text();
//     console.log('--- Raw Response from Royal Rain API ---');
//     console.log(rawText);
//     console.log('--------------------------------------');

//     // Now, try to parse it as JSON
//     const data = JSON.parse(rawText);
    
//     if (!response.ok) {
//       throw new Error(`External API responded with status: ${response.status}`);
//     }

//     return NextResponse.json(data);

//   } catch (error) {
//     console.error('API Route Error:', error);
//     return NextResponse.json(
//       { message: 'Error fetching data from external API', error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';

// Static bounds for the Omkoi radar station
const OMKOI_BOUNDS = {
  S: 15.419,
  N: 20.221,
  W: 96.015,
  E: 100.725,
};

export async function GET() {
  const EXTERNAL_API_URL = 'https://file.royalrain.go.th/opendata/radar_data/cappi/api.php?station=omkoi';

  try {
    const response = await fetch(EXTERNAL_API_URL, { next: { revalidate: 600 } }); // Revalidate every 10 mins
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const result = await response.json();

    // Check if the data array exists and has items
    if (result && result.data && result.data.length > 0) {
      const latestData = result.data[0]; // The first item is the latest
      
      // Respond with a clean object containing only necessary data
      return NextResponse.json({
        last_image: latestData.url,
        last_update_datetime: latestData.datetime_bangkok,
        bound: OMKOI_BOUNDS, 
      });
    } else {
      throw new Error('ไม่พบข้อมูลภาพใน API');
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการประมวลผลข้อมูล', error: error.message },
      { status: 500 }
    );
  }
}
