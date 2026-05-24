// src/components/WhyChooseUsSection.jsx  —  NxtWeave Solutions (complete final)
// No framer-motion — pure CSS animations
import { useRef, useEffect, useState } from "react";
import { useNavigate }                 from "react-router-dom";

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

function FadeUp({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useVisible();
  const from = {
    up:    "translateY(28px)",
    left:  "translateX(-36px)",
    right: "translateX(36px)",
    scale: "scale(0.95)",
  }[direction] || "translateY(28px)";
  return (
    <div ref={ref} style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : from,
      transition:`opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                  transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Features data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "👨‍💼",
    title: "Professional Expert Team",
    desc: "Qualified consultants and digital specialists with deep expertise across company law, taxation, certifications and modern technology — all under one roof.",
  },
  {
    icon: "🔄",
    title: "End-to-End Support",
    desc: "From your very first consultation to post-registration compliance and digital growth — we manage everything so you can focus entirely on your business.",
  },
  {
    icon: "🔍",
    title: "Transparent Process",
    desc: "Clear pricing, honest timelines and regular updates at every step. Zero hidden charges — you always know exactly where your work stands.",
  },
  {
    icon: "⚡",
    title: "Timely Delivery",
    desc: "We respect your time. Every project, registration and deliverable is tracked and followed up proactively — no chasing, no delays.",
  },
  {
    icon: "💡",
    title: "Dual Expertise",
    desc: "Most firms do either compliance or digital. We do both — giving your business a genuine integrated advantage with one dedicated team.",
  },
  {
    icon: "📈",
    title: "Long-term Growth Focus",
    desc: "We measure our success by your growth. Our advice is always oriented toward sustainable, scalable business outcomes — not just one-time transactions.",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value:"500+",  label:"Businesses Served" },
  { value:"99%",   label:"Success Rate"      },
  { value:"35+",   label:"Services Offered"  },
  { value:"24 hrs",label:"Response Time"     },
];

// ─── Feature Item ─────────────────────────────────────────────────────────────
function FeatureItem({ icon, title, desc, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:     "flex",
          alignItems:  "flex-start",
          gap:         "16px",
          padding:     "18px 20px",
          borderRadius:"16px",
          border:      `1px solid ${hov ? "#2FA4C7" : "#e0e9f2"}`,
          background:  hov ? "#fff" : "#F4F8FB",
          boxShadow:   hov ? "0 6px 24px rgba(47,164,199,0.1)" : "none",
          transition:  "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          cursor:      "default",
        }}
      >
        {/* Icon */}
        <div style={{
          width:          "48px",
          height:         "48px",
          borderRadius:   "14px",
          background:     hov
            ? "linear-gradient(135deg,#1E3A5F,#2FA4C7)"
            : "rgba(47,164,199,0.1)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       "22px",
          flexShrink:     0,
          transition:     "all 0.3s",
          boxShadow:      hov ? "0 6px 16px rgba(47,164,199,0.25)" : "none",
        }}>
          <span style={{
            filter:     hov ? "grayscale(1) brightness(4)" : "none",
            transition: "filter 0.3s",
          }}>{icon}</span>
        </div>

        {/* Text */}
        <div>
          <h4 style={{
            fontFamily:  "'Playfair Display',serif",
            color:       "#1E3A5F",
            fontWeight:  700,
            fontSize:    "0.95rem",
            marginBottom:"6px",
            lineHeight:  1.3,
            transition:  "color 0.2s",
          }}>{title}</h4>
          <p style={{
            color:      "#556B7D",
            fontSize:   "0.82rem",
            lineHeight: 1.75,
            fontWeight: 300,
            margin:     0,
          }}>{desc}</p>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WhyChooseUsSection() {
  const navigate = useNavigate();

  return (
    <section
      id="why-us-section"
      style={{
        padding:    "88px 24px",
        background: "#fff",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
        @media(max-width:1024px){
          .nw-why-grid { grid-template-columns:1fr !important; }
          .nw-why-image { min-height:340px !important; }
        }
        @media(max-width:600px){
          .nw-stats-row { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth:"1280px", margin:"0 auto" }}>

        {/* ── Section tag ──────────────────────────────────────────────── */}
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"52px" }}>
            <div style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "10px",
              fontSize:      "0.68rem",
              fontWeight:    600,
              color:         "#2FA4C7",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom:  "12px",
            }}>
              <span style={{ width:"22px", height:"1.5px",
                background:"#2FA4C7", display:"inline-block" }}/>
              Why Choose NxtWeave
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 900,
              fontSize:   "clamp(1.8rem,3vw,2.5rem)",
              color:      "#1E3A5F",
              marginBottom:"10px",
              lineHeight: 1.2,
            }}>
              We Are Not Just Service Providers —<br />
              <span style={{ color:"#2FA4C7" }}>We Are Your Growth Partners</span>
            </h2>
            <p style={{
              color:     "#556B7D",
              fontSize:  "0.92rem",
              maxWidth:  "560px",
              margin:    "0 auto",
              lineHeight:1.8,
              fontWeight:300,
            }}>
              Here's why hundreds of businesses across India and globally
              trust NxtWeave Solutions to build strong foundations.
            </p>
          </div>
        </FadeUp>

        {/* ── Main 2-col grid ──────────────────────────────────────────── */}
        <div className="nw-why-grid" style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "48px",
          alignItems:          "start",
        }}>

          {/* ── Left: Features list ───────────────────────────────────── */}
          <FadeUp direction="left">
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {FEATURES.map((f, i) => (
                <FeatureItem key={i} {...f} delay={i * 60} />
              ))}
            </div>
          </FadeUp>

          {/* ── Right: Image + stats + quote ─────────────────────────── */}
          <FadeUp direction="right" delay={100}>
            <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

              {/* Image card */}
              <div
                className="nw-why-image"
                style={{
                  position:     "relative",
                  minHeight:    "400px",
                  borderRadius: "24px",
                  overflow:     "hidden",
                  boxShadow:    "0 20px 60px rgba(30,58,95,0.18)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="NxtWeave Team Collaboration"
                  style={{
                    position:   "absolute",
                    inset:      0,
                    width:      "100%",
                    height:     "100%",
                    objectFit:  "cover",
                    display:    "block",
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position:   "absolute",
                  inset:      0,
                  background: "linear-gradient(to top,rgba(13,31,51,0.82) 0%,rgba(30,58,95,0.3) 50%,transparent 100%)",
                }}/>

                {/* Overlay card */}
                <div style={{
                  position:       "absolute",
                  bottom:         "20px",
                  left:           "20px",
                  right:          "20px",
                  background:     "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(16px)",
                  borderRadius:   "16px",
                  padding:        "20px 22px",
                  border:         "1px solid rgba(255,255,255,0.18)",
                }}>
                  <h3 style={{
                    fontFamily:   "'Playfair Display',serif",
                    color:        "#fff",
                    fontWeight:   700,
                    fontSize:     "1.05rem",
                    marginBottom: "6px",
                  }}>Long-term Growth Focus</h3>
                  <p style={{
                    color:      "rgba(255,255,255,0.78)",
                    fontSize:   "0.82rem",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    margin:     0,
                  }}>
                    We build sustainable strategies and scalable systems
                    that ensure your business thrives not just today —
                    but for years to come.
                  </p>
                </div>

                {/* Top badge */}
                <div style={{
                  position:    "absolute",
                  top:         "16px",
                  left:        "16px",
                  background:  "rgba(47,164,199,0.9)",
                  backdropFilter:"blur(8px)",
                  borderRadius:"50px",
                  padding:     "6px 14px",
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "6px",
                }}>
                  <span style={{ fontSize:"10px" }}>⭐</span>
                  <span style={{
                    color:         "#fff",
                    fontSize:      "0.72rem",
                    fontWeight:    700,
                    letterSpacing: "0.5px",
                  }}>Trusted by 500+ Businesses</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="nw-stats-row" style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap:                 "10px",
              }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{
                    background:   "#F4F8FB",
                    borderRadius: "14px",
                    padding:      "16px 12px",
                    textAlign:    "center",
                    border:       "1px solid #e0e9f2",
                    transition:   "all 0.3s",
                  }}
                    onMouseOver={e => {
                      e.currentTarget.style.borderColor = "#2FA4C7";
                      e.currentTarget.style.background  = "#fff";
                      e.currentTarget.style.boxShadow   = "0 4px 16px rgba(47,164,199,0.1)";
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.borderColor = "#e0e9f2";
                      e.currentTarget.style.background  = "#F4F8FB";
                      e.currentTarget.style.boxShadow   = "none";
                    }}>
                    <div style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize:   "1.35rem",
                      fontWeight: 900,
                      color:      "#2FA4C7",
                      lineHeight: 1,
                    }}>{s.value}</div>
                    <div style={{
                      fontSize:   "0.68rem",
                      color:      "#8FA3B4",
                      marginTop:  "4px",
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial quote */}
              <div style={{
                background:   "#F4F8FB",
                borderRadius: "18px",
                padding:      "22px 24px",
                border:       "1px solid #e0e9f2",
                position:     "relative",
              }}>
                <div style={{
                  position:   "absolute",
                  top:        "16px",
                  left:       "20px",
                  fontSize:   "3rem",
                  color:      "#2FA4C7",
                  opacity:    0.15,
                  lineHeight: 1,
                  fontFamily: "Georgia,serif",
                }}>"</div>
                <div style={{ color:"#F59E0B", fontSize:"0.8rem",
                  marginBottom:"10px" }}>★★★★★</div>
                <p style={{
                  color:      "#556B7D",
                  fontSize:   "0.87rem",
                  lineHeight: 1.8,
                  fontStyle:  "italic",
                  fontWeight: 300,
                  marginBottom:"14px",
                }}>
                  NxtWeave didn't just complete our registration — they guided
                  us through every step, explained what each document meant,
                  and followed up even after delivery. That's rare.
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:"10px",
                  paddingTop:"12px", borderTop:"1px solid #e0e9f2" }}>
                  <div style={{
                    width:          "36px",
                    height:         "36px",
                    borderRadius:   "50%",
                    background:     "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    color:          "#fff",
                    fontWeight:     700,
                    fontSize:       "12px",
                    flexShrink:     0,
                  }}>RS</div>
                  <div>
                    <div style={{ color:"#1E3A5F", fontWeight:700,
                      fontSize:"0.82rem" }}>Rahul Sharma</div>
                    <div style={{ color:"#8FA3B4", fontSize:"0.72rem" }}>
                      Startup Founder, Noida
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                <button
                  onClick={() => navigate("/contact")}
                  style={{
                    flex:          1,
                    padding:       "13px 20px",
                    borderRadius:  "12px",
                    border:        "none",
                    background:    "linear-gradient(135deg,#4CAF50,#2E7D32)",
                    color:         "#fff",
                    fontWeight:    700,
                    fontSize:      "0.87rem",
                    cursor:        "pointer",
                    fontFamily:    "inherit",
                    boxShadow:     "0 4px 16px rgba(76,175,80,0.3)",
                    transition:    "all 0.3s",
                    whiteSpace:    "nowrap",
                  }}
                  onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseOut={e  => e.currentTarget.style.transform="none"}
                >
                  Get Free Consultation
                </button>
                <button
                  onClick={() => navigate("/about")}
                  style={{
                    flex:       1,
                    padding:    "13px 20px",
                    borderRadius:"12px",
                    border:     "1.5px solid #e0e9f2",
                    background: "#fff",
                    color:      "#1E3A5F",
                    fontWeight: 600,
                    fontSize:   "0.87rem",
                    cursor:     "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor="#2FA4C7";
                    e.currentTarget.style.color="#2FA4C7";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor="#e0e9f2";
                    e.currentTarget.style.color="#1E3A5F";
                  }}
                >
                  More About Us
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}