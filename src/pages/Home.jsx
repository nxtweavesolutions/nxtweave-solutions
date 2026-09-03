// src/pages/Home.jsx
import HeroSection from "../components/HeroSection";
import TrustedBy from "../components/TrustedBy";
import StatsCounter from "../components/StatsCounter";
import ServicesSection from "../components/ServicesSection";
import DocumentChecklist from "../components/DocumentChecklist";
import WhyChooseUs from "../components/WhyChooseUs";
import BundleBuilder from "../components/BundleBuilder";
import ProcessSection from "../components/ProcessSection";
import LaunchQuiz from "../components/LaunchQuiz";
import ComplianceCalendar from "../components/ComplianceCalendar";
import PortfolioShowcase from "../components/PortfolioShowcase";
import FAQSection from "../components/FAQSection";
import ContactFormSection from "../components/ContactFormSection";
import CTABanner from "../components/CTABanner";

import { useDocumentSEO } from "../hooks/useDocumentSEO";

export default function Home() {
  useDocumentSEO(
    "Business Registration, MCA Compliance & Digital SaaS Products",
    "NxtWeave is the ultimate growth platform for Indian startups. We manage Pvt Ltd/LLP incorporation, trademark filing, GST & tax compliance, custom web apps, and performance marketing under one unified service launcher.",
    "business registration India, private limited company registration online, LLP incorporation, trademark registration search, ISO 9001 quality audit, GST filing online, MSME Udyam registration, NGO Section 8 company, Nextjs SaaS web development company India, digital performance marketing agency, MCA compliance checklist"
  );

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      <HeroSection />
      <TrustedBy />
      <ServicesSection />
      <DocumentChecklist />
      <StatsCounter />
      <WhyChooseUs />
      <BundleBuilder />
      <ProcessSection />
      <LaunchQuiz />
      <ComplianceCalendar />
      <PortfolioShowcase />
      <FAQSection />
      <ContactFormSection />
      <CTABanner />
    </div>
  );
}
