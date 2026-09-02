import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GripVertical } from "lucide-react";

const BEFORE_IMAGE =
  "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=900&auto=format&fit=grayscale&fit=crop";
const AFTER_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop";

const BeforeAfterShowcase = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }, []);

  const handleMouseDown = () => (isDragging.current = true);
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseMove = (e) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e) => {
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold leading-tight text-[#14213D]">
            Design That Makes
            <br />A Real <span className="text-[#F5A623]">Impact.</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#14213D]/60">
            Good design isn't just about looks, it's about results. Drag the
            slider to see the difference.
          </p>
          <a
            href="#gallery"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#14213D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            See The Difference
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-72 w-full select-none overflow-hidden rounded-2xl shadow-lg sm:h-96"
        >
          <img
            src={AFTER_IMAGE}
            alt="After redesign"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 rounded-md bg-[#F5A623] px-3 py-1 text-[11px] font-semibold text-black">
            After
          </span>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={BEFORE_IMAGE}
              alt="Before redesign"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1 text-[11px] font-semibold text-white">
              Before
            </span>
          </div>

          <div
            className="absolute inset-y-0 flex w-8 -translate-x-1/2 cursor-ew-resize items-center justify-center"
            style={{ left: `${position}%` }}
          >
            <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/80" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#14213D] shadow-md">
              <GripVertical size={16} />
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Before and after comparison slider"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterShowcase;
