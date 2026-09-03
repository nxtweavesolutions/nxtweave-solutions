// src/components/BlogPreview.jsx
import { motion } from "framer-motion";
import { FileText, ArrowRight, BookOpen, Clock } from "lucide-react";

export default function BlogPreview() {
  const posts = [
    {
      title: "Comprehensive Guide to GST Registration in India 2026",
      desc: "Everything you need to know about threshold limits, necessary document frameworks, and avoiding application rejection states.",
      category: "Business Registration",
      readTime: "8 min read",
      date: "May 25, 2026",
      color: "border-blue-200 text-royal-blue bg-blue-50/50",
    },
    {
      title: "SaaS Infrastructure Architecture: Scaling Rules for Startups",
      desc: "A deep dive into cloud deployment systems, hosting nodes, structured DB systems, and custom administrative dashboard CRM setup.",
      category: "Digital Solutions",
      readTime: "12 min read",
      date: "June 02, 2026",
      color: "border-cyan-200 text-accent-cyan bg-cyan-50/50",
    },
    {
      title: "Understanding GST Compliance Audits: Best Practices",
      desc: "Learn about the GSTR-1, GSTR-3B filings, audit notices, and tools to prepare calculations and records correctly.",
      category: "Compliance & Legal",
      readTime: "6 min read",
      date: "June 14, 2026",
      color: "border-emerald-200 text-emerald-600 bg-emerald-50/50",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="blog-preview">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.03),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="nw-badge mb-4">Blog & Resources</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
            Business Knowledge Hub
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium">
            Read expert analyses on compliance, business registration, and digital scaling.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-lg shadow-slate-100/50 hover:border-royal-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${p.color}`}>
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-text-slate-light font-bold">
                    <Clock size={12} /> {p.readTime}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-text-slate-primary font-display mb-3 leading-snug group-hover:text-royal-blue transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-4">
                <span className="text-[10px] text-text-slate-light font-bold">
                  Published: {p.date}
                </span>
                <a href="#contact" className="text-xs font-bold text-royal-blue flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                  Read Article <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
