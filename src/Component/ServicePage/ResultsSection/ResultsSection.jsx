import React, { useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { TrendingUp, Users2, Share2, Heart } from "lucide-react";

const stats = [
  { icon: TrendingUp, iconBg: "bg-green-100", iconColor: "text-green-500", ringColor: "rgba(34, 197, 94, 0.15)", target: 150, suffix: "%", label: "Increase in Organic Traffic" },
  { icon: Users2, iconBg: "bg-red-100", iconColor: "text-red-500", ringColor: "rgba(239, 68, 68, 0.15)", target: 2500, suffix: "+", label: "Leads Generated" },
  { icon: Share2, iconBg: "bg-blue-100", iconColor: "text-blue-500", ringColor: "rgba(59, 130, 246, 0.15)", target: 300, suffix: "%", label: "Boost in Engagement" },
  { icon: Heart, iconBg: "bg-orange-100", iconColor: "text-orange-500", ringColor: "rgba(249, 115, 22, 0.15)", target: 95, suffix: "%", label: "Client Satisfaction" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Counter = ({ target, suffix, isInView }) => {
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <p className="text-xl font-bold text-gray-900">
      {value.toLocaleString()}
      {suffix}
    </p>
  );
};

const StatCard = ({ icon: Icon, iconBg, iconColor, ringColor, target, suffix, label, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ y: isHovered ? -6 : 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        boxShadow: isHovered ? `0 12px 28px -10px ${ringColor}` : "0 0px 0px rgba(0,0,0,0)",
      }}
      className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center cursor-default"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.12 : 1,
          boxShadow: isHovered ? `0 0 0 8px ${ringColor}` : `0 0 0 0px ${ringColor}`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`${iconBg} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}
      >
        <Icon className={iconColor} size={20} />
      </motion.div>
      <Counter target={target} suffix={suffix} isInView={isInView} />
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </motion.div>
  );
};

const ResultsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-white pb-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-wide px-4 py-1 rounded-full mb-4"
        >
          REAL RESULTS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          Results That <span className="text-purple-500">Speak</span> For
          Themselves
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-500 mt-2"
        >
          We focus on strategies that deliver measurable growth.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;