import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, ShieldCheck, Repeat, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: Users, target: 200, suffix: "+", label: "Projects Completed" },
  { icon: ShieldCheck, target: 150, suffix: "+", label: "Happy Clients" },
  { icon: Repeat, target: 98, suffix: "%", label: "Client Retention" },
  { icon: Award, target: 10, suffix: "+", label: "Years Experience" },
];

// Animates a number from 0 -> target whenever it scrolls into view
const Counter = ({ target, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <p ref={ref} className="text-lg md:text-xl font-bold text-yellow-400">
      {value}
      {suffix}
    </p>
  );
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
   const navigate = useNavigate();
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.span
          variants={itemVariants}
          className="inline-block bg-yellow-400/10 border border-yellow-400 text-yellow-400 text-xs font-semibold tracking-wide px-4 py-1 rounded-full mb-6"
        >
          OUR SERVICES
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl"
        >
          Digital Marketing <br />
          Services That Deliver <br />
          <span className="text-yellow-400">Real Results</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-xl text-gray-300 text-sm md:text-base"
        >
          We help businesses grow their brand, reach the right audience, and
          achieve measurable growth through custom digital marketing
          strategies.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
          <motion.button
            onClick={() =>( navigate("/contact#contact-form"))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Get Free Consultation <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8"
        >
          {stats.map(({ icon: Icon, target, suffix, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-3 cursor-default group"
            >
              <div className="bg-yellow-400/10 p-2 rounded-md group-hover:bg-yellow-400/20 transition-colors">
                <Icon className="text-yellow-400" size={22} />
              </div>
              <div>
                <Counter target={target} suffix={suffix} />
                <p className="text-xs text-gray-300">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;