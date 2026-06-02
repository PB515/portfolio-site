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

// Applies the saved Perspective before paint (no flash). Default = Root.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('perspective');if(t!=='canopy'&&t!=='root')t='root';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','root');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="root"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {children}
      </body>
    </html>
  );
}
