// src/pages/Home.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const REGISTRATION_SERVICES = [
  { icon: "🏢", title: "Private Limited Company Registration", desc: "Most preferred structure for startups and growing businesses. Provides limited liability and easy fundraising." },
  { icon: "🤝", title: "LLP Registration", desc: "Limited Liability Partnership combining benefits of partnership and company structure." },
  { icon: "👥", title: "Partnership Firm Registration", desc: "Ideal for small businesses run by 2 or more individuals with shared profits." },
  { icon: "🌱", title: "Section 8 Company Registration", desc: "Non-profit entity for charitable and social welfare objectives." },
  { icon: "📋", title: "NGO Darpan Registration", desc: "Mandatory portal registration for NGOs seeking government grants and projects." },
  { icon: "📜", title: "12A Registration", desc: "Tax exemption registration for non-profit organizations under Income Tax Act." },
  { icon: "💰", title: "80G Registration", desc: "Enables donors to claim tax deductions on donations made to your NGO." },
  { icon: "🌍", title: "CSR-1 Registration", desc: "Required for NGOs seeking CSR funding from corporates." },
  { icon: "📄", title: "Trade License", desc: "Mandatory permit to carry out trade or business in a specific area." },
  { icon: "🏪", title: "Shop Act / Gumasta License", desc: "State-level license for retail shops and establishments." },
  { icon: "💎", title: "GeM Registration", desc: "Register on Government e-Marketplace to sell to government buyers." },
];

const CERTIFICATION_SERVICES = [
  { icon: "🧾", title: "GST Registration", desc: "Mandatory for businesses above threshold turnover. Enables smooth B2B transactions." },
  { icon: "🏭", title: "MSME / Udyam Registration", desc: "Unlock government schemes, subsidies and priority sector lending." },
  { icon: "🏅", title: "ISO Certification", desc: "International quality certification enhancing business credibility globally." },
  { icon: "™️", title: "Trademark Registration", desc: "Protect your brand identity and intellectual property legally." },
  { icon: "🍽️", title: "FSSAI License", desc: "Mandatory food safety license for all food businesses in India." },
  { icon: "🌐", title: "IEC Certificate", desc: "Import Export Code required for all import/export businesses." },
  { icon: "🚀", title: "Startup India Registration", desc: "DPIIT recognition for tax benefits, funding access and ease of compliance." },
  { icon: "⚡", title: "ZED Certification", desc: "Zero Defect Zero Effect manufacturing certification by QCI." },
  { icon: "🌾", title: "FCI Certificate", desc: "Food Corporation of India empanelment for food supply chain businesses." },
  { icon: "🔢", title: "DUNS / DRS", desc: "D-U-N-S Number for global business credibility and supply chain access." },
  { icon: "🔧", title: "NSIC Registration", desc: "National Small Industries Corporation registration for procurement benefits." },
];

const DIGITAL_SERVICES = [
  { icon: "💻", title: "Website Development", desc: "Modern, responsive, SEO-optimized websites built for performance and conversion." },
  { icon: "⚙️", title: "Web Application Development", desc: "Custom web apps tailored to your business workflows and processes." },
  { icon: "📊", title: "Business Dashboard", desc: "Real-time analytics dashboards for smart business decision making." },
  { icon: "☁️", title: "SaaS Platform Development", desc: "Scalable cloud-based software platforms for your product or service." },
  { icon: "🎨", title: "UI/UX Design", desc: "User-centric design that converts visitors into loyal customers." },
  { icon: "🌐", title: "Hosting & Domain Setup", desc: "End-to-end hosting setup, domain registration and SSL configuration." },
];

const MARKETING_SERVICES = [
  { icon: "📱", title: "Social Media Marketing", desc: "Strategic social media campaigns that grow your brand and audience." },
  { icon: "💬", title: "WhatsApp Marketing", desc: "Direct customer engagement via targeted WhatsApp broadcast campaigns." },
  { icon: "🖼️", title: "Graphic Designing", desc: "Professional brand identity and marketing collateral design." },
  { icon: "✍️", title: "Content Marketing", desc: "SEO-driven content that positions your business as an industry leader." },
  { icon: "🎬", title: "Video Editing", desc: "Professional video content for social media, ads and presentations." },
  { icon: "📈", title: "Marketing Consultation", desc: "Strategic marketing roadmap tailored to your business goals." },
];

