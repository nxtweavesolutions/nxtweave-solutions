// src/components/Footer.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  // Improved smooth scroll with retry logic & tab switching support
  const scrollToSection = (sectionId, tab = null) => {
    const tryScroll = (attempt = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // If tab is provided, switch tab after scroll
        if (tab) {
          setTimeout(() => {
            const tabButton = document.querySelector(`button[data-tab="${tab}"]`);
            if (tabButton) tabButton.click();
          }, 600); // small delay to ensure scroll completes first
        }
      } else if (attempt < 8) { // increased attempts for slower networks
        setTimeout(() => tryScroll(attempt + 1), 400);
      }
    };

    if (window.location.pathname === "/" || window.location.pathname === "") {
      // Already on home page → direct scroll
      tryScroll();
    } else {
      // Not on home → navigate first, then scroll
      navigate("/");
      // Give time for home page to mount + IDs to be available
      setTimeout(tryScroll, 1200); // increased delay for safety
    }
  };

  // Handle Services tab navigation (direct to Services page with tab)
  const goToServicesTab = (tab) => {
    navigate(`/services?tab=${tab}`);
  };

  return (
    <footer className="bg-[#1E3A5F] text-gray-300 pt-20 pb-10 px-6 mt-20 border-t border-[#2FA4C7]/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 – Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/logo.png"
              alt="NxtWeave Logo"
              className="h-10 w-auto"
            />
            <span className="text-white text-xl font-bold">
              Nxt<span className="text-[#2FA4C7]">Weave</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-6">
            Empowering businesses with seamless registration, compliance,
            and digital growth solutions. Your trusted partner in success.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2FA4C7] transition"
              >
                <Icon size={18} className="text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 – Quick Links (Smooth Scroll) */}
        <div>
          <h4 className="text-[#2FA4C7] font-semibold mb-6 text-lg">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                Home
              </button>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("services-section")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("process-section")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                How It Works
              </button>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 – Services (Direct to Services page with tab) */}
        <div>
          <h4 className="text-[#2FA4C7] font-semibold mb-6 text-lg">
            Our Services
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <button
                onClick={() => goToServicesTab("registration")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                Business Registration
              </button>
            </li>
            <li>
              <button
                onClick={() => goToServicesTab("certifications")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                Certifications
              </button>
            </li>
            <li>
              <button
                onClick={() => goToServicesTab("digital")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                Digital Solutions
              </button>
            </li>
            <li>
              <button
                onClick={() => goToServicesTab("marketing")}
                className="hover:text-white transition cursor-pointer bg-transparent border-none p-0 text-left w-full text-left"
              >
                Digital Marketing
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4 – Contact */}
        <div>
          <h4 className="text-[#2FA4C7] font-semibold mb-6 text-lg">
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <MapPin size={18} className="text-[#2FA4C7] mt-1 shrink-0" />
              <span>
                Noida, Gautam Buddha Nagar <br />
                Uttar Pradesh, 201301
              </span>
            </li>

            <li className="flex gap-3 items-center">
              <Phone size={18} className="text-[#2FA4C7] shrink-0" />
              <span>+91 97115 65533</span>
            </li>

            <li className="flex gap-3 items-center">
              <Mail size={18} className="text-[#2FA4C7] shrink-0" />
              <span>nxtweavesolutions@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} NxtWeave Solutions. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
          <Link to="/disclaimer" className="hover:text-white transition">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}