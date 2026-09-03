// src/components/SEOStructuredData.jsx
import { useEffect } from "react";

export default function SEOStructuredData() {
  useEffect(() => {
    // 1. Organization & ProfessionalService Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "NxtWeave Solutions",
      "alternateName": "NxtWeave Business Advisors",
      "image": "https://www.nxtweavesolutions.com/logo.png",
      "logo": "https://www.nxtweavesolutions.com/logo.png",
      "url": "https://www.nxtweavesolutions.com",
      "telephone": "+919711565533",
      "email": "info@nxtweavesolutions.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 62",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.6219",
        "longitude": "77.3712"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61577122554991",
        "https://www.instagram.com/nxtweavesolutions/",
        "https://www.linkedin.com/company/nxtweavesolutions/"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "NxtWeave Startup & Corporate Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Private Limited Company Registration",
              "description": "End-to-end MCA company registration in India with PAN, TAN, DIN."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "GST Registration Filing & Compliance",
              "description": "State and Central Goods & Services Tax registration and monthly returns."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trademark Registration & IP Enforcement",
              "description": "Brand protection, logo copyright, and class searches under IP India."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom SaaS & Web Development",
              "description": "High-performance React web applications, portals, and digital transformation."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "ISO 9001:2015 Quality Certification",
              "description": "International standard certification auditing and documentation readiness."
            }
          }
        ]
      }
    };

    // 2. WebSite Schema (For Sitelinks Search Box)
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "NxtWeave Solutions",
      "url": "https://www.nxtweavesolutions.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.nxtweavesolutions.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // 3. FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does Private Limited Company registration take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Private Limited Company registration in India typically takes 10 to 15 working days, depending on government processing times at the Ministry of Corporate Affairs (MCA)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the turnover threshold for GST registration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The turnover threshold for mandatory GST registration is ₹40 Lakhs for businesses supplying goods, and ₹20 Lakhs for service providers (₹10 Lakhs for Special Category States)."
          }
        },
        {
          "@type": "Question",
          "name": "How long does Trademark registration take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A trademark application filed online can be used with a TM symbol within 24 to 48 hours. The complete registration process and receipt of the trademark certificate takes 6 to 12 months."
          }
        }
      ]
    };

    // Create script tags
    const scriptOrg = document.createElement("script");
    scriptOrg.type = "application/ld+json";
    scriptOrg.id = "jsonld-org-schema";
    scriptOrg.innerHTML = JSON.stringify(organizationSchema);

    const scriptWeb = document.createElement("script");
    scriptWeb.type = "application/ld+json";
    scriptWeb.id = "jsonld-web-schema";
    scriptWeb.innerHTML = JSON.stringify(websiteSchema);

    const scriptFaq = document.createElement("script");
    scriptFaq.type = "application/ld+json";
    scriptFaq.id = "jsonld-faq-schema";
    scriptFaq.innerHTML = JSON.stringify(faqSchema);

    // Append to head
    document.head.appendChild(scriptOrg);
    document.head.appendChild(scriptWeb);
    document.head.appendChild(scriptFaq);

    // Cleanup on unmount
    return () => {
      const existingOrg = document.getElementById("jsonld-org-schema");
      const existingWeb = document.getElementById("jsonld-web-schema");
      const existingFaq = document.getElementById("jsonld-faq-schema");
      if (existingOrg) existingOrg.remove();
      if (existingWeb) existingWeb.remove();
      if (existingFaq) existingFaq.remove();
    };
  }, []);

  return null;
}