const PROCESS_STEPS = [
  { step: "01", icon: "🎯", title: "Consultation", desc: "Free initial consultation to understand your business needs and goals." },
  { step: "02", icon: "📁", title: "Documentation", desc: "Our experts guide you through required documents and preparation." },
  { step: "03", icon: "⚙️", title: "Processing", desc: "We handle all filings, applications and government interactions." },
  { step: "04", icon: "✅", title: "Delivery", desc: "Certificates, registrations and deliverables handed over with complete support." },
];

const WHY_US = [
  { icon: "👨‍💼", title: "Expert Team", desc: "Qualified professionals with deep regulatory expertise." },
  { icon: "🔄", title: "End-to-End Support", desc: "From registration to ongoing compliance management." },
  { icon: "🔍", title: "Transparent Process", desc: "Clear timelines, updates, no hidden charges." },
  { icon: "💡", title: "Dual Expertise", desc: "Compliance consulting + digital solutions together." },
  { icon: "📈", title: "Growth Focused", desc: "Long-term business growth, not just one-time service." },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 cursor-pointer border border-blue-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#2FA4C7] transition-all duration-300"
    >
      <div className="text-5xl mb-4 transition-transform group-hover:scale-110">{icon}</div>
      <h3 className="font-heading text-[#1E3A5F] font-bold text-base mb-2 leading-snug">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      <div className="mt-3 text-[#2FA4C7] font-semibold text-sm opacity-70 group-hover:opacity-100">
        Learn More →
      </div>
    </div>
  );
}

// ─── Consultation Modal ───────────────────────────────────────────────────────
function Modal({ service, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setForm({ name: "", phone: "", email: "", message: "" });
      setSent(false);
    }
  }, [service]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (service) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [service, onClose]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        name: form.name || "Not Provided",
        phone: form.phone || "Not Provided",
        email: form.email || "Not Provided",
        service: service?.title || "General Inquiry",
        message: form.message || "No message",
      };

      await emailjs.send(
        "service_8mzileq",
        "template_d8xpqpo",
        templateParams,
        "ikS9R1hqeGZXmqe-f"
      );

      await addDoc(collection(db, "queries"), {
        ...form,
        source: "modal",
        service: service?.title || "General Inquiry",
        createdAt: new Date().toISOString(),
      });

      setSent(true);
    } catch (err) {
      console.error("Modal submit error:", err);
      alert("Failed to send request. Please try again.");
    }

    setLoading(false);
  }, [form, service]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-800 text-3xl"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="text-5xl mb-3">{service.icon}</div>
        <h2 className="font-heading text-[#1E3A5F] font-bold text-xl mb-2">{service.title}</h2>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">{service.desc}</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <h4 className="font-heading text-amber-800 font-bold mb-2 text-sm">Important Disclaimer</h4>
          <p className="text-amber-700 text-xs">
            We provide expert guidance and documentation support only. We do not guarantee approvals or funding.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-8 text-green-600 font-bold text-lg px-4">
            ✅ Request for{" "}
            <span className="text-[#1E3A5F] font-extrabold underline">
              {service?.title || "Consultation"}
            </span>{" "}
            sent successfully!<br />
            <span className="text-gray-700 text-base font-normal mt-2 block">
              Our team will contact you within 24 hours with full details and next steps.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h4 className="font-heading text-[#1E3A5F] font-bold text-base">Request Free Consultation</h4>

            <input
              required
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
            />

            <input
              required
              type="tel"
              pattern="[0-9+\\-\\s]{7,15}"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
            />

            <textarea
              placeholder="Your Query / Message (Please describe your requirements in detail)"
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              rows={5}
              className="w-full p-4 rounded-xl border border-gray-200 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-heading font-bold text-white transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
              style={{ background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)" }}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ title, sub }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-heading text-[#1E3A5F] font-extrabold text-3xl md:text-4xl mb-3">{title}</h2>
      {sub && <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">{sub}</p>}
      <div className="w-16 h-1 mx-auto mt-5 rounded-full bg-gradient-to-r from-[#2FA4C7] to-[#4CAF50]" />
    </div>
  );
}

