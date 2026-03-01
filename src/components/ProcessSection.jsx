// src/components/ProcessSection.jsx

import { motion } from "framer-motion";
import { MessageSquare, FileText, Settings, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description:
      "Connect with our experts to discuss your business needs and objectives clearly.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description:
      "We help you gather, verify and organize all required documents accurately.",
  },
  {
    icon: Settings,
    title: "Processing",
    description:
      "Our team handles the filing, application process and compliance efficiently.",
  },
  {
    icon: CheckCircle,
    title: "Completion",
    description:
      "Receive your approved registration, certification or digital solution smoothly.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#1E3A5F] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How We Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            A simple, transparent and efficient process designed to get your business up and running quickly.
          </motion.p>
        </div>

        {/* Timeline Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-[55%] left-0 w-full h-[2px] bg-[#2FA4C7]/30 -translate-y-1/2"></div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#162d4a] p-8 rounded-2xl border border-[#2FA4C7]/20 hover:border-[#2FA4C7] transition-all duration-300 group text-center"
              >
                {/* Icon Circle */}
                <div className="relative mx-auto w-20 h-20 rounded-full bg-[#2FA4C7]/20 flex items-center justify-center mb-6 group-hover:bg-[#2FA4C7] transition-all duration-300">
                  <Icon className="w-9 h-9 text-[#2FA4C7] group-hover:text-white transition-colors" />

                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 bg-[#4CAF50] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}