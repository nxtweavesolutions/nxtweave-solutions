// src/components/BundleBuilder.jsx
import { useState } from "react";
import { 
  Building, Users, User, Rocket, FileText, FileCheck, 
  Award, Factory, Code, Cpu, TrendingUp, Sparkles, 
  Check, ArrowRight, ShieldCheck, Receipt, Calculator 
} from "lucide-react";

export default function BundleBuilder() {
  const [selectedItems, setSelectedItems] = useState([]);

  const services = [
    {
      id: "pvt_ltd",
      name: "Pvt Ltd Registration",
      price: 7999,
      category: "Corporate Formations",
      desc: "For high-growth VC funding",
      icon: Building,
      iconColor: "text-blue-400 bg-blue-500/10",
    },
    {
      id: "llp",
      name: "LLP Registration Setup",
      price: 5499,
      category: "Corporate Formations",
      desc: "Partner limit protection",
      icon: Users,
      iconColor: "text-cyan-400 bg-cyan-500/10",
    },
    {
      id: "opc",
      name: "One Person Company (OPC)",
      price: 6499,
      category: "Corporate Formations",
      desc: "Solo owner corporate seal",
      icon: User,
      iconColor: "text-indigo-400 bg-indigo-500/10",
    },
    {
      id: "dpiit",
      name: "Startup India DPIIT Setup",
      price: 2999,
      category: "Corporate Formations",
      desc: "DPIIT tax holiday access",
      icon: Rocket,
      iconColor: "text-purple-400 bg-purple-500/10",
    },
    {
      id: "gst",
      name: "GST Registration Filing",
      price: 1499,
      category: "Compliance & Protection",
      desc: "Legal tax offset invoicing",
      icon: FileText,
      iconColor: "text-emerald-400 bg-emerald-500/10",
    },
    {
      id: "trademark",
      name: "Trademark Search & Class",
      price: 4999,
      category: "Compliance & Protection",
      desc: "Brand IP protection",
      icon: FileCheck,
      iconColor: "text-amber-400 bg-amber-500/10",
    },
    {
      id: "iso",
      name: "ISO 9001 quality audit",
      price: 8999,
      category: "Compliance & Protection",
      desc: "Global quality benchmark",
      icon: Award,
      iconColor: "text-rose-400 bg-rose-500/10",
    },
    {
      id: "msme",
      name: "MSME Udyam Enrollment",
      price: 999,
      category: "Compliance & Protection",
      desc: "Subsidies & delay protections",
      icon: Factory,
      iconColor: "text-teal-400 bg-teal-500/10",
    },
    {
      id: "landing_page",
      name: "Premium React Landing Page",
      price: 14999,
      category: "Tech Infrastructures",
      desc: "Ultra-fast custom UI",
      icon: Code,
      iconColor: "text-blue-400 bg-blue-500/10",
    },
    {
      id: "saas_app",
      name: "Custom SaaS Web Application",
      price: 39999,
      category: "Tech Infrastructures",
      desc: "Scalable cloud database models",
      icon: Cpu,
      iconColor: "text-purple-400 bg-purple-500/10",
    },
    {
      id: "seo_pack",
      name: "Premium SEO & Social growth Pack",
      price: 9999,
      category: "Tech Infrastructures",
      desc: "Crawl budget optimizations",
      icon: TrendingUp,
      iconColor: "text-rose-400 bg-rose-500/10",
    },
  ];

  const handleToggle = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const getSubtotal = () => {
    return services
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  };

  const hasDiscount = selectedItems.length >= 3;
  const getDiscount = () => {
    return hasDiscount ? Math.round(getSubtotal() * 0.1) : 0;
  };
  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#061121] via-[#09182C] to-[#0D223F] text-white relative overflow-hidden" id="bundle-builder">
      {/* Background patterns */}
      <div className="absolute inset-0 dark-dotted-grid opacity-10 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] top-[-10%] left-[-10%] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px] bottom-[-10%] right-[-10%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={10} className="text-cyan-400" />
            Configurator Tool
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display mb-4 uppercase">
            Build Your Custom Growth Package
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider max-w-xl mx-auto leading-relaxed">
            Select the company formations, licensing setups, and digital tools you need. View a high-fidelity invoice calculation in real-time.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Services Categories Grid */}
          <div className="lg:col-span-7 space-y-8">
            
            {["Corporate Formations", "Compliance & Protection", "Tech Infrastructures"].map((groupName) => {
              const groupServices = services.filter((s) => s.category === groupName);
              
              return (
                <div key={groupName} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
                      {groupName}
                    </h3>
                    <span className="text-[9px] font-semibold text-slate-500 uppercase">
                      Select multiple options
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {groupServices.map((s) => {
                      const isSelected = selectedItems.includes(s.id);
                      const Icon = s.icon;
                      
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleToggle(s.id)}
                          className={`border rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none flex items-center justify-between relative group ${
                            isSelected
                              ? "border-cyan-500/60 bg-cyan-500/5 shadow-lg shadow-cyan-950/20"
                              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon Wrapper */}
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconColor}`}>
                              <Icon size={16} />
                            </div>
                            
                            {/* Title & Desc */}
                            <div>
                              <h4 className="font-bold text-xs text-slate-100 group-hover:text-cyan-300 transition-colors leading-tight">
                                {s.name}
                              </h4>
                              <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                                {s.desc}
                              </span>
                            </div>
                          </div>

                          {/* Price & Selection Checkbox */}
                          <div className="flex items-center gap-3 flex-shrink-0 pl-2">
                            <span className="text-[11px] font-black text-slate-200">
                              ₹{s.price.toLocaleString("en-IN")}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? "border-cyan-400 bg-cyan-400 text-[#061121]"
                                : "border-slate-500 bg-transparent"
                            }`}>
                              {isSelected && <Check size={10} strokeWidth={4} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </div>

          {/* RIGHT: Invoice Statement Card (Next Level Receipt) */}
          <div className="lg:col-span-5 bg-[#030B18]/90 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
            
            {/* Watermark calculator icon */}
            <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none">
              <Receipt size={180} />
            </div>

            {/* Receipt Header */}
            <div className="relative z-10 flex justify-between items-start border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest block">Invoice Statement</span>
                <h3 className="text-sm font-extrabold text-slate-100 font-display mt-0.5">Est. ID: NW-2026-X8</h3>
              </div>
              <Receipt size={18} className="text-slate-400" />
            </div>

            {selectedItems.length === 0 ? (
              /* EMPTY STATE */
              <div className="text-center py-16 text-slate-400 font-semibold relative z-10">
                <Calculator size={36} className="mx-auto mb-4 text-slate-500 animate-pulse" />
                <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                  Select one or more professional setup modules on the left to generate your custom business statement details.
                </p>
              </div>
            ) : (
              /* ACTIVE INVOICE */
              <div className="relative z-10 space-y-6">
                
                {/* Items list */}
                <div className="max-h-[220px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                  {services
                    .filter((item) => selectedItems.includes(item.id))
                    .map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-[10px] font-bold text-slate-300">
                        <div className="flex flex-col">
                          <span>{item.name}</span>
                          <span className="text-[8.5px] text-slate-500 font-semibold">{item.category}</span>
                        </div>
                        <span className="text-white font-black">₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                </div>

                {/* Subtotal, Discount & Totals */}
                <div className="pt-5 border-t border-white/10 space-y-3.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-slate-200">₹{getSubtotal().toLocaleString("en-IN")}</span>
                  </div>

                  {hasDiscount ? (
                    <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[10px] font-black text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={12} className="animate-pulse" />
                        Bundle Discount (10% Off)
                      </span>
                      <span>-₹{getDiscount().toLocaleString("en-IN")}</span>
                    </div>
                  ) : (
                    <div className="bg-slate-800/60 border border-white/5 rounded-xl p-3 text-[9px] text-slate-400 font-bold flex items-center gap-1.5">
                      <Sparkles size={11} className="text-cyan-400 flex-shrink-0" />
                      <span>Add {3 - selectedItems.length} more item{3 - selectedItems.length > 1 ? "s" : ""} to unlock 10% bundle savings!</span>
                    </div>
                  )}

                  {/* Warning Disclaimer */}
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 text-[8.5px] text-amber-300 font-medium leading-relaxed">
                    ⚠️ <strong>Filing Disclaimer:</strong> Rates are starting professional consulting packages. Government application fees and local taxes are additional.
                  </div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-white/10">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Grand Total</span>
                    <span className="text-2xl font-black text-white font-display">
                      ₹{getTotal().toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Book Call Action */}
                <button
                  onClick={handleScrollToContact}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/30 transition-all active:scale-98"
                >
                  <span>Book Dynamic Invoice Bundle</span>
                  <ArrowRight size={12} />
                </button>

                {/* Trust assurance */}
                <div className="flex items-center justify-center gap-1.5 text-[8.5px] text-slate-500 font-bold uppercase tracking-wider">
                  <ShieldCheck size={11} className="text-emerald-500" />
                  <span>100% Secure Setup • Expert Verification</span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
