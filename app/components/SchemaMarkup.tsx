export default function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "KEY0N",
    "description": "Professional music producer crafting sonic experiences that resonate with audiences worldwide",
    "url": "https://key0n.com",
    "genre": ["Hip-Hop", "Pop", "EDM", "Commercial"],
    "member": {
      "@type": "Person",
      "name": "KEY0N",
      "jobTitle": "Music Producer",
      "description": "Professional music producer with over 100M+ streams"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "150"
    },
    "offers": {
      "@type": "Offer",
      "name": "Music Production Services",
      "description": "Custom beats, mixing, mastering, and commercial production",
      "priceCurrency": "USD",
      "priceRange": "$$",
      "availability": "https://schema.org/InStock"
    },
    "sameAs": [
      "https://www.instagram.com/key.0n/",
      "https://www.linkedin.com/in/kianhamed"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}