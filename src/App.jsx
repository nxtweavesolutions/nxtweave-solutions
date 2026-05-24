// src/App.jsx — NxtWeave Solutions (complete final)
import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useScrollOnNavigate } from "./components/Footer";

// ─── Pages ───────────────────────────────────────────────────────────────────
import Home           from "./pages/Home";
import Services       from "./pages/Services";
import About          from "./pages/About";
import Contact        from "./pages/Contact";
import AdminLogin     from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// ─── Legal Pages (separate files) ────────────────────────────────────────────
// Make sure these 3 files exist in src/pages/
// src/pages/PrivacyPolicy.jsx
// src/pages/TermsOfService.jsx
// src/pages/Disclaimer.jsx
import PrivacyPolicy  from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer     from "./pages/Disclaimer";

// ─── Components ──────────────────────────────────────────────────────────────
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";

// ─── Brand colors ─────────────────────────────────────────────────────────────
const C = {
  navy:  "#1E3A5F",
  dark:  "#0D1F33",
  teal:  "#2FA4C7",
  green: "#4CAF50",
};

// ─── Scroll to top on every route change ─────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Don't scroll to top if there's a pending section scroll (Footer handles it)
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// ─── Pending-section scroll handler (from Footer) ────────────────────────────
function ScrollHandler() {
  useScrollOnNavigate();
  return null;
}

