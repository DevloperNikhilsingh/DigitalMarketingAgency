import { motion } from "framer-motion";
import { Send, ArrowRight, Sparkles } from "lucide-react";

const PortfolioCTA = () => {
  return (
    <section className="bg-[#F7F7F5] px-5 py-14 sm:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-4xl bg-linear-to-br from-[#F5A623] via-[#F5A623] to-[#E0900F] px-6 py-10 shadow-[0_20px_60px_-15px_rgba(245,166,35,0.5)] sm:px-12 sm:py-14 lg:w-[80%] lg:px-16"
      >
        {/* Decorative layer */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-black/10" />
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full border border-black/10" />
          <div className="absolute bottom-6 right-32 h-2 w-2 rounded-full bg-black/25" />
          <div className="absolute right-14 top-1/3 h-1.5 w-1.5 rounded-full bg-black/20" />
          <div className="absolute left-10 bottom-10 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-1/3 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <motion.span
              whileHover={{ scale: 1.08, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-[#F5A623] shadow-lg"
            >
              <Send size={20} />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow">
                <Sparkles size={11} />
              </span>
            </motion.span>
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-black/60">
                Let's Talk
              </p>
              <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl">
                Like What You See?
              </h2>
              <p className="mt-1 text-sm text-black/70 sm:text-[15px]">
                Let's create something amazing for your brand.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Start a Project</span>
            <ArrowRight
              size={15}
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioCTA;