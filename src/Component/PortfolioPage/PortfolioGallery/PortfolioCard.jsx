import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const PortfolioCard = ({ project, className = "" }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl bg-black shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop";
          }}
          className="h-full min-h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* base gradient so text always reads */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* hover accent overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F5A623]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
          {project.tag}
        </span>

        <button
          aria-label={`View ${project.title}`}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-105"
        >
          <Eye size={15} strokeWidth={2} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-[15px] font-semibold leading-tight text-white sm:text-base">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-white/70 transition-all duration-300 group-hover:text-[#F5A623]">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
