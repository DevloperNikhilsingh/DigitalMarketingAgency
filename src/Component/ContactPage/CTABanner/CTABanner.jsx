import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="w-full mt-10 max-w-7xl mx-auto px-6 md:px-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl bg-[#14213D] px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* subtle animated background pattern */}
        <motion.div
          className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-[#F5A623]/10"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative flex items-center gap-4 z-10">
          <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-xl md:text-2xl font-bold">
              Ready to Take Your Brand to{" "}
              <span className="text-[#F5A623]">New Heights</span>?
            </h3>
            <p className="text-gray-300 text-sm mt-1">
              Let&apos;s build something amazing together.
            </p>
          </div>
        </div>

        <motion.a
          href="#contact-form"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="group relative z-10 inline-flex items-center gap-2 bg-[#F5A623] text-[#14213D] font-semibold px-6 py-3 rounded-xl shrink-0"
        >
          Get Free Consultation
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CTABanner;
