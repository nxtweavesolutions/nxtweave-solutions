// src/pages/Contact.jsx  —  NxtWeave Solutions (complete final)
import { useState, useEffect, useRef } from "react";
import { collection, addDoc }          from "firebase/firestore";
import { db }                          from "../firebase";
import emailjs                         from "@emailjs/browser";

// ─── Config ───────────────────────────────────────────────────────────────────
const EMAILJS = {
  service:  "service_8mzileq",
  template: "template_d8xpqpo",
  key:      "ikS9R1hqeGZXmqe-f",
};

const SOCIAL = {
  whatsapp:  "https://wa.me/919711565533",
  instagram: "https://www.instagram.com/nxtweavesolutions/",
  linkedin:  "https://www.linkedin.com/company/nxtweavesolutions/",
};

const SERVICES = [
  "Business Registration",
  "LLP / Partnership Registration",
  "GST / Tax Compliance",
  "MSME / Udyam Registration",
  "ISO Certification",
  "Trademark Registration",
  "FSSAI License",
  "Startup India Registration",
  "NGO / Section 8 Registration",
  "12A / 80G / CSR-1 Registration",
  "Website Development",
  "Web Application Development",
  "Digital Marketing",
  "Government Scheme Guidance",
  "Other",
];

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
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : "translateY(32px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                   transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Contact info items ───────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: "📞",
    label: "Phone",
    value: "+91 97115 65533",
    href: "tel:+919711565533",
    sub: "Mon–Sat, 9 AM – 7 PM IST",
  },
  {
    icon: "📧",
    label: "Email",
    value: "info@nxtweavesolutions.com",
    href: "mailto:info@nxtweavesolutions.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: "📍",
    label: "Office",
    value: "Noida, Gautam Buddha Nagar",
    sub: "Uttar Pradesh — 201301",
    href: "https://maps.google.com/?q=Noida,Uttar+Pradesh",
  },
  {
    icon: "⏰",
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    sub: "Sunday: Closed",
    href: null,
  },
];

