import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
// ---------------------------------------------------------------

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gh-profile-viewer.vercel.app'), // Replace with your actual domain
  title: {
    default: "GitHub Profile Viewer | Explore Developer Profiles",
    template: "%s | GitHub Profile Viewer"
  },
  description: "A sleek and modern GitHub profile viewer built with Next.js. Explore user profiles, repositories, language statistics, and developer insights with an intuitive, responsive interface.",
  keywords: [
    "GitHub",
    "profile viewer",
    "developer portfolio",
    "repositories",
    "programming languages",
    "code statistics",
    "developer tools",
    "open source",
    "Next.js",
    "React",
    "TypeScript",
    "Chart.js"
  ],
  authors: [
    {
      name: "Your Name", // Replace with actual author name
      url: "https://github.com/anisafifi" // Replace with actual GitHub profile
    }
  ],
  creator: "Your Name", // Replace with actual creator name
  publisher: "GitHub Profile Viewer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Developer Tools",
  classification: "Web Application",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gh-profile-viewer.vercel.app", // Replace with your actual domain
    title: "GitHub Profile Viewer | Explore Developer Profiles",
    description: "Discover GitHub profiles with detailed statistics, repository insights, and programming language breakdowns. Built with modern web technologies.",
    siteName: "GitHub Profile Viewer",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "GitHub Profile Viewer - Explore Developer Profiles",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Profile Viewer | Explore Developer Profiles",
    description: "Discover GitHub profiles with detailed statistics, repository insights, and programming language breakdowns.",
    creator: "@yourtwitter", // Replace with actual Twitter handle
    images: ["/og-image.png"], // Same as Open Graph image
  },
  verification: {
    google: "your-google-site-verification-code", // Replace with actual code
    yandex: "your-yandex-verification-code", // Replace with actual code
  },
  alternates: {
    canonical: "https://gh-profile-viewer.vercel.app", // Replace with your actual domain
  },
  other: {
    "theme-color": "#000000",
    "color-scheme": "light dark",
    "twitter:domain": "gh-profile-viewer.vercel.app", // Replace with your actual domain
    "twitter:url": "https://gh-profile-viewer.vercel.app", // Replace with your actual domain
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />

        {/* Favicon and icons - you'll need to add these files */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "GitHub Profile Viewer",
              "description": "A modern web application for exploring GitHub user profiles, repositories, and programming language statistics.",
              "url": "https://gh-profile-viewer.vercel.app", // Replace with your actual domain
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "author": {
                "@type": "Person",
                "name": "Your Name", // Replace with actual name
                "url": "https://github.com/anisafifi" // Replace with actual profile
              },
              "publisher": {
                "@type": "Organization",
                "name": "GitHub Profile Viewer"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "GitHub Profile Exploration",
                "Repository Statistics",
                "Programming Language Charts",
                "Responsive Design",
                "Real-time Data"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${barlow.className} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
