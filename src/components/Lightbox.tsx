import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photoSrcSet, photoUrl, type Photo } from "@/lib/albums";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

export function Lightbox({ photos, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4]);

  useEffect(() => {
    if (index === null) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return onChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") return onChange((index - 1 + photos.length) % photos.length);
      // Trap focus inside the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [index, photos.length, onChange, onClose]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 80;
    if (index === null) return;
    if (info.offset.x > threshold) onChange((index - 1 + photos.length) % photos.length);
    else if (info.offset.x < -threshold) onChange((index + 1) % photos.length);
    x.set(0);
  };

  const current = index !== null ? photos[index] : null;
  const nextId = index !== null ? photos[(index + 1) % photos.length]?.id : null;
  const prevId = index !== null ? photos[(index - 1 + photos.length) % photos.length]?.id : null;

  return (
    <AnimatePresence>
      {index !== null && current && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(18,18,18,0.97)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${photos.length}`}
        >
          {/* Preload neighbours so swipe/arrow feels instant */}
          {nextId && <link rel="preload" as="image" href={photoUrl(nextId, 1600)} />}
          {prevId && <link rel="preload" as="image" href={photoUrl(prevId, 1600)} />}

          <button
            ref={closeRef}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-5 right-5 p-2 text-[#E0E0E0]/80 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={26} />
          </button>

          <div className="absolute top-6 left-6 text-[11px] tracking-[0.3em] uppercase text-[#E0E0E0]/60 z-10">
            {String(index + 1).padStart(2, "0")} <span className="opacity-40">/ {String(photos.length).padStart(2, "0")}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onChange((index - 1 + photos.length) % photos.length); }}
            className="absolute left-2 md:left-6 p-2 text-[#E0E0E0]/70 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          <motion.img
            key={current.id}
            src={photoUrl(current.id, 2400)}
            srcSet={photoSrcSet(current.id)}
            sizes="90vw"
            alt={current.caption ?? ""}
            className="max-h-[85vh] max-w-[92vw] object-contain select-none"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            style={{ x, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />

          <button
            onClick={(e) => { e.stopPropagation(); onChange((index + 1) % photos.length); }}
            className="absolute right-2 md:right-6 p-2 text-[#E0E0E0]/70 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          {(current.caption || current.location) && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              {current.caption && (
                <p className="font-display text-[#E0E0E0] text-base md:text-lg">
                  {current.caption}
                </p>
              )}
              {current.location && (
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#E0E0E0]/50 mt-1">
                  {current.location}
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