// ─── WHO WE ARE SECTION ────────────────────────────────────────────────────────
function WhoWeAreSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-[#F4F8FB]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block px-4 py-1.5 bg-[#2FA4C7]/10 text-[#2FA4C7] text-sm font-semibold rounded-full mb-6">
            Who We Are
          </span>
          <h2 className="text-4xl font-extrabold text-[#1E3A5F] leading-tight mb-6">
            Your Trusted Partner for <br />
            <span className="text-[#2FA4C7]">
              Business Growth & Compliance
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            NxtWeave Solutions is a modern business consulting and digital solutions
            company dedicated to helping startups, MSMEs, entrepreneurs, NGOs,
            and enterprises establish, grow, and scale successfully.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We provide complete end-to-end support including business registration,
            certifications, compliance consulting, digital infrastructure development,
            and online growth solutions.
          </p>
          {/* Mission + Vision Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
              <h4 className="font-bold text-[#1E3A5F] mb-2">🎯 Our Mission</h4>
              <p className="text-gray-500 text-sm">
                To empower entrepreneurs and businesses with transparent,
                reliable and professional consulting.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
              <h4 className="font-bold text-[#1E3A5F] mb-2">🏆 Our Vision</h4>
              <p className="text-gray-500 text-sm">
                To become a globally trusted consulting and digital solutions
                company helping businesses build strong foundations.
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/about")}
            className="px-8 py-3 rounded-xl font-bold text-white bg-[#1E3A5F] hover:bg-[#16304d] transition"
          >
            More About Us →
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
            alt="Team Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md p-6 rounded-2xl text-white">
            <h3 className="font-bold text-2xl mb-2">
              End-to-End Support
            </h3>
            <p className="text-sm opacity-90">
              From registration to digital scaling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      initials: "RS",
      role: "Startup Founder, Noida",
      text: "NxtWeave completed our Pvt Ltd registration in just 18 days. Extremely professional team!",
    },
    {
      name: "Priya Singh",
      initials: "PS",
      role: "NGO Director, Lucknow",
      text: "Applied for 12A and 80G together. Full support from documents to final approval.",
    },
    {
      name: "Amit Patel",
      initials: "AP",
      role: "E-commerce Owner, Delhi",
      text: "GST and MSME registration saved us time and money. Highly recommended!",
    },
    {
      name: "Sneha Verma",
      initials: "SV",
      role: "Consultant, Kanpur",
      text: "Trademark registration was smooth and fast. Team explained every step clearly.",
    },
    {
      name: "Vikram Yadav",
      initials: "VY",
      role: "Manufacturing Unit, Agra",
      text: "Best service for ISO Certification. Timely follow-ups and updates.",
    },
    {
      name: "James Carter",
      initials: "JC",
      role: "International Business Owner, Dubai, UAE",
      text: "From Dubai, we got our IEC and Trademark registration done remotely with NxtWeave. Seamless process and excellent communication across time zones!",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <SectionTitle 
        title="What Our Clients Say" 
        sub="Trusted by businesses across India and internationally" 
      />
      
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <div 
            key={index}
            className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Blank avatar with initials */}
              <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl border-2 border-[#2FA4C7]/30">
                {t.initials}
              </div>
              <div>
                <h4 className="font-bold text-[#1E3A5F]">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              "{t.text}"
            </p>
            <div className="flex text-yellow-400">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ SECTION ───────────────────────────────────────────────────────────────
function FAQSection() {
  return (
    <section className="py-20 px-6 bg-[#F4F8FB]">
      <SectionTitle 
        title="Frequently Asked Questions" 
        sub="Clear answers to your most common questions" 
      />

      <div className="max-w-4xl mx-auto space-y-4">
        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            How long does Private Limited Company registration take?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Usually 15–25 working days, depending on MCA name approval and document verification. We handle everything to make it as fast as possible.
          </div>
        </details>

        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            What documents are required for 12A and 80G registration for NGOs?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Main documents: MoA/AoA, registration certificate, PAN of NGO, ID proofs of trustees, bank statement, activity report for last 3 years, etc. We provide full checklist after consultation.
          </div>
        </details>

        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            What is the turnover limit for GST registration?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            For goods: ₹40 lakh (₹20 lakh in special category states). For services: ₹20 lakh (₹10 lakh in special category states) annual turnover.
          </div>
        </details>

        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            How long does Trademark registration take?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Normally 12–18 months (including examination and publication), but we expedite the process and handle objections if any.
          </div>
        </details>

        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            Do you provide services to international clients?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Yes, we provide IEC, Trademark, and remote registration services for international clients (such as Dubai, UAE, Singapore). The entire process is fully remote.
          </div>
        </details>

        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            Do you handle ongoing compliance?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Yes, we provide ongoing support for GST returns, annual filings, ROC compliance, TDS, etc. Monthly/quarterly packages are available.
          </div>
        </details>

        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
          <summary className="font-heading font-bold text-[#1E3A5F] text-lg px-6 py-5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
            Is initial consultation free or paid?
            <span className="text-[#2FA4C7] text-2xl transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Initial consultation and requirement discussion are completely free. Charges apply only after quote and detailed plan.
          </div>
        </details>
      </div>
    </section>
  );
}

// ─── BACK TO TOP BUTTON ────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #2FA4C7, #1E3A5F)",
        color: "white",
      }}
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

