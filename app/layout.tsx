import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patrick Jørgensen · Creative Technologist & Musician",
  description: "Creative technologist and musician. From stage to strategy, proven at scale.",
  openGraph: {
    title: "Patrick Jørgensen · Creative Technologist & Musician",
    description: "Creative technologist and musician. From stage to strategy, proven at scale.",
    url: "https://yourdomain.com",
    siteName: "Patrick Jørgensen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Jørgensen · Creative Technologist & Musician",
    description: "Creative technologist and musician. From stage to strategy, proven at scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
