import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PortfolioFilters from "../PortfolioFilters/PortfolioFilters";
import PortfolioCard from "./PortfolioCard";
import portfolioProjects from "./portfolioData";

const INITIAL_COUNT = 14;

// TODO: replace with your actual Google Drive folder/file link
const DRIVE_LINK = "https://drive.google.com/drive/folders/YOUR_FOLDER_ID";

const sizeClass = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  regular: "",
};

const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return portfolioProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All Works" || project.category === activeCategory;
      const matchesSearch =
        term.length === 0 ||
        project.title.toLowerCase().includes(term) ||
        project.category.toLowerCase().includes(term) ||
        project.tag.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const visibleProjects = filteredProjects.slice(0, INITIAL_COUNT);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <section className="bg-[#F7F7F5] px-5 pb-20 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <PortfolioFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {visibleProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-black/10 bg-white py-20 text-center">
            <p className="text-lg font-semibold text-[#14213D]">
              No projects found
            </p>
            <p className="text-sm text-black/50">
              Try a different keyword or category.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-8 grid auto-rows-55 grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-60 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  className={sizeClass[project.size] || ""}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="mt-10 flex justify-center">
          <motion.a
            href={DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            View All
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;