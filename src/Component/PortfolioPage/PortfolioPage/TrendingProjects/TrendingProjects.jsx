import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import portfolioProjects from "../PortfolioGallery/portfolioData";

// Swiper core + required modules styles
import "swiper/css";

const trendingProjects = portfolioProjects.filter((p) => p.trending);

const TrendingProjects = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full overflow-x-hidden bg-[#0B0F1A] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Trending This Month
            </h2>
            <span className="mt-2 block h-1 w-10 rounded-full bg-[#F5A623]" />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5A623] text-black transition-transform hover:scale-105"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={600}
          spaceBetween={16}
          slidesPerView="auto"
          watchOverflow={true}
          className="mt-8! w-full! overflow-hidden!"
        >
          {trendingProjects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="h-56! w-56! sm:h-64! sm:w-64!"
            >
              <div className="group relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-semibold text-white">
                    {project.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#F5A623]">
                    {project.tag}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <SwiperSlide className="h-56 w-56! sm:h-64! sm:w-64!">
            <a
              href="#gallery"
              className="group flex h-full w-full flex-col items-start justify-between rounded-2xl bg-white/4 p-5 ring-1 ring-white/10 transition-colors hover:bg-white/8"
            >
              <p className="text-lg font-semibold leading-snug text-white">
                We Build Digital Solutions That Drive Results.
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] text-black transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </a>
          </SwiperSlide>
        </Swiper>

        <div className="mt-5 flex justify-center gap-1.5">
          {trendingProjects.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-5 bg-[#F5A623]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProjects;