import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import DynamicFavicon from "./components/DynamicFavicon";
import "./globals.css";
import "./fonts/fonts.css";

export const metadata: Metadata = {
  title: "KEY0N | Professional Music Producer | Where Sound Becomes Emotion",
  description:
    "KEY0N is a professional music producer crafting sonic experiences that resonate with audiences worldwide. Creating distinctive soundscapes for global brands and artists with over 100M+ streams.",
  keywords: [
    "music producer",
    "music production",
    "commercial music",
    "beat maker",
    "KEY0N",
    "music production services",
    "mixing",
    "mastering",
    "sonic branding",
    "audio production",
  ],
  authors: [{ name: "KEY0N" }],
  creator: "KEY0N",
  publisher: "KEY0N",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://key0n.com",
    siteName: "KEY0N Music Production",
    title: "KEY0N | Professional Music Producer",
    description:
      "Crafting sonic experiences that resonate with audiences worldwide. Where sound becomes emotion.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KEY0N Music Producer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KEY0N | Professional Music Producer",
    description:
      "Crafting sonic experiences that resonate with audiences worldwide. Where sound becomes emotion.",
    images: ["/og-image.jpg"],
    creator: "@key0n",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        {/* Initial favicon - will be replaced by DynamicFavicon component */}
        <link rel="icon" type="image/png" href="/favicons/favicon-black.png" sizes="32x32" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-black.png" />
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <DynamicFavicon />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
