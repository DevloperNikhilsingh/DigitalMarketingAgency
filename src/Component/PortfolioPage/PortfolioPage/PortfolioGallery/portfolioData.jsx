// Central data source for all portfolio projects.
// Add/remove/edit projects here — Gallery, Filters and Trending sections
// all read from this single array.

export const categories = [
  "All Works",
  "Social Media",
  "Print Design",
  "Festival Banners",
  "Branding",
  "Web Design",
  "Packaging",
  "Product Ads",
  "Posters",
  "Other",
];

const portfolioProjects = [
  {
    id: 1,
    title: "FitLife Nutrition",
    category: "Social Media",
    tag: "Social Media",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=900&auto=format&fit=crop",
    description: "Protein drink launch campaign for Instagram & Facebook.",
    size: "tall",
    trending: true,
  },
  {
    id: 2,
    title: "Varanasi Tourism",
    category: "Posters",
    tag: "Travel Poster",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=900&auto=format&fit=crop",
    description: "Heritage tourism poster series for the Ganga ghats.",
    size: "wide",
    trending: true,
  },
  {
    id: 3,
    title: "Organix Skincare",
    category: "Web Design",
    tag: "Web Design",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
    description: "E-commerce storefront design for a skincare brand.",
    size: "regular",
  },
  {
    id: 4,
    title: "Wedding Invite",
    category: "Other",
    tag: "Invitation Design",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    description: "Royal-themed digital wedding invitation set.",
    size: "regular",
  },
  {
    id: 5,
    title: "Diwali Campaign",
    category: "Festival Banners",
    tag: "Festival Banner",
    image:
      "https://images.unsplash.com/photo-1605021154813-c9f7bc11e37c?q=80&w=900&auto=format&fit=crop",
    description: "Festive social creatives for Diwali sale week.",
    size: "regular",
  },
  {
    id: 6,
    title: "TruCare Brochure",
    category: "Print Design",
    tag: "Print Design",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=900&auto=format&fit=crop",
    description: "Tri-fold healthcare brochure for a diagnostics chain.",
    size: "regular",
  },
  {
    id: 7,
    title: "Luxury Perfume Ad",
    category: "Product Ads",
    tag: "Product Ad",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=900&auto=format&fit=crop",
    description: "Premium fragrance launch key visual.",
    size: "tall",
    trending: true,
  },
  {
    id: 8,
    title: "School Pamphlet",
    category: "Print Design",
    tag: "Pamphlet Design",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop",
    description: "Admission pamphlet for a K-12 school.",
    size: "regular",
  },
  {
    id: 9,
    title: "Sanfariyo Branding",
    category: "Branding",
    tag: "Branding",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop",
    description: "Full identity system for a fashion label.",
    size: "regular",
  },
  {
    id: 10,
    title: "Food Social Post",
    category: "Social Media",
    tag: "Social Media",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop",
    description: "Weekly menu creatives for a QSR brand.",
    size: "regular",
  },
  {
    id: 11,
    title: "Real Estate Creative",
    category: "Posters",
    tag: "Real Estate Post",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=900&auto=format&fit=crop",
    description: "Listing announcement post for a builder.",
    size: "regular",
  },
  {
    id: 12,
    title: "Shiv Ratri Festival",
    category: "Festival Banners",
    tag: "Festival Poster",
    image:
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=900&auto=format&fit=crop",
    description: "Temple event banner for Maha Shivratri.",
    size: "regular",
  },
  {
    id: 13,
    title: "TechNest Solutions",
    category: "Web Design",
    tag: "Web Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    description: "SaaS landing page for a B2B tech company.",
    size: "regular",
  },
  {
    id: 14,
    title: "Dental Care Creative",
    category: "Social Media",
    tag: "Healthcare Post",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=900&auto=format&fit=crop",
    description: "Awareness post series for a dental clinic.",
    size: "regular",
  },
  {
    id: 15,
    title: "Jagannath Yatra",
    category: "Festival Banners",
    tag: "Festival Banner",
    image:
      "https://images.unsplash.com/photo-1600100897205-830cf70f3fed?q=80&w=900&auto=format&fit=crop",
    description: "Rath Yatra event promotion creative.",
    size: "regular",
    trending: true,
  },
  {
    id: 16,
    title: "Ayodhya Prayagraj",
    category: "Posters",
    tag: "Travel Poster",
    image:
      "https://images.unsplash.com/photo-1600100897193-cf83f2601a76?q=80&w=900&auto=format&fit=crop",
    description: "Pilgrimage circuit tourism poster.",
    size: "regular",
    trending: true,
  },
  {
    id: 17,
    title: "Summer Sale",
    category: "Product Ads",
    tag: "Product Ad",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=900&auto=format&fit=crop",
    description: "Seasonal sale creative for an apparel brand.",
    size: "regular",
    trending: true,
  },
  {
    id: 18,
    title: "Fashion Collection",
    category: "Branding",
    tag: "Branding",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
    description: "Lookbook key visual for a fashion drop.",
    size: "regular",
    trending: true,
  },
  {
    id: 19,
    title: "Digital Solutions",
    category: "Web Design",
    tag: "Web Design",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    description: "Product website for a digital solutions company.",
    size: "regular",
    trending: true,
  },
];

export default portfolioProjects;
