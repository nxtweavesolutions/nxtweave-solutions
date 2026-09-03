// src/pages/PrivacyPolicy.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

// Shared Layout
function LegalLayout({ title, subtitle, icon, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-bg-slate-secondary min-h-screen text-slate-800 font-sans relative overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0B1F3A] via-[#0F2E5F] to-[#1D4ED8] text-white text-center">
        <div className="absolute inset-0 dark-dotted-grid opacity-25" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-4xl mb-4">{icon}</div>
          <span className="nw-badge mb-4 !bg-white/10 !border-white/20 !text-cyan-300">Legal Center</span>
          <h1 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xs text-blue-100/70 max-w-xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-12 shadow-xl shadow-slate-100/50">
          {children}

          {/* Footer Navigation Row */}
          <div className="mt-12 pt-8 border-t border-gray-150 flex flex-wrap gap-4 items-center justify-between">
            <Link to="/" className="btn-secondary !text-xs !px-5 !py-2.5">
              ← Back to Home
            </Link>
            <a href="mailto:info@nxtweavesolutions.com" className="text-xs font-semibold text-text-slate-paragraph hover:text-royal-blue transition-colors">
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
    <div className="mb-10">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-royal-blue to-accent-cyan flex items-center justify-center text-white font-bold text-xs">
          {number}
        </div>
        <h2 className="text-base font-bold text-text-slate-primary font-display">{title}</h2>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}

function Para({ children }) {
  return (
    <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed mb-3.5">
      {children}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-3 mb-5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 items-start text-xs text-text-slate-paragraph font-medium leading-relaxed">
          <span className="text-royal-blue flex-shrink-0 mt-0.5">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ type = "info", children }) {
  const styles = {
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-emerald-50 border-emerald-250 text-emerald-900",
    info: "bg-blue-50 border-blue-200 text-royal-blue",
  };
  const theme = styles[type] || styles.info;
  return (
    <div className={`p-4 rounded-xl border text-xs font-medium leading-relaxed mt-4 ${theme}`}>
      {children}
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