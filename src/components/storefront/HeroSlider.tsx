import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from 'lucide-react';
import { HeroBanner } from '../../types/cellular';

interface HeroSliderProps {
  banners: HeroBanner[];
  autoplay: boolean;
  speed: number; // in seconds
  onSelectCategory?: (category: string) => void;
}

export function HeroSlider({ banners, autoplay, speed, onSelectCategory }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    setIsPlaying(autoplay);
  }, [autoplay]);

  useEffect(() => {
    if (!isPlaying || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [isPlaying, banners.length, speed]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (!banners.length) return null;

  const currentBanner = banners[currentIndex];

  return (
    <section 
      id="shopify-section-template--24309056667944__slider_8PqGGi" 
      className="relative w-full bg-slate-900 overflow-hidden shadow-md group"
      aria-label="Cellular Deals Promotions Carousel"
    >
      {/* Aspect Ratio Container for 1920x400 banner standard */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] md:aspect-[32/9] max-h-[380px] flex items-center justify-center bg-slate-950">
        <img
          key={currentBanner.id}
          src={currentBanner.image}
          alt={currentBanner.title}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
          loading="eager"
        />

        {/* Subtle gradient overlay for accessibility & badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Slide Content Caption Overlay */}
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 max-w-xl text-white">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-900 mb-2 shadow-xs">
            {currentBanner.badge}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md text-white mb-1">
            {currentBanner.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 drop-shadow-sm mb-3">
            {currentBanner.subtitle}
          </p>
          <button
            onClick={() => onSelectCategory && onSelectCategory(currentBanner.category)}
            className="inline-flex items-center gap-2 bg-[#005596] hover:bg-[#004880] text-white font-bold text-xs px-4 py-2 rounded-md shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{currentBanner.cta}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Prev/Next Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-xs transition-opacity opacity-70 group-hover:opacity-100 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-xs transition-opacity opacity-70 group-hover:opacity-100 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators and Play/Pause Bar */}
        <div className="absolute bottom-3 right-4 z-30 flex items-center gap-2 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause Auto-rotation' : 'Play Auto-rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <div className="flex items-center gap-1.5">
            {banners.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-amber-400'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-[10px] text-slate-300 font-mono ml-1">
            {currentIndex + 1}/{banners.length}
          </span>
        </div>
      </div>
    </section>
  );
}
