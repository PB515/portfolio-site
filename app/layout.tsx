import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Template keeps "Purven Bhavsar" appearing once per page (doc 11 launch gate).
  title: {
    default: "Purven Bhavsar",
    template: "%s · Purven Bhavsar",
  },
  description:
    "Purven Bhavsar — I learn complex systems quickly and turn them into practical, working solutions.",
  // metadataBase: set to the real production URL at launch (canonical/OG depend on it).
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
