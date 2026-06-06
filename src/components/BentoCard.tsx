import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Album } from "@/lib/albums";

const spanClass: Record<Album["span"], string> = {
  col: "md:col-span-2 aspect-[16/10]",
  row: "md:row-span-2 aspect-[4/5] md:aspect-auto",
  square: "aspect-square",
};

export function BentoCard({ album }: { album: Album }) {
  return (
    <Link
      to="/album/$slug"
      params={{ slug: album.slug }}
      className={`group relative overflow-hidden ${spanClass[album.span]}`}
    >
      <motion.img
        src={album.cover}
        alt={album.title}
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={{ scale: 1.03, filter: "brightness(0.55)" }}
        initial={{ filter: "brightness(0.85)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-3">
          {album.tagline}
        </p>
        <h3 className="font-display text-3xl md:text-5xl text-white">
          {album.title}
        </h3>
      </div>
    </Link>
  );
}
