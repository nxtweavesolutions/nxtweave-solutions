// src/components/TrustedBy.jsx
import { ShieldCheck } from "lucide-react";

export default function TrustedBy() {
  const industries = [
    "STARTUP SECTOR",
    "MANUFACTURING VERTICAL",
    "HEALTHCARE INFRASTRUCTURE",
    "TECH ENTERPRISES",
    "EDUCATION PLATFORMS",
    "RETAIL ECOSYSTEMS",
    "LOGISTICS NETWORKS",
  ];

  // Double the list for seamless looping
  const loopList = [...industries, ...industries];

  return (
    <section className="py-14 bg-slate-50 border-y border-slate-200/60 overflow-hidden" id="trusted-by">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] block mb-2">
          Trusted By Businesses Across India
        </span>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden whitespace-nowrap select-none py-1">
        <div className="marquee-container gap-4">
          {loopList.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center bg-white border border-slate-200/80 px-6 py-3 rounded-2xl shadow-sm text-[11px] font-bold text-slate-800 tracking-wider hover:border-royal-blue hover:text-royal-blue transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue mr-2.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Verified Badges */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs font-semibold text-text-slate-paragraph">
        
        {/* Verified Business */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <ShieldCheck size={14} className="text-royal-blue" />
          <span className="text-xs font-bold text-slate-800">Verified Business</span>
        </div>

        {/* Vertical Separator */}
        <div className="hidden sm:block w-[1px] h-4 bg-slate-200" />

        {/* 100% Legal & Secure */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-sm">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-xs font-bold text-slate-800">100% Legal & Secure</span>
        </div>

      </div>

    </section>
  );
}
