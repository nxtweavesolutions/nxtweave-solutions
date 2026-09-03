// src/components/PortfolioShowcase.jsx
import { motion } from "framer-motion";
import { Monitor, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";

export default function PortfolioShowcase() {
  const projects = [
    {
      title: "Fintech Compliance Dashboard",
      type: "Custom ERP & SaaS Dashboard",
      desc: "Integrated corporate filing automation, real-time GST reconciliation ledger, and active audit notifications portal.",
      tech: ["React", "Vite", "Tailwind CSS", "Firebase", "Framer Motion"],
      color: "from-blue-600 via-indigo-600 to-indigo-800",
    },
    {
      title: "BioLogix Research Platform",
      type: "Corporate Platform",
      desc: "Premium Web interface featuring interactive scientific calculators, research timelines, and domain security frameworks.",
      tech: ["Next.js", "React 18", "Tailwind CSS", "Node.js", "Tailwind-Animate"],
      color: "from-cyan-600 via-teal-600 to-teal-800",
    },
    {
      title: "EduPulse Learning CRM",
      type: "Enterprise Administration Portal",
      desc: "Custom internal administration CRM managing user workflows, automated invoices generation, and WhatsApp chatbot triggers.",
      tech: ["React", "Express", "PostgreSQL", "Tailwind CSS", "Lucide React"],
      color: "from-purple-600 via-violet-600 to-violet-800",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100" id="portfolio">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.03),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="nw-badge mb-4">Our Work</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
            Digital Solutions We've Engineered
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium">
            Take a look at how we design premium custom interfaces for businesses.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] border border-gray-200 p-6 flex flex-col justify-between hover:border-royal-blue hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Browser Mockup Header */}
                <div className="w-full bg-slate-900 rounded-t-xl px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate max-w-[120px]">
                    {p.title}
                  </span>
                </div>

                {/* Browser Body Mockup */}
                <div className={`w-full aspect-video bg-gradient-to-tr ${p.color} rounded-b-xl flex items-center justify-center p-4 text-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <Sparkles size={28} className="text-cyan-300 mb-2 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider block">
                      {p.title}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-royal-blue uppercase tracking-wider">
                      {p.type}
                    </span>
                  </div>
                  <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="bg-slate-50 border border-gray-100 text-[10px] font-medium text-text-slate-paragraph px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-[10px] text-text-slate-light font-bold">
                  <span className="flex items-center gap-1">
                    <ShieldAlert size={12} /> Example Project
                  </span>
                  <a href="#contact" className="text-royal-blue flex items-center gap-1 hover:underline">
                    Inquire Details <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
