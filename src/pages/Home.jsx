import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

// ─── Brand Config ─────────────────────────────────────────────────────────────
const SOCIAL = {
  whatsapp:  "https://wa.me/919711565533",
  instagram: "https://www.instagram.com/nxtweavesolutions/",
  facebook:  "https://www.facebook.com/profile.php?id=61577122554991",
  linkedin:  "https://www.linkedin.com/company/nxtweavesolutions/",
};

const C = {
  navy:   "#1E3A5F",
  dark:   "#0D1F33",
  teal:   "#2FA4C7",
  green:  "#4CAF50",
  bg:     "#F4F8FB",
  white:  "#FFFFFF",
  muted:  "#556B7D",
  border: "#e0e9f2",
};

const EMAILJS = {
  service:  "service_8mzileq",
  template: "template_d8xpqpo",
  key:      "ikS9R1hqeGZXmqe-f",
};

// ─── Global CSS & Keyframes Overlays ──────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&family=Montserrat:wght@700;800;900&display=swap');
  
  @keyframes nwWaPulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }
    50% { box-shadow: 0 4px 32px rgba(37,211,102,0.7), 0 0 0 8px rgba(37,211,102,0.12); }
  }
  @keyframes shimmerGold {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes popupIn {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes floatChar {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.002); }
  }
  @keyframes floatBubble {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes chatFadeIn {
    from { opacity: 0; transform: translateY(12px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pulseBlob {
    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.8; }
    50% { transform: scale(1.1) translate(6px, -6px); opacity: 1; }
  }

  .pulse-blob-1 { animation: pulseBlob 8s infinite alternate ease-in-out; }
  .pulse-blob-2 { animation: pulseBlob 10s infinite alternate ease-in-out; }

  .nw-bullet-pill:hover {
    background: rgba(255,255,255,0.07) !important;
    border-color: rgba(47,164,199,0.2) !important;
    transform: translateX(4px);
  }

  .nw-social-pill:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    background: currentColor !important;
    color: #fff !important;
  }

  .nw-close-btn:hover {
    background: rgba(13,31,51,0.1) !important;
    transform: rotate(90deg) scale(1.05);
  }

  .nw-close-btn-white:hover {
    background: rgba(255,255,255,0.22) !important;
    transform: rotate(90deg) scale(1.05);
  }

  .nw-btn-submit {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .nw-btn-submit:hover:not(:disabled) {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 24px rgba(47,164,199,0.3) !important;
  }
  .nw-btn-submit:active:not(:disabled) {
    transform: translateY(0) !important;
  }

  .nw-popup-grid { display: grid; grid-template-columns: 1fr 1fr; }

  /* Premium Glowing Sweeps for all form inputs across Home page */
  .nw-li input, .nw-li select, .nw-li textarea {
    border: 1.5px solid #e0e9f2 !important;
    background: rgba(255, 255, 255, 0.95) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .nw-li input:hover, .nw-li select:hover, .nw-li textarea:hover {
    border-color: #b5c7d8 !important;
    background: #fff !important;
  }
  .nw-li input:focus, .nw-li select:focus, .nw-li textarea:focus {
    border-color: #2FA4C7 !important;
    background: #fff !important;
    box-shadow: 0 0 0 4px rgba(47, 164, 199, 0.12), 0 4px 16px rgba(47, 164, 199, 0.06) !important;
    transform: translateY(-1px) !important;
  }
  
  /* Responsive Breakpoints Layouts */
  @media(max-width: 768px) {
    .nw-popup-grid { grid-template-columns: 1fr !important; }
    .nw-popup-left { display: none !important; }
    #nw-hero-grid  { grid-template-columns: 1fr !important; }
    #nw-about-grid { grid-template-columns: 1fr !important; }
    .nw-svc-grid   { grid-template-columns: 1fr !important; }
    .nw-proc-grid  { grid-template-columns: 1fr 1fr !important; }
    .nw-why-grid   { grid-template-columns: 1fr 1fr !important; }
    .nw-testi-grid { grid-template-columns: 1fr !important; }
    .nw-scheme-grid{ grid-template-columns: 1fr !important; }
    .nw-estimator-layout { grid-template-columns: 1fr !important; }
    .nw-calendar-layout { grid-template-columns: 1fr !important; }
    .nw-checklist-container { grid-template-columns: 1fr !important; }
    .nw-contact-layout { grid-template-columns: 1fr !important; }
    .nw-hero-visual { margin-top: 4.5rem !important; }
    .nw-bubble-left-1, .nw-bubble-right-2, .nw-bubble-left-3, .nw-bubble-right-4, .nw-bubble-left-5 {
      left: 5% !important; right: 5% !important; top: -16% !important; max-width: 90% !important; margin: 0 auto !important;
    }
    .nw-bubble-tail-left-1, .nw-bubble-tail-right-2, .nw-bubble-tail-left-3, .nw-bubble-tail-right-4, .nw-bubble-tail-left-5 {
      display: none !important;
    }
  }
  
  @media(max-width: 480px) {
    .nw-proc-grid  { grid-template-columns: 1fr !important; }
    .nw-why-grid   { grid-template-columns: 1fr !important; }
  }

  input::placeholder, textarea::placeholder { color: rgba(30, 58, 95, 0.45) !important; }
  .nw-li input::placeholder, .nw-li textarea::placeholder { color: #8FA3B4 !important; }
  select option { background: #1E3A5F; color: #fff; }
`;

// ─── Input Style Utility ──────────────────────────────────────────────────────
const inputSt = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  border: "1.5px solid #e0e9f2",
  fontSize: "0.88rem",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  color: C.navy,
  background: "rgba(255, 255, 255, 0.95)",
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  boxSizing: "border-box",
};

// ─── Scroll Visibility Animation Hook ────────────────────────────────────────
function useVisible(threshold = 0.1) {
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

function FadeUp({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useVisible();
  const from = direction === "left" ? "translateX(-32px)"
             : direction === "right" ? "translateX(32px)"
             : "translateY(28px)";
  return (
    <div ref={ref} style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : from,
      transition: `opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                  transform 0.72s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Badges & Titles Helpers ──────────────────────────────────────────────────
function Tag({ label, dark = false }) {
  const color = dark ? "rgba(255,255,255,0.5)" : C.teal;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px",
      fontSize: "0.68rem", fontWeight: 700, color,
      letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
      <span style={{ width: "22px", height: "1.5px", background: color, flexShrink: 0 }} />
      {label}
    </div>
  );
}

function SectionTitle({ title, sub, dark = false }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif",
        color: dark ? "#fff" : C.navy,
        fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        marginBottom: sub ? "10px" : 0 }}>{title}</h2>
      {sub && (
        <p style={{ color: dark ? "rgba(255,255,255,0.5)" : C.muted,
          fontSize: "0.9rem", maxWidth: "540px", margin: "0 auto",
          lineHeight: 1.75, fontWeight: 300 }}>{sub}</p>
      )}
    </div>
  );
}

// ─── Stat Card (Hero) ─────────────────────────────────────────────────────────
function StatCard({ value, label }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.09)",
      backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "14px", padding: "16px 22px", textAlign: "center",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)",
      transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <div style={{ fontFamily: "'Playfair Display', serif",
        fontSize: "1.8rem", fontWeight: 900, color: C.teal, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.55)",
        marginTop: "3px", fontWeight: 300 }}>{label}</div>
    </div>
  );
}

// ─── Data Definitions ─────────────────────────────────────────────────────────
const REGISTRATION_SERVICES = [
  { icon: "🏢", title: "Private Limited Company Registration",
    desc: "Most preferred structure for startups. Separate legal entity with limited liability and easy fundraising.",
    benefits: ["Separate Legal Entity", "Limited Liability", "Easy Funding Access", "Perpetual Existence"] },
  { icon: "🤝", title: "LLP Registration",
    desc: "Combines partnership flexibility with company benefits. Ideal for professionals and service firms.",
    benefits: ["Limited Liability", "Lower Compliance", "Tax Benefits", "Flexible Management"] },
  { icon: "👥", title: "Partnership Firm Registration",
    desc: "Simple structure for 2 or more individuals with shared profits and responsibilities.",
    benefits: ["Easy to Form", "Minimal Compliance", "Shared Responsibility", "Simple Taxation"] },
  { icon: "🌱", title: "Section 8 Company Registration",
    desc: "Non-profit entity for charitable, educational and social welfare objectives.",
    benefits: ["Non-profit Status", "Tax Exemptions", "High Credibility", "Government Recognition"] },
  { icon: "📋", title: "NGO Darpan Registration",
    desc: "Mandatory NITI Aayog portal registration for NGOs seeking government grants.",
    benefits: ["Government Grant Access", "Unique ID Allotment", "NITI Aayog Recognition", "Funding Eligibility"] },
  { icon: "📜", title: "12A Registration",
    desc: "Income tax exemption registration for non-profit organisations under the IT Act.",
    benefits: ["Income Tax Exemption", "Donor Confidence", "Scheme Access", "Audit Compliance"] },
  { icon: "💰", title: "80G Registration",
    desc: "Enables donors to claim tax deductions on donations made to your organisation.",
    benefits: ["Donor Tax Deduction", "Increased Donations", "Trust & Credibility", "Legal Recognition"] },
  { icon: "🌍", title: "CSR-1 Registration",
    desc: "Mandatory for NGOs and trusts seeking Corporate Social Responsibility funding.",
    benefits: ["CSR Fund Access", "Corporate Tie-ups", "MCA Recognition", "Increased Funding"] },
  { icon: "📄", title: "Trade License",
    desc: "Legal permit to carry out trade or business activity in a specific jurisdiction.",
    benefits: ["Legal Authorization", "Business Legitimacy", "Avoid Penalties", "Renewal Support"] },
  { icon: "🏪", title: "Shop Act / Gumasta License",
    desc: "State-level license for retail shops and commercial establishments.",
    benefits: ["State Compliance", "Employee Benefits", "Bank Account Opening", "Legal Operation"] },
  { icon: "💎", title: "GeM Registration",
    desc: "Register on Government e-Marketplace to sell products and services to government buyers.",
    benefits: ["Government Orders", "Pan India Market", "Transparent Process", "Direct Payment"] },
];

const CERTIFICATION_SERVICES = [
  { icon: "🧾", title: "GST Registration",
    desc: "Mandatory above threshold turnover. Enables input tax credit and B2B transactions.",
    benefits: ["Legal Recognition", "Input Tax Credit", "Inter-state Sales", "e-Commerce Ready"] },
  { icon: "🏭", title: "MSME / Udyam Registration",
    desc: "Unlock government schemes, priority lending, subsidies and collateral-free loans.",
    benefits: ["Collateral-free Loans", "Subsidy on Patent", "Govt Tender Benefits", "Payment Protection"] },
  { icon: "🏅", title: "ISO Certification",
    desc: "International quality management certification that boosts global business credibility.",
    benefits: ["Global Recognition", "Tender Eligibility", "Process Improvement", "Client Trust"] },
  { icon: "™️", title: "Trademark Registration",
    desc: "Legally protect your brand name, logo and intellectual property from infringement.",
    benefits: ["Brand Protection", "Legal Rights", "Asset Creation", "Anti-Infringement"] },
  { icon: "🍽️", title: "FSSAI License",
    desc: "Mandatory food safety and standards licence for all food businesses across India.",
    benefits: ["Legal Compliance", "Consumer Trust", "Business Expansion", "Brand Credibility"] },
  { icon: "🌐", title: "IEC Certificate",
    desc: "Import Export Code required for all businesses engaged in international trade.",
    benefits: ["Import/Export Legal", "Global Trade Access", "Bank Support", "Lifetime Validity"] },
  { icon: "🚀", title: "Startup India Registration",
    desc: "DPIIT recognition unlocking tax benefits, self-certification and easier fundraising.",
    benefits: ["Tax Exemption", "Easy Winding Up", "Self Certification", "Funding Access"] },
  { icon: "⚡", title: "ZED Certification",
    desc: "Zero Defect Zero Effect certification by QCI for quality-focused manufacturers.",
    benefits: ["Quality Recognition", "Export Benefits", "Govt Support", "Market Access"] },
  { icon: "🌾", title: "FCI Certificate",
    desc: "Food Corporation of India empanelment for businesses in the food supply chain.",
    benefits: ["Govt Supply Chain", "Stable Revenue", "Pan India Access", "Credibility"] },
  { icon: "🔢", title: "DUNS / DRS Number",
    desc: "D-U-N-S Number for global business credibility and international supply chain access.",
    benefits: ["Global Credibility", "Supply Chain Access", "International Trade", "Risk Assessment"] },
  { icon: "🔧", title: "NSIC Registration",
    desc: "National Small Industries Corporation registration for government procurement benefits.",
    benefits: ["Procurement Benefits", "Tender Support", "Bank Guarantee Waiver", "Govt Recognition"] },
];

