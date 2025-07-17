export default function SchemaMarkup() {
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "KEY0N",
      "alternateName": ["Keyon", "Kian Hamed", "KEY0N Dubai", "Keyon Dubai", "Kian Hamed Dubai"],
      "jobTitle": "Professional Music Producer",
      "description": "Professional music producer based in Dubai, UAE, specializing in custom music for advertising agencies, film production companies, record labels, and independent artists. Fast, premium quality music production for brands and filmmakers worldwide.",
      "url": "https://key0n.com",
      "image": "https://key0n.com/og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE",
        "addressRegion": "Dubai"
      },
      "sameAs": [
        "https://www.instagram.com/key.0n/",
        "https://www.linkedin.com/in/kianhamed"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "KEY0N Music Production"
      },
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Music Producer",
        "occupationLocation": [
          {
            "@type": "City",
            "name": "Dubai",
            "containedInPlace": {
              "@type": "Country",
              "name": "United Arab Emirates"
            }
          },
          {
            "@type": "Place",
            "name": "Worldwide"
          }
        ],
        "skills": [
          "Music Production",
          "Film Scoring",
          "Commercial Music",
          "Beat Making",
          "Audio Mixing",
          "Audio Mastering",
          "Sonic Branding",
          "Advertising Music",
          "Record Label Production"
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Professional Music Production Services",
      "description": "Custom music production for advertising, film scoring, artists, and brands. Premium quality, fast turnaround, engaging music that sticks in minds.",
      "provider": {
        "@type": "Person",
        "name": "KEY0N"
      },
      "serviceType": "Music Production",
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Music Production Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Music for Advertising",
              "description": "Premium custom music and sonic branding for commercials, ads, and brand campaigns"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Film Scoring",
              "description": "Original film scores and soundtracks for movies, documentaries, and short films"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Beats for Artists",
              "description": "Custom beats and instrumentals for rappers, singers, and recording artists"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sound Design",
              "description": "Professional sound design for media, games, and commercial projects"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "150",
        "bestRating": "5"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "KEY0N Music Production",
      "alternateName": ["KEY0N", "Keyon Music", "Kian Hamed Music", "KEY0N Dubai", "Keyon Dubai"],
      "url": "https://key0n.com",
      "logo": "https://key0n.com/og-image.jpg",
      "description": "Professional music production studio based in Dubai, UAE, specializing in custom music for advertising agencies, film production companies, record labels, and independent artists worldwide.",
      "founder": {
        "@type": "Person",
        "name": "KEY0N",
        "alternateName": "Kian Hamed"
      },
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        }
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Dubai"
        },
        {
          "@type": "Country",
          "name": "United Arab Emirates"
        },
        {
          "@type": "Place",
          "name": "Worldwide"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/key.0n/",
        "https://www.linkedin.com/in/kianhamed"
      ],
      "knowsAbout": [
        "Music Production",
        "Film Scoring",
        "Commercial Music",
        "Beat Making",
        "Hip Hop Production",
        "Audio Engineering",
        "Sonic Branding",
        "Music for Advertising Agencies",
        "Music for Film Production Companies",
        "Music for Record Labels",
        "Music for Independent Artists",
        "Custom Music Composition",
        "Dubai Music Production",
        "UAE Music Industry"
      ]
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}