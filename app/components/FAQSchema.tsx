export default function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of music does KEY0N produce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KEY0N specializes in custom music for advertising, film scoring, and artists. Services include commercial music for ads, original film scores, custom beats for rappers and singers, sonic branding, and sound design for various media projects."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can KEY0N deliver custom music?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KEY0N is known for fast, efficient music production with premium quality. Turnaround times vary by project scope, but we specialize in quick delivery without compromising on quality. Contact us for specific timeline estimates for your project."
        }
      },
      {
        "@type": "Question",
        "name": "Does KEY0N work with advertising agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, KEY0N regularly collaborates with advertising agencies, brands, and marketing companies to create custom music for commercials, brand campaigns, and sonic branding projects. We understand what engages audiences and create memorable, catchy music that sticks in minds."
        }
      },
      {
        "@type": "Question",
        "name": "Can KEY0N create film scores and soundtracks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! KEY0N composes original film scores, soundtracks for movies, documentaries, short films, and other visual media. We create music that enhances storytelling and emotional impact."
        }
      },
      {
        "@type": "Question",
        "name": "Does KEY0N make custom beats for artists?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, KEY0N creates custom beats and instrumentals for rappers, singers, and recording artists. We produce high-quality, unique beats tailored to each artist's style and vision."
        }
      },
      {
        "@type": "Question",
        "name": "What makes KEY0N's music production unique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KEY0N delivers premium quality music production with fast turnaround times. We excel at understanding market needs, knowing exactly what clients want, creating music that reflects brand identity, and producing engaging, catchy music that resonates with audiences and sticks in their minds."
        }
      },
      {
        "@type": "Question",
        "name": "Does KEY0N work internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, KEY0N is based in Dubai, UAE, and works with clients worldwide. We serve advertising agencies, film production companies, record labels, and independent artists both locally in Dubai/UAE and internationally. Our music production services are available for brands, agencies, filmmakers, and artists globally."
        }
      },
      {
        "@type": "Question",
        "name": "Is KEY0N available for projects in Dubai and the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! KEY0N (Kian Hamed) is based in Dubai, UAE, and actively works with local advertising agencies, production houses, brands, and artists throughout the Emirates. We offer in-person consultations for Dubai-based clients and remote collaboration for international projects."
        }
      },
      {
        "@type": "Question",
        "name": "What types of clients does KEY0N work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KEY0N specializes in working with advertising agencies (our primary focus), film production companies, record labels, and independent artists/rappers. We understand the unique needs of each client type and deliver music that meets industry standards and exceeds expectations."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact KEY0N for a music project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact KEY0N through the contact form on key0n.com or reach out via social media. We typically respond within 48 hours to discuss your project requirements and creative vision."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}