const DIGITAL_SERVICES = [
  { icon: "💻", title: "Website Development",
    desc: "Modern, responsive, SEO-optimised websites engineered for performance and conversion.",
    benefits: ["Responsive Design", "SEO Friendly", "CMS Integration", "Fast Loading"] },
  { icon: "⚙️", title: "Web Application Development",
    desc: "Custom web applications tailored to your business workflows and operational needs.",
    benefits: ["React / Next.js", "Secure Backend", "API Integration", "Scalable Architecture"] },
  { icon: "📊", title: "Business Dashboard",
    desc: "Real-time analytics and reporting dashboards for data-driven business decisions.",
    benefits: ["Live Data", "Custom Reports", "Role-based Access", "Mobile Ready"] },
  { icon: "☁️", title: "SaaS Platform Development",
    desc: "Scalable, cloud-native software platforms for your product or service offering.",
    benefits: ["Multi-tenancy", "Subscription Billing", "Cloud Native", "Auto Scaling"] },
  { icon: "🎨", title: "UI/UX Design",
    desc: "User-centric design that turns visitors into loyal, returning customers.",
    benefits: ["User Research", "Wireframing", "Prototyping", "Conversion Focused"] },
  { icon: "🌐", title: "Hosting & Domain Setup",
    desc: "End-to-end hosting, domain registration, SSL configuration and ongoing management.",
    benefits: ["SSL Certificate", "99.9% Uptime", "Daily Backups", "24/7 Support"] },
];

const MARKETING_SERVICES = [
  { icon: "📱", title: "Social Media Marketing",
    desc: "Strategic campaigns across Instagram, Facebook and LinkedIn that grow your audience.",
    benefits: ["Instagram & Facebook", "LinkedIn Growth", "Engagement Strategy", "Analytics Report"] },
  { icon: "💬", title: "WhatsApp Marketing",
    desc: "Targeted WhatsApp broadcast campaigns for direct, high-conversion customer engagement.",
    benefits: ["Bulk Messaging", "Personalised Reach", "High Open Rate", "Lead Generation"] },
  { icon: "🖼️", title: "Graphic Designing",
    desc: "Professional brand identity, social media creatives and marketing collateral design.",
    benefits: ["Brand Identity", "Social Media Posts", "Print Design", "Infographics"] },
  { icon: "✍️", title: "Content Marketing",
    desc: "SEO-driven content strategy that positions your business as an industry authority.",
    benefits: ["Blog Writing", "SEO Optimisation", "Keyword Research", "Traffic Growth"] },
  { icon: "🎬", title: "Video Editing",
    desc: "Professional video content — reels, corporate films, ads and motion graphics.",
    benefits: ["Reels & Shorts", "Corporate Videos", "Ad Films", "Motion Graphics"] },
  { icon: "📈", title: "Marketing Consultation",
    desc: "A tailored marketing roadmap with clear ROI targets and channel-specific strategy.",
    benefits: ["ROI Planning", "Channel Strategy", "Budget Optimisation", "Growth Roadmap"] },
];

const PROCESS_STEPS = [
  { step: "01", icon: "🎯", title: "Consultation",
    desc: "A free, honest conversation about your business needs — no sales pitch, just real guidance." },
  { step: "02", icon: "📁", title: "Documentation",
    desc: "We map every required document and guide you through preparation step by step." },
  { step: "03", icon: "⚙️", title: "Processing",
    desc: "We handle all filings, government interactions and follow-ups while you focus on your work." },
  { step: "04", icon: "✅", title: "Delivery",
    desc: "Your registration or certificate delivered with continued support — not just a handover." },
];

const WHY_US = [
  { icon: "👨‍💼", title: "Expert Team",
    desc: "Qualified professionals with deep regulatory and domain expertise." },
  { icon: "🔄", title: "End-to-End Support",
    desc: "From registration to ongoing compliance — one team, all the way." },
  { icon: "🔍", title: "Transparent Process",
    desc: "Clear timelines, regular updates, no hidden charges — ever." },
  { icon: "💡", title: "Dual Expertise",
    desc: "Compliance consulting and digital solutions under one roof." },
  { icon: "📈", title: "Growth Focused",
    desc: "Long-term business growth, not just a one-time transaction." },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma",   initials: "RS", role: "Startup Founder, Noida",
    text: "NxtWeave completed our Pvt Ltd registration in 18 days. Extremely professional team — kept us informed at every single step." },
  { name: "Priya Singh",    initials: "PS", role: "NGO Director, Lucknow",
    text: "Applied for 12A and 80G together. Full support from document preparation to final government approval." },
  { name: "Amit Patel",     initials: "AP", role: "E-commerce Owner, Delhi",
    text: "GST and MSME registration handled quickly and professionally. Saved us both time and money. Highly recommended." },
  { name: "Sneha Verma",    initials: "SV", role: "Consultant, Kanpur",
    text: "Trademark registration was smooth and fast. The team explained every stage clearly — never felt lost in the process." },
  { name: "Vikram Yadav",   initials: "VY", role: "Manufacturing Unit, Agra",
    text: "Best service for ISO Certification. Timely follow-ups and real progress updates throughout the entire journey." },
  { name: "James Carter",   initials: "JC", role: "International Business, Dubai UAE",
    text: "From Dubai, we completed our IEC and Trademark registration fully remotely. Seamless process and excellent communication." },
];

const FAQS = [
  { q: "How long does Private Limited Company registration take?",
    a: "Typically 15–25 working days, depending on MCA name approval and document verification. We manage everything end-to-end to keep it as fast as possible." },
  { q: "What documents are required for 12A and 80G registration?",
    a: "Key documents include MoA/AoA, registration certificate, PAN of the NGO, trustee ID proofs, bank statements and a 3-year activity report. We provide a full checklist after the initial consultation." },
  { q: "What is the turnover threshold for GST registration?",
    a: "For goods: ₹40 lakh (₹20 lakh in special category states). For services: ₹20 lakh (₹10 lakh in special category states) annual turnover." },
  { q: "How long does Trademark registration take?",
    a: "Typically 12–18 months including examination and publication. We handle any objections or hearings that arise during the process." },
  { q: "Do you serve international clients?",
    a: "Yes. We provide IEC, Trademark and remote registration services for clients in Dubai, Singapore, UAE and beyond. The entire process is fully remote." },
  { q: "Do you handle ongoing compliance?",
    a: "Absolutely. We offer ongoing support for GST returns, ROC annual filings, TDS, and more — available on monthly or quarterly retainer plans." },
  { q: "Is the initial consultation free?",
    a: "Yes, completely free. Fees apply only after a detailed scope and quote have been shared and agreed upon — no obligation." },
];

const DOCUMENT_CHECKLIST_DATA = {
  "pvt-ltd": [
    { title: "Directors Identity Proof (All Directors)",
      items: ["PAN Card Copy (Mandatory for Indian Nationals)", "Aadhaar Card, Passport, or Voters ID", "Recent Bank Statement or Electricity Bill (under 2 months old)"] },
    { title: "Registered Office Address Proof",
      items: ["Recent Utility Bill (Electricity, Gas, or Water bill)", "NOC (No Objection Certificate) from the property owner", "Rent Agreement Copy (if rented)"] }
  ],
  "llp": [
    { title: "Partners Identity & Address Files",
      items: ["Designated Partners PAN Cards", "Aadhaar card or Passport Copy", "Recent Bank statement showing residential address"] },
    { title: "Office Location Authorization",
      items: ["No Objection Certificate (NOC) from landlord", "Utility bill of the office location", "Lease agreement or tenancy contract"] }
  ],
  "gst": [
    { title: "Entity Credentials & Registrations",
      items: ["Company PAN Card and Registration Certificate (COI)", "Partnership Deed (for LLPs and Firms)", "Director/Promoter Aadhaar Card, Photo, and PAN"] },
    { title: "Bank Authorization & Signatory",
      items: ["Cancelled Cheque copy or bank statement showing IFSC details", "Letter of Authorization signed by all promoters"] }
  ],
  "trademark": [
    { title: "Trademark Search & Logo Identity",
      items: ["High-resolution brand logo, name or slogan image file", "Goods and services class classification (e.g. Class 9 for Software)", "Power of Attorney form signed by the applicant"] },
    { title: "Commerce User Affidavit",
      items: ["Affidavit showing date of first commercial use (if used before filing)", "Brochures, invoices or website links displaying commercial use"] }
  ],
  "ngo": [
    { title: "Trust/Section 8 Promoters Info",
      items: ["Identity and address proof of all trustees (Minimum 3 for Society, 2 for Section 8)", "Digital Signature Certificates (DSC) of active directors"] },
    { title: "NGO Objects & Bye-laws",
      items: ["Trust Deed / Society Rules & Regulations copy", "Memorandum of Association (MoA) and Articles of Association (AoA) outlining social welfare vision"] }
  ]
};

const FILING_DEADLINES = {
  "2026-05-10": [
    { name: "GSTR-7 Return Filing", type: "TDS GST Obligation", desc: "Monthly GSTR-7 return for tax deducted at source under GST law." },
    { name: "GSTR-8 Return Filing", type: "E-commerce TCS", desc: "TCS return filing by e-commerce operators collection under GST." }
  ],
  "2026-05-11": [
    { name: "GSTR-1 Sales Return (Monthly)", type: "GST Compliance", desc: "Mandatory filing of outward supplies details for regular taxpayers." }
  ],
  "2026-05-13": [
    { name: "GSTR-6 ISD Return", type: "Input Service Distributor", desc: "Monthly filing for input service distributor accounts." },
    { name: "GSTR-1 IFF (QRMP Account)", type: "GST Sales QRMP", desc: "Optional invoice furnishing facility filing for quarterly filers." }
  ],
  "2026-05-20": [
    { name: "GSTR-3B Tax Filing", type: "GST Monthly Return", desc: "Crucial monthly summary return and final payment of tax liability." }
  ],
  "2026-05-25": [
    { name: "GST PMT-06 Payment", type: "QRMP Scheme Challan", desc: "Monthly tax payment challan for QRMP scheme regular taxpayers." },
    { name: "ROC AOC-4 Filings", type: "MCA Compliance", desc: "Extended filing of resolution copies and company accounts updates." }
  ],
  "2026-06-10": [
    { name: "GSTR-7 Return Filing", type: "TDS GST Obligation", desc: "Monthly filing of TDS returns by registered tax deductors." }
  ],
  "2026-06-11": [
    { name: "GSTR-1 Outward Return", type: "GST Compliance", desc: "Details of outward sales invoice summaries." }
  ],
  "2026-06-20": [
    { name: "GSTR-3B Tax Settlement", type: "GST Monthly Return", desc: "Crucial monthly filing and summary tax checkout payment." }
  ]
};

// ─── Popup Timing Hook ────────────────────────────────────────────────────────
function usePopup() {
  const [show, setShow]   = useState(false);
  const timer             = useRef(null);
  const schedule = useCallback((ms) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(true), ms);
  }, []);
  useEffect(() => { schedule(10000); return () => clearTimeout(timer.current); }, [schedule]);
  const close = useCallback(() => { setShow(false); schedule(47000); }, [schedule]);
  return [show, close];
}

