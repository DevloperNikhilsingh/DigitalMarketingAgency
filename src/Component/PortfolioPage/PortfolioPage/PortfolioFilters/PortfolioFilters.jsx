import { Search } from "lucide-react";
import { categories } from "../PortfolioGallery/portfolioData";

const PortfolioFilters = ({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="sticky top-2 z-10 -mt-14 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects, categories..."
          className="w-full rounded-full border border-black/10 bg-[#F7F7F5] py-2.5 pl-10 pr-4 text-sm text-[#14213D] outline-none transition-colors placeholder:text-black/40 focus:border-[#F5A623]"
        />
      </div>

      <div className="flex w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#F5A623] text-black"
                  : "bg-[#F7F7F5] text-[#14213D]/70 hover:bg-black/5"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioFilters;
