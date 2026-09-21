import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Play } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop";

const PortfolioCard = ({ project, className = "", showVideo = false }) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

  
  const sources = Array.isArray(project.video)
    ? project.video
    : project.video
    ? [project.video]
    : [];
  const currentSrc = sources[sourceIndex];

  const wantsVideo = showVideo && sources.length > 0;
  const playVideo = wantsVideo && !videoFailed;

  
  useEffect(() => {
    setSourceIndex(0);
    setVideoFailed(false);
    setIsPaused(false);
  }, [project.video]);

  
  useEffect(() => {
    if (!playVideo) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch((err) => {
        console.warn("Video autoplay blocked:", currentSrc, err);
        setIsPaused(true);
      });
    }
  }, [playVideo, currentSrc]);

  const handleVideoError = (e) => {
    
    console.error("Video load failed:", currentSrc, e.currentTarget.error);
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((i) => i + 1); 
    } else {
      setVideoFailed(true);
    }
  };

  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch((err) => console.warn("Play failed:", err));
    } else {
      video.pause();
    }
  };

  const mediaClass =
    "h-full min-h-55 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl bg-black shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 ${className}`}
    >
      <div
        onClick={playVideo ? togglePlay : undefined}
        className={`relative h-full w-full overflow-hidden ${
          playVideo ? "cursor-pointer" : ""
        }`}
      >
        {playVideo ? (
          <video
            key={currentSrc}
            ref={videoRef}
            src={currentSrc}
            poster={project.image}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            onError={handleVideoError}
            className={mediaClass}
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            className={mediaClass}
          />
        )}

        
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

        
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#F5A623]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

       
        {playVideo && isPaused && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
              <Play size={24} fill="currentColor" />
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
          {project.tag}
        </span>

        <button
          aria-label={`View ${project.title}`}
          onClick={(e) => e.stopPropagation()} 
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-105"
        >
          <Eye size={15} strokeWidth={2} />
        </button>

        
        {import.meta.env.DEV && wantsVideo && videoFailed && (
          <span className="absolute left-4 top-14 rounded-md bg-red-600 px-2 py-1 text-[10px] font-semibold text-white">
            Video is Not loaded plz Check console.
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-[15px] font-semibold leading-tight text-white sm:text-base">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-white/70 transition-all duration-300 group-hover:text-[#F5A623]">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;