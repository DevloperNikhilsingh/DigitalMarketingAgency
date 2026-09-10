import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ListingCard = ({ listing, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const { name, category, location, image, rating, reviewCount, verified, description, isNew, } = listing;

  return (
    <div
      className=" group relative flex flex-col sm:flex-row w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 " >
      {/* Image section */}
      <div className="relative sm:w-[42%] w-full h-40 xs:h-44 sm:h-auto shrink-0 bg-neutral-100">
        {!imgError && image ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-400">
            <svg
              className="w-10 h-10 mb-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A1.5 1.5 0 0022.5 18.75V5.25A1.5 1.5 0 0021 3.75H3A1.5 1.5 0 001.5 5.25v13.5A1.5 1.5 0 003 20.25z"
              />
            </svg>
            <span className="text-xs font-medium">Image unavailable</span>
          </div>
        )}

        {/* Badge: New / Recently Added */}
        {isNew && (
          <span
            className="
              absolute top-3 left-3
              inline-flex items-center gap-1
              bg-amber-400 text-neutral-900
              text-[11px] font-semibold
              px-2.5 py-1 rounded-full
              shadow-sm
            "
          >
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2l1.9 4.7L17 8l-4 3.3L14.2 17 10 14.1 5.8 17 7 11.3 3 8l5.1-1.3L10 2z" />
            </svg>
            New
          </span>
        )}

        {/* Bottom accent line on image */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
      </div>

      {/* Content section */}
      <div className="flex flex-col justify-between p-3.5 sm:p-5 flex-1 min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="
                inline-block text-[11px] font-medium
                text-amber-700 bg-amber-50
                border border-amber-200
                px-2.5 py-1 rounded-full
                truncate
              "
            >
              {category}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug truncate">
            {name}
          </h3>

          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5 text-sm">
            <span className="flex items-center gap-1 text-neutral-800 font-medium">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.838-.196-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
              </svg>
              {rating}
              <span className="text-neutral-400 font-normal">
                ({reviewCount})
              </span>
            </span>

            <span className="flex items-center gap-1 text-neutral-500">
              <svg
                className="w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {location}
            </span>

            {verified && (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>

          <p className="mt-2.5 text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <Link
          to={`/business/${listing.id}`}
          className="
            mt-4 inline-flex items-center justify-center gap-1.5
            self-start
            bg-amber-400 hover:bg-amber-500
            text-neutral-900 text-sm font-semibold
            px-4 py-2 rounded-full
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1
          "
        >
          View Details
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;