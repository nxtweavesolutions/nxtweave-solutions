// src/pages/PrivacyPolicy.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

// Shared layout wrapper for all legal pages
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
            pointerEvents: "none",
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

// Shared Section
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

// Privacy Policy Page
export default function PrivacyPolicy() {
  return (
    <LegalLayout
      icon="🔒"
      title="Privacy Policy"
      subtitle="We take your privacy seriously. Here's exactly what we collect, why we collect it, and how we keep it safe."
    >
      <Para>
        At NxtWeave Solutions, your privacy matters to us. This policy explains
        how we collect, use, and protect your information. By utilizing our tools,
        landing pages, and consultation interfaces, you voluntarily consent to the collection
        and processing of your personal data in accordance with the exhaustive protocols detailed below.
      </Para>

      <Section number="1" title="Information We Collect">
        <Para>
          NxtWeave Solutions is deeply and unconditionally committed to maintaining comprehensive, transparent,
          and highly secure data collection protocols for all visitors, prospective clients, and active corporate
          partners. When you navigate our landing pages, establish contact, or use our specialized tools, we
          collect various classes of information. First, we collect Personal Identifiable Information (PII) including
          full names, corporate designations, primary phone numbers, secure email addresses, and mailing addresses
          provided voluntarily through lead consultation forms, custom package calculators, and interactive startup
          roadmaps. Second, to execute official corporate registrations, trademark applications, and tax compliance
          filings on your behalf, we collect necessary business documentation, corporate structural details, financial
          statements, and governmental identification cards (such as PAN, Aadhaar, or articles of incorporation) under
          strict parameters of absolute confidentiality. Third, to continuously optimize our technical interfaces
          and streamline the user experience, our servers capture standard browser telemetry. This includes internet
          protocol (IP) addresses, device hardware specifications, operating system versions, referral source URLs,
          pages viewed, and detailed time-stamps. We also employ cookies and similar analytics trackers to compile
          aggregate website usage statistics. Users may adjust their browser security configurations to block cookies,
          although this may restrict their access to certain dynamic portal functions, such as cost estimation tools
          and interactive advisory quiz states.
        </Para>

        <BulletList
          items={[
            "Name, phone number and email address",
            "Business details and registration documents",
            "Messages shared via forms, WhatsApp or email",
            "Website analytics and usage data",
            "Personal Identifiable Information (PII) including full names, corporate designations, and mailing addresses.",
            "Government-issued identity cards and certificates required for official compliance filings.",
            "Interactive pricing calculator selections, startup quiz answers, and lead details.",
            "Automated system logs, browser telemetry, IP addresses, and device hardware telemetry."
          ]}
        />
      </Section>

      <Section number="2" title="How We Use Information">
        <Para>
          All personal, business, and technical information collected by NxtWeave Solutions is utilized strictly
          to provide, execute, optimize, and support the consulting and compliance services requested by our
          clients. Primarily, we process your corporate documents and personal identifiers to compile and format
          official registration dossiers, draft statutory compliance forms, and coordinate direct filings with
          governmental registries. Additionally, we utilize secure contact channels (including email, SMS, and
          WhatsApp) to deliver critical project milestone updates, respond to specific customer service queries,
          distribute transactional invoices, and share administrative alerts. Furthermore, we leverage website usage
          statistics and lead inputs to refine our user interface designs, enhance technical performance, and score
          incoming inquiries. Our automated scoring algorithms analyze selected services and domain prefixes to
          prioritize high-intent prospects, allowing our consulting team to respond rapidly to hot sales
          opportunities. If you voluntarily subscribe to our communication databases, we may also occasionally
          distribute highly curated corporate newsletters, industry compliance briefings, and promotional packages.
          Users retain the absolute right to unsubscribe from these promotional campaigns at any time. We do not use
          automated decision-making processes or profiling systems that have legal effects on our clients, and all lead
          prioritizations are reviewed and verified by qualified administrative team members before any business
          decisions are made.
        </Para>

        <BulletList
          items={[
            "To provide requested services",
            "To communicate updates and support",
            "To process registrations and filings",
            "To improve our website and services",
            "To compile and prepare official administrative compliance filings and legal dossiers.",
            "To issue corporate invoices, track payments, and verify transaction authenticity.",
            "To dynamically score and prioritize incoming leads based on professional interest grids.",
            "To maintain regular communication and project status reports via secure channels."
          ]}
        />
      </Section>

      <Section number="3" title="Data Protection">
        <Para>
          NxtWeave Solutions implements a robust multi-layered technical, administrative, and physical security
          framework designed to safeguard client databases and sensitive corporate files against unauthorized access,
          exposure, modification, or destruction. We utilize industry-standard secure socket layer (SSL/TLS)
          encryption protocols for all data transfers, enforce secure database firewalls, implement regular diagnostic
          vulnerability scans, and mandate strict role-based access permissions. This guarantees that only
          authorized, contractually bound personnel are permitted to interact with client files. NxtWeave Solutions
          enforces an absolute, non-negotiable policy: we never sell, trade, rent, or lease personal or corporate
          client data to third-party marketing firms for commercial purposes. We share data only with highly trusted
          third-party service providers (such as cloud hosting infrastructure, payment processors, and certified
          professionals) who are legally and contractually obligated to maintain absolute confidentiality and process
          data solely in accordance with our instructions. Additionally, we may disclose personal or business
          information if explicitly compelled to do so by court orders, judicial warrants, public regulatory
          authorities, or local law enforcement agencies to protect our legal rights and satisfy statutory legal
          obligations. In the highly unlikely event of a data security incident, NxtWeave Solutions maintains robust
          recovery and incident response protocols, and is committed to notifying affected clients and appropriate
          regulatory bodies within the statutory timelines mandated by applicable data protection laws.
        </Para>

        <InfoBox type="success">
          We never sell your information to third parties. Our technical systems utilize multi-layered encryption to ensure complete privacy.
        </InfoBox>
      </Section>

      <Section number="4" title="Contact Us">
        <Para>
          This privacy policy is actively governed and administered by the legal and data protection office of
          NxtWeave Solutions. We review and update these guidelines periodically to ensure complete alignment with
          evolving global data security standards and local regulatory mandates. Under applicable international
          data protection laws, users and clients retain robust, legally enforceable rights regarding their
          personal data. Specifically, you possess the right to request comprehensive access to all personal data
          currently stored in our systems, request immediate corrections to inaccurate or incomplete files, or
          demand the complete erasure of your personal data from our active marketing databases, subject to our
          statutory records-preservation obligations for tax and corporate accounting. To exercise any of these
          rights, file a formal complaint, or request a detailed clarification regarding our data protection
          methods, please submit a written request to our designated data protection officer via the official email
          listed below. By continuing to navigate our website, input data into our tools, or subscribe to our
          consulting programs, you express your voluntary, explicit, and informed consent to our privacy
          guidelines. This policy is effective as of the date of publication on our website, and any major
          modifications that materially affect your privacy rights will be communicated prominently on our home page
          or sent directly to your registered email address prior to the change taking effect.
        </Para>

        <Para style={{ marginTop: "18px", fontWeight: "bold", color: "#1E3A5F" }}>
          📩 info@nxtweavesolutions.com
          <br />
          🌐 www.nxtweavesolutions.com
        </Para>
      </Section>
    </LegalLayout>
  );
}