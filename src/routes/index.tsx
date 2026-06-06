import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { albums } from "@/lib/albums";
import { BentoCard } from "@/components/BentoCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boss_Edit_Fotos — Photography Portfolio" },
      { name: "description", content: "Selected work in dance, worship, and live events." },
    ],
  }),
  component: Index,
});

const HERO = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2400&q=85";

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <motion.img
          src={HERO}
          alt="Boss_Edit_Fotos hero"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "brightness(0.65)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/40" />
        <motion.div
          className="absolute bottom-12 left-6 md:bottom-20 md:left-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 mb-4">
            Portfolio · 2026
          </p>
          <h1 className="font-display text-5xl md:text-8xl text-white leading-[0.95]">
            Boss_Edit_Fotos
          </h1>
          <p className="mt-4 max-w-md text-sm md:text-base text-white/70">
            Frames from the stage, the sanctuary, and everything between.
          </p>
        </motion.div>
      </section>

      {/* Bento */}
      <section className="px-4 md:px-8 mt-8">
        <div className="flex items-end justify-between max-w-[1800px] mx-auto mb-6 px-2">
          <h2 className="font-display text-2xl md:text-3xl text-[#E0E0E0]">Selected Work</h2>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/50">
            {albums.length} albums
          </span>
        </div>
        <div className="mx-auto max-w-[1800px] grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
          {albums.map((a) => (
            <BentoCard key={a.slug} album={a} />
          ))}
        </div>
      </section>
    </main>
  );
}
