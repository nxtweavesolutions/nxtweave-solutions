// src/components/LeadPopup.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS = {
  service: "service_8mzileq",
  template: "template_d8xpqpo",
  key: "ikS9R1hqeGZXmqe-f",
};

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "General Consultation",
    message: "",
  });

  useEffect(() => {
    // Initial 10-second timer to show the popup
    const firstTimer = setTimeout(() => {
      if (!hasSubmitted) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(firstTimer);
  }, [hasSubmitted]);

  const handleClose = () => {
    setIsOpen(false);
    // Restart 50-second repeating timer if closed without submission
    if (!hasSubmitted) {
      setTimeout(() => {
        setIsOpen(true);
      }, 50000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      return;
    }
    setStatus("submitting");

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message || "Lead captured via popup consultation prompt.",
        },
        EMAILJS.key
      );
      setStatus("success");
      setHasSubmitted(true);
      // Close after 2.5 seconds on success
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      console.error("[EmailJS LeadPopup error]:", err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-40"
          />

          {/* Modal Content - Split Screen Card Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white w-full max-w-4xl rounded-[2.5rem] border border-slate-150 overflow-hidden shadow-2xl relative z-50 grid grid-cols-12"
          >
            
            {/* Left Side: Brand Panel */}
            <div className="col-span-12 lg:col-span-5 bg-gradient-to-br from-[#06152B] via-[#0B1F3A] to-[#0A2540] p-8 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Dot background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <img src="/logo.png" alt="Logo" className="h-4.5 w-auto" />
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase">NxtWeave</span>
                </div>

                {/* Heading */}
                <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-3 leading-snug font-display">
                  Let's Build Your<br />Business Together
                </h3>
                
                {/* Desc */}
                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-8">
                  Talk to our experts for free — we will guide you on the best path forward with zero obligation.
                </p>

                {/* Checklist */}
                <div className="space-y-3.5">
                  {[
                    "Trusted by businesses across India and globally",
                    "Transparent pricing — no hidden charges, ever",
                    "Dedicated expert with 24-hour response time",
                    "End-to-end support from day one to delivery"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mt-0.5 flex-shrink-0 text-[10px] font-black">
                        ✓
                      </div>
                      <span className="text-[11px] font-semibold text-slate-200 leading-snug">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connect footer */}
              <div className="relative z-10 mt-10 pt-6 border-t border-white/10">
                <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mb-3">Connect With Us</span>
                <div className="flex flex-wrap gap-2.5">
                  <a href="https://wa.me/919711565533" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-[10px] font-bold hover:bg-[#25D366]/20 transition-all">
                    WhatsApp
                  </a>
                  <a href="https://instagram.com/nxtweave" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold hover:bg-pink-500/20 transition-all">
                    Instagram
                  </a>
                  <a href="https://linkedin.com/company/nxtweave" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold hover:bg-blue-500/20 transition-all">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Form Panel */}
            <div className="col-span-12 lg:col-span-7 p-8 lg:p-10 relative flex flex-col justify-center bg-white">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-6 top-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>

              <div className="max-w-md mx-auto w-full">
                {status === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 text-xl">
                      ✓
                    </div>
                    <h4 className="text-base font-extrabold text-slate-800 mb-1 font-display">Request Received!</h4>
                    <p className="text-xs text-slate-500 font-semibold">An advisor will call you within 15 minutes.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-1 font-display">Get Free Consultation</h3>
                    <p className="text-xs text-slate-400 font-semibold mb-6">Fill the form and our expert will call you back.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-4.5 py-3.5 text-xs text-slate-800 font-semibold outline-none transition-colors"
                      />

                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-4.5 py-3.5 text-xs text-slate-800 font-semibold outline-none transition-colors"
                      />

                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-4.5 py-3.5 text-xs text-slate-800 font-semibold outline-none transition-colors"
                      />

                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-4.5 py-3.5 text-xs text-slate-500 font-semibold outline-none transition-colors cursor-pointer"
                      >
                        <option value="General Consultation">Select Service</option>
                        <option value="Business Registration">Business Registration</option>
                        <option value="Certifications & Compliance">Certifications & Compliance</option>
                        <option value="Digital Solutions">Digital Solutions</option>
                        <option value="Digital Marketing & AI">Digital Marketing & AI</option>
                      </select>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Your Query or Message"
                        className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-4.5 py-3.5 text-xs text-slate-800 font-semibold outline-none transition-colors resize-none"
                      />

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-[#2790B0] hover:bg-[#207a95] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                      >
                        <span>{status === "submitting" ? "Booking..." : "Book Free Consultation"}</span>
                      </button>

                      <p className="text-[10px] text-slate-400 font-semibold text-center mt-3">
                        By submitting, you agree to our Terms and Privacy Policy.
                      </p>

                      {status === "error" && (
                        <span className="text-[10px] text-red-500 font-semibold block text-center mt-2">
                          Failed to send. Please check your network and try again.
                        </span>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
