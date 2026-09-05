import { motion } from "framer-motion";
import { Building2, Clock, Headphones, MessageSquare, ArrowUpRight } from "lucide-react";

const stripItems = [
  {
    icon: Building2,
    title: "Our Office",
    text: "Modern workspace, great environment.",
    link: "View Office Photos",
  },
  {
    icon: Clock,
    title: "Working Hours",
    text: "Monday - Saturday, 10:00 AM - 7:00 PM",
    sub: "Sunday: Closed",
  },
  {
    icon: Headphones,
    title: "Quick Support",
    text: "Have a question? We are here to help!",
    link: "+91 7007314944",
    href: "tel:+917007314944",
  },
  {
    icon: MessageSquare,
    title: "Start a Project",
    text: "Let's turn your ideas into reality.",
    link: "Get a Free Quote",
  },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const InfoStrip = () => {
  return (
    <section className="w-full bg-[#F7F5F2] py-16">
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stripItems.map(({ icon: Icon, title, text, sub, link, href }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl p-[1.5px] bg-gradient-to-br from-gray-200 to-gray-200 hover:from-[#F5A623]/70 hover:to-[#14213D]/20 transition-colors duration-300"
          >
            <div className="relative h-full rounded-2xl bg-white p-6 overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/[0.06]">
              {/* soft radial glow on hover */}
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#F5A623]/0 group-hover:bg-[#F5A623]/10 blur-2xl transition-colors duration-300" />

              <div className="relative flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14213D] to-[#233255] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="w-5 h-5 text-[#F5A623]" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#F5A623]" />
              </div>

              <p className="relative font-semibold text-[#14213D] mb-1.5">{title}</p>
              <p className="relative text-sm text-gray-500 leading-relaxed">{text}</p>
              {sub && <p className="relative text-sm font-medium text-[#14213D] mt-1">{sub}</p>}
              {link && (
                href ? (
                  <a
                    href={href}
                    className="relative inline-block text-[#F5A623] text-sm font-semibold mt-3 hover:underline"
                  >
                    {link}
                  </a>
                ) : (
                  <span className="relative inline-block text-[#F5A623] text-sm font-semibold mt-3 cursor-pointer group-hover:underline">
                    {link}
                  </span>
                )
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default InfoStrip;