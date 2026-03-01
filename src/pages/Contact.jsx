// src/pages/Contact.jsx
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Initialize EmailJS once (same public key as hero page)
  useEffect(() => {
    emailjs.init("ikS9R1hqeGZXmqe-f");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare data for EmailJS
      const templateParams = {
        name: formData.name || "Not Provided",
        phone: formData.phone || "Not Provided",
        email: formData.email || "Not Provided",
        service: formData.service || "General Inquiry",
        message: formData.message || "No message",
      };

      // 2. Send email via EmailJS (same template as hero)
      await emailjs.send(
        "service_8mzileq",
        "template_d8xpqpo",
        templateParams,
        "ikS9R1hqeGZXmqe-f"
      );

      // 3. Save to Firebase (same collection as hero)
      await addDoc(collection(db, "queries"), {
        ...formData,
        source: "contact", // To identify it's from contact page
        createdAt: new Date().toISOString(),
      });

      // Success
      setSent(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      console.log("STATUS:", err?.status);
      console.log("TEXT:", err?.text);
      alert("Something went wrong. Please try again ❌");
    }

    setLoading(false);
  };

  const contactInfo = [
    { icon: "📞", label: "Phone", value: "+91 97115 65533", href: "tel:+9197115 65533" },
    { icon: "📧", label: "Email", value: "nxtweavesolutions@gmail.com", href: "mailto:nxtweavesolutions@gmail.com" },
    { icon: "📍", label: "Office", value: "Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301", href: null },
    { icon: "⏰", label: "Hours", value: "Mon–Sat: 9:00 AM – 7:00 PM IST", href: null },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Page Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #0D1F33, #1E3A5F)" }}
      >
        <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">
          Get In Touch
        </h1>
        <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#93B5CC" }}>
          Ready to grow your business? Let's talk. Free consultation, no obligation.
        </p>
      </section>

      {/* Main Section */}
      <section
        className="py-20 px-6"
        style={{ background: "linear-gradient(135deg, #0D1F33, #1E3A5F)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left Contact Info */}
          <div>
            <h2 className="font-heading font-extrabold text-white text-2xl mb-8">
              Contact Information
            </h2>

            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(47,164,199,0.15)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-sm mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm hover:underline" style={{ color: "#93B5CC" }}>
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm" style={{ color: "#93B5CC" }}>
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-white text-sm mt-2 hover:opacity-90 transition"
              style={{ background: "#25D366" }}
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Right Form */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {sent ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="font-heading font-bold text-white text-xl mb-2">
                  Message Received!
                </h3>
                <p style={{ color: "#93B5CC" }}>
                  We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-extrabold text-white text-xl mb-2">
                  Send Us a Message
                </h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9+\-\s]{7,15}"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  style={{
                    background: "rgba(13,31,51,0.9)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                >
                  <option value="">Select Service Needed</option>
                  <option>Business Registration</option>
                  <option>GST / Tax Compliance</option>
                  <option>Certifications</option>
                  <option>Website Development</option>
                  <option>Digital Marketing</option>
                  <option>Government Scheme Guidance</option>
                  <option>Other</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Your message or requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-heading font-bold text-white text-sm hover:opacity-90 transition disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #4CAF50, #37a847)" }}
                >
                  {loading ? "Sending..." : "Send Message 🚀"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;