import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CheckCircle2, MapPin, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden text-white">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&w=1600&q=80"
          alt="Business Consulting"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F33] via-[#1E3A5F]/90 to-[#1E3A5F]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-14 items-center relative z-10 pt-24">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <span className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 text-sm text-[#2FA4C7] border border-[#2FA4C7]/30 backdrop-blur-md">
            🇮🇳 PAN INDIA SERVICE · TRUSTED BY 500+ BUSINESSES
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 max-w-3xl">
            Complete Business Consulting and{" "}
            <span className="text-[#2FA4C7]">Digital Solutions</span> Platform
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-10 max-w-2xl">
            Business registration, compliance, certifications, and digital growth
            solutions for startups and enterprises. We help you build, grow,
            and scale with confidence.
          </p>

          {/* Stats */}
          <div className="flex gap-6 flex-wrap mb-12">
            <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-lg border border-white/20">
              <Users className="text-[#4CAF50]" />
              <div>
                <h3 className="text-2xl font-bold text-[#2FA4C7]">500+</h3>
                <p className="text-sm text-gray-400">Businesses Served</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-lg border border-white/20">
              <CheckCircle2 className="text-[#4CAF50]" />
              <div>
                <h3 className="text-2xl font-bold text-[#2FA4C7]">99%</h3>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-lg border border-white/20">
              <MapPin className="text-[#4CAF50]" />
              <div>
                <h3 className="text-2xl font-bold text-[#2FA4C7]">Pan India</h3>
                <p className="text-sm text-gray-400">Service Reach</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-[#4CAF50] to-[#37a847] rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              Get Free Consultation
            </a>

            <a
              href="/services"
              className="px-8 py-4 border border-white/30 rounded-xl font-bold hover:bg-white/10 transition"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">
            Get Free Consultation
          </h3>

          <p className="text-gray-300 mb-6 text-sm">
            Fill the form below and our experts will contact you shortly.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                className="bg-white/80 border-0 focus-visible:ring-[#2FA4C7]"
              />
              <Input
                placeholder="Phone Number"
                className="bg-white/80 border-0 focus-visible:ring-[#2FA4C7]"
              />
            </div>

            <Input
              placeholder="Email Address"
              type="email"
              className="bg-white/80 border-0 focus-visible:ring-[#2FA4C7]"
            />

            <Select>
              <SelectTrigger className="bg-white/80 border-0 focus:ring-[#2FA4C7]">
                <SelectValue placeholder="Select Service Interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Business Registration</SelectItem>
                <SelectItem value="certifications">Certifications</SelectItem>
                <SelectItem value="digital">Digital Solutions</SelectItem>
                <SelectItem value="marketing">Digital Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              Book Consultation Now
            </Button>

            <p className="text-xs text-center text-gray-400 mt-4">
              By submitting, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  );
}