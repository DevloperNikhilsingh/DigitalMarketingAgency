import React, { useState } from "react";

/**
 * BusinessGallery
 * - `variant="header"` -> large main image + thumbnail row (used at the top of the page)
 * - `variant="grid"`   -> featured + supporting grid (used inside the Gallery tab)
 */
export default function BusinessGallery({
  images = [],
  businessName,
  isNew,
  variant = "header",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  if (!images.length) return null;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.style.display = "none";
    e.currentTarget.parentElement.classList.add("dg-img-fallback");
  };

  if (variant === "grid") {
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveIndex(0);
              setExpanded(true);
            }}
            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] sm:aspect-auto group"
          >
            <img
              src={images[0]}
              alt={`${businessName} featured`}
              onError={handleImgError}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="dg-fallback-icon">
              <GalleryIcon />
            </div>
          </button>
          {images.slice(1, 5).map((img, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => {
                setActiveIndex(idx + 1);
                setExpanded(true);
              }}
              className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-square group"
            >
              <img
                src={img}
                alt={`${businessName} photo ${idx + 2}`}
                onError={handleImgError}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="dg-fallback-icon">
                <GalleryIcon />
              </div>
            </button>
          ))}
        </div>

        {expanded && (
          <Lightbox
            images={images}
            activeIndex={activeIndex}
            businessName={businessName}
            onClose={() => setExpanded(false)}
            onPrev={goPrev}
            onNext={goNext}
            handleImgError={handleImgError}
          />
        )}
      </>
    );
  }

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3]">
        <img
          src={images[activeIndex]}
          alt={`${businessName} main`}
          onError={handleImgError}
          className="w-full h-full object-cover"
        />
        <div className="dg-fallback-icon">
          <GalleryIcon />
        </div>

        {isNew && (
          <span className="absolute top-3 left-3 bg-amber-400 text-stone-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Recently Added
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
            >
              <ChevronRight />
            </button>
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-lg overflow-hidden aspect-square bg-stone-100 border-2 transition ${
                idx === activeIndex
                  ? "border-amber-400"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${businessName} thumbnail ${idx + 1}`}
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
              <div className="dg-fallback-icon dg-fallback-icon--sm">
                <GalleryIcon small />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Lightbox({
  images,
  activeIndex,
  businessName,
  onClose,
  onPrev,
  onNext,
  handleImgError,
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        ✕
      </button>
      <div
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIndex]}
          alt={`${businessName} expanded`}
          onError={handleImgError}
          className="w-full max-h-[75vh] object-contain rounded-xl bg-stone-800"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GalleryIcon({ small }) {
  const size = small ? 16 : 28;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 16l5-4 4 3 3-2 6 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