// ─── FAQ Item Component ───────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: "14px",
      border: `1px solid ${open ? C.teal : C.border}`,
      overflow: "hidden", transition: "border-color 0.3s",
      boxShadow: open ? "0 4px 20px rgba(47,164,199,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "20px 24px", background: "none", border: "none",
          cursor: "pointer", display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: "16px", textAlign: "left" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", color: C.navy,
          fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4 }}>{q}</span>
        <span style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
          background: open ? C.teal : C.bg, color: open ? "#fff" : C.teal,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", transition: "all 0.3s",
          transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? "300px" : "0",
        overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ padding: "0 24px 20px", color: C.muted,
          fontSize: "0.88rem", lineHeight: 1.75, fontWeight: 300 }}>{a}</p>
      </div>
    </div>
  );
}

// ─── Service Card Component ───────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: "20px", padding: "24px",
        cursor: "pointer", height: "100%",
        border: `1px solid ${hov ? C.teal : C.border}`,
        boxShadow: hov ? "0 10px 32px rgba(47,164,199,0.14)" : "0 1px 6px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column" }}>
      <div style={{ width: "58px", height: "58px", borderRadius: "16px",
        background: hov ? `linear-gradient(135deg,${C.navy},${C.teal})`
                        : "linear-gradient(135deg,#F4F8FB,#e8f4fb)",
        border: "1px solid #d0e8f5",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "28px", marginBottom: "16px", flexShrink: 0,
        transform: hov ? "scale(1.08)" : "scale(1)",
        transition: "all 0.32s ease",
        boxShadow: hov ? "0 8px 20px rgba(47,164,199,0.22)" : "none" }}>
        <span style={{ filter: hov ? "grayscale(1) brightness(4)" : "none",
          transition: "filter 0.3s" }}>{icon}</span>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy,
        fontWeight: 800, fontSize: "0.92rem",
        marginBottom: "10px", lineHeight: 1.4 }}>{title}</h3>
      <p style={{ color: C.muted, fontSize: "0.78rem",
        lineHeight: 1.72, flex: 1, fontWeight: 300 }}>{desc}</p>
      <div style={{ marginTop: "14px", display: "flex",
        alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: hov ? C.teal : "#8FA3B4", fontWeight: 600,
          fontSize: "0.78rem", transition: "color 0.2s" }}>Explore Service</span>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%",
          background: hov ? C.teal : "#eef6fb",
          color: hov ? "#fff" : C.teal,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
          transform: hov ? "translateX(3px)" : "none" }}>→</div>
      </div>
    </div>
  );
}

