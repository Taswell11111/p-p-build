import { Eye, ShoppingCart, Star, ArrowUpDown, Check } from 'lucide-react';
import { Product } from '../../types/cellular';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
  cardStyle?: 'standard' | 'compact' | 'detailed';
  showLayBy?: boolean;
  showStockIndicators?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isCompared = false,
  onToggleCompare,
  cardStyle = 'standard',
  showLayBy = true,
  showStockIndicators = true
}: ProductCardProps) {
  const getNetworkBadge = (network: string) => {
    switch (network) {
      case 'Vodacom':
        return { label: 'Vodacom', bg: 'bg-red-600 text-white' };
      case 'MTN':
        return { label: 'MTN', bg: 'bg-amber-400 text-slate-900 font-extrabold' };
      case 'Telkom':
        return { label: 'Telkom', bg: 'bg-sky-600 text-white' };
      case 'Cell C':
        return { label: 'Cell C', bg: 'bg-purple-700 text-white' };
      default:
        return { label: 'Any SIM', bg: 'bg-emerald-700 text-white' };
    }
  };

  const netBadge = getNetworkBadge(product.network);
  const discountAmount = product.comparePrice && product.comparePrice > product.price 
    ? product.comparePrice - product.price 
    : 0;

  return (
    <div
      id={`pep-product-${product.id}`}
      className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#005596]/40 transition-all duration-300"
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-[4/4.2] bg-slate-50 overflow-hidden flex items-center justify-center p-3 border-b border-slate-100">
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-xs ${netBadge.bg}`}>
            {netBadge.label}
          </span>
          {product.badge && (
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-slate-900 shadow-xs">
              {product.badge}
            </span>
          )}
          {discountAmount > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">
              Save R{discountAmount.toLocaleString('en-ZA')}
            </span>
          )}
        </div>

        {/* Stock / Sold-out badge */}
        {showStockIndicators && !product.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-20 flex items-center justify-center">
            <span className="bg-white text-slate-900 font-bold text-xs px-3 py-1 rounded shadow-md uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick Action Overlay (Shopify Minimog Pattern) */}
        <div className="absolute bottom-2 inset-x-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold py-2 px-2 rounded shadow-md flex items-center justify-center gap-1 border border-slate-200 transition-colors cursor-pointer"
            aria-label={`Quick view ${product.title}`}
          >
            <Eye className="w-3.5 h-3.5 text-[#005596]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Specs Subline */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-[#005596] uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              {product.storage && <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">{product.storage}</span>}
              {product.simType && <span className="text-slate-400">{product.simType}</span>}
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#005596] transition-colors mb-2">
            {product.title}
          </h3>

          {/* Star Rating snippet */}
          <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="text-slate-700 font-bold text-[11px]">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Lay-by Info */}
        <div className="pt-2 border-t border-slate-100 mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-[#005596]">
              R {product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                R {product.comparePrice.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          {/* Lay-by calculation */}
          {showLayBy && product.hasLayBy && (
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Lay-by from <strong>R{product.layByMonthly}/pm</strong> (3 months)
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`w-full mt-3 py-2 px-3 rounded-md font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
              product.inStock
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
          </button>

          {/* Add to compare toggle matching Screenshot 1 */}
          <button
            onClick={() => onToggleCompare && onToggleCompare(product)}
            className={`w-full mt-2 py-1 px-2 rounded-md font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
              isCompared
                ? 'bg-blue-50 text-[#0070d2] border-blue-200 font-bold'
                : 'bg-slate-50 text-slate-600 hover:text-[#0070d2] hover:bg-blue-50/50 border-slate-200'
            }`}
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>{isCompared ? '✓ Added to compare' : 'Add to compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
