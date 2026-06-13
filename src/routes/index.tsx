import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { albums } from "@/lib/albums";
import { BentoCard } from "@/components/BentoCard";

const HERO_BASE = "https://images.unsplash.com/photo-1516280440614-37939bbacd81";
const HERO_SRCSET = [800, 1200, 1600, 2000, 2400, 3000]
  .map((w) => `${HERO_BASE}?auto=format&fit=crop&w=${w}&q=85 ${w}w`)
  .join(", ");
const HERO_FALLBACK = `${HERO_BASE}?auto=format&fit=crop&w=2400&q=85`;
const OG_IMAGE = "https://bosseditsfotos.space/og-cover.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boss_Edit_Fotos — Photography Portfolio" },
      { name: "description", content: "Cinematic photography across dance, worship, and live events. Selected work by Boss_Edit_Fotos." },
      { property: "og:title", content: "Boss_Edit_Fotos — Photography Portfolio" },
      { property: "og:description", content: "Cinematic photography across dance, worship, and live events." },
      { property: "og:url", content: "https://bosseditsfotos.space/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:title", content: "Boss_Edit_Fotos — Photography Portfolio" },
      { name: "twitter:description", content: "Cinematic photography across dance, worship, and live events." },
    ],
    links: [
      { rel: "canonical", href: "https://bosseditsfotos.space/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[92vh] w-full overflow-hidden">
        <motion.img
          src={HERO_FALLBACK}
          srcSet={HERO_SRCSET}
          sizes="100vw"
          alt="Boss_Edit_Fotos hero"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/40" />
        <motion.div
          className="absolute bottom-12 left-6 md:bottom-20 md:left-14 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-5">
            Portfolio · Vol. 06 · 2026
          </p>
          <h1 className="font-display text-5xl md:text-8xl text-white leading-[0.92] tracking-[-0.02em]">
            Boss_Edit_<span className="italic font-light">Fotos</span>
          </h1>
          <p className="mt-5 max-w-md text-sm md:text-base text-white/70 leading-relaxed">
            Frames from the stage, the sanctuary, and everything between. An
            ongoing study of motion, light and quiet.
          </p>
          <Link
            to="/album/$slug"
            params={{ slug: "dance-and-motion" }}
            className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white border-b border-white/40 hover:border-white pb-1 transition-colors"
          >
            Enter the work <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* Bento */}
      <section className="px-4 md:px-8 mt-16 md:mt-24">
        <div className="flex items-end justify-between max-w-[1800px] mx-auto mb-8 px-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45 mb-3">Selected work</p>
            <h2 className="font-display text-3xl md:text-5xl text-[#E0E0E0]">Four chapters.</h2>
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/50">
            {albums.length} albums · {albums.reduce((n, a) => n + a.photos.length, 0)} frames
          </span>
        </div>
        <div className="mx-auto max-w-[1800px] grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
          {albums.map((a, i) => (
            <BentoCard key={a.slug} album={a} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
