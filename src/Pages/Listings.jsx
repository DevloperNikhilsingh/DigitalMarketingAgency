import React, { useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Star, MapPin, BadgeCheck, SlidersHorizontal, X, Search } from "lucide-react";
import listingData from "../Component/TopListings/listingData";
import Navbar from "../Component/Layout/Navbar";
import Footer from "../Component/Layout/Footer ";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ---- FilterPanel ab BAHAR hai, top-level component hai — isliye render pe recreate nahi hoga ----
function FilterPanel({
  nameFilter,
  setNameFilter,
  locationFilter,
  setLocationFilter,
  allCategories,
  selectedCategories,
  toggleCategory,
  minRating,
  setMinRating,
  verifiedOnly,
  setVerifiedOnly,
  activeFilterCount,
  clearAllFilters,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-stone-900">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Name search */}
      <div>
        <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-3">
          Business Name
        </h4>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Search by name"
            className="w-full text-sm border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      {/* Location search */}
      <div>
        <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-3">
          Location
        </h4>
        <div className="relative">
          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Search by area / city"
            className="w-full text-sm border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-3">
          Category
        </h4>
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {allCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-stone-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-3">
          Rating
        </h4>
        <div className="space-y-2.5">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="w-4 h-4 text-amber-500 border-stone-300 focus:ring-amber-400 cursor-pointer"
              />
              <span className="flex items-center gap-1 text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                <Star size={13} className="fill-amber-500 text-amber-500" />
                {r}+ & above
              </span>
            </label>
          ))}
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="text-xs text-stone-400 hover:text-amber-600 mt-1"
            >
              Reset rating
            </button>
          )}
        </div>
      </div>

      {/* Verified only */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
          />
          <span className="flex items-center gap-1 text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
            <BadgeCheck size={14} className="text-green-600" />
            Verified businesses only
          </span>
        </label>
      </div>
    </div>
  );
}

export default function Listings() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const locationQuery = (searchParams.get("location") || "").trim().toLowerCase();
  const categorySlug = (searchParams.get("category") || "").trim().toLowerCase();

  const hasSearch = query !== "" || locationQuery !== "" || categorySlug !== "";

  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  const navigate = useNavigate();

  const allCategories = useMemo(() => {
    const unique = [...new Set(listingData.map((item) => item.category))];
    return unique.sort();
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearAllFilters = () => {
    setNameFilter("");
    setLocationFilter("");
    setSelectedCategories([]);
    setMinRating(0);
    setVerifiedOnly(false);
  };

  const activeFilterCount =
    (nameFilter.trim() !== "" ? 1 : 0) +
    (locationFilter.trim() !== "" ? 1 : 0) +
    selectedCategories.length +
    (minRating > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const results = useMemo(() => {
    return listingData.filter((item) => {
      const matchesQuery =
        query === "" ||
        item.category.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query);

      const matchesLocation =
        locationQuery === "" ||
        item.location.toLowerCase().includes(locationQuery) ||
        (item.area && item.area.toLowerCase().includes(locationQuery)) ||
        (item.address && item.address.toLowerCase().includes(locationQuery));

      const itemCategorySlug = slugify(item.category).replace(/-/g, "").replace(/s$/, "");
      const urlCategorySlug = categorySlug.replace(/-/g, "").replace(/s$/, "");

      const matchesCategory =
        categorySlug === "" ||
        itemCategorySlug.includes(urlCategorySlug) ||
        urlCategorySlug.includes(itemCategorySlug);

      // ✅ ab yeh naam ke saath category mein bhi dhundega
      const matchesName =
        nameFilter.trim() === "" ||
        item.name.toLowerCase().includes(nameFilter.trim().toLowerCase()) ||
        item.category.toLowerCase().includes(nameFilter.trim().toLowerCase());

      const matchesLocationFilter =
        locationFilter.trim() === "" ||
        item.location.toLowerCase().includes(locationFilter.trim().toLowerCase()) ||
        (item.area && item.area.toLowerCase().includes(locationFilter.trim().toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(locationFilter.trim().toLowerCase()));

      const matchesSidebarCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      const matchesRating = item.rating >= minRating;

      const matchesVerified = !verifiedOnly || item.verified;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesCategory &&
        matchesName &&
        matchesLocationFilter &&
        matchesSidebarCategory &&
        matchesRating &&
        matchesVerified
      );
    });
  }, [
    query,
    locationQuery,
    categorySlug,
    nameFilter,
    locationFilter,
    selectedCategories,
    minRating,
    verifiedOnly,
  ]);

  const filterPanelProps = {
    nameFilter,
    setNameFilter,
    locationFilter,
    setLocationFilter,
    allCategories,
    selectedCategories,
    toggleCategory,
    minRating,
    setMinRating,
    verifiedOnly,
    setVerifiedOnly,
    activeFilterCount,
    clearAllFilters,
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
  <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
    {hasSearch ? (
      <>
        {results.length} result{results.length !== 1 ? "s" : ""} found
        {query && <> for "{query}"</>}
        {locationQuery && <> in {locationQuery}</>}
        {categorySlug && <> in {categorySlug.replace(/-/g, " ")}</>}
      </>
    ) : (
      "All Listings"
    )}
  </h1>

  <div className="flex items-center gap-3">
    {hasSearch && (
      <button
        onClick={() => navigate("/listing")}
        className="flex items-center gap-2 border border-stone-300 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 transition"
      >
        <X size={15} />
        View All Listings
      </button>
    )}

    <button
      onClick={() => setShowMobileFilters(true)}
      className="lg:hidden flex items-center gap-2 border border-stone-300 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 bg-white"
    >
      <SlidersHorizontal size={15} />
      Filters
      {activeFilterCount > 0 && (
        <span className="bg-amber-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {activeFilterCount}
        </span>
      )}
    </button>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] gap-8 mt-8">
          <aside className="hidden lg:block">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 sticky top-24">
              <FilterPanel {...filterPanelProps} />
            </div>
          </aside>

          <div>
            {results.length === 0 ? (
              <p className="text-sm text-stone-500">
                No matching businesses found. Try a different keyword, location or filter.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        {item.area ? `${item.area}, ` : ""}{item.location}{item.address}
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
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <h2 className="text-base font-bold text-stone-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              <FilterPanel {...filterPanelProps} />
            </div>
            <div className="p-5 border-t border-stone-100">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-amber-400 hover:bg-amber-500 text-stone-900 font-semibold text-sm py-2.5 rounded-full transition"
              >
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}