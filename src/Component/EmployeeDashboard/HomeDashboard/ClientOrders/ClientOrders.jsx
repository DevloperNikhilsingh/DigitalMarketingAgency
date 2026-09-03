import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const orders = [
  {
    id: "DS-1258",
    initials: "AC",
    avatarBg: "bg-[#e9f2fe]",
    avatarColor: "text-[#3b82f6]",
    company: "Amit Corporation",
    service: "Website SEO Package",
    status: "In Progress",
    date: "May 19, 2025",
    amount: "₹ 12,500",
  },
  {
    id: "DS-1257",
    initials: "BG",
    avatarBg: "bg-[#e8f8ee]",
    avatarColor: "text-[#2fb56b]",
    company: "Bright Growth LLP",
    service: "Social Media Management",
    status: "Completed",
    date: "May 18, 2025",
    amount: "₹ 8,000",
  },
  {
    id: "DS-1256",
    initials: "NW",
    avatarBg: "bg-[#f0ecfd]",
    avatarColor: "text-[#6d5bd0]",
    company: "NextWave Industries",
    service: "Google Ads Campaign",
    status: "Pending",
    date: "May 17, 2025",
    amount: "₹ 15,000",
  },
  {
    id: "DS-1255",
    initials: "RD",
    avatarBg: "bg-[#e9f2fe]",
    avatarColor: "text-[#3b82f6]",
    company: "Redstone Developers",
    service: "Website SEO Package",
    status: "Completed",
    date: "May 16, 2025",
    amount: "₹ 12,500",
  },
  {
    id: "DS-1254",
    initials: "ST",
    avatarBg: "bg-[#fef3e7]",
    avatarColor: "text-[#f5a742]",
    company: "SmartTech Solutions",
    service: "Social Media Management",
    status: "Completed",
    date: "May 15, 2025",
    amount: "₹ 7,500",
  },
];

const statusStyles = {
  "In Progress": "bg-[#e9f2fe] text-[#3b82f6]",
  Completed: "bg-[#e8f8ee] text-[#2fb56b]",
  Pending: "bg-[#fef3e7] text-[#f5a742]",
};

export default function ClientOrders() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[#1a1a2e]">Client Orders</h2>
        <button
          type="button"
          className="text-sm font-medium text-gray-500 border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 transition"
        >
          View All
        </button>
      </div>

      <div className="flex-1 divide-y divide-gray-100">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${order.avatarBg} ${order.avatarColor}`}
            >
              {order.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#1a1a2e] truncate">{order.company}</p>
              <p className="text-xs text-gray-400 truncate">{order.service}</p>
            </div>

            <span
              className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>

            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">
                Order #{order.id}
              </p>
              <p className="text-xs text-gray-400">{order.date}</p>
            </div>

            <p className="text-sm font-semibold text-[#1a1a2e] shrink-0 w-20 text-right">
              {order.amount}
            </p>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-medium text-[#6d5bd0] mt-4 hover:underline"
      >
        View all client orders <ArrowRight size={14} />
      </button>
    </div>
  );
}
