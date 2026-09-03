// src/pages/Disclaimer.jsx

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