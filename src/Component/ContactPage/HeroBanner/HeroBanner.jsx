import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1746173098013-6ae3c31e073f?auto=format&fit=crop&w=1920&q=80";

const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#14213D] min-h-[420px] md:min-h-[480px] flex items-center">
      {/* Background image with slow Ken-Burns zoom on load */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-center md:items-center justify-between gap-10"
      >
        {/* Left: text content */}
        <div className="max-w-xl">
          <motion.span
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 border border-[#F5A623]/40 rounded-full px-4 py-1.5 text-[#F5A623] font-semibold tracking-wide text-sm mb-5 cursor-default transition-colors duration-200 hover:bg-[#F5A623]/10 hover:border-[#F5A623]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            Contact Us
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
          >
            Let&apos;s Build Something Amazing{" "}
            <span className="text-[#F5A623]">Together!</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-200 text-base md:text-lg leading-relaxed"
          >
            Have a project in mind or want to take your digital marketing to
            the next level? We&apos;d love to hear from you.
          </motion.p>
        </div>

        
      </motion.div>
    </section>
  );
};

export default HeroBanner;