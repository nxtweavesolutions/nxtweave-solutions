// src/pages/Services.jsx  —  NxtWeave Solutions (complete final)
// No framer-motion dependency — pure CSS animations
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate }             from "react-router-dom";
import { collection, addDoc }                       from "firebase/firestore";
import { db }                                       from "../firebase";
import emailjs                                      from "@emailjs/browser";

// ─── Color Config ────────────────────────────────────────────────────────────
const C = {
  navy:   "#1E3A5F",
  dark:   "#0D1F33",
  teal:   "#2FA4C7",
  green:  "#4CAF50",
  orange: "#E67E22",
  bg:     "#F4F8FB",
  white:  "#FFFFFF",
  muted:  "#556B7D",
  border: "#e0e9f2",
};

// ─── Config ───────────────────────────────────────────────────────────────────
const EMAILJS = {
  service:  "service_8mzileq",
  template: "template_d8xpqpo",
  key:      "ikS9R1hqeGZXmqe-f",
};

// ─── All services data (Funding References Removed) ───────────────────────────
const ALL_SERVICES = {
  registration: {
    label: "Business Registration",
    emoji: "📋",
    color: C.navy,
    accent: "rgba(30,58,95,0.06)",
    items: [
      { icon:"🏢", title:"Private Limited Company Registration",
        desc:"Most preferred structure for startups. Separate legal entity with limited liability and easy equity allocation.",
        benefits:["Separate Legal Entity","Limited Liability","Easy Equity Sharing","Perpetual Existence"] },
      { icon:"🤝", title:"LLP Registration",
        desc:"Combines partnership flexibility with company benefits. Ideal for professionals and service firms.",
        benefits:["Limited Liability","Lower Compliance","Tax Benefits","Flexible Management"] },
      { icon:"👥", title:"Partnership Firm Registration",
        desc:"Simple structure for 2 or more individuals with shared profits and responsibilities.",
        benefits:["Easy to Form","Minimal Compliance","Shared Responsibility","Simple Taxation"] },
      { icon:"🌱", title:"Section 8 Company Registration",
        desc:"Non-profit entity for charitable, educational and social welfare objectives.",
        benefits:["Non-profit Status","Tax Exemptions","High Credibility","Govt Recognition"] },
      { icon:"📋", title:"NGO Darpan Registration",
        desc:"Mandatory NITI Aayog portal registration for NGOs seeking government grants and credentials.",
        benefits:["Govt Grant Access","Unique ID","NITI Aayog Recognition","Scheme Eligibility"] },
      { icon:"📜", title:"12A Registration",
        desc:"Income tax exemption registration for non-profit organisations under the IT Act.",
        benefits:["Income Tax Exemption","Donor Confidence","Scheme Access","Audit Compliance"] },
      { icon:"💰", title:"80G Registration",
        desc:"Enables donors to claim tax deductions on donations made to your organisation.",
        benefits:["Donor Tax Deduction","Increased Donations","Trust & Credibility","Legal Recognition"] },
      { icon:"🌍", title:"CSR-1 Registration",
        desc:"Mandatory for NGOs and trusts seeking Corporate Social Responsibility programs.",
        benefits:["CSR Program Access","Corporate Tie-ups","MCA Recognition","Increased CSR Support"] },
      { icon:"📄", title:"Trade License",
        desc:"Legal permit to carry out trade or business activity in a specific jurisdiction.",
        benefits:["Legal Authorization","Business Legitimacy","Avoid Penalties","Renewal Support"] },
      { icon:"🏪", title:"Shop Act / Gumasta License",
        desc:"State-level license for retail shops and commercial establishments.",
        benefits:["State Compliance","Employee Benefits","Bank Account Opening","Legal Operation"] },
      { icon:"💎", title:"GeM Registration",
        desc:"Register on Government e-Marketplace to sell products and services to government buyers.",
        benefits:["Govt Orders","Pan India Market","Transparent Process","Direct Payment"] },
    ],
  },
  certifications: {
    label: "Certifications",
    emoji: "🏅",
    color: C.teal,
    accent: "rgba(47,164,199,0.06)",
    items: [
      { icon:"🧾", title:"GST Registration",
        desc:"Mandatory above threshold turnover. Enables input tax credit and smooth B2B transactions.",
        benefits:["Legal Recognition","Input Tax Credit","Inter-state Sales","e-Commerce Ready"] },
      { icon:"🏭", title:"MSME / Udyam Registration",
        desc:"Unlock government schemes, priority lending, subsidies and collateral-free loan channels.",
        benefits:["Priority Lending Access","Subsidy on Patent","Govt Tender Benefits","Payment Protection"] },
      { icon:"🏅", title:"ISO Certification",
        desc:"International quality management certification that boosts global business credibility.",
        benefits:["Global Recognition","Tender Eligibility","Process Improvement","Client Trust"] },
      { icon:"™️", title:"Trademark Registration",
        desc:"Legally protect your brand name, logo and intellectual property from infringement.",
        benefits:["Brand Protection","Legal Rights","Asset Creation","Anti-Infringement"] },
      { icon:"🍽️", title:"FSSAI License",
        desc:"Mandatory food safety and standards licence for all food businesses across India.",
        benefits:["Legal Compliance","Consumer Trust","Business Expansion","Brand Credibility"] },
      { icon:"🌐", title:"IEC Certificate",
        desc:"Import Export Code required for all businesses engaged in international trade.",
        benefits:["Import/Export Legal","Global Trade Access","Bank Support","Lifetime Validity"] },
      { icon:"🚀", title:"Startup India Registration",
        desc:"DPIIT recognition unlocking tax benefits, self-certification and faster registration pathways.",
        benefits:["Tax Exemption","Easy Winding Up","Self Certification","Scheme Access"] },
      { icon:"⚡", title:"ZED Certification",
        desc:"Zero Defect Zero Effect certification by QCI for quality-focused manufacturers.",
        benefits:["Quality Recognition","Export Benefits","Govt Support","Market Access"] },
      { icon:"🌾", title:"FCI Certificate",
        desc:"Food Corporation of India empanelment for businesses in the food supply chain.",
        benefits:["Govt Supply Chain","Stable Revenue","Pan India Access","Credibility"] },
      { icon:"🔢", title:"DUNS / DRS Number",
        desc:"D-U-N-S Number for global business credibility and international supply chain access.",
        benefits:["Global Credibility","Supply Chain Access","International Trade","Risk Assessment"] },
      { icon:"🔧", title:"NSIC Registration",
        desc:"National Small Industries Corporation registration for government procurement benefits.",
        benefits:["Procurement Benefits","Tender Support","Bank Guarantee Waiver","Govt Recognition"] },
    ],
  },
  digital: {
    label: "Digital Solutions",
    emoji: "💻",
    color: C.green,
    accent: "rgba(76,175,80,0.06)",
    items: [
      { icon:"💻", title:"Website Development",
        desc:"Modern, responsive, SEO-optimised websites engineered for performance and conversion.",
        benefits:["Responsive Design","SEO Optimised","CMS Integration","Fast Loading"] },
      { icon:"⚙️", title:"Web Application Development",
        desc:"Custom web applications tailored to your business workflows and operational needs.",
        benefits:["React / Next.js","Secure Backend","API Integration","Scalable Architecture"] },
      { icon:"📊", title:"Business Dashboard",
        desc:"Real-time analytics and reporting dashboards for data-driven business decisions.",
        benefits:["Live Data","Custom Reports","Role-based Access","Mobile Ready"] },
      { icon:"☁️", title:"SaaS Platform Development",
        desc:"Scalable, cloud-native software platforms for your product or service offering.",
        benefits:["Multi-tenancy","Subscription Billing","Cloud Native","Auto Scaling"] },
      { icon:"🎨", title:"UI/UX Design",
        desc:"User-centric design that turns visitors into loyal, returning customers.",
        benefits:["User Research","Wireframing","Prototyping","Conversion Focused"] },
      { icon:"🌐", title:"Hosting & Domain Setup",
        desc:"End-to-end hosting, domain registration, SSL configuration and ongoing management.",
        benefits:["SSL Certificate","99.9% Uptime","Daily Backups","24/7 Support"] },
    ],
  },
  marketing: {
    label: "Marketing",
    emoji: "📱",
    color: C.orange,
    accent: "rgba(230,126,34,0.06)",
    items: [
      { icon:"📱", title:"Social Media Marketing",
        desc:"Strategic campaigns across Instagram, Facebook and LinkedIn that grow your audience.",
        benefits:["Instagram & Facebook","LinkedIn Growth","Engagement Strategy","Analytics Report"] },
      { icon:"💬", title:"WhatsApp Marketing",
        desc:"Targeted WhatsApp broadcast campaigns for direct, high-conversion customer engagement.",
        benefits:["Bulk Messaging","Personalised Reach","High Open Rate","Lead Generation"] },
      { icon:"🖼️", title:"Graphic Designing",
        desc:"Professional brand identity, social media creatives and marketing collateral design.",
        benefits:["Brand Identity","Social Media Posts","Print Design","Infographics"] },
      { icon:"✍️", title:"Content Marketing",
        desc:"SEO-driven content strategy that positions your business as an industry authority.",
        benefits:["Blog Writing","SEO Optimisation","Keyword Research","Traffic Growth"] },
      { icon:"🎬", title:"Video Editing",
        desc:"Professional video content — reels, corporate films, ads and motion graphics.",
        benefits:["Reels & Shorts","Corporate Videos","Ad Films","Motion Graphics"] },
      { icon:"📈", title:"Marketing Consultation",
        desc:"A tailored marketing roadmap with clear ROI targets and channel-specific strategy.",
        benefits:["ROI Planning","Channel Strategy","Budget Optimisation","Growth Roadmap"] },
    ],
  },
};

// ─── Scroll animation hook ────────────────────────────────────────────────────
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

function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "none" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                   transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Dynamic Documentation & Steps Generator ───────────────────────────────────
const getDynamicDetails = (catKey) => {
  let docs = [];
  let steps = [];
  
  if (catKey === "registration") {
    docs = [
      "PAN Card & Aadhaar Card of all Directors/Partners",
      "Passport-size Photographs & Digital Signatures (DSC)",
      "Electricity Bill / Rent Agreement of registered office address",
      "No Objection Certificate (NOC) from property owner"
    ];
    steps = [
      { t: "Step 1: Documentation & KYC Audit", d: "Our corporate experts audit all address and identity proofs." },
      { t: "Step 2: DSC & DIN Registration", d: "Digital Signatures and Director Identification Numbers are securely generated." },
      { t: "Step 3: Name Approval Filing", d: "Application filed on MCA portal for unique corporate name approval." },
      { t: "Step 4: Spice+ Legal Incorporation", d: "Filing of final SPICe+ forms, legal registration, and PAN/TAN dispatch." }
    ];
  } else if (catKey === "certifications") {
    docs = [
      "Certificate of Incorporation / Partnership Deed",
      "PAN Card of the Enterprise / Aadhaar of Promoter",
      "Business premises address proof (Electricity bill/Gumasta)",
      "Invoices, product catalogues, or process flow documents"
    ];
    steps = [
      { t: "Step 1: Eligibility Assessment", d: "empaneled CA/CS check technical eligibility metrics." },
      { t: "Step 2: Documentation Setup", d: "Preparing audited forms, drafts, and technical templates." },
      { t: "Step 3: Portal Application Filing", d: "Uploading verified credentials on the official government/ISO portals." },
      { t: "Step 4: Quality Review & Dispatch", d: "Respective authority review, verification audit, and certificate dispatch." }
    ];
  } else if (catKey === "digital") {
    docs = [
      "Brand logo assets & color palette specs",
      "Domain and hosting control credentials (if owned)",
      "Detailed company profile copy & product assets",
      "Inspirations, competitor websites, or wireframe layouts"
    ];
    steps = [
      { t: "Step 1: Wireframes & High-Fidelity UI", d: "Structuring dynamic user-journeys and premium responsive interface screens." },
      { t: "Step 2: Frontend Engineering", d: "Clean frontend coding using fast, robust React, Vite or Next.js frameworks." },
      { t: "Step 3: Backend CMS & DB Integrations", d: "Configuring secure servers, database connections, API bindings, and admin panels." },
      { t: "Step 4: Speed, SEO Optimization & Launch", d: "Optimizing Core Web Vitals, Google SEO indexing, and production deployment." }
    ];
  } else { // marketing
    docs = [
      "Company Profile, catalog, or brochure assets",
      "Login credentials for active social media handles",
      "Target customer profile guidelines",
      "Promoter/founder photos & high-resolution marketing media"
    ];
    steps = [
      { t: "Step 1: Audits & Growth Strategy", d: "Comprehensive market audit and design of customized marketing channels roadmap." },
      { t: "Step 2: Graphic Creatives & Reel Scripts", d: "Creating high-conversion graphics, ad templates, and engaging reel scripts." },
      { t: "Step 3: Targeted Broadcasts & Social Ads", d: "Launching targeted WhatsApp broadcasts and highly localized social media ads." },
      { t: "Step 4: Dashboard Reporting & Optimization", d: "Weekly analytics dashboard reporting, lead audits, and budget optimization runs." }
    ];
  }
  
  return { docs, steps };
};

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ item, color, accent, categoryLabel, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px", padding: "28px",
        cursor: "pointer", height: "100%",
        border: `1px solid ${hov ? color : "rgba(30,58,95,0.08)"}`,
        borderLeft: `5px solid ${color}`,
        boxShadow: hov
          ? `0 18px 45px -8px ${color}33`
          : "0 4px 20px rgba(13,31,51,0.03)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Search Category Badge */}
      {categoryLabel && (
        <span style={{
          position: "absolute", top: "16px", right: "20px",
          padding: "4px 10px", borderRadius: "50px",
          background: accent, color: color,
          fontSize: "0.62rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.5px"
        }}>
          {categoryLabel}
        </span>
      )}

      <div style={{
        width: "56px", height: "56px", borderRadius: "16px",
        background: hov ? color : accent,
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "28px",
        marginBottom: "20px", flexShrink: 0,
        transform: hov ? "scale(1.08) rotate(4deg)" : "scale(1)",
        transition: "all 0.3s ease",
        boxShadow: hov ? `0 8px 20px ${color}33` : "none",
      }}>
        <span style={{ transition: "all 0.3s" }}>{item.icon}</span>
      </div>

      <h3 style={{
        fontFamily: "'Montserrat',sans-serif", color: C.navy,
        fontWeight: 700, fontSize: "0.94rem",
        marginBottom: "10px", lineHeight: 1.4,
      }}>{item.title}</h3>

      <p style={{
        color: C.muted, fontSize: "0.8rem",
        lineHeight: 1.7, flex: 1, fontWeight: 400,
      }}>{item.desc}</p>

      <div style={{
        marginTop: "20px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderTop: "1px dashed rgba(30,58,95,0.06)",
        paddingTop: "16px"
      }}>
        <span style={{
          color: hov ? color : "#8FA3B4", fontWeight: 700,
          fontSize: "0.78rem", transition: "color 0.2s",
        }}>Get Consultation</span>
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: hov ? color : "rgba(30,58,95,0.04)",
          color: hov ? "#fff" : color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", transition: "all 0.3s",
          transform: hov ? "translateX(4px)" : "none",
        }}>→</div>
      </div>
    </div>
  );
}

