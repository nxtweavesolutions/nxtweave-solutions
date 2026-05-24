// src/pages/Home.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, visible] = useVisible();
  const transforms = {
    up: "translateY(36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
    scale: "scale(0.93)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const REGISTRATION_SERVICES = [
  { icon: "🏢", title: "Private Limited Company Registration", desc: "Most preferred structure for startups and growing businesses. Provides limited liability and easy fundraising.", benefits: ["Separate Legal Entity", "Limited Liability Protection", "Easy Funding & Investment", "Perpetual Existence"] },
  { icon: "🤝", title: "LLP Registration", desc: "Limited Liability Partnership combining benefits of partnership and company structure.", benefits: ["Limited Liability", "Lower Compliance Burden", "Tax Benefits", "Flexible Management"] },
  { icon: "👥", title: "Partnership Firm Registration", desc: "Ideal for small businesses run by 2 or more individuals with shared profits.", benefits: ["Easy to Form", "Minimal Compliance", "Shared Responsibility", "Simple Taxation"] },
  { icon: "🌱", title: "Section 8 Company Registration", desc: "Non-profit entity for charitable and social welfare objectives.", benefits: ["Non-profit Status", "Tax Exemptions", "High Credibility", "Government Recognition"] },
  { icon: "📋", title: "NGO Darpan Registration", desc: "Mandatory portal registration for NGOs seeking government grants and projects.", benefits: ["Government Grant Access", "Unique ID Allotment", "NITI Aayog Recognition", "Funding Eligibility"] },
  { icon: "📜", title: "12A Registration", desc: "Tax exemption registration for non-profit organizations under Income Tax Act.", benefits: ["Income Tax Exemption", "Donor Confidence", "Government Scheme Access", "Audit Compliance"] },
  { icon: "💰", title: "80G Registration", desc: "Enables donors to claim tax deductions on donations made to your NGO.", benefits: ["Donor Tax Deduction", "Increased Donations", "Trust & Credibility", "Legal Recognition"] },
  { icon: "🌍", title: "CSR-1 Registration", desc: "Required for NGOs seeking CSR funding from corporates.", benefits: ["CSR Fund Access", "Corporate Tie-ups", "MCA Recognition", "Increased Funding"] },
  { icon: "📄", title: "Trade License", desc: "Mandatory permit to carry out trade or business in a specific area.", benefits: ["Legal Authorization", "Business Legitimacy", "Avoid Penalties", "Renewal Support"] },
  { icon: "🏪", title: "Shop Act / Gumasta License", desc: "State-level license for retail shops and establishments.", benefits: ["State Compliance", "Employee Benefits", "Bank Account Opening", "Legal Operation"] },
  { icon: "💎", title: "GeM Registration", desc: "Register on Government e-Marketplace to sell to government buyers.", benefits: ["Government Orders", "Pan India Market", "Transparent Process", "Direct Payment"] },
];

const CERTIFICATION_SERVICES = [
  { icon: "🧾", title: "GST Registration", desc: "Mandatory for businesses above threshold turnover. Enables smooth B2B transactions.", benefits: ["Legal Recognition", "Input Tax Credit", "Inter-state Sales", "e-Commerce Ready"] },
  { icon: "🏭", title: "MSME / Udyam Registration", desc: "Unlock government schemes, subsidies and priority sector lending.", benefits: ["Collateral-free Loans", "Subsidy on Patent", "Govt Tender Benefits", "Payment Protection"] },
  { icon: "🏅", title: "ISO Certification", desc: "International quality certification enhancing business credibility globally.", benefits: ["Global Recognition", "Tender Eligibility", "Process Improvement", "Client Trust"] },
  { icon: "™️", title: "Trademark Registration", desc: "Protect your brand identity and intellectual property legally.", benefits: ["Brand Protection", "Legal Rights", "Asset Creation", "Anti-Infringement"] },
  { icon: "🍽️", title: "FSSAI License", desc: "Mandatory food safety license for all food businesses in India.", benefits: ["Legal Compliance", "Consumer Trust", "Business Expansion", "Brand Credibility"] },
  { icon: "🌐", title: "IEC Certificate", desc: "Import Export Code required for all import/export businesses.", benefits: ["Import/Export Legal", "Global Trade Access", "Bank Support", "Lifetime Validity"] },
  { icon: "🚀", title: "Startup India Registration", desc: "DPIIT recognition for tax benefits, funding access and ease of compliance.", benefits: ["Tax Exemption", "Easy Winding Up", "Self Certification", "Funding Access"] },
  { icon: "⚡", title: "ZED Certification", desc: "Zero Defect Zero Effect manufacturing certification by QCI.", benefits: ["Quality Recognition", "Export Benefits", "Govt Support", "Market Access"] },
  { icon: "🌾", title: "FCI Certificate", desc: "Food Corporation of India empanelment for food supply chain businesses.", benefits: ["Govt Supply Chain", "Stable Revenue", "Pan India Access", "Credibility"] },
  { icon: "🔢", title: "DUNS / DRS", desc: "D-U-N-S Number for global business credibility and supply chain access.", benefits: ["Global Credibility", "Supply Chain Access", "International Trade", "Risk Assessment"] },
  { icon: "🔧", title: "NSIC Registration", desc: "National Small Industries Corporation registration for procurement benefits.", benefits: ["Procurement Benefits", "Tender Support", "Bank Guarantee Waiver", "Govt Recognition"] },
];