// ─── Why contact us ───────────────────────────────────────────────────────────
const WHY_CONTACT = [
  { icon: "🎯", text: "Free initial consultation — no charges" },
  { icon: "⚡", text: "Response within 24 hours guaranteed" },
  { icon: "🌍", text: "Serving clients Pan India and globally" },
  { icon: "🔒", text: "Your data is 100% safe and confidential" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");

  useEffect(() => {
    emailjs.init(EMAILJS.key);
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, {
        name:    form.name    || "Not provided",
        phone:   form.phone   || "Not provided",
        email:   form.email   || "Not provided",
        service: form.service || "General Inquiry",
        message: form.message || "No message",
      }, EMAILJS.key);

      await addDoc(collection(db, "contacts"), {
        ...form,
        source:    "contact-page",
        status:    "pending",
        createdAt: new Date(),
      });

      setSent(true);
      setForm({ name:"", phone:"", email:"", service:"", message:"" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", background: "#050C16" }}>
      <style>{`
        /* Custom Animations */
        @keyframes pulseBlob {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.35; }
          33% { transform: scale(1.15) translate(25px, -25px); opacity: 0.55; }
          66% { transform: scale(0.9) translate(-10px, 15px); opacity: 0.45; }
        }
        @keyframes pulseCheck {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(76,175,80,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(76,175,80,0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes subtleSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .pulse-blob-contact-1 {
          animation: pulseBlob 10s infinite alternate ease-in-out;
        }
        .pulse-blob-contact-2 {
          animation: pulseBlob 14s infinite alternate-reverse ease-in-out;
        }

        /* Glassmorphic Styles */
        .glass-card-dark {
          background: rgba(13, 27, 45, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35);
        }
        .glass-card-light {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 30px rgba(31, 66, 107, 0.03);
        }

        /* Input Interactions */
        .premium-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
          color: #0F172A;
          background: rgba(255, 255, 255, 0.9);
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        .premium-input:focus {
          border-color: #2FA4C7;
          background: #ffffff;
          box-shadow: 0 0 14px rgba(47, 164, 199, 0.15);
          transform: translateY(-1px);
        }

        /* Hover Elevations */
        .hover-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .hover-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          border-color: rgba(47, 164, 199, 0.35) !important;
          box-shadow: 0 12px 30px rgba(47, 164, 199, 0.12) !important;
        }

        @media(max-width:900px){
          .nw-contact-grid { grid-template-columns:1fr !important; gap: 40px !important; }
          .nw-form-card-sticky { position: relative !important; top: 0 !important; }
        }
        @media(max-width:480px){
          .nw-form-row { grid-template-columns:1fr !important; gap: 14px !important; }
          .nw-stats-row { gap: 12px !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #050C16 0%, #0D1B2D 50%, #15273C 100%)",
        padding: "140px 24px 90px",
        position: "relative", 
        overflow: "hidden", 
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.03)"
      }}>
        {/* Glow Vector Blobs */}
        <div
          className="pulse-blob-contact-1"
          style={{
            position:     "absolute",
            top:          "-15%",
            right:        "15%",
            width:        "450px",
            height:       "450px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(47,164,199,0.12) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(60px)",
          }}
        />
        <div
          className="pulse-blob-contact-2"
          style={{
            position:     "absolute",
            bottom:       "-20%",
            left:         "10%",
            width:        "380px",
            height:       "380px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(76,175,80,0.06) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(50px)",
          }}
        />

        <FadeUp>
          <div style={{
            display:"inline-flex", 
            alignItems:"center", 
            gap:"8px",
            padding:"8px 20px", 
            borderRadius:"50px",
            background:"rgba(47,164,199,0.08)",
            border:"1px solid rgba(47,164,199,0.25)",
            color:"#2FA4C7", 
            fontSize:"0.72rem", 
            fontWeight:800,
            letterSpacing:"3px", 
            textTransform:"uppercase",
            marginBottom:"24px",
            boxShadow:"0 4px 15px rgba(47,164,199,0.1)",
          }}>Contact Us</div>

          <h1 style={{
            fontFamily:"'Playfair Display',serif", 
            fontWeight:900,
            fontSize:"clamp(2.2rem,6vw,3.6rem)", 
            color:"#fff",
            lineHeight:1.15, 
            marginBottom:"20px",
            letterSpacing: "-0.5px"
          }}>
            Let's Co-Create Something<br />
            <span style={{ 
              background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 900
            }}>Invincible Together</span>
          </h1>

          <p style={{
            color:"rgba(255,255,255,0.65)", 
            fontSize:"1.02rem",
            lineHeight:1.85, 
            maxWidth:"580px", 
            margin:"0 auto 36px",
            fontWeight:300,
          }}>
            Free consultation, zero commitment. Share your roadmap hurdles 
            with NxtWeave's legal compliance and software engineering advisors today.
          </p>

          {/* Stats row */}
          <div 
            className="nw-stats-row"
            style={{
              display:"flex", 
              gap:"20px", 
              justifyContent:"center",
              flexWrap:"wrap",
            }}
          >
            {[
              ["24 hrs", "Guaranteed reply time"],
              ["Free", "Comprehensive review"],
              ["Pan India", "& Overseas reach"],
            ].map(([v, l]) => (
              <div 
                key={l} 
                className="glass-card-dark"
                style={{
                  borderRadius:"20px", 
                  padding:"16px 28px",
                  textAlign:"center",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                }}
              >
                <div style={{ 
                  fontFamily:"'Playfair Display',serif",
                  fontSize:"1.6rem", 
                  fontWeight:900, 
                  color:"#2FA4C7",
                  lineHeight:1.1 
                }}>{v}</div>
                <div style={{ 
                  fontSize:"0.72rem",
                  color:"rgba(255,255,255,0.5)", 
                  marginTop:"4px",
                  fontWeight:400,
                  letterSpacing: "0.5px"
                }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Main section ─────────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", background:"#F8FAFC", position: "relative" }}>
        <div style={{
          maxWidth:"1200px", 
          margin:"0 auto",
          display:"grid", 
          gridTemplateColumns:"0.95fr 1.05fr",
          gap:"64px", 
          alignItems:"start",
          position: "relative",
          zIndex: 1
        }}
          className="nw-contact-grid">

          {/* ── Left: Info panel ─────────────────────────────────────────── */}
          <div>
            <FadeUp>
              <div style={{
                display:"inline-flex", 
                alignItems:"center", 
                gap:"8px",
                fontSize:"0.72rem", 
                fontWeight:600, 
                color:"#2FA4C7",
                letterSpacing:"2.5px", 
                textTransform:"uppercase",
                marginBottom:"14px",
              }}>
                <span style={{ 
                  width:"24px", 
                  height:"2px",
                  background:"linear-gradient(90deg, #2FA4C7, transparent)", 
                  display:"inline-block" 
                }}/>
                Get In Touch
              </div>
              <h2 style={{
                fontFamily:"'Playfair Display',serif", 
                fontWeight:900,
                fontSize:"clamp(1.8rem, 3vw, 2.4rem)",
                color:"#0F172A", 
                lineHeight:1.25, 
                marginBottom:"22px",
                letterSpacing: "-0.5px"
              }}>
                We're Here to Orchestrate<br />
                <span style={{ 
                  background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900
                }}>Your Launch Mechanics</span>
              </h2>
              <p style={{
                color:"#475569", 
                fontSize:"0.95rem", 
                lineHeight:1.85,
                marginBottom:"36px", 
                fontWeight:300,
              }}>
                Whether you need corporate structuring, state compliance filings, tax audits, 
                or custom engineering setups—our senior advisors are available to compile 
                a structured, honest, and cost-effective delivery roadmap.
              </p>
            </FadeUp>

            {/* Contact info cards */}
            <div style={{ 
              display:"flex", 
              flexDirection:"column", 
              gap:"14px",
              marginBottom:"36px" 
            }}>
              {CONTACT_INFO.map((item, i) => (
                <FadeUp key={item.label} delay={i * 60}>
                  <div 
                    className="glass-card-light hover-card"
                    style={{
                      borderRadius:"20px", 
                      padding:"20px 22px",
                      display:"flex", 
                      alignItems:"center", 
                      gap:"18px",
                      transition:"all 0.3s",
                    }}
                  >
                    <div style={{
                      width:"48px", 
                      height:"48px", 
                      borderRadius:"14px",
                      background:"rgba(47,164,199,0.08)",
                      border: "1px solid rgba(47,164,199,0.18)",
                      display:"flex", 
                      alignItems:"center",
                      justifyContent:"center", 
                      fontSize:"22px", 
                      flexShrink:0,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ 
                        fontSize:"0.72rem", 
                        color:"#64748B",
                        fontWeight:700, 
                        textTransform:"uppercase",
                        letterSpacing:"1.5px", 
                        marginBottom:"4px" 
                      }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          style={{ 
                            fontSize:"0.92rem", 
                            color:"#0F172A",
                            fontWeight:700, 
                            textDecoration:"none",
                            transition:"color 0.2s" 
                          }}
                          onMouseOver={e => e.currentTarget.style.color="#2FA4C7"}
                          onMouseOut={e  => e.currentTarget.style.color="#0F172A"}>
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ 
                          fontSize:"0.92rem", 
                          color:"#0F172A",
                          fontWeight:700 
                        }}>{item.value}</div>
                      )}
                      <div style={{ 
                        fontSize:"0.78rem", 
                        color:"#64748B",
                        marginTop:"3px", 
                        fontWeight:400 
                      }}>{item.sub}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Why contact us */}
            <FadeUp delay={180}>
              <div 
                className="glass-card-dark hover-card"
                style={{
                  borderRadius:"24px", 
                  padding:"26px 30px",
                  marginBottom:"36px",
                  border: "1px solid rgba(255,255,255,0.03)"
                }}
              >
                <h4 style={{ 
                  fontFamily:"'Playfair Display',serif",
                  color:"#fff", 
                  fontWeight:800, 
                  fontSize:"1rem",
                  marginBottom:"16px" 
                }}>💎 Why Align With NxtWeave Solutions?</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                  {WHY_CONTACT.map(item => (
                    <div key={item.text} style={{ 
                      display:"flex",
                      alignItems:"center", 
                      gap:"12px" 
                    }}>
                      <span style={{ fontSize:"18px" }}>{item.icon}</span>
                      <span style={{ 
                        color:"rgba(255,255,255,0.8)",
                        fontSize:"0.88rem", 
                        fontWeight:400 
                      }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Social links */}
            <FadeUp delay={220}>
              <div>
                <p style={{ 
                  fontSize:"0.72rem", 
                  color:"#64748B",
                  fontWeight:700, 
                  marginBottom:"14px",
                  textTransform:"uppercase", 
                  letterSpacing:"2px" 
                }}>
                  Corporate Channels
                </p>
                <div style={{ display:"flex", gap:"12px", flexWrap: "wrap" }}>
                  {[
                    { label:"WhatsApp",  href:SOCIAL.whatsapp,
                      bg:"#25D366", icon:(
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      )},
                    { label:"Instagram", href:SOCIAL.instagram,
                      bg:"#E1306C", icon:(
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <circle cx="12" cy="12" r="4"/>
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                      )},
                    { label:"LinkedIn",  href:SOCIAL.linkedin,
                      bg:"#0A66C2", icon:(
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                      )},
                  ].map(s => (
                    <a key={s.label} href={s.href}
                      target="_blank" rel="noreferrer"
                      style={{
                        display:"inline-flex", 
                        alignItems:"center",
                        gap:"8px", 
                        padding:"10px 18px",
                        borderRadius:"12px", 
                        background:s.bg + "0F",
                        border:"1px solid " + s.bg + "30",
                        color:s.bg, 
                        fontSize:"0.8rem", 
                        fontWeight:700,
                        textDecoration:"none", 
                        transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.background = s.bg + "20";
                        e.currentTarget.style.borderColor = s.bg;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={e  => {
                        e.currentTarget.style.background = s.bg + "0F";
                        e.currentTarget.style.borderColor = s.bg + "30";
                        e.currentTarget.style.transform = "none";
                      }}>
                      {s.icon}{s.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <FadeUp delay={120}>
            <div 
              className="glass-card-light nw-form-card-sticky"
              style={{
                borderRadius:"28px", 
                padding:"44px 38px",
                boxShadow:"0 15px 40px rgba(15,23,42,0.06)",
                position:"sticky", 
                top:"110px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(248,250,252,0.85))"
              }}
            >
              {sent ? (
                /* ── Success state ── */
                <div style={{ textAlign:"center", padding:"30px 0" }}>
                  <div style={{
                    width:"78px", 
                    height:"78px", 
                    borderRadius:"50%",
                    background:"linear-gradient(135deg,#4CAF50,#2E7D32)",
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center",
                    fontSize:"36px", 
                    margin:"0 auto 24px",
                    boxShadow:"0 8px 30px rgba(76,175,80,0.3)",
                    animation: "pulseCheck 2s infinite"
                  }}>✓</div>
                  <h3 style={{ 
                    fontFamily:"'Playfair Display',serif",
                    color:"#0F172A", 
                    fontWeight:900, 
                    fontSize:"1.45rem",
                    marginBottom:"12px" 
                  }}>Inquiry Registered!</h3>
                  <p style={{ 
                    color:"#475569", 
                    fontSize:"0.9rem",
                    lineHeight:1.75, 
                    marginBottom:"28px", 
                    fontWeight:400 
                  }}>
                    Bhai, email aur data logs store ho chuke hain. 
                    Our client strategy manager will call you back within 24 hours.
                  </p>
                  <div style={{ 
                    display:"flex", 
                    gap:"12px",
                    justifyContent:"center", 
                    flexWrap:"wrap" 
                  }}>
                    <button onClick={() => setSent(false)}
                      style={{
                        padding:"13px 26px", 
                        borderRadius:"50px",
                        background:"#0F172A", 
                        color:"#fff",
                        border:"none", 
                        fontWeight:700, 
                        fontSize:"0.87rem",
                        cursor:"pointer", 
                        fontFamily:"inherit",
                        transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseOver={e => e.currentTarget.style.background="#2FA4C7"}
                      onMouseOut={e  => e.currentTarget.style.background="#0F172A"}>
                      Send Another Message
                    </button>
                    <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"
                      style={{
                        padding:"13px 26px", 
                        borderRadius:"50px",
                        background:"#25D366", 
                        color:"#fff",
                        fontWeight:700, 
                        fontSize:"0.87rem",
                        textDecoration:"none",
                        display:"inline-flex", 
                        alignItems:"center", 
                        gap:"8px",
                        boxShadow:"0 4px 15px rgba(37,211,102,0.2)"
                      }}>
                      💬 WhatsApp Setup Direct
                    </a>
                  </div>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <div style={{ marginBottom:"28px" }}>
                    <div style={{
                      display:"inline-flex", 
                      alignItems:"center", 
                      gap:"8px",
                      fontSize:"0.68rem", 
                      fontWeight:600, 
                      color:"#2FA4C7",
                      letterSpacing:"2.5px", 
                      textTransform:"uppercase",
                      marginBottom:"10px",
                    }}>
                      <span style={{ 
                        width:"20px", 
                        height:"1.5px",
                        background:"#2FA4C7", 
                        display:"inline-block" 
                      }}/>
                      Live Strategy Desk
                    </div>
                    <h3 style={{ 
                      fontFamily:"'Playfair Display',serif",
                      color:"#0F172A", 
                      fontWeight:900, 
                      fontSize:"1.4rem",
                      marginBottom:"8px",
                      letterSpacing: "-0.3px"
                    }}>Secure Consultation</h3>
                    <p style={{ 
                      color:"#64748B", 
                      fontSize:"0.85rem",
                      fontWeight:400 
                    }}>
                      Provide your setup specs; an attorney will examine your pipeline.
                    </p>
                  </div>

                  {/* Error Panel */}
                  {error && (
                    <div style={{
                      background:"#FEF2F2", 
                      border:"1px solid #FECACA",
                      borderRadius:"12px", 
                      padding:"14px",
                      marginBottom:"20px",
                      display:"flex", 
                      alignItems:"flex-start", 
                      gap:"10px",
                    }}>
                      <span style={{ fontSize:"16px", flexShrink:0 }}>⚠️</span>
                      <p style={{ 
                        color:"#DC2626", 
                        fontSize:"0.85rem",
                        lineHeight:1.5, 
                        fontWeight:600, 
                        margin:0 
                      }}>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}
                    style={{ display:"flex", flexDirection:"column", gap:"16px" }}
                    className="nw-li">

                    {/* Name + Phone */}
                    <div style={{ 
                      display:"grid",
                      gridTemplateColumns:"1fr 1fr", 
                      gap:"14px" 
                    }}
                      className="nw-form-row">
                      
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={handleChange} 
                        required
                        className="premium-input"
                      />

                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="Phone Number *"
                        value={form.phone}
                        pattern="[0-9+\-\s]{7,15}"
                        onChange={handleChange} 
                        required
                        className="premium-input"
                      />
                    </div>

                    {/* Email */}
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email Address *"
                      value={form.email} 
                      onChange={handleChange} 
                      required
                      className="premium-input"
                    />

                    {/* Service Dropdown */}
                    <div style={{ position: "relative" }}>
                      <select 
                        name="service" 
                        value={form.service}
                        onChange={handleChange} 
                        required
                        className="premium-input"
                        style={{
                          color: form.service ? "#0F172A":"#64748B",
                          cursor:"pointer",
                          appearance: "none",
                          WebkitAppearance: "none",
                          paddingRight: "40px"
                        }}
                      >
                        <option value="">Select Target Service *</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {/* Custom dropdown indicator chevron */}
                      <div style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "#64748B",
                        fontSize: "12px",
                        fontWeight: 900
                      }}>▼</div>
                    </div>

                    {/* Message Box */}
                    <textarea 
                      name="message"
                      placeholder="Tell us about your requirements, existing entities, or specific timelines detail…"
                      value={form.message} 
                      onChange={handleChange}
                      rows={4}
                      className="premium-input"
                      style={{ resize:"vertical" }}
                    />

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}
                      style={{
                        width:"100%", 
                        padding:"15px", 
                        borderRadius:"14px",
                        border:"none",
                        background: loading ? "#94A3B8"
                          : "linear-gradient(135deg,#4CAF50,#2E7D32)",
                        color:"#fff", 
                        fontWeight:700, 
                        fontSize:"0.95rem",
                        fontFamily:"inherit",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition:"all 0.3s ease",
                        display:"flex", 
                        alignItems:"center",
                        justifyContent:"center", 
                        gap:"10px",
                        boxShadow: loading ? "none"
                          : "0 6px 20px rgba(76,175,80,0.25)",
                      }}
                      onMouseOver={e => {
                        if (!loading) e.currentTarget.style.transform="translateY(-2px)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform="none";
                      }}>
                      {loading ? (
                        <>
                          <div style={{
                            width:"18px", 
                            height:"18px", 
                            borderRadius:"50%",
                            border:"2.5px solid rgba(255,255,255,0.3)",
                            borderTopColor:"#fff",
                            animation:"subtleSpin 0.75s linear infinite", 
                            flexShrink:0,
                          }}/>
                          Compiling Specs…
                        </>
                      ) : "Submit Secure Request 🚀"}
                    </button>

                    <style>{`
                      .nw-li input::placeholder,
                      .nw-li textarea::placeholder { color:#94A3B8 !important; }
                    `}</style>

                    <p style={{ 
                      color:"#94A3B8", 
                      fontSize:"0.72rem",
                      textAlign:"center", 
                      fontWeight:400,
                      lineHeight: 1.4 
                    }}>
                      By submitting, you authorize NxtWeave's empanelled attorney framework to 
                      perform data routing under standard GDPR & legal client-privilege regulations.
                    </p>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Map Section ──────────────────────────────────────────────────── */}
      <section style={{ background:"#F8FAFC", padding:"0", position: "relative" }}>
        <FadeUp>
          <div style={{ position:"relative", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
            <iframe
              title="NxtWeave Solutions Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112090.46040083263!2d77.22376474999999!3d28.5706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ 
                border:"none", 
                display:"block",
                filter:"grayscale(0.3) contrast(1.1) invert(0.04)" 
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Map overlay card */}
            <div 
              className="glass-card-light"
              style={{
                position:"absolute", 
                bottom:"28px", 
                left:"28px",
                borderRadius:"20px", 
                padding:"20px 24px",
                boxShadow:"0 10px 30px rgba(15,23,42,0.12)",
                border:"1px solid rgba(255,255,255,0.7)",
                maxWidth:"280px",
              }}
            >
              <div style={{ 
                display:"flex", 
                alignItems:"center",
                gap:"12px", 
                marginBottom:"10px" 
              }}>
                <img
                  src="/logo-dark.png"
                  alt="NxtWeave Logo"
                  style={{ height: "36px", width: "auto", flexShrink: 0 }}
                />
                <div>
                  <div style={{ 
                    fontFamily:"'Playfair Display',serif",
                    fontWeight:800, 
                    fontSize:"0.95rem", 
                    color:"#0F172A" 
                  }}>
                    NxtWeave Solutions
                  </div>
                  <div style={{ fontSize:"0.72rem", color:"#64748B" }}>
                    Noida, UP — 201301
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Noida,Uttar+Pradesh"
                target="_blank" rel="noreferrer"
                style={{
                  display:"inline-flex", 
                  alignItems:"center", 
                  gap:"6px",
                  fontSize:"0.78rem", 
                  color:"#2FA4C7", 
                  fontWeight:700,
                  textDecoration:"none",
                  transition: "all 0.2s"
                }}
                onMouseOver={e => e.currentTarget.style.color="#4CAF50"}
                onMouseOut={e => e.currentTarget.style.color="#2FA4C7"}
              >
                Navigate via Map ➔
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding:"80px 24px",
        background: "linear-gradient(135deg, #050C16 0%, #0D1B2D 100%)",
        textAlign:"center",
        position:"relative",
        overflow:"hidden",
        borderTop: "1px solid rgba(255,255,255,0.03)"
      }}>
        {/* Glow effect */}
        <div
          className="pulse-blob-contact-2"
          style={{
            position:     "absolute",
            bottom:       "-30%",
            right:        "20%",
            width:        "400px",
            height:       "400px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(37,211,102,0.05) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(50px)",
          }}
        />

        <FadeUp>
          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ 
              color:"rgba(255,255,255,0.45)", 
              fontSize:"0.72rem",
              fontWeight:700, 
              letterSpacing:"2.5px", 
              textTransform:"uppercase",
              marginBottom:"14px" 
            }}>Expedited Route?</p>
            <h2 style={{ 
              fontFamily:"'Playfair Display',serif", 
              color:"#fff",
              fontWeight:900, 
              fontSize:"clamp(1.7rem,3vw,2.3rem)",
              marginBottom:"14px",
              letterSpacing: "-0.5px"
            }}>
              Initiate Dynamic Setup via WhatsApp
            </h2>
            <p style={{ 
              color:"rgba(255,255,255,0.55)", 
              fontSize:"0.92rem",
              marginBottom:"32px", 
              fontWeight:300 
            }}>
              Connect directly with our regulatory board managers for quick setup advice.
            </p>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"
              style={{
                display:"inline-flex", 
                alignItems:"center", 
                gap:"10px",
                padding:"15px 36px", 
                borderRadius:"50px",
                background:"#25D366", 
                color:"#fff",
                fontWeight:700, 
                fontSize:"0.95rem",
                textDecoration:"none",
                boxShadow:"0 4px 25px rgba(37,211,102,0.35)",
                transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform="translateY(-3px)";
                e.currentTarget.style.boxShadow="0 8px 30px rgba(37,211,102,0.5)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform="none";
                e.currentTarget.style.boxShadow="0 4px 25px rgba(37,211,102,0.35)";
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start Chat on WhatsApp
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}