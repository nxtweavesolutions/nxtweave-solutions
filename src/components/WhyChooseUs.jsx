// src/components/WhyChooseUs.jsx
import { motion } from "framer-motion";
import { Check, X, Shield, Users, Clock, Briefcase } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    "End-to-end business support",
    "Expert team with 5+ years experience",
    "24-hour fast processing",
    "100% legal and government compliant",
    "Dedicated relationship manager",
    "Pan India and global services",
  ];

  const comparisons = [
    { feature: "Expert Guidance", nw: "check", ca: "check", diy: "cross" },
    { feature: "Time & Cost Efficient", nw: "check", ca: "cross", diy: "cross" },
    { feature: "End-to-End Support", nw: "check", ca: "partial", diy: "cross" },
    { feature: "100% Compliance", nw: "check", ca: "check", diy: "cross" },
    { feature: "Dedicated Manager", nw: "check", ca: "cross", diy: "cross" },
    { feature: "Ongoing Support", nw: "check", ca: "partial", diy: "cross" },
  ];

  const stats = [
    { value: "500+", label: "Businesses Served", icon: Users },
    { value: "99%", label: "Success Rate", icon: Shield },
    { value: "24 hrs", label: "Avg. Processing", icon: Clock },
    { value: "15+", label: "Services Offered", icon: Briefcase },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden" id="why-choose-us">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.03),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Info and Checklist (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="nw-badge mb-4">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-slate-primary font-display tracking-tight leading-tight mb-6">
                We Deliver More Than Just Services, We Deliver Peace of Mind.
              </h2>
              
              <ul className="space-y-3.5 mb-8">
                {points.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-semibold text-text-slate-paragraph">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-royal-blue flex-shrink-0">
                      ✓
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Graph Graphic */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-150 p-5 mt-4 relative overflow-hidden flex items-end justify-between h-36 shadow-sm">
              <div className="relative z-10">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block leading-none mb-1">Scale Strategy</span>
                <span className="text-xs font-extrabold text-royal-blue uppercase tracking-wider bg-white px-2.5 py-1 rounded-full shadow-sm border border-slate-100 block mb-1.5 w-max">
                  Growth Partner
                </span>
                <span className="text-xl font-black text-slate-800 block leading-tight">
                  +₹12.5 Lakhs
                </span>
                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest block mt-0.5">
                  ↑ Annual Scaling Rate
                </span>
              </div>
              
              {/* Upward Curve Vector SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 150" fill="none">
                <path 
                  d="M10 130 C 80 110, 120 40, 260 20" 
                  stroke="url(#blueGradient)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
                <circle cx="260" cy="20" r="6" fill="#06B6D4" className="animate-ping" />
                <circle cx="260" cy="20" r="4" fill="#1D4ED8" />
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Column 2: The Comparison Matrix (5 columns) */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-slate-150 rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-center shadow-lg shadow-slate-100/50">
            <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-6">
              <h3 className="text-sm font-black font-display text-slate-800 uppercase tracking-wider">
                Feature Comparison Matrix
              </h3>
              <span className="text-[9px] font-black text-white bg-royal-blue px-2.5 py-1 rounded-full uppercase tracking-wider">
                Compare
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-150">
                    <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Features</th>
                    <th className="py-2.5 px-3 text-[10px] font-black text-royal-blue uppercase tracking-widest text-center">NxtWeave</th>
                    <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Traditional CA</th>
                    <th className="py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">DIY / Self</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((c, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-100/30 transition-colors">
                      <td className="py-3 text-[11px] font-bold text-slate-700">{c.feature}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-emerald-500 font-bold">✓</span>
                      </td>
                      <td className="py-3 text-center">
                        {c.ca === "check" ? (
                          <span className="text-emerald-500 font-bold">✓</span>
                        ) : c.ca === "partial" ? (
                          <span className="text-slate-400 text-[10px] font-bold">Partial</span>
                        ) : (
                          <span className="text-red-400 font-bold">✗</span>
                        )}
                      </td>
                      <td className="py-3 text-center">
                        {c.diy === "check" ? (
                          <span className="text-emerald-500 font-bold">✓</span>
                        ) : (
                          <span className="text-red-400 font-bold">✗</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 3: The Metrics Grid (3 columns) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-slate-150 p-4.5 flex items-center gap-4 shadow-md shadow-slate-100/40 hover:border-royal-blue hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-royal-blue flex items-center justify-center flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="text-lg font-black text-text-slate-primary font-display block leading-tight">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
