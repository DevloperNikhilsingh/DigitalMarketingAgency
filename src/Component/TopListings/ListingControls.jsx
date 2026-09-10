import React from "react";

/**
 * ListingControls
 * Renders the previous/next arrow buttons and pagination dots
 * for the TopListings carousel. Purely presentational.
 */
export const CarouselArrows = ({ onPrev, onNext }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous listing"
        className="
          w-9 h-9 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-full bg-white
          border border-neutral-200
          text-neutral-700
          shadow-sm
          hover:border-amber-400 hover:text-amber-600
          active:scale-95
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-300
        "
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next listing"
        className="
          w-9 h-9 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-full bg-amber-400
          text-neutral-900
          shadow-sm
          hover:bg-amber-500
          active:scale-95
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-300
        "
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export const CarouselPagination = ({ total, activeIndex, onDotClick }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onDotClick(index)}
            aria-label={`Go to listing ${index + 1}`}
            className={`
              rounded-full transition-all duration-300
              focus:outline-none
              ${
                isActive
                  ? "w-5 h-2 bg-amber-400"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
              }
            `}
          />
        );
      })}
    </div>
  );
};

const ListingControls = {
  CarouselArrows,
  CarouselPagination,
};

export default ListingControls;
