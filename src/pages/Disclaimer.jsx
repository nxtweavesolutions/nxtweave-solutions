// src/pages/Disclaimer.jsx

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

// Shared Components
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

// Disclaimer Page
export default function Disclaimer() {
  return (
    <LegalLayout
      icon="⚠️"
      title="Disclaimer"
      subtitle="Important information regarding the use of our website and services."
    >
      <Para>
        The information provided on the NxtWeave Solutions website is for general
        informational and administrative purposes only. By accessing and interacting
        with this portal, you express your voluntary acknowledgment of and complete agreement
        to all structural conditions, limitation clauses, and liability disclaimers set forth herein.
      </Para>

      <Section number="1" title="No Professional Advice">
        <Para>
          All contents, tools, documents, and resources available on or through the NxtWeave Solutions website
          are curated and presented strictly for general informational, educational, and administrative guidance
          purposes. The materials on this platform do not, and are not intended to, constitute legal, financial,
          tax, investment, or certified professional advice of any nature whatsoever. Users of this website
          must not rely on the information provided herein as an alternative to formal advice from a qualified
          attorney, chartered accountant, registered tax consultant, or other licensed business advisor. The
          digital ecosystem and the complexities of regulatory frameworks dictate that business strategies and
          compliance requirements vary dynamically based on company structure, industry, local jurisdiction,
          and operational context. Consequently, any actions taken, or decisions executed, based on the material,
          estimators, or interactive roadmaps provided by this website are done so entirely at the user's sole
          risk. NxtWeave Solutions does not establish, and the use of this website does not create, any
          professional-client, fiduciary, or advisory relationship between the user and the company. We
          strongly recommend and urge all entrepreneurs, startups, and established business operators to
          consult with a licensed, certified, and independent professional who is fully acquainted with their
          specific circumstances before making any significant legal, operational, tax-related, or financial
          commitments.
        </Para>

        <BulletList
          items={[
            "The content is intended solely for high-level administrative guidance and general corporate overview purposes.",
            "No certified accountant-client, attorney-client, or professional consulting relationship is formed through portal interaction.",
            "Startups must obtain independent legal, tax, and licensing audits from certified specialists prior to executing formal decisions.",
            "Interactive calculators and lead estimators provide generic calculations and do not constitute professional binding assessments."
          ]}
        />

        <InfoBox type="warning">
          Always consult a qualified professional before making important
          business decisions.
        </InfoBox>
      </Section>

      <Section number="2" title="Government Approvals">
        <Para>
          NxtWeave Solutions acts strictly as a professional service provider and administrative facilitator
          assisting clients with corporate formation, regulatory filings, tax registrations, intellectual
          property applications, and compliance management. However, users must understand that the authority
          to approve, reject, grant, or certify any corporate incorporation, GST registration, trademark, or
          business license rests exclusively and unconditionally with the respective municipal, state, federal,
          or governmental authorities (such as the Ministry of Corporate Affairs, Registrar of Companies, and other
          statutory bodies). NxtWeave Solutions does not, and cannot, provide any guarantee, warrant, or promise
          of successful outcomes, approvals, or specific issuance of any certifications. Furthermore, all
          processing timelines, review periods, and scheduling details communicated by our team are estimates
          based on standard regulatory workflows and are subject to immediate, dynamic adjustments by the
          government agencies without prior notification. NxtWeave Solutions shall not be held liable or
          responsible for any operational delays, corporate scheduling disruptions, or business launch set-backs
          caused by portal backlogs, governmental server maintenance, statutory updates, policy changes, or
          requests for clarification issued by regulatory officers. We do not possess any proprietary influence
          over public officials or regulatory procedures, and our role is strictly confined to compiling,
          formatting, and submitting administrative dossiers based on client inputs. Any adjustments in
          government fee schedules, documentation requisites, or legal standards are governed solely by government
          mandates and lie completely beyond our scope of control.
        </Para>

        <BulletList
          items={[
            "We do not guarantee approvals or certifications",
            "Processing timelines depend on authorities",
            "Policies may change without notice",
            "Government filings and licensing are subject to the absolute and final vetting of statutory government bodies.",
            "Processing schedules and registration turnaround times fluctuate based on authority workloads and database states.",
            "Statutory filing requisites, compliance criteria, and government policies can change retroactively without notice."
          ]}
        />
      </Section>

      <Section number="3" title="Third Party Links">
        <Para>
          Our website, interactive applications, and digital dashboards may contain hyperlinks, embedded contents,
          or API integrations pointing to external websites, government portals, third-party payment processors,
          and administrative databases that are not operated, maintained, or controlled by NxtWeave Solutions.
          These links are provided solely as a technical convenience and reference tool for our users to access
          public resources and supplementary systems. NxtWeave Solutions does not monitor, review, endorse,
          audit, or verify the accuracy, reliability, security, compliance, or completeness of the information,
          products, software, or services hosted on third-party platforms. When you navigate to these external
          resources, you exit our secure domain and become subject to the terms, privacy guidelines, and technical
          risks of those respective external providers. NxtWeave Solutions expressly disclaims any and all
          liability, direct or indirect, for any damages, security breaches, financial losses, data leaks, or
          operational failures resulting from your interaction with external web portals. We recommend that users
          exercise diligence, review the privacy policies of external sites, and verify the authenticity of all
          third-party platforms before submitting sensitive business credentials, payment details, or personal
          documentation. Any transactions or professional engagements conducted between the user and any third-party
          service provider identified through our links are strictly bilateral and independent of NxtWeave
          Solutions. We do not act as an arbitrator, guarantor, or representative in any third-party transactions,
          and we are not liable for any disputes, deficiencies, or contractual breaches arising from such external
          interactions.
        </Para>

        <BulletList
          items={[
            "Hyperlinks to government domains, state portals, and external registries are provided strictly for user convenience.",
            "We maintain zero administrative control over the security standards, data encryption, or operational status of external sites.",
            "Interaction with external payment systems or commercial tools is governed exclusively by third-party terms of service."
          ]}
        />
      </Section>

      <Section number="4" title="Limitation of Liability">
        <Para>
          To the fullest extent permitted by applicable statutory law, NxtWeave Solutions, including its founders,
          directors, corporate officers, employees, contract associates, partners, and technological agents,
          shall not be held liable to any user or entity for any direct, indirect, incidental, special,
          consequential, exemplary, or punitive damages. This comprehensive limitation of liability encompasses,
          without limitation, any claims for loss of business profits, corporate revenue, goodwill, proprietary
          data, operational interruption, capital expenditures, or other intangible commercial losses. This applies
          regardless of the legal framework or theory under which the claim is brought, whether in contract law,
          tort (including active or passive negligence), strict liability, or statutory breach, and even if
          NxtWeave Solutions has been explicitly advised of the potential for such losses. The successful and
          lawful execution of our administrative services is heavily dependent on the absolute truthfulness,
          completeness, and legal validity of all personal identities, commercial documents, financial records,
          and operational information provided by the client. NxtWeave Solutions disclaims all liability and
          responsibility for any delays, rejections, regulatory penalties, or legal prosecutions arising from
          fraudulent, inaccurate, outdated, or incomplete details submitted to us by the client or their
          authorized representatives.
        </Para>

        <BulletList
          items={[
            "We are not responsible for indirect losses",
            "Incorrect client information may affect outcomes",
            "External portal or authority delays are beyond our control",
            "Aggregate liability for any claim or dispute is strictly limited to the actual professional fees paid for the service.",
            "Clients assume full legal accountability for the authenticity and validity of all documents provided for registrations.",
            "Technical interruptions, government server outages, and database failures are treated as force majeure events."
          ]}
        />
      </Section>

      <Section number="5" title="Contact">
        <Para>
          This website, its general informational landing pages, blogs, and corporate overviews serve exclusively
          as a high-level marketing and operational introduction to NxtWeave Solutions. The contents, estimators,
          and generic packages detailed on this portal do not constitute a legally binding offer, bilateral
          contract, or specific professional covenant. Any formal corporate engagement, professional consulting
          arrangement, or filing mandate between NxtWeave Solutions and a client must be governed by a separate,
          customized, and legally executed Master Services Agreement (MSA) or Statement of Work (SOW). Such written
          contracts, when signed by authorized signatories of both parties, shall contain the exhaustive terms of
          service, payment schedules, intellectual property rights, and liability parameters, and shall completely
          supersede all general web contents. All official legal notices, compliance queries, or formal requests for
          information regarding our corporate services must be submitted in writing to our designated email
          address. We strive to maintain professional communication channels; however, informal communications,
          WhatsApp messages, or general web inquiries do not establish formal legal records or immediate service
          obligations on our part. Our company reserves the right to decline services, refuse consults, or terminate
          active correspondence with any prospective client or user at our sole discretion, without providing
          specific justifications, subject to the refund policies set forth in our active, signed customer
          agreements.
        </Para>

        <Para style={{ marginTop: "18px", fontWeight: "bold", color: "#1E3A5F" }}>
          📩 info@nxtweavesolutions.com
          <br />
          🌐 www.nxtweavesolutions.com
        </Para>

        <InfoBox type="success">
          Thank you for trusting NxtWeave Solutions.
        </InfoBox>
      </Section>
    </LegalLayout>
  );
}