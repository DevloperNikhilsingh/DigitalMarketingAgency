import React, { useState, useEffect, useRef, useCallback } from "react";
import ListingCard from "./ListingCard";
import { CarouselArrows, CarouselPagination } from "./ListingControls";
import listingData from "./listingData";

// Try to use React Router if it's already available in the host project.
// Falls back to a no-op navigator if react-router-dom isn't installed,
// so this component never crashes a project that doesn't use routing.
let useNavigateHook = null;
try {
  // eslint-disable-next-line global-require
  useNavigateHook = require("react-router-dom").useNavigate;
} catch (e) {
  useNavigateHook = null;
}

const AUTOPLAY_INTERVAL = 3500; // ms
const DESKTOP_VISIBLE_COUNT = 2;

const TopListings = () => {
  const total = listingData.length;

  // Build an "extended" list with clones at both ends for a seamless
  // infinite loop: [lastClone, ...real items, firstClone]
  const extendedListings = [
    listingData[total - 1],
    ...listingData,
    listingData[0],
  ];

  // currentIndex is based on the EXTENDED array; real items start at index 1
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Router navigate (optional — only if react-router-dom is present)
  const navigate = useNavigateHook ? useNavigateHook() : null;

  const handleViewDetails = useCallback(
    (listing) => {
      const path = `/business/${listing.id}`;
      if (navigate) {
        navigate(path);
      } else {
        // Graceful fallback when no router is configured in the host app.
        // Avoids crashing while still giving predictable, visible behavior.
        window.location.hash = path;
      }
    },
    [navigate]
  );

  // ---- Responsive visible count ----
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 700) {
        setVisibleCount(1);
      } else {
        setVisibleCount(DESKTOP_VISIBLE_COUNT);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // ---- Core navigation ----
  const goNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const goToDot = useCallback((dotIndex) => {
    setIsTransitioning(true);
    setCurrentIndex(dotIndex + 1); // +1 to account for the leading clone
  }, []);

  // ---- Seamless loop reset (no visible jump) ----
  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === 0) {
      // We slid to the fake "lastClone" at the start -> snap to real last item
      setIsTransitioning(false);
      setCurrentIndex(total);
    } else if (currentIndex === total + 1) {
      // We slid to the fake "firstClone" at the end -> snap to real first item
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }, [currentIndex, total]);

  // Re-enable transition on next tick after a non-animated snap
  useEffect(() => {
    if (!isTransitioning) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isTransitioning]);

  // ---- Resync when tab becomes visible again ----
  // Background tabs can throttle timers/rAF, occasionally leaving the
  // carousel stuck on a clone slide (looks like the section vanished).
  // When the tab regains focus, snap back to a safe, real slide.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          if (prev < 1 || prev > total) return 1;
          return prev;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [total]);

  // ---- Autoplay ----
  useEffect(() => {
    if (isPaused) return undefined;

    autoplayRef.current = setInterval(() => {
      goNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isPaused, goNext, currentIndex]);

  const resetAutoplayTimer = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    // The effect above will re-create the interval since currentIndex changes
  }, []);

  const handlePrevClick = () => {
    resetAutoplayTimer();
    goPrev();
  };

  const handleNextClick = () => {
    resetAutoplayTimer();
    goNext();
  };

  const handleDotClick = (dotIndex) => {
    resetAutoplayTimer();
    goToDot(dotIndex);
  };

  // ---- Hover pause/resume ----
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // ---- Touch swipe ----
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    const SWIPE_THRESHOLD = 40;

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      resetAutoplayTimer();
      if (delta > 0) {
        goNext(); // swipe left -> next
      } else {
        goPrev(); // swipe right -> previous
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // ---- Slide geometry ----
  // Each "slide" occupies (100 / visibleCount)% of the track's width.
  const slideWidthPercent = 100 / visibleCount;
  const translatePercent = currentIndex * slideWidthPercent;

  // Active pagination dot maps the extended index back to the real range [0, total-1]
  const activeDotIndex =
    ((currentIndex - 1) % total + total) % total;

  return (
    <section className="bg-[#FFFDF8] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[3px] bg-amber-400 rounded-full" />
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold tracking-wide px-3 py-1 rounded-full uppercase">
                Top Listings
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
              Discover{" "}
              <span className="text-amber-500">Top Listings</span>
            </h2>
            <p className="mt-2 text-neutral-500 text-sm sm:text-base max-w-md">
              Discover trusted businesses recently listed on Digiservice.
            </p>
          </div>

          {/* Desktop arrows next to heading */}
          <div className="hidden sm:block">
            <CarouselArrows onPrev={handlePrevClick} onNext={handleNextClick} />
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex items-stretch"
              style={{
                transform: `translateX(-${translatePercent}%)`,
                transition: isTransitioning
                  ? "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
                  : "none",
              }}
            >
              {extendedListings.map((listing, idx) => (
                <div
                  key={`${listing.id}-${idx}`}
                  className="shrink-0 px-2 sm:px-3"
                  style={{ width: `${slideWidthPercent}%` }}
                >
                  <div className="h-full">
                    <ListingCard
                      listing={listing}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile arrows below cards */}
          <div className="flex sm:hidden justify-center gap-3 mt-5">
            <CarouselArrows onPrev={handlePrevClick} onNext={handleNextClick} />
          </div>
        </div>

        {/* Pagination */}
        <CarouselPagination
          total={total}
          activeIndex={activeDotIndex}
          onDotClick={handleDotClick}
        />
      </div>
    </section>
  );
};

export default TopListings;