// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { blogArticles } from "../data/blogArticles";

import { useDocumentSEO } from "../hooks/useDocumentSEO";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const article = blogArticles.find((item) => item.id === id);

  // Apply dynamic SEO tags with explicit canonical path
  useDocumentSEO(
    article?.title || "Blog",
    article?.seoDescription || "Read expert business resources on NxtWeave Solutions.",
    article?.title ? `${article.title.toLowerCase()}, nxtweave solutions blog, business registration guide` : "nxtweave solutions blog",
    article ? `/blog/${article.id}` : "/blog"
  );

  // Dynamic Article Schema for Google Rich Snippets
  useEffect(() => {
    if (!article) return;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.seoDescription,
      "image": "https://www.nxtweavesolutions.com/og-image.jpg",
      "datePublished": "2026-07-20T08:00:00+05:30",
      "dateModified": "2026-09-03T08:00:00+05:30",
      "author": {
        "@type": "Organization",
        "name": "NxtWeave Solutions",
        "url": "https://www.nxtweavesolutions.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NxtWeave Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.nxtweavesolutions.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.nxtweavesolutions.com/blog/${article.id}`
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `jsonld-article-${article.id}`;
    script.innerHTML = JSON.stringify(articleSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(`jsonld-article-${article.id}`);
      if (el) el.remove();
    };
  }, [article]);

  // Monitor scroll for progress indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle sharing link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-24 font-sans text-slate-800">
        <h2 className="text-xl font-bold uppercase tracking-widest text-slate-400">Article Not Found</h2>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-royal-blue uppercase tracking-widest hover:underline">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );
  }

  // Get other/related articles
  const relatedArticles = blogArticles.filter((item) => item.id !== id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans relative">
      
      {/* STICKY SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-royal-blue via-cyan-400 to-indigo-500 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── ARTICLE BANNER HEADER ── */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#06152B] via-[#0B1F3A] to-[#0A2540] text-white overflow-hidden">
        <div className="absolute inset-0 dark-dotted-grid opacity-15 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] top-[-20%] right-[-10%] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Back button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[10px] text-slate-400 hover:text-white font-black uppercase tracking-widest mb-8 border border-white/10 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
          >
            <ArrowLeft size={12} /> Back to Hub
          </Link>

          {/* Tag Category */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${article.color}`}>
              {article.category}
            </span>
            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{article.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight uppercase mb-6">
            {article.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-slate-300 text-xs font-semibold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-cyan-400" /> {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-cyan-400" /> Published July 2026
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all focus:outline-none"
              >
                <Share2 size={13} />
                <span>{copied ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── TWO-COLUMN ARTICLE CONTAINER ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: MAIN CONTENT WRAPPER */}
        <article className="lg:col-span-8 bg-white border border-slate-150 rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-slate-100/50">
          
          {/* Main Description Intro */}
          <div className="text-slate-800 font-bold text-sm md:text-base border-b border-slate-100 pb-6 mb-8 leading-relaxed">
            {article.desc}
          </div>

          {/* Sections Loop */}
          <div className="space-y-10">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-lg md:text-xl font-black text-[#0B1F3A] font-display uppercase tracking-wide leading-tight pt-4">
                  {sec.heading}
                </h2>
                
                {/* Format lines: support list formatting, paragraph formatting */}
                <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans space-y-4">
                  {sec.content.split("\n\n").map((para, pIdx) => {
                    // Check if it is a list of items starting with •
                    if (para.trim().startsWith("•")) {
                      return (
                        <ul key={pIdx} className="list-disc pl-6 space-y-2 mt-2">
                          {para.split("\n").map((li, liIdx) => (
                            <li key={liIdx} className="pl-1">
                              {li.replace("•", "").trim()}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    
                    // Check if it is a list of items starting with Step
                    if (para.trim().startsWith("Step")) {
                      return (
                        <div key={pIdx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mt-3 space-y-2">
                          {para.split("\n").map((step, sIdx) => (
                            <div key={sIdx} className="flex gap-2 items-start">
                              <span className="text-[10px] bg-royal-blue/10 text-royal-blue px-2 py-0.5 rounded-md font-black">S</span>
                              <p className="text-slate-700 font-medium text-xs">{step.trim()}</p>
                            </div>
                          ))}
                        </div>
                      );
                    }

                    // Check if it is a Q&A section starting with Q:
                    if (para.trim().startsWith("Q:")) {
                      const lines = para.split("\n");
                      return (
                        <div key={pIdx} className="bg-blue-50/30 border-l-4 border-royal-blue rounded-r-2xl p-5 mt-4 space-y-2">
                          <p className="font-extrabold text-[#0B1F3A] text-xs md:text-sm">{lines[0].trim()}</p>
                          {lines[1] && <p className="text-slate-600 text-xs">{lines[1].trim()}</p>}
                        </div>
                      );
                    }

                    return (
                      <p key={pIdx}>
                        {para.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* End of content callout */}
          <div className="mt-14 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-royal-blue">NW</span>
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">Written By</span>
                <span className="text-xs font-black text-slate-800 block">NxtWeave Legal & Technical Editorial Team</span>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#0B1F3A] hover:bg-[#122F55] text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all"
            >
              <span>Schedule Consultation</span>
              <ChevronRight size={12} />
            </Link>
          </div>

        </article>

        {/* RIGHT COLUMN: STICKY SIDEBAR (RELATED POSTS) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-[120px] space-y-6">
          
          {/* Related Articles Card */}
          <div className="bg-white border border-slate-150 rounded-[2rem] p-6 shadow-lg shadow-slate-100/50">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <BookOpen size={16} className="text-royal-blue" />
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Related Guides</span>
            </div>

            <div className="space-y-5">
              {relatedArticles.map((rel) => (
                <Link 
                  key={rel.id} 
                  to={`/blog/${rel.id}`}
                  className="block group"
                >
                  <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider ${rel.color}`}>
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-700 group-hover:text-royal-blue transition-colors duration-150 mt-2 line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase tracking-widest">{rel.readTime}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Help Callout */}
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#122F55] rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            
            <span className="text-[9px] text-cyan-300 font-black uppercase tracking-widest block mb-2">Need Direct Support?</span>
            <h4 className="text-sm font-black uppercase tracking-wide leading-tight mb-3">Speak directly to our compliance experts today.</h4>
            <p className="text-[10px] text-slate-300 leading-relaxed mb-5">
              Skip the reading and get a structured, free consultation detailing your business registration or scaling goals.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex w-full items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-[9px] uppercase tracking-widest shadow-md transition-all active:scale-98"
            >
              <span>Get Free Advice</span>
              <ChevronRight size={10} />
            </Link>
          </div>

        </aside>

      </section>

    </div>
  );
}
