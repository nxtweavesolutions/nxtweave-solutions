// src/components/FAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("registration");
  const [openIdx, setOpenIdx] = useState(null);

  const categories = {
    registration: "Business Registration",
    certifications: "Certifications & Compliance",
    digital: "Digital Services & AI",
    general: "General Billing & Support",
  };

  const faqs = {
    registration: [
      { q: "How long does GST registration take?", a: "GST registration typically takes 3-7 working days after document submission. With NxtWeave, we process your application within 24 hours of receiving complete documents." },
      { q: "What documents are needed for MSME/Udyam registration?", a: "Aadhaar card, PAN card, and basic business details. The registration is completely free and done instantly on the government portal." },
      { q: "Is MSME registration free?", a: "Yes, Udyam (MSME) registration is completely free on the government portal. There are no government fees whatsoever." },
      { q: "What is the difference between LLP and Pvt Ltd?", a: "LLP (Limited Liability Partnership) is suitable for professional service firms with fewer compliance requirements. Pvt Ltd offers better funding prospects and brand credibility." },
    ],
    certifications: [
      { q: "How long does trademark registration take?", a: "Trademark registration takes 18-24 months for complete approval, but you get immediate ™ rights after filing. We help you throughout the process." },
      { q: "What is the cost of ISO certification?", a: "ISO certification cost depends on company size and scope. Contact us for a customized quote after a free assessment." },
      { q: "Is FSSAI license mandatory for food businesses?", a: "Yes, any food business in India requires FSSAI registration or license depending on turnover and nature of business." },
    ],
    digital: [
      { q: "What is included in website development?", a: "We provide complete website development including design, development, content integration, SEO setup, mobile optimization, and 3 months of technical support." },
      { q: "How long does website development take?", a: "A standard business website takes 7-14 working days. E-commerce or custom web applications take 21-45 days depending on complexity." },
      { q: "Do you provide website maintenance?", a: "Yes, we offer monthly maintenance packages including updates, security, backups, and content changes." },
      { q: "How does AI automation help my business?", a: "AI automation eliminates repetitive tasks like lead follow-up, report generation, data entry, and customer support — saving 5-10 hours per week per employee." },
      { q: "What does digital marketing include?", a: "SEO optimization, social media management, Google/Meta ads, content creation, and monthly performance reporting." },
    ],
    general: [
      { q: "Do you serve businesses outside Noida/Delhi?", a: "Yes, we serve clients across all of India — completely online. We've worked with businesses from Mumbai, Bangalore, Chennai, Hyderabad, and across all states." },
      { q: "What is your pricing model?", a: "We offer transparent fixed pricing with no hidden charges. Contact us for a detailed quote specific to your requirements." },
      { q: "How do I get started?", a: "Simply click 'Book Free Consultation' or WhatsApp us at +91 97115 65533. We'll understand your needs and provide a clear roadmap." },
    ],
  };

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setOpenIdx(null);
  };

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden" id="faq">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.03),transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="nw-badge mb-4">FAQ Finder</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Tab Controls (Capsule Slider Style) */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100/80 backdrop-blur-md p-1.5 rounded-full flex flex-wrap gap-1 max-w-full justify-center">
            {Object.keys(categories).map((key) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === key
                    ? "bg-white text-slate-800 shadow-md font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {categories[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs[activeTab].map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white/80 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
                  isOpen ? "border-royal-blue/60 shadow-md shadow-slate-100" : "border-slate-150"
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-bold text-text-slate-primary text-sm flex items-center gap-2.5">
                    <HelpCircle size={16} className="text-royal-blue flex-shrink-0" />
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-50 border border-gray-100 text-text-slate-secondary transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-xs text-text-slate-paragraph font-medium leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
