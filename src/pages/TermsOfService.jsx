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
        following terms and conditions. Please read these terms carefully before
        initiating any project, as they outline mutual covenants, billing policies, and legal boundaries.
      </Para>

      <Section number="1" title="Services">
        <Para>
          NxtWeave Solutions provides a highly specialized and comprehensive suite of professional business
          consulting, startup incubation assistance, administrative compliance structuring, corporate formation
          coaching, digital marketing strategy, visual branding, and customized web and software engineering solutions.
          By utilizing our platforms, subscribing to our services, or contracting our administrative assistance, the client
          explicitly acknowledges that all services are executed on a professional best-efforts basis. NxtWeave
          Solutions combines deep industry experience with robust technical resources to facilitate administrative
          filings, manage brand identities, and engineer modern software systems. However, we do not issue any
          guarantees, warranties, or promises that our work will result in specific marketing gains, immediate
          search engine ranking improvements, traffic increases, or financial return benchmarks. We reserve the
          absolute and unilateral right to modify, adjust, enhance, or temporarily suspend any of our packages,
          service tiers, interactive web utilities, or professional pricing schedules at our sole discretion, without
          prior notice, provided that ongoing client projects under active, signed, and fully paid-up contracts are
          executed and fulfilled in strict accordance with their respective mutually agreed written agreements. Our
          services do not include providing legal representation in litigation, certified public audits, or formal
          corporate liquidations. NxtWeave Solutions operates strictly as a corporate and digital growth consulting
          entity, and our deliverable timelines are governed by mutual schedules and milestone authorizations.
        </Para>

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
        <Para>
          The efficient, lawful, and successful execution of any corporate service, brand design, or compliance
          registration by NxtWeave Solutions is fundamentally contingent upon the prompt, complete, honest, and
          active cooperation of the client. Clients are strictly obligated to furnish all required corporate
          documents, identification papers, statutory signatures, corporate resolutions, and operational details in
          a highly timely and legally valid manner. It is the client’s sole, exclusive, and non-delegable
          responsibility to ensure that all information, declarations, and files supplied to our team are completely
          accurate, genuine, up-to-date, and free from any fraudulent, forged, or misleading details. NxtWeave
          Solutions shall not be held liable, accountable, or legally responsible for any delays, rejections,
          regulatory queries, administrative penalties, or legal prosecutions resulting from delayed client
          submissions, missing authorization signatures, or inaccurate documentation. Furthermore, clients are
          strictly obligated to ensure that their use of our branding designs, custom software products, and
          compliance roadmaps complies in full with all local, state, federal, and international regulations. Any
          unauthorized use of our engineered products, system databases, or corporate intellectual property for
          unlawful activities, including fraud, system manipulation, or regulatory circumvention, will result in the
          immediate and unilateral termination of our service agreements, without any professional fee refunds, and
          may be reported to competent law enforcement bodies.
        </Para>

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
          Clients agree to pay all professional consulting fees, service charges, subscription costs, and statutory
          government deposits in strict accordance with the billing schedule established prior to project
          commencement. NxtWeave Solutions operates as a professional administrative intermediary when executing filings
          on public portals; therefore, all statutory government fees, registration taxes, duties, and official
          processing charges are immediately non-refundable once they have been submitted to the respective public
          portals, departments, or municipal registries. This policy remains absolute regardless of whether the
          filing is subsequently approved, delayed, queried, or rejected by the regulatory authorities. Our
          professional consulting fees are calculated based on intensive resource allocation, technical analysis,
          and labor hours, and are non-refundable once work has commenced. Payments must be processed through our
          authorized payment gateways or designated corporate bank accounts. Late payments or payment defaults shall
          result in the immediate suspension of all services, filing activities, and website hosting until all
          outstanding balances are settled. Any disputed invoices must be brought to our attention in writing within
          ten (10) business days of issuance, failing which they shall be deemed accepted and valid. NxtWeave Solutions
          reserves the right to charge interest on all overdue payments at a rate of 1.5% per month, calculated daily,
          or the maximum rate permitted by law.
        </Para>

        <InfoBox type="warning">
          Government fees are non-refundable once submitted.
        </InfoBox>
      </Section>

      <Section number="4" title="Limitation of Liability">
        <Para>
          Under no circumstances shall NxtWeave Solutions, its founders, directors, corporate officers, employees, or
          authorized agents be held liable to the client or any third party for any indirect, incidental, special,
          consequential, exemplary, or punitive damages. This includes, but is not limited to, losses arising from
          operational delays, corporate rejections, government portal server outages, database downtime, statutory
          updates, policy changes, or requests for clarification issued by regulatory bodies. The client explicitly
          agrees that our aggregate liability for any and all claims, disputes, or legal actions arising under these
          terms, our privacy policies, or the actual professional services rendered shall be strictly capped and shall
          not, under any circumstances, exceed the total professional fee actually paid by the client to NxtWeave
          Solutions for that specific service during the preceding three-month period. We disclaim all implied
          warranties, including merchantability, fitness for a particular purpose, and non-infringement. Any
          disruptions caused by natural disasters, national emergencies, infrastructure failures, or government portal
          collapses shall be treated as force majeure events. The client acknowledges that this limitation is a
          fundamental element of the bargain between the parties, and that NxtWeave Solutions would be unable to
          provide these premium services at the stated price points without such robust and clear liability limits.
        </Para>

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
          These terms of service, our privacy policies, and any business relationships or disputes arising from or
          relating to our corporate operations shall be governed by, construed, and enforced in accordance with the
          applicable laws of our operating jurisdiction, without giving effect to any principles of conflict of laws.
          Any formal legal actions, lawsuits, or judicial proceedings must be initiated exclusively in the competent
          courts located at our corporate headquarters. Before initiating any formal legal actions, filings, or public
          arbitrations, the client explicitly agrees to engage in good-faith, bilateral negotiations with the management
          of NxtWeave Solutions for a minimum period of thirty (30) business days. For any formal notifications, legal
          notices of dispute, or requests for terms clarification, please contact our legal and compliance department
          via the official email provided on this website. Our team will review all documented correspondence and
          endeavor to reach a constructive, amicable resolution. If any provision of these terms is found by a court
          of competent jurisdiction to be invalid or unenforceable, the remaining provisions shall continue in full force
          and effect. No waiver of any term or condition shall be deemed a further or continuing waiver of such term or
          any other condition.
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