// src/components/StatsCounter.jsx
import { motion } from "framer-motion";
import { Users, FileText, Briefcase, BarChart3 } from "lucide-react";

export default function StatsCounter() {
  const stats = [
    {
      value: "10,000+",
      label: "Startups Launched",
      desc: "Incorporated and active across India.",
      icon: Users,
      color: "text-royal-blue",
      bg: "bg-blue-50",
    },
    {
      value: "₹250Cr+",
      label: "Client Funding Raised",
      desc: "Series A & seed rounds compliance audits.",
      icon: BarChart3,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      value: "15,000+",
      label: "Returns Filed Yearly",
      desc: "MCA filings, GST audits, GSTR-1, GSTR-3B.",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      value: "12+",
      label: "Industries Served",
      desc: "Fintech, Edtech, BioLogix, SaaS portals.",
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 text-slate-800 relative overflow-hidden border-t border-slate-200/60" id="stats-counter">
      <div className="absolute inset-0 dark-dotted-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-md border border-slate-150 rounded-[2rem] p-6 text-left shadow-lg shadow-slate-100/50 hover:shadow-xl hover:border-royal-blue/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">{stat.value}</h3>
                  </div>
                </div>
                <h4 className="text-sm font-extrabold text-slate-700 mb-1">{stat.label}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
