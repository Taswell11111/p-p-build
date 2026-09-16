import { useState } from 'react';
import {
  Sliders,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Maximize2,
  RotateCw,
  CheckCircle,
  AlertTriangle,
  Layers,
  ShoppingBag,
  Code2,
  Terminal,
  Play,
  RotateCcw,
  ExternalLink,
  Lock,
  Globe,
  Settings,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Copy,
  Check
} from 'lucide-react';
import {
  ViewportDevice,
  EnvironmentMode,
  ShopifySectionConfig,
  QATestResult,
  DataLayerEvent
} from '../../types/cellular';

interface DevToolbarProps {
  environment: EnvironmentMode;
  onSelectEnvironment: (env: EnvironmentMode) => void;
  viewport: ViewportDevice;
  onSelectViewport: (vp: ViewportDevice) => void;
  isLandscape: boolean;
  onToggleOrientation: () => void;
  scale: number;
  onSelectScale: (scale: number) => void;
  sectionConfig: ShopifySectionConfig;
  onUpdateSectionConfig: (config: Partial<ShopifySectionConfig>) => void;
  onInjectTestProduct: () => void;
  onToggleAllStock: () => void;
  allInStock: boolean;
  onResetCatalog: () => void;
  qaResults: QATestResult[];
  onRunQATests: () => void;
  isQARunning: boolean;
  dataLayerEvents: DataLayerEvent[];
  onClearEvents: () => void;
}

