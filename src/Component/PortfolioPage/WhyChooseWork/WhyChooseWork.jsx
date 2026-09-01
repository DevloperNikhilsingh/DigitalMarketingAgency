import { motion } from "framer-motion";
import { Check } from "lucide-react";

const defaultPoints = [
  {
    title: "Creative designs that grab attention",
    description: "and deliver results.",
  },
  {
    title: "On-time delivery with quality",
    description: "and consistency.",
  },
  {
    title: "Tailored solutions that align",
    description: "with your brand goals.",
  },
];

const defaultCollage = [
  "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop",
];

const rotations = [-3, 2, -2, 3];

const WhyChooseWork = ({
  heading = ["Why Clients Choose", "Our Work?"],
  points = defaultPoints,
  collage = defaultCollage,
  badgeText = ["Trusted by", "Brands Across", "Industries"],
}) => {
  return (
    <section className="bg-[#F7F7F5] px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Heading + Points */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold leading-tight text-[#14213D]">
            {heading.map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <span className="mt-3 block h-1 w-10 rounded-full bg-[#F5A623]" />

          <ul className="mt-8 space-y-2">
            {points.map((point, i) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex cursor-default items-start gap-3 rounded-xl px-3 py-2.5 -mx-3 transition-colors duration-300 hover:bg-white hover:shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5A623] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Check size={13} strokeWidth={3} className="text-black" />
                </span>
                <p className="text-[15px] leading-relaxed text-[#14213D]/80 transition-colors duration-300 group-hover:text-[#14213D]">
                  {point.title} {point.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Collage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="grid grid-cols-4 gap-3">
            {collage.map((src, i) => (
              <div
                key={src}
                className={`group overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-out hover:z-10 hover:!rotate-0 hover:shadow-xl ${
                  i % 2 === 0 ? "mt-6" : ""
                }`}
                style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
              >
                <img
                  src={src}
                  alt="Portfolio sample"
                  loading="lazy"
                  className="h-36 w-full scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110 sm:h-44"
                />
              </div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute -bottom-6 left-1/2 flex h-24 w-24 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-[#F5A623] text-center shadow-lg sm:right-0 sm:left-auto sm:translate-x-0 sm:-bottom-8"
          >
            <p className="text-[10px] font-semibold leading-tight text-black">
              {badgeText.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < badgeText.length - 1 && <br />}
                </span>
              ))}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseWork;