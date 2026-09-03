import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useAuth } from "../../../../Context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();
  const businessName = user?.company || user?.name || "Guest";
  const initial = (user?.company || user?.name || "G").charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center justify-between gap-4 flex-wrap"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#fef3e7] flex items-center justify-center text-2xl shrink-0">
          👋
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1a1a2e]">
            Welcome back, <span className="text-[#6d5bd0]">{businessName}!</span> 👋
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Here's what's happening with your business today.
          </p>
        </div>
      </div>
    </motion.div>
  );
}