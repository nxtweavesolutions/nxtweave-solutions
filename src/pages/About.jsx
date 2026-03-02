import { motion } from "framer-motion";
import { Target, Trophy, ArrowRight } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen font-inter">

      {/* ── Page Hero ───────────────────────── */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-[#0D1F33] to-[#1E3A5F]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">
            About NxtWeave Solutions
          </h1>
          <p className="max-w-xl mx-auto text-base leading-relaxed text-[#93B5CC]">
            Your complete partner for business consulting and digital growth —
            trusted by 500+ businesses across India.
          </p>
          <div className="w-16 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#2FA4C7] to-[#4CAF50]" />
        </motion.div>
      </section>

      {/* ── Who We Are Section ───────────────────────── */}
      <section className="py-20 px-6 bg-[#F4F8FB]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl p-10 text-white bg-gradient-to-br from-[#1E3A5F] to-[#1a5a82]"
          >
            <div className="text-5xl mb-4">🏢</div>
            <h2 className="font-heading font-extrabold text-2xl mb-4">
              Who We Are
            </h2>
            <p className="leading-relaxed mb-4 text-[#93B5CC]">
              NxtWeave Solutions is a modern business consulting and digital
              solutions company dedicated to helping startups, MSMEs,
              entrepreneurs, NGOs, and enterprises establish, grow, and scale
              their businesses successfully.
            </p>
            <p className="leading-relaxed text-[#93B5CC]">
              We provide complete end-to-end support including business
              registration, certifications, compliance consulting, digital
              infrastructure development, and online business growth solutions.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-8 flex-wrap">
              {[
                ["500+", "Businesses Served"],
                ["99%", "Success Rate"],
                ["Pan India", "Coverage"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-heading font-black text-2xl text-[#2FA4C7]">
                    {n}
                  </div>
                  <div className="text-xs font-semibold text-[#93B5CC]">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Mission */}
            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm flex gap-4">
              <Target className="text-[#4CAF50] shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-[#1E3A5F] mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  To empower entrepreneurs and businesses by providing reliable,
                  transparent, and professional consulting and digital
                  solutions.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm flex gap-4">
              <Trophy className="text-[#2FA4C7] shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-[#1E3A5F] mb-2">
                  Our Vision
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  To become a globally trusted consulting and digital solutions
                  company helping businesses build strong foundations.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
              <h3 className="font-heading font-bold text-[#1E3A5F] mb-4">
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Integrity",
                  "Transparency",
                  "Excellence",
                  "Innovation",
                  "Client First",
                  "Reliability",
                ].map((v) => (
                  <div
                    key={v}
                    className="bg-[#F4F8FB] px-3 py-2 rounded-lg text-xs font-bold text-[#1E3A5F] border border-[#2FA4C7]/20"
                  >
                    ✓ {v}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-[#1E3A5F] mb-3">
            Why Choose NxtWeave?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base mb-10">
            We combine compliance expertise with digital innovation to give
            your business a complete advantage.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👨‍💼",
                title: "Expert Consulting Team",
                desc: "Qualified professionals with deep expertise.",
              },
              {
                icon: "🔄",
                title: "End-to-End Support",
                desc: "From registration to compliance management.",
              },
              {
                icon: "🔍",
                title: "Transparent Process",
                desc: "Clear timelines, no hidden charges.",
              },
              {
                icon: "💡",
                title: "Dual Expertise",
                desc: "Compliance + digital solutions.",
              },
              {
                icon: "📈",
                title: "Growth Focused",
                desc: "Long-term sustainable growth.",
              },
              {
                icon: "🇮🇳",
                title: "Pan India Service",
                desc: "Serving businesses across India.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-6 border border-blue-100 shadow-sm bg-[#F4F8FB]"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-heading font-bold text-[#1E3A5F] text-sm mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────── */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-[#0D1F33] to-[#1E3A5F]">
        <h2 className="font-heading font-black text-white text-3xl mb-4">
          Ready to Work With Us?
        </h2>
        <p className="mb-8 text-base text-[#93B5CC]">
          Free consultation · No commitment · Pan India service
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/contact"
            className="px-8 py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-[#4CAF50] to-[#37a847] hover:opacity-90 transition flex items-center gap-2"
          >
            Get Free Consultation <ArrowRight size={18} />
          </a>
          <a
            href="https://wa.me/919711565533"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-xl font-bold text-white text-sm bg-[#25D366] hover:opacity-90 transition"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;