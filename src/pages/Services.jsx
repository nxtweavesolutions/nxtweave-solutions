// src/pages/Services.jsx  —  NxtWeave Solutions (complete final)
// No framer-motion dependency — pure CSS animations
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate }             from "react-router-dom";
import { collection, addDoc }                       from "firebase/firestore";
import { db }                                       from "../firebase";
import emailjs                                      from "@emailjs/browser";

// ─── Config ───────────────────────────────────────────────────────────────────
const EMAILJS = {
  service:  "service_8mzileq",
  template: "template_d8xpqpo",
  key:      "ikS9R1hqeGZXmqe-f",
};

// ─── All services data ────────────────────────────────────────────────────────
const ALL_SERVICES = {
  registration: {
    label: "Business Registration",
    emoji: "📋",
    color: "#1E3A5F",
    accent: "rgba(30,58,95,0.1)",
    items: [
      { icon:"🏢", title:"Private Limited Company Registration",
        desc:"Most preferred structure for startups. Separate legal entity with limited liability and easy fundraising.",
        benefits:["Separate Legal Entity","Limited Liability","Easy Funding Access","Perpetual Existence"] },
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
        desc:"Mandatory NITI Aayog portal registration for NGOs seeking government grants.",
        benefits:["Govt Grant Access","Unique ID","NITI Aayog Recognition","Funding Eligibility"] },
      { icon:"📜", title:"12A Registration",
        desc:"Income tax exemption registration for non-profit organisations under the IT Act.",
        benefits:["Income Tax Exemption","Donor Confidence","Scheme Access","Audit Compliance"] },
      { icon:"💰", title:"80G Registration",
        desc:"Enables donors to claim tax deductions on donations made to your organisation.",
        benefits:["Donor Tax Deduction","Increased Donations","Trust & Credibility","Legal Recognition"] },
      { icon:"🌍", title:"CSR-1 Registration",
        desc:"Mandatory for NGOs and trusts seeking Corporate Social Responsibility funding.",
        benefits:["CSR Fund Access","Corporate Tie-ups","MCA Recognition","Increased Funding"] },
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
    color: "#2FA4C7",
    accent: "rgba(47,164,199,0.1)",
    items: [
      { icon:"🧾", title:"GST Registration",
        desc:"Mandatory above threshold turnover. Enables input tax credit and smooth B2B transactions.",
        benefits:["Legal Recognition","Input Tax Credit","Inter-state Sales","e-Commerce Ready"] },
      { icon:"🏭", title:"MSME / Udyam Registration",
        desc:"Unlock government schemes, priority lending, subsidies and collateral-free loans.",
        benefits:["Collateral-free Loans","Subsidy on Patent","Govt Tender Benefits","Payment Protection"] },
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
        desc:"DPIIT recognition unlocking tax benefits, self-certification and easier fundraising.",
        benefits:["Tax Exemption","Easy Winding Up","Self Certification","Funding Access"] },
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
    color: "#4CAF50",
    accent: "rgba(76,175,80,0.1)",
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
    color: "#E67E22",
    accent: "rgba(230,126,34,0.1)",
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

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ item, color, accent, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: "20px", padding: "26px",
        cursor: "pointer", height: "100%",
        border: `1px solid ${hov ? color : "#e0e9f2"}`,
        borderLeft: `4px solid ${color}`,
        boxShadow: hov
          ? `0 12px 36px ${color}22`
          : "0 1px 6px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        width: "60px", height: "60px", borderRadius: "16px",
        background: hov ? color : accent,
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "28px",
        marginBottom: "16px", flexShrink: 0,
        transform: hov ? "scale(1.08)" : "scale(1)",
        transition: "all 0.32s ease",
        boxShadow: hov ? `0 8px 20px ${color}33` : "none",
      }}>
        <span style={{ filter: hov ? "grayscale(1) brightness(4)" : "none",
          transition: "filter 0.3s" }}>{item.icon}</span>
      </div>
      <h3 style={{
        fontFamily: "'Playfair Display',serif", color: "#1E3A5F",
        fontWeight: 800, fontSize: "0.95rem",
        marginBottom: "10px", lineHeight: 1.4,
      }}>{item.title}</h3>
      <p style={{
        color: "#556B7D", fontSize: "0.8rem",
        lineHeight: 1.72, flex: 1, fontWeight: 300,
      }}>{item.desc}</p>
      <div style={{
        marginTop: "16px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          color: hov ? color : "#8FA3B4", fontWeight: 600,
          fontSize: "0.78rem", transition: "color 0.2s",
        }}>Get Consultation</span>
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: hov ? color : "#F4F8FB",
          color: hov ? "#fff" : color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", transition: "all 0.3s",
          transform: hov ? "translateX(3px)" : "none",
        }}>→</div>
      </div>
    </div>
  );
}

