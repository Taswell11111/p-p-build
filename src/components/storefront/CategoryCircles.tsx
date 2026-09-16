import { CategoryCircle } from '../../types/cellular';

interface CategoryCirclesProps {
  categories: CategoryCircle[];
  activeCategory: string | null;
  onSelectCategory: (name: string) => void;
}

export function CategoryCircles({
  categories,
  activeCategory,
  onSelectCategory
}: CategoryCirclesProps) {
  return (
    <section 
      id="shopify-section-template--24309056667944__custom_circle_slider_rKbW3A"
      className="w-full bg-white py-6 border-b border-slate-200"
      aria-label="Trending Cellular Categories"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading matching rich_text_pANGKt */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Browse Our Trending Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose from low-cost smartphones, power banks, SIM packs, and flexible lay-by deals
          </p>
        </div>

        {/* Circular Category Slider Items */}
        <div className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory?.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-hidden"
              >
                <div
                  className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#005596] ring-4 ring-blue-100 scale-105 shadow-md'
                      : 'border-slate-200 group-hover:border-[#005596] group-hover:scale-105'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>

                <span
                  className={`mt-2 text-xs sm:text-sm font-bold tracking-tight text-center transition-colors ${
                    isSelected ? 'text-[#005596]' : 'text-slate-700 group-hover:text-[#005596]'
                  }`}
                >
                  {cat.name}
                </span>

                {cat.count && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    {cat.count} items
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
