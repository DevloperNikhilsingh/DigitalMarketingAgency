// Starting data so the CMS has something to show/edit out of the box.
// This all lives in memory (React state) — refreshing the page resets it,
// exactly like the rest of the dashboard right now.

// How many case-study (previous project) cards a single sub-service can hold.
// Change this ONE number if you want a different cap.
export const MAX_CASE_STUDIES = 6;

let idCounter = 1000;
export function nextId() {
  idCounter += 1;
  return idCounter;
}

// Three-level structure:
// Service (e.g. "Website SEO Package")
//   -> subServices (e.g. "Local SEO", "Technical SEO") — unlimited
//        -> caseStudies (e.g. "Bloomstack Organics") — max MAX_CASE_STUDIES
export const INITIAL_SERVICES = [
  {
    id: 1,
    icon: "Search",
    title: "Website SEO Package",
    description: "Improve your website ranking and increase organic traffic.",
    status: "In Progress",
    date: "May 19, 2025",
    subServices: [
      {
        id: 11,
        icon: "Globe",
        title: "Local SEO",
        description: "Rank higher in local map packs and 'near me' searches.",
        caseStudies: [
          {
            id: 101,
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80",
            title: "Bloomstack Organics",
            description:
              "Organic traffic grew 3.2x in 4 months after a full technical SEO overhaul.",
          },
          {
            id: 102,
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80",
            title: "Northwind Traders",
            description: "Ranked #1 for 12 target keywords within a single quarter.",
          },
        ],
      },
      {
        id: 12,
        icon: "Code",
        title: "Technical SEO",
        description: "Fix crawl errors, site speed, and indexing issues.",
        caseStudies: [
          {
            id: 103,
            image:
              "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=200&q=80",
            title: "Everline Fitness",
            description: "Reduced bounce rate by 41% with on-page and content fixes.",
          },
        ],
      },
      {
        id: 13,
        icon: "ShoppingCart",
        title: "E-commerce SEO",
        description: "Optimize product and category pages for search visibility.",
        caseStudies: [],
      },
    ],
  },
  {
    id: 2,
    icon: "Megaphone",
    title: "Social Media Management",
    description: "Manage and grow your social media presence across platforms.",
    status: "Completed",
    date: "May 18, 2025",
    subServices: [
      {
        id: 21,
        icon: "Camera",
        title: "Content Creation",
        description: "Photo and video content tailored to each platform.",
        caseStudies: [
          {
            id: 201,
            image:
              "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&q=80",
            title: "Cafe Lumen",
            description: "Grew Instagram following from 2K to 18K in six months.",
          },
        ],
      },
      {
        id: 22,
        icon: "MessageCircle",
        title: "Community Management",
        description: "Respond to comments and DMs, keep the audience engaged.",
        caseStudies: [],
      },
    ],
  },
  {
    id: 3,
    icon: "Target",
    title: "Google Ads Campaign",
    description: "Run targeted ads to boost leads and conversions.",
    status: "Pending",
    date: "May 17, 2025",
    subServices: [],
  },
  {
    id: 4,
    icon: "PenSquare",
    title: "Content Writing Service",
    description: "High-quality content for websites, blogs, and marketing.",
    status: "In Progress",
    date: "May 16, 2025",
    subServices: [],
  },
  {
    id: 5,
    icon: "Mail",
    title: "Email Marketing Campaign",
    description: "Engage your audience with effective email marketing campaigns.",
    status: "Pending",
    date: "May 15, 2025",
    subServices: [],
  },
  {
    id: 6,
    icon: "Monitor",
    title: "Website Design & Development",
    description: "Build a modern, responsive and user-friendly website.",
    status: "In Progress",
    date: "May 14, 2025",
    subServices: [],
  },
];

export const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];

export const STATUS_STYLES = {
  Pending: "bg-orange-50 text-orange-600",
  "In Progress": "bg-indigo-50 text-indigo-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

export const ICON_BG_STYLES = [
  "bg-indigo-50 text-indigo-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-blue-50 text-blue-600",
  "bg-orange-50 text-orange-600",
  "bg-violet-50 text-violet-600",
];
