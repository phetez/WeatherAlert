import './globals.css';

export const metadata = {
  title: 'Rain Forecast App',
  description: 'แผนที่พยากรณ์อากาศ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      {/* We apply h-full and flexbox to the body */}
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
