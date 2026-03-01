import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed
import emailjs from "@emailjs/browser";

const ALL_SERVICES = {
  registration: {
    label: "📋 Business Registration",
    color: "#1E3A5F",
    items: [
      { icon: "🏢", title: "Private Limited Company Registration", desc: "Most preferred structure for startups and growing businesses." },
      { icon: "🤝", title: "LLP Registration", desc: "Limited Liability Partnership combining flexibility and protection." },
      { icon: "👥", title: "Partnership Firm Registration", desc: "Ideal for businesses run by 2 or more individuals." },
      { icon: "🌱", title: "Section 8 Company", desc: "Non-profit entity for charitable objectives." },
      { icon: "📜", title: "12A & 80G Registration", desc: "Tax exemption benefits for NGOs." },
      { icon: "💎", title: "GeM Registration", desc: "Sell products/services to government buyers." },
    ]
  },
  certifications: {
    label: "🏅 Certifications",
    color: "#2FA4C7",
    items: [
      { icon: "🧾", title: "GST Registration", desc: "Mandatory tax registration for businesses." },
      { icon: "🏭", title: "MSME / Udyam", desc: "Unlock subsidies & government schemes." },
      { icon: "🏅", title: "ISO Certification", desc: "International quality recognition." },
      { icon: "™️", title: "Trademark", desc: "Protect your brand identity legally." },
      { icon: "🍽️", title: "FSSAI License", desc: "Food business compliance license." },
      { icon: "🌐", title: "IEC Certificate", desc: "Import Export Code for global trade." },
    ]
  },
  digital: {
    label: "💻 Digital Solutions",
    color: "#4CAF50",
    items: [
      { icon: "💻", title: "Website Development", desc: "Modern, responsive, SEO optimized websites." },
      { icon: "⚙️", title: "Web App Development", desc: "Custom web applications for businesses." },
      { icon: "📊", title: "Business Dashboard", desc: "Real-time analytics and performance tracking." },
      { icon: "☁️", title: "SaaS Development", desc: "Scalable cloud-based platforms." },
      { icon: "🎨", title: "UI/UX Design", desc: "User-focused conversion-driven design." },
      { icon: "🌐", title: "Hosting & Domains", desc: "Complete hosting & SSL setup." },
    ]
  },
  marketing: {
    label: "📱 Digital Marketing",
    color: "#E67E22",
    items: [
      { icon: "📱", title: "Social Media Marketing", desc: "Grow your brand online." },
      { icon: "✍️", title: "Content Marketing", desc: "SEO-optimized content strategies." },
      { icon: "🎬", title: "Video Editing", desc: "Professional video production." },
      { icon: "📈", title: "Marketing Strategy", desc: "Complete growth roadmap." },
    ]
  }
};

// ─── Consultation Modal ───────────────────────────────────────────────────────
function Modal({ service, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS
      await emailjs.send(
        "service_8mzileq",
        "template_d8xpqpo",
        {
          name: form.name || "Not Provided",
          phone: form.phone || "Not Provided",
          email: form.email || "Not Provided",
          service: service?.title || "General Inquiry",
          message: form.message || "No message",
        },
        "ikS9R1hqeGZXmqe-f"
      );

      // Firebase
      await addDoc(collection(db, "queries"), {
        ...form,
        source: "services_page",
        service: service?.title || "General Inquiry",
        createdAt: new Date().toISOString(),
      });

      setSent(true);
    } catch (err) {
      console.error("Request failed:", err);
      alert("Failed to send request. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(13,31,51,0.75)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 w-full max-w-lg relative shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-gray-500 hover:text-gray-800 text-3xl transition"
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="text-6xl mb-4 text-center">{service.icon}</div>
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-3 text-center">
            {service.title}
          </h2>
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            {service.desc}
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-center">
            <h4 className="font-bold text-amber-800 mb-2 text-sm uppercase tracking-wide">
              Important Disclaimer
            </h4>
            <p className="text-amber-700 text-sm">
              We provide expert guidance and documentation support only. We do not guarantee approvals or funding.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-10 px-6">
              <div className="text-5xl mb-4 text-green-500">✅</div>
              <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">
                Request for {service?.title || "Consultation"} Sent!
              </h3>
              <p className="text-gray-700 text-lg">
                Our team will contact you within 24 hours with full details and next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h4 className="font-heading text-[#1E3A5F] font-bold text-lg text-center">
                Request Free Consultation
              </h4>

              <input
                required
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full p-4 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7] focus:border-transparent transition"
              />

              <input
                required
                type="tel"
                pattern="[0-9+\\-\\s]{7,15}"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="w-full p-4 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7] focus:border-transparent transition"
              />

              <input
                required
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full p-4 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FA4C7] focus:border-transparent transition"
              />

              <textarea
                placeholder="Your Query / Message (Please describe your requirements in detail)"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={5}
                className="w-full p-4 rounded-xl border border-gray-300 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#2FA4C7] focus:border-transparent transition"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-heading font-bold text-white text-lg transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-lg"
                }`}
                style={{ background: "linear-gradient(135deg, #1E3A5F, #2FA4C7)" }}
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Services() {
  const [activeTab, setActiveTab] = useState("registration");
  const [selected, setSelected] = useState(null);
  const current = ALL_SERVICES[activeTab];

  return (
    <div className="min-h-screen font-inter bg-gray-50">
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-[#0D1F33] via-[#1E3A5F] to-[#2FA4C7]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-[#E0F2FF] text-lg md:text-xl"
        >
          Complete business support — from registration and compliance to digital growth & marketing.
        </motion.p>
      </section>

      {/* Tabs */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            {Object.entries(ALL_SERVICES).map(([key, val]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(key)}
                className="px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-sm"
                style={{
                  background: activeTab === key ? val.color : "#f8fafc",
                  color: activeTab === key ? "#fff" : "#334155",
                  border: activeTab === key ? "none" : "1px solid #e2e8f0",
                }}
              >
                {val.label}
              </motion.button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {current.items.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
                  onClick={() => setSelected(s)}
                  className="bg-white rounded-2xl p-6 md:p-8 cursor-pointer border border-gray-100 shadow-sm transition-all duration-300"
                  style={{ borderLeft: `5px solid ${current.color}` }}
                >
                  <div className="text-5xl md:text-6xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-[#1E3A5F] text-lg md:text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-5 leading-relaxed">{s.desc}</p>
                  <div
                    className="flex items-center gap-2 text-sm md:text-base font-semibold"
                    style={{ color: current.color }}
                  >
                    Get Consultation <ChevronRight size={20} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Govt Notice */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-[#1E3A5F] to-[#2FA4C7]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-6">🏛️</div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-5">
            Government Scheme Guidance
          </h2>
          <p className="text-[#E0F2FF] max-w-3xl mx-auto mb-8 text-lg md:text-xl leading-relaxed">
            Our experts help identify eligible schemes, prepare documentation, and ensure compliance.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-10 max-w-2xl mx-auto">
            <p className="text-amber-300 font-bold text-lg mb-3">⚠️ Important</p>
            <p className="text-white text-base">
              We provide consulting and documentation assistance only. We do NOT provide funding or guarantee approvals.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-block px-10 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition hover:scale-105 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #4CAF50, #37a847)" }}
          >
            Get Guidance →
          </a>
        </motion.div>
      </section>

      {/* Modal */}
      <Modal service={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default Services;