import React from "react";
import { motion } from "framer-motion";
import { Monitor, Megaphone, Search, PenSquare, Plus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const services = [
  {
    key: "seo",
    name: "Website SEO Package",
    orders: 45,
    icon: Monitor,
    iconBg: "bg-[#fef3e7]",
    iconColor: "text-[#f5a742]",
  },
  {
    key: "social",
    name: "Social Media Management",
    orders: 38,
    icon: Megaphone,
    iconBg: "bg-[#e8f8ee]",
    iconColor: "text-[#2fb56b]",
  },
  {
    key: "google-ads",
    name: "Google Ads Campaign",
    orders: 28,
    icon: Search,
    iconBg: "bg-[#f0ecfd]",
    iconColor: "text-[#6d5bd0]",
  },
  {
    key: "content",
    name: "Content Writing Service",
    orders: 17,
    icon: PenSquare,
    iconBg: "bg-[#e9f2fe]",
    iconColor: "text-[#3b82f6]",
  },
];

export default function ServicesOverview() {
 
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#1a1a2e]">Your Services Overview</h2>
        <a href=""></a>
        <button
          type="button"
          className="text-sm font-medium text-gray-500 border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 transition"
        >
          View All Services
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${service.iconBg} ${service.iconColor}`}>
                <Icon size={18} />
              </div>
              <p className="text-sm font-semibold text-[#1a1a2e] mt-3">{service.name}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400">{service.orders} Orders</p>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#e8f8ee] text-[#2fb56b]">
                  Active
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: services.length * 0.05, duration: 0.25 }}
          className="rounded-xl border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#6d5bd0] hover:text-[#6d5bd0] transition min-h-[132px]"
        >
          <div className="w-9 h-9 rounded-full border border-current flex items-center justify-center">
            <Plus size={18} />
          </div>
          <span className="text-sm font-medium">Add New Service</span>
        </motion.button> */}
      </div>
    </div>
  );
}
