// src/components/ComplianceCalendar.jsx
import { useState } from "react";
import { Calendar, Info, Clock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

export default function ComplianceCalendar() {
  const [activeMonth, setActiveMonth] = useState("may");

  const deadlines = {
    may: {
      monthName: "May 2026",
      events: [
        { day: 7, label: "TDS Payment Deposit", form: "Challan ITNS 281", type: "tax", desc: "Deposit of TDS/TCS collected during preceding month." },
        { day: 11, label: "GSTR-1 GST Return", form: "Form GSTR-1", type: "gst", desc: "GST outward supplies summary return for businesses with turnover > 1.5Cr." },
        { day: 15, label: "PF & ESIC Payment", form: "ECR portal upload", type: "compliance", desc: "Provident Fund and Employee State Insurance monthly contribution deposit." },
        { day: 20, label: "GSTR-3B Payment Filing", form: "Form GSTR-3B", type: "gst", desc: "GST summary return with tax payment clearance." },
      ],
    },
    june: {
      monthName: "June 2026",
      events: [
        { day: 15, label: "First Installment Advance Tax", form: "Challan ITNS 280", type: "tax", desc: "Payment of 15% of estimated total corporate tax liability." },
        { day: 20, label: "GSTR-3B GST Return", form: "Form GSTR-3B", type: "gst", desc: "Monthly summary return filing." },
        { day: 30, label: "ROC Form DPT-3 Filing", form: "Form DPT-3", type: "compliance", desc: "Annual return of deposits/transactions not considered deposit with ROC." },
      ],
    },
  };

  return (
    <section className="py-24 bg-bg-slate-secondary relative overflow-hidden" id="compliance-calendar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.03),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="nw-badge mb-4">Statutory Dates</span>
          <h2 className="text-4xl font-extrabold text-text-slate-primary tracking-tight font-display mb-4">
            Compliance Calendar 2026
          </h2>
          <p className="text-lg text-text-slate-paragraph font-medium">
            Keep track of corporate tax filing schedules and ROC milestones to avoid legal interest penalties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar Widget Grid */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] border border-gray-200 p-6 md:p-8 shadow-xl shadow-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold text-text-slate-primary font-display flex items-center gap-2">
                <Calendar className="text-royal-blue" size={20} />
                {deadlines[activeMonth].monthName}
              </h3>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveMonth("may")}
                  className={`p-2 rounded-lg border transition-all duration-200 ${
                    activeMonth === "may"
                      ? "bg-royal-blue text-white border-royal-blue"
                      : "bg-white text-text-slate-secondary border-gray-200 hover:bg-slate-50"
                  }`}
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveMonth("june")}
                  className={`p-2 rounded-lg border transition-all duration-200 ${
                    activeMonth === "june"
                      ? "bg-royal-blue text-white border-royal-blue"
                      : "bg-white text-text-slate-secondary border-gray-200 hover:bg-slate-50"
                  }`}
                  aria-label="Next Month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Calendar grid wrapper */}
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-xs font-bold text-text-slate-light uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Empty offsets for May 2026 starting Friday (5 blanks) / June starting Monday (1 blank) */}
              {Array.from({ length: activeMonth === "may" ? 5 : 1 }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-slate-50/50 rounded-xl" />
              ))}

              {/* Days mapping */}
              {Array.from({ length: activeMonth === "may" ? 31 : 30 }).map((_, i) => {
                const day = i + 1;
                const activeEvent = deadlines[activeMonth].events.find((e) => e.day === day);

                return (
                  <div
                    key={`day-${day}`}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 border ${
                      activeEvent
                        ? "bg-blue-50/50 border-blue-200 text-royal-blue font-bold shadow-sm shadow-blue-50"
                        : "bg-white border-transparent text-text-slate-secondary hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm">{day}</span>
                    {activeEvent && (
                      <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deadline Detail list */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold text-text-slate-light uppercase tracking-widest mb-4">
              Upcoming Deadlines
            </h3>

            {deadlines[activeMonth].events.map((e, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-md shadow-slate-100/50 flex gap-4 hover:border-royal-blue transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-text-slate-primary flex flex-col items-center justify-center font-bold flex-shrink-0 border border-gray-100">
                  <span className="text-xs text-text-slate-paragraph font-medium uppercase">{activeMonth}</span>
                  <span className="text-lg leading-none">{e.day}</span>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-bold text-text-slate-primary leading-tight">{e.label}</h4>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-text-slate-paragraph uppercase tracking-wider">
                      {e.form}
                    </span>
                  </div>
                  <p className="text-xs text-text-slate-paragraph font-medium leading-relaxed mb-2">
                    {e.desc}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-brand-warning font-bold">
                    <Clock size={12} /> Filing Deadline: 11:59 PM
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-3 mt-6">
              <Info className="text-royal-blue flex-shrink-0" size={18} />
              <div className="text-xs text-text-slate-secondary font-medium leading-relaxed">
                <span className="font-bold text-royal-blue block mb-1">Looking for post-incorporation audits?</span>
                NxtWeave handles automated monthly returns preparation, TDS calculation, and compliance notifications.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