// ─── 404 Page ─────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     `linear-gradient(135deg,${C.dark} 0%,${C.navy} 100%)`,
        textAlign:      "center",
        padding:        "24px",
        position:       "relative",
        overflow:       "hidden",
        fontFamily:     "'DM Sans',sans-serif",
      }}
    >
      {/* Decorative orb */}
      <div
        style={{
          position:     "absolute",
          top:          "20%",
          left:         "50%",
          transform:    "translateX(-50%)",
          width:        "400px",
          height:       "400px",
          borderRadius: "50%",
          background:   "radial-gradient(circle,rgba(47,164,199,0.08),transparent 70%)",
          pointerEvents:"none",
        }}
      />

      {/* Second orb bottom */}
      <div
        style={{
          position:     "absolute",
          bottom:       "-80px",
          left:         "-80px",
          width:        "300px",
          height:       "300px",
          borderRadius: "50%",
          background:   "radial-gradient(circle,rgba(76,175,80,0.06),transparent 70%)",
          pointerEvents:"none",
        }}
      />

      {/* 404 number */}
      <h1
        style={{
          fontFamily:       "'Playfair Display',serif",
          fontSize:         "clamp(5rem,15vw,9rem)",
          fontWeight:       900,
          color:            "transparent",
          WebkitTextStroke: "2px rgba(47,164,199,0.5)",
          lineHeight:       1,
          marginBottom:     "8px",
          letterSpacing:    "-4px",
        }}
      >
        404
      </h1>

      {/* Tag line */}
      <div
        style={{
          display:       "inline-flex",
          alignItems:    "center",
          gap:           "8px",
          padding:       "6px 16px",
          borderRadius:  "50px",
          background:    "rgba(47,164,199,0.12)",
          border:        "1px solid rgba(47,164,199,0.28)",
          color:         C.teal,
          fontSize:      "0.7rem",
          fontWeight:    700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom:  "24px",
        }}
      >
        Page Not Found
      </div>

      <h2
        style={{
          fontFamily:   "'Playfair Display',serif",
          color:        "#fff",
          fontSize:     "clamp(1.4rem,3vw,2rem)",
          fontWeight:   700,
          marginBottom: "14px",
          lineHeight:   1.3,
        }}
      >
        Oops! This page doesn't exist.
      </h2>

      <p
        style={{
          color:        "rgba(255,255,255,0.5)",
          fontSize:     "0.92rem",
          lineHeight:   1.75,
          maxWidth:     "420px",
          marginBottom: "36px",
          fontWeight:   300,
        }}
      >
        The page you're looking for may have been moved, deleted, or never
        existed. Let's get you back on track.
      </p>

      {/* Buttons */}
      <div style={{ display:"flex", gap:"12px",
        flexWrap:"wrap", justifyContent:"center" }}>
        <Link
          to="/"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "8px",
            padding:       "14px 32px",
            borderRadius:  "50px",
            background:    `linear-gradient(135deg,${C.green},#2E7D32)`,
            color:         "#fff",
            fontWeight:    700,
            fontSize:      "0.92rem",
            textDecoration:"none",
            boxShadow:     "0 4px 20px rgba(76,175,80,0.35)",
            transition:    "all 0.3s",
            fontFamily:    "'DM Sans',sans-serif",
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e)  => e.currentTarget.style.transform = "none"}
        >
          ← Back to Home
        </Link>

        <Link
          to="/contact"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "8px",
            padding:       "14px 32px",
            borderRadius:  "50px",
            background:    "rgba(255,255,255,0.07)",
            border:        "1px solid rgba(255,255,255,0.18)",
            color:         "rgba(255,255,255,0.8)",
            fontWeight:    600,
            fontSize:      "0.92rem",
            textDecoration:"none",
            transition:    "all 0.3s",
            fontFamily:    "'DM Sans',sans-serif",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.14)";
            e.currentTarget.style.transform  = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            e.currentTarget.style.transform  = "none";
          }}
        >
          Contact Us
        </Link>
      </div>

      {/* Quick nav links */}
      <div
        style={{
          marginTop:      "48px",
          display:        "flex",
          gap:            "24px",
          flexWrap:       "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label:"Home",     to:"/"         },
          { label:"Services", to:"/services" },
          { label:"About",    to:"/about"    },
          { label:"Contact",  to:"/contact"  },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color:         "rgba(255,255,255,0.35)",
              fontSize:      "0.82rem",
              textDecoration:"none",
              transition:    "color 0.2s",
              fontWeight:    300,
            }}
            onMouseOver={(e) => e.currentTarget.style.color = C.teal}
            onMouseOut={(e)  => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        minHeight:     "100vh",
        fontFamily:    "'DM Sans', sans-serif",
      }}
    >
      {/* Fires useScrollOnNavigate from Footer — handles section scrolling */}
      <ScrollHandler />

      {/* Scrolls to top on every route change (except pending section scrolls) */}
      <ScrollToTop />

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main style={{ flex: 1 }}>
        <Routes>

          {/* ── Public routes ────────────────────────────────────────── */}
          <Route path="/"         element={<Home />}     />
          <Route path="/services" element={<Services />} />
          <Route path="/about"    element={<About />}    />
          <Route path="/contact"  element={<Contact />}  />

          {/* ── Legal routes ─────────────────────────────────────────── */}
          <Route path="/privacy"    element={<PrivacyPolicy />}  />
          <Route path="/terms"      element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />}     />

          {/* ── Admin routes ─────────────────────────────────────────── */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ── 404 fallback ─────────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default App;

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: The 3 legal pages are now imported from separate files above.
// If those files don't exist yet, create them:
//
//   src/pages/PrivacyPolicy.jsx
//   src/pages/TermsOfService.jsx
//   src/pages/Disclaimer.jsx
//
// Until then, you can use the LegalPage fallback below by temporarily
// replacing the 3 import lines + routes with these:
//
//   <Route path="/privacy"    element={<LegalPage title="Privacy Policy"   content={PRIVACY_TEXT} />} />
//   <Route path="/terms"      element={<LegalPage title="Terms of Service" content={TERMS_TEXT} />} />
//   <Route path="/disclaimer" element={<LegalPage title="Disclaimer"       content={DISCLAIMER_TEXT} />} />
//
// And remove the 3 import lines at the top.
// ─────────────────────────────────────────────────────────────────────────────

const DISCLAIMER_TEXT = `
NxtWeave Solutions provides business consulting, registration assistance,
compliance guidance and digital services. We are not a government body and
do not guarantee the approval of any registration, licence or certification.
All information provided on this website is for general informational purposes
only and should not be construed as legal, financial or professional advice.
Results may vary depending on individual circumstances, government timelines
and documentation completeness. We are not responsible for any delays caused
by government departments or third-party agencies. By using our website and
services, you acknowledge and agree to this disclaimer.

Contact: contact@nxtweavesolutions.com
Website: www.nxtweavesolutions.com
`;

const PRIVACY_TEXT = `
NxtWeave Solutions respects your privacy and is committed to protecting your
personal information. This policy explains how we collect, use and safeguard
the information you provide while using our website and services.

Information We Collect
We may collect your name, phone number, email address, business information
shared through forms or consultations, and website usage data via analytics.

How We Use Your Information
Your information is used to provide our services, respond to enquiries,
send service-related updates, improve our website, and comply with legal
obligations. We do not sell, rent or trade your personal data to third parties.
Information may only be shared when required by law or necessary to deliver
the requested service.

Your Rights
You may request access to, correction of, or deletion of your personal data
by contacting us at contact@nxtweavesolutions.com.

Cookies
Our website uses cookies and analytics tools to improve user experience and
understand visitor behaviour. You can manage cookie preferences through your
browser settings.

Contact: contact@nxtweavesolutions.com
Website: www.nxtweavesolutions.com
`;

const TERMS_TEXT = `
By accessing or using the NxtWeave Solutions website and services, you agree
to be bound by these Terms of Service.

Services
NxtWeave Solutions provides business registration, compliance assistance,
certifications, digital solutions, digital marketing, and government scheme
guidance. We provide consulting and documentation support only — we do not
provide funding or guarantee any government approvals.

User Responsibilities
You agree to provide accurate and complete information, cooperate during the
service process, and not misuse our platform for any unlawful activity.

Payments and Fees
All professional fees must be paid as per the agreed quotation. Government
fees and third-party charges are additional and non-refundable. We do not
provide loans or financial assistance.

Service Timelines
Timelines are estimates subject to government processing times, document
accuracy and external approvals. We are not responsible for delays caused by
government departments or incomplete documentation from the client.

Intellectual Property
All website content, branding and materials belong to NxtWeave Solutions and
may not be copied or distributed without written permission.

Limitation of Liability
We are not liable for government delays or rejections, losses arising from
incorrect information provided by clients, or technical issues with
third-party platforms.

Governing Law
These terms are governed by the laws of India. Disputes shall be subject to
the jurisdiction of courts in Noida, Uttar Pradesh.

Contact: contact@nxtweavesolutions.com
Website: www.nxtweavesolutions.com
`;

// ─── LegalPage fallback component ─────────────────────────────────────────────
function LegalPage({ title, content }) {
  return (
    <div
      style={{
        minHeight:  "100vh",
        background: "#F4F8FB",
        padding:    "100px 24px 80px",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <div
        style={{
          maxWidth:     "780px",
          margin:       "0 auto",
          background:   "#fff",
          borderRadius: "24px",
          padding:      "48px 52px",
          boxShadow:    "0 4px 32px rgba(30,58,95,0.08)",
          border:       "1px solid #e0e9f2",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "32px",
            borderBottom: "1px solid #e0e9f2",
            paddingBottom:"24px",
          }}
        >
          <div
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              fontSize:      "0.68rem",
              fontWeight:    600,
              color:         C.teal,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom:  "12px",
            }}
          >
            <span
              style={{
                width:    "22px",
                height:   "1.5px",
                background: C.teal,
                display:  "inline-block",
              }}
            />
            Legal
          </div>

          <h1
            style={{
              fontFamily:   "'Playfair Display',serif",
              color:        C.navy,
              fontWeight:   900,
              fontSize:     "clamp(1.6rem,3vw,2.2rem)",
              marginBottom: "8px",
            }}
          >
            {title}
          </h1>

          <p style={{ color: "#8FA3B4", fontSize: "0.82rem" }}>
            NxtWeave Solutions &nbsp;·&nbsp; For queries, contact us directly
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            color:      "#556B7D",
            fontSize:   "0.92rem",
            lineHeight: 1.9,
            fontWeight: 300,
            whiteSpace: "pre-wrap",
          }}
        >
          {content.trim()}
        </div>

        {/* Footer links */}
        <div
          style={{
            marginTop:  "40px",
            paddingTop: "24px",
            borderTop:  "1px solid #e0e9f2",
            display:    "flex",
            flexWrap:   "wrap",
            gap:        "12px",
          }}
        >
          <Link
            to="/"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              padding:       "11px 24px",
              borderRadius:  "50px",
              background:    C.navy,
              color:         "#fff",
              fontWeight:    600,
              fontSize:      "0.87rem",
              textDecoration:"none",
              transition:    "all 0.3s",
              fontFamily:    "'DM Sans',sans-serif",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = C.teal}
            onMouseOut={(e)  => e.currentTarget.style.background = C.navy}
          >
            ← Back to Home
          </Link>

          <a
            href="mailto:contact@nxtweavesolutions.com"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              padding:       "11px 24px",
              borderRadius:  "50px",
              border:        "1px solid #e0e9f2",
              color:         "#556B7D",
              fontWeight:    500,
              fontSize:      "0.87rem",
              textDecoration:"none",
              transition:    "all 0.3s",
              fontFamily:    "'DM Sans',sans-serif",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.teal;
              e.currentTarget.style.color       = C.teal;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e0e9f2";
              e.currentTarget.style.color       = "#556B7D";
            }}
          >
            📩 Questions? Email Us
          </a>
        </div>

        {/* Other legal links */}
        <div
          style={{
            marginTop:      "20px",
            display:        "flex",
            gap:            "20px",
            flexWrap:       "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label:"Privacy Policy",   to:"/privacy"    },
            { label:"Terms of Service", to:"/terms"      },
            { label:"Disclaimer",       to:"/disclaimer" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                color:         "#8FA3B4",
                fontSize:      "0.78rem",
                textDecoration:"none",
                transition:    "color 0.2s",
              }}
              onMouseOver={(e) => e.currentTarget.style.color = C.teal}
              onMouseOut={(e)  => e.currentTarget.style.color = "#8FA3B4"}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}