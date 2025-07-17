import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import DynamicFavicon from "./components/DynamicFavicon";
import FAQSchema from "./components/FAQSchema";
import LocalBusinessSchema from "./components/LocalBusinessSchema";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import VideoSchema from "./components/VideoSchema";
import "./globals.css";
import "./fonts/fonts.css";

export const metadata: Metadata = {
  title: "KEY0N | Commercial Music Producer | Custom Music for TV Commercials & Brand Ads",
  description:
    "KEY0N (Keyon) | Kian Hamed - Professional music producer based in Dubai, UAE, specializing in custom music for commercial ads and TV commercials. Serving advertising agencies worldwide who create campaigns for major brands. Premium quality commercial music production, film scoring, and artists. Fast delivery, memorable music that drives brand engagement.",
  keywords: [
    "commercial music producer",
    "music for commercials",
    "TV commercial music",
    "commercial advertising music",
    "music for commercial ads",
    "commercial music composer",
    "brand commercial music",
    "advertising commercial music",
    "KEY0N",
    "Keyon",
    "key0n",
    "Kian Hamed",
    "Kian Hamed Dubai",
    "KEY0N Dubai",
    "commercial music Dubai",
    "Dubai commercial producer",
    "UAE commercial music",
    "music producer for commercials",
    "custom music for commercials",
    "advertising agencies commercial music",
    "music for advertising agencies",
    "agency commercial music producer",
    "brand music",
    "commercial music for agencies",
    "TV ad music",
    "radio commercial music",
    "digital commercial music",
    "broadcast commercial music",
    "commercial jingles",
    "brand campaign music",
    "advertising music Dubai",
    "commercial music composer Dubai",
    "sonic branding",
    "audio production",
    "music composition",
    "film score producer",
    "film scoring",
    "custom beats",
    "rap beats",
    "hip hop producer",
    "beat maker",
    "mixing and mastering",
    "premium music production",
    "fast music production",
    "catchy music",
    "memorable music",
    "music that sticks",
    "engaging music",
    "professional music producer",
    "music for brands",
    "music for agencies",
    "music for filmmakers",
    "music for artists",
    "international music producer",
    "worldwide music production",
  ],
  authors: [{ name: "KEY0N" }],
  creator: "KEY0N",
  publisher: "KEY0N",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://key0n.com",
    siteName: "KEY0N Music Production",
    title: "KEY0N | Commercial Music Producer | Custom Music for TV Commercials & Brand Ads",
    description:
      "Professional commercial music producer specializing in custom music for TV commercials, brand advertising, film scoring, and artists. Fast, premium quality music production for agencies, brands, and filmmakers worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KEY0N - Professional Music Producer for Ads, Films & Artists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KEY0N | Commercial Music Producer | Custom Music for TV Commercials & Brand Ads",
    description:
      "Professional commercial music producer specializing in custom music for TV commercials, brand advertising, film scoring, and artists. Fast, premium quality music production worldwide.",
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
          src={`https://www.googletagmanager.com/gtag/js?id=G-4WE5LQWCXW`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4WE5LQWCXW');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <DynamicFavicon />
        <FAQSchema />
        <LocalBusinessSchema />
        <BreadcrumbSchema />
        <VideoSchema />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
