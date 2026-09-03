// src/pages/About.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Clock, Globe, ArrowRight, CheckCircle2, ChevronRight, Award, MessageSquare, Quote } from "lucide-react";

const STATS = [
  { value: "500+", label: "Businesses Served", sub: "Across India & globally", icon: Award },
  { value: "99%", label: "Success Rate", sub: "On all registrations", icon: Shield },
  { value: "35+", label: "Services Offered", sub: "Under one roof", icon: Sparkles },
  { value: "Pan India", label: "Service Reach", sub: "& International clients", icon: Globe },
];

const TEAM_VALUES = [
  "We never oversell or overpromise.",
  "We explain every step in plain language.",
  "We follow up — you never have to chase us.",
  "We treat your business like our own.",
  "We are accessible — always reachable on WhatsApp.",
];

const CORE_VALUES = [
  { name: "Integrity", desc: "Honest counseling, transparent fees, and strict regulatory adherence." },
  { name: "Transparency", desc: "Clear milestones, direct communications, and zero hidden costs." },
  { name: "Excellence", desc: "Double-checked filing systems to ensure absolute zero rejection rates." },
  { name: "Innovation", desc: "Deploying custom AI automation agents to streamline admin tasks." },
];

const JOURNEY = [
  {
    year: "2026",
    month: "January",
    title: "NxtWeave Solutions Founded",
    desc: "NxtWeave Solutions was founded in Noida with one clear mission — to make business registration, compliance and digital growth simple, honest and affordable for every entrepreneur.",
  },
  {
    year: "2026",
    month: "February",
    title: "First Registrations Delivered",
    desc: "Within our first weeks, we successfully completed our first Private Limited Company and GST registrations — setting the standard for transparent, timely and professional service delivery.",
  },
  {
    year: "2026",
    month: "March",
    title: "Certifications Practice Launched",
    desc: "We expanded our offering to include ISO, Trademark, FSSAI, MSME and IEC certifications — becoming a genuinely comprehensive compliance partner for businesses across all sectors.",
  },
  {
    year: "2026",
    month: "April",
    title: "Digital Solutions Division",
    desc: "We launched our digital arm — offering website development, web applications, SaaS platforms and UI/UX design. Clients could now handle compliance and digital growth in one place.",
  },
  {
    year: "2026",
    month: "May",
    title: "First International Client",
    desc: "We served our first international client — completing IEC and Trademark registration fully remotely for a business based in Dubai, UAE. A major milestone in our global expansion.",
  },
  {
    year: "2026",
    month: "Present",
    title: "Growing Strong — 500+ Businesses",
    desc: "Today, NxtWeave Solutions serves startups, MSMEs, NGOs and enterprises across Pan India and internationally. We continue to grow with integrity, one client at a time.",
  },
];

const TESTIMONIALS = [
  {
    initials: "JC",
    name: "James Carter",
    role: "International Business, Dubai UAE",
    text: "From Dubai, we completed our IEC and Trademark registration fully remotely with NxtWeave. The process was seamless, the communication was excellent, and the team genuinely cared about getting it right.",
  },
  {
    initials: "RS",
    name: "Rahul Sharma",
    role: "Startup Founder, Noida",
    text: "NxtWeave completed our Pvt Ltd registration quickly and professionally. They kept us informed at every single step — I've never experienced service this transparent.",
  },
  {
    initials: "PS",
    name: "Priya Singh",
    role: "NGO Director, Lucknow",
    text: "Applied for 12A and 80G together. Full support from document preparation to final approval. Could not have done it without their team.",
  },
];

import { useDocumentSEO } from "../hooks/useDocumentSEO";

