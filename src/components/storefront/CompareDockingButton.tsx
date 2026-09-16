import { useState, useRef, useEffect } from 'react';
import type { PointerEvent } from 'react';
import { ChevronRight, GripVertical } from 'lucide-react';

interface CompareDockingButtonProps {
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function CompareDockingButton({ count, isOpen, onToggle }: CompareDockingButtonProps) {
  // Vertical position as percentage of viewport height (default: 50% = middle)
  const [topPercent, setTopPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pep_compare_dock_top_pct');
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 12 && val <= 88) return val;
      }
    } catch {
      // Fallback
    }
    return 50;
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartTopPercentRef = useRef<number>(50);
  const hasMovedRef = useRef<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Clamping helper
  const clampPercent = (val: number) => Math.min(88, Math.max(12, val));

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Only respond to primary button / touch
    if (e.button !== 0) return;

    dragStartYRef.current = e.clientY;
    dragStartTopPercentRef.current = topPercent;
    hasMovedRef.current = false;

    // Capture pointer so movement continues smoothly even outside button bounds
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Pointer Move
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

    const deltaY = e.clientY - dragStartYRef.current;

    // If moved more than 4px, treat as vertical drag
    if (Math.abs(deltaY) > 4) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }

      const viewportHeight = window.innerHeight || 800;
      const deltaPercent = (deltaY / viewportHeight) * 100;
      const newPercent = clampPercent(dragStartTopPercentRef.current + deltaPercent);
      setTopPercent(newPercent);
    }
  };

  // Pointer Up / Cancel
  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (hasMovedRef.current) {
      // User slid the button vertically: persist position and do NOT toggle tray
      try {
        localStorage.setItem('pep_compare_dock_top_pct', topPercent.toString());
      } catch {
        // Ignore
      }
      setTimeout(() => {
        setIsDragging(false);
        hasMovedRef.current = false;
      }, 50);
    } else {
      // User just clicked / tapped without dragging: toggle compare tray
      setIsDragging(false);
      onToggle();
    }
  };

  // Keep within bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      setTopPercent((prev) => clampPercent(prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      ref={buttonRef}
      aria-label="Product comparison panel trigger"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        top: `${topPercent}%`,
        transform: 'translateY(-50%)',
        touchAction: 'none'
      }}
      className={`fixed left-0 z-40 select-none transition-shadow ${
        isDragging ? 'cursor-grabbing scale-105 shadow-2xl' : 'cursor-grab group'
      }`}
    >
      {/* Visual edge rail shown while dragging to provide tactile guidance */}
      {isDragging && (
        <div className="fixed left-0 top-0 bottom-0 w-1.5 bg-blue-500/30 backdrop-blur-xs pointer-events-none animate-pulse" />
      )}

      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Move comparison tray back to dock' : `View Compare (${count} devices) - Drag up/down to move`}
        title="Drag up or down to reposition • Click to View Compare"
        className={`relative flex flex-col items-center justify-center py-3 px-1.5 sm:px-2 rounded-r-xl border-y border-r transition-colors duration-200 ${
          isOpen
            ? 'bg-[#003d6d] text-white border-blue-400 ring-2 ring-blue-300'
            : isDragging
            ? 'bg-[#005596] text-white border-blue-300 shadow-2xl shadow-blue-600/40 ring-2 ring-amber-300'
            : 'bg-[#0070d2] hover:bg-[#005596] text-white border-blue-300/40 shadow-xl hover:shadow-blue-500/25 hover:translate-x-0.5'
        }`}
        style={{ minWidth: '42px' }}
      >
        {/* Subtle Vertical Drag Handle Grip */}
        <div
          className="flex flex-col items-center gap-0.5 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
          title="Drag up or down"
        >
          <GripVertical className="w-3.5 h-3.5 text-white/90" />
        </div>

        {/* Count Badge Circle matching Screenshot 1 */}
        <div className="w-6 h-6 rounded-full bg-white text-[#0070d2] font-black text-xs flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform">
          {count}
        </div>

        {/* Vertical Text "View Compare" matching Screenshot 1 */}
        <div
          className="text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap py-1 [writing-mode:vertical-rl] rotate-180 pointer-events-none"
          style={{ letterSpacing: '0.05em' }}
        >
          {isOpen ? 'Close Compare' : 'View Compare'}
        </div>

        {/* Direction indicator arrow */}
        <div className="mt-2 text-white/80 group-hover:text-white pointer-events-none">
          <ChevronRight
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'group-hover:translate-x-0.5'
            }`}
          />
        </div>

        {/* Pulse beacon when items exist and drawer is closed */}
        {!isOpen && count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
          </span>
        )}
      </div>
    </aside>
  );
}
