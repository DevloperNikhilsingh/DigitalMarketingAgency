import { motion } from "framer-motion";
import { ArrowRight, Layers, Grid3x3, Users, Sparkles } from "lucide-react";

const collageImages = [
  "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600100897205-830cf70f3fed?q=80&w=500&auto=format&fit=crop",
];

const stats = [
  { icon: Layers, value: "250+", label: "Projects" },
  { icon: Grid3x3, value: "8+", label: "Categories" },
  { icon: Users, value: "Happy", label: "Clients" },
  { icon: Sparkles, value: "98%", label: "Satisfaction" },
];

const PortfolioBanner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#14213D] via-[#0B0F1A] to-black px-5 pb-24 pt-16 sm:px-8 lg:px-12 lg:pt-20">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#F5A623]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[#F5A623]/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-5 flex items-center gap-2 text-xs font-medium tracking-wide text-[#F5A623]">
            <span>OUR PORTFOLIO</span>
            <span className="h-px w-8 bg-[#F5A623]/60" />
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
            Where <span className="text-[#F5A623]">Creativity</span>
            <br />
            Comes to Life.
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
            Explore our diverse range of creative work across print, digital,
            branding, and social media.
          </p>

          <div className="mt-8">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5A623] px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Let's Work Together
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-4 border-t border-white/10 pt-8 sm:gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <Icon size={18} className="text-[#F5A623]" strokeWidth={2} />
                <div>
                  <p className="text-lg font-bold text-white sm:text-xl">
                    {value}
                  </p>
                  <p className="text-[11px] text-white/50">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
 
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto grid h-80 w-full max-w-md grid-cols-3 gap-3 sm:h-95"
        >
          {collageImages.map((src, i) => (
            <div
              key={src}
              className={`overflow-hidden rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 ${
                i === 0
                  ? "col-span-2 row-span-2"
                  : i === 4
                  ? "col-span-1"
                  : "col-span-1"
              }`}
              style={{
                transform: `rotate(${[-2, 3, -3, 2, -1][i]}deg)`,
              }}
            >
              <img
                src={src}
                alt="Creative work sample"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioBanner;
