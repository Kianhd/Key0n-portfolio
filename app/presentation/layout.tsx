import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Music Production Services | Key0n Presentation",
  description: "Experience Key0n's professional music production services through an immersive client presentation. Custom brand music, sonic logos, beats, and film scoring for leading brands.",
  keywords: [
    "music production",
    "brand music",
    "sonic logos",
    "jingles",
    "film scoring",
    "audio branding",
    "custom music",
    "beats",
    "Key0n",
    "professional audio"
  ],
  authors: [{ name: "Kian Hamed (Key0n)" }],
  creator: "Key0n Music Production",
  publisher: "Key0n Music Production",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://key0n.com"),
  alternates: {
    canonical: "/presentation",
  },
  openGraph: {
    title: "Professional Music Production Services | Key0n",
    description: "Transform your brand with custom music production. From sonic logos to full film scores - experience our professional presentation.",
    url: "https://key0n.com/presentation",
    siteName: "Key0n Music Production",
    images: [
      {
        url: "/og/presentation-preview.jpg", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Key0n Music Production Services Presentation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Music Production Services | Key0n",
    description: "Transform your brand with custom music production. Interactive client presentation showcasing our services.",
    images: ["/og/presentation-preview.jpg"],
    creator: "@key0nmusic", // Update with actual Twitter handle
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
    google: "your-google-verification-code", // Add your verification code
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Key0n Music Production Services",
            "description": "Professional music production services including custom brand music, sonic logos, beats, and film scoring for leading brands and artists.",
            "provider": {
              "@type": "Person",
              "name": "Kian Hamed",
              "alternateName": "Key0n",
              "jobTitle": "Music Producer & Composer",
              "url": "https://key0n.com"
            },
            "serviceType": [
              "Music Production",
              "Audio Branding",
              "Sonic Logo Creation",
              "Film Scoring",
              "Custom Music Composition"
            ],
            "areaServed": "Worldwide",
            "availableLanguage": "English",
            "url": "https://key0n.com/presentation",
            "offers": [
              {
                "@type": "Offer",
                "name": "Custom Brand Music",
                "description": "Full-length anthems and musical identities for brands and campaigns"
              },
              {
                "@type": "Offer", 
                "name": "Sonic Logos & Jingles",
                "description": "3-5 second memorable audio signatures for instant brand recognition"
              },
              {
                "@type": "Offer",
                "name": "Ready-to-use Beats & Tracks",
                "description": "Premium pre-made tracks with instant licensing and customization options"
              },
              {
                "@type": "Offer",
                "name": "Music for Film",
                "description": "Cinematic scoring and themes for films with flexible package options"
              }
            ]
          }),
        }}
      />
      {children}
    </>
  );
}