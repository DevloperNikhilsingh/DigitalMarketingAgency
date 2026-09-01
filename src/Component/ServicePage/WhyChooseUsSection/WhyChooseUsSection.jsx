import React, { useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Users,
  HeartHandshake,
} from "lucide-react";

const points = [
  { icon: TrendingUp, text: "Data-Driven Strategies" },
  { icon: ShieldCheck, text: "Transparent Reporting" },
  { icon: Users, text: "Experienced Team" },
  { icon: HeartHandshake, text: "Client-First Approach" },
];

const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

const badgeStat = { target: 150, suffix: "+", label: "Happy Clients" };

const heroImage = {
  src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
  alt: "Team working in modern office",
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PointItem = ({ icon: Icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-center gap-3 cursor-default"
    >
      <motion.div
        animate={{
          backgroundColor: isHovered ? "rgba(234, 179, 8, 1)" : "rgba(234, 179, 8, 0.1)",
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      >
        <motion.div animate={{ color: isHovered ? "#ffffff" : "#eab308" }}>
          <Icon size={16} />
        </motion.div>
      </motion.div>
      <span
        className={`text-sm md:text-base transition-colors duration-200 ${
          isHovered ? "text-gray-900 font-medium" : "text-gray-700"
        }`}
      >
        {text}
      </span>
    </motion.li>
  );
};

const BadgeCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, badgeStat.target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView]);

  return (
    <p ref={ref} className="text-yellow-400 font-bold text-xl">
      {value}
      {badgeStat.suffix}
    </p>
  );
};

const WhyChooseUsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-wide px-4 py-1 rounded-full mb-4"
          >
            WHY CHOOSE US
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Why Businesses <br />
            <span className="text-yellow-500">Choose Us</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-500 mt-4 max-w-md">
            We combine strategy, creativity, and data to deliver measurable
            growth.
          </motion.p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <PointItem key={point.text} {...point} />
            ))}
          </ul>
        </motion.div>

        {/* Right image with badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="rounded-2xl w-full h-80 md:h-96 object-cover shadow-lg"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -bottom-6 right-4 bg-gray-900 text-white rounded-xl px-5 py-4 shadow-lg"
          >
            <BadgeCounter />
            <p className="text-xs text-gray-300 mb-2">{badgeStat.label}</p>
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt="Happy client avatar"
                  whileHover={{ y: -3, scale: 1.15, zIndex: 10 }}
                  className="w-6 h-6 rounded-full border-2 border-gray-900 relative"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;