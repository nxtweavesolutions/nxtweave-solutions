// src/pages/Services.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldAlert, ArrowRight, ExternalLink, HelpCircle, Sparkles, Building2, ShieldCheck, Monitor, TrendingUp } from "lucide-react";

const ALL_SERVICES = {
  registration: {
    label: "Business Registration",
    emoji: "📋",
    icon: Building2,
    color: "text-royal-blue",
    bg: "bg-blue-50/50",
    desc: "Complete business entity setup and initial registration for modern startups.",
    items: [
      { icon:"🏢", title:"Private Limited Company Registration",
        desc:"Most preferred structure for startups. Separate legal entity with limited liability and easy equity allocation.",
        benefits:["Separate Legal Entity","Limited Liability","Easy Equity Sharing","Perpetual Existence"] },
      { icon:"🤝", title:"LLP Registration",
        desc:"Combines partnership flexibility with company benefits. Ideal for professionals and service firms.",
        benefits:["Limited Liability","Lower Compliance","Tax Benefits","Flexible Management"] },
      { icon:"👥", title:"Partnership Firm Registration",
        desc:"Simple structure for 2 or more individuals with shared profits and responsibilities.",
        benefits:["Easy to Form","Minimal Compliance","Shared Responsibility","Simple Taxation"] },
      { icon:"🌱", title:"Section 8 Company Registration",
        desc:"Non-profit entity for charitable, educational and social welfare objectives.",
        benefits:["Non-profit Status","Tax Exemptions","High Credibility","Govt Recognition"] },
      { icon:"📋", title:"NGO Darpan Registration",
        desc:"Mandatory NITI Aayog portal registration for NGOs seeking government grants and credentials.",
        benefits:["Govt Grant Access","Unique ID","NITI Aayog Recognition","Scheme Eligibility"] },
      { icon:"📜", title:"12A Registration",
        desc:"Income tax exemption registration for non-profit organisations under the IT Act.",
        benefits:["Income Tax Exemption","Donor Confidence","Scheme Access","Audit Compliance"] },
      { icon:"💰", title:"80G Registration",
        desc:"Enables donors to claim tax deductions on donations made to your organisation.",
        benefits:["Donor Tax Deduction","Increased Donations","Trust & Credibility","Legal Recognition"] },
      { icon:"🌍", title:"CSR-1 Registration",
        desc:"Mandatory for NGOs and trusts seeking Corporate Social Responsibility programs.",
        benefits:["CSR Program Access","Corporate Tie-ups","MCA Recognition","Increased CSR Support"] },
      { icon:"📄", title:"Trade License",
        desc:"Legal permit to carry out trade or business activity in a specific jurisdiction.",
        benefits:["Legal Authorization","Business Legitimacy","Avoid Penalties","Renewal Support"] },
      { icon:"🏪", title:"Shop Act / Gumasta License",
        desc:"State-level license for retail shops and commercial establishments.",
        benefits:["State Compliance","Employee Benefits","Bank Account Opening","Legal Operation"] },
      { icon:"💎", title:"GeM Registration",
        desc:"Register on Government e-Marketplace to sell products and services to government buyers.",
        benefits:["Govt Orders","Pan India Market","Transparent Process","Direct Payment"] },
    ],
  },
  certifications: {
    label: "Certifications & Compliance",
    emoji: "🏅",
    icon: ShieldCheck,
    color: "text-accent-cyan",
    bg: "bg-cyan-50/50",
    desc: "Official audits, licenses, evolution frameworks, and trade identity systems.",
    items: [
      { icon:"🧾", title:"GST Registration",
        desc:"Mandatory above threshold turnover. Enables input tax credit and smooth B2B transactions.",
        benefits:["Legal Recognition","Input Tax Credit","Inter-state Sales","e-Commerce Ready"] },
      { icon:"🏭", title:"MSME / Udyam Registration",
        desc:"Unlock government schemes, priority lending, subsidies and collateral-free loan channels.",
        benefits:["Priority Lending Access","Subsidy on Patent","Govt Tender Benefits","Payment Protection"] },
      { icon:"🏅", title:"ISO Certification",
        desc:"International quality management certification that boosts global business credibility.",
        benefits:["Global Recognition","Tender Eligibility","Process Improvement","Client Trust"] },
      { icon:"™️", title:"Trademark Registration",
        desc:"Legally protect your brand name, logo and intellectual property from infringement.",
        benefits:["Brand Protection","Legal Rights","Asset Creation","Anti-Infringement"] },
      { icon:"🍽️", title:"FSSAI License",
        desc:"Mandatory food safety and standards licence for all food businesses across India.",
        benefits:["Legal Compliance","Consumer Trust","Business Expansion","Brand Credibility"] },
      { icon:"🌐", title:"IEC Certificate",
        desc:"Import Export Code required for all businesses engaged in international trade.",
        benefits:["Import/Export Legal","Global Trade Access","Bank Support","Lifetime Validity"] },
      { icon:"🚀", title:"Startup India Registration",
        desc:"DPIIT recognition unlocking tax benefits, self-certification and faster registration pathways.",
        benefits:["Tax Exemption","Easy Winding Up","Self Certification","Scheme Access"] },
      { icon:"⚡", title:"ZED Certification",
        desc:"Zero Defect Zero Effect certification by QCI for quality-focused manufacturers.",
        benefits:["Quality Recognition","Export Benefits","Govt Support","Market Access"] },
      { icon:"🌾", title:"FCI Certificate",
        desc:"Food Corporation of India empanelment for businesses in the food supply chain.",
        benefits:["Govt Supply Chain","Stable Revenue","Pan India Access","Credibility"] },
      { icon:"🔢", title:"DUNS / DRS Number",
        desc:"D-U-N-S Number for global business credibility and international supply chain access.",
        benefits:["Global Credibility","Supply Chain Access","International Trade","Risk Assessment"] },
      { icon:"🔧", title:"NSIC Registration",
        desc:"National Small Industries Corporation registration for government procurement benefits.",
        benefits:["Procurement Benefits","Tender Support","Bank Guarantee Waiver","Govt Recognition"] },
    ],
  },
  digital: {
    label: "Digital Solutions",
    emoji: "💻",
    icon: Monitor,
    color: "text-blue-500",
    bg: "bg-blue-50/50",
    desc: "Custom web development, dashboard CRM systems, and cloud infrastructure.",
    items: [
      { icon:"💻", title:"Website Development",
        desc:"Modern, responsive, SEO-optimised websites engineered for performance and conversion.",
        benefits:["Responsive Design","SEO Optimised","CMS Integration","Fast Loading"] },
      { icon:"⚙️", title:"Web Application Development",
        desc:"Custom web applications tailored to your business workflows and operational needs.",
        benefits:["React / Next.js","Secure Backend","API Integration","Scalable Architecture"] },
      { icon:"📊", title:"Business Dashboard",
        desc:"Real-time analytics and reporting dashboards for data-driven business decisions.",
        benefits:["Live Data","Custom Reports","Role-based Access","Mobile Ready"] },
      { icon:"☁️", title:"SaaS Platform Development",
        desc:"Scalable, cloud-native software platforms for your product or service offering.",
        benefits:["Multi-tenancy","Subscription Billing","Cloud Native","Auto Scaling"] },
      { icon:"🎨", title:"UI/UX Design",
        desc:"User-centric design that turns visitors into loyal, returning customers.",
        benefits:["User Research","Wireframing","Prototyping","Conversion Focused"] },
      { icon:"🌐", title:"Hosting & Domain Setup",
        desc:"End-to-end hosting, domain registration, SSL configuration and ongoing management.",
        benefits:["SSL Certificate","99.9% Uptime","Daily Backups","24/7 Support"] },
    ],
  },
  marketing: {
    label: "Digital Marketing & AI Growth",
    emoji: "📱",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50/50",
    desc: "SEO compliance, WhatsApp engines, Meta/Google performance growth ads, and AI automation.",
    items: [
      { icon:"📱", title:"Social Media Marketing & Brand Strategy",
        desc:"Strategic campaigns across Instagram, Facebook and LinkedIn that grow your audience and build brand trust.",
        benefits:["Brand Identity","Instagram & Facebook","LinkedIn Authority","Growth Strategy"] },
      { icon:"💬", title:"Automated WhatsApp Marketing Engines",
        desc:"Targeted WhatsApp broadcast campaigns for direct, high-conversion customer engagement and CRM system triggers.",
        benefits:["CRM Workflows","Bulk Broadcasts","High Open Rates","Lead Automation"] },
      { icon:"🖼️", title:"High-End Graphic Design Systems",
        desc:"Professional brand identity, UI design kits, social media creatives, and print collaterals.",
        benefits:["Design Kit Systems","Social Creatives","Print Layouts","Visual Branding"] },
      { icon:"✍️", title:"Data-Driven Content Marketing Frameworks",
        desc:"SEO-driven content architecture that increases organic traffic and turns users into active leads.",
        benefits:["SEO Keywords","Blog Audits","Lead Generation","Traffic Channels"] },
      { icon:"🎬", title:"Cinematic Short & Long Form Video Editing",
        desc:"High-converting short videos, reels, corporate movies, and advertising animation elements.",
        benefits:["Shorts & Reels","Corporate Movies","Motion Visuals","Audio Mastering"] },
      { icon:"🤖", title:"AI Automation Systems",
        desc:"Bespoke AI Agents, intelligent conversational chatbot hubs, workflow optimization, and business intelligence.",
        benefits:["Bespoke AI Agents","Chatbot Integrations","Zapier/Make Flows","BI Data Frameworks"] },
    ],
  },
};

