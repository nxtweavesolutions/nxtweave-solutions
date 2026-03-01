// src/components/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const location = useLocation();
  const lastScrollY = useRef(0);

  /* ----------------------------------------
     SCROLL BEHAVIOR
  ---------------------------------------- */

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

  /* ----------------------------------------
     CLOSE MOBILE ON ROUTE CHANGE
  ---------------------------------------- */

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* ----------------------------------------
     LOCK BODY SCROLL WHEN MOBILE OPEN
  ---------------------------------------- */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  /* ----------------------------------------
     CLOSE ON ESC KEY
  ---------------------------------------- */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-gradient-to-r from-[#0D1F33] to-[#1E3A5F] py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ----------------------------------------
             LOGO
          ---------------------------------------- */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={scrolled ? "/logo-dark.png" : "/logo.png"}
              alt="NxtWeave Logo"
              className="h-10 w-auto transition-all duration-300"
            />

            <span
              className={`text-2xl font-extrabold tracking-tight transition-colors ${
                scrolled ? "text-[#1E3A5F]" : "text-white"
              }`}
            >
              Nxt<span className="text-[#2FA4C7]">Weave</span>
            </span>
          </Link>

          {/* ----------------------------------------
             DESKTOP NAVIGATION
          ---------------------------------------- */}

          <div className="hidden lg:flex items-center gap-10">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-medium text-base transition-all duration-200 ${
                    isActive
                      ? "text-[#2FA4C7]"
                      : scrolled
                      ? "text-gray-700 hover:text-[#1E3A5F]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}

                  {/* Active underline animation */}
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#2FA4C7] rounded-full"
                    style={{
                      width: isActive ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}

          </div>

          {/* ----------------------------------------
             RIGHT SIDE
          ---------------------------------------- */}

          <div className="flex items-center gap-5">

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-6 py-3 bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold text-sm rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.05]"
            >
              Get Consultation
            </Link>

            {/* MOBILE TOGGLE */}
            <button
              className={`lg:hidden p-2 transition ${
                scrolled ? "text-[#1E3A5F]" : "text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ----------------------------------------
         MOBILE MENU
      ---------------------------------------- */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-[85%] sm:w-[400px] h-full bg-white z-50 p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold text-[#1E3A5F]">
                  Menu
                </h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition ${
                      location.pathname === link.path
                        ? "text-[#2FA4C7]"
                        : "text-[#1E3A5F] hover:text-[#2FA4C7]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-[#4CAF50] hover:bg-[#43A047] text-white py-3.5 rounded-xl text-lg font-medium text-center shadow-md mt-10"
                >
                  Get Consultation
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}