// src/pages/TermsOfService.jsx

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

// InfoBox Component
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