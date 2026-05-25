// src/pages/About.jsx  —  NxtWeave Solutions (complete final)
// No framer-motion — pure CSS animations
import { useEffect, useRef, useState } from "react";
import { useNavigate }                 from "react-router-dom";

// ─── Scroll animation hook ────────────────────────────────────────────────────
function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useVisible();
  const from = {
    up:    "translateY(32px)",
    left:  "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.92)",
  }[direction] || "translateY(32px)";

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : from,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section tag ──────────────────────────────────────────────────────────────
function Tag({ label, dark = false }) {
  const c = dark ? "rgba(255,255,255,0.6)" : "#2FA4C7";
  return (
    <div
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           "10px",
        fontSize:      "0.72rem",
        fontWeight:    600,
        color:         c,
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom:  "16px",
      }}
    >
      <span
        style={{
          width:       "24px",
          height:      "2px",
          background:  `linear-gradient(90deg, ${c}, transparent)`,
          flexShrink:  0,
          display:     "inline-block",
        }}
      />
      {label}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function GradientDivider() {
  return (
    <div
      style={{
        width:        "64px",
        height:       "4px",
        borderRadius: "3px",
        background:   "linear-gradient(90deg,#2FA4C7,#4CAF50)",
        margin:       "0 auto",
      }}
    />
  );
}