// ─── Main Home Page ───────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  const [heroForm, setHeroForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [heroSent, setHeroSent] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("registration");

  // Initialize EmailJS once
  useEffect(() => {
    emailjs.init("ikS9R1hqeGZXmqe-f");
  }, []);

  // Load Google Fonts once
  useEffect(() => {
    if (!document.getElementById("nxtweave-fonts")) {
      const link = document.createElement("link");
      link.id = "nxtweave-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Hero form submission (EmailJS + Firebase)
  const handleHeroSubmit = async (e) => {
    e.preventDefault();

    try {
      const templateParams = {
        name: heroForm.name || "Not Provided",
        phone: heroForm.phone || "Not Provided",
        email: heroForm.email || "Not Provided",
        service: heroForm.service || "General Inquiry",
        message: heroForm.message || "No message",
      };

      await emailjs.send(
        "service_8mzileq",
        "template_d8xpqpo",
        templateParams,
        "ikS9R1hqeGZXmqe-f"
      );

      await addDoc(collection(db, "queries"), {
        ...heroForm,
        source: "hero",
        createdAt: new Date().toISOString(),
      });

      setHeroSent(true);
      setHeroForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (err) {
      console.error("Hero submit error:", err);
      alert("Failed to send request. Please try again.");
    }
  };

  const tabServices = {
    registration: REGISTRATION_SERVICES,
    certifications: CERTIFICATION_SERVICES,
    digital: DIGITAL_SERVICES,
    marketing: MARKETING_SERVICES,
  };

  const tabs = [
    { key: "registration", label: "📋 Registration" },
    { key: "certifications", label: "🏅 Certifications" },
    { key: "digital", label: "💻 Digital" },
    { key: "marketing", label: "📱 Marketing" },
  ];

  return (
    <div className="font-sans" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#0D1F33] via-[#1E3A5F] to-[#1a4a73] text-white"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2FA4C7]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Trust Badge */}
          <FadeIn>
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center px-6 py-2.5 rounded-full mb-8 text-sm font-bold tracking-wide bg-white/10 border border-[#2FA4C7]/50 text-[#2FA4C7]">
                #1 Business Solutions Partner
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Headline & Description */}
            <FadeIn>
              <div className="text-center lg:text-left">
                <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white">
                  Complete Business Consulting<br />
                  and Digital Solutions<br />
                  <span className="text-[#2FA4C7]">Platform</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  Business registration, compliance, certifications, and digital growth solutions for startups and enterprises. We help you build, grow, and scale globally.
                </p>

                {/* Stats Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[140px]">
                    <div className="text-3xl font-bold text-[#2FA4C7]">500+</div>
                    <div className="text-sm text-gray-300">Businesses Served</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[140px]">
                    <div className="text-3xl font-bold text-[#2FA4C7]">99%</div>
                    <div className="text-sm text-gray-300">Success Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[140px]">
                    <div className="text-3xl font-bold text-[#2FA4C7]">Global</div>
                    <div className="text-sm text-gray-300">Service Reach</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right - Consultation Form */}
            <FadeIn delay={200}>
              <div className="rounded-2xl p-8 backdrop-blur-xl border border-white/15 shadow-2xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <h3 className="font-heading font-bold text-white text-2xl mb-2 text-center lg:text-left">Get Free Consultation</h3>
                <p className="text-gray-300 mb-6 text-center lg:text-left">
                  Fill the form below and our experts will contact you shortly.
                </p>

                {heroSent ? (
                  <div className="text-center py-10 text-[#4CAF50] font-bold text-lg">
                    Thank you! We'll get in touch soon.
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="space-y-5">
                    <input
                      required
                      placeholder="Full Name"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#2FA4C7]"
                    />

                    <input
                      required
                      type="tel"
                      pattern="[0-9+\\-\\s]{7,15}"
                      placeholder="Phone Number"
                      value={heroForm.phone}
                      onChange={(e) => setHeroForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#2FA4C7]"
                    />

                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={heroForm.email}
                      onChange={(e) => setHeroForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#2FA4C7]"
                    />

                    <select
                      value={heroForm.service}
                      onChange={(e) => setHeroForm((p) => ({ ...p, service: e.target.value }))}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-gray-300 focus:outline-none focus:border-[#2FA4C7]"
                    >
                      <option>Select Service Interest</option>
                      <option>Business Registration</option>
                      <option>Compliance & Certifications</option>
                      <option>Digital Solutions</option>
                      <option>Digital Marketing</option>
                      <option>Government Schemes</option>
                    </select>

                    <textarea
                      placeholder="Your Query / Message (Please describe your requirements in detail)"
                      value={heroForm.message}
                      onChange={(e) => setHeroForm((p) => ({ ...p, message: e.target.value }))}
                      rows={4}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#2FA4C7] resize-y"
                    />

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-heading font-bold text-white text-lg shadow-lg transition hover:scale-[1.02]"
                      style={{ background: "#4CAF50" }}
                    >
                      Book Consultation Now
                    </button>

                    <p className="text-xs text-center text-gray-300 mt-4">
                      By submitting, you agree to our Terms & Privacy Policy.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE SECTION ──────────────────────────────────────────────────────── */}
      <WhoWeAreSection />

      {/* ── SERVICES SECTION ─────────────────────────────────────────────────────── */}
      <section
        id="services-section"
        className="pt-12 pb-24 px-6 bg-[#F4F8FB]"
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionTitle
              title="Our Services"
              sub="Complete end-to-end support for every business need — registration, compliance, digital & growth."
            />
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-200"
                style={activeTab === tab.key
                  ? { background: "#1E3A5F", color: "#fff" }
                  : { background: "#fff", color: "#556B7D", border: "1.5px solid #d0e4f0" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tabServices[activeTab].map((s, i) => (
              <FadeIn key={i} delay={i * 60}>
                <ServiceCard {...s} onClick={() => setSelectedService(s)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVT SCHEMES ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1E3A5F, #1a5a82)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="text-5xl mb-4">🏛️</div>
            <h2 className="font-heading font-extrabold text-white text-3xl mb-4">Government Scheme Guidance</h2>

            <div className="inline-block rounded-xl px-6 py-3 mb-6"
              style={{ background: "rgba(255,165,0,0.18)", border: "1px solid rgba(255,165,0,0.35)" }}>
              <p className="font-bold text-sm mb-1" style={{ color: "#FFD080" }}>⚠️ Important Disclaimer</p>
              <p className="text-xs" style={{ color: "#FFD080" }}>
                We provide consulting and documentation assistance ONLY. We do NOT provide funding.
              </p>
            </div>

            <p className="mb-8 leading-relaxed" style={{ color: "#93B5CC" }}>
              Our experts help identify eligible government schemes, prepare documentation,
              navigate application processes, and ensure compliance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {["Eligibility Assessment", "Documentation Support", "Application Guidance", "Compliance Guidance"].map(item => (
                <div key={item} className="rounded-xl py-3 px-4 text-white font-heading font-semibold text-sm"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  ✓ {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 rounded-xl font-heading font-bold text-white transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4CAF50, #37a847)" }}
            >
              Get Scheme Guidance
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section
        id="process-section"
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <SectionTitle
              title="Our Working Process"
              sub="A streamlined 4-step journey from inquiry to completion."
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)" }}>
                    {step.icon}
                  </div>
                  <div className="font-heading font-black mb-1"
                    style={{ fontSize: "2.5rem", color: "rgba(47,164,199,0.15)", lineHeight: 1 }}>
                    {step.step}
                  </div>
                  <h3 className="font-heading font-extrabold text-[#1E3A5F] text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section
        id="why-us-section"
        className="py-24 px-6"
        style={{ background: "#F4F8FB" }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <SectionTitle
              title="Why Choose NxtWeave?"
              sub="Compliance expertise + digital innovation — all under one roof."
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WHY_US.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white text-center rounded-2xl p-6 border border-blue-100 shadow-sm">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-heading font-bold text-[#1E3A5F] text-sm mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ───────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #0D1F33, #1E3A5F)" }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-black text-white text-3xl md:text-4xl mb-4">
              Ready to Grow Your Business Globally?
            </h2>
            <p className="mb-8" style={{ color: "#93B5CC" }}>
              Join 500+ businesses who trust NxtWeave Solutions. Free consultation, no obligation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3.5 rounded-xl font-heading font-bold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4CAF50, #37a847)" }}
              >
                Get Free Consultation 🚀
              </button>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                className="px-8 py-3.5 rounded-xl font-heading font-bold text-white transition hover:opacity-90 flex items-center gap-2"
                style={{ background: "#25D366" }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Modal */}
      <Modal service={selectedService} onClose={() => setSelectedService(null)} />

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-40 transition hover:scale-110"
        style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
        💬
      </a>

      {/* Back to Top Floating Button */}
      <BackToTop />
    </div>
  );
}

export default Home;