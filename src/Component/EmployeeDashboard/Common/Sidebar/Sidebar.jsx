import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Layers,
  ShoppingBag,
  IndianRupee,
  Users,
  BarChart3,
  UserCircle,
  Settings,
  Globe,
  LogOut,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "../../../../Context/AuthContext";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "my-services", label: "My Services", icon: Layers },
  { key: "service request", label: "Service Request", icon: ShoppingBag },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activePage = "dashboard", onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const businessName = user?.company || user?.name || "Guest";
  const initial = (user?.company || user?.name || "G").charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col px-5 py-6">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-full bg-amber-300 text-black font-bold text-lg flex items-center justify-center shrink-0">
          {initial}
        </div>
        <div>
          <p className="font-bold text-[#1a1a2e] text-[15px] leading-tight">{businessName}</p>
          <p className="text-xs text-gray-400 leading-tight">Business Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate?.(item.key)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                isActive
                  ? "bg-amber-300 text-[#000000]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#1a1a2e]"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Business card */}
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15, duration: 0.3 }}
  className="rounded-2xl border border-gray-100 p-4 mb-3"
>
  <p className="font-semibold text-[#1a1a2e] text-sm">{user?.name}</p>
  <p className="text-xs text-gray-400 mt-0.5">{user?.company}</p>
  
  <p className="flex items-center gap-1 text-xs text-[#2fb56b] font-medium mt-2">
    <BadgeCheck size={14} /> Verified Business
  </p>
</motion.div>

      {/* Visit website */}
      <button
      onClick={() => navigate("/")}
        type="button"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#1a1a2e] hover:bg-amber-300 transition mb-4"
      >
        <Globe size={16} />
        Visit Website
      </button>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 px-1 py-2 text-sm font-medium text-gray-500 hover:text-red-500 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}