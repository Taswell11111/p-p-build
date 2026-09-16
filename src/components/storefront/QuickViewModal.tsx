import { useState } from 'react';
import { X, ShoppingCart, Star, ShieldCheck, CheckCircle2, Truck, ArrowUpDown } from 'lucide-react';
import { Product } from '../../types/cellular';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  isCompared = false,
  onToggleCompare
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const discountAmount = product.comparePrice && product.comparePrice > product.price
    ? product.comparePrice - product.price
    : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Column */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 relative">
          <div className="absolute top-4 left-4 flex flex-col gap-1 items-start z-10">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#005596] text-white">
              {product.network}
            </span>
            {product.badge && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-slate-900">
                {product.badge}
              </span>
            )}
          </div>

          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-64 object-contain mix-blend-multiply"
          />

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Eligible for Free PEP Store Delivery</span>
          </div>
        </div>

        {/* Product Information Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-[#005596] uppercase tracking-wider">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-slate-700">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 id="quickview-title" className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
              {product.title}
            </h2>

            {/* Price Box */}
            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-[#005596]">
                  R {product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    R {product.comparePrice.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
              {discountAmount > 0 && (
                <span className="text-xs font-bold text-rose-600 block mt-0.5">
                  You save R {discountAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              )}
              {product.hasLayBy && (
                <div className="text-xs text-emerald-800 font-semibold mt-1">
                  or 3 monthly payments of <strong>R{product.layByMonthly}</strong> via PEP Lay-by
                </div>
              )}
            </div>

            {/* Specs Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Storage</span>
                <span className="font-bold text-slate-800">{product.storage || '32GB'}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px]">SIM Support</span>
                <span className="font-bold text-slate-800">{product.simType || 'Dual SIM'}</span>
              </div>
            </div>

            {/* RICA Requirement note */}
            <div className="bg-amber-50 border border-amber-200 rounded p-2.5 text-[11px] text-amber-900 flex items-start gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>RICA Required:</strong> Bring your South African ID and proof of residence when collecting in store.
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center border border-slate-300 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-bold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-slate-800 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-bold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 py-2.5 px-4 rounded-md font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                  product.inStock
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-[0.98]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? `Add to Cart • R ${(product.price * quantity).toLocaleString('en-ZA')}` : 'Currently Sold Out'}</span>
              </button>
            </div>

            {/* Add to compare toggle matching Screenshot 1 */}
            <button
              onClick={() => onToggleCompare && onToggleCompare(product)}
              className={`w-full py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                isCompared
                  ? 'bg-blue-50 text-[#0070d2] border-blue-200 font-bold'
                  : 'bg-slate-50 text-slate-700 hover:text-[#0070d2] hover:bg-blue-50/50 border-slate-200'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{isCompared ? '✓ Added to compare' : 'Add to compare'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
