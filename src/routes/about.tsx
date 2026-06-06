import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Boss_Edit_Fotos" },
      { name: "description", content: "About Boss_Edit_Fotos — photographer of dance, worship, and live events." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="pt-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto py-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] uppercase tracking-[0.35em] text-[#E0E0E0]/50 mb-6"
        >
          About
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-[#E0E0E0] leading-[1.05]"
        >
          A photographer chasing motion, light, and quiet moments.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 space-y-6 text-[#E0E0E0]/75 text-base md:text-lg leading-relaxed"
        >
          <p>
            Boss_Edit_Fotos is the work of an independent photographer documenting dance
            performances, worship gatherings, and live events. Every frame is a study of
            energy — the kind that only exists for a fraction of a second.
          </p>
          <p>
            Based on stage edges and balconies. Available worldwide.
          </p>
          <p>
            For commissions, prints, or licensing —{" "}
            <a
              href="mailto:hello@bosseditsfotos.space"
              className="text-white underline decoration-[#E0E0E0]/30 underline-offset-4 hover:decoration-white"
            >
              hello@bosseditsfotos.space
            </a>
            .
          </p>
        </motion.div>
      </div>
    </main>
  );
}