const DIGITAL_SERVICES = [
  { icon: "💻", title: "Website Development", desc: "Modern, responsive, SEO-optimized websites built for performance and conversion.", benefits: ["Responsive Design", "SEO Friendly", "CMS Integration", "Fast Loading"] },
  { icon: "⚙️", title: "Web Application Development", desc: "Custom web apps tailored to your business workflows and processes.", benefits: ["React/Next.js", "Secure Backend", "API Integration", "Scalable Architecture"] },
  { icon: "📊", title: "Business Dashboard", desc: "Real-time analytics dashboards for smart business decision making.", benefits: ["Live Data", "Custom Reports", "Role-based Access", "Mobile Ready"] },
  { icon: "☁️", title: "SaaS Platform Development", desc: "Scalable cloud-based software platforms for your product or service.", benefits: ["Multi-tenancy", "Subscription Billing", "Cloud Native", "Auto Scaling"] },
  { icon: "🎨", title: "UI/UX Design", desc: "User-centric design that converts visitors into loyal customers.", benefits: ["User Research", "Wireframing", "Prototyping", "Conversion Focused"] },
  { icon: "🌐", title: "Hosting & Domain Setup", desc: "End-to-end hosting setup, domain registration and SSL configuration.", benefits: ["SSL Certificate", "99.9% Uptime", "Daily Backups", "24/7 Support"] },
];