export default function About() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useDocumentSEO(
    "About Our Corporate Advisors & Tech Engineers",
    "Meet the team of corporate legal consultants, certified accountants, and senior tech developers at NxtWeave. Learn about our transparency values, history, and mission to empower Indian startups.",
    "about nxtweave solutions, company registration consultant Noida, legal compliance team, startup advisers India, custom website developers Noida"
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0B1F3A] via-[#0F2E5F] to-[#1D4ED8] text-white">
        <div className="absolute inset-0 dark-dotted-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="nw-badge mb-4 !bg-white/10 !border-white/20 !text-cyan-300">About Our Platform</span>
          <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Bridging Legal Structure and Digital Engineering
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
            NxtWeave Solutions is India's unified consulting portal offering registrations, statutory certifications, and bespoke web software development.
          </p>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="py-12 bg-bg-slate-secondary border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-royal-blue flex items-center justify-center mx-auto mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-2xl font-black text-text-slate-primary font-display">{s.value}</h3>
                  <h4 className="text-xs font-bold text-text-slate-paragraph mt-1">{s.label}</h4>
                  <p className="text-[10px] text-text-slate-light font-semibold mt-0.5">{s.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Details Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="nw-tag">Our Vision</span>
              <h2 className="text-3xl font-extrabold text-text-slate-primary tracking-tight font-display mb-6">
                Redefining the Consulting Experience for Indian Startups
              </h2>
              <p className="text-sm text-text-slate-paragraph font-medium leading-relaxed mb-6">
                Most companies suffer from vendor fragmentation. They hire a Chartered Accountant (CA) to process compliance, and a separate software house to code their MVP. The resulting communication gaps delay releases and cause reporting conflicts.
              </p>
              <p className="text-sm text-text-slate-paragraph font-medium leading-relaxed mb-8">
                NxtWeave was founded to consolidate this journey. We prepare your corporate structure, register legal entities, file taxes, and build your digital assets — all under one unified platform.
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="btn-primary">
                  Inquire Now <ChevronRight size={16} />
                </a>
              </div>
            </div>

            <div className="bg-bg-slate-secondary rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-lg shadow-slate-100">
              <h3 className="text-lg font-bold text-text-slate-primary font-display mb-6 border-b border-gray-200 pb-4">
                NxtWeave Code of Honor
              </h3>
              <ul className="space-y-4">
                {TEAM_VALUES.map((v, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs text-text-slate-secondary font-semibold">
                    <CheckCircle2 size={16} className="text-royal-blue flex-shrink-0 mt-0.5" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Timeline Journey */}
      <section className="py-24 bg-bg-slate-secondary relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="nw-badge mb-4">Milestones</span>
            <h2 className="text-3xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
              Our Journey in 2026
            </h2>
            <p className="text-sm text-text-slate-paragraph font-medium">
              A timeline of NxtWeave Solutions' growth, scaling, and milestones since founding.
            </p>
          </div>

          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-32 space-y-12">
            {JOURNEY.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Year tag indicator */}
                <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-royal-blue flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
                </div>
                
                {/* Date sidebar label (hidden on mobile) */}
                <div className="hidden md:block absolute left-[-130px] top-0.5 w-[100px] text-right">
                  <span className="text-xs font-black text-royal-blue uppercase tracking-widest block">{item.year}</span>
                  <span className="text-[10px] text-text-slate-light uppercase font-bold block mt-0.5">{item.month}</span>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-royal-blue transition-colors duration-200">
                  <span className="text-xs font-bold text-royal-blue block md:hidden uppercase mb-2">
                    {item.month} {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-text-slate-primary font-display mb-2">{item.title}</h3>
                  <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="nw-tag justify-center">Corporate Values</span>
            <h2 className="text-3xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
              The Principles Guarding Our Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((v, idx) => (
              <div key={idx} className="bg-bg-slate-secondary border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-base font-bold text-text-slate-primary font-display mb-2">{v.name}</h3>
                <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 bg-bg-slate-secondary relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="nw-badge mb-4">Reviews</span>
          <h2 className="text-3xl font-extrabold text-text-slate-primary tracking-tight font-display mb-12">
            Trusted by Leaders
          </h2>

          <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-12 shadow-xl shadow-slate-100/50 min-h-[220px] relative flex flex-col justify-between">
            <div className="absolute top-6 left-6 text-slate-100">
              <Quote size={60} />
            </div>

            <div className="relative z-10 flex-grow flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base md:text-lg italic font-medium text-text-slate-secondary leading-relaxed"
                >
                  "{TESTIMONIALS[activeTestimonial].text}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-3 pt-6 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-royal-blue flex items-center justify-center font-bold text-xs">
                {TESTIMONIALS[activeTestimonial].initials}
              </div>
              <div className="text-left text-xs">
                <h4 className="font-bold text-text-slate-primary">{TESTIMONIALS[activeTestimonial].name}</h4>
                <p className="text-text-slate-paragraph font-medium">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === idx ? "bg-royal-blue w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}