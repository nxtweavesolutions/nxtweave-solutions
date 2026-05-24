// src/pages/TermsOfService.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

// Shared Layout
function LegalLayout({ title, subtitle, icon, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        minHeight: "100vh",
        background: "#F4F8FB",
      }}
    >
      {/* Hero */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 60%,#1a4a73 100%)",
          padding: "110px 24px 64px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(47,164,199,0.1),transparent 70%)",
          }}
        />

        <div style={{ fontSize: "2.8rem", marginBottom: "14px" }}>
          {icon}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 16px",
            borderRadius: "50px",
            background: "rgba(47,164,199,0.12)",
            border: "1px solid rgba(47,164,199,0.28)",
            color: "#2FA4C7",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          Legal
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.88rem",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>
      </section>

      {/* Content */}
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "44px 48px",
            border: "1px solid #e0e9f2",
            boxShadow: "0 4px 32px rgba(30,58,95,0.07)",
          }}
        >
          {children}

          {/* Footer */}
          <div
            style={{
              marginTop: "48px",
              paddingTop: "28px",
              borderTop: "1px solid #e0e9f2",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                borderRadius: "50px",
                background: "#1E3A5F",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              ← Back to Home
            </Link>

            <a
              href="mailto:info@nxtweavesolutions.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                borderRadius: "50px",
                border: "1px solid #e0e9f2",
                color: "#556B7D",
                fontWeight: 500,
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              📩 Questions? Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section
function Section({ number, title, children }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "0.72rem",
            fontWeight: 700,
          }}
        >
          {number}
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            color: "#1E3A5F",
            fontWeight: 700,
            fontSize: "1.05rem",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      <div style={{ paddingLeft: "42px" }}>{children}</div>
    </div>
  );
}

function Para({ children }) {
  return (
    <p
      style={{
        color: "#556B7D",
        fontSize: "0.88rem",
        lineHeight: 1.85,
        fontWeight: 300,
        marginBottom: "10px",
      }}
    >
      {children}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "10px 0 0",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "rgba(47,164,199,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2FA4C7",
              fontSize: "9px",
              fontWeight: 700,
              marginTop: "2px",
            }}
          >
            ✓
          </span>

          <span
            style={{
              color: "#556B7D",
              fontSize: "0.86rem",
              lineHeight: 1.72,
              fontWeight: 300,
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ type = "info", children }) {
  const styles = {
    info: {
      bg: "rgba(47,164,199,0.07)",
      border: "rgba(47,164,199,0.2)",
      color: "#1E3A5F",
    },
    warning: {
      bg: "rgba(255,165,0,0.08)",
      border: "rgba(255,165,0,0.25)",
      color: "#92400e",
    },
    success: {
      bg: "rgba(76,175,80,0.08)",
      border: "rgba(76,175,80,0.25)",
      color: "#14532d",
    },
  };

  const s = styles[type];

  return (
    <div
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: "12px",
        padding: "14px 18px",
        marginTop: "12px",
      }}
    >
      <p
        style={{
          color: s.color,
          fontSize: "0.84rem",
          lineHeight: 1.75,
          fontWeight: 400,
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

// Terms Page
export default function TermsOfService() {
  return (
    <LegalLayout
      icon="📋"
      title="Terms of Service"
      subtitle="These terms govern how we work together and use our services."
    >
      <Para>
        By using NxtWeave Solutions services or website, you agree to the
        following terms and conditions.
      </Para>

      <Section number="1" title="Services">
        <BulletList
          items={[
            "Business registration and compliance services",
            "Digital marketing and branding services",
            "Website and software development",
            "Government scheme guidance",
          ]}
        />
      </Section>

      <Section number="2" title="Client Responsibilities">
        <BulletList
          items={[
            "Provide accurate information and documents",
            "Make timely payments",
            "Respond to required approvals or updates",
            "Use our services lawfully",
          ]}
        />
      </Section>

      <Section number="3" title="Payments">
        <Para>
          Professional fees and government charges must be paid as agreed before
          or during project execution.
        </Para>

        <InfoBox type="warning">
          Government fees are non-refundable once submitted.
        </InfoBox>
      </Section>

      <Section number="4" title="Limitation of Liability">
        <BulletList
          items={[
            "We do not guarantee government approvals",
            "Delays caused by authorities are beyond our control",
            "Incorrect client information may impact results",
          ]}
        />
      </Section>

      <Section number="5" title="Contact">
        <Para>
          📩 info@nxtweavesolutions.com
          <br />
          🌐 www.nxtweavesolutions.com
        </Para>
      </Section>
    </LegalLayout>
  );
}