const MARKETING_SERVICES = [
  { icon: "📱", title: "Social Media Marketing", desc: "Strategic social media campaigns that grow your brand and audience.", benefits: ["Instagram & Facebook", "LinkedIn Growth", "Engagement Strategy", "Analytics Report"] },
  { icon: "💬", title: "WhatsApp Marketing", desc: "Direct customer engagement via targeted WhatsApp broadcast campaigns.", benefits: ["Bulk Messaging", "Personalized Reach", "High Open Rate", "Lead Generation"] },
  { icon: "🖼️", title: "Graphic Designing", desc: "Professional brand identity and marketing collateral design.", benefits: ["Brand Identity", "Social Media Posts", "Print Design", "Infographics"] },
  { icon: "✍️", title: "Content Marketing", desc: "SEO-driven content that positions your business as an industry leader.", benefits: ["Blog Writing", "SEO Optimization", "Keyword Research", "Traffic Growth"] },
  { icon: "🎬", title: "Video Editing", desc: "Professional video content for social media, ads and presentations.", benefits: ["Reels & Shorts", "Corporate Videos", "Ad Films", "Motion Graphics"] },
  { icon: "📈", title: "Marketing Consultation", desc: "Strategic marketing roadmap tailored to your business goals.", benefits: ["ROI Planning", "Channel Strategy", "Budget Optimization", "Growth Roadmap"] },
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

const TESTIMONIALS = [
  { name: "Rahul Sharma", initials: "RS", role: "Startup Founder, Noida", text: "NxtWeave completed our Pvt Ltd registration in just 18 days. Extremely professional team!" },
  { name: "Priya Singh", initials: "PS", role: "NGO Director, Lucknow", text: "Applied for 12A and 80G together. Full support from documents to final approval." },
  { name: "Amit Patel", initials: "AP", role: "E-commerce Owner, Delhi", text: "GST and MSME registration saved us time and money. Highly recommended!" },
  { name: "Sneha Verma", initials: "SV", role: "Consultant, Kanpur", text: "Trademark registration was smooth and fast. Team explained every step clearly." },
  { name: "Vikram Yadav", initials: "VY", role: "Manufacturing Unit, Agra", text: "Best service for ISO Certification. Timely follow-ups and updates." },
  { name: "James Carter", initials: "JC", role: "International Business Owner, Dubai, UAE", text: "From Dubai, we got our IEC and Trademark registration done remotely with NxtWeave. Seamless process and excellent communication across time zones!" },
];

const FAQS = [
  { q: "How long does Private Limited Company registration take?", a: "Usually 15–25 working days, depending on MCA name approval and document verification. We handle everything to make it as fast as possible." },
  { q: "What documents are required for 12A and 80G registration for NGOs?", a: "Main documents: MoA/AoA, registration certificate, PAN of NGO, ID proofs of trustees, bank statement, activity report for last 3 years, etc. We provide full checklist after consultation." },
  { q: "What is the turnover limit for GST registration?", a: "For goods: ₹40 lakh (₹20 lakh in special category states). For services: ₹20 lakh (₹10 lakh in special category states) annual turnover." },
  { q: "How long does Trademark registration take?", a: "Normally 12–18 months (including examination and publication), but we expedite the process and handle objections if any." },
  { q: "Do you provide services to international clients?", a: "Yes, we provide IEC, Trademark, and remote registration services for international clients (such as Dubai, UAE, Singapore). The entire process is fully remote." },
  { q: "Do you handle ongoing compliance?", a: "Yes, we provide ongoing support for GST returns, annual filings, ROC compliance, TDS, etc. Monthly/quarterly packages are available." },
  { q: "Is initial consultation free or paid?", a: "Initial consultation and requirement discussion are completely free. Charges apply only after quote and detailed plan." },
];

// ─── Popup Contact Form ───────────────────────────────────────────────────────
function PopupForm({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_8mzileq",
        "template_d8xpqpo",
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service || "General Inquiry",
          message: form.message || "No message",
        },
        "ikS9R1hqeGZXmqe-f"
      );
      await addDoc(collection(db, "queries"), {
        ...form,
        source: "popup",
        createdAt: new Date().toISOString(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(13,31,51,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "popupFadeIn 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes popupFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes popupSlideIn { from { opacity:0; transform:scale(0.92) translateY(24px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes shimmerGold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "880px",
          maxHeight: "92vh",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 32px 80px rgba(13,31,51,0.35)",
          animation: "popupSlideIn 0.45s cubic-bezier(0.16,1,0.3,1)",
          position: "relative",
        }}
        className="popup-inner"
      >
        <style>{`
          @media (max-width: 640px) {
            .popup-inner { grid-template-columns: 1fr !important; }
            .popup-left { display: none !important; }
          }
        `}</style>

        {/* LEFT — Visual Panel */}
        <div
          className="popup-left"
          style={{
            background: "linear-gradient(150deg, #0D1F33 0%, #1E3A5F 60%, #1a4a73 100%)",
            borderRadius: "24px 0 0 24px",
            padding: "44px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative orbs */}
          <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(47,164,199,0.12)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-30px", left:"-30px", width:"140px", height:"140px", borderRadius:"50%", background:"rgba(76,175,80,0.1)", pointerEvents:"none" }} />

          <div>
            <div style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #C8A96E, #E8C87E, #C8A96E)",
              backgroundSize: "200% auto",
              animation: "shimmerGold 3s linear infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}>NxtWeave Solutions</div>
            <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.25, marginBottom: "16px", fontFamily: "'Montserrat', sans-serif" }}>
              Let's Build Your Business Together
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "32px" }}>
              Talk to our experts for free — we'll guide you on the best path forward for your business, with zero obligation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "✓", text: "500+ Businesses Served Successfully" },
                { icon: "✓", text: "Pan India & Global Service Reach" },
                { icon: "✓", text: "Zero Hidden Charges, Full Transparency" },
                { icon: "✓", text: "Expert Team — 24hr Response Time" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(76,175,80,0.2)", border: "1px solid rgba(76,175,80,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4CAF50", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", marginTop: "24px" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginBottom: "8px" }}>Connect with us</p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { label: "WhatsApp", href: "https://wa.me/919711565533", color: "#25D366" },
                { label: "Instagram", href: "https://www.instagram.com/nxtweavesolutions/", color: "#E1306C" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/nxtweavesolutions/", color: "#0A66C2" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ padding: "6px 12px", borderRadius: "8px", background: `${s.color}20`, border: `1px solid ${s.color}40`, color: s.color, fontSize: "0.72rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ padding: "40px 36px", position: "relative" }}>
          <button
            onClick={onClose}
            style={{ position: "absolute", top: "16px", right: "20px", background: "rgba(0,0,0,0.06)", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "18px", color: "#556B7D", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, transition: "all 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.12)"}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.06)"}
            aria-label="Close"
          >
            &times;
          </button>

          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", paddingTop: "40px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #4CAF50, #2E7D32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "20px", boxShadow: "0 8px 24px rgba(76,175,80,0.35)" }}>
                ✓
              </div>
              <h3 style={{ color: "#1E3A5F", fontWeight: 800, fontSize: "1.3rem", marginBottom: "10px", fontFamily: "'Montserrat', sans-serif" }}>Request Sent Successfully!</h3>
              <p style={{ color: "#556B7D", fontSize: "0.88rem", lineHeight: 1.7 }}>Our team will contact you within 24 hours with full details and next steps.</p>
              <button onClick={onClose} style={{ marginTop: "24px", padding: "10px 28px", borderRadius: "10px", background: "#1E3A5F", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem" }}>Close</button>
            </div>
          ) : (
            <>
              <h3 style={{ color: "#1E3A5F", fontWeight: 800, fontSize: "1.3rem", marginBottom: "6px", fontFamily: "'Montserrat', sans-serif" }}>Get Free Consultation</h3>
              <p style={{ color: "#556B7D", fontSize: "0.82rem", marginBottom: "24px" }}>Fill the form and our expert will call you back.</p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input
                  required
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1.5px solid #e0e9f2", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", transition: "border 0.2s", color: "#1E3A5F" }}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e9f2"}
                />
                <input
                  required
                  type="tel"
                  pattern="[0-9+\-\s]{7,15}"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1.5px solid #e0e9f2", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", transition: "border 0.2s", color: "#1E3A5F" }}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e9f2"}
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1.5px solid #e0e9f2", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", transition: "border 0.2s", color: "#1E3A5F" }}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e9f2"}
                />
                <select
                  value={form.service}
                  onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1.5px solid #e0e9f2", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", color: form.service ? "#1E3A5F" : "#8FA3B4", background: "#fff", cursor: "pointer" }}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e9f2"}
                >
                  <option value="">Select Service Interest</option>
                  <option>Business Registration</option>
                  <option>Compliance & Certifications</option>
                  <option>Digital Solutions</option>
                  <option>Digital Marketing</option>
                  <option>Government Schemes</option>
                </select>
                <textarea
                  placeholder="Your Query / Message"
                  value={form.message}
                  onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  rows={3}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "1.5px solid #e0e9f2", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", resize: "vertical", transition: "border 0.2s", color: "#1E3A5F" }}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e9f2"}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "12px",
                    background: loading ? "#93B5CC" : "linear-gradient(135deg, #1E3A5F, #2FA4C7)",
                    color: "#fff", border: "none", fontWeight: 700, fontSize: "0.95rem",
                    fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s", letterSpacing: "0.3px",
                  }}
                  onMouseOver={(e) => { if (!loading) e.currentTarget.style.opacity = "0.92"; }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  {loading ? "Sending..." : "Book Free Consultation"}
                </button>
                <p style={{ color: "#93B5CC", fontSize: "0.72rem", textAlign: "center" }}>
                  By submitting, you agree to our Terms &amp; Privacy Policy.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Popup Controller ─────────────────────────────────────────────────────────
function usePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef(null);

  const schedulePopup = useCallback((delay) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowPopup(true), delay);
  }, []);

  useEffect(() => {
    schedulePopup(10000); // Show after 10 seconds
    return () => clearTimeout(timerRef.current);
  }, [schedulePopup]);

  const handleClose = useCallback(() => {
    setShowPopup(false);
    schedulePopup(47000); // Show again after 47 seconds
  }, [schedulePopup]);

  return [showPopup, handleClose];
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 cursor-pointer border border-blue-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#2FA4C7] transition-all duration-300"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          width: "52px", height: "52px", borderRadius: "14px",
          background: "linear-gradient(135deg, #F4F8FB, #e8f4fb)",
          border: "1px solid #d0e8f5",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "26px", marginBottom: "16px", flexShrink: 0,
          transition: "all 0.3s",
        }}
        className="group-hover:scale-110 group-hover:shadow-md"
      >
        {icon}
      </div>
      <h3 className="font-heading text-[#1E3A5F] font-bold text-sm mb-2 leading-snug">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed flex-1">{desc}</p>
      <div className="mt-4 text-[#2FA4C7] font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
        View Details <span style={{ transition: "transform 0.2s" }} className="group-hover:translate-x-1 inline-block">→</span>
      </div>
    </div>
  );
}

// ─── Service Modal ────────────────────────────────────────────────────────────
function Modal({ service, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) { setForm({ name: "", phone: "", email: "", message: "" }); setSent(false); }
  }, [service]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (service) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [service, onClose]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send("service_8mzileq", "template_d8xpqpo", {
        name: form.name, phone: form.phone, email: form.email,
        service: service?.title || "General Inquiry", message: form.message || "No message",
      }, "ikS9R1hqeGZXmqe-f");
      await addDoc(collection(db, "queries"), {
        ...form, source: "modal", service: service?.title || "General Inquiry",
        createdAt: new Date().toISOString(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send request. Please try again.");
    }
    setLoading(false);
  }, [form, service]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      style={{ animation: "popupFadeIn 0.3s ease" }}
    >
      <style>{`@keyframes popupFadeIn { from { opacity:0; } to { opacity:1; } } @keyframes modalSlide { from { opacity:0; transform:translateY(24px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalSlide 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Modal Header */}
        <div style={{ background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)", padding: "28px 32px", borderRadius: "16px 16px 0 0", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "16px", background: "rgba(255,255,255,0.15)", border: "none", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontSize: "18px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>&times;</button>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "12px" }}>{service.icon}</div>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.3, fontFamily: "'Montserrat', sans-serif" }}>{service.title}</h2>
        </div>

        <div style={{ padding: "28px 32px" }}>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">{service.desc}</p>

          {/* Benefits */}
          {service.benefits && (
            <div style={{ background: "#F4F8FB", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
              <h4 style={{ color: "#1E3A5F", fontWeight: 700, fontSize: "0.82rem", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Key Benefits</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {service.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(47,164,199,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2FA4C7", fontSize: "10px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: "#556B7D", fontSize: "0.78rem" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <h4 className="font-heading text-amber-800 font-bold mb-1 text-xs uppercase tracking-wide">Important Disclaimer</h4>
            <p className="text-amber-700 text-xs">We provide expert guidance and documentation support only. We do not guarantee approvals or funding.</p>
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg,#4CAF50,#2E7D32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 16px", color: "#fff" }}>✓</div>
              <p className="text-green-700 font-bold text-base mb-2">Request sent successfully!</p>
              <p className="text-gray-500 text-sm">Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-heading text-[#1E3A5F] font-bold text-sm mb-1">Request Free Consultation</h4>
              {[
                { placeholder: "Full Name", key: "name", type: "text", required: true },
                { placeholder: "Phone Number", key: "phone", type: "tel", required: true },
                { placeholder: "Email Address", key: "email", type: "email", required: true },
              ].map(({ placeholder, key, type, required }) => (
                <input
                  key={key}
                  required={required}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7] text-[#1E3A5F]"
                />
              ))}
              <textarea
                placeholder="Your Query / Message"
                value={form.message}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                rows={4}
                className="w-full p-3.5 rounded-xl border border-gray-200 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#2FA4C7] text-[#1E3A5F]"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-heading font-bold text-white transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
                style={{ background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)" }}
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ title, sub }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-heading text-[#1E3A5F] font-extrabold text-3xl md:text-4xl mb-3">{title}</h2>
      {sub && <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">{sub}</p>}
      <div className="w-14 h-1 mx-auto mt-5 rounded-full" style={{ background: "linear-gradient(90deg, #2FA4C7, #4CAF50)" }} />
    </div>
  );
}

// ─── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "#fff", borderRadius: "14px", border: `1px solid ${open ? "#2FA4C7" : "#e0e9f2"}`,
        overflow: "hidden", transition: "border-color 0.3s",
        boxShadow: open ? "0 4px 20px rgba(47,164,199,0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", textAlign: "left",
        }}
      >
        <span style={{ color: "#1E3A5F", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
          background: open ? "#2FA4C7" : "#F4F8FB", color: open ? "#fff" : "#2FA4C7",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
          fontWeight: 400, transition: "all 0.3s", transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "300px" : "0",
        overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{ padding: "0 24px 20px", color: "#556B7D", fontSize: "0.88rem", lineHeight: 1.75 }}>{a}</p>
      </div>
    </div>
  );
}

// ─── Stat Counter ──────────────────────────────────────────────────────────────
function StatCard({ value, label }) {
  const [ref, visible] = useVisible();
  return (
    <div
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.15)", borderRadius: "18px",
        padding: "24px 28px", textAlign: "center", minWidth: "140px",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: 800, color: "#2FA4C7", fontFamily: "'Montserrat', sans-serif" }}>{value}</div>
      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

// ─── Back to Top ───────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: "88px", right: "24px", zIndex: 40,
        width: "44px", height: "44px", borderRadius: "12px", border: "none", cursor: "pointer",
        background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(30,58,95,0.35)",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: visible ? "all" : "none",
      }}
    >
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

// ─── Who We Are ───────────────────────────────────────────────────────────────
function WhoWeAreSection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 bg-[#F4F8FB]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <FadeIn direction="left">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#2FA4C7", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              <span style={{ width: "24px", height: "1.5px", background: "#2FA4C7", display: "inline-block" }} />
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F] leading-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Your Trusted Partner for<br />
              <span className="text-[#2FA4C7]">Business Growth & Compliance</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              NxtWeave Solutions is a modern business consulting and digital solutions company dedicated to helping startups, MSMEs, entrepreneurs, NGOs, and enterprises establish, grow, and scale successfully.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We provide complete end-to-end support including business registration, certifications, compliance consulting, digital infrastructure development, and online growth solutions.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {[
                { label: "Our Mission", text: "To empower entrepreneurs and businesses with transparent, reliable and professional consulting." },
                { label: "Our Vision", text: "To become a globally trusted consulting and digital solutions company helping businesses build strong foundations." },
              ].map((item) => (
                <div key={item.label} style={{ background: "#fff", padding: "20px", borderRadius: "16px", border: "1px solid #e0e9f2", boxShadow: "0 1px 8px rgba(30,58,95,0.05)" }}>
                  <h4 style={{ color: "#1E3A5F", fontWeight: 700, fontSize: "0.88rem", marginBottom: "8px" }}>{item.label}</h4>
                  <p style={{ color: "#556B7D", fontSize: "0.82rem", lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/about")} className="px-8 py-3 rounded-xl font-bold text-white bg-[#1E3A5F] hover:bg-[#16304d] transition text-sm">
              More About Us
            </button>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={100}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              alt="NxtWeave Team Collaboration"
              className="w-full h-full object-cover"
              style={{ minHeight: "380px" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,31,51,0.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", padding: "20px 24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", marginBottom: "4px" }}>End-to-End Support</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.82rem" }}>From registration to digital scaling — we handle it all.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <FadeIn><SectionTitle title="What Our Clients Say" sub="Trusted by businesses across India and internationally" /></FadeIn>
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div style={{ background: "#F4F8FB", padding: "24px", borderRadius: "20px", border: "1px solid #e0e9f2", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s" }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(47,164,199,0.12)"; e.currentTarget.style.borderColor = "#2FA4C7"; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e0e9f2"; }}>
              <div style={{ display: "flex", color: "#F59E0B", marginBottom: "12px", fontSize: "14px" }}>{"★★★★★"}</div>
              <p style={{ color: "#556B7D", fontSize: "0.88rem", lineHeight: 1.75, fontStyle: "italic", flex: 1, marginBottom: "16px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid #e0e9f2" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <p style={{ color: "#1E3A5F", fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</p>
                  <p style={{ color: "#8FA3B4", fontSize: "0.75rem" }}>{t.role}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Main Home ────────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  const [heroForm, setHeroForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [heroSent, setHeroSent] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("registration");
  const [showPopup, handlePopupClose] = usePopup();

  useEffect(() => { emailjs.init("ikS9R1hqeGZXmqe-f"); }, []);

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send("service_8mzileq", "template_d8xpqpo", {
        name: heroForm.name, phone: heroForm.phone, email: heroForm.email,
        service: heroForm.service || "General Inquiry", message: heroForm.message || "No message",
      }, "ikS9R1hqeGZXmqe-f");
      await addDoc(collection(db, "queries"), { ...heroForm, source: "hero", createdAt: new Date().toISOString() });
      setHeroSent(true);
      setHeroForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (err) {
      console.error(err);
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
    { key: "registration", label: "Business Registration" },
    { key: "certifications", label: "Certifications" },
    { key: "digital", label: "Digital Solutions" },
    { key: "marketing", label: "Marketing" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1F33 0%, #1E3A5F 60%, #1a4a73 100%)" }}>
        {/* Background decorative orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(47,164,199,0.1) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,80,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "40%", left: "35%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "28px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "50px", background: "rgba(47,164,199,0.12)", border: "1px solid rgba(47,164,199,0.3)", color: "#2FA4C7", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                #1 Business Solutions Partner — Pan India &amp; Global
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <FadeIn delay={80}>
                <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", lineHeight: 1.1, color: "#fff", marginBottom: "24px", letterSpacing: "-0.5px" }}>
                  Complete Business<br />
                  Consulting and Digital<br />
                  <span style={{ color: "#2FA4C7" }}>Solutions Platform</span>
                </h1>
              </FadeIn>

              <FadeIn delay={160}>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "36px", maxWidth: "520px" }}>
                  Business registration, compliance, certifications, and digital growth solutions for startups and enterprises. We help you build, grow, and scale globally.
                </p>
              </FadeIn>

              <FadeIn delay={220}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "40px" }}>
                  <StatCard value="500+" label="Businesses Served" />
                  <StatCard value="99%" label="Success Rate" />
                  <StatCard value="Global" label="Service Reach" />
                </div>
              </FadeIn>

              <FadeIn delay={280}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                  <button onClick={() => navigate("/contact")} className="btn-primary" style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)", color: "#fff", border: "none", padding: "14px 30px", borderRadius: "50px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(76,175,80,0.4)", transition: "all 0.3s", fontFamily: "inherit" }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(76,175,80,0.5)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(76,175,80,0.4)"; }}>
                    Get Free Consultation
                  </button>
                  <a href="https://wa.me/919711565533" target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "50px", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", color: "#4ade80", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", transition: "all 0.3s" }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.25)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.15)"; }}>
                    WhatsApp Us
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right — Form */}
            <FadeIn delay={200} direction="right">
              <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "36px" }}>
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.25rem", marginBottom: "6px", fontFamily: "'Montserrat', sans-serif" }}>Get Free Consultation</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: "24px" }}>Fill the form below and our experts will contact you shortly.</p>

                {heroSent ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#4CAF50", fontWeight: 700, fontSize: "1rem" }}>
                    Thank you! Our team will get in touch within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {[
                      { placeholder: "Full Name", key: "name", type: "text" },
                      { placeholder: "Phone Number", key: "phone", type: "tel" },
                      { placeholder: "Email Address", key: "email", type: "email" },
                    ].map(({ placeholder, key, type }) => (
                      <input key={key} required type={type} placeholder={placeholder} value={heroForm[key]}
                        onChange={(e) => setHeroForm(p => ({ ...p, [key]: e.target.value }))}
                        style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", transition: "border 0.2s" }}
                        onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                      />
                    ))}
                    <select value={heroForm.service} onChange={(e) => setHeroForm(p => ({ ...p, service: e.target.value }))}
                      style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", cursor: "pointer" }}>
                      <option value="">Select Service Interest</option>
                      <option>Business Registration</option>
                      <option>Compliance &amp; Certifications</option>
                      <option>Digital Solutions</option>
                      <option>Digital Marketing</option>
                      <option>Government Schemes</option>
                    </select>
                    <textarea placeholder="Your Query / Message (Please describe your requirements in detail)"
                      value={heroForm.message} onChange={(e) => setHeroForm(p => ({ ...p, message: e.target.value }))} rows={3}
                      style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.88rem", fontFamily: "inherit", outline: "none", resize: "vertical" }}
                      onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                    />
                    <button type="submit"
                      style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "#4CAF50", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.95rem", fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 4px 16px rgba(76,175,80,0.35)" }}
                      onMouseOver={(e) => { e.currentTarget.style.background = "#388E3C"; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = "#4CAF50"; }}>
                      Book Consultation Now
                    </button>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", textAlign: "center" }}>By submitting, you agree to our Terms &amp; Privacy Policy.</p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ──────────────────────────────────────────────────── */}
      <WhoWeAreSection />

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services-section" className="pt-16 pb-24 px-6 bg-[#F4F8FB]">
        <div className="max-w-7xl mx-auto">
          <FadeIn><SectionTitle title="Our Services" sub="Complete end-to-end support for every business need — registration, compliance, digital and growth." /></FadeIn>

          {/* Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "36px" }}>
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 22px", borderRadius: "50px", fontWeight: 600, fontSize: "0.85rem",
                  border: "1.5px solid", cursor: "pointer", transition: "all 0.25s", fontFamily: "inherit",
                  ...(activeTab === tab.key
                    ? { background: "#1E3A5F", color: "#fff", borderColor: "#1E3A5F", boxShadow: "0 4px 16px rgba(30,58,95,0.25)" }
                    : { background: "#fff", color: "#556B7D", borderColor: "#d0e4f0" }),
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tabServices[activeTab].map((s, i) => (
              <FadeIn key={`${activeTab}-${i}`} delay={i * 50}>
                <ServiceCard {...s} onClick={() => setSelectedService(s)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVT SCHEMES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1E3A5F, #1a5a82)" }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#93B5CC", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              <span style={{ width: "24px", height: "1.5px", background: "#93B5CC", display: "inline-block" }} />
              Government Scheme Guidance
            </span>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: "20px", fontFamily: "'Montserrat', sans-serif" }}>
              Access Government Schemes With Expert Guidance
            </h2>

            <div style={{ background: "rgba(255,165,0,0.12)", border: "1px solid rgba(255,165,0,0.3)", borderRadius: "14px", padding: "16px 24px", marginBottom: "24px", display: "inline-block" }}>
              <p style={{ color: "#FFD080", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Important Disclaimer</p>
              <p style={{ color: "#FFD080", fontSize: "0.78rem", opacity: 0.85 }}>We provide consulting and documentation assistance only. We do not provide funding and are not a government body.</p>
            </div>

            <p style={{ color: "#93B5CC", lineHeight: 1.8, marginBottom: "28px", fontSize: "0.95rem" }}>
              Our experts help identify eligible government schemes, prepare documentation, navigate application processes, and ensure compliance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {["Eligibility Assessment", "Documentation Support", "Application Guidance", "Compliance Guidance"].map(item => (
                <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 12px", color: "#fff", fontSize: "0.82rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span style={{ color: "#4CAF50", marginRight: "6px" }}>✓</span>{item}
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/contact")}
              style={{ padding: "14px 36px", borderRadius: "50px", background: "linear-gradient(135deg, #4CAF50, #2E7D32)", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(76,175,80,0.35)", transition: "all 0.3s", fontFamily: "inherit" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
              Get Scheme Guidance
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process-section" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn><SectionTitle title="Our Working Process" sub="A streamlined 4-step journey from inquiry to completion." /></FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ textAlign: "center", position: "relative" }}>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div style={{ position: "absolute", top: "34px", left: "calc(50% + 40px)", width: "calc(100% - 40px)", height: "1px", background: "linear-gradient(90deg, #2FA4C7, transparent)", display: "none" }} className="lg:block" />
                  )}
                  <div style={{ width: "68px", height: "68px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 16px", background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)", boxShadow: "0 8px 24px rgba(30,58,95,0.25)" }}>
                    {step.icon}
                  </div>
                  <div style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(47,164,199,0.12)", lineHeight: 1, marginBottom: "-8px", fontFamily: "'Montserrat', sans-serif" }}>{step.step}</div>
                  <h3 style={{ color: "#1E3A5F", fontWeight: 800, fontSize: "1rem", marginBottom: "8px", fontFamily: "'Montserrat', sans-serif" }}>{step.title}</h3>
                  <p style={{ color: "#556B7D", fontSize: "0.85rem", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section id="why-us-section" className="py-20 px-6 bg-[#F4F8FB]">
        <div className="max-w-5xl mx-auto">
          <FadeIn><SectionTitle title="Why Choose NxtWeave?" sub="Compliance expertise and digital innovation — all under one roof." /></FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {WHY_US.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ background: "#fff", textAlign: "center", borderRadius: "20px", padding: "24px 16px", border: "1px solid #e0e9f2", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", transition: "all 0.3s", height: "100%" }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(47,164,199,0.12)"; e.currentTarget.style.borderColor = "#2FA4C7"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#e0e9f2"; }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, #F4F8FB, #e0f0fa)", border: "1px solid #d0e8f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 12px" }}>{item.icon}</div>
                  <h4 style={{ color: "#1E3A5F", fontWeight: 700, fontSize: "0.82rem", marginBottom: "6px" }}>{item.title}</h4>
                  <p style={{ color: "#8FA3B4", fontSize: "0.75rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn><SectionTitle title="Frequently Asked Questions" sub="Clear answers to your most common questions" /></FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 60}>
                <FAQItem q={faq.q} a={faq.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #0D1F33, #1E3A5F)" }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.6rem)", marginBottom: "16px", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.2 }}>
              Ready to Grow Your Business Globally?
            </h2>
            <p style={{ color: "#93B5CC", marginBottom: "32px", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Join 500+ businesses who trust NxtWeave Solutions. Free consultation, no obligation.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/contact")}
                style={{ padding: "14px 32px", borderRadius: "50px", background: "linear-gradient(135deg, #4CAF50, #2E7D32)", color: "#fff", border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(76,175,80,0.35)", transition: "all 0.3s", fontFamily: "inherit" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
                Get Free Consultation
              </button>
              <a href="https://wa.me/919711565533" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "50px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.35)", transition: "all 0.3s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── MODALS & FLOATING ELEMENTS ───────────────────────────────────── */}
      <Modal service={selectedService} onClose={() => setSelectedService(null)} />
      {showPopup && <PopupForm onClose={handlePopupClose} />}

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919711565533" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        style={{
          position: "fixed", bottom: "24px", right: "24px", width: "52px", height: "52px",
          borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)", zIndex: 40, textDecoration: "none",
          transition: "transform 0.3s", fontSize: "26px",
          animation: "waPulse 2.5s ease-in-out infinite",
        }}>
        <style>{`@keyframes waPulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.45)} 50%{box-shadow:0 4px 32px rgba(37,211,102,0.7),0 0 0 8px rgba(37,211,102,0.1)} }`}</style>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <BackToTop />
    </div>
  );
}

export default Home;
