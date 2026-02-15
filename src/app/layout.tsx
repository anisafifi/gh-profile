import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
// ---------------------------------------------------------------

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Github Profile",
  description: "A sleek and modern GitHub profile viewer built with Next.js, React, and Chart.js. Explore user profiles, repositories, and language statistics with an intuitive interface and responsive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${barlow.className} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
        
      </body>
    </html>
  );
}
