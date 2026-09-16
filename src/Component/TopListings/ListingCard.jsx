import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck, ArrowRight, Sparkles, ImageOff } from "lucide-react";

const ListingCard = ({ listing, onViewDetails }) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const { name, category, location, image, rating, reviewCount, verified, description, isNew, address} = listing;

  return (
    <div
      className=" group relative flex flex-col sm:flex-row w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 " >
      {/* Image section */}
      <div className="relative sm:w-[42%] w-full h-40 xs:h-44 sm:h-full shrink-0 bg-neutral-100">
        {!imgError && image ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 text-neutral-400">
            <ImageOff className="w-10 h-10 mb-1" strokeWidth={1.5} />
            <span className="text-xs font-medium">Image unavailable</span>
          </div>
        )}

        
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
            <Sparkles className="w-3 h-3" />
            New
          </span>
        )}

        {/* Bottom accent line on image */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 via-amber-300 to-transparent" />
      </div>

      {/* Content section */}
      <div className="flex flex-col p-3.5 sm:p-5 flex-1 min-w-0">
        <span
          className="
            inline-block w-fit text-[11px] font-medium
            text-amber-700 bg-amber-50
            border border-amber-200
            px-2.5 py-1 rounded-full
            truncate mb-2
          "
        >
          {category}
        </span>

        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug truncate">
          {name}
        </h3>

        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5 text-sm">
          <span className="flex items-center gap-1 text-neutral-800 font-medium">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            {rating}
            <span className="text-neutral-400 font-normal">
              ({reviewCount})
            </span>
          </span>

          <span className="flex items-start gap-1 text-neutral-500 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" strokeWidth={1.7} />
            {address}
          </span>

          {verified && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <BadgeCheck className="w-4 h-4" />
              Verified
            </span>
          )}
        </div>

        <p className="mt-2.5 text-sm text-neutral-500 leading-relaxed line-clamp-2">
          {description}
        </p>

        <Link
          to={`/business/${listing.id}`}
          className="
            mt-3.5 inline-flex items-center justify-center gap-1.5
            self-start h-11
            bg-amber-400 hover:bg-amber-500
            text-neutral-900 text-sm font-semibold
            px-5 rounded-full
            transition-all duration-200
            hover:shadow-md hover:shadow-amber-400/30
            focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1
          "
        >
          View Details
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;