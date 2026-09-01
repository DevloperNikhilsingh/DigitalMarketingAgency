import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, FileText, Rocket, LineChart } from "lucide-react";

const steps = [
  { number: "01", icon: Search, title: "Discover", text: "We analyze your business, audience & competitors." },
  { number: "02", icon: FileText, title: "Strategize", text: "We create a strategy tailored to your business goals." },
  { number: "03", icon: Rocket, title: "Execute", text: "We implement campaigns that drive real results." },
  { number: "04", icon: LineChart, title: "Optimize", text: "We monitor, analyze & optimize for maximum growth." },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const StepCard = ({ number, icon: Icon, title, text, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={stepVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative z-10 flex flex-col items-center px-3 cursor-default"
    >
      {/* Number badge */}
      <motion.div
        animate={{
          scale: isHovered ? 1.12 : 1,
          boxShadow: isHovered
            ? "0 0 0 8px rgba(250, 204, 21, 0.15)"
            : "0 0 0 0px rgba(250, 204, 21, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="w-11 h-11 rounded-full bg-yellow-400 text-gray-900 font-bold flex items-center justify-center mb-4 text-sm"
      >
        {number}
      </motion.div>

      {/* Icon circle */}
      <motion.div
        animate={{
          backgroundColor: isHovered ? "rgba(250, 204, 21, 1)" : "rgba(255, 255, 255, 0.05)",
          borderColor: isHovered ? "rgba(250, 204, 21, 1)" : "rgba(255, 255, 255, 0.1)",
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-14 h-14 rounded-full border flex items-center justify-center mb-4"
      >
        <motion.div animate={{ color: isHovered ? "#111827" : "#facc15" }} transition={{ duration: 0.3 }}>
          <Icon size={22} />
        </motion.div>
      </motion.div>

      {/* Title */}
      <h3 className={`font-semibold mb-1.5 transition-colors duration-300 ${isHovered ? "text-yellow-400" : "text-white"}`}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 max-w-[180px] leading-relaxed">{text}</p>

      {/* Mobile step connector (vertical dashed line, hidden on desktop) */}
      {index !== steps.length - 1 && (
        <div className="md:hidden w-px h-8 border-l-2 border-dashed border-yellow-400/30 mt-6" />
      )}
    </motion.div>
  );
};

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-gray-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      {/* Subtle background grid/dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div ref={sectionRef} className="relative max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block bg-white/5 border border-white/20 text-gray-300 text-xs font-semibold tracking-wide px-4 py-1 rounded-full mb-4"
        >
          OUR PROCESS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Our Simple <span className="text-yellow-400">4-Step</span> Process
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 mt-2"
        >
          A proven process that delivers real results.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-4"
        >
          {/* Dashed connecting line (desktop only) — draws in left to right */}
          <div className="hidden md:block absolute top-[22px] left-[12.5%] right-[12.5%] h-0 z-0">
            <div className="absolute inset-0 border-t-2 border-dashed border-white/10" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 border-t-2 border-dashed border-yellow-400/60"
            />
          </div>

          {steps.map((step, index) => (
            <StepCard key={step.number} {...step} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;