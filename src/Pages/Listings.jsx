import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import listingData from "../Component/TopListings/listingData";
import Navbar from "../Component/Layout/Navbar";
import Footer from "../Component/Layout/Footer ";

export default function Listings() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const locationQuery = (searchParams.get("location") || "").trim().toLowerCase();

  const hasSearch = query !== "" || locationQuery !== "";

  const results = listingData.filter((item) => {
    const matchesQuery =
      query === "" ||
      item.category.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query);

    const matchesLocation =
      locationQuery === "" ||
      item.location.toLowerCase().includes(locationQuery) ||
      (item.area && item.area.toLowerCase().includes(locationQuery));

    return matchesQuery && matchesLocation;
  });

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
          {hasSearch ? (
            <>
              {results.length} result{results.length !== 1 ? "s" : ""} found
              {query && <> for "{query}"</>}
              {locationQuery && <> in {locationQuery}</>}
            </>
          ) : (
            "All Listings"
          )}
        </h1>

        {results.length === 0 ? (
          <p className="text-sm text-stone-500 mt-6">
            No matching businesses found. Try a different keyword or location.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {results.map((item) => (
              <Link
                to={`/business/${item.id}`}
                key={item.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition"
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-xs font-semibold text-amber-600">{item.category}</p>
                  <h3 className="text-sm font-semibold text-stone-900 mt-1">{item.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                    <MapPin size={12} />
                    {item.area ? `${item.area}, ` : ""}{item.location}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                      <Star size={12} className="fill-amber-500 text-amber-500" />
                      {item.rating} ({item.reviewCount})
                    </span>
                    {item.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <BadgeCheck size={13} />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}