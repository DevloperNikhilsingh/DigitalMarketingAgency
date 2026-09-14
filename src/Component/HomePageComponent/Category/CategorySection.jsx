import categories from "./CategoryData";
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          Browse by{" "}
          <span className="text-amber-500">Category</span>
        </h2> */}

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              icon={cat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;