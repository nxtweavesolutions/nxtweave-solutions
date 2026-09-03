// src/components/LaunchQuiz.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, RefreshCw, CheckCircle2, Shield } from "lucide-react";

export default function LaunchQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    businessType: "",
    hasPartners: "",
    fundingSource: "",
    growthPriority: "",
  });

  const steps = {
    1: {
      question: "What is your primary business model?",
      field: "businessType",
      options: [
        { value: "saas", label: "Software / Tech SaaS", desc: "Digital systems, web portals, app scaling." },
        { value: "ecom", label: "Retail / E-Commerce", desc: "Selling physical goods online or stores." },
        { value: "services", label: "Consulting / Professional Services", desc: "Agency model, advisory, client operations." },
        { value: "manufacturing", label: "Manufacturing & Physical Goods", desc: "Factory operations, supply chain processing." },
      ],
    },
    2: {
      question: "Are you starting with partners or as a single founder?",
      field: "hasPartners",
      options: [
        { value: "yes", label: "Co-founders / Multiple Partners", desc: "LLP or Private Limited suited model." },
        { value: "no", label: "Single Founder", desc: "One Person Company or Proprietorship setup." },
      ],
    },
    3: {
      question: "How do you intend to fund operations initially?",
      field: "fundingSource",
      options: [
        { value: "bootstrap", label: "Bootstrapped / Self-Funded", desc: "Low compliance cost is preferred." },
        { value: "investors", label: "Venture Capital / Equity Seed", desc: "Strict requirement for Private Limited." },
      ],
    },
    4: {
      question: "What is your main priority for the first 12 months?",
      field: "growthPriority",
      options: [
        { value: "compliance", label: "Legal Protection & IP Branding", desc: "Priority: Trademark, Copyright." },
        { value: "mvp", label: "Building MVP / Platform Tech", desc: "Priority: Dev, CRM, Admin Dashboards." },
        { value: "marketing", label: "Customer Acquisition & SEO", desc: "Priority: Digital Ads, Brand strategy." },
      ],
    },
  };

  const handleSelect = (val) => {
    const currentField = steps[step].field;
    setAnswers((prev) => ({ ...prev, [currentField]: val }));
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      setStep(5); // Show results
    }
  };

  const getRecommendation = () => {
    const { businessType, hasPartners, fundingSource, growthPriority } = answers;
    let recommendation = {
      entity: "Private Limited Company",
      reason: "Recommended for venture backed SaaS models wanting absolute liability protection and investment scaling.",
      steps: ["Register Private Limited Company", "Apply for GSTIN and MSME recognition", "Incorporate Startup India recognition scheme"],
      additional: ["Trademark brand logo", "Bespoke SaaS platform MVP architecture"],
    };

    if (hasPartners === "no" && fundingSource === "bootstrap") {
      recommendation.entity = "One Person Company (OPC) or LLP";
      recommendation.reason = "Ideal for single founders seeking lower compliance overhead with personal asset separation.";
      recommendation.steps = ["Incorporate OPC / Register LLP", "Obtain MSME / Udyam Certification", "Acquire Municipal GST registration"];
    } else if (businessType === "manufacturing") {
      recommendation.entity = "LLP or Private Limited";
      recommendation.reason = "Best suited to manage inventory liability, supply chains, and manufacturing certificates.";
      recommendation.steps = ["Register LLP or Private Limited", "Acquire ISO Quality and FSSAI/ZED certifications", "Setup custom CRM admin dashboard"];
    }

    if (growthPriority === "mvp") {
      recommendation.additional.push("Launch dynamic website & internal custom CRM dashboard");
    } else if (growthPriority === "marketing") {
      recommendation.additional.push("Activate SEO marketing and Performance Lead Ads");
    }

    return recommendation;
  };

  const resetQuiz = () => {
    setAnswers({
      businessType: "",
      hasPartners: "",
      fundingSource: "",
      growthPriority: "",
    });
    setStep(1);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="launch-quiz">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(6,182,212,0.04),transparent_50%)]" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="nw-badge mb-4">Quiz Wizard</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-3">
            Startup Launch Advisor
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium">
            Get personalized structure recommendations and task roadmaps in 4 quick questions.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-bg-slate-secondary rounded-[2rem] border border-gray-200 p-8 md:p-12 shadow-xl shadow-slate-100">
          <AnimatePresence mode="wait">
            {step <= 4 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8">
                  <div
                    className="bg-royal-blue h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-blue-50 text-royal-blue flex items-center justify-center font-bold text-sm">
                    {step}
                  </span>
                  <span className="text-xs font-bold text-text-slate-paragraph uppercase tracking-widest">
                    Step {step} of 4
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-text-slate-primary font-display mb-8">
                  {steps[step].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {steps[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="bg-white hover:bg-slate-50 border border-gray-200 hover:border-royal-blue rounded-xl p-5 text-left transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                    >
                      <h4 className="font-bold text-text-slate-primary group-hover:text-royal-blue transition-colors duration-150 mb-1">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed">
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Results Screen */}
                <div className="text-center mb-8 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-text-slate-primary font-display mb-2">
                    Your Startup Roadmap
                  </h3>
                  <p className="text-text-slate-paragraph font-medium">
                    Based on your preferences, here is your customized execution plan.
                  </p>
                </div>

                {/* Recommendation Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-widest mb-2">
                      Recommended Entity Structure
                    </h4>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                      <h5 className="text-xl font-bold text-royal-blue mb-2">
                        {getRecommendation().entity}
                      </h5>
                      <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed">
                        {getRecommendation().reason}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-text-slate-light uppercase tracking-widest mb-2">
                      Filing & Setup Milestones
                    </h4>
                    <ul className="space-y-2.5">
                      {getRecommendation().steps.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-text-slate-secondary font-medium">
                          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5 mb-8">
                  <h4 className="text-xs font-bold text-royal-blue uppercase tracking-widest mb-2">
                    Additional Tech & Growth Assets
                  </h4>
                  <ul className="space-y-2">
                    {getRecommendation().additional.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-text-slate-secondary font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={resetQuiz}
                    className="btn-secondary w-full sm:w-auto"
                  >
                    <RefreshCw size={16} /> Retake Quiz
                  </button>
                  <a
                    href="#contact"
                    className="btn-primary w-full sm:w-auto text-center"
                  >
                    Get Free Compliance Advisory <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
