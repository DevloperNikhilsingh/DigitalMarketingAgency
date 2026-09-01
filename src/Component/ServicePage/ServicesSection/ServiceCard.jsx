import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ slug, icon: Icon, iconBg, title, desc, linkColor, index }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/services/${slug}`}
      className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm overflow-hidden group block
        transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Glow background */}
      <div
        className={`absolute -top-10 -left-10 w-40 h-40 rounded-full ${iconBg} blur-2xl
          opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      <span className="absolute top-6 right-6 text-4xl font-extrabold text-gray-100 select-none">
        {number}
      </span>

      <div className="absolute top-16 right-6 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, d) => (
          <span key={d} className="w-1 h-1 rounded-full bg-gray-200"></span>
        ))}
      </div>

      <div
        className={`relative z-10 w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-6
          transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}
      >
        <Icon className="text-white" size={26} strokeWidth={2.2} />
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-extrabold text-gray-900 leading-snug mb-3 text-left">
        {title}
      </h3>
      <div
        className={`relative z-10 w-8 h-0.5 ${iconBg} mb-4 transition-all duration-300 group-hover:w-14`}
      ></div>


      <p className="relative z-10 text-gray-500 text-sm mb-8 text-left">{desc}</p>


      <div className="relative z-10 flex items-center justify-between">
        <span className={`font-semibold text-sm ${linkColor}`}>Explore Service</span>
        <div
          className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center
            transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45`}
        >
          <ArrowRight className="text-white" size={16} />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;