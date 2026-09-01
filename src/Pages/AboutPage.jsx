import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Footer from "../Component/Layout/Footer ";
import Navbar from "../Component/Layout/Navbar";

/**
 * AboutPage
 * - Framer Motion: used ONLY for on-load / on-scroll entrance reveals (hero, story, values, CTA)
 * - GSAP: used ONLY for the continuous team carousel loop (infinite marquee, pause on hover)
 * No overlap: each library owns a distinct animation responsibility.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const stats = [
  { icon: "👥", num: "250+", label: "Happy Clients" },
  { icon: "🚀", num: "500+", label: "Projects Completed" },
  { icon: "📈", num: "98%", label: "Client Satisfaction" },
  { icon: "🏆", num: "10+", label: "Years of Experience" },
];

const values = [
  { icon: "💡", title: "Creativity", desc: "Fresh ideas that make brands stand out." },
  { icon: "🛡️", title: "Transparency", desc: "Honest communication at every step." },
  { icon: "📊", title: "Results", desc: "Focused on measurable growth and ROI." },
  { icon: "🤝", title: "Collaboration", desc: "We grow together with our clients." },
  { icon: "❤️", title: "Integrity", desc: "We do what's right, always." },
];

const team = [
  { name: "Aman Verma", role: "Founder & Strategist", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Priya Sharma", role: "Creative Director", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Rahul Mehta", role: "Performance Lead", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Neha Kapoor", role: "Content Strategist", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

function TeamCarousel() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // width of one full set (half of track, since track = 2 duplicated sets)
    const setWidth = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });
    tweenRef.current = gsap.to(track, {
      x: -setWidth,
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) tweenRef.current.pause();

    return () => tweenRef.current && tweenRef.current.kill();
  }, []);

  const pause = () => tweenRef.current && tweenRef.current.pause();
  const resume = () => tweenRef.current && tweenRef.current.resume();

  const cards = [...team, ...team];

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_60px,black_calc(100%-60px),transparent)]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div ref={trackRef} className="flex gap-6 w-max">
        {cards.map((m, i) => (
          <div
            key={i}
            className="flex-none w-45 sm:w-52.5 bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] relative"
          >
            <img src={m.img} alt={m.name} className="w-full h-45 sm:h-52.5 object-cover block" />
            <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-[11px] font-bold text-black">
              in
            </span>
            <div className="p-3.5">
              <h4 className="text-sm font-semibold text-gray-900">{m.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
    <Navbar />
    <div className="bg-[#f7f7f5] text-black font-sans overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative bg-[#0d0d0d] text-white px-6 sm:px-10 lg:px-[8%] pt-14 pb-28 sm:pb-32"
        style={{ clipPath: "ellipse(98% 100% at 50% 0%)" }}
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <span className="inline-block border border-amber-400 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              ABOUT US
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              We're More Than Marketers.
              <br />
              <span className="text-amber-400">We're Growth Partners.</span>
            </h1>
            <p className="text-gray-400 mt-5 mb-7 max-w-md leading-relaxed text-sm sm:text-base">
              We help brands unlock their true potential with data-driven strategies,
              creative ideas, and technology that delivers measurable growth.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="/contact#contact-form"
                className="bg-amber-400 text-black font-bold px-6 py-3.5 rounded-lg inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                Let's Work Together →
              </a>
              <a href="#" className="flex items-center gap-3 font-semibold text-sm">
                <span className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center">
                  ▶
                </span>
                Watch Our Story
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
          >
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Team meeting"
              className="w-full rounded-2xl block"
            />
            <div className="absolute -bottom-6 -right-2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0d0d0d] border-2 border-amber-400 flex flex-col items-center justify-center text-center">
              <span className="text-xl sm:text-2xl font-extrabold">10+</span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">
                Years of
                <br />
                Experience
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS — compact, overlapping the curved hero border */}
      <motion.div
        className="mx-[5%] sm:mx-[8%] lg:mx-[10%] -mt-14 sm:-mt-16 bg-[#1a1a1a] border border-[#262626] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] flex flex-wrap justify-around gap-4 px-5 py-4 relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        custom={2}
      >
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3 flex-1 min-w-32.5 justify-center">
            <span className="w-9 h-9 rounded-full border border-amber-400 text-amber-400 flex items-center justify-center text-sm shrink-0">
              {s.icon}
            </span>
            <div className="text-left">
              <div className="text-white text-lg font-extrabold leading-tight">{s.num}</div>
              <div className="text-gray-400 text-[11px] mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* OUR STORY */}
      <section className="px-6 sm:px-10 lg:px-[8%] py-16 max-w-7xl mx-auto">
        <motion.div
          className="text-amber-500 font-bold text-xs mb-3.5 flex items-center gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          ● OUR STORY
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_0.8fr_0.8fr] gap-6 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug mb-4">
              Built on Passion.
              <br />
              Driven by <span className="text-amber-500 underline decoration-amber-500">Results.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3.5">
              We started with a simple belief – that every brand has a unique story to tell.
              Our mission is to amplify that story and deliver measurable growth.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              From strategy to execution, we work closely with our clients as a true partner,
              not just a service provider.
            </p>
            <a
              href="#"
              className="bg-[#0d0d0d] text-white font-bold px-6 py-3.5 rounded-lg inline-flex items-center gap-2"
            >
              Know More About Us →
            </a>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="bg-[#0d0d0d] text-white rounded-2xl p-6 mb-5">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center mb-3.5">🎯</div>
              <h3 className="text-lg font-bold mb-2">Mission</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                To empower businesses with innovative digital strategies that drive real growth.
              </p>
            </div>
            <div className="bg-amber-400 text-black rounded-2xl p-6">
              <div className="w-9 h-9 rounded-full bg-black/15 flex items-center justify-center mb-3.5">👁️</div>
              <h3 className="text-lg font-bold mb-2">Vision</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                To be a global digital partner known for creativity, transparency, and results.
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Office desk"
                className="w-full block"
              />
              <div className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center">
                ▶
              </div>
            </div>
            <div className="text-right italic text-gray-700 mt-2.5 font-serif">Our Journey ↵</div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#0d0d0d] text-white text-center px-6 sm:px-10 lg:px-[8%] py-16">
        <motion.div
          className="text-amber-500 font-bold text-xs mb-2.5 flex items-center justify-center gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          ● OUR VALUES
        </motion.div>
        <motion.h2
          className="text-2xl sm:text-3xl font-extrabold mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          The Principles That <span className="text-amber-400">Drive Us</span>
        </motion.h2>
        <div className="flex flex-wrap justify-between gap-8 max-w-6xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="flex-1 min-w-32.5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <div className="w-14 h-14 rounded-full border border-[#333] text-amber-400 flex items-center justify-center mx-auto mb-4 text-xl">
                {v.icon}
              </div>
              <h4 className="text-base font-semibold mb-2">{v.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed max-w-42.5 mx-auto">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM — GSAP-driven infinite carousel */}
      <section className="px-6 sm:px-10 lg:px-[8%] py-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-5 mb-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-amber-500 font-bold text-xs mb-2.5">● MEET OUR TEAM</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              People Behind Your <span className="text-amber-500 underline decoration-amber-500">Success.</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-gray-600 max-w-sm text-sm leading-relaxed"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            Our team of strategists, designers, marketers, and analysts work together to
            turn ideas into impactful digital experiences.
          </motion.p>
        </div>

        <TeamCarousel />
      </section>

      {/* CTA */}
      <motion.div
        className="bg-[#0d0d0d] text-white mx-6 sm:mx-10 lg:mx-[8%] mb-16 rounded-2xl flex flex-wrap items-center justify-between gap-5 px-6 sm:px-10 py-9"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="flex items-center gap-5">
          <span className="w-12 h-12 rounded-full border border-amber-400 text-amber-400 flex items-center justify-center text-lg shrink-0">
            🚀
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold mb-1.5">
              Let's Build Something <span className="text-amber-400">Amazing Together!</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Have a project in mind? Let's discuss how we can help your brand grow.
            </p>
          </div>
        </div>
        <a
          href="/contact#contact-form"
          className="bg-amber-400 text-black font-bold px-6 py-3.5 rounded-lg inline-flex items-center gap-2 shrink-0"
        >
          Get In Touch →
        </a>
      </motion.div>
    </div>

    <Footer />
    </>
  );
}