// ─── Service Modal Component ──────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
  const [form, setForm]     = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) { setForm({ name: "", phone: "", email: "", message: "" }); setSent(false); }
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    if (service) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [service, onClose]);

  if (!service) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, {
        name: form.name, phone: form.phone, email: form.email,
        service: service.title, message: form.message || "No message",
      }, EMAILJS.key);
      await addDoc(collection(db, "contacts"), {
        ...form, service: service.title,
        source: "service-modal", status: "pending", createdAt: new Date(),
      });
      setSent(true);
    } catch { alert("Something went wrong. Please try again."); }
    setLoading(false);
  };

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(13,31,51,0.8)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px", animation: "popupIn 0.35s ease" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "24px",
          width: "100%", maxWidth: "540px", maxHeight: "90vh",
          overflowY: "auto", boxShadow: "0 32px 80px rgba(13,31,51,0.32)", border: "1px solid rgba(255,255,255,0.8)" }}>

        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.teal})`,
          padding: "28px 32px", borderRadius: "24px 24px 0 0", position: "relative" }}>
          <button onClick={onClose}
            style={{ position: "absolute", top: "18px", right: "18px",
              background: "rgba(255,255,255,0.12)", border: "none",
              width: "32px", height: "32px", borderRadius: "50%",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="nw-close-btn-white"
            aria-label="Close dialog">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#fff" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "26px", marginBottom: "12px" }}>{service.icon}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff",
            fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.3 }}>{service.title}</h2>
        </div>

        <div style={{ padding: "28px 32px" }}>
          <p style={{ color: C.muted, fontSize: "0.85rem",
            lineHeight: 1.75, marginBottom: "18px", fontWeight: 300 }}>{service.desc}</p>

          {service.benefits && (
            <div style={{ background: C.bg, borderRadius: "14px",
              padding: "18px", marginBottom: "18px" }}>
              <h4 style={{ color: C.navy, fontWeight: 700, fontSize: "0.75rem",
                textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "12px" }}>Key Benefits</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {service.benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "18px", height: "18px", borderRadius: "50%",
                      background: "rgba(47,164,199,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: C.teal, fontSize: "10px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.muted, fontSize: "0.77rem" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: "#fffbeb", border: "1px solid #fde68a",
            borderRadius: "12px", padding: "14px 16px", marginBottom: "20px" }}>
            <h4 style={{ color: "#92400e", fontWeight: 700, fontSize: "0.72rem",
              textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>
              Important Disclaimer</h4>
            <p style={{ color: "#b45309", fontSize: "0.77rem", lineHeight: 1.6 }}>
              We provide expert guidance and documentation support only. We do not guarantee approvals or funding.</p>
          </div>

          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", margin: "0 auto 14px", color: "#fff" }}>✓</div>
              <p style={{ color: C.green, fontWeight: 700, fontSize: "0.98rem", marginBottom: "5px" }}>
                Request Sent Successfully</p>
              <p style={{ color: C.muted, fontSize: "0.83rem", fontWeight: 300 }}>
                Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              className="nw-li">
              <h4 style={{ fontFamily: "'Playfair Display', serif",
                color: C.navy, fontWeight: 700, fontSize: "1rem",
                marginBottom: "2px" }}>Request Free Consultation</h4>
              {[["name", "Full Name", "text"], ["phone", "Phone Number", "tel"],
                ["email", "Email Address", "email"]].map(([k, ph, t]) => (
                <input key={k} required type={t} placeholder={ph} value={form[k]}
                  onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                  style={{ ...inputSt }} />
              ))}
              <textarea placeholder="Your Query or Message" value={form.message} rows={3}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                style={{ ...inputSt, resize: "vertical" }} />
              <button type="submit" className="nw-btn-submit"
                style={{ width: "100%", padding: "13px", borderRadius: "12px",
                  background: loading ? "#93B5CC"
                    : `linear-gradient(135deg,${C.navy},${C.teal})`,
                  color: "#fff", border: "none", fontWeight: 700,
                  fontSize: "0.92rem", fontFamily: "'DM Sans', sans-serif",
                  cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Sending…" : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Popup Consultation Form ──────────────────────────────────────────────────
function PopupForm({ onClose }) {
  const [form, setForm]       = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, {
        name: form.name, phone: form.phone, email: form.email,
        service: form.service || "General Enquiry",
        message: form.message || "No message",
      }, EMAILJS.key);
      await addDoc(collection(db, "contacts"), {
        ...form, source: "popup", status: "pending", createdAt: new Date(),
      });
      setSent(true);
    } catch { alert("Something went wrong. Please try again."); }
    setLoading(false);
  };

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(13,31,51,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px", animation: "popupIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <style>{GLOBAL_CSS}</style>
      <div onClick={(e) => e.stopPropagation()} className="nw-popup-grid"
        style={{ background: "#fff", width: "100%", maxWidth: "880px",
          maxHeight: "92vh", overflowY: "auto", borderRadius: "24px",
          boxShadow: "0 32px 80px rgba(13,31,51,0.35)", border: "1px solid rgba(255,255,255,0.8)" }}>

        {/* Left Visual Panel */}
        <div className="nw-popup-left"
          style={{ 
            background: "linear-gradient(150deg, #050c16 0%, #0c203b 55%, #14355a 100%)",
            borderRadius: "24px 0 0 24px", 
            padding: "44px 36px",
            position: "relative", 
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
          {/* Subtle Abstract Grid Mesh */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(47,164,199,0.12) 1px, transparent 0)",
            backgroundSize: "24px 24px",
            opacity: 0.8,
            pointerEvents: "none"
          }} />
          
          {/* Pulsing Ambient Blur Circles */}
          <div className="pulse-blob-1" style={{ 
            position: "absolute", top: "-20px", right: "-20px",
            width: "160px", height: "160px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(47,164,199,0.2) 0%, transparent 70%)", 
            filter: "blur(20px)",
            pointerEvents: "none" 
          }} />
          <div className="pulse-blob-2" style={{ 
            position: "absolute", bottom: "-30px", left: "-30px",
            width: "160px", height: "160px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,80,0.12) 0%, transparent 70%)", 
            filter: "blur(20px)",
            pointerEvents: "none" 
          }} />

          <div style={{ position: "relative", zIndex: 10 }}>
            {/* Tightly Integrated Glass Brand Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ 
                width: "36px", height: "36px", borderRadius: "10px", 
                background: "rgba(255,255,255,0.08)", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
              }}>
                <img src="/logo.png" alt="Logo" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
              </div>
              <div style={{ 
                display: "inline-block",
                background: "linear-gradient(135deg,#C8A96E 0%,#F3E7C4 50%,#C8A96E 100%)",
                backgroundSize: "200% auto", 
                animation: "shimmerGold 3s linear infinite",
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, 
                fontSize: "1.15rem", 
                letterSpacing: "0.5px" 
              }}>
                NxtWeave
              </div>
            </div>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff",
              fontSize: "1.6rem", fontWeight: 900, lineHeight: 1.25, marginBottom: "14px" }}>
              Let's Build Your<br />Business Together
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem",
              lineHeight: 1.7, marginBottom: "28px", fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}>
              Talk to our experts for free — we will guide you on the best path forward with zero obligation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Trusted by businesses across India and globally",
                "Transparent pricing — no hidden charges, ever",
                "Dedicated expert with 24-hour response time",
                "End-to-end support from day one to delivery"].map((item) => (
                <div key={item} 
                  style={{ 
                    display: "flex", alignItems: "center", gap: "12px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s"
                  }}
                  className="nw-bullet-pill"
                >
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%",
                    background: "rgba(76,175,80,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#4CAF50", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <span style={{ color: "rgba(255,255,255,0.8)",
                    fontSize: "0.8rem", fontWeight: 400, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px", marginTop: "32px", position: "relative", zIndex: 10 }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem",
              marginBottom: "12px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Connect with us</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" className="nw-social-pill"
                style={{ 
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 16px", borderRadius: "10px",
                  background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.25)",
                  color: "#25D366", fontSize: "0.75rem", fontWeight: 600,
                  textDecoration: "none", transition: "all 0.3s"
                }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-11.336c-.075-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.667.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.667-1.609-.914-2.203-.242-.581-.487-.502-.668-.511-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                WhatsApp
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="nw-social-pill"
                style={{ 
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 16px", borderRadius: "10px",
                  background: "rgba(225,48,108,0.08)", border: "1px solid rgba(225,48,108,0.25)",
                  color: "#E1306C", fontSize: "0.75rem", fontWeight: 600,
                  textDecoration: "none", transition: "all 0.3s"
                }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="nw-social-pill"
                style={{ 
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 16px", borderRadius: "10px",
                  background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.25)",
                  color: "#0A66C2", fontSize: "0.75rem", fontWeight: 600,
                  textDecoration: "none", transition: "all 0.3s"
                }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel Form */}
        <div style={{ padding: "40px 36px", position: "relative" }}>
          <button onClick={onClose}
            style={{ position: "absolute", top: "18px", right: "20px",
              background: "rgba(13,31,51,0.05)", border: "none",
              width: "36px", height: "36px", borderRadius: "50%",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="nw-close-btn"
            aria-label="Close dialog">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: C.navy }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {sent ? (
            <div style={{ display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              minHeight: "300px", textAlign: "center" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "26px", marginBottom: "20px", color: "#fff",
                boxShadow: "0 8px 24px rgba(76,175,80,0.35)" }}>✓</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif",
                color: C.navy, fontWeight: 700, fontSize: "1.3rem", marginBottom: "8px" }}>
                Request Sent Successfully</h3>
              <p style={{ color: C.muted, fontSize: "0.85rem",
                lineHeight: 1.7, fontWeight: 300 }}>
                Our team will contact you within 24 hours.</p>
              <button onClick={onClose}
                style={{ marginTop: "24px", padding: "10px 28px", borderRadius: "10px",
                  background: C.navy, color: "#fff", border: "none",
                  fontWeight: 600, cursor: "pointer", fontSize: "0.85rem",
                  fontFamily: "'DM Sans', sans-serif" }}>Close</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "'Playfair Display', serif",
                color: C.navy, fontWeight: 700, fontSize: "1.3rem", marginBottom: "6px" }}>
                Get Free Consultation</h3>
              <p style={{ color: C.muted, fontSize: "0.8rem",
                marginBottom: "22px", fontWeight: 300 }}>
                Fill the form and our expert will call you back.</p>
              <form onSubmit={submit}
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                className="nw-li">
                {[["name", "Full Name", "text"], ["phone", "Phone Number", "tel"],
                  ["email", "Email Address", "email"]].map(([k, ph, t]) => (
                  <input key={k} required type={t} placeholder={ph} value={form[k]}
                    onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                    onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                    style={{ ...inputSt }} />
                ))}
                
                {/* Custom Chevron Select Container */}
                <div style={{ position: "relative", width: "100%" }}>
                  <select value={form.service}
                    onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
                    style={{ ...inputSt, paddingRight: "40px", color: form.service ? C.navy : "#8FA3B4", cursor: "pointer" }}
                    onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                    onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}>
                    <option value="">Select Service</option>
                    <option>Business Registration</option>
                    <option>Compliance and Certifications</option>
                    <option>Digital Solutions</option>
                    <option>Digital Marketing</option>
                    <option>Government Schemes</option>
                  </select>
                  <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8FA3B4", display: "flex", alignItems: "center" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <textarea placeholder="Your Query or Message" value={form.message} rows={3}
                  onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                  onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                  style={{ ...inputSt, resize: "vertical" }} />
                <button type="submit" disabled={loading} className="nw-btn-submit"
                  style={{ width: "100%", padding: "14px", borderRadius: "12px",
                    background: loading ? "#93B5CC"
                      : `linear-gradient(135deg,${C.navy},${C.teal})`,
                    color: "#fff", border: "none", fontWeight: 700, fontSize: "0.95rem",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Sending…" : "Book Free Consultation"}
                </button>
                <p style={{ color: "#93B5CC", fontSize: "0.7rem",
                  textAlign: "center", fontWeight: 300 }}>
                  By submitting, you agree to our Terms and Privacy Policy.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Back To Top Button Component ─────────────────────────────────────────────
function BackToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{ position: "fixed", bottom: "88px", right: "24px", zIndex: 40,
        width: "44px", height: "44px", borderRadius: "12px", border: "none",
        cursor: "pointer",
        background: `linear-gradient(135deg,${C.navy},${C.teal})`,
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(30,58,95,0.32)",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: vis ? "all" : "none" }}>
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  );
}


// ─── How It Works / Process Section Component ─────────────────────────────────
function ProcessSection() {
  return (
    <section id="process-section" style={{ padding: "80px 0", background: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Light decorative orb */}
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(47,164,199,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <FadeUp>
          <SectionTitle title="How It Works" sub="Our transparent 4-step execution roadmap to launch and manage your corporate presence." />
        </FadeUp>

        <div className="nw-scheme-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "28px", marginTop: "40px" }}>
          {PROCESS_STEPS.map((item, idx) => (
            <FadeUp key={idx} delay={idx * 80}>
              <div
                style={{
                  background: "#fff",
                  border: `1.5px solid ${C.border}`,
                  borderRadius: "24px",
                  padding: "32px 24px",
                  position: "relative",
                  boxShadow: "0 4px 20px rgba(13,31,51,0.02)",
                  height: "100%",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = C.teal;
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(47,164,199,0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,31,51,0.02)";
                }}
              >
                {/* Step Number Badge */}
                <div style={{
                  position: "absolute", top: "24px", right: "24px",
                  fontFamily: "'Montserrat', sans-serif", fontSize: "2.2rem", fontWeight: 900,
                  background: "linear-gradient(135deg, rgba(30,58,95,0.04) 0%, rgba(47,164,199,0.08) 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  lineHeight: 1
                }}>
                  {item.step}
                </div>

                {/* Icon Circle */}
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: "linear-gradient(135deg, #F4F8FB, #e8f4fb)",
                  border: "1px solid #d0e8f5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "26px", marginBottom: "24px", flexShrink: 0
                }}>
                  {item.icon}
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif", color: C.navy,
                  fontWeight: 800, fontSize: "1.1rem", marginBottom: "12px", lineHeight: 1.3
                }}>
                  {item.title}
                </h3>
                
                <p style={{
                  color: C.muted, fontSize: "0.82rem", lineHeight: 1.7,
                  fontWeight: 300, flex: 1
                }}>
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who We Are Section Component ──────────────────────────────────────────────
function WhoWeAreSection() {
  const navigate = useNavigate();
  return (
    <section id="about-section" style={{ padding: "80px 0", background: C.bg }}>
      <div id="nw-about-grid"
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "64px", alignItems: "center" }}>
        <FadeUp direction="left">
          <div>
            <Tag label="Who We Are" />
            <h2 style={{ fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900,
              color: C.navy, lineHeight: 1.2, marginBottom: "20px" }}>
              Your Trusted Partner for<br />
              <span style={{ color: C.teal }}>Business Growth and Compliance</span>
            </h2>
            <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.8,
              marginBottom: "14px", fontWeight: 300 }}>
              NxtWeave Solutions is a modern business consulting and digital solutions
              company dedicated to helping startups, MSMEs, entrepreneurs, NGOs and
              enterprises establish, grow and scale successfully.
            </p>
            <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.8,
              marginBottom: "28px", fontWeight: 300 }}>
              We deliver complete end-to-end support — business registration,
              certifications, compliance consulting, digital infrastructure and
              online growth solutions — all under one roof.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "14px", marginBottom: "28px" }} className="nw-scheme-grid">
              {[{ label: "Our Mission",
                  text: "To empower entrepreneurs with transparent, reliable and professional consulting that drives real business growth." },
                { label: "Our Vision",
                  text: "To become a globally trusted consulting and digital solutions company that helps businesses build unshakeable foundations." },
              ].map((item) => (
                <div key={item.label}
                  style={{ background: "#fff", padding: "18px",
                    borderRadius: "14px", border: `1px solid ${C.border}`,
                    boxShadow: "0 1px 8px rgba(30,58,95,0.05)" }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif",
                    color: C.navy, fontWeight: 700, fontSize: "0.88rem",
                    marginBottom: "7px" }}>{item.label}</h4>
                  <p style={{ color: C.muted, fontSize: "0.79rem",
                    lineHeight: 1.7, fontWeight: 300 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/about")}
              style={{ padding: "12px 28px", borderRadius: "50px",
                background: C.navy, color: "#fff", border: "none",
                fontWeight: 600, fontSize: "0.87rem", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s" }}
              onMouseOver={(e) => e.currentTarget.style.background = C.teal}
              onMouseOut={(e)  => e.currentTarget.style.background = C.navy}>
              More About Us
            </button>
          </div>
        </FadeUp>

        <FadeUp direction="right" delay={100}>
          <div style={{ borderRadius: "24px", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,58,95,0.18)", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              alt="NxtWeave team"
              style={{ width: "100%", height: "420px",
                objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(to top,rgba(13,31,51,0.65),transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "24px",
              left: "24px", right: "24px",
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)",
              padding: "18px 22px", borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.2)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif",
                color: "#fff", fontWeight: 700,
                fontSize: "1rem", marginBottom: "3px" }}>End-to-End Support</h3>
              <p style={{ color: "rgba(255,255,255,0.78)",
                fontSize: "0.78rem", fontWeight: 300 }}>
                From registration to digital scaling — we handle it all.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Testimonials Section Component ───────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section id="testimonials-section"
      style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <FadeUp>
          <SectionTitle title="Real Businesses. Real Results."
            sub="Trusted by clients across India and internationally." />
        </FadeUp>
        <div className="nw-testi-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 70}>
              <div style={{ background: C.bg, padding: "24px",
                borderRadius: "20px", border: `1px solid ${C.border}`,
                height: "100%", display: "flex", flexDirection: "column",
                transition: "all 0.3s" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(47,164,199,0.12)";
                  e.currentTarget.style.borderColor = C.teal;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = C.border;
                }}>
                <div style={{ display: "flex", color: "#F59E0B", marginBottom: "12px", fontSize: "14px" }}>{"★★★★★"}</div>
                <p style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.75, fontStyle: "italic", flex: 1, marginBottom: "16px", fontWeight: 300 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%",
                    background: `linear-gradient(135deg,${C.navy},${C.teal})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <p style={{ color: C.navy, fontWeight: 750, fontSize: "0.85rem" }}>{t.name}</p>
                    <p style={{ color: "#8FA3B4", fontSize: "0.74rem" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Home Core Component ──────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();

  // Bottom booking state
  const [form, setForm]       = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  // Dynamic modules states
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab]             = useState("registration");
  const [showPopup, handlePopupClose]         = usePopup();

  // Checklist categories state
  const [checklistCat, setChecklistCat] = useState("pvt-ltd");

  // Cost Estimator state
  const [estimatorChecked, setEstimatorChecked] = useState([]);
  const [estimatorSubtotal, setEstimatorSubtotal] = useState(0);
  const [estimatorDiscount, setEstimatorDiscount] = useState(0);
  const [estimatorTotal, setEstimatorTotal]       = useState(0);

  // Launch Quiz state
  const [quizStep, setQuizStep]       = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({ domain: "", revenue: "", funding: "", infra: "" });
  const [showQuizRoadmap, setShowQuizRoadmap] = useState(false);

  // Compliance Calendar state
  const [calDate, setCalDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [calSelectedDateStr, setCalSelectedDateStr] = useState("2026-05-11"); // defaults GSTR-1
  const [calSelectedDay, setCalSelectedDay] = useState(11);
  const [calSelectedMonthYear, setCalSelectedMonthYear] = useState("May 2026");

  // Active bubble state for sequential conversation loop
  const [activeBubble, setActiveBubble] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBubble((prev) => {
        if (prev === 5) return 1;
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // EmailJS initialization
  useEffect(() => { emailjs.init(EMAILJS.key); }, []);

  // Bottom form submit
  const submitStrategySession = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, {
        name: form.name, phone: form.phone, email: form.email,
        service: form.service || "General Strategic Inquiry",
        message: form.message || "No message provided",
      }, EMAILJS.key);
      await addDoc(collection(db, "contacts"), {
        ...form, source: "bottom-booking", status: "pending", createdAt: new Date(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // Cost Estimator checkbox toggle
  const toggleEstimatorOption = (val, name, price) => {
    const isChecked = estimatorChecked.some(item => item.val === val);
    let updated;
    if (isChecked) {
      updated = estimatorChecked.filter(item => item.val !== val);
    } else {
      updated = [...estimatorChecked, { val, name, price }];
    }
    setEstimatorChecked(updated);

    // Calculate subtotal
    const sub = updated.reduce((acc, curr) => acc + curr.price, 0);
    setEstimatorSubtotal(sub);

    // Bundle Discount (10% off for 3 or more services)
    const disc = updated.length >= 3 ? Math.round(sub * 0.1) : 0;
    setEstimatorDiscount(disc);

    setEstimatorTotal(sub - disc);
  };

  const removeEstimatorOption = (val) => {
    const updated = estimatorChecked.filter(item => item.val !== val);
    setEstimatorChecked(updated);
    const sub = updated.reduce((acc, curr) => acc + curr.price, 0);
    setEstimatorSubtotal(sub);
    const disc = updated.length >= 3 ? Math.round(sub * 0.1) : 0;
    setEstimatorDiscount(disc);
    setEstimatorTotal(sub - disc);
  };

  // Pre-fill estimator bundle options to standard bottom form
  const applyEstimatorBundle = () => {
    if (estimatorChecked.length === 0) {
      alert("Please select at least one service from the package options to build your bundle!");
      return;
    }
    const names = estimatorChecked.map(item => item.name).join(", ");
    setForm(p => ({
      ...p,
      service: "multiple",
      message: `Hi, I just configured my custom package on the Cost Estimator and want to book the following bundle: ${names}. (Estimated Grand Total: ₹${estimatorTotal.toLocaleString("en-IN")}). Please review and schedule my session.`
    }));
    
    // Smooth scroll to bottom strategic booking form
    const bookingSec = document.getElementById("booking-section");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Quiz selections toggle
  const selectQuizOption = (step, val) => {
    const key = step === 1 ? "domain" : step === 2 ? "revenue" : step === 3 ? "funding" : "infra";
    setQuizAnswers(p => ({ ...p, [key]: val }));
  };

  // Quiz outcome roadmap rendering helpers
  const getQuizRoadmap = () => {
    const steps = [];

    // Step 1 advice
    if (quizAnswers.funding === "seeking-funding" || quizAnswers.domain === "saas") {
      steps.push({
        num: 1,
        title: "Incorporate Private Limited Company (Pvt Ltd)",
        desc: "Essential structure to scale equity shares allocation for co-founders/VCS, secure trademarks & patents, and build unshakeable business credentials."
      });
    } else if (quizAnswers.funding === "partners") {
      steps.push({
        num: 1,
        title: "Register Limited Liability Partnership (LLP)",
        desc: "Best structure to co-pool co-founders assets while retaining low legal compliance and minimal audits audit load."
      });
    } else {
      steps.push({
        num: 1,
        title: "Sole Proprietorship / One Person Company (OPC)",
        desc: "Preserves 100% decision and shareholding control with complete liability safeguard updates."
      });
    }

    // Step 2 advice
    if (quizAnswers.revenue === "under20" && quizAnswers.domain !== "ecommerce") {
      steps.push({
        num: 2,
        title: "MSME Udyam Certification & Voluntary GST",
        desc: "GST threshold limits are 20L services / 40L goods, but voluntary enrollment unlocks elite corporate B2B contracts. MSME status grants priority interest loans."
      });
    } else {
      steps.push({
        num: 2,
        title: "Mandatory GST Setup & Recurring Returns",
        desc: "Crucial for immediate setup since your turnover projections cross threshold levels, or you trade inter-state (e-commerce)."
      });
    }

    // Step 3 advice
    if (quizAnswers.domain === "saas" || quizAnswers.domain === "ecommerce") {
      steps.push({
        num: 3,
        title: "Trademark Protection (Class 9/42) & ISO Security",
        desc: "Legally secure your brand domain identity immediately. ISO audits establish unshakeable B2B user trust."
      });
    } else {
      steps.push({
        num: 3,
        title: "Trademark Registration & Startup India Recognition",
        desc: "Grants DPIIT brand authority and unlocks 3-year absolute Income Tax exemptions eligibility schemes."
      });
    }

    // Step 4 advice
    if (quizAnswers.infra === "full-saas") {
      steps.push({
        num: 4,
        title: "Bespoke SaaS Engine & Tech Infrastructure Build",
        desc: "Deployment of high-performance modern React/Next.js systems, secure databases, APIs and traffic-optimized landing layers."
      });
    } else if (quizAnswers.infra === "comp-web") {
      steps.push({
        num: 4,
        title: "Premium Responsive Marketing Landing Page",
        desc: "Highly aesthetic modern visual structure showcasing brand messaging with smooth parallax reveals to drive organic user action."
      });
    } else {
      steps.push({
        num: 4,
        title: "Corporate Domain Setup & Business G-suite Workspace",
        desc: "Configuring official legal email mailboxes and enterprise credentials for compliance setup communications."
      });
    }

    return steps;
  };

  // Pre-fill quiz roadmap action plan to standard bottom form
  const applyQuizOutcome = () => {
    setForm(p => ({
      ...p,
      service: "multiple",
      message: `Hi, I just completed the Launch Compliance Quiz. Model: ${quizAnswers.domain || "N/A"}, Revenue Scale: ${quizAnswers.revenue || "N/A"}, Co-founders: ${quizAnswers.funding || "N/A"}, Tech Infra: ${quizAnswers.infra || "N/A"}. Please review my tailored roadmap and schedule our free strategic strategy session.`
    }));
    
    // Smooth scroll to bottom strategic booking form
    const bookingSec = document.getElementById("booking-section");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Compliance Calendar rendering logic
  const handleCalendarCellClick = (day) => {
    setCalSelectedDay(day);
    const dateStr = `2026-05-${String(day).padStart(2, "0")}`;
    setCalSelectedDateStr(dateStr);
    
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setCalSelectedDateStr(`${day} ${monthNames[calDate.getMonth()]} ${calDate.getFullYear()}`);
  };

  const getCalendarCells = () => {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    const cells = [];

    // Prev month days
    for (let i = firstDayIndex; i > 0; i--) {
      cells.push({
        day: prevLastDay - i + 1,
        isMuted: true,
        dateKey: ""
      });
    }

    // Current month days
    for (let day = 1; day <= lastDay; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      cells.push({
        day,
        isMuted: false,
        dateKey: dateStr,
        hasDeadline: !!FILING_DEADLINES[dateStr]
      });
    }

    return cells;
  };

  const handleMonthNavigation = (dir) => {
    const newMonth = calDate.getMonth() + (dir === "next" ? 1 : -1);
    const tempDate = new Date(2026, newMonth, 1);
    setCalDate(tempDate);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setCalSelectedMonthYear(`${monthNames[tempDate.getMonth()]} ${tempDate.getFullYear()}`);
  };

  // Tabs categories datasets
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
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F8FB" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ─── HERO SECTION (UPDATED: Clean background transparent PNG with 3-step conversation speech bubbles) ─── */}
      <section id="hero-section" style={{
        background: "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 65%,#142e4c 100%)",
        position: "relative", padding: "130px 0 90px", overflow: "hidden"
      }}>
        {/* Glowing Dynamic Background Orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-150px", right: "-50px", width: "500px", height: "500px",
            borderRadius: "50%", background: "radial-gradient(circle,rgba(47,164,199,0.18) 0%,transparent 70%)",
            animation: "softMove1 12s ease-in-out infinite", filter: "blur(40px)"
          }} />
          <div style={{
            position: "absolute", bottom: "-100px", left: "-100px", width: "600px", height: "600px",
            borderRadius: "50%", background: "radial-gradient(circle,rgba(76,175,80,0.12) 0%,transparent 70%)",
            animation: "softMove2 16s ease-in-out infinite", filter: "blur(60px)"
          }} />
          <div style={{
            position: "absolute", top: "30%", left: "25%", width: "260px", height: "260px",
            borderRadius: "50%", background: "radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)",
            filter: "blur(30px)"
          }} />
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginBottom: "28px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px",
                borderRadius: "50px", background: "rgba(47,164,199,0.15)", border: "1px solid rgba(47,164,199,0.35)",
                color: C.teal, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                🚀 #1 Growth Platform
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px",
                borderRadius: "50px", background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.3)",
                color: "#4ade80", fontSize: "0.7rem", fontWeight: 600 }}>
                ✓ ISO 9001:2015 Certified
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px",
                borderRadius: "50px", background: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.3)",
                color: "#e8c87e", fontSize: "0.7rem", fontWeight: 600 }}>
                ✓ 100% Online & Secure
              </div>
            </div>
          </FadeUp>

          <div id="nw-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }}>
            {/* Hero Left Content */}
            <div>
              <FadeUp delay={80}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900,
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)", lineHeight: 1.12, color: "#fff",
                  marginBottom: "24px", letterSpacing: "-1px" }}>
                  Let's Turn Your Ideas<br />
                  Into a <span style={{ background: "linear-gradient(135deg, #fff 30%, #a8c7fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Vibrant Business</span><br />
                  <span style={{ background: "linear-gradient(135deg, #2FA4C7 0%, #4CAF50 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fast & Compliant.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={160}>
                <p style={{ fontSize: "1.08rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.8, marginBottom: "28px", maxWidth: "550px", fontWeight: 300 }}>
                  From company registration (Pvt Ltd/LLP), trademarks, and corporate tax compliance, to beautiful high-performing websites, SaaS products, and custom software — we weave all legalities and technology into a single professional launchpad so you can scale with absolute peace of mind.
                </p>
              </FadeUp>

              <FadeUp delay={200}>
                {/* 🛡️ Strategic trust checkmarks */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {[
                    "🛡️ Zero Hidden Fees Guarantee — Pay only what you configure",
                    "⏱️ Fast-Track Processing — 100% online, hassle-free filings",
                    "🤵 Expert Led — Dedicated Corporate Consultants & Senior Developers"
                  ].map((chk, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.85)", fontSize: "0.86rem", fontWeight: 400 }}>
                      <span style={{ color: "#4ade80" }}>✓</span> {chk}
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={240}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "40px" }}>
                  <StatCard value="500+" label="Businesses Setup" />
                  <StatCard value="99.8%" label="Filing Accuracy" />
                  <StatCard value="Global" label="Consulting Reach" />
                </div>
              </FadeUp>

              <FadeUp delay={300}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
                  <button onClick={() => {
                    const estSec = document.getElementById("estimator");
                    if (estSec) estSec.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                    style={{ background: `linear-gradient(135deg, ${C.green}, #2E7D32)`, color: "#fff", border: "none",
                      padding: "16px 36px", borderRadius: "50px", fontWeight: 700, fontSize: "0.92rem",
                      cursor: "pointer", boxShadow: "0 6px 20px rgba(76,175,80,0.4)", transition: "all 0.3s",
                      fontFamily: "'DM Sans', sans-serif" }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "none"; }}>
                    Configure Bundle Setup
                  </button>
                  <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px",
                      borderRadius: "50px", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)",
                      color: "#4ade80", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.3s" }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.25)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.15)"; }}>
                    Connect With Expert
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Hero Right Visual Column - Copied transparent clean PNG characters with sequential staggered chats */}
            <FadeUp delay={200} direction="right">
              <div className="nw-hero-visual" style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: "440px" }}>
                  
                  {/* 💬 Bubble 1: Speaks First (Visible only when activeBubble === 1) */}
                  <div className="nw-bubble-left-1" style={{
                    position: "absolute", top: "0%", left: "-32%", background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 25px rgba(13,31,51,0.14)", padding: "12px 18px", borderRadius: "18px",
                    fontSize: "0.82rem", fontWeight: 600, color: C.navy, zIndex: 25, maxWidth: "220px",
                    opacity: activeBubble === 1 ? 1 : 0,
                    transform: activeBubble === 1 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    pointerEvents: activeBubble === 1 ? "auto" : "none"
                  }}>
                    We want to launch our startup! How do we handle registration, GST, and trademarks? 🚀
                    <div className="nw-bubble-tail-left-1" style={{
                      position: "absolute", right: "24px", bottom: "-6px", transform: "rotate(45deg)",
                      width: "12px", height: "12px", background: "rgba(255, 255, 255, 0.95)",
                      borderRight: "1px solid rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)"
                    }} />
                  </div>

                  {/* 💡 Bubble 2: Replies Second (Visible only when activeBubble === 2) */}
                  <div className="nw-bubble-right-2" style={{
                    position: "absolute", top: "5%", right: "-32%", background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 25px rgba(13,31,51,0.14)", padding: "12px 18px", borderRadius: "18px",
                    fontSize: "0.82rem", fontWeight: 600, color: C.navy, zIndex: 25, maxWidth: "230px",
                    opacity: activeBubble === 2 ? 1 : 0,
                    transform: activeBubble === 2 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    pointerEvents: activeBubble === 2 ? "auto" : "none"
                  }}>
                    NxtWeave will handle your corporate registration, licensing, and legal compliance end-to-end! 💼
                    <div className="nw-bubble-tail-right-2" style={{
                      position: "absolute", left: "24px", bottom: "-6px", transform: "rotate(45deg)",
                      width: "12px", height: "12px", background: "rgba(255, 255, 255, 0.95)",
                      borderLeft: "1px solid rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)"
                    }} />
                  </div>

                  {/* 💻 Bubble 3: Speaks Third (Visible only when activeBubble === 3) */}
                  <div className="nw-bubble-left-3" style={{
                    position: "absolute", top: "0%", left: "-32%", background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 25px rgba(13,31,51,0.14)", padding: "12px 18px", borderRadius: "18px",
                    fontSize: "0.82rem", fontWeight: 600, color: C.navy, zIndex: 25, maxWidth: "215px",
                    opacity: activeBubble === 3 ? 1 : 0,
                    transform: activeBubble === 3 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    pointerEvents: activeBubble === 3 ? "auto" : "none"
                  }}>
                    What about our tech? We also need a modern website and mobile app to launch. 💻
                    <div className="nw-bubble-tail-left-3" style={{
                      position: "absolute", right: "24px", bottom: "-6px", transform: "rotate(45deg)",
                      width: "12px", height: "12px", background: "rgba(255, 255, 255, 0.95)",
                      borderRight: "1px solid rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)"
                    }} />
                  </div>

                  {/* 🚀 Bubble 4: Replies Fourth (Visible only when activeBubble === 4) */}
                  <div className="nw-bubble-right-4" style={{
                    position: "absolute", top: "5%", right: "-32%", background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 25px rgba(13,31,51,0.14)", padding: "12px 18px", borderRadius: "18px",
                    fontSize: "0.82rem", fontWeight: 600, color: C.navy, zIndex: 25, maxWidth: "230px",
                    opacity: activeBubble === 4 ? 1 : 0,
                    transform: activeBubble === 4 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    pointerEvents: activeBubble === 4 ? "auto" : "none"
                  }}>
                    Our experienced software engineering team will build your custom website, portal, and mobile apps! 🚀
                    <div className="nw-bubble-tail-right-4" style={{
                      position: "absolute", left: "24px", bottom: "-6px", transform: "rotate(45deg)",
                      width: "12px", height: "12px", background: "rgba(255, 255, 255, 0.95)",
                      borderLeft: "1px solid rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)"
                    }} />
                  </div>

                  {/* 🎉 Bubble 5: Responds Fifth (Visible only when activeBubble === 5) */}
                  <div className="nw-bubble-left-5" style={{
                    position: "absolute", top: "0%", left: "-32%", background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 10px 25px rgba(13,31,51,0.14)", padding: "12px 18px", borderRadius: "18px",
                    fontSize: "0.82rem", fontWeight: 600, color: C.navy, zIndex: 25, maxWidth: "215px",
                    opacity: activeBubble === 5 ? 1 : 0,
                    transform: activeBubble === 5 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    pointerEvents: activeBubble === 5 ? "auto" : "none"
                  }}>
                    Amazing! A single professional platform for both legal compliance and digital tech is a lifesaver. 🎉
                    <div className="nw-bubble-tail-left-5" style={{
                      position: "absolute", right: "24px", bottom: "-6px", transform: "rotate(45deg)",
                      width: "12px", height: "12px", background: "rgba(255, 255, 255, 0.95)",
                      borderRight: "1px solid rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)"
                    }} />
                  </div>

                  {/* Clean Background Transparent Characters png */}
                  <div style={{
                    position: "relative", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "end",
                    animation: "floatChar 7s ease-in-out infinite"
                  }}>
                    <img
                      src="/hero-characters.png"
                      alt="NxtWeave Business Advisors"
                      style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 20px 40px rgba(13,31,51,0.22))" }}
                    />
                  </div>

                  {/* Quality Badge Left */}
                  <div style={{
                    position: "absolute", bottom: "16%", left: "-10%", display: "flex", alignItems: "center", gap: "6px",
                    background: "#fff", padding: "10px 18px", borderRadius: "50px", fontWeight: 700, fontSize: "0.74rem",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)", border: "1px solid rgba(30,58,95,0.05)", zIndex: 25, color: "#1b5e20"
                  }}>
                    <span style={{ color: C.green }}>✓</span> 100% Secure & Compliant
                  </div>

                  {/* Quality Badge Right */}
                  <div style={{
                    position: "absolute", bottom: "-4%", right: "-2%", display: "flex", alignItems: "center", gap: "6px",
                    background: "#fff", padding: "10px 18px", borderRadius: "50px", fontWeight: 700, fontSize: "0.74rem",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)", border: "1px solid rgba(30,58,95,0.05)", zIndex: 25, color: C.navy
                  }}>
                    <span style={{ color: C.teal }}>✓</span> Automated Tax Filing
                  </div>

                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <WhoWeAreSection />

      {/* ─── HOW IT WORKS (NEW) ─── */}
      <ProcessSection />

      {/* ─── SERVICES MODULE ─── */}
      <section id="services" style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Our Core Services" sub="Complete corporate consulting, licensing, and digital automation capabilities." />
          </FadeUp>

          {/* Navigation Category Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 24px", borderRadius: "50px", fontWeight: 600, fontSize: "0.84rem",
                  border: "1.5px solid", cursor: "pointer", transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                  ...(activeTab === tab.key
                    ? { background: C.navy, color: "#fff", borderColor: C.navy, boxShadow: "0 4px 16px rgba(30,58,95,0.2)" }
                    : { background: "#fff", color: C.muted, borderColor: C.border })
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Category List */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {tabServices[activeTab].map((s, idx) => (
              <FadeUp key={`${activeTab}-${idx}`} delay={idx * 60}>
                <ServiceCard icon={s.icon} title={s.title} desc={s.desc} onClick={() => setSelectedService(s)} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DYNAMIC COST ESTIMATOR & HIGH-FIDELITY INVOICE RECEIPT (Amount Section Polished) ─── */}
      <section id="estimator" style={{ padding: "80px 0", background: C.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Build Your Custom Growth Package"
              sub="Select the company formations, licensing setups, and digital tools you need. View a high-fidelity invoice calculation in real-time." />
          </FadeUp>

          <div className="nw-estimator-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px", alignItems: "start" }}>
            {/* Options Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              
              {/* Category Group 1 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1.5px solid ${C.border}`, paddingBottom: "8px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.15rem" }}>Corporate Formations</h3>
                  <span style={{ fontSize: "0.76rem", color: C.muted, fontWeight: 500 }}>Select legal entity type</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="nw-why-grid">
                  {[[ "pvt-ltd", "🏢 Pvt Ltd Registration", 7999 ],
                    [ "llp", "🤝 LLP Registration Setup", 5499 ],
                    [ "opc", "👤 One Person Company (OPC)", 6499 ],
                    [ "startup-india", "🚀 Startup India DPIIT Setup", 2999 ]].map(([v, n, p]) => {
                      const active = estimatorChecked.some(item => item.val === v);
                      return (
                        <div key={v} onClick={() => toggleEstimatorOption(v, n, p)}
                          style={{
                            padding: "18px", background: active ? "#eef7fb" : "#fff",
                            border: `1.5px solid ${active ? C.teal : C.border}`, borderRadius: "16px",
                            cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                            boxShadow: active ? "0 4px 16px rgba(47,164,199,0.08)" : "none", transition: "all 0.25s"
                          }}>
                          <div>
                            <div style={{ fontSize: "0.84rem", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>{n}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: C.teal }}>₹{p.toLocaleString("en-IN")}</div>
                          </div>
                          <span style={{ width: "20px", height: "20px", borderRadius: "50%",
                            border: `2px solid ${active ? C.teal : "#b0c4de"}`, background: active ? C.teal : "none",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: "10px", fontWeight: 700 }}>{active ? "✓" : ""}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Category Group 2 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1.5px solid ${C.border}`, paddingBottom: "8px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.15rem" }}>Compliance & Protection</h3>
                  <span style={{ fontSize: "0.76rem", color: C.muted, fontWeight: 500 }}>Select licensing certifications</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="nw-why-grid">
                  {[[ "gst-reg", "🧾 GST Registration Filing", 1499 ],
                    [ "trademark", "™️ Trademark Search & Class", 4999 ],
                    [ "iso", "🏅 ISO 9001 quality audit", 8999 ],
                    [ "msme", "🏭 MSME Udyam Enrollment", 999 ]].map(([v, n, p]) => {
                      const active = estimatorChecked.some(item => item.val === v);
                      return (
                        <div key={v} onClick={() => toggleEstimatorOption(v, n, p)}
                          style={{
                            padding: "18px", background: active ? "#eef7fb" : "#fff",
                            border: `1.5px solid ${active ? C.teal : C.border}`, borderRadius: "16px",
                            cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                            boxShadow: active ? "0 4px 16px rgba(47,164,199,0.08)" : "none", transition: "all 0.25s"
                          }}>
                          <div>
                            <div style={{ fontSize: "0.84rem", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>{n}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: C.teal }}>₹{p.toLocaleString("en-IN")}</div>
                          </div>
                          <span style={{ width: "20px", height: "20px", borderRadius: "50%",
                            border: `2px solid ${active ? C.teal : "#b0c4de"}`, background: active ? C.teal : "none",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: "10px", fontWeight: 700 }}>{active ? "✓" : ""}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Category Group 3 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1.5px solid ${C.border}`, paddingBottom: "8px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.15rem" }}>Tech Infrastructures</h3>
                  <span style={{ fontSize: "0.76rem", color: C.muted, fontWeight: 500 }}>Select digital development solutions</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="nw-why-grid">
                  {[[ "web-landing", "💻 Premium React Landing Page", 14999 ],
                    [ "custom-app", "⚙️ Custom SaaS Web Application", 39999 ],
                    [ "seo-marketing", "📈 Premium SEO & Social growth Pack", 9999 ]].map(([v, n, p]) => {
                      const active = estimatorChecked.some(item => item.val === v);
                      return (
                        <div key={v} onClick={() => toggleEstimatorOption(v, n, p)}
                          style={{
                            padding: "18px", background: active ? "#eef7fb" : "#fff",
                            border: `1.5px solid ${active ? C.teal : C.border}`, borderRadius: "16px",
                            cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                            boxShadow: active ? "0 4px 16px rgba(47,164,199,0.08)" : "none", transition: "all 0.25s"
                          }}>
                          <div>
                            <div style={{ fontSize: "0.84rem", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>{n}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: C.teal }}>₹{p.toLocaleString("en-IN")}</div>
                          </div>
                          <span style={{ width: "20px", height: "20px", borderRadius: "50%",
                            border: `2px solid ${active ? C.teal : "#b0c4de"}`, background: active ? C.teal : "none",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: "10px", fontWeight: 700 }}>{active ? "✓" : ""}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>

            {/* High-Fidelity Glassmorphic Invoice Receipt Panel */}
            <div style={{
              background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(24px)",
              borderRadius: "24px", padding: "32px", border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 12px 40px rgba(13,31,51,0.08)", position: "sticky", top: "100px"
            }}>
              
              {/* Receipt Header Decorator */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  Invoice Statement
                </div>
                <div style={{ fontSize: "0.68rem", color: C.muted, fontWeight: 500 }}>
                  Est. ID: NW-{(estimatorSubtotal % 9999).toString().padStart(4, "0")}
                </div>
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy,
                fontWeight: 900, fontSize: "1.3rem", borderBottom: `1.5px dashed ${C.border}`,
                paddingBottom: "16px", marginBottom: "20px" }}>Configure Summary</h3>

              {estimatorChecked.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: C.muted, fontSize: "0.82rem", lineHeight: 1.6 }}>
                  Select one or more professional setup modules on the left to generate your custom business statement details.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                  {estimatorChecked.map((item) => (
                    <div key={item.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", maxWidth: "80%" }}>
                        <button onClick={() => removeEstimatorOption(item.val)}
                          style={{ background: "none", border: "none", color: "#e11d48", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>
                          &times;
                        </button>
                        <span style={{ color: C.navy, fontWeight: 600 }}>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: C.navy }}>₹{item.price.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Dotted border separator */}
              <div style={{ borderTop: `1.5px dashed ${C.border}`, paddingTop: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", color: C.muted, marginBottom: "8px" }}>
                  <span>Subtotal</span>
                  <span>₹{estimatorSubtotal.toLocaleString("en-IN")}</span>
                </div>
                {estimatorDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", color: C.green, fontWeight: 700, marginBottom: "8px" }}>
                    <span>Bundle Discount (10% Off)</span>
                    <span>-₹{estimatorDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                
                {/* Invoice Footer Disclaimer */}
                <div style={{ background: "rgba(30, 58, 95, 0.04)", borderRadius: "8px", padding: "10px 14px", margin: "14px 0", fontSize: "0.72rem", color: C.muted, lineHeight: 1.45 }}>
                  ⚠️ **Filing Disclaimer**: Rates are starting professional consulting packages. Government application fees and local taxes are additional.
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: "12px", marginTop: "4px" }}>
                  <span style={{ color: C.navy, fontWeight: 900, fontSize: "0.94rem" }}>Grand Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: C.teal, fontWeight: 900, fontSize: "1.45rem" }}>
                    ₹{estimatorTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button onClick={applyEstimatorBundle}
                style={{ width: "100%", padding: "14px", borderRadius: "12px",
                  background: `linear-gradient(135deg,${C.navy},${C.teal})`,
                  color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem",
                  marginTop: "20px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Book Dynamic Invoice Bundle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE STARTUP COMPLIANCE & LAUNCH QUIZ ─── */}
      <section id="quiz" style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Launch Compliance Quiz"
              sub="Answer 4 quick business query check points to evaluate eligible company structures and digital security requirements." />
          </FadeUp>

          <div style={{ background: "#fff", borderRadius: "24px", padding: "48px",
            boxShadow: "0 10px 40px rgba(13,31,51,0.06)", border: `1.5px solid ${C.border}`,
            maxWidth: "880px", margin: "0 auto", position: "relative", overflow: "hidden" }}>
            
            {/* Progress Bar */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "6px", background: "rgba(13,31,51,0.03)" }}>
              <div style={{ height: "100%", width: `${(quizStep / 4) * 100}%`,
                background: `linear-gradient(to right, ${C.navy}, ${C.teal})`, transition: "width 0.4s ease" }} />
            </div>

            {!showQuizRoadmap ? (
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Step 1 */}
                {quizStep === 1 && (
                  <div style={{ animation: "popupIn 0.35s ease" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 900, fontSize: "1.3rem", marginBottom: "28px" }}>
                      1. What is your primary venture business model / domain?
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="nw-why-grid">
                      {[{ v: "saas", i: "💻", t: "SaaS & Custom Tech Platforms", d: "Building subscription SaaS models, cloud APIs, web/mobile applications." },
                        { v: "ecommerce", i: "🛒", t: "E-commerce & Retail Products", d: "Selling physical items online via direct stores or marketplace sites." },
                        { v: "services", i: "🤝", t: "Agency, Consulting & Services", d: "Providing strategic consulting, creative works, legal agency solutions." },
                        { v: "ngo", i: "🌱", t: "NGO & Social Organization", d: "Charitable foundations, non-profits, trust bodies and welfare programs." }].map((o) => (
                        <div key={o.v} onClick={() => selectQuizOption(1, o.v)}
                          style={{
                            padding: "20px", borderRadius: "16px", border: `1.5px solid ${quizAnswers.domain === o.v ? C.teal : C.border}`,
                            background: quizAnswers.domain === o.v ? "#eef7fb" : "#fff", cursor: "pointer", transition: "all 0.25s"
                          }}>
                          <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{o.i}</div>
                          <div style={{ fontSize: "0.88rem", fontWeight: 750, color: C.navy, marginBottom: "4px" }}>{o.t}</div>
                          <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.4, fontWeight: 300 }}>{o.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {quizStep === 2 && (
                  <div style={{ animation: "popupIn 0.35s ease" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 900, fontSize: "1.3rem", marginBottom: "28px" }}>
                      2. What is your projected annual turnover / revenue scale?
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="nw-why-grid">
                      {[{ v: "under20", i: "🌱", t: "Under ₹20 Lakhs", d: "Early bootstrap side project phase or testing market validation." },
                        { v: "20to40", i: "📈", t: "₹20 Lakhs to ₹40 Lakhs", d: "Scaling phase ready to touch mandatory state GST registration limits." },
                        { v: "over40", i: "🚀", t: "Over ₹40 Lakhs", d: "Established enterprise level operations requiring strategic yearly taxes audits." }].map((o) => (
                        <div key={o.v} onClick={() => selectQuizOption(2, o.v)}
                          style={{
                            padding: "20px", borderRadius: "16px", border: `1.5px solid ${quizAnswers.revenue === o.v ? C.teal : C.border}`,
                            background: quizAnswers.revenue === o.v ? "#eef7fb" : "#fff", cursor: "pointer", transition: "all 0.25s"
                          }}>
                          <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{o.i}</div>
                          <div style={{ fontSize: "0.88rem", fontWeight: 750, color: C.navy, marginBottom: "4px" }}>{o.t}</div>
                          <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.4, fontWeight: 300 }}>{o.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {quizStep === 3 && (
                  <div style={{ animation: "popupIn 0.35s ease" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 900, fontSize: "1.3rem", marginBottom: "28px" }}>
                      3. What is your co-founders / cap structure?
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="nw-why-grid">
                      {[{ v: "bootstrapped", i: "💪", t: "Bootstrapped / Single Owner", d: "100% decision-making control and sole capital pool ownership." },
                        { v: "partners", i: "👥", t: "Multiple Co-founders", d: "Pooling assets and operations with structured co-owners regulations." },
                        { v: "seeking-funding", i: "💰", t: "VC / Angel Investors Seeking", d: "Planning to dilute equity shares in exchange for venture scaling capital." }].map((o) => (
                        <div key={o.v} onClick={() => selectQuizOption(3, o.v)}
                          style={{
                            padding: "20px", borderRadius: "16px", border: `1.5px solid ${quizAnswers.funding === o.v ? C.teal : C.border}`,
                            background: quizAnswers.funding === o.v ? "#eef7fb" : "#fff", cursor: "pointer", transition: "all 0.25s"
                          }}>
                          <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{o.i}</div>
                          <div style={{ fontSize: "0.88rem", fontWeight: 750, color: C.navy, marginBottom: "4px" }}>{o.t}</div>
                          <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.4, fontWeight: 300 }}>{o.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {quizStep === 4 && (
                  <div style={{ animation: "popupIn 0.35s ease" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 900, fontSize: "1.3rem", marginBottom: "28px" }}>
                      4. What is your immediate digital infrastructure requirement?
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="nw-why-grid">
                      {[{ v: "just-comp", i: "📄", t: "Only Registrations Setup", d: "Filing and CA/CS registration support only. Tech stack is ready." },
                        { v: "comp-web", i: "✨", t: "Registration + Landing Page", d: "Combine registrations with a premium responsive React landing portal setup." },
                        { v: "full-saas", i: "⚡", t: "Full Bespoke SaaS Development", d: "Custom user panels, SaaS billing engines, secure database APIs integrations." }].map((o) => (
                        <div key={o.v} onClick={() => selectQuizOption(4, o.v)}
                          style={{
                            padding: "20px", borderRadius: "16px", border: `1.5px solid ${quizAnswers.infra === o.v ? C.teal : C.border}`,
                            background: quizAnswers.infra === o.v ? "#eef7fb" : "#fff", cursor: "pointer", transition: "all 0.25s"
                          }}>
                          <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{o.i}</div>
                          <div style={{ fontSize: "0.88rem", fontWeight: 750, color: C.navy, marginBottom: "4px" }}>{o.t}</div>
                          <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.4, fontWeight: 300 }}>{o.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: "24px", marginTop: "32px" }}>
                  <button type="button" onClick={() => setQuizStep(p => Math.max(1, p - 1))}
                    style={{
                      padding: "10px 24px", borderRadius: "50px", border: `1.5px solid ${C.border}`,
                      background: "none", color: C.navy, fontWeight: 600, fontSize: "0.84rem",
                      cursor: "pointer", visibility: quizStep === 1 ? "hidden" : "visible"
                    }}>
                    Back
                  </button>

                  <button type="button"
                    onClick={() => {
                      const curKey = quizStep === 1 ? "domain" : quizStep === 2 ? "revenue" : quizStep === 3 ? "funding" : "infra";
                      if (!quizAnswers[curKey]) {
                        alert("Please select one of the checklist options to continue!");
                        return;
                      }
                      if (quizStep < 4) {
                        setQuizStep(p => p + 1);
                      } else {
                        setShowQuizRoadmap(true);
                      }
                    }}
                    style={{
                      padding: "12px 28px", borderRadius: "50px", border: "none",
                      background: C.navy, color: "#fff", fontWeight: 700, fontSize: "0.84rem",
                      cursor: "pointer"
                    }}>
                    {quizStep === 4 ? "Generate Setup Plan" : "Next Option"}
                  </button>
                </div>
              </form>
            ) : (
              /* Outcome Screen */
              <div style={{ textAlign: "center", animation: "popupIn 0.35s ease" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(76,175,80,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: C.green, fontSize: "24px",
                  fontWeight: 900, margin: "0 auto 16px", border: `2px solid ${C.green}` }}>✓</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 900, fontSize: "1.45rem", marginBottom: "8px" }}>
                  Tailored Setup Plan & Growth Roadmap
                </h3>
                <p style={{ color: C.muted, fontSize: "0.85rem", marginBottom: "28px" }}>
                  Based on your quiz selections, we suggest prioritizing following corporate setups:
                </p>

                <div style={{ background: C.bg, borderRadius: "20px", padding: "28px", textAlign: "left",
                  border: `1.5px dashed ${C.border}`, maxWidth: "640px", margin: "0 auto 28px" }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 700, fontSize: "0.95rem",
                    textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Action Items Checklist</h4>
                  
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {getQuizRoadmap().map((item) => (
                      <li key={item.num} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: C.teal,
                          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                          fontSize: "10px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>{item.num}</span>
                        <div>
                          <div style={{ fontSize: "0.84rem", fontWeight: 750, color: C.navy, marginBottom: "2px" }}>{item.title}</div>
                          <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.45, fontWeight: 300 }}>{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
                  <button onClick={applyQuizOutcome}
                    style={{ padding: "12px 28px", borderRadius: "50px", border: "none",
                      background: `linear-gradient(135deg,${C.navy},${C.teal})`, color: "#fff",
                      fontWeight: 700, fontSize: "0.84rem", cursor: "pointer" }}>
                    Request Consultation on Setup Plan
                  </button>

                  <button type="button"
                    onClick={() => {
                      setQuizStep(1);
                      setQuizAnswers({ domain: "", revenue: "", funding: "", infra: "" });
                      setShowQuizRoadmap(false);
                    }}
                    style={{ padding: "10px 24px", borderRadius: "50px", border: `1.5px solid ${C.border}`,
                      background: "#fff", color: C.navy, fontWeight: 600, fontSize: "0.84rem", cursor: "pointer" }}>
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── LIVE FILING CALENDAR ─── */}
      <section id="calendar" style={{ padding: "80px 0", background: C.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Indian Compliance Calendar"
              sub="Track monthly legal and tax deadlines. Interact with clickable pink highlighted dates to view filing details." />
          </FadeUp>

          <div className="nw-calendar-layout" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "40px", alignItems: "start" }}>
            
            {/* Calendar Core Table Widget */}
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: "24px", padding: "28px",
              boxShadow: "0 10px 30px rgba(13,31,51,0.02)" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.2rem" }}>
                  {calSelectedMonthYear}
                </h3>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => handleMonthNavigation("prev")}
                    style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${C.border}`,
                      background: "#fff", cursor: "pointer", color: C.navy, fontWeight: "bold" }}>&lsaquo;</button>
                  <button onClick={() => handleMonthNavigation("next")}
                    style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${C.border}`,
                      background: "#fff", cursor: "pointer", color: C.navy, fontWeight: "bold" }}>&rsaquo;</button>
                </div>
              </div>

              {/* Days Header */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "12px" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <span key={day} style={{ fontSize: "0.74rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {day}
                  </span>
                ))}
              </div>

              {/* Calendar Grid Cells */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                {getCalendarCells().map((cell, idx) => {
                  const isSelected = cell.day === calSelectedDay && !cell.isMuted;
                  let bg = "none";
                  let color = C.navy;
                  let dot = false;

                  if (cell.isMuted) {
                    color = "#c0c4de";
                  } else if (isSelected) {
                    bg = `linear-gradient(135deg, ${C.navy} 0%, ${C.teal} 100%)`;
                    color = "#fff";
                  } else if (cell.hasDeadline) {
                    bg = "rgba(47, 164, 199, 0.08)";
                    color = C.teal;
                    dot = true;
                  }

                  return (
                    <div key={idx} onClick={() => !cell.isMuted && handleCalendarCellClick(cell.day)}
                      style={{
                        aspectRatio: "1.1", display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 700,
                        cursor: cell.isMuted ? "default" : "pointer", background: bg, color, position: "relative",
                        transition: "all 0.2s"
                      }}>
                      {cell.day}
                      {dot && !isSelected && (
                        <span style={{ position: "absolute", bottom: "6px", width: "5px", height: "5px",
                          borderRadius: "50%", background: C.teal }} />
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Sidebar Details Panel */}
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: "24px", padding: "28px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.1rem",
                display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                📅 filing obligations
              </h3>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: C.muted, borderBottom: `1.5px solid ${C.border}`,
                paddingBottom: "8px", display: "block", marginBottom: "16px" }}>
                {calSelectedDateStr}
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {!FILING_DEADLINES[`2026-05-${String(calSelectedDay).padStart(2, "0")}`] ? (
                  <div style={{ color: C.muted, fontSize: "0.8rem", textAlign: "center", padding: "20px 0" }}>
                    No legal filing deadlines registered for this date.
                  </div>
                ) : (
                  FILING_DEADLINES[`2026-05-${String(calSelectedDay).padStart(2, "0")}`].map((dl, idx) => (
                    <div key={idx} style={{ padding: "16px", background: C.bg, borderRadius: "0 14px 14px 0",
                      borderLeft: `4px solid ${C.teal}`, animation: "popupIn 0.3s ease" }}>
                      <div style={{ fontSize: "0.86rem", fontWeight: 750, color: C.navy, marginBottom: "3px" }}>{dl.name}</div>
                      <p style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.45, marginBottom: "8px", fontWeight: 300 }}>{dl.desc}</p>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", borderRadius: "4px",
                        background: "rgba(30,58,95,0.06)", color: C.navy, textTransform: "uppercase" }}>{dl.type}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── REQUIRED DOCUMENTS CHECKLIST ─── */}
      <section id="checklist" style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Required Setup Documents"
              sub="Ensure complete files checklist before submission. Filter required items based on corporate structure." />
          </FadeUp>

          {/* Checklist Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
            {[{ key: "pvt-ltd", label: "Pvt Ltd Setup" },
              { key: "llp", label: "LLP Setup" },
              { key: "gst", label: "GST Filing" },
              { key: "trademark", label: "Trademark Filings" },
              { key: "ngo", label: "NGO Registration" }].map((tab) => (
              <button key={tab.key} onClick={() => setChecklistCat(tab.key)}
                style={{
                  padding: "10px 24px", borderRadius: "50px", border: `1.5px solid ${C.border}`,
                  background: checklistCat === tab.key ? C.navy : "rgba(255,255,255,0.7)",
                  color: checklistCat === tab.key ? "#fff" : C.navy,
                  fontSize: "0.84rem", fontWeight: 700, cursor: "pointer", transition: "all 0.25s"
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Checklist Grids */}
          <div className="nw-checklist-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", maxWidth: "1080px", margin: "0 auto" }}>
            {DOCUMENT_CHECKLIST_DATA[checklistCat].map((card, idx) => (
              <div key={idx} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "20px", padding: "28px",
                boxShadow: "0 10px 25px rgba(13,31,51,0.02)", transition: "all 0.3s" }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 750, fontSize: "0.94rem",
                  display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <svg width="18" height="18" fill="none" stroke={C.teal} strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {card.title}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {card.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.8rem", color: C.muted, fontWeight: 300 }}>
                      <span style={{ color: C.teal, fontWeight: "bold" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─── */}
      <TestimonialsSection />

      {/* ─── WHY CHOOSE US SECTION ─── */}
      <section style={{ padding: "80px 0", background: C.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Why Choose NxtWeave Solutions?" sub="Combining compliance expertise and digital software development under one roof." />
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {WHY_US.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 60}>
                <div style={{ background: "#fff", textAlign: "center", borderRadius: "20px", padding: "24px 16px",
                  border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.03)", transition: "all 0.3s", height: "100%" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = C.teal;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = C.border;
                  }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, #F4F8FB, #e0f0fa)",
                    border: "1px solid #d0e8f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 12px" }}>
                    {item.icon}
                  </div>
                  <h4 style={{ color: C.navy, fontWeight: 700, fontSize: "0.82rem", marginBottom: "6px" }}>{item.title}</h4>
                  <p style={{ color: C.muted, fontSize: "0.75rem", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DYNAMIC GOVERNMENT SCHEME BANNER ─── */}
      <section id="schemes-section" style={{ padding: "80px 0", background: "linear-gradient(135deg,#1E3A5F,#1a5a82)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <FadeUp>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              <span style={{ width: "24px", height: "1.5px", background: "rgba(255,255,255,0.7)", display: "inline-block" }} />
              Government Scheme Guidance
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 900,
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "20px" }}>
              Unlock Eligible Schemes With Expert Guidance
            </h2>

            <div style={{ background: "rgba(255,165,0,0.12)", border: "1px solid rgba(255,165,0,0.3)",
              borderRadius: "14px", padding: "16px 24px", marginBottom: "24px", display: "inline-block" }}>
              <p style={{ color: "#FFD080", fontSize: "0.82rem", fontWeight: 600, marginBottom: "4px" }}>Important Disclaimer</p>
              <p style={{ color: "#FFD080", fontSize: "0.76rem", opacity: 0.85, fontWeight: 300 }}>
                We provide expert documentation and strategic application guidance only. We do not guarantee funding approvals and are not a government body.</p>
            </div>

            <p style={{ color: "#93B5CC", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "28px", fontWeight: 300 }}>
              Our dedicated professionals evaluate your qualifications, draft complex dossiers, navigate government portals and ensure 100% adherence to guidelines.
            </p>

            <div className="nw-scheme-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "32px" }}>
              {["Eligibility check", "Documentation prep", "Portal Application", "Compliance Support"].map((item) => (
                <div key={item} style={{ padding: "12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px", color: "#fff", fontSize: "0.78rem", fontWeight: 500 }}>
                  <span style={{ color: C.green, marginRight: "6px" }}>✓</span> {item}
                </div>
              ))}
            </div>

            <button onClick={() => {
              const bookingSec = document.getElementById("booking-section");
              if (bookingSec) bookingSec.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
              style={{ padding: "14px 36px", borderRadius: "50px", border: "none",
                background: `linear-gradient(135deg, ${C.green}, #2E7D32)`, color: "#fff",
                fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.3s" }}>
              Evaluate Eligibility Now
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ─── FREQUENTLY ASKED QUESTIONS (FAQ) ─── */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <SectionTitle title="Frequently Asked Questions" sub="Honest answers to help you navigate company formations and certifications." />
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FAQS.map((faq, idx) => (
              <FadeUp key={idx} delay={idx * 60}>
                <FAQItem q={faq.q} a={faq.a} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STRATEGIC strategy session BOOKING SECTION (Standard Bottom Form) ─── */}
      <section id="booking-section" style={{ padding: "80px 0", background: C.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div className="nw-contact-layout" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: "64px", alignItems: "center" }}>
            
            {/* Contact Details Panel */}
            <FadeUp direction="left">
              <div>
                <Tag label="Direct Booking" />
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 900,
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.2, marginBottom: "20px" }}>
                  Let's Weave Your<br />Next Phase
                </h2>
                <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "36px", fontWeight: 300 }}>
                  Schedule a free 30-minute strategic consultation with our company formation, tax legal compliance, and digital growth specialists.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(47,164,199,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: C.teal }}>✉</div>
                    <div>
                      <h4 style={{ color: C.navy, fontWeight: 700, fontSize: "0.85rem", marginBottom: "2px" }}>Email Us Directly</h4>
                      <p style={{ color: C.muted, fontSize: "0.8rem", fontWeight: 300 }}>info@nxtweavesolutions.com</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(47,164,199,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: C.teal }}>📞</div>
                    <div>
                      <h4 style={{ color: C.navy, fontWeight: 700, fontSize: "0.85rem", marginBottom: "2px" }}>Call Support Lines</h4>
                      <p style={{ color: C.muted, fontSize: "0.8rem", fontWeight: 300 }}>+91 97115 65533</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(47,164,199,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: C.teal }}>📍</div>
                    <div>
                      <h4 style={{ color: C.navy, fontWeight: 700, fontSize: "0.85rem", marginBottom: "2px" }}>Noida Operations HQ</h4>
                      <p style={{ color: C.muted, fontSize: "0.8rem", fontWeight: 300 }}>Sector 62, Noida, Uttar Pradesh, India - 201301</p>
                    </div>
                  </div>

                </div>
              </div>
            </FadeUp>

            {/* Strategic Form Card */}
            <FadeUp direction="right" delay={100}>
              <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: "24px", padding: "40px",
                boxShadow: "0 12px 40px rgba(13,31,51,0.05)" }}>
                
                {sent ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#fff",
                      margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(76,175,80,0.3)" }}>✓</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.3rem", marginBottom: "8px" }}>
                      Strategy Consultation Scheduled!
                    </h3>
                    <p style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300 }}>
                      Thank you. A calendar invite link and consultation guide has been sent to your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitStrategySession} style={{ display: "flex", flexDirection: "column", gap: "14px" }} className="nw-li">
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontWeight: 800, fontSize: "1.25rem", marginBottom: "4px" }}>
                      Request Free Strategy Session
                    </h3>
                    <p style={{ color: C.muted, fontSize: "0.78rem", marginBottom: "12px", fontWeight: 300 }}>
                      Enter your details below and our corporate consultant will call you back.
                    </p>

                    <input required type="text" id="contact-name" placeholder="Your Full Name *" value={form.name}
                      onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                      onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                      onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                      style={inputSt} />

                    <input required type="tel" id="contact-phone" placeholder="Phone / Mobile Number *" value={form.phone}
                      onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                      onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                      onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                      style={inputSt} />

                    <input required type="email" id="contact-email" placeholder="Your Email Address *" value={form.email}
                      onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                      onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                      onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                      style={inputSt} />

                    {/* Custom Chevron Select Container */}
                    <div style={{ position: "relative", width: "100%" }}>
                      <select id="contact-service" value={form.service}
                        onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
                        style={{ ...inputSt, paddingRight: "40px", color: form.service ? C.navy : "#8FA3B4", cursor: "pointer" }}
                        onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                        onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}>
                        <option value="">Select Primary Need *</option>
                        <option value="incorporation">Business Incorporation Setup</option>
                        <option value="compliance">GST & Tax Compliances</option>
                        <option value="trademark">Trademark & Registrations</option>
                        <option value="website">Custom Software / Web Builds</option>
                        <option value="multiple">Multiple / Custom Estimate Bundle</option>
                      </select>
                      <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#8FA3B4", display: "flex", alignItems: "center" }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    <textarea id="contact-message" placeholder="Tell us about your venture, requirements, or query..."
                      value={form.message} rows={4}
                      onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                      onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
                      onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
                      style={{ ...inputSt, resize: "vertical" }} />

                    <button type="submit" disabled={loading} className="nw-btn-submit"
                      style={{ width: "100%", padding: "14px", borderRadius: "12px",
                        background: loading ? "#93B5CC" : `linear-gradient(135deg,${C.navy},${C.teal})`,
                        color: "#fff", border: "none", fontWeight: 700, fontSize: "0.92rem",
                        fontFamily: "'DM Sans', sans-serif", cursor: loading ? "not-allowed" : "pointer" }}>
                      {loading ? "Scheduling Session…" : "Book Strategic Call Session"}
                    </button>
                    <p style={{ color: "#93B5CC", fontSize: "0.68rem", textAlign: "center", fontWeight: 300 }}>
                      * By submitting, you authorize NxtWeave to arrange calendar sessions.</p>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── MODALS & FLOATING CONTROLLERS ─── */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      {showPopup && <PopupForm onClose={handlePopupClose} />}

      {/* Floating pulsing WhatsApp call-out */}
      <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp support chat"
        style={{
          position: "fixed", bottom: "24px", right: "24px", width: "54px", height: "54px",
          borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "28px", zIndex: 40, textDecoration: "none",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)", animation: "nwWaPulse 2.5s ease-in-out infinite"
        }}>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <BackToTop />
    </div>
  );
}

export default Home;