// ─── Service Modal (Split 2-Column Design with Overview, Process, Docs) ─────────
function ServiceModal({ service, onClose }) {
  const [form, setForm]       = useState({ name:"", phone:"", email:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (service) { setForm({ name:"", phone:"", email:"", message:"" }); setSent(false); setError(""); }
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (service) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [service, onClose]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, {
        name:    form.name    || "Not provided",
        phone:   form.phone   || "Not provided",
        email:   form.email   || "Not provided",
        service: service?.title || "General Inquiry",
        message: form.message || "No message",
      }, EMAILJS.key);

      await addDoc(collection(db, "contacts"), {
        ...form,
        service:   service?.title || "General Inquiry",
        source:    "services-page",
        status:    "pending",
        createdAt: new Date(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    }
    setLoading(false);
  }, [form, service]);

  if (!service) return null;

  // Generate dynamic documents and steps based on category key
  const details = getDynamicDetails(service.catKey);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "rgba(13,31,51,0.65)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px", animation: "svcFadeIn 0.3s ease",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      <style>{`
        @keyframes svcFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes svcSlideUp { from{opacity:0;transform:translateY(24px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes nwSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .svc-input {
          width:100%; padding:13px 15px; border-radius:12px;
          border:1.5px solid #e0e9f2; font-size:0.88rem;
          font-family:inherit; outline:none; color:#1E3A5F;
          background:#fff; box-sizing:border-box;
          transition:all 0.25s ease;
        }
        .svc-input:focus { border-color:#2FA4C7; box-shadow:0 0 0 4px rgba(47,164,199,0.12); }
        .svc-input::placeholder { color:#8FA3B4; }
        
        /* Responsive Split Modal Layout */
        @media (min-width: 769px) {
          .svc-modal-grid {
            display: grid !important;
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 32px !important;
          }
          .svc-modal-left {
            border-right: 1.5px dashed rgba(30,58,95,0.08) !important;
            padding-right: 32px !important;
          }
        }
        @media (max-width: 768px) {
          .svc-modal-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .svc-modal-left {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1.5px dashed rgba(30,58,95,0.08) !important;
            padding-bottom: 24px !important;
          }
        }
      `}</style>

      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "32px",
        width: "100%", maxWidth: "880px",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(13,31,51,0.22)",
        border: "1px solid rgba(255,255,255,0.8)",
        animation: "svcSlideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
          padding: "28px 32px", borderRadius: "32px 32px 0 0",
          position: "relative",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: "18px", right: "20px",
            background: "rgba(255,255,255,0.18)", border: "none",
            width: "28px", height: "28px", borderRadius: "50%",
            cursor: "pointer", fontSize: "16px", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s"
          }}>&times;</button>
          
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "26px", marginBottom: "14px",
          }}>{service.icon}</div>
          
          <h2 style={{
            fontFamily: "'Montserrat',sans-serif", color: "#fff",
            fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.35,
            paddingRight: "32px",
          }}>{service.title}</h2>
        </div>

        {/* 2-Column Responsive Body */}
        <div className="svc-modal-grid" style={{ padding: "32px" }}>
          
          {/* Left Column: Complete Dynamic Insights */}
          <div className="svc-modal-left">
            <h4 style={{
              color: C.navy, fontFamily: "'Montserrat',sans-serif",
              fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase",
              letterSpacing: "1px", marginBottom: "10px"
            }}>Service Overview</h4>
            
            <p style={{
              color: C.muted, fontSize: "0.84rem",
              lineHeight: 1.7, marginBottom: "20px", fontWeight: 400,
            }}>{service.desc}</p>

            {/* Dynamic Documentation checklist */}
            <div style={{
              background: "rgba(47,164,199,0.04)", borderRadius: "16px",
              padding: "18px 20px", marginBottom: "20px",
              border: "1px solid rgba(47,164,199,0.06)"
            }}>
              <h5 style={{
                color: C.navy, fontWeight: 700, fontSize: "0.72rem",
                textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px"
              }}>
                📁 Required Documentation
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {details.docs.map((doc, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                    <span style={{
                      color: C.teal, fontSize: "12px", fontWeight: 700, lineHeight: 1.2
                    }}>•</span>
                    <span style={{ color: C.muted, fontSize: "0.76rem", fontWeight: 500, lineHeight: 1.4 }}>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Processing steps timeline */}
            <div>
              <h5 style={{
                color: C.navy, fontWeight: 700, fontSize: "0.72rem",
                textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px"
              }}>
                🔄 Step-by-Step Processing Flow
              </h5>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
                {details.steps.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "12px", position: "relative" }}>
                    {/* Circle badge */}
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      background: "rgba(30,58,95,0.06)", color: C.navy,
                      fontSize: "0.72rem", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    {/* Step details */}
                    <div>
                      <h6 style={{ color: C.navy, fontSize: "0.78rem", fontWeight: 700, margin: "0 0 2px" }}>
                        {step.t}
                      </h6>
                      <p style={{ color: C.muted, fontSize: "0.72rem", lineHeight: 1.4, margin: 0, fontWeight: 400 }}>
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Consultation Booking Panel */}
          <div>
            {/* Legal Advisory Note */}
            <div style={{
              background: "#fffbeb", border: "1px solid #fde68a",
              borderRadius: "14px", padding: "14px 16px", marginBottom: "20px",
            }}>
              <p style={{ color: "#92400e", fontSize: "0.74rem", lineHeight: 1.6, margin: 0 }}>
                <strong>Advisory Note:</strong> We offer strategic business consultation and documentation processing support.
                All final incorporation or certification credentials are subject to statutory government authorities.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "#FEF2F2", border: "1px solid #FECACA",
                borderRadius: "12px", padding: "12px 16px", marginBottom: "20px",
                display: "flex", gap: "8px",
              }}>
                <span style={{ flexShrink: 0 }}>⚠️</span>
                <p style={{ color: "#DC2626", fontSize: "0.8rem",
                  lineHeight: 1.5, fontWeight: 600, margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Success */}
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", margin: "0 auto 16px", color: "#fff",
                  boxShadow: "0 8px 24px rgba(76,175,80,0.25)",
                }}>✓</div>
                <p style={{ color: "#4CAF50", fontWeight: 700,
                  fontSize: "1.05rem", marginBottom: "6px" }}>Request Received!</p>
                <p style={{ color: C.muted, fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.4 }}>
                  Our corporate legal & digital expert will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h4 style={{
                  fontFamily: "'Montserrat',sans-serif", color: C.navy,
                  fontWeight: 700, fontSize: "0.9rem", marginBottom: "2px",
                }}>Request Free Consultation</h4>

                {[
                  { k:"name",  ph:"Full Name *",    t:"text" },
                  { k:"phone", ph:"Phone Number *", t:"tel"  },
                  { k:"email", ph:"Email Address *",t:"email"},
                ].map(f => (
                  <input key={f.k} required type={f.t}
                    placeholder={f.ph} value={form[f.k]}
                    className="svc-input"
                    onChange={e => setForm(p => ({...p,[f.k]:e.target.value}))}
                  />
                ))}
                <textarea placeholder="Tell us about your requirement or project goals..."
                  value={form.message} rows={3}
                  className="svc-input"
                  onChange={e => setForm(p => ({...p,message:e.target.value}))}
                  style={{ resize:"vertical" }}
                />
                
                <button type="submit" disabled={loading}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "12px",
                    border: "none",
                    background: loading ? "#93B5CC"
                      : "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
                    color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                    fontFamily: "inherit",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px",
                    boxShadow: "0 4px 12px rgba(30,58,95,0.15)"
                  }}>
                  {loading ? (
                    <>
                      <div style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff", flexShrink: 0,
                        animation: "nwSpin 0.8s linear infinite",
                      }}/>
                      Processing…
                    </>
                  ) : "Request Consultation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Services page ───────────────────────────────────────────────────────