export function DevToolbar({
  environment,
  onSelectEnvironment,
  viewport,
  onSelectViewport,
  isLandscape,
  onToggleOrientation,
  scale,
  onSelectScale,
  sectionConfig,
  onUpdateSectionConfig,
  onInjectTestProduct,
  onToggleAllStock,
  allInStock,
  onResetCatalog,
  qaResults,
  onRunQATests,
  isQARunning,
  dataLayerEvents,
  onClearEvents
}: DevToolbarProps) {
  const [activeTab, setActiveTab] = useState<'controls' | 'sections' | 'sandbox' | 'qa' | 'events' | 'liquid'>('controls');
  const [isExpanded, setIsExpanded] = useState(true);
  const [copiedLiquid, setCopiedLiquid] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  const passedTestsCount = qaResults.filter((t) => t.status === 'passed').length;
  const failedTestsCount = qaResults.filter((t) => t.status === 'failed').length;

  const devices: { id: ViewportDevice; label: string; icon: any; width: string }[] = [
    { id: 'mobile-sm', label: 'Mobile (375px)', icon: Smartphone, width: '375px' },
    { id: 'mobile-lg', label: 'Mobile L (414px)', icon: Smartphone, width: '414px' },
    { id: 'tablet', label: 'Tablet (768px)', icon: Tablet, width: '768px' },
    { id: 'laptop', label: 'Laptop (1024px)', icon: Laptop, width: '1024px' },
    { id: 'desktop', label: 'Desktop (1440px)', icon: Monitor, width: '1440px' },
    { id: 'fluid', label: 'Fluid (100%)', icon: Maximize2, width: '100%' }
  ];

  const handleCopyLiquid = () => {
    const liquidCode = `{
  "sections": {
    "slider_8PqGGi": {
      "type": "custom-slider",
      "settings": {
        "autoplay": ${sectionConfig.sliderAutoplay},
        "speed": ${sectionConfig.sliderSpeed}
      }
    },
    "custom_circle_slider_rKbW3A": {
      "type": "custom-circle-slider",
      "settings": {
        "title": "Browse Our Trending Categories"
      }
    },
    "featured_collection_hEVekH": {
      "type": "featured-collection",
      "settings": {
        "collection": "cellular-cellphones",
        "products_to_show": 12,
        "columns_desktop": ${sectionConfig.productsPerRow}
      }
    },
    "featured_collection_iiXXnM": {
      "type": "featured-collection",
      "settings": {
        "collection": "cellular-cellphones-samsung",
        "products_to_show": 12,
        "columns_desktop": ${sectionConfig.productsPerRow}
      }
    },
    "featured_collection_Kw49GF": {
      "type": "featured-collection",
      "settings": {
        "collection": "cellular-cellphones-hisense",
        "products_to_show": 12,
        "columns_desktop": ${sectionConfig.productsPerRow}
      }
    }
  },
  "order": [
    "slider_8PqGGi",
    "custom_circle_slider_rKbW3A",
    "featured_collection_hEVekH",
    "featured_collection_iiXXnM",
    "featured_collection_Kw49GF"
  ]
}`;
    navigator.clipboard.writeText(liquidCode);
    setCopiedLiquid(true);
    setTimeout(() => setCopiedLiquid(false), 2000);
  };

  const handleCopyEvent = (ev: DataLayerEvent) => {
    navigator.clipboard.writeText(JSON.stringify(ev.payload, null, 2));
    setCopiedEventId(ev.id);
    setTimeout(() => setCopiedEventId(null), 2000);
  };

  return (
    <div
      id="pep-frontend-dev-toolbar"
      className="w-full bg-slate-900 text-white border-b-2 border-amber-400 shadow-xl z-50 transition-all"
    >
      {/* Top Bar Header */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black text-xs uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>PEP FE DevLab</span>
          </div>

          {/* Environment Switcher Pills */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => onSelectEnvironment('production')}
              className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                environment === 'production'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>pepstores.com (Prod)</span>
            </button>
            <button
              onClick={() => onSelectEnvironment('qa-staging')}
              className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                environment === 'qa-staging'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-900" />
              <span>pep-ecom-qa (QA)</span>
            </button>
          </div>

          {/* QA Health Pill */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
            <span className="text-slate-400">QA Audit:</span>
            <span className="text-emerald-400 font-bold">{passedTestsCount} Pass</span>
            {failedTestsCount > 0 && (
              <span className="text-rose-400 font-bold">/ {failedTestsCount} Fail</span>
            )}
          </div>
        </div>

        {/* Viewport Device Quick Toggles */}
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            {devices.map((d) => {
              const Icon = d.icon;
              const isSelected = viewport === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => onSelectViewport(d.id)}
                  title={`${d.label} - ${d.width}`}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#005596] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>

          {/* Rotate Orientation */}
          {viewport !== 'fluid' && viewport !== 'desktop' && (
            <button
              onClick={onToggleOrientation}
              title={`Orientation: ${isLandscape ? 'Landscape' : 'Portrait'}`}
              className={`p-1.5 rounded border border-slate-700 transition-colors cursor-pointer ${
                isLandscape ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Scale Selector */}
          <select
            value={scale}
            onChange={(e) => onSelectScale(parseFloat(e.target.value))}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] rounded px-1.5 py-1 focus:border-[#005596] outline-hidden cursor-pointer"
            title="Preview Zoom Scale"
          >
            <option value="1">100%</option>
            <option value="0.9">90%</option>
            <option value="0.8">80%</option>
            <option value="0.75">75%</option>
          </select>

          {/* Collapse/Expand Panel Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-white cursor-pointer ml-1"
            title={isExpanded ? 'Collapse Dev Controls' : 'Expand Dev Controls'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Workbench Body */}
      {isExpanded && (
        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800">
          {/* Sub-Tabs Bar */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'controls' ? 'bg-[#005596] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Theme Controls</span>
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'sections' ? 'bg-[#005596] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Shopify Sections</span>
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'sandbox' ? 'bg-[#005596] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Product Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'qa' ? 'bg-[#005596] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Automated QA Audit ({passedTestsCount}/10)</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'events' ? 'bg-[#005596] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>dataLayer Logs ({dataLayerEvents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('liquid')}
              className={`flex items-center gap-1.5 py-1 px-3 rounded font-bold transition-all cursor-pointer ${
                activeTab === 'liquid' ? 'bg-[#005596] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Liquid Schema</span>
            </button>
          </div>

          {/* Tab 1: Theme Controls */}
          {activeTab === 'controls' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <div className="font-bold text-slate-200 mb-2 flex items-center justify-between">
                  <span>Grid Density</span>
                  <span className="text-amber-400 font-mono">{sectionConfig.productsPerRow} cols</span>
                </div>
                <div className="flex gap-1.5">
                  {([2, 3, 4, 5] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => onUpdateSectionConfig({ productsPerRow: num })}
                      className={`flex-1 py-1 rounded font-bold text-xs cursor-pointer ${
                        sectionConfig.productsPerRow === num
                          ? 'bg-[#005596] text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <div className="font-bold text-slate-200 mb-2 flex items-center justify-between">
                  <span>Hero Slider Speed</span>
                  <span className="text-amber-400 font-mono">{sectionConfig.sliderSpeed}s</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={sectionConfig.sliderSpeed}
                  onChange={(e) => onUpdateSectionConfig({ sliderSpeed: parseInt(e.target.value) })}
                  className="w-full accent-[#005596] cursor-pointer"
                />
              </div>

              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <div className="font-bold text-slate-200 mb-2">Card Style</div>
                <div className="flex gap-1.5">
                  {(['standard', 'compact', 'detailed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateSectionConfig({ cardStyle: st })}
                      className={`flex-1 py-1 px-1 rounded font-bold text-[11px] capitalize cursor-pointer ${
                        sectionConfig.cardStyle === st
                          ? 'bg-[#005596] text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex flex-col justify-between">
                <div className="font-bold text-slate-200 mb-2">Display Toggles</div>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={sectionConfig.showLayByCalculations}
                      onChange={(e) => onUpdateSectionConfig({ showLayByCalculations: e.target.checked })}
                      className="accent-[#005596] rounded"
                    />
                    <span>Lay-by Info</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={sectionConfig.showStockIndicators}
                      onChange={(e) => onUpdateSectionConfig({ showStockIndicators: e.target.checked })}
                      className="accent-[#005596] rounded"
                    />
                    <span>Stock Badge</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Section Visibility */}
          {activeTab === 'sections' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              {[
                { key: 'heroSlider', label: 'Promo Slider (slider_8PqGGi)' },
                { key: 'trendingCircles', label: 'Category Circles (circle_slider)' },
                { key: 'collection1', label: 'Collection 1 (NEW-IN)' },
                { key: 'collection2', label: 'Collection 2 (SAMSUNG ONLY)' },
                { key: 'collection3', label: 'Collection 3 (Hisense Finest)' },
                { key: 'ricaSection', label: 'RICA & Lay-by Guide' }
              ].map(({ key, label }) => {
                const isEnabled = sectionConfig[key as keyof ShopifySectionConfig] as boolean;
                return (
                  <button
                    key={key}
                    onClick={() =>
                      onUpdateSectionConfig({ [key]: !isEnabled })
                    }
                    className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isEnabled
                        ? 'bg-slate-800 border-[#005596] text-white shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <span className="font-bold">{label}</span>
                    <span
                      className={`text-[10px] font-mono mt-2 inline-block px-1.5 py-0.5 rounded w-fit ${
                        isEnabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isEnabled ? 'VISIBLE' : 'HIDDEN'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 3: Product Sandbox */}
          {activeTab === 'sandbox' && (
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={onToggleAllStock}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>{allInStock ? 'Simulate Out of Stock Items' : 'Set All Products In Stock'}</span>
              </button>

              <button
                onClick={onInjectTestProduct}
                className="bg-[#005596] hover:bg-[#003d6d] text-white px-3 py-2 rounded-md font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Inject Extreme Test Phone (Edge Cases)</span>
              </button>

              <button
                onClick={onResetCatalog}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-md font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to PEP Live Catalog</span>
              </button>
            </div>
          )}

          {/* Tab 4: Automated QA Audit */}
          {activeTab === 'qa' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-300">
                  Automated verification checklist for the PEP Stores cellular storefront:
                </div>
                <button
                  onClick={onRunQATests}
                  disabled={isQARunning}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Play className={`w-3.5 h-3.5 ${isQARunning ? 'animate-spin' : ''}`} />
                  <span>{isQARunning ? 'Running Audits...' : 'Run All 10 QA Checks'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {qaResults.map((test) => (
                  <div
                    key={test.id}
                    className={`p-2 rounded border flex items-start justify-between gap-2 ${
                      test.status === 'passed'
                        ? 'bg-emerald-950/30 border-emerald-800/60'
                        : test.status === 'failed'
                        ? 'bg-rose-950/30 border-rose-800/60'
                        : 'bg-slate-800/40 border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200 flex items-center gap-1.5">
                        {test.status === 'passed' ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        ) : test.status === 'failed' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-500 animate-spin" />
                        )}
                        <span>{test.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 pl-5">
                        {test.details}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold flex-shrink-0 ${
                        test.status === 'passed'
                          ? 'bg-emerald-900 text-emerald-300'
                          : 'bg-rose-900 text-rose-300'
                      }`}
                    >
                      {test.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: dataLayer Logs */}
          {activeTab === 'events' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Google Tag Manager (GTM-NLPJX9) &amp; Shopify Analytics Events</span>
                <button
                  onClick={onClearEvents}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Clear Event Stream
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 max-h-48 overflow-y-auto font-mono text-[11px] divide-y divide-slate-900 space-y-1">
                {dataLayerEvents.length === 0 ? (
                  <div className="text-slate-600 italic py-2">
                    No events captured yet. Click a product, filter carrier, or add to cart to trigger events.
                  </div>
                ) : (
                  dataLayerEvents.map((ev) => (
                    <div key={ev.id} className="py-1 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-amber-400 font-bold">event: &ldquo;{ev.event}&rdquo;</span>
                        <span className="text-slate-600 ml-2">[{ev.timestamp}]</span>
                        <pre className="text-slate-300 text-[10px] mt-0.5 overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(ev.payload, null, 1)}
                        </pre>
                      </div>
                      <button
                        onClick={() => handleCopyEvent(ev)}
                        className="text-slate-400 hover:text-white p-1 rounded bg-slate-800 cursor-pointer flex-shrink-0"
                        title="Copy Event Payload"
                      >
                        {copiedEventId === ev.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Shopify Liquid Schema */}
          {activeTab === 'liquid' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>templates/page.cellular.json (Shopify OS 2.0 theme configuration)</span>
                <button
                  onClick={handleCopyLiquid}
                  className="flex items-center gap-1 bg-[#005596] hover:bg-[#003d6d] text-white px-2.5 py-1 rounded text-xs font-bold cursor-pointer"
                >
                  {copiedLiquid ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLiquid ? 'Copied to Clipboard!' : 'Copy Liquid JSON'}</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48">
{`{
  "sections": {
    "slider_8PqGGi": {
      "type": "custom-slider",
      "settings": { "autoplay": ${sectionConfig.sliderAutoplay}, "speed": ${sectionConfig.sliderSpeed} }
    },
    "custom_circle_slider_rKbW3A": {
      "type": "custom-circle-slider",
      "settings": { "title": "Browse Our Trending Categories" }
    },
    "featured_collection_hEVekH": {
      "type": "featured-collection",
      "settings": { "collection": "cellular-cellphones", "columns_desktop": ${sectionConfig.productsPerRow} }
    },
    "featured_collection_iiXXnM": {
      "type": "featured-collection",
      "settings": { "collection": "cellular-cellphones-samsung", "columns_desktop": ${sectionConfig.productsPerRow} }
    },
    "featured_collection_Kw49GF": {
      "type": "featured-collection",
      "settings": { "collection": "cellular-cellphones-hisense", "columns_desktop": ${sectionConfig.productsPerRow} }
    }
  }
}`}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
