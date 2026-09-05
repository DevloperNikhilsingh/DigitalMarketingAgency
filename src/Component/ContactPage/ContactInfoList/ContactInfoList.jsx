import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CalendarClock, ArrowUpRight } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 7007314944", "Mon - Sat: 10AM - 7PM"],
    href: "tel:+917007314944",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["amerjeet13vns@gmail.com", "We reply within 24 hours"],
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=amerjeet13vns@gmail.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["15/46 A-R, Shivpur Bypass, Near Tomer Children School,", "Shuddhipur Tarna, Varanasi, Uttar Pradesh"],
    href: "https://www.google.com/maps/search/?api=1&query=15%2F46+A-R+Shivpur+Bypass+Shuddhipur+Tarna+Varanasi",
  },
  {
    icon: CalendarClock,
    title: "Schedule a Meeting",
    lines: ["Book a free consultation with our expert"],
    link: "Book Now",
    href: "/contact",
  },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ContactInfoList = () => {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-[#F5A623] font-semibold text-sm mb-3"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
        Contact Info
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-2xl md:text-[28px] font-bold text-[#14213D] mb-2"
      >
        Let&apos;s Talk
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 text-sm mb-8 max-w-md"
      >
        We&apos;re here to help you 24/7. Reach out to us through any of these channels.
      </motion.p>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {contactItems.map(({ icon: Icon, title, lines, link, href }) => (
          <motion.a
            key={title}
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group relative rounded-2xl p-[1.5px] bg-linear-to-br from-gray-200 via-gray-200 to-gray-200 hover:from-[#F5A623]/60 hover:to-[#14213D]/20 transition-colors duration-300 block"
          >
            <div className="relative h-full rounded-2xl bg-white p-5 overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#F5A623]/0 group-hover:bg-[#F5A623]/10 blur-xl transition-colors duration-300" />

              <div className="relative flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#14213D] to-[#233255] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-5 h-5 text-[#F5A623]" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 transition-all duration-300 group-hover:text-[#F5A623] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <p className="relative font-semibold text-[#14213D] mb-1">{title}</p>
              {lines.map((line) => (
                <p key={line} className="relative text-gray-500 text-sm leading-relaxed">
                  {line}
                </p>
              ))}
              {link && (
                <span className="relative inline-block text-[#F5A623] text-sm font-semibold mt-2 group-hover:underline">
                  {link}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default ContactInfoList;