export default function Services() {
  const [searchParams]        = useSearchParams();
  const navigate              = useNavigate();
  
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "registration"
  );
  const [selected, setSelected]   = useState(null);
  const [tabAnim,  setTabAnim]    = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync URL param with tab
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t && ALL_SERVICES[t]) setActiveTab(t);
  }, [searchParams]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    emailjs.init(EMAILJS.key);
  }, []);

  const handleTabChange = (key) => {
    setTabAnim(true);
    setSearchQuery(""); // Clear search when switching tabs
    setTimeout(() => {
      setActiveTab(key);
      setTabAnim(false);
      navigate(`/services?tab=${key}`, { replace: true });
    }, 180);
  };

  // Compile search results across all categories
  const getSearchResults = () => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const results = [];
    
    Object.entries(ALL_SERVICES).forEach(([catKey, cat]) => {
      cat.items.forEach(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.desc.toLowerCase().includes(query);
        const benefitMatch = item.benefits.some(b => b.toLowerCase().includes(query));
        
        if (titleMatch || descMatch || benefitMatch) {
          results.push({
            ...item,
            catKey,
            catColor: cat.color,
            catAccent: cat.accent,
            catLabel: cat.label
          });
        }
      });
    });
    return results;
  };

  const searchResults = getSearchResults();
  const current = ALL_SERVICES[activeTab];

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", background: "#F4F8FB" }}>
      <style>{`
        @keyframes svcTabIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:none; }
        }
        @keyframes nwPulseGrid {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        .search-container-box {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-radius: 50px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .search-container-box:focus-within {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(47,164,199,0.25);
        }
        .nw-search-input {
          width: 100%;
          padding: 15px 50px 15px 52px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-family: inherit;
          color: #1E3A5F;
          outline: none;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }
        .nw-search-input:focus {
          border-color: #2FA4C7;
          background: #ffffff;
        }
        .nw-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          pointer-events: none;
        }
        .nw-search-clear {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(30,58,95,0.06);
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          cursor: pointer;
          color: #1E3A5F;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.2s;
        }
        .nw-search-clear:hover {
          background: rgba(30,58,95,0.15);
        }
      `}</style>

      {/* ── Hero (Glow mesh, Pulse grid, Dynamic Search) ─────────────────── */}
      <section style={{
        background: "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 60%,#153254 100%)",
        padding: "130px 24px 80px",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        {/* Animated Background Mesh */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "20px 20px",
          animation: "nwPulseGrid 4s ease-in-out infinite",
          pointerEvents: "none"
        }} />
        
        {/* Glowing Blobs */}
        <div style={{ position:"absolute", top:"-80px", right:"-80px",
          width:"400px", height:"400px", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(47,164,199,0.12),transparent 70%)",
          pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-60px", left:"-60px",
          width:"320px", height:"320px", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(76,175,80,0.08),transparent 70%)",
          pointerEvents:"none" }}/>

        <FadeUp>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 18px", borderRadius: "50px",
            background: "rgba(47,164,199,0.12)",
            border: "1px solid rgba(47,164,199,0.28)",
            color: "#2FA4C7", fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase",
            marginBottom: "22px",
          }}>Our Services</div>

          <h1 style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 900,
            fontSize: "clamp(2.2rem,5vw,3.4rem)", color: "#fff",
            lineHeight: 1.15, marginBottom: "18px",
          }}>
            Complete Business Services —<br />
            <em style={{ color:"#2FA4C7", fontStyle:"italic" }}>
              Everything Under One Roof
            </em>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: "0.95rem",
            lineHeight: 1.8, maxWidth: "580px",
            margin: "0 auto 36px", fontWeight: 300,
          }}>
            Corporate registration, state compliance, certifications, custom digital products 
            and growth marketing — engineered by one expert team.
          </p>

          {/* Interactive Live Search Bar */}
          <div style={{ marginBottom: "44px" }}>
            <div className="search-container-box">
              <span className="nw-search-icon">🔍</span>
              <input
                type="text"
                className="nw-search-input"
                placeholder="Search 35+ services (e.g. GST, Website, Company)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="nw-search-clear" 
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Stats (Hidden if search active for clutter reduction) */}
          {!searchQuery && (
            <div style={{
              display: "flex", gap: "20px",
              justifyContent: "center", flexWrap: "wrap",
            }}>
              {[
                ["35+","Services Offered"],
                ["500+","Clients Served"],
                ["99%", "Success Rate"],
                ["Pan India","& Global"],
              ].map(([v,l]) => (
                <div key={l} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px", padding: "14px 22px", textAlign: "center",
                  backdropFilter: "blur(8px)"
                }}>
                  <div style={{ fontFamily:"'Playfair Display',serif",
                    fontSize:"1.5rem", fontWeight:900,
                    color:"#2FA4C7", lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:"0.72rem",
                    color:"rgba(255,255,255,0.5)",
                    marginTop:"3px", fontWeight:400 }}>{l}</div>
                </div>
              ))}
            </div>
          )}
        </FadeUp>
      </section>

      {/* ── Services tabs + cards ─────────────────────────────────────────── */}
      <section style={{ padding:"64px 24px 80px" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>

          {/* Category Tabs (Render only if no search query) */}
          {!searchQuery ? (
            <div style={{
              display: "flex", flexWrap: "wrap",
              justifyContent: "center", gap: "10px", marginBottom: "44px",
            }}>
              {Object.entries(ALL_SERVICES).map(([key, cat]) => (
                <button key={key} onClick={() => handleTabChange(key)}
                  style={{
                    padding: "12px 24px", borderRadius: "50px",
                    fontWeight: 700, fontSize: "0.85rem",
                    border: "1.5px solid",
                    cursor: "pointer", transition: "all 0.25s",
                    fontFamily: "inherit",
                    background: activeTab === key ? cat.color : "#fff",
                    color:      activeTab === key ? "#fff" : C.muted,
                    borderColor: activeTab === key ? cat.color : "rgba(30,58,95,0.08)",
                    boxShadow: activeTab === key
                      ? `0 6px 20px ${cat.color}33` : "none",
                  }}
                  onMouseOver={e => {
                    if (activeTab !== key) {
                      e.currentTarget.style.borderColor = cat.color;
                      e.currentTarget.style.color = cat.color;
                    }
                  }}
                  onMouseOut={e => {
                    if (activeTab !== key) {
                      e.currentTarget.style.borderColor = "rgba(30,58,95,0.08)";
                      e.currentTarget.style.color = C.muted;
                    }
                  }}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          ) : (
            /* Search results count header */
            <div style={{
              maxWidth: "600px", margin: "0 auto 36px", textAlign: "center"
            }}>
              <h3 style={{
                color: C.navy, fontFamily: "'Montserrat',sans-serif",
                fontWeight: 700, fontSize: "1.1rem"
              }}>
                Search Results for "{searchQuery}"
              </h3>
              <p style={{ color: C.muted, fontSize: "0.82rem", margin: "4px 0 0" }}>
                Found {searchResults?.length || 0} matching {searchResults?.length === 1 ? "service" : "services"} across all categories.
              </p>
            </div>
          )}

          {/* Cards grid */}
          {searchQuery ? (
            /* Search results layout */
            searchResults && searchResults.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: "16px",
              }}>
                {searchResults.map((item, i) => (
                  <FadeUp key={`search-${i}`} delay={i * 30}>
                    <ServiceCard
                      item={item}
                      color={item.catColor}
                      accent={item.catAccent}
                      categoryLabel={item.catLabel}
                      onClick={() => setSelected({ ...item, catKey: item.catKey, color: item.catColor, accent: item.catAccent })}
                    />
                  </FadeUp>
                ))}
              </div>
            ) : (
              /* No search results fallback */
              <div style={{
                textAlign: "center", padding: "60px 24px",
                background: "#fff", borderRadius: "24px",
                border: "1px dashed rgba(30,58,95,0.12)",
                maxWidth: "500px", margin: "0 auto"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
                <h4 style={{
                  fontFamily: "'Montserrat',sans-serif", color: C.navy,
                  fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px"
                }}>No matching services found</h4>
                <p style={{ color: C.muted, fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  We might still support your requirement! Talk to our consultants directly on WhatsApp for custom setups.
                </p>
                <a href="https://wa.me/919711565533" target="_blank" rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "12px 28px", borderRadius: "50px",
                    background: "#25D366", color: "#fff",
                    fontWeight: 700, fontSize: "0.86rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.25)"
                  }}>
                  💬 Discuss on WhatsApp
                </a>
              </div>
            )
          ) : (
            /* Regular tab card grid layout */
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: "16px",
              opacity:    tabAnim ? 0 : 1,
              transform:  tabAnim ? "translateY(10px)" : "none",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}>
              {current.items.map((item, i) => (
                <FadeUp key={`${activeTab}-${i}`} delay={i * 40}>
                  <ServiceCard
                    item={item}
                    color={current.color}
                    accent={current.accent}
                    onClick={() => setSelected({ ...item, catKey: activeTab, color: current.color, accent: current.accent })}
                  />
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Govt Schemes section (Funding Guaranteed Disclaimer Active) ────── */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg,#1E3A5F,#163558)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle mesh overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 80% 20%, rgba(47,164,199,0.06), transparent 60%)",
          pointerEvents: "none"
        }} />
        
        <FadeUp>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "0.68rem", fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "2.5px", textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              <span style={{ width:"20px", height:"1.5px",
                background:"rgba(255,255,255,0.4)", display:"inline-block" }}/>
              Government Schemes Support
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display',serif", color: "#fff",
              fontWeight: 900, fontSize: "clamp(1.7rem,3vw,2.3rem)",
              marginBottom: "18px",
              lineHeight: 1.2
            }}>
              Access Government Subsidies & Benefits<br />With Strategic Expert Consultation
            </h2>

            <div style={{
              background: "rgba(230,126,34,0.12)",
              border: "1px solid rgba(230,126,34,0.3)",
              borderRadius: "14px", padding: "14px 22px",
              marginBottom: "20px", display: "inline-block",
            }}>
              <p style={{ color: "#FFD080", fontSize: "0.78rem", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                <strong>Advisory Disclaimer:</strong> We provide strategic consulting, documentation preparation, and portal filing support. 
                We are a private consulting firm, NOT a government agency, and we do NOT provide direct loans or absolute funding guarantees.
              </p>
            </div>

            <p style={{
              color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
              marginBottom: "32px", fontSize: "0.9rem", fontWeight: 300,
            }}>
              Our empanelled experts help you identify statutory MSME benefits, prepare necessary audits, 
              navigate administrative portals, and ensure clean compliance alignments.
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: "10px", marginBottom: "36px",
            }} className="nw-scheme-grid">
              {["Scheme Mapping","Documentation Auditing",
                "Filing Guidance","Compliance Monitoring"].map(item => (
                <div key={item} style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "14px 10px",
                  color: "#fff", fontSize: "0.78rem",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(6px)"
                }}>
                  <span style={{ color:"#4CAF50", marginRight:"6px" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            <a href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 34px", borderRadius: "50px",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(76,175,80,0.3)",
                transition: "all 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e  => e.currentTarget.style.transform="none"}>
              Consult Scheme Experts →
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ── Why NxtWeave ─────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#fff" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"48px" }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                fontSize:"0.68rem", fontWeight:700, color:"#2FA4C7",
                letterSpacing:"2.5px", textTransform:"uppercase",
                marginBottom:"12px",
              }}>
                <span style={{ width:"20px", height:"1.5px",
                  background:"#2FA4C7", display:"inline-block" }}/>
                Why Choose Us
              </div>
              <h2 style={{
                fontFamily:"'Playfair Display',serif", fontWeight:900,
                fontSize:"clamp(1.6rem,2.5vw,2.2rem)", color:C.navy,
                lineHeight: 1.25
              }}>
                Corporate Compliance Expertise & Digital Engineering —<br />
                <span style={{ color: C.teal }}>All Under One Integrated Roof</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "16px",
          }}>
            {[
              { icon:"👨‍💼", title:"Empanelled CA/CS/Advocates", desc:"Qualified corporate legal, tax, and auditing specialists." },
              { icon:"🔄", title:"End-to-End Handholding",    desc:"From corporate setup to recurring GST and annual filings." },
              { icon:"🔍", title:"Transparent Milestones",     desc:"No hidden charges, clear progress trackers, real-time sync." },
              { icon:"💻", title:"Integrated Tech Capabilities",desc:"Premium custom software development and website engineering." },
              { icon:"📈", title:"Enterprise Growth Focus",    desc:"Empowering business roadmaps, brand identity, and systems." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{
                  background: "#fff", textAlign: "center",
                  borderRadius: "24px", padding: "26px 18px",
                  border: "1px solid rgba(30,58,95,0.06)",
                  boxShadow: "0 4px 16px rgba(13,31,51,0.02)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", height: "100%",
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform="translateY(-5px)";
                    e.currentTarget.style.borderColor=C.teal;
                    e.currentTarget.style.boxShadow="0 12px 30px rgba(47,164,199,0.1)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform="none";
                    e.currentTarget.style.borderColor="rgba(30,58,95,0.06)";
                    e.currentTarget.style.boxShadow="0 4px 16px rgba(13,31,51,0.02)";
                  }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: "rgba(47,164,199,0.06)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "22px",
                    margin: "0 auto 16px",
                  }}>{item.icon}</div>
                  <h4 style={{
                    fontFamily: "'Montserrat',sans-serif", color: C.navy,
                    fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px",
                  }}>{item.title}</h4>
                  <p style={{ color: C.muted, fontSize: "0.76rem",
                    lineHeight: 1.6, fontWeight: 500, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Glow overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(76,175,80,0.05), transparent 60%)",
          pointerEvents: "none"
        }} />
        
        <FadeUp>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", color: "#fff",
            fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.1rem)",
            marginBottom: "12px",
          }}>
            Confused about your corporate setup?
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: "0.9rem",
            marginBottom: "32px", fontWeight: 300,
          }}>
            Consult our expert legal & digital specialists for free and map out your clean launch.
          </p>
          <div style={{ display:"flex", gap:"12px",
            justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 34px", borderRadius: "50px",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                color: "#fff", fontWeight: 700, fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(76,175,80,0.3)",
                transition: "all 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e  => e.currentTarget.style.transform="none"}>
              Book Strategic Session
            </a>
            <a href="https://wa.me/919711565533" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 34px", borderRadius: "50px",
                background: "#25D366", color: "#fff",
                fontWeight: 700, fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                transition: "all 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e  => e.currentTarget.style.transform="none"}>
              💬 WhatsApp Consult
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </div>
  );
}