// src/components/ServicesSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ShieldCheck, Monitor, TrendingUp, Bot, Check, X, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState(null);

  const divisions = [
    {
      id: "registration",
      title: "Business Registration",
      desc: "Complete business entity setup and initial registration for modern startups.",
      icon: Building2,
      badge: "Popular",
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-royal-blue",
      details: [
        "GST Registration setup and filing preparation",
        "MSME / Udyam Certificate filing compliance",
        "Startup India Scheme official registration",
        "Sole Proprietorship / Partnership deed setup",
        "LLP (Limited Liability Partnership) incorporation",
        "Private Limited / One Person Company incorporation",
        "NGO Darpan & 80G/12A charity registration",
        "Municipal Trade license support",
      ],
    },
    {
      id: "certifications",
      title: "Certifications & Compliance",
      desc: "Official audits, licenses, evolution frameworks, and trade identity systems.",
      icon: ShieldCheck,
      badge: "Quality",
      color: "from-cyan-500/10 to-cyan-600/5",
      iconColor: "text-accent-cyan",
      details: [
        "ISO Quality Certification Systems (9001, 14001, 27001)",
        "FSSAI Food Safety license filings",
        "IEC (Import Export Code) registration",
        "Trademark trademark lookup & IP filings",
        "Copyright creative assets protection",
        "ZED (Zero Defect Zero Effect) rating scheme",
        "BIS & NSIC registration filings",
      ],
    },
    {
      id: "digital",
      title: "Digital Solutions",
      desc: "Custom web development, dashboard CRM systems, and cloud infrastructure.",
      icon: Monitor,
      badge: "Technology",
      color: "from-indigo-500/10 to-indigo-600/5",
      iconColor: "text-blue-500",
      details: [
        "Bespoke Corporate Website engineering",
        "Custom CRM & Business administrative dashboards",
        "Scalable SaaS product architecture",
        "E-Commerce website portal builds",
        "Mobile App Development (iOS & Android)",
        "Managed Cloud Hosting & domains",
      ],
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      desc: "SEO compliance, Meta/Google performance growth ads, and branding campaigns.",
      icon: TrendingUp,
      badge: "Growth",
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
      details: [
        "On-page & technical SEO audits",
        "Social Media Management & brand assets",
        "Performance lead generation ads (Meta & Google)",
        "Automated WhatsApp Marketing workflows",
        "Cinematic video content systems",
      ],
    },
    {
      id: "ai",
      title: "AI Automation",
      desc: "Custom AI agents, intelligent chatbot hubs, and workflow automation systems.",
      icon: Bot,
      badge: "Future Ready",
      color: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-500",
      details: [
        "Intelligent AI Agents & chatbot hubs",
        "Automated administrative document generator",
        "API integration workflows (Zapier, Make)",
        "Custom Business Intelligence data models",
      ],
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.03),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="nw-badge mb-4">Our Services</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
            Unified Suite for Legal & Digital Scaling
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium leading-relaxed">
            Eliminate vendor fragmentation. NxtWeave bridges legal structures and modern software development under one platform.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((d, idx) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-slate-150 p-8 shadow-lg shadow-slate-100/50 hover:border-royal-blue/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                  idx === 3 ? "lg:col-span-1" : idx === 4 ? "lg:col-span-2" : ""
                }`}
                onClick={() => setActiveModal(d)}
              >
                {/* Decorative subtle orb */}
                <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full bg-gradient-to-br ${d.color} blur-xl group-hover:scale-150 transition-transform duration-500`} />

                <div>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-white/90 ${d.iconColor} flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={22} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-royal-blue uppercase tracking-wider">
                      {d.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-slate-primary font-display mb-3 group-hover:text-royal-blue transition-colors duration-200">
                    {d.title}
                  </h3>
                  <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed mb-6 max-w-sm">
                    {d.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-royal-blue group-hover:translate-x-2 transition-transform duration-300 mt-4">
                  Learn Details <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Overlay Detail Drawer */}
        <AnimatePresence>
          {activeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-dark-navy/80 backdrop-blur-md p-4"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white/95 backdrop-blur-xl w-full max-w-2xl rounded-[2.5rem] border border-slate-150 p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close Modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 ${activeModal.iconColor} flex items-center justify-center border border-gray-100`}>
                    <activeModal.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-slate-primary font-display">
                      {activeModal.title}
                    </h3>
                    <p className="text-xs text-text-slate-paragraph font-medium">{activeModal.desc}</p>
                  </div>
                </div>

                {/* Sub services checklist */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-widest mb-2">
                    Scope of Offerings
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModal.details.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-xs text-text-slate-secondary font-medium leading-relaxed">
                        <Check size={14} className="text-royal-blue flex-shrink-0 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-xs text-text-slate-paragraph font-medium">
                    Estimate compliance costs using our interactive bundle builder tool.
                  </span>
                  <a
                    href="#contact"
                    onClick={() => setActiveModal(null)}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Consult an Expert
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
