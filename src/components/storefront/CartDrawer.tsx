import { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../../types/cellular';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutSuccess(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#005596]" />
            <h2 className="text-base font-extrabold text-slate-900">Your PEP Cart</h2>
            <span className="text-xs bg-[#005596] text-white px-2 py-0.5 rounded-full font-bold">
              {items.reduce((acc, it) => acc + it.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3 bg-blue-50/70 border-b border-blue-100 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#005596]" />
              {remainingForFreeShipping > 0
                ? `Add R ${remainingForFreeShipping.toFixed(2)} more for Free PEP Store Delivery`
                : '🎉 You have qualified for FREE PEP Store Delivery!'}
            </span>
            <span className="text-[#005596] font-bold">{progressPct.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#005596] transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {checkoutSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Order Simulated Successfully!</h3>
              <p className="text-xs text-slate-500">
                Front-end checkout flow tested. In production, this redirects to Shopify checkout or PEP in-store Lay-by collection.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Your cellular cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Explore our Samsung, Hisense, Apple, and cellular accessories specials to add items.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#005596] hover:bg-[#003d6d] text-white text-xs font-bold px-4 py-2 rounded-md shadow-xs cursor-pointer"
              >
                Browse Cellular Deals
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="py-3 flex gap-3 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain rounded bg-slate-50 p-1 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold text-[#005596]">
                      {item.product.brand} &bull; {item.product.network}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 truncate mb-1">
                    {item.product.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-extrabold text-[#005596]">
                      R {(item.product.price * item.quantity).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </div>
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-slate-800 font-bold min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and checkout */}
        {items.length > 0 && !checkoutSuccess && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  R {subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Store Delivery</span>
                <span className="font-semibold text-emerald-600">
                  {remainingForFreeShipping === 0 ? 'FREE' : 'R 49.99'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Estimated Total (ZAR)</span>
                <span className="text-[#005596]">
                  R {(subtotal + (remainingForFreeShipping === 0 ? 0 : 49.99)).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-blue-50/50 p-2 rounded border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-[#005596] flex-shrink-0" />
              <span>RICA registration completed seamlessly upon collection at your selected PEP store.</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-md shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              {isCheckingOut ? (
                <span>Simulating Checkout...</span>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
