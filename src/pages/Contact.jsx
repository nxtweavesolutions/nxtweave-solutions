// src/pages/Contact.jsx  —  NxtWeave Solutions (complete final)
import { useState, useEffect, useRef } from "react";
import { collection, addDoc }          from "firebase/firestore";
import { db }                          from "../firebase";
import emailjs                         from "@emailjs/browser";

// ─── Config ───────────────────────────────────────────────────────────────────
const EMAILJS = {
  service:  "service_8mzileq",
  template: "template_d8xpqpo",
  key:      "ikS9R1hqeGZXmqe-f",
};

const SOCIAL = {
  whatsapp:  "https://wa.me/919999999999",
  instagram: "https://www.instagram.com/nxtweavesolutions/",
  linkedin:  "https://www.linkedin.com/company/nxtweavesolutions/",
};

const SERVICES = [
  "Business Registration",
  "LLP / Partnership Registration",
  "GST / Tax Compliance",
  "MSME / Udyam Registration",
  "ISO Certification",
  "Trademark Registration",
  "FSSAI License",
  "Startup India Registration",
  "NGO / Section 8 Registration",
  "12A / 80G / CSR-1 Registration",
  "Website Development",
  "Web Application Development",
  "Digital Marketing",
  "Government Scheme Guidance",
  "Other",
];

// ─── Scroll animation hook ────────────────────────────────────────────────────
function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                   transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Contact info items ───────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: "📞",
    label: "Phone",
    value: "+91 97115 65533",
    href: "tel:+919999999999",
    sub: "Mon–Sat, 9 AM – 7 PM IST",
  },
  {
    icon: "📧",
    label: "Email",
    value: "info@nxtweavesolutions.com",
    href: "mailto:info@nxtweavesolutions.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: "📍",
    label: "Office",
    value: "Noida, Gautam Buddha Nagar",
    sub: "Uttar Pradesh — 201301",
    href: "https://maps.google.com/?q=Noida,Uttar+Pradesh",
  },
  {
    icon: "⏰",
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    sub: "Sunday: Closed",
    href: null,
  },
];

