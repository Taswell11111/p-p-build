import { Filter, RotateCcw } from 'lucide-react';
import { NetworkCarrier, BrandName } from '../../types/cellular';

interface FilterToolbarProps {
  selectedNetwork: NetworkCarrier;
  onSelectNetwork: (network: NetworkCarrier) => void;
  selectedBrand: BrandName;
  onSelectBrand: (brand: BrandName) => void;
  priceRange: string;
  onSelectPriceRange: (range: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  totalFilteredCount: number;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export function FilterToolbar({
  selectedNetwork,
  onSelectNetwork,
  selectedBrand,
  onSelectBrand,
  priceRange,
  onSelectPriceRange,
  sortBy,
  onSelectSortBy,
  totalFilteredCount,
  onResetFilters,
  isFiltered
}: FilterToolbarProps) {
  const networks: { id: NetworkCarrier; label: string; color: string }[] = [
    { id: 'All', label: 'All Networks', color: 'bg-slate-100 text-slate-700' },
    { id: 'Vodacom', label: 'Vodacom', color: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'MTN', label: 'MTN', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    { id: 'Telkom', label: 'Telkom', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'Cell C', label: 'Cell C', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'Any SIM', label: 'Any SIM / Unlocked', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ];

  const brands: BrandName[] = [
    'All',
    'Samsung',
    'Hisense',
    'Apple',
    'Xiaomi',
    'Vivo',
    'Motorola',
    'Oppo',
    'Huawei',
    'Honor',
    'Stylo'
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-1000', label: 'Under R1,000' },
    { id: '1000-3000', label: 'R1,000 - R3,000' },
    { id: 'above-3000', label: 'R3,000+' }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-22 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Row 1: Carrier Network Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5 overflow-x-auto scrollbar-none pb-1">
          <div className="flex items-center gap-1.5 flex-nowrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline flex-shrink-0">
              Carrier:
            </span>
            {networks.map((net) => {
              const isSelected = selectedNetwork === net.id;
              return (
                <button
                  key={net.id}
                  onClick={() => onSelectNetwork(net.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#005596] text-white border-[#005596] shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {net.label}
                </button>
              );
            })}
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 whitespace-nowrap cursor-pointer flex-shrink-0 bg-rose-50 px-2 py-0.8 rounded"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>

        {/* Row 2: Secondary Dropdowns (Brand, Price, Sorter) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Brand Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="pep-brand-select" className="text-slate-500 font-medium">Brand:</label>
              <select
                id="pep-brand-select"
                value={selectedBrand}
                onChange={(e) => onSelectBrand(e.target.value as BrandName)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium focus:border-[#005596] outline-hidden cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'All' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="pep-price-select" className="text-slate-500 font-medium">Price:</label>
              <select
                id="pep-price-select"
                value={priceRange}
                onChange={(e) => onSelectPriceRange(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium focus:border-[#005596] outline-hidden cursor-pointer"
              >
                {priceRanges.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-slate-400 font-medium">
              Showing <strong className="text-slate-800">{totalFilteredCount}</strong> cellular deals
            </span>
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              id="pep-sort-select"
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-semibold focus:border-[#005596] outline-hidden cursor-pointer"
            >
              <option value="featured">Featured Deals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="brand">Brand (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
