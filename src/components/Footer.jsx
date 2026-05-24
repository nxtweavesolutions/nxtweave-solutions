// src/components/Footer.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

// ─── Scroll Helper ─────────────────────────────────────────────────────────────
// Stored globally so navigate + useEffect can trigger it
let pendingScrollId = null;

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  }
  return false;
}

// ─── Scroll Trigger on Route Change ───────────────────────────────────────────
// Put this once in App.jsx or keep it here — it listens after navigation
export function useScrollOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    if (pendingScrollId) {
      const id = pendingScrollId;
      pendingScrollId = null;

      // Poll until element is in DOM (max 2 seconds)
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const success = smoothScrollTo(id);
        if (success || attempts > 20) clearInterval(interval);
      }, 100);
    }
  }, [location.pathname]);
}

// ─── Footer Component ──────────────────────────────────────────────────────────
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (sectionId) => {
    if (location.pathname === "/" || location.pathname === "") {
      // Already on home — scroll directly
      smoothScrollTo(sectionId);
    } else {
      // Store target, navigate home, useScrollOnNavigate will fire
      pendingScrollId = sectionId;
      navigate("/");
    }
  };

  const goToServicesTab = (tab) => {
    navigate(`/services?tab=${tab}`);
  };

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61577122554991",
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/nxtweavesolutions/",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nxtweavesolutions/",
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919999999999",
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { label: "Home", action: () => handleScroll("hero") },
    { label: "About Us", path: "/about" },
    { label: "Services", action: () => handleScroll("services-section") },
    { label: "How It Works", action: () => handleScroll("process-section") },
    { label: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { label: "Business Registration", action: () => goToServicesTab("registration") },
    { label: "Certifications", action: () => goToServicesTab("certifications") },
    { label: "Digital Solutions", action: () => goToServicesTab("digital") },
    { label: "Digital Marketing", action: () => goToServicesTab("marketing") },
    { label: "Government Schemes", action: () => handleScroll("govt-schemes") },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1E3A5F 0%, #0D1F33 100%)",
        color: "#93B5CC",
        paddingTop: "72px",
        paddingBottom: "32px",
        paddingLeft: "24px",
        paddingRight: "24px",
        borderTop: "1px solid rgba(47,164,199,0.15)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Main Grid ──────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Column 1 — Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "linear-gradient(135deg, #C8A96E, #E8C87E)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "13px", color: "#0D1F33", letterSpacing: "0.5px",
                fontFamily: "'Montserrat', sans-serif",
              }}>NW</div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>
                Nxt<span style={{ color: "#2FA4C7" }}>Weave</span>
              </span>
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "24px", color: "#93B5CC" }}>
              Empowering businesses with seamless registration, compliance, and digital growth solutions. Your trusted partner in success.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#93B5CC", textDecoration: "none",
                    transition: "all 0.25s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#2FA4C7";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#2FA4C7";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#93B5CC";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "20px", letterSpacing: "0.3px" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      style={{ color: "#93B5CC", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                      onMouseOut={(e) => e.currentTarget.style.color = "#93B5CC"}
                    >
                      <span style={{ color: "#2FA4C7", fontSize: "10px" }}>›</span>
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={link.action}
                      style={{ background: "none", border: "none", padding: 0, color: "#93B5CC", fontSize: "0.88rem", cursor: "pointer", transition: "color 0.2s", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "6px", textAlign: "left" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                      onMouseOut={(e) => e.currentTarget.style.color = "#93B5CC"}
                    >
                      <span style={{ color: "#2FA4C7", fontSize: "10px" }}>›</span>
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "20px", letterSpacing: "0.3px" }}>
              Our Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    style={{ background: "none", border: "none", padding: 0, color: "#93B5CC", fontSize: "0.88rem", cursor: "pointer", transition: "color 0.2s", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "6px", textAlign: "left" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#93B5CC"}
                  >
                    <span style={{ color: "#2FA4C7", fontSize: "10px" }}>›</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "20px", letterSpacing: "0.3px" }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <MapPin size={16} style={{ color: "#2FA4C7", marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "#93B5CC" }}>
                  Noida, Gautam Buddha Nagar<br />
                  Uttar Pradesh, 201301
                </span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Phone size={16} style={{ color: "#2FA4C7", flexShrink: 0 }} />
                <a href="tel:+919999999999"
                  style={{ fontSize: "0.85rem", color: "#93B5CC", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#93B5CC"}>
                  +91 97115 65533
                </a>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Mail size={16} style={{ color: "#2FA4C7", flexShrink: 0 }} />
                <a href="mailto:info@nxtweavesolutions.com"
                  style={{ fontSize: "0.85rem", color: "#93B5CC", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#93B5CC"}>
                  info@nxtweavesolutions.com
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "20px", padding: "10px 18px", borderRadius: "10px",
                background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)",
                color: "#4ade80", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.22)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.12)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.25)";
              }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.82rem", color: "#556B7D" }}>
            © {new Date().getFullYear()} NxtWeave Solutions. All rights reserved.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                style={{ color: "#556B7D", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                onMouseOut={(e) => e.currentTarget.style.color = "#556B7D"}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
