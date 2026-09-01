import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Tag, ChevronDown, MessageSquare, Send, Lock, Check } from "lucide-react";

const serviceOptions = [
  "Social Media Marketing",
  "Search Engine Optimization",
  "Google & Meta Ads",
  "Website Development",
  "Branding & Design",
  "Other",
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  service: "",
  message: "",
};

const FloatField = ({ icon: Icon, label, name, value, onChange, error, type = "text", as = "input", rows }) => {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const Tag = as;

  return (
    <div className="relative">
      <Icon className={`absolute left-0 top-4 w-4 h-4 transition-colors duration-200 ${focused ? "text-[#F5A623]" : "text-gray-400"}`} />
      <motion.label
        htmlFor={name}
        animate={{ y: floated ? -14 : 8, scale: floated ? 0.8 : 1, color: error ? "#f87171" : focused ? "#F5A623" : "#9ca3af" }}
        transition={{ duration: 0.18 }}
        className="absolute left-7 top-2 origin-left pointer-events-none text-sm font-medium"
      >
        {label}
      </motion.label>
      <Tag
        id={name}
        name={name}
        type={as === "input" ? type : undefined}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent pl-7 pt-6 pb-2 text-[15px] text-[#14213D] outline-none resize-none placeholder-transparent ${as === "textarea" ? "min-h-27.5" : ""}`}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gray-200 overflow-hidden rounded-full">
        <motion.div
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`h-full w-full origin-left ${error ? "bg-red-400" : "bg-linear-to-r from-[#F5A623] to-amber-400"}`}
        />
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serviceOpen, setServiceOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData(initialState);
      setTimeout(() => setStatus("idle"), 3000);
    }, 1400);
  };

  return (
    <div id="contact-form" className="relative rounded-3xl p-[1.5px] bg-linear-to-br from-[#F5A623]/50 via-gray-200 to-[#14213D]/20">
      <div className="rounded-3xl bg-white px-7 py-9 md:px-9 md:py-10 shadow-xl shadow-black/4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-[#F5A623] font-semibold text-sm mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
          Get in Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-2xl md:text-[28px] font-bold text-[#14213D] mb-2"
        >
          Send Us a Message
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 text-sm mb-8 max-w-md"
        >
          Fill out the form and our team will get back to you as soon as possible.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-7">
            <FloatField icon={User} label="Your Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            <FloatField icon={Mail} label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <FloatField icon={Phone} label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            <FloatField icon={Tag} label="Subject" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setServiceOpen((o) => !o)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-left transition-colors duration-200 hover:border-[#F5A623]/60"
            >
              <span className={formData.service ? "text-[#14213D]" : "text-gray-400"}>
                {formData.service || "Service You're Interested In"}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {serviceOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {serviceOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setFormData((p) => ({ ...p, service: option }));
                        setServiceOpen(false);
                      }}
                      className="px-4 py-2.5 text-sm text-[#14213D] hover:bg-[#FCEEDD] cursor-pointer transition-colors duration-150"
                    >
                      {option}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <FloatField icon={MessageSquare} label="Your Message" name="message" as="textarea" rows={4} value={formData.message} onChange={handleChange} error={errors.message} />

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 overflow-hidden bg-linear-to-r from-[#F5A623] to-amber-400 text-[#14213D] font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-[#F5A623]/25 transition-shadow duration-200 hover:shadow-xl hover:shadow-[#F5A623]/35 disabled:opacity-70"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4" /> Message Sent
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status === "idle" && <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <p className="flex items-center gap-2 text-xs text-gray-400 pt-1">
            <Lock className="w-3 h-3" />
            We respect your privacy. Your information is safe with us.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;