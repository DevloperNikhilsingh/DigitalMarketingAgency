import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle2, Hourglass, XCircle, Users, RotateCcw, ChevronDown, ArrowRight } from "lucide-react";

const stats = [
  {
    key: "received",
    label: "Total Orders Received",
    value: "128",
    icon: ShoppingCart,
    iconBg: "bg-[#e9f2fe]",
    iconColor: "text-[#3b82f6]",
    linkColor: "text-[#3b82f6]",
  },
  {
    key: "completed",
    label: "Completed Orders",
    value: "96",
    icon: CheckCircle2,
    iconBg: "bg-[#e8f8ee]",
    iconColor: "text-[#2fb56b]",
    linkColor: "text-[#2fb56b]",
  },
  {
    key: "in-progress",
    label: "In Progress Orders",
    value: "24",
    icon: Hourglass,
    iconBg: "bg-[#f0ecfd]",
    iconColor: "text-[#6d5bd0]",
    linkColor: "text-[#6d5bd0]",
  },
  {
    key: "cancelled",
    label: "Cancelled Orders",
    value: "8",
    icon: XCircle,
    iconBg: "bg-[#fdeceb]",
    iconColor: "text-[#e5484d]",
    linkColor: "text-[#e5484d]",
  },
  {
    key: "total-clients",
    label: "Total Clients",
    value: "76",
    icon: Users,
    iconBg: "bg-[#e9f2fe]",
    iconColor: "text-[#3b82f6]",
    linkColor: "text-[#3b82f6]",
  },
  {
    key: "repeat-clients",
    label: "Repeat Clients",
    value: "32",
    icon: RotateCcw,
    iconBg: "bg-[#fef3e7]",
    iconColor: "text-[#f5a742]",
    linkColor: "text-[#f5a742]",
  },
];

export default function PerformanceSummary() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#1a1a2e]">Performance Summary</h2>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
        >
          This Month <ChevronDown size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
                <Icon size={16} />
              </div>
              <p className="text-xs text-gray-400 mt-3">{stat.label}</p>
              <p className="text-xl font-bold text-[#1a1a2e] mt-1">{stat.value}</p>
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-medium mt-2 ${stat.linkColor} hover:underline`}
              >
                View details <ArrowRight size={12} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
