// src/components/ServiceCard.jsx  —  NxtWeave Solutions (complete final)
import { useState }      from "react";
import { Link }          from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// ─── Props ────────────────────────────────────────────────────────────────────
// title       string   — service name
// description string   — short description
// features    string[] — bullet points (benefits / key features)
// link        string   — route to navigate to (e.g. "/services?tab=digital")
// icon        ReactNode— optional icon element (lucide or emoji string)
// badge       string   — optional top-right badge text ("Popular", "New", etc.)
// color       string   — optional accent color (default: #2FA4C7)
// onClick     fn       — optional click handler (use instead of link for modal)
// variant     string   — "default" | "dark" | "minimal"

export default function ServiceCard({
  title,
  description,
  features = [],
  link,
  icon,
  badge,
  color     = "#2FA4C7",
  onClick,
  variant   = "default",
}) {
  const [hov, setHov] = useState(false);

  // ── Variant styles ──────────────────────────────────────────────────────────
  const variants = {
    default: {
      wrapper: {
        background:   "#fff",
        border:       `1px solid ${hov ? color : "#e0e9f2"}`,
        boxShadow:    hov ? `0 12px 36px ${color}22` : "0 1px 6px rgba(0,0,0,0.04)",
        transform:    hov ? "translateY(-5px)" : "none",
      },
      title:   "#1E3A5F",
      desc:    "#556B7D",
      feature: "#556B7D",
      iconBg:  hov ? color : `${color}18`,
      iconColor: hov ? "#fff" : color,
      footerBorder: hov ? color : "#e0e9f2",
      footerColor:  hov ? color : "#8FA3B4",
    },
    dark: {
      wrapper: {
        background:   hov
          ? "linear-gradient(135deg,#1a4a73,#1E3A5F)"
          : "linear-gradient(135deg,#1E3A5F,#0D1F33)",
        border:       `1px solid ${hov ? color : "rgba(255,255,255,0.1)"}`,
        boxShadow:    hov ? `0 12px 36px ${color}33` : "0 2px 12px rgba(0,0,0,0.15)",
        transform:    hov ? "translateY(-5px)" : "none",
      },
      title:   "#fff",
      desc:    "rgba(255,255,255,0.6)",
      feature: "rgba(255,255,255,0.7)",
      iconBg:  hov ? color : "rgba(255,255,255,0.1)",
      iconColor: "#fff",
      footerBorder: hov ? color : "rgba(255,255,255,0.12)",
      footerColor:  hov ? color : "rgba(255,255,255,0.5)",
    },
    minimal: {
      wrapper: {
        background:   "#F4F8FB",
        border:       `1px solid ${hov ? color : "#e0e9f2"}`,
        boxShadow:    hov ? `0 6px 20px ${color}18` : "none",
        transform:    hov ? "translateY(-3px)" : "none",
      },
      title:   "#1E3A5F",
      desc:    "#556B7D",
      feature: "#556B7D",
      iconBg:  hov ? color : "#fff",
      iconColor: hov ? "#fff" : color,
      footerBorder: hov ? color : "#e0e9f2",
      footerColor:  hov ? color : "#8FA3B4",
    },
  };

  const v = variants[variant] || variants.default;

  // ── Wrapper props ────────────────────────────────────────────────────────────
  const wrapperProps = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      height:        "100%",
      display:       "flex",
      flexDirection: "column",
      borderRadius:  "20px",
      padding:       "24px",
      cursor:        onClick ? "pointer" : "default",
      transition:    "all 0.32s cubic-bezier(0.16,1,0.3,1)",
      position:      "relative",
      overflow:      "hidden",
      fontFamily:    "'DM Sans',sans-serif",
      ...v.wrapper,
    },
  };

  if (onClick) wrapperProps.onClick = onClick;

  // ── Left border accent ───────────────────────────────────────────────────────
  const accentBar = (
    <div style={{
      position:     "absolute",
      top:          0, left: 0, bottom: 0,
      width:        "3px",
      background:   `linear-gradient(to bottom, ${color}, ${color}66)`,
      borderRadius: "20px 0 0 20px",
      opacity:      hov ? 1 : 0,
      transition:   "opacity 0.3s",
    }}/>
  );

  // ── Card content ─────────────────────────────────────────────────────────────
  const cardContent = (
    <>
      {accentBar}

      {/* Badge */}
      {badge && (
        <div style={{
          position:     "absolute",
          top:          "14px",
          right:        "14px",
          padding:      "3px 10px",
          borderRadius: "50px",
          background:   `${color}22`,
          border:       `1px solid ${color}44`,
          color:        color,
          fontSize:     "0.65rem",
          fontWeight:   700,
          letterSpacing:"0.5px",
          textTransform:"uppercase",
        }}>{badge}</div>
      )}

      {/* Icon + Title */}
      <div style={{
        display:     "flex",
        alignItems:  "center",
        gap:         "14px",
        marginBottom:"16px",
        paddingRight: badge ? "60px" : 0,
      }}>
        {icon && (
          <div style={{
            width:          "48px",
            height:         "48px",
            borderRadius:   "14px",
            background:     v.iconBg,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            transition:     "all 0.3s",
            color:          v.iconColor,
            fontSize:       typeof icon === "string" ? "24px" : "inherit",
            boxShadow:      hov ? `0 4px 14px ${color}33` : "none",
          }}>
            {typeof icon === "string"
              ? <span style={{ filter: hov && variant==="default"
                  ? "grayscale(1) brightness(4)" : "none",
                  transition:"filter 0.3s" }}>{icon}</span>
              : icon
            }
          </div>
        )}
        <h3 style={{
          fontFamily:  "'Playfair Display',serif",
          color:       v.title,
          fontWeight:  800,
          fontSize:    "0.95rem",
          lineHeight:  1.35,
          margin:      0,
          transition:  "color 0.2s",
        }}>{title}</h3>
      </div>

      {/* Description */}
      <p style={{
        color:      v.desc,
        fontSize:   "0.82rem",
        lineHeight: 1.75,
        fontWeight: 300,
        marginBottom:"16px",
        flex:       features.length > 0 ? "none" : 1,
      }}>{description}</p>

      {/* Features list */}
      {features.length > 0 && (
        <ul style={{
          listStyle:    "none",
          padding:      0,
          margin:       "0 0 16px 0",
          display:      "flex",
          flexDirection:"column",
          gap:          "8px",
          flex:         1,
        }}>
          {features.map((f, i) => (
            <li key={i} style={{
              display:    "flex",
              alignItems: "flex-start",
              gap:        "8px",
            }}>
              <span style={{
                width:          "18px",
                height:         "18px",
                borderRadius:   "50%",
                background:     `${color}18`,
                border:         `1px solid ${color}33`,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:          color,
                fontSize:       "9px",
                fontWeight:     700,
                flexShrink:     0,
                marginTop:      "1px",
                transition:     "all 0.2s",
              }}>✓</span>
              <span style={{
                color:      v.feature,
                fontSize:   "0.79rem",
                lineHeight: 1.6,
                fontWeight: 300,
              }}>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Footer CTA */}
      {(link || onClick) && (
        <div style={{
          marginTop:    "auto",
          paddingTop:   "14px",
          borderTop:    `1px solid ${v.footerBorder}`,
          display:      "flex",
          alignItems:   "center",
          justifyContent:"space-between",
          transition:   "border-color 0.2s",
        }}>
          <span style={{
            color:      v.footerColor,
            fontSize:   "0.78rem",
            fontWeight: 600,
            transition: "color 0.2s",
          }}>
            {onClick ? "Get Consultation" : "View Details"}
          </span>
          <div style={{
            width:          "30px",
            height:         "30px",
            borderRadius:   "50%",
            background:     hov ? color : `${color}15`,
            color:          hov ? "#fff" : color,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            transition:     "all 0.3s",
            transform:      hov ? "translateX(3px)" : "none",
          }}>
            <ArrowRight size={14} />
          </div>
        </div>
      )}
    </>
  );

  // ── Render: Link wrapper or div ───────────────────────────────────────────────
  if (link && !onClick) {
    return (
      <Link to={link} style={{ textDecoration:"none", height:"100%",
        display:"block" }}>
        <div {...wrapperProps}>{cardContent}</div>
      </Link>
    );
  }

  return <div {...wrapperProps}>{cardContent}</div>;
}

// ─── Usage examples ───────────────────────────────────────────────────────────
//
// Basic with link:
// <ServiceCard
//   icon="🏢"
//   title="Private Limited Company"
//   description="Most preferred structure for startups."
//   features={["Separate Legal Entity","Limited Liability","Easy Funding"]}
//   link="/services?tab=registration"
//   badge="Popular"
// />
//
// With modal onClick (no link):
// <ServiceCard
//   icon={<Building2 size={22} />}
//   title="GST Registration"
//   description="Mandatory for businesses above threshold."
//   features={["Legal Recognition","Input Tax Credit","Inter-state Sales"]}
//   onClick={() => setSelected(service)}
//   color="#2FA4C7"
// />
//
// Dark variant:
// <ServiceCard
//   icon="💻"
//   title="Website Development"
//   description="Modern responsive websites."
//   features={["SEO Optimised","Fast Loading","Mobile First"]}
//   link="/services?tab=digital"
//   variant="dark"
//   color="#4CAF50"
// />
//
// Minimal variant:
// <ServiceCard
//   icon="📱"
//   title="Social Media Marketing"
//   description="Grow your brand online."
//   features={["Instagram","LinkedIn","Analytics"]}
//   link="/services?tab=marketing"
//   variant="minimal"
// />