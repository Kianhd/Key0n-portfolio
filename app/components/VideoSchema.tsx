export default function VideoSchema() {
  const videoData = [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "KEY0N Music Production Showreel",
      "description": "Professional music production portfolio featuring custom music for advertising, film scores, and artist collaborations by KEY0N (Kian Hamed) - Dubai's premier music producer.",
      "thumbnailUrl": "https://key0n.com/og-image.jpg",
      "uploadDate": "2025-01-17",
      "duration": "PT2M30S",
      "contentUrl": "https://key0n.com/#work",
      "embedUrl": "https://key0n.com/#work",
      "author": {
        "@type": "Person",
        "name": "KEY0N",
        "alternateName": "Kian Hamed"
      },
      "publisher": {
        "@type": "Organization",
        "name": "KEY0N Music Production",
        "logo": {
          "@type": "ImageObject",
          "url": "https://key0n.com/og-image.jpg"
        }
      },
      "potentialAction": {
        "@type": "WatchAction",
        "target": "https://key0n.com/#work"
      }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
    />
  );
}