// ─── Service Modal ────────────────────────────────────────────────────────────
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

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "rgba(13,31,51,0.72)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px", animation: "svcFadeIn 0.3s ease",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      <style>{`
        @keyframes svcFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes svcSlideUp { from{opacity:0;transform:translateY(24px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes nwSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .svc-input {
          width:100%; padding:12px 14px; border-radius:12px;
          border:1.5px solid #e0e9f2; font-size:0.88rem;
          font-family:inherit; outline:none; color:#1E3A5F;
          background:#fff; box-sizing:border-box;
          transition:border-color 0.2s;
        }
        .svc-input:focus { border-color:#2FA4C7; box-shadow:0 0 0 3px rgba(47,164,199,0.1); }
        .svc-input::placeholder { color:#8FA3B4; }
      `}</style>

      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "24px",
        width: "100%", maxWidth: "520px",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(13,31,51,0.28)",
        animation: "svcSlideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
          padding: "26px 28px", borderRadius: "24px 24px 0 0",
          position: "relative",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: "14px", right: "16px",
            background: "rgba(255,255,255,0.15)", border: "none",
            width: "30px", height: "30px", borderRadius: "50%",
            cursor: "pointer", fontSize: "18px", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>&times;</button>
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "26px", marginBottom: "12px",
          }}>{service.icon}</div>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", color: "#fff",
            fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.3,
            paddingRight: "32px",
          }}>{service.title}</h2>
        </div>

        {/* Body */}
        <div style={{ padding: "26px 28px" }}>
          <p style={{
            color: "#556B7D", fontSize: "0.85rem",
            lineHeight: 1.75, marginBottom: "16px", fontWeight: 300,
          }}>{service.desc}</p>

          {/* Benefits */}
          {service.benefits?.length > 0 && (
            <div style={{
              background: "#F4F8FB", borderRadius: "14px",
              padding: "16px 18px", marginBottom: "16px",
            }}>
              <h4 style={{
                color: "#1E3A5F", fontWeight: 700, fontSize: "0.72rem",
                textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "12px",
              }}>Key Benefits</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {service.benefits.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: "rgba(47,164,199,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#2FA4C7", fontSize: "10px", fontWeight: 700, flexShrink: 0,
                    }}>✓</span>
                    <span style={{ color: "#556B7D", fontSize: "0.77rem" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a",
            borderRadius: "12px", padding: "12px 14px", marginBottom: "20px",
          }}>
            <p style={{ color: "#92400e", fontSize: "0.77rem", lineHeight: 1.6 }}>
              <strong>Disclaimer:</strong> We provide expert guidance and documentation support only.
              We do not guarantee approvals or funding.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: "10px", padding: "11px 14px", marginBottom: "16px",
              display: "flex", gap: "8px",
            }}>
              <span style={{ flexShrink: 0 }}>⚠️</span>
              <p style={{ color: "#DC2626", fontSize: "0.82rem",
                lineHeight: 1.5, fontWeight: 500 }}>{error}</p>
            </div>
          )}

          {/* Success */}
          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", margin: "0 auto 14px", color: "#fff",
                boxShadow: "0 8px 24px rgba(76,175,80,0.3)",
              }}>✓</div>
              <p style={{ color: "#4CAF50", fontWeight: 700,
                fontSize: "1rem", marginBottom: "5px" }}>Request Sent!</p>
              <p style={{ color: "#556B7D", fontSize: "0.83rem", fontWeight: 300 }}>
                Our team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h4 style={{
                fontFamily: "'Playfair Display',serif", color: "#1E3A5F",
                fontWeight: 700, fontSize: "1rem", marginBottom: "2px",
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
              <textarea placeholder="Your Query or Message"
                value={form.message} rows={3}
                className="svc-input"
                onChange={e => setForm(p => ({...p,message:e.target.value}))}
                style={{ resize:"vertical" }}
              />
              <button type="submit" disabled={loading}
                style={{
                  width: "100%", padding: "13px", borderRadius: "12px",
                  border: "none",
                  background: loading ? "#93B5CC"
                    : "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
                  color: "#fff", fontWeight: 700, fontSize: "0.92rem",
                  fontFamily: "inherit",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}>
                {loading ? (
                  <>
                    <div style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff", flexShrink: 0,
                      animation: "nwSpin 0.8s linear infinite",
                    }}/>
                    Sending…
                  </>
                ) : "Send Request"}
              </button>
            </form>
          )}
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
    setTimeout(() => {
      setActiveTab(key);
      setTabAnim(false);
      navigate(`/services?tab=${key}`, { replace: true });
    }, 180);
  };

  const current = ALL_SERVICES[activeTab];

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @keyframes svcTabIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:none; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 60%,#1a4a73 100%)",
        padding: "120px 24px 80px",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{ position:"absolute", top:"-60px", right:"-60px",
          width:"360px", height:"360px", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(47,164,199,0.1),transparent 70%)",
          pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-40px", left:"-40px",
          width:"280px", height:"280px", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(76,175,80,0.07),transparent 70%)",
          pointerEvents:"none" }}/>

        <FadeUp>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 18px", borderRadius: "50px",
            background: "rgba(47,164,199,0.12)",
            border: "1px solid rgba(47,164,199,0.28)",
            color: "#2FA4C7", fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase",
            marginBottom: "20px",
          }}>Our Services</div>

          <h1 style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 900,
            fontSize: "clamp(2rem,5vw,3.2rem)", color: "#fff",
            lineHeight: 1.1, marginBottom: "16px",
          }}>
            Complete Business Support —<br />
            <em style={{ color:"#2FA4C7", fontStyle:"italic" }}>
              Everything Under One Roof
            </em>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: "0.95rem",
            lineHeight: 1.8, maxWidth: "560px",
            margin: "0 auto 36px", fontWeight: 300,
          }}>
            Registration, compliance, certifications, digital solutions
            and marketing — handled by one trusted team.
          </p>

          {/* Stats */}
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
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "14px", padding: "14px 22px", textAlign: "center",
              }}>
                <div style={{ fontFamily:"'Playfair Display',serif",
                  fontSize:"1.5rem", fontWeight:900,
                  color:"#2FA4C7", lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:"0.72rem",
                  color:"rgba(255,255,255,0.5)",
                  marginTop:"3px", fontWeight:300 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Services tabs + cards ─────────────────────────────────────────── */}
      <section style={{ padding:"72px 24px 80px", background:"#F4F8FB" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>

          {/* Tabs */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: "10px", marginBottom: "44px",
          }}>
            {Object.entries(ALL_SERVICES).map(([key, cat]) => (
              <button key={key} onClick={() => handleTabChange(key)}
                style={{
                  padding: "11px 24px", borderRadius: "50px",
                  fontWeight: 600, fontSize: "0.88rem",
                  border: "1.5px solid",
                  cursor: "pointer", transition: "all 0.25s",
                  fontFamily: "inherit",
                  background: activeTab === key ? cat.color : "#fff",
                  color:      activeTab === key ? "#fff" : "#556B7D",
                  borderColor: activeTab === key ? cat.color : "#e0e9f2",
                  boxShadow: activeTab === key
                    ? `0 4px 16px ${cat.color}33` : "none",
                }}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: "16px",
            opacity:    tabAnim ? 0 : 1,
            transform:  tabAnim ? "translateY(10px)" : "none",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}>
            {current.items.map((item, i) => (
              <FadeUp key={`${activeTab}-${i}`} delay={i * 45}>
                <ServiceCard
                  item={item}
                  color={current.color}
                  accent={current.accent}
                  onClick={() => setSelected(item)}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Govt Schemes section ──────────────────────────────────────────── */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg,#1E3A5F,#1a5a82)",
        textAlign: "center",
      }}>
        <FadeUp>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "0.68rem", fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "2.5px", textTransform: "uppercase",
              marginBottom: "12px",
            }}>
              <span style={{ width:"22px", height:"1.5px",
                background:"rgba(255,255,255,0.5)", display:"inline-block" }}/>
              Government Scheme Guidance
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display',serif", color: "#fff",
              fontWeight: 900, fontSize: "clamp(1.7rem,3vw,2.3rem)",
              marginBottom: "16px",
            }}>
              Access Government Schemes<br />With Expert Guidance
            </h2>

            <div style={{
              background: "rgba(255,165,0,0.12)",
              border: "1px solid rgba(255,165,0,0.3)",
              borderRadius: "12px", padding: "14px 22px",
              marginBottom: "18px", display: "inline-block",
            }}>
              <p style={{ color: "#FFD080", fontSize: "0.78rem", fontWeight: 500 }}>
                We provide consulting and documentation assistance only.
                We do not provide direct funding and are not a government body.
              </p>
            </div>

            <p style={{
              color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
              marginBottom: "28px", fontSize: "0.9rem", fontWeight: 300,
            }}>
              Our experts identify eligible schemes, prepare documentation,
              navigate the application process and ensure post-approval compliance.
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: "10px", marginBottom: "30px",
            }} className="nw-scheme-grid">
              {["Eligibility Assessment","Documentation Support",
                "Application Guidance","Compliance Guidance"].map(item => (
                <div key={item} style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "14px 10px",
                  color: "#fff", fontSize: "0.78rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <span style={{ color:"#4CAF50", marginRight:"6px" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            <a href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "50px",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(76,175,80,0.35)",
                transition: "all 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e  => e.currentTarget.style.transform="none"}>
              Get Scheme Guidance →
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ── Why NxtWeave ─────────────────────────────────────────────────── */}
      <section style={{ padding:"72px 24px", background:"#fff" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"44px" }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                fontSize:"0.68rem", fontWeight:600, color:"#2FA4C7",
                letterSpacing:"2.5px", textTransform:"uppercase",
                marginBottom:"12px",
              }}>
                <span style={{ width:"22px", height:"1.5px",
                  background:"#2FA4C7", display:"inline-block" }}/>
                Why Choose Us
              </div>
              <h2 style={{
                fontFamily:"'Playfair Display',serif", fontWeight:900,
                fontSize:"clamp(1.6rem,2.5vw,2.1rem)", color:"#1E3A5F",
              }}>
                Compliance Expertise & Digital Innovation —<br />All Under One Roof
              </h2>
            </div>
          </FadeUp>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "14px",
          }}>
            {[
              { icon:"👨‍💼", title:"Expert Team",        desc:"Qualified professionals with deep regulatory expertise." },
              { icon:"🔄", title:"End-to-End Support", desc:"From registration to ongoing compliance management." },
              { icon:"🔍", title:"Transparent Process",desc:"Clear timelines, updates, no hidden charges." },
              { icon:"💡", title:"Dual Expertise",     desc:"Compliance consulting + digital solutions together." },
              { icon:"📈", title:"Growth Focused",     desc:"Long-term business growth, not just one-time service." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div style={{
                  background: "#fff", textAlign: "center",
                  borderRadius: "20px", padding: "24px 16px",
                  border: "1px solid #e0e9f2",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  transition: "all 0.3s", height: "100%",
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform="translateY(-4px)";
                    e.currentTarget.style.borderColor="#2FA4C7";
                    e.currentTarget.style.boxShadow="0 8px 24px rgba(47,164,199,0.12)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform="none";
                    e.currentTarget.style.borderColor="#e0e9f2";
                    e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.04)";
                  }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: "linear-gradient(135deg,#F4F8FB,#e0f0fa)",
                    border: "1px solid #d0e8f5",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "22px",
                    margin: "0 auto 12px",
                  }}>{item.icon}</div>
                  <h4 style={{
                    fontFamily: "'Playfair Display',serif", color: "#1E3A5F",
                    fontWeight: 700, fontSize: "0.85rem", marginBottom: "7px",
                  }}>{item.title}</h4>
                  <p style={{ color: "#8FA3B4", fontSize: "0.77rem",
                    lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding: "64px 24px",
        background: "linear-gradient(135deg,#0D1F33,#1E3A5F)",
        textAlign: "center",
      }}>
        <FadeUp>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", color: "#fff",
            fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2rem)",
            marginBottom: "12px",
          }}>
            Not sure which service you need?
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "0.88rem",
            marginBottom: "28px", fontWeight: 300,
          }}>
            Talk to our experts for free — we'll guide you to the right solution.
          </p>
          <div style={{ display:"flex", gap:"12px",
            justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "50px",
                background: "linear-gradient(135deg,#4CAF50,#2E7D32)",
                color: "#fff", fontWeight: 700, fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(76,175,80,0.35)",
                transition: "all 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e  => e.currentTarget.style.transform="none"}>
              Get Free Consultation
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "50px",
                background: "#25D366", color: "#fff",
                fontWeight: 700, fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                transition: "all 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseOut={e  => e.currentTarget.style.transform="none"}>
              💬 WhatsApp Us
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </div>
  );
}