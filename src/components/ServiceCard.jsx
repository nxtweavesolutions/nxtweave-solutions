import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ title, description, features, link, icon }) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
      
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-[#1E3A5F]">{title}</h3>
      </div>

      <p className="text-gray-600 mb-6 text-sm">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={link}
        className="mt-auto flex items-center justify-between border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:border-[#2FA4C7] hover:text-[#2FA4C7] transition"
      >
        View Details
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}