import { useDocumentSEO } from "../hooks/useDocumentSEO";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Set default tab based on URL param or fallback
  const initialTab = searchParams.get("tab") || "registration";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedService, setSelectedService] = useState(null);

  useDocumentSEO(
    `Our Services - ${activeTab === 'registration' ? 'Business Registration' : activeTab === 'certifications' ? 'Certifications & Compliance' : activeTab === 'digital' ? 'Digital Web & SaaS Solutions' : 'Performance Marketing & Brand Growth'}`,
    "Explore our complete line of services including Private Limited Company incorporation, LLP deeds, GST filings, ISO audits, custom React/Next.js systems, and target audience cold email outreach.",
    "company registration services, gst filing consultant, trademark search class, iso quality audit certification, startup India dpiit recognition, nextjs developer company, paid meta ads specialist, b2b lead generation"
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ALL_SERVICES[tabParam]) {
      setActiveTab(tabParam);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [searchParams]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };

  const getRequiredDocs = (title) => {
    if (title.includes("Company") || title.includes("LLP")) {
      return ["PAN and Aadhaar proof of directors/partners", "Utility bill address proof", "Property NOC consent letter"];
    }
    if (title.includes("GST") || title.includes("Trademark")) {
      return ["Business constitution certificate", "Authorized signatory resolution", "Logo transparent artwork file"];
    }
    return ["Basic identity proof of promoters", "Operational details summary"];
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      
      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0B1F3A] via-[#0F2E5F] to-[#1D4ED8] text-white">
        <div className="absolute inset-0 dark-dotted-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="nw-badge mb-4 !bg-white/10 !border-white/20 !text-cyan-300">Services Suite</span>
          <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight mb-6">
            Comprehensive Corporate Offerings
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-medium">
            Explore detailed features, eligibility scopes, and checklist forms for our primary service divisions.
          </p>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-8 bg-bg-slate-secondary border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(ALL_SERVICES).map((key) => {
              const TabIcon = ALL_SERVICES[key].icon;
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                    activeTab === key
                      ? "bg-royal-blue text-white border-royal-blue shadow-lg shadow-blue-500/10"
                      : "bg-white text-text-slate-secondary border-gray-200 hover:bg-slate-50"
                  }`}
                >
                  <TabIcon size={14} />
                  {ALL_SERVICES[key].label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid Display */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-12 border-b border-gray-150 pb-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-text-slate-primary font-display flex items-center gap-3">
              <span className="text-royal-blue">{ALL_SERVICES[activeTab].emoji}</span>
              {ALL_SERVICES[activeTab].label}
            </h2>
            <p className="text-xs text-text-slate-paragraph font-medium mt-1 leading-relaxed">{ALL_SERVICES[activeTab].desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES[activeTab].items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-md shadow-slate-100/50 flex flex-col justify-between hover:border-royal-blue hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedService(item)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg border border-gray-100 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-[10px] text-text-slate-light font-bold uppercase tracking-wider">Scope Info ›</span>
                  </div>

                  <h3 className="text-base font-bold text-text-slate-primary font-display mb-3 group-hover:text-royal-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="border-t border-gray-50 pt-4 flex justify-between items-center text-[10px] text-royal-blue font-bold">
                  <span>View Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Government Scheme Advisory Warning Box */}
      <section className="py-12 bg-slate-50 border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-brand-warning mb-3">
            <ShieldAlert size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Government Scheme Policy</span>
          </div>
          <p className="text-[11px] text-text-slate-paragraph font-extrabold leading-relaxed uppercase tracking-wider">
            NXTWEAVE SOLUTIONS DOES NOT PROVIDE FUNDING OR LOAN ISSUANCES. WE ARE A PRIVATE COMPLIANCE CONSULTING ENTITY. OUR SERVICES COMPRISE ADVISORY & ELIGIBILITY VERIFICATION PREPARATION ONLY.
          </p>
        </div>
      </section>

      {/* Slide-out detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-navy/80 backdrop-blur-md p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] border border-gray-200 p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3.5 mb-6 border-b border-gray-100 pb-4">
                <span className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl border border-gray-100">
                  {selectedService.icon}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-text-slate-primary font-display leading-tight">
                    {selectedService.title}
                  </h3>
                  <span className="text-[10px] text-royal-blue font-bold uppercase tracking-widest mt-1 block">Registration Details</span>
                </div>
              </div>

              {/* Service details columns */}
              <div className="space-y-5 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-widest mb-2">Key Benefits</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedService.benefits.map((b, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs text-text-slate-secondary font-medium">
                        <Check size={14} className="text-emerald-500 flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-widest mb-2">Required Proofs Checklist</h4>
                  <ul className="space-y-2">
                    {getRequiredDocs(selectedService.title).map((d, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-text-slate-paragraph font-medium leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-blue mt-1.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center border-t border-gray-100 pt-6">
                <span className="text-[10px] text-text-slate-light font-semibold">
                  *Registration processing within 24–48 hours.
                </span>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="btn-primary w-full sm:w-auto"
                >
                  Consult Now
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}