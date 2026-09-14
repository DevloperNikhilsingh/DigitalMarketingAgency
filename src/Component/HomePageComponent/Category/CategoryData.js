// src/data/categories.js

import {
  UtensilsCrossed,
  Building2,
  Sparkles,
  Home,
  GraduationCap,
  KeyRound,
  Hospital,
  HardHat,
  PawPrint,
  BedDouble,
  UserRound,
  Smile,
  Dumbbell,
  HandCoins,
  PartyPopper,
  Car,
} from "lucide-react";

const categories = [
  { name: "Restaurants", slug: "restaurants", icon: UtensilsCrossed },
  { name: "Hotels", slug: "hotels", icon: Building2 },
  { name: "Beauty & Spa", slug: "beauty-spa", icon: Sparkles },
  { name: "Home Decor", slug: "home-decor", icon: Home },
  { name: "Education", slug: "education", icon: GraduationCap },
  { name: "Rent & Hire", slug: "rent-hire", icon: KeyRound },
  { name: "Hospitals", slug: "hospitals", icon: Hospital },
  { name: "Contractors", slug: "contractors", icon: HardHat },
  { name: "Pet Shops", slug: "pet-shops", icon: PawPrint },
  { name: "PG/Hostels", slug: "pg-hostels", icon: BedDouble },
  { name: "Estate Agent", slug: "estate-agent", icon: UserRound },
  { name: "Dentists", slug: "dentists", icon: Smile },
  { name: "Gym", slug: "gym", icon: Dumbbell },
  { name: "Loans", slug: "loans", icon: HandCoins },
  { name: "Event Organisers", slug: "event-organisers", icon: PartyPopper },
  { name: "Driving Schools", slug: "driving-schools", icon: Car },
];

export default categories;