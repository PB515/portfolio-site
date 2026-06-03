import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://portfolio-site-psi-ruddy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Template keeps "Purven Bhavsar" appearing once per page (doc 11 launch gate).
  title: {
    default: "Purven Bhavsar — Engineer, Automate, Grow",
    template: "%s · Purven Bhavsar",
  },
  description:
    "Purven Bhavsar — I learn complex systems quickly and turn them into practical, working solutions. AI automation, web, and systems thinking.",
  openGraph: {
    type: "website",
    siteName: "Purven Bhavsar",
    url: SITE_URL,
    title: "Purven Bhavsar — Engineer, Automate, Grow",
    description:
      "I learn complex systems quickly and turn them into practical, working solutions.",
    images: ["/og/og-default.png"], // add public/og/og-default.png (1200×630)
  },
  twitter: {
    card: "summary_large_image",
    title: "Purven Bhavsar",
    description:
      "I learn complex systems quickly and turn them into practical, working solutions.",
    images: ["/og/og-default.png"],
  },
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
        <Analytics />
      </body>
    </html>
  );
}
