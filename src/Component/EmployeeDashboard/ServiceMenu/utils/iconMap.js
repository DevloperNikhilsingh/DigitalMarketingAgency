import {
  Search,
  Megaphone,
  Target,
  PenSquare,
  Mail,
  Monitor,
  TrendingUp,
  Users,
  BarChart3,
  Globe,
  ShoppingCart,
  Camera,
  Video,
  Code,
  Smartphone,
  MessageCircle,
  Star,
  Award,
  Zap,
  Palette,
  FileText,
  Layers,
  Settings,
  Share2,
  Send,
  Briefcase,
  PieChart,
  Rocket,
  Bell,
  Layout,
} from "lucide-react";

// Curated set of icons relevant to a digital-agency service menu.
// Add more entries here any time — the key is what gets stored on the
// service record, the value is the actual lucide-react component.
export const ICON_MAP = {
  Search,
  Megaphone,
  Target,
  PenSquare,
  Mail,
  Monitor,
  TrendingUp,
  Users,
  BarChart3,
  Globe,
  ShoppingCart,
  Camera,
  Video,
  Code,
  Smartphone,
  MessageCircle,
  Star,
  Award,
  Zap,
  Palette,
  FileText,
  Layers,
  Settings,
  Share2,
  Send,
  Briefcase,
  PieChart,
  Rocket,
  Bell,
  Layout,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

// Returns a renderable lucide component for a stored icon name,
// falling back to Briefcase so a bad/missing name never crashes the UI.
export function getIconComponent(name) {
  return ICON_MAP[name] || Briefcase;
}
