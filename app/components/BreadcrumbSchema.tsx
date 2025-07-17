export default function BreadcrumbSchema() {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://key0n.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://key0n.com/#about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Work",
        "item": "https://key0n.com/#work"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Services",
        "item": "https://key0n.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": "https://key0n.com/#contact"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}