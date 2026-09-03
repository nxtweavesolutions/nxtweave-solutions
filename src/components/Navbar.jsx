// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | null

  const location = useLocation();
  const navigate = useNavigate();
  
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  /* SCROLL BEHAVIOR */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLICK OUTSIDE TO CLOSE DROPDOWNS */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* CLOSE ON ROUTE CHANGE */
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const handleServicesNav = (tabKey) => {
    navigate(`/services?tab=${tabKey}`);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  };



  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-slate-100"
            : "bg-[#0B1F3A]/90 backdrop-blur-md py-4.5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand with Normal Sizing */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={scrolled ? "/logo-dark.png" : "/logo.png"}
              alt="NxtWeave Logo"
              className="h-11 w-auto transition-all duration-300"
            />
            <div className="flex flex-col text-left">
              <span
                className={`text-sm font-black tracking-widest font-display transition-colors ${
                  scrolled ? "text-[#0B1F3A]" : "text-white"
                }`}
              >
                NXTWEAVE
              </span>
              <span className="text-[7.5px] font-bold tracking-[0.28em] text-slate-400 block -mt-0.5 leading-none">
                SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* Home Link */}
            <Link
              to="/"
              className={`font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                location.pathname === "/" && !activeDropdown
                  ? scrolled ? "text-royal-blue" : "text-cyan-300"
                  : scrolled ? "text-slate-600 hover:text-royal-blue" : "text-white/80 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown - Card Styled */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("services")}
                className={`inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                  activeDropdown === "services"
                    ? scrolled ? "text-royal-blue" : "text-cyan-300"
                    : scrolled ? "text-slate-600 hover:text-royal-blue" : "text-white/80 hover:text-white"
                }`}
              >
                <span>Services</span>
                <ChevronDown size={12} className="opacity-60" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-4 w-72 bg-white/98 backdrop-blur-xl border border-slate-150 rounded-[2rem] shadow-xl p-3.5 z-50"
                  >
                    <div className="space-y-1.5">
                      <button 
                        onClick={() => handleServicesNav("registration")} 
                        className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 flex items-center gap-3.5 group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-royal-blue flex items-center justify-center group-hover/item:bg-royal-blue group-hover/item:text-white transition-colors text-sm">
                          💼
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 leading-none mb-1 group-hover/item:text-royal-blue transition-colors">Business Registration</span>
                          <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Pvt Ltd, LLP, MSME</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleServicesNav("certifications")} 
                        className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 flex items-center gap-3.5 group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors text-sm">
                          🛡️
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 leading-none mb-1 group-hover/item:text-royal-blue transition-colors">Compliance & ISO</span>
                          <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">ISO, Trademark, GST</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleServicesNav("digital")} 
                        className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 flex items-center gap-3.5 group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover/item:bg-cyan-600 group-hover/item:text-white transition-colors text-sm">
                          💻
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 leading-none mb-1 group-hover/item:text-royal-blue transition-colors">Digital Solutions</span>
                          <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Websites, E-Commerce</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleServicesNav("marketing")} 
                        className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 flex items-center gap-3.5 group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors text-sm">
                          🚀
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 leading-none mb-1 group-hover/item:text-royal-blue transition-colors">Marketing & AI</span>
                          <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">SEO, AI Automation</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Link */}
            <Link
              to="/about"
              className={`font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                location.pathname === "/about"
                  ? scrolled ? "text-royal-blue" : "text-cyan-300"
                  : scrolled ? "text-slate-600 hover:text-royal-blue" : "text-white/80 hover:text-white"
              }`}
            >
              About
            </Link>

            {/* Blog Link */}
            <Link
              to="/blog"
              className={`font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                location.pathname === "/blog"
                  ? scrolled ? "text-royal-blue" : "text-cyan-300"
                  : scrolled ? "text-slate-600 hover:text-royal-blue" : "text-white/80 hover:text-white"
              }`}
            >
              Blog
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                location.pathname === "/contact"
                  ? scrolled ? "text-royal-blue" : "text-cyan-300"
                  : scrolled ? "text-slate-600 hover:text-royal-blue" : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </Link>

          </div>

          {/* Right Actions Block */}
          <div className="flex items-center gap-4">
            
            {/* WhatsApp Outline CTA */}
            <a
              href="https://wa.me/919711565533"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                scrolled
                  ? "border-[#25D366]/30 text-[#25d366] bg-[#25D366]/5 hover:bg-[#25D366]/10"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <MessageSquare size={12} fill="currentColor" /> Chat
            </a>

            {/* Hamburger Button */}
            <button
              className={`lg:hidden p-2 rounded-xl transition ${
                scrolled ? "text-[#0B1F3A]" : "text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation drawer"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-[80%] sm:w-[350px] h-full bg-white z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-8">
                <span className="text-xs font-black font-display text-[#0B1F3A] uppercase tracking-widest">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition">
                  <X size={18} className="text-slate-600" />
                </button>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
                <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-700 hover:text-royal-blue">Home</Link>
                
                {/* Services Group */}
                <div className="border-t border-slate-50 pt-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Services</span>
                  <div className="pl-3 flex flex-col gap-4">
                    <button onClick={() => handleServicesNav("registration")} className="text-xs font-semibold text-slate-600 hover:text-royal-blue text-left">Business Registration</button>
                    <button onClick={() => handleServicesNav("certifications")} className="text-xs font-semibold text-slate-600 hover:text-royal-blue text-left">Certifications & Compliance</button>
                    <button onClick={() => handleServicesNav("digital")} className="text-xs font-semibold text-slate-600 hover:text-royal-blue text-left">Digital Solutions</button>
                    <button onClick={() => handleServicesNav("marketing")} className="text-xs font-semibold text-slate-600 hover:text-royal-blue text-left">Digital Marketing & AI</button>
                  </div>
                </div>

                {/* Other standard items */}
                <div className="border-t border-slate-50 pt-4 flex flex-col gap-4">
                  <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-700 hover:text-royal-blue">About</Link>
                  <Link 
                    to="/blog"
                    onClick={() => setIsOpen(false)} 
                    className="text-sm font-bold text-slate-700 hover:text-royal-blue"
                  >
                    Blog
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-700 hover:text-royal-blue">Contact</Link>
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href="https://wa.me/919711565533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-xl text-[#25d366] text-xs font-bold text-center border border-[#25D366]/20 bg-[#25D366]/10 mb-4"
                >
                  Chat on WhatsApp
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-royal-blue hover:bg-blue-700 text-white py-4 rounded-xl text-xs font-bold text-center uppercase tracking-widest shadow-lg shadow-blue-500/10"
                >
                  Book Free Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}