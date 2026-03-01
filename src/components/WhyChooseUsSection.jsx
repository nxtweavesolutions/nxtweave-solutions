import { motion } from "framer-motion";
import { Check, ShieldCheck, Clock, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Professional Team",
    description:
      "Experienced consultants and digital experts dedicated to your success.",
  },
  {
    icon: Check,
    title: "End-to-End Support",
    description:
      "From idea to execution, we handle everything for your business.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    description:
      "No hidden charges, clear timelines, and complete honesty.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "We value your time and ensure projects are completed on schedule.",
  },
  {
    icon: Zap,
    title: "Digital Expertise",
    description:
      "Cutting-edge technology solutions for modern business needs.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-[#1E3A5F]">
                Why Choose{" "}
                <span className="text-[#2FA4C7]">NxtWeave?</span>
              </h2>

              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                We are not just service providers — we are your long-term growth
                partners. Here’s why hundreds of businesses across India trust us.
              </p>
            </div>

            {/* FEATURES LIST */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2FA4C7]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2FA4C7] transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-[#2FA4C7] group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1E3A5F] text-lg mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative min-h-[450px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Team Collaboration"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F] via-[#1E3A5F]/40 to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <p className="font-bold text-2xl mb-2">
                  Long-term Growth Focus
                </p>
                <p className="text-sm opacity-90 leading-relaxed">
                  We focus on sustainable strategies and scalable systems that
                  ensure your business thrives not just today — but for years to come.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}