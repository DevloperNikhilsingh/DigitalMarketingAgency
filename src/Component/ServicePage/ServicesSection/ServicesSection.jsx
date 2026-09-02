import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { services, filters } from "./servicesData";

const INITIAL_VISIBLE_COUNT = 8;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesFilter =
        activeFilter === "All" || service.category === activeFilter;
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowAll(false);
  };

  const visibleServices = showAll
    ? filteredServices
    : filteredServices.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block bg-white border border-gray-200 text-gray-600 text-xs font-semibold tracking-wide px-4 py-1 rounded-full mb-4">
          WHAT WE DO
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our <span className="text-yellow-500">Services</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Smart solutions to{" "}
          <span className="font-semibold">grow your brand</span> online.
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto mt-8 relative">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search services..."
            className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow"
          />
        </div>

       {/* Filter tabs */}
<div className="flex md:flex-wrap md:justify-center gap-3 mt-6 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
  {filters.map((filter) => (
    <motion.button
      key={filter}
      onClick={() => handleFilterChange(filter)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`shrink-0 px-4 py-2 rounded-md text-sm font-medium border transition-colors ${activeFilter === filter
          ? "bg-yellow-400 border-yellow-400 text-gray-900"
          : "bg-white border-gray-200 text-gray-600 hover:border-yellow-400"
        }`}
    >
      {filter}
    </motion.button>
  ))}
</div>

        {/* Service cards */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"
        >
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, idx) => (
              <ServiceCard key={service.id} {...service} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <p className="text-gray-400 mt-10 text-sm">
            No services found. Try a different search or filter.
          </p>
        )}

        {/* Show more / less button */}
        {filteredServices.length > INITIAL_VISIBLE_COUNT && (
          <motion.button
            onClick={() => setShowAll((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-md transition-colors"
          >
            {showAll
              ? "Show Less"
              : `Show More (${filteredServices.length - INITIAL_VISIBLE_COUNT})`}
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;