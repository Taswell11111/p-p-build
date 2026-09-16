import { useState } from 'react';
import { Search, ShoppingBag, MapPin, User, ChevronDown, Phone, ShieldCheck, Truck, X } from 'lucide-react';
import { Product } from '../../types/cellular';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  environment: 'production' | 'qa-staging';
  onSearch: (query: string) => void;
  searchQuery: string;
  searchResults: Product[];
  onSelectProduct: (product: Product) => void;
}

export function Header({
  cartCount,
  onOpenCart,
  environment,
  onSearch,
  searchQuery,
  searchResults,
  onSelectProduct
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Cellular');

  const navItems = [
    'Shop Online',
    'Women',
    'Men',
    'Baby',
    'Kids',
    'Tweens',
    'School',
    'Home',
    'Beauty',
    'Cellular',
    'Money',
    'PAXI',
    'Lay-by'
  ];

  return (
    <header id="pep-storefront-header" className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top utility strip */}
      <div className="bg-[#003d6d] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium text-amber-300">
              <Truck className="w-3.5 h-3.5" /> Free in-store delivery over R500
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> RICA In-Store available
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden sm:inline bg-[#002848] px-2 py-0.5 rounded text-slate-300 border border-slate-600/40">
              Target: <strong className="text-white">{environment === 'production' ? 'pepstores.com/pages/cellular' : 'pep-ecom-qa.myshopify.com/pages/cellular'}</strong>
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-amber-300">
              <MapPin className="w-3 h-3" /> Store Locator (2,600+ Stores)
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-amber-300">
              <Phone className="w-3 h-3" /> 0860 737 000
            </span>
          </div>
        </div>
      </div>

      {/* Main Branding & Search Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {/* Authentic PEP Logo Graphic */}
            <div className="bg-[#005596] text-white px-3.5 py-1.5 rounded-sm font-extrabold text-2xl tracking-tighter shadow-xs border-b-2 border-amber-400 flex items-center gap-1">
              <span className="text-white">PEP</span>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider bg-[#003d6d] px-1.5 py-0.5 rounded">CELL</span>
            </div>
          </div>
          <span className="hidden lg:inline-block text-xs font-semibold uppercase tracking-wider text-slate-500 pl-2 border-l border-slate-200">
            Cellular Deals &amp; Phones
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <div className="relative flex items-center">
            <input
              id="pep-header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearch(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search Samsung, Hisense, Vodacom, MTN, iPads, accessories..."
              className="w-full bg-slate-50 border border-slate-300 focus:border-[#005596] focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-full pl-10 pr-10 py-2 transition-all outline-hidden ring-1 ring-transparent focus:ring-[#005596]/30"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => {
                  onSearch('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Predictive Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-96 overflow-y-auto">
              <div className="p-2 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 flex justify-between items-center">
                <span>Matching Cellular Products ({searchResults.length})</span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-normal"
                >
                  Close
                </button>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">
                  No cellular products found for &ldquo;{searchQuery}&rdquo;. Try &ldquo;Samsung&rdquo; or &ldquo;Hisense&rdquo;.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {searchResults.slice(0, 6).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-blue-50/60 flex items-center gap-3 transition-colors group cursor-pointer"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-10 h-10 object-contain rounded bg-slate-100 p-0.5 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 group-hover:text-[#005596] truncate">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">{item.brand}</span>
                          <span>&bull;</span>
                          <span className="text-blue-700">{item.network}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#005596]">R {item.price.toLocaleString('en-ZA')}</div>
                        {item.comparePrice && item.comparePrice > item.price && (
                          <div className="text-[11px] text-slate-400 line-through">R {item.comparePrice.toLocaleString('en-ZA')}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            id="pep-account-btn" 
            className="hidden sm:flex items-center gap-1.5 text-slate-700 hover:text-[#005596] text-xs font-semibold py-1.5 px-2.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Sign In</span>
          </button>

          {/* Cart Trigger */}
          <button
            id="pep-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#005596] hover:bg-[#004880] text-white px-3.5 py-2 rounded-md font-bold text-xs shadow-xs transition-all cursor-pointer"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.2 rounded-full text-[11px] min-w-5 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav id="pep-main-nav" className="bg-white border-t border-slate-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2">
          {navItems.map((nav) => {
            const isActive = activeNav === nav;
            const isCellular = nav === 'Cellular';
            return (
              <button
                key={nav}
                onClick={() => setActiveNav(nav)}
                className={`text-xs font-semibold tracking-wide py-2.5 px-3 rounded-none whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#005596] text-[#005596] bg-blue-50/40 font-bold'
                    : 'border-transparent text-slate-700 hover:text-[#005596] hover:border-slate-300'
                } ${isCellular ? 'relative' : ''}`}
              >
                {nav}
                {isCellular && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-900 rounded-sm">
                    QA Focus
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
