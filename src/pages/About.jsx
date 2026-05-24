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
    up:    "translateY(28px)",
    left:  "translateX(-32px)",
    right: "translateX(32px)",
    scale: "scale(0.93)",
  }[direction] || "translateY(28px)";

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : from,
        transition: `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section tag ──────────────────────────────────────────────────────────────
function Tag({ label, dark = false }) {
  const c = dark ? "rgba(255,255,255,0.5)" : "#2FA4C7";
  return (
    <div
      style={{
        display:       "flex",
        alignItems:    "center",
        gap:           "10px",
        fontSize:      "0.68rem",
        fontWeight:    600,
        color:         c,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        marginBottom:  "12px",
      }}
    >
      <span
        style={{
          width:       "22px",
          height:      "1.5px",
          background:  c,
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
        width:        "56px",
        height:       "3px",
        borderRadius: "2px",
        background:   "linear-gradient(90deg,#2FA4C7,#4CAF50)",
        margin:       "0 auto",
      }}
    />
  );
}

// ─── Check item ───────────────────────────────────────────────────────────────
function CheckItem({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
      <span
        style={{
          width:          "20px",
          height:         "20px",
          borderRadius:   "50%",
          background:     "rgba(47,164,199,0.12)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          color:          "#2FA4C7",
          fontSize:       "10px",
          fontWeight:     700,
          flexShrink:     0,
          marginTop:      "1px",
        }}
      >✓</span>
      <span
        style={{
          color:      "#556B7D",
          fontSize:   "0.85rem",
          lineHeight: 1.6,
          fontWeight: 300,
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
  },
  {
    value: "99%",
    label: "Success Rate",
    sub:   "On all registrations",
    icon:  "✅",
  },
  {
    value: "35+",
    label: "Services Offered",
    sub:   "Under one roof",
    icon:  "🛠",
  },
  {
    value: "Pan India",
    label: "Service Reach",
    sub:   "& International clients",
    icon:  "🌍",
  },
  {
    value: "24 hrs",
    label: "Response Time",
    sub:   "Guaranteed reply",
    icon:  "⚡",
  },
  {
    value: "100%",
    label: "Transparent",
    sub:   "No hidden charges, ever",
    icon:  "🔍",
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
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @media(max-width:900px){
          .nw-about-grid    { grid-template-columns:1fr !important; }
          .nw-journey-line  { display:none !important; }
          .nw-journey-grid  { grid-template-columns:1fr !important; gap:16px !important; }
          .nw-journey-spacer{ display:none !important; }
        }
        @media(max-width:768px){
          .nw-stats-grid    { grid-template-columns:1fr 1fr !important; }
          .nw-why-grid      { grid-template-columns:1fr !important; }
          .nw-svc-overview  { grid-template-columns:1fr 1fr !important; }
          .nw-values-grid   { grid-template-columns:1fr !important; }
        }
        @media(max-width:480px){
          .nw-stats-grid    { grid-template-columns:1fr !important; }
          .nw-svc-overview  { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 60%,#1a4a73 100%)",
          padding:    "120px 24px 80px",
          position:   "relative",
          overflow:   "hidden",
          textAlign:  "center",
        }}
      >
        <div
          style={{
            position:     "absolute",
            top:          "-60px",
            right:        "-60px",
            width:        "380px",
            height:       "380px",
            borderRadius: "50%",
            background:   "radial-gradient(circle,rgba(47,164,199,0.1),transparent 70%)",
            pointerEvents:"none",
          }}
        />
        <div
          style={{
            position:     "absolute",
            bottom:       "-40px",
            left:         "-40px",
            width:        "300px",
            height:       "300px",
            borderRadius: "50%",
            background:   "radial-gradient(circle,rgba(76,175,80,0.07),transparent 70%)",
            pointerEvents:"none",
          }}
        />

        <FadeUp>
          <div
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              padding:       "6px 18px",
              borderRadius:  "50px",
              background:    "rgba(47,164,199,0.12)",
              border:        "1px solid rgba(47,164,199,0.28)",
              color:         "#2FA4C7",
              fontSize:      "0.68rem",
              fontWeight:    700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom:  "20px",
            }}
          >
            About Us
          </div>

          <h1
            style={{
              fontFamily:   "'Playfair Display',serif",
              fontWeight:   900,
              fontSize:     "clamp(2rem,5vw,3.2rem)",
              color:        "#fff",
              lineHeight:   1.1,
              marginBottom: "16px",
            }}
          >
            About NxtWeave Solutions
          </h1>

          <p
            style={{
              color:        "rgba(255,255,255,0.55)",
              fontSize:     "0.95rem",
              lineHeight:   1.8,
              maxWidth:     "560px",
              margin:       "0 auto 20px",
              fontWeight:   300,
            }}
          >
            A modern business consulting and digital solutions company
            dedicated to helping startups, MSMEs, NGOs and enterprises
            build strong foundations and grow with confidence.
          </p>

          <GradientDivider />
        </FadeUp>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section
        style={{
          background:   "#fff",
          padding:      "52px 24px",
          borderBottom: "1px solid #e0e9f2",
        }}
      >
        <div
          className="nw-stats-grid"
          style={{
            maxWidth:            "1200px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap:                 "16px",
          }}
        >
          {STATS.map((s, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div
                style={{
                  textAlign:    "center",
                  padding:      "20px 12px",
                  borderRadius: "16px",
                  border:       "1px solid #e0e9f2",
                  transition:   "all 0.3s",
                  height:       "100%",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#2FA4C7";
                  e.currentTarget.style.boxShadow   = "0 4px 20px rgba(47,164,199,0.1)";
                  e.currentTarget.style.transform   = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e0e9f2";
                  e.currentTarget.style.boxShadow   = "none";
                  e.currentTarget.style.transform   = "none";
                }}
              >
                <div style={{ fontSize:"24px", marginBottom:"8px" }}>{s.icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize:   "1.5rem",
                    fontWeight: 900,
                    color:      "#1E3A5F",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize:   "0.8rem",
                    fontWeight: 700,
                    color:      "#1E3A5F",
                    marginTop:  "4px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize:   "0.7rem",
                    color:      "#8FA3B4",
                    marginTop:  "2px",
                    fontWeight: 300,
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
      <section style={{ padding:"80px 24px", background:"#F4F8FB" }}>
        <div
          className="nw-about-grid"
          style={{
            maxWidth:            "1100px",
            margin:              "0 auto",
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "56px",
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
                  fontSize:     "clamp(1.7rem,2.8vw,2.3rem)",
                  color:        "#1E3A5F",
                  lineHeight:   1.2,
                  marginBottom: "20px",
                }}
              >
                Your Trusted Partner for<br />
                <span style={{ color:"#2FA4C7" }}>
                  Business Growth & Compliance
                </span>
              </h2>
              <p
                style={{
                  color:        "#556B7D",
                  fontSize:     "0.92rem",
                  lineHeight:   1.85,
                  marginBottom: "16px",
                  fontWeight:   300,
                }}
              >
                NxtWeave Solutions was founded with one clear mission — to make
                business registration, compliance and digital growth simple,
                honest and genuinely helpful for every entrepreneur in India
                and beyond.
              </p>
              <p
                style={{
                  color:        "#556B7D",
                  fontSize:     "0.92rem",
                  lineHeight:   1.85,
                  marginBottom: "16px",
                  fontWeight:   300,
                }}
              >
                We work with startups taking their first steps, MSMEs scaling
                to new markets, NGOs seeking government recognition, and
                enterprises building digital infrastructure. Whatever stage
                you're at, we are equipped to guide you forward.
              </p>
              <p
                style={{
                  color:        "#556B7D",
                  fontSize:     "0.92rem",
                  lineHeight:   1.85,
                  marginBottom: "28px",
                  fontWeight:   300,
                }}
              >
                What sets us apart is our dual expertise — deep regulatory
                knowledge combined with modern digital capabilities — giving
                clients a genuine end-to-end advantage under one roof.
              </p>

              {/* How We Work box */}
              <div
                style={{
                  background:   "#fff",
                  borderRadius: "16px",
                  padding:      "20px 22px",
                  border:       "1px solid #e0e9f2",
                  marginBottom: "28px",
                  boxShadow:    "0 1px 8px rgba(30,58,95,0.05)",
                }}
              >
                <h4
                  style={{
                    fontFamily:   "'Playfair Display',serif",
                    color:        "#1E3A5F",
                    fontWeight:   700,
                    fontSize:     "0.9rem",
                    marginBottom: "14px",
                  }}
                >
                  How We Work
                </h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {TEAM_VALUES.map((v, i) => (
                    <CheckItem key={i} text={v} />
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate("/contact")}
                style={{
                  padding:      "12px 28px",
                  borderRadius: "50px",
                  background:   "#1E3A5F",
                  color:        "#fff",
                  border:       "none",
                  fontWeight:   600,
                  fontSize:     "0.87rem",
                  cursor:       "pointer",
                  fontFamily:   "'DM Sans',sans-serif",
                  transition:   "all 0.3s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#2FA4C7"}
                onMouseOut={(e)  => e.currentTarget.style.background = "#1E3A5F"}
              >
                Talk to Our Team →
              </button>
            </div>
          </FadeUp>

          {/* Right */}
          <FadeUp direction="right" delay={100}>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

              {/* Mission */}
              <div
                style={{
                  background:   "#fff",
                  borderRadius: "18px",
                  padding:      "22px 24px",
                  border:       "1px solid #e0e9f2",
                  boxShadow:    "0 2px 12px rgba(30,58,95,0.06)",
                  display:      "flex",
                  alignItems:   "flex-start",
                  gap:          "16px",
                }}
              >
                <div
                  style={{
                    width:          "48px",
                    height:         "48px",
                    borderRadius:   "14px",
                    background:     "rgba(76,175,80,0.1)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "22px",
                    flexShrink:     0,
                  }}
                >🎯</div>
                <div>
                  <h3
                    style={{
                      fontFamily:   "'Playfair Display',serif",
                      color:        "#1E3A5F",
                      fontWeight:   700,
                      fontSize:     "1rem",
                      marginBottom: "8px",
                    }}
                  >
                    Our Mission
                  </h3>
                  <p
                    style={{
                      color:      "#556B7D",
                      fontSize:   "0.85rem",
                      lineHeight: 1.75,
                      fontWeight: 300,
                    }}
                  >
                    To empower entrepreneurs and businesses with transparent,
                    reliable and professional consulting that drives real,
                    measurable business growth — not just paperwork.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div
                style={{
                  background:   "#fff",
                  borderRadius: "18px",
                  padding:      "22px 24px",
                  border:       "1px solid #e0e9f2",
                  boxShadow:    "0 2px 12px rgba(30,58,95,0.06)",
                  display:      "flex",
                  alignItems:   "flex-start",
                  gap:          "16px",
                }}
              >
                <div
                  style={{
                    width:          "48px",
                    height:         "48px",
                    borderRadius:   "14px",
                    background:     "rgba(47,164,199,0.1)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "22px",
                    flexShrink:     0,
                  }}
                >🏆</div>
                <div>
                  <h3
                    style={{
                      fontFamily:   "'Playfair Display',serif",
                      color:        "#1E3A5F",
                      fontWeight:   700,
                      fontSize:     "1rem",
                      marginBottom: "8px",
                    }}
                  >
                    Our Vision
                  </h3>
                  <p
                    style={{
                      color:      "#556B7D",
                      fontSize:   "0.85rem",
                      lineHeight: 1.75,
                      fontWeight: 300,
                    }}
                  >
                    To become a globally trusted consulting and digital solutions
                    company — the first call every entrepreneur makes when
                    they want to build something that lasts.
                  </p>
                </div>
              </div>

              {/* Core Values */}
              <div
                style={{
                  background:   "linear-gradient(135deg,#1E3A5F,#1a4a73)",
                  borderRadius: "18px",
                  padding:      "22px 24px",
                }}
              >
                <h3
                  style={{
                    fontFamily:   "'Playfair Display',serif",
                    color:        "#fff",
                    fontWeight:   700,
                    fontSize:     "1rem",
                    marginBottom: "14px",
                  }}
                >
                  Core Values
                </h3>
                <div
                  className="nw-values-grid"
                  style={{
                    display:             "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap:                 "8px",
                  }}
                >
                  {CORE_VALUES.map((v) => (
                    <div
                      key={v}
                      style={{
                        background:   "rgba(255,255,255,0.08)",
                        border:       "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px",
                        padding:      "10px 12px",
                        fontSize:     "0.78rem",
                        fontWeight:   600,
                        color:        "rgba(255,255,255,0.85)",
                        display:      "flex",
                        alignItems:   "center",
                        gap:          "7px",
                      }}
                    >
                      <span style={{ color:"#4CAF50", fontWeight:800 }}>✓</span>
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
      <section style={{ padding:"80px 24px", background:"#fff" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"56px" }}>
              <Tag label="Our Journey" />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize:   "clamp(1.7rem,2.8vw,2.2rem)",
                  color:      "#1E3A5F",
                }}
              >
                How NxtWeave Was Built —<br />
                <span style={{ color:"#2FA4C7" }}>Month by Month in 2026</span>
              </h2>
              <p
                style={{
                  color:      "#556B7D",
                  fontSize:   "0.88rem",
                  lineHeight: 1.8,
                  maxWidth:   "480px",
                  margin:     "12px auto 0",
                  fontWeight: 300,
                }}
              >
                Every great company starts somewhere. Here is ours —
                built step by step with purpose, honesty and a focus
                on serving clients the right way.
              </p>
            </div>
          </FadeUp>

          {/* Timeline */}
          <div style={{ position:"relative" }}>

            {/* Vertical center line */}
            <div
              className="nw-journey-line"
              style={{
                position:     "absolute",
                left:         "50%",
                top:          0,
                bottom:       0,
                width:        "2px",
                background:   "linear-gradient(to bottom,#2FA4C7,#4CAF50)",
                transform:    "translateX(-50%)",
                borderRadius: "2px",
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
                    gap:                 "32px",
                    alignItems:          "start",
                    marginBottom:        i < JOURNEY.length - 1 ? "44px" : 0,
                  }}
                >
                  {/* Left card (even) or spacer (odd) */}
                  <div>
                    {i % 2 === 0 ? (
                      <div
                        style={{
                          background:   "#F4F8FB",
                          borderRadius: "18px",
                          padding:      "22px 24px",
                          border:       "1px solid #e0e9f2",
                          transition:   "all 0.3s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = "#2FA4C7";
                          e.currentTarget.style.boxShadow   = "0 6px 24px rgba(47,164,199,0.1)";
                          e.currentTarget.style.background  = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = "#e0e9f2";
                          e.currentTarget.style.boxShadow   = "none";
                          e.currentTarget.style.background  = "#F4F8FB";
                        }}
                      >
                        <div
                          style={{
                            display:      "flex",
                            alignItems:   "center",
                            gap:          "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <span style={{ fontSize:"18px" }}>{item.icon}</span>
                          <div>
                            <div
                              style={{
                                fontSize:      "0.65rem",
                                fontWeight:    700,
                                color:         "#2FA4C7",
                                letterSpacing: "1.5px",
                                textTransform: "uppercase",
                              }}
                            >
                              {item.month} {item.year}
                            </div>
                          </div>
                        </div>
                        <h4
                          style={{
                            fontFamily:   "'Playfair Display',serif",
                            color:        "#1E3A5F",
                            fontWeight:   700,
                            fontSize:     "0.95rem",
                            marginBottom: "8px",
                            lineHeight:   1.35,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            color:      "#556B7D",
                            fontSize:   "0.82rem",
                            lineHeight: 1.72,
                            fontWeight: 300,
                            margin:     0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ) : (
                      <div className="nw-journey-spacer" />
                    )}
                  </div>

                  {/* Center dot */}
                  <div
                    style={{
                      width:          "44px",
                      height:         "44px",
                      borderRadius:   "50%",
                      background:     "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      color:          "#fff",
                      fontSize:       "18px",
                      boxShadow:      "0 4px 16px rgba(30,58,95,0.25)",
                      flexShrink:     0,
                      marginTop:      "10px",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Right card (odd) or spacer (even) */}
                  <div>
                    {i % 2 !== 0 ? (
                      <div
                        style={{
                          background:   "#F4F8FB",
                          borderRadius: "18px",
                          padding:      "22px 24px",
                          border:       "1px solid #e0e9f2",
                          transition:   "all 0.3s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = "#2FA4C7";
                          e.currentTarget.style.boxShadow   = "0 6px 24px rgba(47,164,199,0.1)";
                          e.currentTarget.style.background  = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = "#e0e9f2";
                          e.currentTarget.style.boxShadow   = "none";
                          e.currentTarget.style.background  = "#F4F8FB";
                        }}
                      >
                        <div
                          style={{
                            display:      "flex",
                            alignItems:   "center",
                            gap:          "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <span style={{ fontSize:"18px" }}>{item.icon}</span>
                          <div
                            style={{
                              fontSize:      "0.65rem",
                              fontWeight:    700,
                              color:         "#2FA4C7",
                              letterSpacing: "1.5px",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.month} {item.year}
                          </div>
                        </div>
                        <h4
                          style={{
                            fontFamily:   "'Playfair Display',serif",
                            color:        "#1E3A5F",
                            fontWeight:   700,
                            fontSize:     "0.95rem",
                            marginBottom: "8px",
                            lineHeight:   1.35,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            color:      "#556B7D",
                            fontSize:   "0.82rem",
                            lineHeight: 1.72,
                            fontWeight: 300,
                            margin:     0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ) : (
                      <div className="nw-journey-spacer" />
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#F4F8FB" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"48px" }}>
              <Tag label="What We Do" />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize:   "clamp(1.7rem,2.8vw,2.2rem)",
                  color:      "#1E3A5F",
                }}
              >
                Complete Business Support —<br />
                <span style={{ color:"#2FA4C7" }}>Everything Under One Roof</span>
              </h2>
            </div>
          </FadeUp>

          <div
            className="nw-svc-overview"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap:                 "16px",
            }}
          >
            {SERVICES_OVERVIEW.map((s, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div
                  style={{
                    background:   "#fff",
                    borderRadius: "18px",
                    padding:      "24px 20px",
                    textAlign:    "center",
                    border:       "1px solid #e0e9f2",
                    boxShadow:    "0 1px 6px rgba(0,0,0,0.04)",
                    transition:   "all 0.3s",
                    height:       "100%",
                    cursor:       "pointer",
                  }}
                  onClick={() =>
                    navigate(`/services${s.tab ? `?tab=${s.tab}` : ""}`)
                  }
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#2FA4C7";
                    e.currentTarget.style.transform   = "translateY(-4px)";
                    e.currentTarget.style.boxShadow   = "0 8px 24px rgba(47,164,199,0.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#e0e9f2";
                    e.currentTarget.style.transform   = "none";
                    e.currentTarget.style.boxShadow   = "0 1px 6px rgba(0,0,0,0.04)";
                  }}
                >
                  <div style={{ fontSize:"32px", marginBottom:"14px" }}>
                    {s.icon}
                  </div>
                  <h4
                    style={{
                      fontFamily:   "'Playfair Display',serif",
                      color:        "#1E3A5F",
                      fontWeight:   700,
                      fontSize:     "0.9rem",
                      marginBottom: "8px",
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      color:      "#556B7D",
                      fontSize:   "0.78rem",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {s.desc}
                  </p>
                  <div
                    style={{
                      marginTop:  "12px",
                      color:      "#2FA4C7",
                      fontSize:   "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    View Services →
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#fff" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:"48px" }}>
              <Tag label="Why Choose NxtWeave" />
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  fontSize:   "clamp(1.7rem,2.8vw,2.2rem)",
                  color:      "#1E3A5F",
                }}
              >
                Compliance Expertise & Digital Innovation —<br />
                <span style={{ color:"#2FA4C7" }}>All Under One Roof</span>
              </h2>
            </div>
          </FadeUp>

          <div
            className="nw-why-grid"
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap:                 "16px",
            }}
          >
            {WHY_US.map((item, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div
                  style={{
                    background:   "#F4F8FB",
                    borderRadius: "18px",
                    padding:      "24px 22px",
                    border:       "1px solid #e0e9f2",
                    display:      "flex",
                    alignItems:   "flex-start",
                    gap:          "16px",
                    transition:   "all 0.3s",
                    height:       "100%",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#2FA4C7";
                    e.currentTarget.style.background  = "#fff";
                    e.currentTarget.style.boxShadow   = "0 6px 24px rgba(47,164,199,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#e0e9f2";
                    e.currentTarget.style.background  = "#F4F8FB";
                    e.currentTarget.style.boxShadow   = "none";
                  }}
                >
                  <div
                    style={{
                      width:          "48px",
                      height:         "48px",
                      borderRadius:   "14px",
                      background:     "linear-gradient(135deg,#F4F8FB,#e0f0fa)",
                      border:         "1px solid #d0e8f5",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontSize:       "22px",
                      flexShrink:     0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily:   "'Playfair Display',serif",
                        color:        "#1E3A5F",
                        fontWeight:   700,
                        fontSize:     "0.92rem",
                        marginBottom: "7px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        color:      "#556B7D",
                        fontSize:   "0.82rem",
                        lineHeight: 1.72,
                        fontWeight: 300,
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
          padding:    "80px 24px",
          background: "linear-gradient(135deg,#1E3A5F,#1a4a73)",
        }}
      >
        <FadeUp>
          <div style={{ maxWidth:"900px", margin:"0 auto", textAlign:"center" }}>
            <Tag label="Trusted By" dark />
            <h2
              style={{
                fontFamily:   "'Playfair Display',serif",
                fontWeight:   900,
                fontSize:     "clamp(1.7rem,2.8vw,2.2rem)",
                color:        "#fff",
                marginBottom: "16px",
              }}
            >
              Businesses That Trusted Us<br />
              <em style={{ color:"#2FA4C7", fontStyle:"italic" }}>
                and Grew With Us
              </em>
            </h2>
            <p
              style={{
                color:        "rgba(255,255,255,0.55)",
                fontSize:     "0.92rem",
                lineHeight:   1.8,
                marginBottom: "36px",
                fontWeight:   300,
              }}
            >
              From solo founders registering their first company to established
              enterprises expanding internationally — our clients span every
              industry, stage and geography.
            </p>

            {/* Client type pills */}
            <div
              style={{
                display:        "flex",
                flexWrap:       "wrap",
                justifyContent: "center",
                gap:            "10px",
                marginBottom:   "40px",
              }}
            >
              {CLIENT_TYPES.map((c) => (
                <span
                  key={c}
                  style={{
                    padding:      "8px 18px",
                    borderRadius: "50px",
                    background:   "rgba(255,255,255,0.08)",
                    border:       "1px solid rgba(255,255,255,0.15)",
                    color:        "rgba(255,255,255,0.75)",
                    fontSize:     "0.8rem",
                    fontWeight:   500,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Rotating testimonial */}
            <div
              style={{
                background:   "rgba(255,255,255,0.07)",
                border:       "1px solid rgba(255,255,255,0.12)",
                borderRadius: "20px",
                padding:      "28px 32px",
                marginBottom: "24px",
                minHeight:    "180px",
                transition:   "all 0.5s ease",
              }}
            >
              <div
                style={{
                  color:        "#F59E0B",
                  fontSize:     "1rem",
                  marginBottom: "14px",
                }}
              >
                ★★★★★
              </div>
              <p
                style={{
                  color:        "rgba(255,255,255,0.8)",
                  fontSize:     "0.95rem",
                  lineHeight:   1.8,
                  fontStyle:    "italic",
                  fontWeight:   300,
                  marginBottom: "16px",
                }}
              >
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            "12px",
                }}
              >
                <div
                  style={{
                    width:          "40px",
                    height:         "40px",
                    borderRadius:   "50%",
                    background:     "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    color:          "#fff",
                    fontWeight:     700,
                    fontSize:       "13px",
                  }}
                >
                  {TESTIMONIALS[activeTestimonial].initials}
                </div>
                <div style={{ textAlign:"left" }}>
                  <div
                    style={{
                      color:      "#fff",
                      fontWeight: 700,
                      fontSize:   "0.85rem",
                    }}
                  >
                    {TESTIMONIALS[activeTestimonial].name}
                  </div>
                  <div
                    style={{
                      color:    "rgba(255,255,255,0.5)",
                      fontSize: "0.75rem",
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
                gap:            "8px",
                marginBottom:   "28px",
              }}
            >
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width:        i === activeTestimonial ? "24px" : "8px",
                    height:       "8px",
                    borderRadius: "50px",
                    background:   i === activeTestimonial
                      ? "#2FA4C7"
                      : "rgba(255,255,255,0.25)",
                    border:       "none",
                    cursor:       "pointer",
                    transition:   "all 0.3s",
                    padding:      0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              style={{
                padding:      "11px 28px",
                borderRadius: "50px",
                background:   "rgba(255,255,255,0.1)",
                border:       "1px solid rgba(255,255,255,0.2)",
                color:        "rgba(255,255,255,0.8)",
                fontWeight:   600,
                fontSize:     "0.87rem",
                cursor:       "pointer",
                fontFamily:   "'DM Sans',sans-serif",
                transition:   "all 0.3s",
              }}
              onMouseOver={(e) =>
                e.currentTarget.style.background = "rgba(255,255,255,0.18)"
              }
              onMouseOut={(e) =>
                e.currentTarget.style.background = "rgba(255,255,255,0.1)"
              }
            >
              Read More Client Stories →
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding:    "72px 24px",
          background: "linear-gradient(135deg,#0D1F33,#1E3A5F)",
          textAlign:  "center",
        }}
      >
        <FadeUp>
          <Tag label="Get Started" dark />
          <h2
            style={{
              fontFamily:   "'Playfair Display',serif",
              color:        "#fff",
              fontWeight:   900,
              fontSize:     "clamp(1.8rem,3vw,2.4rem)",
              marginBottom: "14px",
              lineHeight:   1.2,
            }}
          >
            Ready to Work With Us?
          </h2>
          <p
            style={{
              color:        "rgba(255,255,255,0.5)",
              fontSize:     "0.92rem",
              lineHeight:   1.75,
              marginBottom: "32px",
              fontWeight:   300,
            }}
          >
            Free consultation · No commitment · Pan India & Global service
          </p>
          <div
            style={{
              display:        "flex",
              gap:            "12px",
              justifyContent: "center",
              flexWrap:       "wrap",
            }}
          >
            <button
              onClick={() => navigate("/contact")}
              style={{
                padding:      "14px 32px",
                borderRadius: "50px",
                background:   "linear-gradient(135deg,#4CAF50,#2E7D32)",
                color:        "#fff",
                border:       "none",
                fontWeight:   700,
                fontSize:     "0.92rem",
                cursor:       "pointer",
                boxShadow:    "0 4px 20px rgba(76,175,80,0.35)",
                transition:   "all 0.3s",
                fontFamily:   "'DM Sans',sans-serif",
              }}
              onMouseOver={(e) =>
                e.currentTarget.style.transform = "translateY(-2px)"
              }
              onMouseOut={(e) =>
                e.currentTarget.style.transform = "none"
              }
            >
              Get Free Consultation
            </button>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "8px",
                padding:       "14px 32px",
                borderRadius:  "50px",
                background:    "#25D366",
                color:         "#fff",
                fontWeight:    700,
                fontSize:      "0.92rem",
                textDecoration:"none",
                boxShadow:     "0 4px 20px rgba(37,211,102,0.35)",
                transition:    "all 0.3s",
              }}
              onMouseOver={(e) =>
                e.currentTarget.style.transform = "translateY(-2px)"
              }
              onMouseOut={(e) =>
                e.currentTarget.style.transform = "none"
              }
            >
              💬 WhatsApp Us
            </a>

            <button
              onClick={() => navigate("/services")}
              style={{
                padding:      "14px 32px",
                borderRadius: "50px",
                background:   "rgba(255,255,255,0.08)",
                border:       "1px solid rgba(255,255,255,0.2)",
                color:        "rgba(255,255,255,0.8)",
                fontWeight:   600,
                fontSize:     "0.92rem",
                cursor:       "pointer",
                fontFamily:   "'DM Sans',sans-serif",
                transition:   "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform  = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform  = "none";
              }}
            >
              View All Services
            </button>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}