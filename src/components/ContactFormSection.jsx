// src/components/ContactFormSection.jsx
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { validateContactForm } from "../utils/validation";
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

const EMAILJS = {
  service: "service_8mzileq",
  template: "template_d8xpqpo",
  key: "ikS9R1hqeGZXmqe-f",
};

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    emailjs.init(EMAILJS.key);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    // Form Validation (E.164 phone, DNS domains checks)
    const valResult = await validateContactForm(formData);
    if (!valResult.isValid) {
      setStatus("error");
      setErrorMsg(valResult.error);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
        EMAILJS.key
      );
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("[EmailJS] submit error:", err);
      setStatus("error");
      setErrorMsg("Failed to deliver your request. Please try again or contact us directly on WhatsApp.");
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(6,182,212,0.03),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Information */}
          <div className="lg:col-span-5 text-left">
            <span className="nw-badge mb-4">Contact Us</span>
            <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-6">
              Connect With Our Corporate Strategy Desk
            </h2>
            <p className="text-sm text-text-slate-paragraph font-medium leading-relaxed mb-8 max-w-sm">
              We respond to all requests within 1 business hour. Share your scaling priorities or legal compliance requirements directly.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-royal-blue flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-wider mb-0.5">Email Queries</h4>
                  <a href="mailto:info@nxtweavesolutions.com" className="text-sm font-bold text-text-slate-primary hover:text-royal-blue transition-colors">
                    info@nxtweavesolutions.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-royal-blue flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-wider mb-0.5">Call Hotline</h4>
                  <a href="tel:+919711565533" className="text-sm font-bold text-text-slate-primary hover:text-royal-blue transition-colors">
                    +91 97115 65533
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-royal-blue flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-wider mb-0.5">Corporate HQ</h4>
                  <p className="text-sm font-bold text-text-slate-primary leading-tight">
                    Noida, Uttar Pradesh, India - 201301
                  </p>
                </div>
              </div>
            </div>

            {/* Live map frame */}
            <div className="w-full h-[180px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
              <iframe
                title="Corporate HQ Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112111.4552467362!2d77.3063884!3d28.5355161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a431281575%3A0xedfffd72d54a7944!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-none grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-bg-slate-secondary rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-xl shadow-slate-100/50">
            <h3 className="text-xl font-bold text-text-slate-primary font-display mb-6">
              Submit Strategy Request
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-bold text-text-slate-secondary uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="nw-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone-input" className="block text-xs font-bold text-text-slate-secondary uppercase tracking-wider mb-2">Phone Number *</label>
                  <input
                    id="phone-input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99999 99999"
                    className="nw-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email-input" className="block text-xs font-bold text-text-slate-secondary uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="nw-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="service-select" className="block text-xs font-bold text-text-slate-secondary uppercase tracking-wider mb-2">Service Interest *</label>
                <select
                  id="service-select"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="nw-input"
                  required
                >
                  <option value="">Select Service Division</option>
                  <option value="Business Registration">Business Registration Services</option>
                  <option value="Certifications & Compliance">Certifications & Compliance Services</option>
                  <option value="Digital Solutions">Digital Solutions & Web Dev</option>
                  <option value="Digital Marketing & AI">Digital Marketing & AI Automations</option>
                  <option value="Other Consulting">Other Corporate Consulting</option>
                </select>
              </div>

              <div>
                <label htmlFor="message-textarea" className="block text-xs font-bold text-text-slate-secondary uppercase tracking-wider mb-2">Message Query *</label>
                <textarea
                  id="message-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business goals and operational needs..."
                  className="nw-input min-h-[120px] resize-none"
                  required
                />
              </div>

              {/* Status Alert Panels */}
              {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-xs text-brand-danger font-bold rounded-xl flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              {status === "success" && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle size={16} />
                  Strategy request delivered successfully! Our consultant will call you shortly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full text-center"
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </span>
                ) : (
                  "Send Message →"
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
