import { motion } from "framer-motion";
import { Star } from "lucide-react";

const MapSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="inline-block text-[#F5A623] font-semibold tracking-wide text-sm mb-3">
          Our Location
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#14213D]">
          Find Us Here
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.005 }}
        className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      >
        <iframe
          title="DigiServices location map"
          src="https://www.google.com/maps?q=15/46+A-R+Shivpur+Bypass+Shuddhipur+Tarna+Varanasi+Uttar+Pradesh&output=embed"
          className="w-full h-[380px] md:h-[440px] grayscale-[10%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating info card */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute top-6 left-6 max-w-[260px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5"
        >
          <p className="font-bold text-[#14213D]">
            DigiServices Marketing Agency
          </p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            15/46 A-R, Shivpur Bypass, Near Tomer Children School, Shuddhipur Tarna, Varanasi, Uttar Pradesh
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-sm font-semibold text-[#14213D]">4.8</span>
            <span className="flex text-[#F5A623]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </span>
            <span className="text-xs text-gray-400">(120)</span>
          </div>
          <a
            href="https://www.google.com/maps?q=15/46+A-R+Shivpur+Bypass+Shuddhipur+Tarna+Varanasi+Uttar+Pradesh"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[#F5A623] text-sm font-semibold mt-3 hover:underline"
          >
            View larger map
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MapSection;