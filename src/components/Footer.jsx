// src/components/Footer.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Clock, ArrowRight, ArrowUp } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── Scroll Helper ─────────────────────────────────────────────────────────────
let pendingScrollId = null;

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  }
  return false;
}

// ─── Scroll Trigger on Route Change ───────────────────────────────────────────
export function useScrollOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    if (pendingScrollId) {
      const id = pendingScrollId;
      pendingScrollId = null;

      // Poll until element is in DOM (max 2 seconds)
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const success = smoothScrollTo(id);
        if (success || attempts > 20) clearInterval(interval);
      }, 100);
    }
  }, [location.pathname]);
}

// ─── Footer Component ──────────────────────────────────────────────────────────
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleScroll = (sectionId) => {
    if (location.pathname === "/" || location.pathname === "") {
      smoothScrollTo(sectionId);
    } else {
      pendingScrollId = sectionId;
      navigate("/");
    }
  };

  const goToServicesTab = (tab) => {
    navigate(`/services?tab=${tab}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

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
          from_name: "Newsletter Subscriber",
          reply_to: email,
          phone: "N/A",
          service: "Footer Newsletter Subscription",
          message: `Please add ${email} to the newsletter subscriber list.`,
        },
        EMAILJS.key
      );
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      console.error("[EmailJS subscription error]:", err);
      // Fallback behavior
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61577122554991",
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/nxtweavesolutions/",
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nxtweavesolutions/",
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-dark-navy text-blue-100/60 pt-20 pb-8 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Mega Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand details (4/12 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3.5 mb-6"
              >
                <img
                  src="/logo.png"
                  alt="NxtWeave Logo"
                  className="h-11 w-auto"
                />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black tracking-widest font-display text-white">
                    NXTWEAVE
                  </span>
                  <span className="text-[7.5px] font-bold tracking-[0.28em] text-slate-400 block -mt-0.5 leading-none">
                    SOLUTIONS
                  </span>
                </div>
              </Link>

              <p className="text-xs text-blue-100/60 leading-relaxed mb-6 max-w-sm font-medium">
                Complete Business Consulting and Digital Solutions Platform. We help startup, MSME & enterprises build, grow & scale with confidence across India.
              </p>

              {/* Noida Address Info */}
              <div className="flex gap-2.5 items-start text-xs font-semibold text-blue-100/50 mb-6">
                <MapPin size={15} className="text-royal-blue flex-shrink-0 mt-0.5" />
                <span>Noida, Gautam Buddha Nagar, Uttar Pradesh, India</span>
              </div>
            </div>

            {/* Social Icons & WhatsApp */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-100/50 hover:bg-royal-blue hover:text-white hover:border-royal-blue hover:-translate-y-0.5 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
              <a
                href="https://wa.me/919711565533"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green !px-4 !py-2 !text-xs"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="mr-1.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2: Services links (2/12 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <button onClick={() => goToServicesTab("registration")} className="hover:text-white transition-colors duration-150 text-left">
                  Business Registration
                </button>
              </li>
              <li>
                <button onClick={() => goToServicesTab("certifications")} className="hover:text-white transition-colors duration-150 text-left">
                  Certifications & Compliance
                </button>
              </li>
              <li>
                <button onClick={() => goToServicesTab("digital")} className="hover:text-white transition-colors duration-150 text-left">
                  Digital Solutions
                </button>
              </li>
              <li>
                <button onClick={() => goToServicesTab("marketing")} className="hover:text-white transition-colors duration-150 text-left">
                  Digital Marketing
                </button>
              </li>
              <li>
                <button onClick={() => goToServicesTab("marketing")} className="hover:text-white transition-colors duration-150 text-left">
                  AI Automation Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/services")} className="text-royal-blue hover:text-cyan-300 transition-colors duration-150 text-left">
                  View All Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company links (2/12 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-150">About Us</Link>
              </li>
              <li>
                <button onClick={() => handleScroll("process-section")} className="hover:text-white transition-colors duration-150 text-left">
                  How It Works
                </button>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors duration-150">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <button onClick={() => handleScroll("faq-section")} className="hover:text-white transition-colors duration-150 text-left">
                  FAQ
                </button>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-150">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact desk details (2/12 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Get In Touch</h4>
            <ul className="space-y-4 text-xs font-semibold">
              <li className="flex gap-2 items-center">
                <Mail size={14} className="text-royal-blue flex-shrink-0" />
                <a href="mailto:info@nxtweavesolutions.com" className="hover:text-white transition-colors">
                  info@nxtweavesolutions.com
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={14} className="text-royal-blue flex-shrink-0" />
                <a href="tel:+919711565533" className="hover:text-white transition-colors">
                  +91 97115 65533
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Clock size={14} className="text-royal-blue flex-shrink-0 mt-0.5" />
                <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-1 bg-royal-blue hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-full shadow-lg shadow-blue-500/10 transition-all duration-300"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Column 5: Subscribe newsletter (2/12 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Subscribe</h4>
            <p className="text-[11px] leading-relaxed mb-4 font-medium text-blue-100/50">
              Get the latest business compliance updates and digital scaling guides.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-royal-blue transition-colors duration-200"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-royal-blue hover:bg-blue-700 text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-150"
              >
                <ArrowRight size={14} />
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] text-emerald-400 font-bold mt-2 block">
                ✓ Thank you for subscribing!
              </span>
            )}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-blue-100/40 font-semibold uppercase tracking-wider relative">
          <p>© {new Date().getFullYear()} NxtWeave Solutions. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-150">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors duration-150">Disclaimer</Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-royal-blue hover:text-white text-blue-100/50 border border-white/10 flex items-center justify-center transition-all duration-300"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
