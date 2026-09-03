// src/pages/Contact.jsx
import { useEffect } from "react";
import ContactFormSection from "../components/ContactFormSection";

import { useDocumentSEO } from "../hooks/useDocumentSEO";

export default function Contact() {
  useDocumentSEO(
    "Book Free Corporate Consultation & IT Audit",
    "Get in touch with NxtWeave's corporate specialists and tech architects. Submit a query to schedule your free consultation for company registration, tax audits, or custom software.",
    "contact nxtweave solutions, business registration office Noida, book tax audit consult, hire Nextjs developers India, corporate advisory contact phone"
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      
      {/* Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0B1F3A] via-[#0F2E5F] to-[#1D4ED8] text-white">
        <div className="absolute inset-0 dark-dotted-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="nw-badge mb-4 !bg-white/10 !border-white/20 !text-cyan-300">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight mb-6">
            Strategy Consulting Desk
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-medium">
            Connect with NxtWeave's legal, certifications, and digital engineering experts.
          </p>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <ContactFormSection />

    </div>
  );
}