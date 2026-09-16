import { ArrowRight, Sparkles } from 'lucide-react';
import { Collection, Product } from '../../types/cellular';
import { ProductCard } from './ProductCard';

interface CollectionSectionProps {
  key?: string;
  collection: Collection;
  sectionId: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  compareProductIds?: string[];
  onToggleCompare?: (product: Product) => void;
  productsPerRow?: 2 | 3 | 4 | 5;
  cardStyle?: 'standard' | 'compact' | 'detailed';
  showLayBy?: boolean;
  showStockIndicators?: boolean;
  onViewCollection?: (handle: string) => void;
}

export function CollectionSection({
  collection,
  sectionId,
  onAddToCart,
  onQuickView,
  compareProductIds = [],
  onToggleCompare,
  productsPerRow = 4,
  cardStyle = 'standard',
  showLayBy = true,
  showStockIndicators = true,
  onViewCollection
}: CollectionSectionProps) {
  const getGridColsClass = () => {
    switch (productsPerRow) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 5:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
      case 4:
      default:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  if (!collection.products.length) return null;

  return (
    <section
      id={sectionId}
      className="w-full py-8 border-b border-slate-200 bg-white"
      aria-label={collection.title}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-5 bg-[#005596] rounded-xs inline-block" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                {collection.title}
              </h2>
            </div>
            {collection.description && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-4">
                {collection.description}
              </p>
            )}
          </div>

          <button
            onClick={() => onViewCollection && onViewCollection(collection.handle)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#005596] hover:text-[#003d6d] hover:underline cursor-pointer pl-4 sm:pl-0"
          >
            <span>View All ({collection.products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className={`grid gap-4 sm:gap-6 ${getGridColsClass()}`}>
          {collection.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isCompared={compareProductIds.includes(product.id)}
              onToggleCompare={onToggleCompare}
              cardStyle={cardStyle}
              showLayBy={showLayBy}
              showStockIndicators={showStockIndicators}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
