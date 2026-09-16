import { ShieldCheck, FileText, CreditCard, Store, HelpCircle, CheckCircle2 } from 'lucide-react';

export function RicaInfoSection() {
  return (
    <section 
      id="shopify-section-cellular-rica-compliance" 
      className="w-full bg-slate-50 py-10 border-b border-slate-200"
      aria-label="PEP Cellular RICA & Services Guide"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#005596] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#005596]" />
            <span>South African Regulatory &amp; In-Store Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How to RICA &amp; Buy Your Phone at PEP
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Stay legally connected. All SIM cards and cellular devices can be RICA registered at any of our 2,600+ PEP stores nationwide.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: RICA Checklist */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                RICA Requirements
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                To activate a new SIM card or cellular bundle in-store, bring:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Green barcoded SA ID book, Smart ID card, or valid passport</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Proof of residential address (municipal bill, bank statement &lt; 3 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Your new SIM card or PEP cellular order receipt</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-[#005596]" />
              <span>Instant activation right at the PEP till counter.</span>
            </div>
          </div>

          {/* Card 2: FoneYam & Lay-by Buddy */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                FoneYam &amp; PEP Lay-by
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Get your desired smartphone with zero interest or flexible small payments:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span><strong>PEP Lay-by:</strong> Up to 3 months to pay, 0% interest, no credit checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span><strong>FoneYam:</strong> Device financing with low monthly installments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Deposit:</strong> Start with as little as R100 deposit on Lay-by.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
              <Store className="w-3 h-3 text-[#005596]" />
              <span>Manage payments easily via Lay-by Buddy online.</span>
            </div>
          </div>

          {/* Card 3: Network Lock vs Any SIM */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#005596] flex items-center justify-center mb-3">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                Network Deals vs Any SIM
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Understanding your cellular choices at PEP:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#005596] mt-0.5 flex-shrink-0" />
                  <span><strong>Network Locked:</strong> Unbeatable subsidized prices locked to Vodacom, MTN, Telkom, or Cell C.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#005596] mt-0.5 flex-shrink-0" />
                  <span><strong>Any SIM:</strong> Factory unlocked devices ready for any carrier of your choice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#005596] mt-0.5 flex-shrink-0" />
                  <span><strong>Pre-Owned iPads:</strong> Certified quality at half the standard retail price.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>12-Month PEP warranty on brand new cellular hardware.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
