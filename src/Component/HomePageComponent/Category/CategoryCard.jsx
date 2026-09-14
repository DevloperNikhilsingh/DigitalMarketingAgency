// src/components/CategorySection/CategoryCard.jsx

import { Link } from "react-router-dom";

const CategoryCard = ({ name, slug, icon: Icon }) => {
  return (
    <Link
      to={`/listing?category=${slug}`}
      className="group flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 rounded-2xl py-8 px-4 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-amber-200 transition-all duration-300"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors duration-300">
        <Icon
          className="w-7 h-7 text-amber-500"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>
      <span className="text-sm md:text-base font-semibold text-gray-800 text-center">
        {name}
      </span>
    </Link>
  );
};

export default CategoryCard;