// src/components/CTABanner.jsx
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 bg-slate-50/50" id="cta-banner">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Rounded Premium Card Container */}
        <div className="bg-gradient-to-br from-[#0B1F3A] via-[#122F55] to-[#0A2540] rounded-[3rem] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden border border-white/[0.08] text-center">
          
          {/* Inner glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-4 uppercase">
              Ready to Build Your Dream Business?
            </h2>
            <p className="text-base md:text-lg text-blue-100/80 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 500+ businesses that trust NxtWeave Solutions to manage compliance and digital growth.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-white hover:bg-slate-50 text-royal-blue font-bold rounded-full text-xs uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
              >
                <span>Get Free Consultation</span> 
                <ArrowRight size={15} />
              </a>
              <a
                href="tel:+919711565533"
                className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
              >
                <PhoneCall size={14} /> 
                <span>Call: +91 97115 65533</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-blue-100/50 font-bold uppercase tracking-wider">
              <span>✓ No payment required</span>
              <span>✓ Response within 1 hour</span>
              <span>✓ Expert advice</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
