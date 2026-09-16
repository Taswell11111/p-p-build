import { useState } from 'react';
import {
  ArrowLeft,
  X,
  Plus,
  ShoppingCart,
  Check,
  Smartphone,
  Sparkles,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Product } from '../../types/cellular';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  compareProducts: Product[];
  allCatalogProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onSelectProductToCompare: (product: Product, replaceIndex?: number) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product) => void;
  onGoToProduct: (product: Product) => void;
}

export function CompareDrawer({
  isOpen,
  onClose,
  compareProducts,
  allCatalogProducts,
  onRemoveProduct,
  onSelectProductToCompare,
  onClearAll,
  onAddToCart,
  onGoToProduct
}: CompareDrawerProps) {
  // Local brand/model picker state for replacing or adding devices
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<Record<number, string>>({});

  if (!isOpen) return null;

  const brands = Array.from(new Set(allCatalogProducts.map((p) => p.brand))).sort();

  // Slots: always support comparing up to 4 devices, minimum 2 slots shown
  const maxSlots = 4;
  const displayedSlots = Math.max(2, Math.min(maxSlots, compareProducts.length + 1));

  const specRows = [
    {
      label: 'Price',
      getValue: (p: Product) => (
        <div className="font-extrabold text-[#0070d2] text-base">
          R {p.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          {p.comparePrice && p.comparePrice > p.price && (
            <span className="text-xs text-slate-400 font-normal line-through block">
              R {p.comparePrice.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      )
    },
    {
      label: 'Brand',
      getValue: (p: Product) => <span className="font-bold text-slate-800 uppercase">{p.brand}</span>
    },
    {
      label: 'Main Camera',
      getValue: (p: Product) => <span>{p.mainCamera || (p.badge?.includes('Camera') ? '50 MP' : '13 MP')}</span>
    },
    {
      label: 'Front Camera',
      getValue: (p: Product) => <span>{p.frontCamera || (p.price > 2000 ? '13 MP' : '5 MP')}</span>
    },
    {
      label: 'Screen Size',
      getValue: (p: Product) => <span>{p.screenSize || (p.price < 500 ? '2.4" Display' : '6.5" HD+')}</span>
    },
    {
      label: 'Battery',
      getValue: (p: Product) => <span>{p.battery || (p.price < 500 ? '1000 mAh' : '5000 mAh')}</span>
    },
    {
      label: 'Storage / RAM',
      getValue: (p: Product) => (
        <span>
          {p.storage || '64GB'} {p.ram ? `/ ${p.ram}` : ''}
        </span>
      )
    },
    {
      label: 'Network / SIM',
      getValue: (p: Product) => (
        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          {p.network} ({p.simType || 'Dual SIM'})
        </span>
      )
    },
    {
      label: 'Lay-by Available',
      getValue: (p: Product) =>
        p.hasLayBy ? (
          <span className="text-emerald-700 font-bold text-xs">
            Yes (from R{p.layByMonthly}/pm &bull; 3 mos)
          </span>
        ) : (
          <span className="text-slate-400">Cash / Card only</span>
        )
    },
    {
      label: 'Stock Availability',
      getValue: (p: Product) =>
        p.inStock ? (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
            <Check className="w-3.5 h-3.5" /> In Stock
          </span>
        ) : (
          <span className="text-rose-600 font-bold text-xs">Sold Out</span>
        )
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-start bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Device Comparison Box"
      onClick={onClose}
    >
      {/* Sliding Comparison Box Container - slides open to the right from the left */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-r-2 border-slate-200 animate-in slide-in-from-left duration-300"
      >
        {/* Top Control Bar with Back / Dock button */}
        <header className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          {/* Back button to move tray back to docking button (matching screenshot 2: "← Back") */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-[#0070d2] transition-colors cursor-pointer group bg-white border border-slate-300 rounded-lg px-3 py-1.5 shadow-xs"
            aria-label="Move comparison tray back to docking button"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#0070d2]" />
            <span>&larr; Back to Store</span>
          </button>

          {/* Central Title */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Let&rsquo;s start Comparing
            </h1>
            <p className="text-xs text-slate-500">
              Comparing {compareProducts.length} of {maxSlots} devices side-by-side
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {compareProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}

            {/* Dock Tray to Left Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Move tray back to dock"
              aria-label="Close compare box"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Comparison Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
          {compareProducts.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0070d2] flex items-center justify-center mx-auto">
                <Smartphone className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">No devices in comparison yet</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click &ldquo;Add to compare&rdquo; on any phone or pick from the dropdowns below to compare prices, cameras, battery life, and specs.
              </p>
              <button
                onClick={() => {
                  // Add default example devices
                  const p1 = allCatalogProducts.find((p) => p.id === 'hisense-u608') || allCatalogProducts[0];
                  const p2 = allCatalogProducts.find((p) => p.id === 'samsung-a16') || allCatalogProducts[1];
                  if (p1) onSelectProductToCompare(p1);
                  if (p2) onSelectProductToCompare(p2);
                }}
                className="bg-[#0070d2] hover:bg-[#005bb5] text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Load Sample Comparison (Hisense U608 vs Samsung A16)</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Product Cards Row (Matching Screenshot 2 exactly) */}
              <div
                className="grid gap-4 sm:gap-6 items-start pb-6 border-b border-slate-200"
                style={{
                  gridTemplateColumns: `repeat(${displayedSlots}, minmax(0, 1fr))`
                }}
              >
                {Array.from({ length: displayedSlots }).map((_, slotIdx) => {
                  const product = compareProducts[slotIdx];

                  if (product) {
                    const currentBrand = selectedBrandFilter[slotIdx] || product.brand;
                    const availableModelsForBrand = allCatalogProducts.filter(
                      (p) => !currentBrand || p.brand.toLowerCase() === currentBrand.toLowerCase()
                    );

                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between relative group hover:border-[#0070d2]/40 transition-all"
                      >
                        {/* Option to remove device with an 'X' button at each device (matching user instruction & screenshot 2) */}
                        <button
                          onClick={() => onRemoveProduct(product.id)}
                          aria-label={`Remove ${product.title} from comparison`}
                          className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 shadow-xs"
                          title="Remove device"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Brand Selector Dropdown matching Screenshot 2 */}
                        <div className="mb-2 pr-8">
                          <label htmlFor={`brand-select-${slotIdx}`} className="sr-only">
                            Select Brand
                          </label>
                          <select
                            id={`brand-select-${slotIdx}`}
                            value={currentBrand}
                            onChange={(e) => {
                              const newBrand = e.target.value;
                              setSelectedBrandFilter((prev) => ({ ...prev, [slotIdx]: newBrand }));
                              const firstModel = allCatalogProducts.find(
                                (p) => p.brand.toLowerCase() === newBrand.toLowerCase()
                              );
                              if (firstModel) {
                                onSelectProductToCompare(firstModel, slotIdx);
                              }
                            }}
                            className="w-full bg-slate-50 border border-slate-300 rounded text-xs px-2.5 py-1.5 text-slate-700 font-medium focus:border-[#0070d2] outline-hidden cursor-pointer"
                          >
                            <option value="">Select a Brand</option>
                            {brands.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Model Selector Dropdown matching Screenshot 2 */}
                        <div className="mb-3">
                          <label htmlFor={`model-select-${slotIdx}`} className="sr-only">
                            Select Device Model
                          </label>
                          <select
                            id={`model-select-${slotIdx}`}
                            value={product.id}
                            onChange={(e) => {
                              const chosen = allCatalogProducts.find((p) => p.id === e.target.value);
                              if (chosen) {
                                onSelectProductToCompare(chosen, slotIdx);
                              }
                            }}
                            className="w-full bg-slate-50 border border-slate-300 rounded text-xs px-2.5 py-1.5 text-slate-900 font-semibold focus:border-[#0070d2] outline-hidden cursor-pointer truncate"
                          >
                            {availableModelsForBrand.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Product Image Frame with gray card background matching Screenshot 2 */}
                        <div className="w-full aspect-[4/4] bg-slate-100/70 rounded-lg p-3 flex items-center justify-center relative mb-3 overflow-hidden border border-slate-100">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Title below Photo matching Screenshot 2 */}
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 text-center line-clamp-2 min-h-[2.5rem] mb-3">
                          {product.title}
                        </h3>

                        {/* Primary Button "Go to Product" matching Screenshot 2 */}
                        <div className="space-y-1.5 mt-auto">
                          <button
                            onClick={() => onGoToProduct(product)}
                            className="w-full py-2.5 px-4 bg-[#0070d2] hover:bg-[#005bb5] active:bg-[#004880] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Go to Product</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onAddToCart(product)}
                            disabled={!product.inStock}
                            className="w-full py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add to Cart &bull; R {product.price.toLocaleString('en-ZA')}</span>
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // Empty Slot Placeholder: lets user pick a device to add to comparison
                  const availableForSlot = allCatalogProducts.filter(
                    (p) => !compareProducts.some((cp) => cp.id === p.id)
                  );

                  return (
                    <div
                      key={`empty-slot-${slotIdx}`}
                      className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[340px]"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center shadow-xs">
                        <Plus className="w-6 h-6 text-[#0070d2]" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-800">
                          Add Device to Compare
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Select from our catalog to compare specs
                        </p>
                      </div>

                      <select
                        onChange={(e) => {
                          const chosen = allCatalogProducts.find((p) => p.id === e.target.value);
                          if (chosen) onSelectProductToCompare(chosen);
                        }}
                        defaultValue=""
                        className="w-full max-w-xs bg-white border border-slate-300 rounded text-xs px-2.5 py-2 text-slate-700 font-medium focus:border-[#0070d2] outline-hidden cursor-pointer"
                      >
                        <option value="" disabled>
                          + Select a Device
                        </option>
                        {availableForSlot.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.brand} - {p.title} (R{p.price})
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              {/* Comparison Spec Table matching Screenshot 2 */}
              <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    Detailed Specification Breakdown
                  </span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {specRows.map((row, idx) => (
                    <div
                      key={row.label}
                      className={`grid items-center ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                      }`}
                      style={{
                        gridTemplateColumns: `140px repeat(${displayedSlots}, minmax(0, 1fr))`
                      }}
                    >
                      {/* Spec Label */}
                      <div className="p-3.5 font-bold text-slate-500 border-r border-slate-100 bg-slate-50/40">
                        {row.label}
                      </div>

                      {/* Values per slot */}
                      {Array.from({ length: displayedSlots }).map((_, slotIdx) => {
                        const prod = compareProducts[slotIdx];
                        return (
                          <div
                            key={slotIdx}
                            className="p-3.5 border-r last:border-r-0 border-slate-100 text-slate-800"
                          >
                            {prod ? row.getValue(prod) : <span className="text-slate-300">&mdash;</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
