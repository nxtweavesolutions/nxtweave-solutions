// src/pages/Blog.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowRight, BookOpen, Sparkles, Bell, Rss, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogArticles } from "../data/blogArticles";
import emailjs from "@emailjs/browser";

import { useDocumentSEO } from "../hooks/useDocumentSEO";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null);

  useDocumentSEO(
    `Blog Hub - ${selectedCategory === 'All' ? 'Startup compliance, Legal & Tech Guides' : selectedCategory + ' Guides'}`,
    "Access our comprehensive knowledge base covering Indian company incorporation, GST compliance audits, trademark protection strategies, custom React engineering, and paid B2B marketing channels.",
    "startup compliance guide, pvt ltd registration process online, gst updates 2026, trademark filing manual, nextjs clean architecture, b2b email marketing"
  );

  const categories = ["All", "Registration", "Compliance", "Digital", "Marketing"];

  const liveAlerts = [
    { source: "GST Portal", title: "GSTR-1 filing system enhancements deployed for July returns.", time: "12 mins ago" },
    { source: "MCA Update", title: "Unified SPICe+ form version 4.2 launched for faster DIN approvals.", time: "42 mins ago" },
    { source: "RBI Alert", title: "FDI reporting window relaxed for startups raising under $10M.", time: "2 hrs ago" },
    { source: "Startup India", title: "DPIIT announces ₹500 Cr additional allocation for Seed Fund Scheme.", time: "3 hrs ago" },
    { source: "GST Council", title: "Concessional tax rates draft released for custom tech service exports.", time: "5 hrs ago" },
    { source: "MCA Board", title: "Commencement of Business (Form INC-20A) KYC filing checks simplified.", time: "Yesterday" },
    { source: "Tech Release", title: "Vite 6.0 stable version released with improved server startup performance.", time: "2 days ago" },
    { source: "Income Tax", title: "Section 80-IAC evaluation board schedules next review on August 10.", time: "3 days ago" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const EMAILJS = {
      service: "service_8mzileq",
      template: "template_d8xpqpo",
      key: "ikS9R1hqeGZXmqe-f",
    };

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: "Blog Subscriber",
          reply_to: email,
          phone: "N/A",
          service: "Blog Newsletter Subscription",
          message: `Please add ${email} to the blog newsletter subscriber list.`,
        },
        EMAILJS.key
      );
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      console.error("[EmailJS blog subscription error]:", err);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const filteredPosts = useMemo(() => {
    return blogArticles.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans relative">
      
      {/* ── HEADER BANNER ── */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#06152B] via-[#0B1F3A] to-[#0A2540] text-white overflow-hidden">
        <div className="absolute inset-0 dark-dotted-grid opacity-10 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] top-[-10%] right-[-10%] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles size={10} className="text-cyan-400" />
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight font-display mb-4 uppercase">
            The NxtWeave Journal
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
            Expert analyses, guidelines, and toolkits regarding corporate incorporation, tax compliance, and modern web application development in India.
          </p>
        </div>
      </section>

      {/* ── LIVE REGULATORY & STARTUP ALERTS ── */}
      <section className="bg-slate-950 text-white py-4 border-b border-slate-800 relative z-20 overflow-hidden select-none">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-1.5">
              <Bell size={12} className="animate-pulse" /> Live Market Updates
            </span>
          </div>

          {/* Infinite Marquee Slider */}
          <div className="flex-1 overflow-hidden relative h-[28px] w-full flex items-center">
            <div className="animate-marquee gap-4">
              {[...liveAlerts, ...liveAlerts].map((alert, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveAlert(alert)}
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[9.5px] font-bold text-slate-300 mx-2 hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-cyan-400 font-extrabold uppercase text-[8.5px] tracking-wider">{alert.source}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                  <span>{alert.title}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                  <span className="text-slate-500 text-[8.5px]">{alert.time}</span>
                  <ArrowUpRight size={10} className="text-slate-400 group-hover:text-cyan-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Alert Detail Popup Modal */}
      {activeAlert && (
        <div className="fixed inset-0 bg-[#030B18]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#09182C] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">{activeAlert.source} Alert</span>
            </div>
            
            <h3 className="text-sm font-black font-display mb-3 leading-snug">
              {activeAlert.title}
            </h3>
            
            <p className="text-[11px] text-slate-300 leading-relaxed mb-6 font-medium">
              This official regulatory update was published {activeAlert.time}. For assistance with company formations, GST compliance filings, trademark claims, or custom technology implementations relating to this change, please contact our consulting panel.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveAlert(null);
                  const el = document.getElementById("contact-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/contact";
                  }
                }}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-[#030B18] font-black text-[9.5px] uppercase tracking-widest py-3 rounded-xl transition-all"
              >
                Consult Expert
              </button>
              <button
                onClick={() => setActiveAlert(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black text-[9.5px] uppercase tracking-widest py-3 rounded-xl transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FILTER & SEARCH SECTION ── */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Categories Tab Row */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#0B1F3A] text-white shadow-md shadow-blue-900/10"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box Input */}
          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, tags..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-royal-blue rounded-full pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
          </div>

        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-slate-400 font-bold uppercase tracking-wider text-xs"
            >
              No matching articles found. Try another query.
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-lg shadow-slate-100/50 hover:border-royal-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${post.color}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <Clock size={12} /> {post.readTime}
                      </div>
                    </div>

                    {/* Card Title & Desc */}
                    <h3 className="text-lg font-bold text-slate-800 font-display mb-3 leading-snug group-hover:text-royal-blue transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                      {post.desc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-[10px] text-slate-400 font-bold">
                      Published: {post.date}
                    </span>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-xs font-bold text-royal-blue flex items-center gap-1 hover:translate-x-1.5 transition-transform duration-300 focus:outline-none"
                    >
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── NEWSLETTER SECTION ── */}
      <section className="bg-[#0B1F3A] text-white py-16 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <BookOpen size={36} className="mx-auto mb-4 text-cyan-400" />
          <h2 className="text-2xl font-black font-display uppercase tracking-wide">Subscribe to updates</h2>
          <p className="text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">Get legal compliance bulletins & developer logs straight to your inbox</p>
          
          {subscribed ? (
            <div className="mt-8 text-center bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md mx-auto">
              <span className="text-xs font-bold text-emerald-400">✓ Thank you for subscribing! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs font-semibold placeholder-slate-400 outline-none focus:border-cyan-400 text-white"
              />
              <button type="submit" className="bg-gradient-to-r from-royal-blue to-cyan-500 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-full active:scale-98 transition-all">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
