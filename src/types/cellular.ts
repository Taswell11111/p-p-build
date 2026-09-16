export type NetworkCarrier = 'All' | 'Vodacom' | 'MTN' | 'Telkom' | 'Cell C' | 'Any SIM';

export type BrandName = 
  | 'All' 
  | 'Samsung' 
  | 'Hisense' 
  | 'Apple' 
  | 'Xiaomi' 
  | 'Vivo' 
  | 'Motorola' 
  | 'Oppo' 
  | 'Huawei' 
  | 'Honor' 
  | 'Stylo';

export interface Product {
  id: string;
  title: string;
  brand: string;
  network: string;
  price: number;
  comparePrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  hasLayBy: boolean;
  layByMonthly: number;
  isPreOwned?: boolean;
  storage?: string;
  simType?: string;
  description?: string;
  badge?: string;
  mainCamera?: string;
  frontCamera?: string;
  screenSize?: string;
  battery?: string;
  ram?: string;
  os?: string;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  products: Product[];
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  category: string;
  badge: string;
}

export interface CategoryCircle {
  id: string;
  name: string;
  image: string;
  handle: string;
  count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewportDevice = 'mobile-sm' | 'mobile-lg' | 'tablet' | 'laptop' | 'desktop' | 'fluid';

export interface ViewportPreset {
  id: ViewportDevice;
  label: string;
  width: number | null;
  iconName: string;
  description: string;
}

export type EnvironmentMode = 'production' | 'qa-staging';

export interface ShopifySectionConfig {
  heroSlider: boolean;
  trendingCircles: boolean;
  collection1: boolean;
  collection2: boolean;
  collection3: boolean;
  ricaSection: boolean;
  sliderAutoplay: boolean;
  sliderSpeed: number;
  productsPerRow: 2 | 3 | 4 | 5;
  cardStyle: 'standard' | 'compact' | 'detailed';
  showLayByCalculations: boolean;
  showStockIndicators: boolean;
}

export interface QATestResult {
  id: string;
  name: string;
  category: 'responsive' | 'performance' | 'accessibility' | 'ecommerce' | 'compliance';
  status: 'passed' | 'failed' | 'warning' | 'running';
  details: string;
  timestamp?: string;
}

export interface DataLayerEvent {
  id: string;
  event: string;
  timestamp: string;
  payload: Record<string, any>;
}
