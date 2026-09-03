// src/components/DocumentChecklist.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, ChevronRight, Download } from "lucide-react";

export default function DocumentChecklist() {
  const [activeTab, setActiveTab] = useState("pvtltd");

  const categories = {
    pvtltd: {
      name: "Pvt Ltd Company",
      subtitle: "Mandatory documents required for Private Limited incorporation under MCA.",
      docs: [
        { name: "PAN Card of all Directors", desc: "Must be self-attested and clear scan copy." },
        { name: "Aadhaar Card or Passport", desc: "Identity proof of all proposed directors." },
        { name: "Bank Statement / Utility Bill", desc: "Address proof of directors (not older than 2 months)." },
        { name: "NOC from Property Owner", desc: "No Objection Certificate for the registered office space." },
        { name: "Rent Agreement / Utility Bill", desc: "Proof of registered office address." },
      ],
    },
    llp: {
      name: "LLP Setup",
      subtitle: "Required documents for Limited Liability Partnership registration.",
      docs: [
        { name: "PAN Card of all Partners", desc: "Mandatory identity proof for designated partners." },
        { name: "Address Proof of Partners", desc: "Latest bank statement, telephone or electricity bill." },
        { name: "NOC from Landlord", desc: "Consent letter for using the address as LLP office." },
        { name: "LLP Agreement Draft", desc: "Prepared and formatted by NxtWeave compliance experts." },
      ],
    },
    gst: {
      name: "GST Filing Setup",
      subtitle: "Necessary proofs to obtain Goods & Services Tax identification number.",
      docs: [
        { name: "PAN Card of Business", desc: "Or PAN card of proprietor in case of sole proprietorship." },
        { name: "Partnership Deed / Incorporation Certificate", desc: "Proof of constitution of business." },
        { name: "Registered Office Address Proof", desc: "Electricity bill, rent agreement, and landlord NOC." },
        { name: "Authorized Signatory Proof", desc: "Letter of authorization or board resolution." },
      ],
    },
    trademark: {
      name: "Trademark Filing",
      subtitle: "IP India registration application documents.",
      docs: [
        { name: "Logo Artwork / Brand Name", desc: "High-resolution transparent image or exact text." },
        { name: "Signed Form TM-48", desc: "Power of attorney authorizing NxtWeave to file on your behalf." },
        { name: "User Affidavit", desc: "If claiming prior use of the trademark in commerce." },
        { name: "MSME Certificate", desc: "If filing as MSME to claim a 50% discount on government fees." },
      ],
    },
    ngo: {
      name: "NGO / Section 8",
      subtitle: "Documents required for Section 8 Company, Trust, or Society registration.",
      docs: [
        { name: "PAN and Aadhaar of Promoters", desc: "Minimum 3 promoters/trustees required." },
        { name: "Rent Agreement & Landlord NOC", desc: "Registered address proofs." },
        { name: "Detailed Draft MoA & AoA", desc: "Stating charity objective frameworks." },
        { name: "Detailed Estimates of Income", desc: "Budget projections for the next 3 fiscal years." },
      ],
    },
  };

  return (
    <section className="py-24 bg-bg-slate-secondary relative overflow-hidden" id="document-checklist">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.04),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="nw-badge mb-4">Required Documents</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
            Compliance Checklist Explorer
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium leading-relaxed">
            Avoid rejection delays. Review and gather all files needed for standard registrations.
          </p>
        </div>

        {/* Tab Controls (Capsule Slider Style) */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100/80 backdrop-blur-md p-1.5 rounded-full flex flex-wrap gap-1 max-w-full justify-center">
            {Object.keys(categories).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === key
                    ? "bg-white text-slate-800 shadow-md font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {categories[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-slate-150 p-8 md:p-10 shadow-xl shadow-slate-100/50"
            >
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h3 className="text-2xl font-bold text-slate-800 font-display mb-2">
                  {categories[activeTab].name} Checklist
                </h3>
                <p className="text-text-slate-paragraph font-medium">{categories[activeTab].subtitle}</p>
              </div>

              <div className="space-y-4">
                {categories[activeTab].docs.map((doc, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-slate-50/50 hover:bg-slate-50 hover:border-gray-100 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-royal-blue flex items-center justify-center flex-shrink-0">
                      <FileText size={18} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-text-slate-primary">{doc.name}</h4>
                      <p className="text-xs text-text-slate-paragraph mt-0.5 leading-relaxed font-medium">{doc.desc}</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-text-slate-paragraph font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  All templates and draft forms are prepared digitally by NxtWeave.
                </div>
                <a
                  href="#contact"
                  className="btn-primary"
                >
                  Start Registration <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
