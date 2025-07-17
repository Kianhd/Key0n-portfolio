export default function LocalBusinessSchema() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://key0n.com/#localbusiness",
    "name": "KEY0N Music Production Dubai",
    "alternateName": ["KEY0N Dubai", "Keyon Dubai", "Kian Hamed Music Production"],
    "description": "Professional music production studio in Dubai, UAE. Specializing in custom music for advertising agencies, film production companies, record labels, and artists. Premium quality music production with fast turnaround.",
    "url": "https://key0n.com",
    "telephone": "+971585127979",
    "email": "contact@key0n.com", // Add your email when ready
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE",
      "postalCode": "00000" // Add your postal code when ready
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2048", // Dubai coordinates
      "longitude": "55.2708"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "AED, USD",
    "areaServed": [
      {
        "@type": "City",
        "name": "Dubai",
        "containedInPlace": {
          "@type": "Country",
          "name": "United Arab Emirates"
        }
      },
      {
        "@type": "Country",
        "name": "United Arab Emirates"
      },
      {
        "@type": "Place",
        "name": "Middle East"
      },
      {
        "@type": "Place",
        "name": "Worldwide"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Music Production Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Advertising Agency Music Production",
          "description": "Custom music and sonic branding for advertising agencies in Dubai and worldwide"
        },
        {
          "@type": "Service",
          "name": "Film Production Company Scoring",
          "description": "Original scores and soundtracks for film production companies"
        },
        {
          "@type": "Service",
          "name": "Record Label Production",
          "description": "Professional music production services for record labels"
        },
        {
          "@type": "Service",
          "name": "Independent Artist Production",
          "description": "Custom beats and full production for independent artists and rappers"
        }
      ]
    },
    "slogan": "Where Sound Becomes Emotion",
    "founder": {
      "@type": "Person",
      "name": "Kian Hamed",
      "alternateName": "KEY0N"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}