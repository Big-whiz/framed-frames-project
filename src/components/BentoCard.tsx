import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Album } from "@/lib/albums";
import { SmartImage } from "@/components/SmartImage";

const spanClass: Record<Album["span"], string> = {
  col: "md:col-span-2 aspect-[16/10]",
  row: "md:row-span-2 aspect-[4/5] md:aspect-auto",
  square: "aspect-square",
};

export function BentoCard({ album, index }: { album: Album; index: number }) {
  const cover = album.photos[0]?.id ?? "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={spanClass[album.span]}
    >
      <Link
        to="/album/$slug"
        params={{ slug: album.slug }}
        className="group relative block h-full w-full overflow-hidden"
      >
        <SmartImage
          photoId={cover}
          width={1600}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]"
          style={{ filter: "brightness(0.7)" }}
          alt={`${album.title} cover`}
        />
        {/* Always-on gradient + caption */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/60 mb-2">
                {album.tagline}
              </p>
              <h3 className="font-display text-2xl md:text-4xl text-white leading-none">
                {album.title}
              </h3>
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/45 mt-3">
                {album.photos.length} frames
              </p>
            </div>
            <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
