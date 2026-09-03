// src/components/HeroSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Play, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS = {
  service: "service_8mzileq",
  template: "template_d8xpqpo",
  key: "ikS9R1hqeGZXmqe-f",
};

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatAnimation = {
    animate: {
      y: [-5, 5, -5],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setStatus("submitting");

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          service: "General Consultation (Hero Page)",
          message: "Consultation requested from hero page form.",
        },
        EMAILJS.key
      );
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("[EmailJS Hero error]:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-32 pb-24 bg-gradient-to-br from-[#06152B] via-[#0B1F3A] to-[#0A2540] text-white overflow-hidden" id="hero-section">
      
      {/* BACKGROUND GRADIENT MESH */}
      <div className="absolute inset-0 dark-dotted-grid opacity-20 pointer-events-none" />
      
      {/* Aurora glow blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-500/10 blur-[130px] top-[-10%] right-[-10%] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.04, 1],
          x: [0, -10, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-600/12 to-purple-500/5 blur-[120px] bottom-[-15%] left-[-10%] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* ── LEFT COLUMN: VALUE PROPOSITION ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 text-left"
          >
            {/* Tag Badge */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold uppercase tracking-widest shadow-xl backdrop-blur-md mb-8"
            >
              <Sparkles size={11} className="animate-spin-slow text-cyan-400" />
              <span>India's Premier Business Partner</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-display mb-6 leading-[1.08] uppercase"
            >
              India's Most Trusted <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Business Growth Partner
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants} 
              className="text-base md:text-lg text-slate-200 font-medium leading-relaxed mb-10 max-w-xl"
            >
              From business registration to digital transformation — we help startups, MSMEs and enterprises build, grow and scale with confidence across India.
            </motion.p>

            {/* Bottom trust checks */}
            <motion.div 
              variants={itemVariants} 
              className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-3.5 text-xs text-blue-100 font-bold uppercase tracking-wider"
            >
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-cyan-300" /> Free Consultation
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-cyan-300" /> 24-Hour Processing
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-cyan-300" /> Pan India Services
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-cyan-300" /> 100% Legal & Compliant
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: DUAL PANEL (DASHBOARD & FORM CARD) ── */}
          <div className="lg:col-span-7 w-full relative mt-16 lg:mt-0 flex justify-center">
            {/* Soft Cyan Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Slightly tilted container with increased size */}
            <div className="w-full max-w-[760px] transform rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 ease-out origin-center">
              <motion.div
                variants={floatAnimation}
                animate="animate"
                className="w-full relative z-10 flex flex-col md:flex-row gap-5 items-stretch"
              >
              {/* PANEL 1: Left Dashboard Console (Dark Theme) */}
              <div className="flex-1 bg-[#030B18]/90 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col justify-between relative text-white font-sans min-h-[360px]">
                {/* Dot background pattern inside console */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Title bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">👤</span>
                      <span className="text-[10px] font-black text-slate-200 tracking-wider">Business Overview</span>
                    </div>
                    {/* Window Controls */}
                    <div className="flex gap-1.5 text-[8px] text-slate-400">
                      <span>─</span>
                      <span>▢</span>
                      <span>×</span>
                    </div>
                  </div>

                  {/* 4 Cards Grid inside Dashboard */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Card 1: Business Registration */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[8px] text-slate-400 font-bold block">Business Registration</span>
                        <span className="text-[7px] text-slate-500 font-medium block mt-0.5">In Progress</span>
                      </div>
                      <div className="mt-2.5">
                        <span className="text-lg font-black text-slate-100 tracking-tight leading-none block">80%</span>
                        {/* Progress line */}
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[80%]" />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: GST Compliance */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] text-slate-400 font-bold block">GST Compliance</span>
                        <span className="text-[7px] text-slate-500">•••</span>
                      </div>
                      <div className="mt-2.5 flex flex-col justify-end">
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[7px] font-bold">✓</span>
                          Compliant
                        </span>
                        <span className="text-[7.5px] text-slate-400 font-medium block mt-1.5">All returns are up to date</span>
                      </div>
                    </div>

                    {/* Card 3: Website Analytics */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between min-h-[110px] relative overflow-hidden">
                      <div>
                        <span className="text-[8px] text-slate-400 font-bold block">Website Analytics</span>
                        <span className="text-[7px] text-slate-500 font-medium block mt-0.5">Visitors</span>
                      </div>
                      <div className="mt-2 relative z-10">
                        <span className="text-base font-black text-slate-100 block">24.6K</span>
                        <span className="text-[7px] font-semibold text-emerald-400 block mt-0.5">↑ +12.5% this month</span>
                      </div>
                      {/* Rising vector curve */}
                      <div className="absolute bottom-0 inset-x-0 h-8 opacity-40">
                        <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <path d="M 0,25 Q 25,5 50,18 T 100,8 L 100,30 L 0,30 Z" fill="rgba(37,99,235,0.2)" stroke="#1D4ED8" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Card 4: AI Automation */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between min-h-[110px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[8px] text-slate-400 font-bold block">AI Automation</span>
                          <span className="text-[7px] text-slate-500 font-medium block mt-0.5">Time Saved</span>
                        </div>
                        <span className="text-xs">🤖</span>
                      </div>
                      <div className="mt-2.5 flex items-end justify-between gap-1">
                        <div>
                          <span className="text-base font-black text-slate-100 block leading-none">120+ hrs</span>
                          <span className="text-[7px] font-semibold text-emerald-400 block mt-1.5">↑ +18% this month</span>
                        </div>
                        {/* Circular ring */}
                        <div className="w-8 h-8 rounded-full border-[3px] border-slate-700/50 border-r-cyan-400 border-t-cyan-400 flex-shrink-0 transform rotate-12" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom navigation pill tags */}
                <div className="flex items-center justify-between gap-1 mt-4 pt-3.5 border-t border-white/5 text-[7px] text-slate-400 font-black tracking-wider uppercase">
                  <div className="flex flex-col items-center gap-1">
                    <span>💼</span>
                    <span className="text-white">Registration</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-60">
                    <span>🛡️</span>
                    <span>Compliance</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-60">
                    <span>💻</span>
                    <span>Digital</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-60">
                    <span>🚀</span>
                    <span>Marketing</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 opacity-60">
                    <span>⚙️</span>
                    <span>AI Auto</span>
                  </div>
                </div>
              </div>

              {/* PANEL 2: Right Free Consultation Card (White Theme) */}
              <div className="flex-1 bg-white rounded-3xl p-5 shadow-2xl border border-slate-150 flex flex-col justify-between text-slate-800 font-sans min-h-[360px]">
                
                {/* Form Header */}
                <div>
                  <h3 className="text-base font-extrabold text-[#0B1F3A] font-display">Get Free Consultation</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Talk to our experts and grow your business</p>
                </div>

                {/* Status Handling inside Form */}
                {status === "success" ? (
                  <div className="text-center py-8">
                    <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-3 text-lg">✓</span>
                    <h4 className="text-xs font-black text-slate-800">Request Scheduled!</h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Expert will call you back shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 mt-3">
                    
                    {/* Name */}
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Full Name</span>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-3.5 py-2.5 text-[10px] text-slate-800 font-semibold outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Phone Number</span>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-3.5 py-2.5 text-[10px] text-slate-800 font-semibold outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email Address</span>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-royal-blue rounded-xl px-3.5 py-2.5 text-[10px] text-slate-800 font-semibold outline-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98"
                    >
                      <span>{status === "submitting" ? "Booking..." : "Submit Request"}</span>
                      <ArrowRight size={10} />
                    </button>

                    {status === "error" && (
                      <span className="text-[8px] text-red-500 font-semibold block text-center mt-1 uppercase">
                        Network Error. Please retry.
                      </span>
                    )}
                  </form>
                )}

                {/* Form Footer */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-3.5 border-t border-slate-100 w-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    500+ businesses grew with us
                  </span>
                </div>

              </div>

            </motion.div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