// ─── Check item ───────────────────────────────────────────────────────────────
function CheckItem({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
      <span
        className="nw-check-dot"
        style={{
          width:          "22px",
          height:         "22px",
          borderRadius:   "50%",
          background:     "rgba(47,164,199,0.12)",
          border:         "1px solid rgba(47,164,199,0.2)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          color:          "#2FA4C7",
          fontSize:       "11px",
          fontWeight:     800,
          flexShrink:     0,
          marginTop:      "2px",
          transition:     "all 0.3s ease",
        }}
      >✓</span>
      <span
        style={{
          color:      "#4A5D6E",
          fontSize:   "0.88rem",
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >{text}</span>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    value: "500+",
    label: "Businesses Served",
    sub:   "Across India & globally",
    icon:  "📊",
    color: "#2FA4C7",
  },
  {
    value: "99%",
    label: "Success Rate",
    sub:   "On all registrations",
    icon:  "✅",
    color: "#4CAF50",
  },
  {
    value: "35+",
    label: "Services Offered",
    sub:   "Under one roof",
    icon:  "🛠",
    color: "#FF9800",
  },
  {
    value: "Pan India",
    label: "Service Reach",
    sub:   "& International clients",
    icon:  "🌍",
    color: "#E91E63",
  },
  {
    value: "24 hrs",
    label: "Response Time",
    sub:   "Guaranteed reply",
    icon:  "⚡",
    color: "#FFEB3B",
  },
  {
    value: "100%",
    label: "Transparent",
    sub:   "No hidden charges, ever",
    icon:  "🔍",
    color: "#00BCD4",
  },
];

const TEAM_VALUES = [
  "We never oversell or overpromise.",
  "We explain every step in plain language.",
  "We follow up — you never have to chase us.",
  "We treat your business like our own.",
  "We are accessible — always reachable on WhatsApp.",
];

const CORE_VALUES = [
  "Integrity",
  "Transparency",
  "Excellence",
  "Innovation",
  "Client First",
  "Reliability",
];

// ─── Journey: Only 2026 milestones ───────────────────────────────────────────
const JOURNEY = [
  {
    year:  "2026",
    month: "January",
    icon:  "🚀",
    title: "NxtWeave Solutions Founded",
    desc:
      "NxtWeave Solutions was founded in Noida with one clear mission — to make business registration, compliance and digital growth simple, honest and affordable for every entrepreneur across India and globally.",
  },
  {
    year:  "2026",
    month: "February",
    icon:  "📋",
    title: "First Registrations Delivered",
    desc:
      "Within our first weeks, we successfully completed our first Private Limited Company and GST registrations — setting the standard for transparent, timely and professional service delivery.",
  },
  {
    year:  "2026",
    month: "March",
    icon:  "🏅",
    title: "Certifications Practice Launched",
    desc:
      "We expanded our offering to include ISO, Trademark, FSSAI, MSME and IEC certifications — becoming a genuinely comprehensive compliance partner for businesses across all sectors.",
  },
  {
    year:  "2026",
    month: "April",
    icon:  "💻",
    title: "Digital Solutions Division",
    desc:
      "We launched our digital arm — offering website development, web applications, SaaS platforms and UI/UX design. Clients could now handle compliance and digital growth in one place.",
  },
  {
    year:  "2026",
    month: "May",
    icon:  "🌍",
    title: "First International Client",
    desc:
      "We served our first international client — completing IEC and Trademark registration fully remotely for a business based in Dubai, UAE. A major milestone in our global expansion.",
  },
  {
    year:  "2026",
    month: "Present",
    icon:  "📈",
    title: "Growing Strong — 500+ Businesses",
    desc:
      "Today, NxtWeave Solutions serves startups, MSMEs, NGOs and enterprises across Pan India and internationally. We continue to grow with integrity, one client at a time.",
  },
];

const SERVICES_OVERVIEW = [
  {
    icon:  "📋",
    title: "Business Registration",
    desc:  "Pvt Ltd, LLP, Section 8, NGO Darpan, GeM, Trade Licence and more.",
    tab:   "registration",
  },
  {
    icon:  "🏅",
    title: "Certifications",
    desc:  "GST, MSME, ISO, Trademark, FSSAI, IEC, Startup India, ZED and more.",
    tab:   "certifications",
  },
  {
    icon:  "💻",
    title: "Digital Solutions",
    desc:  "Websites, web apps, SaaS platforms, dashboards and UI/UX design.",
    tab:   "digital",
  },
  {
    icon:  "📱",
    title: "Digital Marketing",
    desc:  "Social media, content, WhatsApp marketing, video editing and strategy.",
    tab:   "marketing",
  },
  {
    icon:  "🏛️",
    title: "Government Schemes",
    desc:  "Expert guidance on identifying and applying for eligible government schemes.",
    tab:   "",
  },
];

const WHY_US = [
  {
    icon:  "👨‍💼",
    title: "Expert Team",
    desc:  "Qualified professionals with deep regulatory knowledge across company law, taxation, certifications and digital domains.",
  },
  {
    icon:  "🔄",
    title: "End-to-End Support",
    desc:  "From your first consultation to post-registration compliance — one dedicated team manages everything so nothing falls through the cracks.",
  },
  {
    icon:  "🔍",
    title: "Transparent Process",
    desc:  "Clear timelines, step-by-step updates, zero hidden charges. You always know exactly where your work stands.",
  },
  {
    icon:  "💡",
    title: "Dual Expertise",
    desc:  "Most firms do either compliance or digital. We do both — giving you an integrated advantage under one roof.",
  },
  {
    icon:  "📈",
    title: "Growth Focused",
    desc:  "We don't just complete registrations — we help you understand what each step means for your long-term business growth.",
  },
  {
    icon:  "🌍",
    title: "Global Reach",
    desc:  "Serving clients across India and internationally — including UAE, Dubai, Singapore — with fully remote, paperless processes.",
  },
];

const CLIENT_TYPES = [
  "Startups",
  "MSMEs",
  "NGOs & Trusts",
  "Enterprises",
  "International Clients",
  "E-commerce",
  "Manufacturing",
  "Food & Hospitality",
  "IT & Tech",
  "Healthcare",
];

const TESTIMONIALS = [
  {
    initials: "JC",
    name:     "James Carter",
    role:     "International Business, Dubai UAE",
    text:
      "From Dubai, we completed our IEC and Trademark registration fully remotely with NxtWeave. The process was seamless, the communication was excellent, and the team genuinely cared about getting it right.",
  },
  {
    initials: "RS",
    name:     "Rahul Sharma",
    role:     "Startup Founder, Noida",
    text:
      "NxtWeave completed our Pvt Ltd registration quickly and professionally. They kept us informed at every single step — I've never experienced service this transparent.",
  },
  {
    initials: "PS",
    name:     "Priya Singh",
    role:     "NGO Director, Lucknow",
    text:
      "Applied for 12A and 80G together. Full support from document preparation to final approval. Could not have done it without their team.",
  },
];

// ─── Main About Page ──────────────────────────────────────────────────────────
export default function About() {
  const navigate             = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", background: "#050C16" }}>
      <style>{`
        /* Dynamic Animations */
        @keyframes pulseBlob {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          33% { transform: scale(1.15) translate(20px, -30px); opacity: 0.6; }
          66% { transform: scale(0.9) translate(-15px, 20px); opacity: 0.5; }
        }
        @keyframes pulseNode {
          0% { box-shadow: 0 0 0 0 rgba(47,164,199,0.7); transform: scale(0.95); }
          70% { box-shadow: 0 0 0 12px rgba(47,164,199,0); transform: scale(1.05); }
          100% { box-shadow: 0 0 0 0 rgba(47,164,199,0); transform: scale(0.95); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradientSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .pulse-blob-1 {
          animation: pulseBlob 12s infinite alternate ease-in-out;
        }
        .pulse-blob-2 {
          animation: pulseBlob 16s infinite alternate-reverse ease-in-out;
        }

        /* Glassmorphic Utilities */
        .glass-card-dark {
          background: rgba(13, 27, 45, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .glass-card-light {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 30px rgba(31, 66, 107, 0.04);
        }

        /* Component Hover Interactions */
        .hover-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .hover-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          border-color: rgba(47, 164, 199, 0.4) !important;
          box-shadow: 0 12px 30px rgba(47, 164, 199, 0.15) !important;
        }
        .hover-card-green:hover {
          transform: translateY(-6px) scale(1.01) !important;
          border-color: rgba(76, 175, 80, 0.4) !important;
          box-shadow: 0 12px 30px rgba(76, 175, 80, 0.15) !important;
        }

        .nw-check-item:hover .nw-check-dot {
          background: rgba(47,164,199,0.2) !important;
          transform: scale(1.1) !important;
        }

        /* Grid Breakpoints */
        @media(max-width:960px){
          .nw-about-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .nw-journey-line  { display:none !important; }
          .nw-journey-grid  { grid-template-columns: 1fr !important; gap: 20px !important; }
          .nw-journey-spacer{ display:none !important; }
          .nw-journey-dot-col { display: none !important; }
        }
        @media(max-width:768px){
          .nw-stats-grid    { grid-template-columns: repeat(3, 1fr) !important; gap: 14px !important; }
          .nw-why-grid      { grid-template-columns: 1fr !important; }
          .nw-svc-overview  { grid-template-columns: 1fr 1fr !important; }
          .nw-values-grid   { grid-template-columns: 1fr !important; }
        }
        @media(max-width:580px){
          .nw-stats-grid    { grid-template-columns: 1fr 1fr !important; }
          .nw-svc-overview  { grid-template-columns: 1fr !important; }
        }
        @media(max-width:400px){
          .nw-stats-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #050C16 0%, #0D1B2D 50%, #15273C 100%)",
          padding:    "140px 24px 100px",
          position:   "relative",
          overflow:   "hidden",
          textAlign:  "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.03)"
        }}
      >
        {/* Glow vector blobs */}
        <div
          className="pulse-blob-1"
          style={{
            position:     "absolute",
            top:          "-10%",
            right:        "10%",
            width:        "450px",
            height:       "450px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(47,164,199,0.1) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(60px)",
          }}
        />
        <div
          className="pulse-blob-2"
          style={{
            position:     "absolute",
            bottom:       "-15%",
            left:         "5%",
            width:        "400px",
            height:       "400px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(76,175,80,0.06) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(50px)",
          }}
        />

        <FadeUp>
          <div
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              padding:       "8px 20px",
              borderRadius:  "50px",
              background:    "rgba(47,164,199,0.08)",
              border:        "1px solid rgba(47,164,199,0.25)",
              color:         "#2FA4C7",
              fontSize:      "0.72rem",
              fontWeight:    800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom:  "24px",
              boxShadow:     "0 4px 15px rgba(47,164,199,0.1)",
            }}
          >
            🚀 Empowering Growth
          </div>

          <h1
            style={{
              fontFamily:   "'Playfair Display', serif",
              fontWeight:   900,
              fontSize:     "clamp(2.2rem, 6vw, 3.8rem)",
              color:        "#fff",
              lineHeight:   1.15,
              marginBottom: "20px",
              letterSpacing: "-0.5px"
            }}
          >
            About NxtWeave Solutions
          </h1>

          <p
            style={{
              color:        "rgba(255,255,255,0.65)",
              fontSize:     "1.05rem",
              lineHeight:   1.85,
              maxWidth:     "640px",
              margin:       "0 auto 28px",
              fontWeight:   300,
            }}
          >
            A premier business consulting and digital engineering practice 
            dedicated to helping startups, MSMEs, NGOs and enterprises 
            build invincible regulatory foundations and accelerate digital scale.
          </p>

          <GradientDivider />
        </FadeUp>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section
        style={{
          background:   "#F8FAFC",
          padding:      "64px 24px",
          position:     "relative",
          overflow:     "hidden"
        }}
      >
        {/* Subtle grid pattern background */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none"
        }} />

        <div
          className="nw-stats-grid"
          style={{
            maxWidth:            "1200px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap:                 "20px",
            position:            "relative",
            zIndex:              1
          }}
        >
          {STATS.map((s, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div
                className="glass-card-light hover-card"
                style={{
                  textAlign:    "center",
                  padding:      "26px 16px",
                  borderRadius: "20px",
                  height:       "100%",
                  display:      "flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:   "center",
                  cursor:       "default"
                }}
              >
                <div style={{ 
                  fontSize:"32px", 
                  marginBottom:"12px",
                  filter: `drop-shadow(0 4px 10px rgba(0,0,0,0.05))`
                }}>{s.icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize:   "1.8rem",
                    fontWeight: 900,
                    color:      "#0F172A",
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize:   "0.82rem",
                    fontWeight: 700,
                    color:      "#1E3A5F",
                    marginTop:  "6px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize:   "0.7rem",
                    color:      "#64748B",
                    marginTop:  "4px",
                    fontWeight: 400,
                  }}
                >
                  {s.sub}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", background:"#FFFFFF", position:"relative" }}>
        <div
          className="nw-about-grid"
          style={{
            maxWidth:            "1200px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap:                 "72px",
            alignItems:          "center",
          }}
        >
          {/* Left */}
          <FadeUp direction="left">
            <div>
              <Tag label="Who We Are" />
              <h2
                style={{
                  fontFamily:   "'Playfair Display',serif",
                  fontWeight:   900,
                  fontSize:     "clamp(1.9rem, 3.2vw, 2.6rem)",
                  color:        "#0F172A",
                  lineHeight:   1.25,
                  marginBottom: "24px",
                  letterSpacing: "-0.5px"
                }}
              >
                Your Trusted Architects for<br />
                <span style={{ 
                  background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900
                }}>
                  Business Setup & Scaling
                </span>
              </h2>
              <p
                style={{
                  color:        "#334155",
                  fontSize:     "0.98rem",
                  lineHeight:   1.85,
                  marginBottom: "20px",
                  fontWeight:   300,
                }}
              >
                NxtWeave Solutions was founded with a singular, disruptive thesis:
                incorporation and tax compliance shouldn't be a opaque puzzle of endless chases. 
                Indian and international founders deserve clear guidance, prompt deliveries, 
                and affordable services to kickstart their dreams.
              </p>
              <p
                style={{
                  color:        "#334155",
                  fontSize:     "0.98rem",
                  lineHeight:   1.85,
                  marginBottom: "20px",
                  fontWeight:   300,
                }}
              >
                Today, we serve a vibrant portfolio ranging from local scale-up startups to complex 
                cross-border MSMEs, NGOs raising active capital, and enterprises building high-density 
                digital architectures.
              </p>
              <p
                style={{
                  color:        "#334155",
                  fontSize:     "0.98rem",
                  lineHeight:   1.85,
                  marginBottom: "36px",
                  fontWeight:   300,
                }}
              >
                What defines NxtWeave is our unique capability: we have expert compliance attorneys 
                working side by side with modern digital designers and SaaS software engineers. 
                You build your legal base and launch your custom software stack all with one single, 
                high-efficiency team.
              </p>

              {/* How We Work box */}
              <div
                className="glass-card-light"
                style={{
                  borderRadius: "24px",
                  padding:      "28px 30px",
                  marginBottom: "36px",
                  boxShadow:    "0 10px 40px rgba(15,23,42,0.03)",
                  background:   "linear-gradient(to right, rgba(255,255,255,0.9), rgba(248,250,252,0.95))"
                }}
              >
                <h4
                  style={{
                    fontFamily:   "'Playfair Display',serif",
                    color:        "#0F172A",
                    fontWeight:   800,
                    fontSize:     "1.05rem",
                    marginBottom: "18px",
                  }}
                >
                  🛡 Our Working Philosophy
                </h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                  {TEAM_VALUES.map((v, i) => (
                    <div key={i} className="nw-check-item">
                      <CheckItem text={v} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate("/contact")}
                style={{
                  padding:      "15px 36px",
                  borderRadius: "50px",
                  background:   "#0F172A",
                  color:        "#fff",
                  border:       "none",
                  fontWeight:   700,
                  fontSize:     "0.92rem",
                  cursor:       "pointer",
                  fontFamily:   "'DM Sans',sans-serif",
                  transition:   "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow:    "0 4px 20px rgba(15,23,42,0.15)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#2FA4C7";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(47,164,199,0.3)";
                }}
                onMouseOut={(e)  => {
                  e.currentTarget.style.background = "#0F172A";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.15)";
                }}
              >
                Schedule Strategy Call →
              </button>
            </div>
          </FadeUp>

          {/* Right Column: Mission / Vision Cards */}
          <FadeUp direction="right" delay={120}>
            <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

              {/* Mission */}
              <div
                className="glass-card-light hover-card"
                style={{
                  borderRadius: "24px",
                  padding:      "28px",
                  display:      "flex",
                  alignItems:   "flex-start",
                  gap:          "20px",
                }}
              >
                <div
                  style={{
                    width:          "54px",
                    height:         "54px",
                    borderRadius:   "16px",
                    background:     "rgba(76,175,80,0.08)",
                    border:         "1px solid rgba(76,175,80,0.2)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "24px",
                    flexShrink:     0,
                    animation:      "bounceSlow 4s infinite ease-in-out"
                  }}
                >🎯</div>
                <div>
                  <h3
                    style={{
                      fontFamily:   "'Playfair Display',serif",
                      color:        "#0F172A",
                      fontWeight:   800,
                      fontSize:     "1.1rem",
                      marginBottom: "10px",
                    }}
                  >
                    Our Mission
                  </h3>
                  <p
                    style={{
                      color:      "#475569",
                      fontSize:   "0.88rem",
                      lineHeight: 1.75,
                      fontWeight: 400,
                    }}
                  >
                    To democratize setup compliance. We build state-of-the-art legal structures 
                    and tech platforms with absolute visual and regulatory honesty, fueling sustainable 
                    long-term business growth.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div
                className="glass-card-light hover-card"
                style={{
                  borderRadius: "24px",
                  padding:      "28px",
                  display:      "flex",
                  alignItems:   "flex-start",
                  gap:          "20px",
                }}
              >
                <div
                  style={{
                    width:          "54px",
                    height:         "54px",
                    borderRadius:   "16px",
                    background:     "rgba(47,164,199,0.08)",
                    border:         "1px solid rgba(47,164,199,0.2)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "24px",
                    flexShrink:     0,
                    animation:      "bounceSlow 4.5s infinite ease-in-out"
                  }}
                >🏆</div>
                <div>
                  <h3
                    style={{
                      fontFamily:   "'Playfair Display',serif",
                      color:        "#0F172A",
                      fontWeight:   800,
                      fontSize:     "1.1rem",
                      marginBottom: "10px",
                    }}
                  >
                    Our Vision
                  </h3>
                  <p
                    style={{
                      color:      "#475569",
                      fontSize:   "0.88rem",
                      lineHeight: 1.75,
                      fontWeight: 400,
                    }}
                  >
                    To establish NxtWeave as the global, premier multi-disciplinary firm where 
                    cutting-edge company compliance is woven directly together with elite SaaS digital execution.
                  </p>
                </div>
              </div>

              {/* Core Values card */}
              <div
                style={{
                  background:   "linear-gradient(135deg, #0F172A, #1E293B)",
                  borderRadius: "24px",
                  padding:      "28px 30px",
                  boxShadow:    "0 15px 35px rgba(15,23,42,0.2)"
                }}
              >
                <h3
                  style={{
                    fontFamily:   "'Playfair Display',serif",
                    color:        "#fff",
                    fontWeight:   800,
                    fontSize:     "1.1rem",
                    marginBottom: "18px",
                  }}
                >
                  💎 Our Core Values
                </h3>
                <div
                  className="nw-values-grid"
                  style={{
                    display:             "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap:                 "10px",
                  }}
                >
                  {CORE_VALUES.map((v) => (
                    <div
                      key={v}
                      style={{
                        background:   "rgba(255,255,255,0.03)",
                        border:       "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "14px",
                        padding:      "12px 14px",
                        fontSize:     "0.8rem",
                        fontWeight:   600,
                        color:        "rgba(255,255,255,0.9)",
                        display:      "flex",
                        alignItems:   "center",
                        gap:          "8px",
                        transition:   "all 0.3s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(47,164,199,0.1)";
                        e.currentTarget.style.borderColor = "rgba(47,164,199,0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                    >
                      <span style={{ color:"#4CAF50", fontWeight:900 }}>✓</span>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Our Journey (2026 only) ───────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", background:"#F8FAFC", position:"relative" }}>
        <div style={{ maxWidth:"1050px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"64px" }}>
              <Tag label="Our Corporate Chronology" />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize:   "clamp(1.9rem,3.2vw,2.5rem)",
                  color:      "#0F172A",
                }}
              >
                The Birth of NxtWeave Solutions —<br />
                <span style={{ 
                  background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900
                }}>Month by Month in 2026</span>
              </h2>
              <p
                style={{
                  color:      "#475569",
                  fontSize:   "0.92rem",
                  lineHeight: 1.85,
                  maxWidth:   "520px",
                  margin:     "16px auto 0",
                  fontWeight: 300,
                }}
              >
                Trace our footprints. How we designed a comprehensive, full-stack compliance 
                and engineering partner built on trust, clear delivery schedules, and client victories.
              </p>
            </div>
          </FadeUp>

          {/* Timeline Wrapper */}
          <div style={{ position:"relative", padding: "10px 0" }}>

            {/* Vertical Center Track line */}
            <div
              className="nw-journey-line"
              style={{
                position:     "absolute",
                left:         "50%",
                top:          0,
                bottom:       0,
                width:        "3px",
                background:   "linear-gradient(to bottom, #2FA4C7 0%, #4CAF50 50%, #2FA4C7 100%)",
                transform:    "translateX(-50%)",
                borderRadius: "3px",
                opacity:      0.7
              }}
            />

            {JOURNEY.map((item, i) => (
              <FadeUp
                key={i}
                delay={i * 90}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div
                  className="nw-journey-grid"
                  style={{
                    display:             "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap:                 "44px",
                    alignItems:          "center",
                    marginBottom:        i < JOURNEY.length - 1 ? "52px" : 0,
                  }}
                >
                  {/* Left Side: Card (even) or Spacer (odd) */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {i % 2 === 0 ? (
                      <div
                        className="glass-card-light hover-card"
                        style={{
                          borderRadius: "24px",
                          padding:      "26px 28px",
                          width:        "100%",
                          maxWidth:     "450px",
                          textAlign:    "right",
                          position:     "relative"
                        }}
                      >
                        <div
                          style={{
                            display:      "inline-flex",
                            alignItems:   "center",
                            gap:          "10px",
                            marginBottom: "12px",
                            flexDirection:"row-reverse"
                          }}
                        >
                          <span style={{ fontSize:"22px" }}>{item.icon}</span>
                          <span
                            style={{
                              fontSize:      "0.72rem",
                              fontWeight:    800,
                              color:         "#2FA4C7",
                              letterSpacing: "1.5px",
                              textTransform: "uppercase",
                              background:    "rgba(47,164,199,0.08)",
                              padding:       "4px 12px",
                              borderRadius:  "50px"
                            }}
                          >
                            {item.month} {item.year}
                          </span>
                        </div>
                        <h4
                          style={{
                            fontFamily:   "'Playfair Display',serif",
                            color:        "#0F172A",
                            fontWeight:   800,
                            fontSize:     "1.05rem",
                            marginBottom: "10px",
                            lineHeight:   1.35,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            color:      "#475569",
                            fontSize:   "0.85rem",
                            lineHeight: 1.75,
                            fontWeight: 400,
                            margin:     0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ) : (
                      <div className="nw-journey-spacer" style={{ width: "100%", maxWidth: "450px" }} />
                    )}
                  </div>

                  {/* Central Node Indicator */}
                  <div
                    className="nw-journey-dot-col"
                    style={{
                      width:          "48px",
                      height:         "48px",
                      borderRadius:   "50%",
                      background:     "linear-gradient(135deg, #0F172A, #2FA4C7)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      color:          "#fff",
                      fontSize:       "20px",
                      boxShadow:      "0 0 15px rgba(47,164,199,0.4)",
                      flexShrink:     0,
                      zIndex:         2,
                      animation:      "pulseNode 3s infinite"
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Right Side: Card (odd) or Spacer (even) */}
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    {i % 2 !== 0 ? (
                      <div
                        className="glass-card-light hover-card"
                        style={{
                          borderRadius: "24px",
                          padding:      "26px 28px",
                          width:        "100%",
                          maxWidth:     "450px",
                          textAlign:    "left",
                          position:     "relative"
                        }}
                      >
                        <div
                          style={{
                            display:      "inline-flex",
                            alignItems:   "center",
                            gap:          "10px",
                            marginBottom: "12px",
                          }}
                        >
                          <span style={{ fontSize:"22px" }}>{item.icon}</span>
                          <span
                            style={{
                              fontSize:      "0.72rem",
                              fontWeight:    800,
                              color:         "#2FA4C7",
                              letterSpacing: "1.5px",
                              textTransform: "uppercase",
                              background:    "rgba(47,164,199,0.08)",
                              padding:       "4px 12px",
                              borderRadius:  "50px"
                            }}
                          >
                            {item.month} {item.year}
                          </span>
                        </div>
                        <h4
                          style={{
                            fontFamily:   "'Playfair Display',serif",
                            color:        "#0F172A",
                            fontWeight:   800,
                            fontSize:     "1.05rem",
                            marginBottom: "10px",
                            lineHeight:   1.35,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            color:      "#475569",
                            fontSize:   "0.85rem",
                            lineHeight: 1.75,
                            fontWeight: 400,
                            margin:     0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ) : (
                      <div className="nw-journey-spacer" style={{ width: "100%", maxWidth: "450px" }} />
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", background:"#FFFFFF", position:"relative" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <Tag label="Corporate Capabilities" />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize:   "clamp(1.9rem,3.2vw,2.5rem)",
                  color:      "#0F172A",
                }}
              >
                Empowering Enterprise Setup —<br />
                <span style={{ 
                  background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900
                }}>Compliance & Execution under One Roof</span>
              </h2>
            </div>
          </FadeUp>

          <div
            className="nw-svc-overview"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap:                 "20px",
            }}
          >
            {SERVICES_OVERVIEW.map((s, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div
                  className="glass-card-light hover-card"
                  style={{
                    borderRadius: "24px",
                    padding:      "30px 22px",
                    textAlign:    "center",
                    height:       "100%",
                    cursor:       "pointer",
                    display:      "flex",
                    flexDirection:"column",
                    justifyContent:"space-between",
                    transition:   "all 0.3s ease",
                  }}
                  onClick={() =>
                    navigate(`/services${s.tab ? `?tab=${s.tab}` : ""}`)
                  }
                >
                  <div>
                    <div style={{ 
                      fontSize:"36px", 
                      marginBottom:"18px",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.06))" 
                    }}>{s.icon}</div>
                    <h4
                      style={{
                        fontFamily:   "'Playfair Display',serif",
                        color:        "#0F172A",
                        fontWeight:   800,
                        fontSize:     "0.98rem",
                        marginBottom: "10px",
                        lineHeight:   1.3
                      }}
                    >
                      {s.title}
                    </h4>
                    <p
                      style={{
                        color:      "#475569",
                        fontSize:   "0.82rem",
                        lineHeight: 1.7,
                        fontWeight: 400,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop:  "20px",
                      color:      "#2FA4C7",
                      fontSize:   "0.8rem",
                      fontWeight: 700,
                      display:    "inline-flex",
                      alignItems: "center",
                      justifyContent:"center",
                      gap:        "4px"
                    }}
                  >
                    Explore Options ➔
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", background:"#F8FAFC", position:"relative" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <Tag label="Why NxtWeave Solutions" />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize:   "clamp(1.9rem,3.2vw,2.5rem)",
                  color:      "#0F172A",
                }}
              >
                Top-Tier Regulatory Insight & Technical Skill —<br />
                <span style={{ 
                  background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 900
                }}>Designed for Modern Scaling</span>
              </h2>
            </div>
          </FadeUp>

          <div
            className="nw-why-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap:                 "20px",
            }}
          >
            {WHY_US.map((item, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div
                  className="glass-card-light hover-card-green"
                  style={{
                    borderRadius: "24px",
                    padding:      "28px",
                    display:      "flex",
                    alignItems:   "flex-start",
                    gap:          "20px",
                    height:       "100%",
                  }}
                >
                  <div
                    style={{
                      width:          "52px",
                      height:         "52px",
                      borderRadius:   "16px",
                      background:     "rgba(76,175,80,0.08)",
                      border:         "1px solid rgba(76,175,80,0.18)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontSize:       "24px",
                      flexShrink:     0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily:   "'Playfair Display',serif",
                        color:        "#0F172A",
                        fontWeight:   800,
                        fontSize:     "1.02rem",
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        color:      "#475569",
                        fontSize:   "0.85rem",
                        lineHeight: 1.75,
                        fontWeight: 400,
                        margin:     0
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (rotating) ───────────────────────────────────────── */}
      <section
        style={{
          padding:    "100px 24px",
          background: "linear-gradient(135deg, #050C16 0%, #0D1B2D 100%)",
          position:   "relative",
          overflow:   "hidden",
          borderTop:  "1px solid rgba(255,255,255,0.03)",
          borderBottom:"1px solid rgba(255,255,255,0.03)"
        }}
      >
        <div
          className="pulse-blob-1"
          style={{
            position:     "absolute",
            top:          "20%",
            left:         "-10%",
            width:        "350px",
            height:       "350px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(47,164,199,0.07) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(40px)",
          }}
        />

        <FadeUp>
          <div style={{ maxWidth:"900px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <Tag label="Proven Traction" dark />
            <h2
              style={{
                fontFamily:   "'Playfair Display',serif",
                fontWeight:   900,
                fontSize:     "clamp(1.9rem,3.2vw,2.5rem)",
                color:        "#fff",
                marginBottom: "20px",
              }}
            >
              Startups That Co-Created Success<br />
              <em style={{ 
                background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "normal",
                fontWeight: 900
              }}>
                With NxtWeave Solutions
              </em>
            </h2>
            <p
              style={{
                color:        "rgba(255,255,255,0.6)",
                fontSize:     "0.95rem",
                lineHeight:   1.8,
                marginBottom: "40px",
                fontWeight:   300,
                maxWidth:     "600px",
                margin:       "0 auto 40px"
              }}
            >
              From ambitious solo founders filing their first Private Limited setup to overseas 
              companies securing trade channels — here are genuine validation reports.
            </p>

            {/* Client type pills */}
            <div
              style={{
                display:        "flex",
                flexWrap:       "wrap",
                justifyContent: "center",
                gap:            "10px",
                marginBottom:   "44px",
              }}
            >
              {CLIENT_TYPES.map((c) => (
                <span
                  key={c}
                  style={{
                    padding:      "8px 20px",
                    borderRadius: "50px",
                    background:   "rgba(255,255,255,0.03)",
                    border:       "1px solid rgba(255,255,255,0.08)",
                    color:        "rgba(255,255,255,0.75)",
                    fontSize:     "0.8rem",
                    fontWeight:   500,
                    transition:   "all 0.3s ease",
                    cursor:       "default"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "rgba(47,164,199,0.3)";
                    e.currentTarget.style.background = "rgba(47,164,199,0.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Rotating testimonial container */}
            <div
              className="glass-card-dark"
              style={{
                borderRadius: "28px",
                padding:      "36px 40px",
                marginBottom: "28px",
                minHeight:    "200px",
                transition:   "all 0.5s ease",
                textAlign:    "center"
              }}
            >
              <div
                style={{
                  color:        "#F59E0B",
                  fontSize:     "18px",
                  marginBottom: "18px",
                  letterSpacing:"4px"
                }}
              >
                ★★★★★
              </div>
              <p
                style={{
                  color:        "rgba(255,255,255,0.85)",
                  fontSize:     "1.02rem",
                  lineHeight:   1.85,
                  fontStyle:    "italic",
                  fontWeight:   300,
                  marginBottom: "20px",
                }}
              >
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            "14px",
                }}
              >
                <div
                  style={{
                    width:          "46px",
                    height:         "46px",
                    borderRadius:   "50%",
                    background:     "linear-gradient(135deg,#2FA4C7,#4CAF50)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    color:          "#fff",
                    fontWeight:     800,
                    fontSize:       "14px",
                    boxShadow:      "0 4px 15px rgba(47,164,199,0.3)"
                  }}
                >
                  {TESTIMONIALS[activeTestimonial].initials}
                </div>
                <div style={{ textAlign:"left" }}>
                  <div
                    style={{
                      color:      "#fff",
                      fontWeight: 700,
                      fontSize:   "0.92rem",
                    }}
                  >
                    {TESTIMONIALS[activeTestimonial].name}
                  </div>
                  <div
                    style={{
                      color:    "rgba(255,255,255,0.45)",
                      fontSize: "0.78rem",
                      fontWeight:300
                    }}
                  >
                    {TESTIMONIALS[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div
              style={{
                display:        "flex",
                justifyContent: "center",
                gap:            "10px",
                marginBottom:   "32px",
              }}
            >
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width:        i === activeTestimonial ? "28px" : "8px",
                    height:       "8px",
                    borderRadius: "50px",
                    background:   i === activeTestimonial
                      ? "#2FA4C7"
                      : "rgba(255,255,255,0.2)",
                    border:       "none",
                    cursor:       "pointer",
                    transition:   "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    padding:      0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              style={{
                padding:      "12px 30px",
                borderRadius: "50px",
                background:   "rgba(255,255,255,0.05)",
                border:       "1px solid rgba(255,255,255,0.15)",
                color:        "rgba(255,255,255,0.85)",
                fontWeight:   600,
                fontSize:     "0.87rem",
                cursor:       "pointer",
                fontFamily:   "'DM Sans',sans-serif",
                transition:   "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              Read Client Case Studies →
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    "90px 24px",
          background: "linear-gradient(135deg, #050C16 0%, #0D1B2D 100%)",
          textAlign:  "center",
          position:   "relative",
          overflow:   "hidden"
        }}
      >
        {/* Neon Light Blob */}
        <div
          className="pulse-blob-2"
          style={{
            position:     "absolute",
            bottom:       "-30%",
            right:        "15%",
            width:        "450px",
            height:       "450px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)",
            pointerEvents:"none",
            filter:       "blur(60px)",
          }}
        />

        <FadeUp>
          <div style={{ position:"relative", zIndex:1 }}>
            <Tag label="Consultation Scheduling" dark />
            <h2
              style={{
                fontFamily:   "'Playfair Display',serif",
                color:        "#fff",
                fontWeight:   900,
                fontSize:     "clamp(2rem, 3.5vw, 2.8rem)",
                marginBottom: "16px",
                lineHeight:   1.25,
                letterSpacing: "-0.5px"
              }}
            >
              Ready to Accelerate Compliance?<br />
              <span style={{ 
                background: "linear-gradient(90deg, #2FA4C7, #4CAF50)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900
              }}>Let's Co-Create Your Launch.</span>
            </h2>
            <p
              style={{
                color:        "rgba(255,255,255,0.55)",
                fontSize:     "0.95rem",
                lineHeight:   1.8,
                marginBottom: "36px",
                fontWeight:   300,
                maxWidth:     "500px",
                margin:       "0 auto 36px"
              }}
            >
              Zero commitment first consultation. Complete review of incorporation roadmaps 
              and custom engineering solutions.
            </p>
            <div
              style={{
                display:        "flex",
                gap:            "16px",
                justifyContent: "center",
                flexWrap:       "wrap",
              }}
            >
              <button
                onClick={() => navigate("/contact")}
                style={{
                  padding:      "15px 36px",
                  borderRadius: "50px",
                  background:   "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  color:        "#fff",
                  border:       "none",
                  fontWeight:   700,
                  fontSize:     "0.92rem",
                  cursor:       "pointer",
                  boxShadow:    "0 4px 25px rgba(76,175,80,0.3)",
                  transition:   "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  fontFamily:   "'DM Sans',sans-serif",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(76,175,80,0.45)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 25px rgba(76,175,80,0.3)";
                }}
              >
                Secure Free Compliance Review
              </button>

              <a
                href="https://wa.me/919711565533"
                target="_blank"
                rel="noreferrer"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "10px",
                  padding:       "15px 36px",
                  borderRadius:  "50px",
                  background:    "#25D366",
                  color:         "#fff",
                  fontWeight:    700,
                  fontSize:      "0.92rem",
                  textDecoration:"none",
                  boxShadow:     "0 4px 25px rgba(37,211,102,0.25)",
                  transition:    "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 25px rgba(37,211,102,0.25)";
                }}
              >
                💬 Talk via WhatsApp
              </a>

              <button
                onClick={() => navigate("/services")}
                style={{
                  padding:      "15px 36px",
                  borderRadius: "50px",
                  background:   "rgba(255,255,255,0.06)",
                  border:       "1px solid rgba(255,255,255,0.18)",
                  color:        "rgba(255,255,255,0.85)",
                  fontWeight:   600,
                  fontSize:     "0.92rem",
                  cursor:       "pointer",
                  fontFamily:   "'DM Sans',sans-serif",
                  transition:   "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform  = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform  = "none";
                }}
              >
                Browse Service Suite
              </button>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}