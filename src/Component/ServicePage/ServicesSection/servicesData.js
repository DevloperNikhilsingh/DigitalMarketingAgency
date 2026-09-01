import { Search, Grid3x3, Triangle, PenTool, Mail, Code2, BarChart3, Megaphone, Target, Share2, FileText, Smartphone, Play, LineChart, ShoppingCart, Globe, } from "lucide-react";

export const services = [
  { id: 1, slug: "seo", icon: Search, iconBg: "bg-yellow-400", title: "Search Engine Optimization", desc: "Improve your website ranking and get discovered by the right audience.", linkColor: "text-yellow-500", category: "SEO" },
  { id: 2, slug: "social-media-marketing", icon: Grid3x3, iconBg: "bg-red-400", title: "Social Media Marketing", desc: "Engage your audience and build brand across social platforms.", linkColor: "text-red-500", category: "Social Media" },
  { id: 3, slug: "google-ads", icon: Triangle, iconBg: "bg-blue-400", title: "Google Ads Management", desc: "Drive targeted traffic and get high-quality leads with performance ads.", linkColor: "text-blue-500", category: "Google Ads" },
  { id: 4, slug: "content-marketing", icon: PenTool, iconBg: "bg-purple-400", title: "Content Marketing", desc: "Powerful content that informs, engages, and converts your audience.", linkColor: "text-purple-500", category: "Content Marketing" },
  { id: 5, slug: "email-marketing", icon: Mail, iconBg: "bg-teal-400", title: "Email Marketing", desc: "Nurture leads and customers with personalized email campaigns.", linkColor: "text-teal-500", category: "Email Marketing" },
  { id: 6, slug: "website-design", icon: Code2, iconBg: "bg-orange-400", title: "Website Design", desc: "Beautiful, fast & conversion-focused websites that represent your brand.", linkColor: "text-orange-500", category: "Website Design" },
  { id: 7, slug: "local-seo", icon: BarChart3, iconBg: "bg-pink-400", title: "Local SEO", desc: "Rank higher in local searches and attract nearby customers.", linkColor: "text-pink-500", category: "SEO" },
  { id: 8, slug: "brand-strategy", icon: Megaphone, iconBg: "bg-indigo-400", title: "Brand Strategy", desc: "Build a strong, consistent brand identity across every channel.", linkColor: "text-indigo-500", category: "Digital Marketing" },
  { id: 9, slug: "conversion-rate-optimization", icon: Target, iconBg: "bg-emerald-400", title: "Conversion Rate Optimization", desc: "Turn more visitors into paying customers with data-backed tweaks.", linkColor: "text-emerald-500", category: "Digital Marketing" },
  { id: 10, slug: "instagram-growth", icon: Share2, iconBg: "bg-rose-400", title: "Instagram Growth", desc: "Grow followers and engagement with tailored Instagram campaigns.", linkColor: "text-rose-500", category: "Social Media" },
  { id: 11, slug: "blog-copywriting", icon: FileText, iconBg: "bg-violet-400", title: "Blog & Copywriting", desc: "SEO-friendly blogs and copy that keep readers coming back.", linkColor: "text-violet-500", category: "Content Marketing" },
  { id: 12, slug: "mobile-app-landing-pages", icon: Smartphone, iconBg: "bg-cyan-400", title: "Mobile App Landing Pages", desc: "High-converting landing pages built to drive app installs.", linkColor: "text-cyan-500", category: "Website Design" },
  { id: 13, slug: "youtube-ads", icon: Play, iconBg: "bg-red-500", title: "YouTube Ads", desc: "Reach engaged viewers with video ads that drive real action.", linkColor: "text-red-600", category: "Google Ads" },
  { id: 14, slug: "analytics-reporting", icon: LineChart, iconBg: "bg-amber-400", title: "Analytics & Reporting", desc: "Clear, actionable dashboards that track what actually matters.", linkColor: "text-amber-500", category: "Digital Marketing" },
  { id: 15, slug: "email-automation", icon: ShoppingCart, iconBg: "bg-lime-500", title: "Email Automation", desc: "Automated drip sequences that nurture leads while you sleep.", linkColor: "text-lime-600", category: "Email Marketing" },
  { id: 16, slug: "ecommerce-website-design", icon: Globe, iconBg: "bg-sky-400", title: "E-commerce Website Design", desc: "Fast, conversion-focused online stores built to sell more.", linkColor: "text-sky-500", category: "Website Design" },
];

export const filters = [
  "All",
  "SEO",
  "Social Media",
  "Digital Marketing",
  "Google Ads",
  "Content Marketing",
  "Email Marketing",
  "Website Design",
];