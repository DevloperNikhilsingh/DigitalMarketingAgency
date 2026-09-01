import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const content = {
  heading: "Ready to Grow Your Business?",
  description:
    "Let's create a digital strategy that drives more traffic, leads, and sales for your brand.",
  ctaLabel: "Get Free Consultation",
  image: {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    alt: "Business planning desk",
  },
};

const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 pb-16 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center"
      >
        {/* Decorative glow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.15 : 0.08 }}
          transition={{ duration: 0.6 }}
          className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-400 rounded-full blur-3xl pointer-events-none"
        />

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {content.heading}
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-sm">
            {content.description}
          </p>
          <motion.button
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="mt-6 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md transition-colors"
          >
            {content.ctaLabel}
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex"
            >
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-56 md:h-full overflow-hidden"
        >
          <motion.img
            src={content.image.src}
            alt={content.image.alt}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;