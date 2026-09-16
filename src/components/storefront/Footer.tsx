import { Phone, Mail, MapPin, Package, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="shopify-section-sections--24309056504104__footer" className="bg-[#002f54] text-white">
      {/* Top Banner: Service Promises */}
      <div className="border-b border-blue-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#004880] text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">2,600+ Stores</div>
              <div className="text-slate-300">Across South Africa &amp; neighboring countries</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#004880] text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">PAXI Parcel Service</div>
              <div className="text-slate-300">Send &amp; receive bags from only R59.95</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#004880] text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">RICA In-Store</div>
              <div className="text-slate-300">Quick SIM registration at any PEP till</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#004880] text-amber-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">PEP Lay-by</div>
              <div className="text-slate-300">3 Months to pay with 0% interest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8 text-xs">
        {/* Column 1: Brand & Contact */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#005596] text-white px-3 py-1 rounded font-extrabold text-xl tracking-tighter border-b-2 border-amber-400">
              PEP
            </div>
            <span className="font-bold text-slate-300 uppercase tracking-wider text-xs">Cellular Department</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
            PEP is Africa’s largest single-brand retailer, delivering unbeatable cellular prices, network-locked value, smartphones, and PAXI parcel convenience since 1965.
          </p>
          <div className="pt-2 text-slate-200 space-y-1.5 font-medium">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Care: <strong>0860 737 000</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Email: <strong>support@pepstores.com</strong></span>
            </div>
          </div>
        </div>

        {/* Column 2: Cellular Categories */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-amber-400 text-xs">Cellular</h4>
          <ul className="space-y-1.5 text-slate-300">
            <li><a href="#cellular-smartphones" className="hover:text-white transition-colors">Smartphones</a></li>
            <li><a href="#cellular-feature-phones" className="hover:text-white transition-colors">Feature Phones</a></li>
            <li><a href="#cellular-accessories" className="hover:text-white transition-colors">Accessories &amp; Powerbanks</a></li>
            <li><a href="#cellular-sim-deals" className="hover:text-white transition-colors">SIM Cards &amp; Airtime</a></li>
            <li><a href="#cellular-foneyam" className="hover:text-white transition-colors">FoneYam Device Financing</a></li>
            <li><a href="#cellular-pre-owned" className="hover:text-white transition-colors">Pre-Owned iPads</a></li>
          </ul>
        </div>

        {/* Column 3: Network Partners */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-amber-400 text-xs">Networks</h4>
          <ul className="space-y-1.5 text-slate-300">
            <li><span className="hover:text-white">Vodacom Prepaid</span></li>
            <li><span className="hover:text-white">MTN Y&rsquo;ello Deals</span></li>
            <li><span className="hover:text-white">Telkom Mobile</span></li>
            <li><span className="hover:text-white">Cell C All-in-One</span></li>
            <li><span className="hover:text-white">Any SIM (Unlocked)</span></li>
            <li><span className="hover:text-white">RICA Regulations</span></li>
          </ul>
        </div>

        {/* Column 4: Customer Help */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-amber-400 text-xs">Customer Service</h4>
          <ul className="space-y-1.5 text-slate-300">
            <li><span className="hover:text-white">Find a Store</span></li>
            <li><span className="hover:text-white">Lay-by Buddy</span></li>
            <li><span className="hover:text-white">PAXI Tracking</span></li>
            <li><span className="hover:text-white">Warranty &amp; Returns</span></li>
            <li><span className="hover:text-white">Terms &amp; Conditions</span></li>
            <li><span className="hover:text-white">Privacy Policy</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Payment Options */}
      <div className="border-t border-blue-950 py-4 px-4 bg-[#00223d] text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            &copy; {new Date().getFullYear()} PEP Stores (Pty) Ltd. Part of Pepkor Holdings. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#003866] text-slate-200 px-2 py-0.5 rounded font-bold text-[10px]">VISA</span>
            <span className="bg-[#003866] text-slate-200 px-2 py-0.5 rounded font-bold text-[10px]">MASTERCARD</span>
            <span className="bg-[#003866] text-slate-200 px-2 py-0.5 rounded font-bold text-[10px]">OZOW</span>
            <span className="bg-[#003866] text-slate-200 px-2 py-0.5 rounded font-bold text-[10px]">INSTANT EFT</span>
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-extrabold text-[10px]">PEP LAY-BY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
