import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);

  useEffect(() => {
    if (index === null) return;

    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onChange, onClose]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 80;
    if (info.offset.x > threshold) {
      onChange((index! - 1 + images.length) % images.length);
    } else if (info.offset.x < -threshold) {
      onChange((index! + 1) % images.length);
    }
    x.set(0);
  };

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(23,23,23,0.96)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            ref={closeRef}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-6 right-6 p-2 text-[#E0E0E0]/80 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }}
            className="absolute left-4 md:left-8 p-2 text-[#E0E0E0]/70 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <motion.img
            key={images[index]}
            src={images[index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
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
            onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length); }}
            className="absolute right-4 md:right-8 p-2 text-[#E0E0E0]/70 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.2em] text-[#E0E0E0]/50 uppercase">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