// ─── Why contact us ───────────────────────────────────────────────────────────
const WHY_CONTACT = [
  { icon: "🎯", text: "Free initial consultation — no charges" },
  { icon: "⚡", text: "Response within 24 hours guaranteed" },
  { icon: "🌍", text: "Serving clients Pan India and globally" },
  { icon: "🔒", text: "Your data is 100% safe and confidential" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");

  useEffect(() => {
    emailjs.init(EMAILJS.key);
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, {
        name:    form.name    || "Not provided",
        phone:   form.phone   || "Not provided",
        email:   form.email   || "Not provided",
        service: form.service || "General Inquiry",
        message: form.message || "No message",
      }, EMAILJS.key);

      await addDoc(collection(db, "contacts"), {
        ...form,
        source:    "contact-page",
        status:    "pending",
        createdAt: new Date(),
      });

      setSent(true);
      setForm({ name:"", phone:"", email:"", service:"", message:"" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg,#0D1F33 0%,#1E3A5F 60%,#1a4a73 100%)",
        padding: "120px 24px 80px",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        {/* Orbs */}
        <div style={{ position:"absolute", top:"-60px", right:"-60px",
          width:"360px", height:"360px", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(47,164,199,0.1),transparent 70%)",
          pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-40px", left:"-40px",
          width:"280px", height:"280px", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(76,175,80,0.07),transparent 70%)",
          pointerEvents:"none" }}/>

        <FadeUp>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"6px 18px", borderRadius:"50px",
            background:"rgba(47,164,199,0.12)",
            border:"1px solid rgba(47,164,199,0.28)",
            color:"#2FA4C7", fontSize:"0.68rem", fontWeight:700,
            letterSpacing:"2px", textTransform:"uppercase",
            marginBottom:"20px",
          }}>Contact Us</div>
          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontWeight:900,
            fontSize:"clamp(2rem,5vw,3.2rem)", color:"#fff",
            lineHeight:1.1, marginBottom:"16px",
          }}>
            Let's Build Something<br />
            <em style={{ color:"#2FA4C7", fontStyle:"italic" }}>
              Great Together
            </em>
          </h1>
          <p style={{
            color:"rgba(255,255,255,0.55)", fontSize:"0.95rem",
            lineHeight:1.8, maxWidth:"520px", margin:"0 auto 32px",
            fontWeight:300,
          }}>
            Free consultation, zero obligation. Talk to our experts and get
            a clear roadmap for your business — today.
          </p>

          {/* Stats row */}
          <div style={{
            display:"flex", gap:"24px", justifyContent:"center",
            flexWrap:"wrap",
          }}>
            {[
              ["24 hrs", "Response time"],
              ["Free", "Consultation"],
              ["Pan India", "& Global"],
            ].map(([v, l]) => (
              <div key={l} style={{
                background:"rgba(255,255,255,0.07)",
                border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:"14px", padding:"14px 22px",
                textAlign:"center",
              }}>
                <div style={{ fontFamily:"'Playfair Display',serif",
                  fontSize:"1.5rem", fontWeight:900, color:"#2FA4C7",
                  lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:"0.72rem",
                  color:"rgba(255,255,255,0.5)", marginTop:"3px",
                  fontWeight:300 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Main section ─────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#F4F8FB" }}>
        <div style={{
          maxWidth:"1100px", margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 1.4fr",
          gap:"48px", alignItems:"start",
        }}
          className="nw-contact-grid">
          <style>{`
            @media(max-width:900px){
              .nw-contact-grid { grid-template-columns:1fr !important; }
            }
          `}</style>

          {/* ── Left: Info panel ─────────────────────────────────────────── */}
          <div>
            <FadeUp>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                fontSize:"0.68rem", fontWeight:600, color:"#2FA4C7",
                letterSpacing:"2.5px", textTransform:"uppercase",
                marginBottom:"12px",
              }}>
                <span style={{ width:"22px", height:"1.5px",
                  background:"#2FA4C7", display:"inline-block" }}/>
                Get In Touch
              </div>
              <h2 style={{
                fontFamily:"'Playfair Display',serif", fontWeight:900,
                fontSize:"clamp(1.6rem,2.5vw,2.1rem)",
                color:"#1E3A5F", lineHeight:1.2, marginBottom:"20px",
              }}>
                We're Here to Help<br />
                <span style={{ color:"#2FA4C7" }}>Every Step of the Way</span>
              </h2>
              <p style={{
                color:"#556B7D", fontSize:"0.9rem", lineHeight:1.8,
                marginBottom:"32px", fontWeight:300,
              }}>
                Whether you need business registration, compliance guidance or
                digital solutions — our experts are ready to give you a clear,
                honest roadmap. No fluff, no hidden charges.
              </p>
            </FadeUp>

            {/* Contact info cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:"12px",
              marginBottom:"28px" }}>
              {CONTACT_INFO.map((item, i) => (
                <FadeUp key={item.label} delay={i * 60}>
                  <div style={{
                    background:"#fff", borderRadius:"14px", padding:"16px 18px",
                    border:"1px solid #e0e9f2",
                    display:"flex", alignItems:"flex-start", gap:"14px",
                    transition:"all 0.3s", boxShadow:"0 1px 6px rgba(0,0,0,0.04)",
                  }}
                    onMouseOver={e => {
                      e.currentTarget.style.borderColor="#2FA4C7";
                      e.currentTarget.style.boxShadow="0 4px 20px rgba(47,164,199,0.1)";
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.borderColor="#e0e9f2";
                      e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.04)";
                    }}>
                    <div style={{
                      width:"44px", height:"44px", borderRadius:"12px",
                      background:"rgba(47,164,199,0.1)",
                      display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:"20px", flexShrink:0,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize:"0.72rem", color:"#8FA3B4",
                        fontWeight:600, textTransform:"uppercase",
                        letterSpacing:"1px", marginBottom:"3px" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          style={{ fontSize:"0.88rem", color:"#1E3A5F",
                            fontWeight:600, textDecoration:"none",
                            transition:"color 0.2s" }}
                          onMouseOver={e => e.currentTarget.style.color="#2FA4C7"}
                          onMouseOut={e  => e.currentTarget.style.color="#1E3A5F"}>
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ fontSize:"0.88rem", color:"#1E3A5F",
                          fontWeight:600 }}>{item.value}</div>
                      )}
                      <div style={{ fontSize:"0.78rem", color:"#8FA3B4",
                        marginTop:"2px", fontWeight:300 }}>{item.sub}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Why contact us */}
            <FadeUp delay={200}>
              <div style={{
                background:"linear-gradient(135deg,#1E3A5F,#1a4a73)",
                borderRadius:"18px", padding:"22px 24px",
                marginBottom:"24px",
              }}>
                <h4 style={{ fontFamily:"'Playfair Display',serif",
                  color:"#fff", fontWeight:700, fontSize:"0.95rem",
                  marginBottom:"14px" }}>Why Choose NxtWeave?</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {WHY_CONTACT.map(item => (
                    <div key={item.text} style={{ display:"flex",
                      alignItems:"center", gap:"10px" }}>
                      <span style={{ fontSize:"16px" }}>{item.icon}</span>
                      <span style={{ color:"rgba(255,255,255,0.75)",
                        fontSize:"0.82rem", fontWeight:300 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Social links */}
            <FadeUp delay={240}>
              <div>
                <p style={{ fontSize:"0.78rem", color:"#8FA3B4",
                  fontWeight:600, marginBottom:"10px",
                  textTransform:"uppercase", letterSpacing:"1.5px" }}>
                  Connect with us
                </p>
                <div style={{ display:"flex", gap:"10px" }}>
                  {[
                    { label:"WhatsApp",  href:SOCIAL.whatsapp,
                      bg:"#25D366", icon:(
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      )},
                    { label:"Instagram", href:SOCIAL.instagram,
                      bg:"#E1306C", icon:(
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <circle cx="12" cy="12" r="4"/>
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                      )},
                    { label:"LinkedIn",  href:SOCIAL.linkedin,
                      bg:"#0A66C2", icon:(
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                      )},
                  ].map(s => (
                    <a key={s.label} href={s.href}
                      target="_blank" rel="noreferrer"
                      style={{
                        display:"inline-flex", alignItems:"center",
                        gap:"6px", padding:"9px 16px",
                        borderRadius:"10px", background:s.bg + "18",
                        border:"1px solid " + s.bg + "40",
                        color:s.bg, fontSize:"0.8rem", fontWeight:600,
                        textDecoration:"none", transition:"all 0.25s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background = s.bg + "30"}
                      onMouseOut={e  => e.currentTarget.style.background = s.bg + "18"}>
                      {s.icon}{s.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <FadeUp delay={100}>
            <div style={{
              background:"#fff", borderRadius:"24px", padding:"40px 36px",
              border:"1px solid #e0e9f2",
              boxShadow:"0 8px 40px rgba(30,58,95,0.1)",
              position:"sticky", top:"100px",
            }}>
              {sent ? (
                /* ── Success state ── */
                <div style={{ textAlign:"center", padding:"40px 0" }}>
                  <div style={{
                    width:"72px", height:"72px", borderRadius:"50%",
                    background:"linear-gradient(135deg,#4CAF50,#2E7D32)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"32px", margin:"0 auto 20px",
                    boxShadow:"0 8px 32px rgba(76,175,80,0.35)",
                  }}>✓</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif",
                    color:"#1E3A5F", fontWeight:900, fontSize:"1.4rem",
                    marginBottom:"10px" }}>Message Received!</h3>
                  <p style={{ color:"#556B7D", fontSize:"0.88rem",
                    lineHeight:1.7, marginBottom:"24px", fontWeight:300 }}>
                    Our team will get in touch with you within 24 hours.
                    We look forward to working with you.
                  </p>
                  <div style={{ display:"flex", gap:"10px",
                    justifyContent:"center", flexWrap:"wrap" }}>
                    <button onClick={() => setSent(false)}
                      style={{
                        padding:"11px 24px", borderRadius:"50px",
                        background:"#1E3A5F", color:"#fff",
                        border:"none", fontWeight:600, fontSize:"0.87rem",
                        cursor:"pointer", fontFamily:"inherit",
                        transition:"all 0.3s",
                      }}
                      onMouseOver={e => e.currentTarget.style.background="#2FA4C7"}
                      onMouseOut={e  => e.currentTarget.style.background="#1E3A5F"}>
                      Send Another Message
                    </button>
                    <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"
                      style={{
                        padding:"11px 24px", borderRadius:"50px",
                        background:"#25D366", color:"#fff",
                        fontWeight:600, fontSize:"0.87rem",
                        textDecoration:"none",
                        display:"inline-flex", alignItems:"center", gap:"6px",
                      }}>
                      💬 WhatsApp Us
                    </a>
                  </div>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <div style={{ marginBottom:"24px" }}>
                    <div style={{
                      display:"inline-flex", alignItems:"center", gap:"8px",
                      fontSize:"0.68rem", fontWeight:600, color:"#2FA4C7",
                      letterSpacing:"2.5px", textTransform:"uppercase",
                      marginBottom:"8px",
                    }}>
                      <span style={{ width:"18px", height:"1.5px",
                        background:"#2FA4C7", display:"inline-block" }}/>
                      Free Consultation
                    </div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif",
                      color:"#1E3A5F", fontWeight:900, fontSize:"1.3rem",
                      marginBottom:"6px" }}>Send Us a Message</h3>
                    <p style={{ color:"#8FA3B4", fontSize:"0.82rem",
                      fontWeight:300 }}>
                      Fill the form and our expert will call you back.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div style={{
                      background:"#FEF2F2", border:"1px solid #FECACA",
                      borderRadius:"10px", padding:"12px 14px",
                      marginBottom:"18px",
                      display:"flex", alignItems:"flex-start", gap:"8px",
                    }}>
                      <span style={{ fontSize:"14px", flexShrink:0 }}>⚠️</span>
                      <p style={{ color:"#DC2626", fontSize:"0.82rem",
                        lineHeight:1.5, fontWeight:500 }}>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}
                    style={{ display:"flex", flexDirection:"column", gap:"14px" }}
                    className="nw-li">

                    {/* Name + Phone row */}
                    <div style={{ display:"grid",
                      gridTemplateColumns:"1fr 1fr", gap:"12px" }}
                      className="nw-form-row">
                      <style>{`
                        @media(max-width:480px){
                          .nw-form-row { grid-template-columns:1fr !important; }
                        }
                      `}</style>
                      {[
                        { name:"name",  ph:"Full Name *",     type:"text" },
                        { name:"phone", ph:"Phone Number *",  type:"tel",
                          pattern:"[0-9+\\-\\s]{7,15}" },
                      ].map(f => (
                        <input key={f.name}
                          type={f.type} name={f.name}
                          placeholder={f.ph}
                          value={form[f.name]}
                          pattern={f.pattern}
                          onChange={handleChange} required
                          style={{
                            width:"100%", padding:"12px 14px",
                            borderRadius:"12px",
                            border:"1.5px solid #e0e9f2",
                            fontSize:"0.88rem", fontFamily:"inherit",
                            outline:"none", color:"#1E3A5F",
                            background:"#fff", boxSizing:"border-box",
                            transition:"border-color 0.2s",
                          }}
                          onFocus={e => e.target.style.borderColor="#2FA4C7"}
                          onBlur={e  => e.target.style.borderColor="#e0e9f2"}
                        />
                      ))}
                    </div>

                    {/* Email */}
                    <input type="email" name="email"
                      placeholder="Email Address *"
                      value={form.email} onChange={handleChange} required
                      style={{
                        width:"100%", padding:"12px 14px",
                        borderRadius:"12px", border:"1.5px solid #e0e9f2",
                        fontSize:"0.88rem", fontFamily:"inherit",
                        outline:"none", color:"#1E3A5F",
                        background:"#fff", boxSizing:"border-box",
                        transition:"border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor="#2FA4C7"}
                      onBlur={e  => e.target.style.borderColor="#e0e9f2"}
                    />

                    {/* Service */}
                    <select name="service" value={form.service}
                      onChange={handleChange} required
                      style={{
                        width:"100%", padding:"12px 14px",
                        borderRadius:"12px", border:"1.5px solid #e0e9f2",
                        fontSize:"0.88rem", fontFamily:"inherit",
                        outline:"none", color: form.service ? "#1E3A5F":"#8FA3B4",
                        background:"#fff", boxSizing:"border-box",
                        cursor:"pointer", transition:"border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor="#2FA4C7"}
                      onBlur={e  => e.target.style.borderColor="#e0e9f2"}>
                      <option value="">Select Service *</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {/* Message */}
                    <textarea name="message"
                      placeholder="Tell us about your requirements in detail…"
                      value={form.message} onChange={handleChange}
                      rows={4}
                      style={{
                        width:"100%", padding:"12px 14px",
                        borderRadius:"12px", border:"1.5px solid #e0e9f2",
                        fontSize:"0.88rem", fontFamily:"inherit",
                        outline:"none", color:"#1E3A5F",
                        background:"#fff", resize:"vertical",
                        boxSizing:"border-box", transition:"border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor="#2FA4C7"}
                      onBlur={e  => e.target.style.borderColor="#e0e9f2"}
                    />

                    {/* Submit */}
                    <button type="submit" disabled={loading}
                      style={{
                        width:"100%", padding:"14px", borderRadius:"12px",
                        border:"none",
                        background: loading ? "#93B5CC"
                          : "linear-gradient(135deg,#4CAF50,#2E7D32)",
                        color:"#fff", fontWeight:700, fontSize:"0.95rem",
                        fontFamily:"inherit",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition:"all 0.3s",
                        display:"flex", alignItems:"center",
                        justifyContent:"center", gap:"8px",
                        boxShadow: loading ? "none"
                          : "0 4px 16px rgba(76,175,80,0.3)",
                      }}
                      onMouseOver={e => {
                        if (!loading) e.currentTarget.style.transform="translateY(-1px)";
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform="none";
                      }}>
                      {loading ? (
                        <>
                          <div style={{
                            width:"18px", height:"18px", borderRadius:"50%",
                            border:"2px solid rgba(255,255,255,0.3)",
                            borderTopColor:"#fff",
                            animation:"nwSpin 0.8s linear infinite", flexShrink:0,
                          }}/>
                          Sending…
                        </>
                      ) : "Send Message 🚀"}
                    </button>

                    <style>{`
                      @keyframes nwSpin {
                        from{transform:rotate(0deg);}
                        to{transform:rotate(360deg);}
                      }
                      .nw-li input::placeholder,
                      .nw-li textarea::placeholder { color:#8FA3B4 !important; }
                    `}</style>

                    <p style={{ color:"#8FA3B4", fontSize:"0.72rem",
                      textAlign:"center", fontWeight:300 }}>
                      By submitting, you agree to our Terms and Privacy Policy.<br/>
                      Your information is 100% confidential.
                    </p>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Map Section ──────────────────────────────────────────────────── */}
      <section style={{ background:"#fff", padding:"0" }}>
        <FadeUp>
          <div style={{ position:"relative" }}>
            <iframe
              title="NxtWeave Solutions Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112090.46040083263!2d77.22376474999999!3d28.5706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border:"none", display:"block",
                filter:"grayscale(0.2) contrast(1.05)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay card */}
            <div style={{
              position:"absolute", bottom:"24px", left:"24px",
              background:"rgba(255,255,255,0.96)",
              backdropFilter:"blur(12px)",
              borderRadius:"16px", padding:"16px 20px",
              boxShadow:"0 8px 32px rgba(13,31,51,0.15)",
              border:"1px solid #e0e9f2",
              maxWidth:"260px",
            }}>
              <div style={{ display:"flex", alignItems:"center",
                gap:"10px", marginBottom:"6px" }}>
                <div style={{
                  width:"34px", height:"34px", borderRadius:"10px",
                  background:"linear-gradient(135deg,#C8A96E,#E8C87E)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"11px", fontWeight:900, color:"#0D1F33",
                  fontFamily:"'Montserrat',sans-serif", flexShrink:0,
                }}>NW</div>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif",
                    fontWeight:700, fontSize:"0.92rem", color:"#1E3A5F" }}>
                    NxtWeave Solutions
                  </div>
                  <div style={{ fontSize:"0.72rem", color:"#8FA3B4" }}>
                    Noida, UP — 201301
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Noida,Uttar+Pradesh"
                target="_blank" rel="noreferrer"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"5px",
                  fontSize:"0.75rem", color:"#2FA4C7", fontWeight:600,
                  textDecoration:"none",
                }}>
                Get Directions →
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding:"64px 24px",
        background:"linear-gradient(135deg,#0D1F33,#1E3A5F)",
        textAlign:"center",
      }}>
        <FadeUp>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.72rem",
            fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase",
            marginBottom:"12px" }}>Prefer a faster route?</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:"#fff",
            fontWeight:900, fontSize:"clamp(1.5rem,3vw,2rem)",
            marginBottom:"12px" }}>
            Chat with us on WhatsApp — Right Now
          </h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.88rem",
            marginBottom:"28px", fontWeight:300 }}>
            Get an instant reply from our team.
          </p>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer"
            style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"14px 32px", borderRadius:"50px",
              background:"#25D366", color:"#fff",
              fontWeight:700, fontSize:"0.95rem",
              textDecoration:"none",
              boxShadow:"0 4px 20px rgba(37,211,102,0.35)",
              transition:"all 0.3s",
            }}
            onMouseOver={e => e.currentTarget.style.transform="translateY(-2px)"}
            onMouseOut={e  => e.currentTarget.style.transform="none"}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </FadeUp>
      </section>
    </div>
  );
}