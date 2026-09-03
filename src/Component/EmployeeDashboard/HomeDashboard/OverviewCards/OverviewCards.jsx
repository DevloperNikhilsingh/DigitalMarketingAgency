import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ClipboardCheck, Clock, Star, Users, TrendingUp } from "lucide-react";

const cards = [
  {
    key: "total-orders",
    label: "Total Orders",
    value: "128",
    delta: "18%",
    icon: ShoppingBag,
    iconBg: "bg-[#fef3e7]",
    iconColor: "text-[#f5a742]",
  },
  {
    key: "completed-orders",
    label: "Completed Orders",
    value: "96",
    delta: "16%",
    icon: ClipboardCheck,
    iconBg: "bg-[#e8f8ee]",
    iconColor: "text-[#2fb56b]",
  },
  {
    key: "in-progress-orders",
    label: "In Progress Orders",
    value: "24",
    delta: "12%",
    icon: Clock,
    iconBg: "bg-[#f0ecfd]",
    iconColor: "text-[#6d5bd0]",
  },
  {
    key: "average-rating",
    label: "Average Rating",
    value: "4.8",
    delta: "0.3",
    icon: Star,
    iconBg: "bg-[#e9f2fe]",
    iconColor: "text-[#3b82f6]",
  },
  {
    key: "total-clients",
    label: "Total Clients",
    value: "76",
    delta: "14%",
    icon: Users,
    iconBg: "bg-[#fdeeee]",
    iconColor: "text-[#e0645f]",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBg} ${card.iconColor}`}>
              <Icon size={18} />
            </div>
            <p className="text-sm text-gray-400 mt-3">{card.label}</p>
            <p className="text-2xl font-bold text-[#1a1a2e] mt-1">{card.value}</p>
            <p className="flex items-center gap-1 text-xs font-medium text-[#2fb56b] mt-2">
              <TrendingUp size={13} /> {card.delta} from last month
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
