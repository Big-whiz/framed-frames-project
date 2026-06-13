import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Boss_Edit_Fotos" },
      { name: "description", content: "About Boss_Edit_Fotos — an independent photographer documenting dance, worship, and live events." },
      { property: "og:title", content: "About — Boss_Edit_Fotos" },
      { property: "og:description", content: "An independent photographer documenting dance, worship, and live events." },
      { property: "og:url", content: "https://bosseditsfotos.space/about" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://bosseditsfotos.space/about" },
    ],
  }),
  component: About,
});

const PROCESS = [
  { k: "01", t: "Listen", d: "Every shoot starts with a conversation about intent — not gear." },
  { k: "02", t: "Frame", d: "I work fast, mostly available light, mostly from the edges of the stage." },
  { k: "03", t: "Edit", d: "Hand-graded, no presets. Delivered in 7–10 days." },
];

const CLIENTS = ["Lagos Dance Co.", "Redeemer's Sanctuary", "Afronation", "Echo Festival", "House of Light", "Private commissions"];

function About() {
  return (
    <main className="pt-28 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <img
              src={portrait}
              alt="Boss_Edit_Fotos portrait"
              className="w-full aspect-[4/5] object-cover bg-neutral-900"
              loading="eager"
            />
          </motion.div>

          <div className="lg:col-span-7 lg:pt-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[11px] uppercase tracking-[0.35em] text-[#E0E0E0]/50 mb-6"
            >
              About · Est. 2021
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl text-[#E0E0E0] leading-[1.02]"
            >
              A photographer chasing motion, light, and quiet moments.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-10 space-y-6 text-[#E0E0E0]/75 text-base md:text-lg leading-relaxed max-w-xl"
            >
              <p>
                Boss_Edit_Fotos is the work of an independent photographer based
                in Lagos, documenting dance performances, worship gatherings,
                and live events across West Africa and beyond. Every frame is a
                study of energy — the kind that only exists for a fraction of
                a second.
              </p>
              <p>
                The work prioritises mood over polish. Available light when
                possible, fast primes, and a quiet shutter. Edits are
                hand-graded — no presets, no AI fills, no shortcuts.
              </p>
              <p>
                Currently shooting on a Leica Q3, a Sony A7 IV, and a 35mm
                Contax G2 for film commissions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="mt-16"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45 mb-6">Process</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {PROCESS.map((p) => (
                  <div key={p.k} className="bg-[#121212] p-5">
                    <p className="font-display text-3xl text-[#E0E0E0]/40">{p.k}</p>
                    <p className="mt-3 font-display text-lg text-[#E0E0E0]">{p.t}</p>
                    <p className="mt-2 text-[13px] text-[#E0E0E0]/60 leading-relaxed">{p.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="mt-16"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45 mb-4">Selected clients</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[#E0E0E0]/70 text-[15px]">
                {CLIENTS.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="mt-16 flex flex-wrap gap-4 items-center"
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-black text-[11px] uppercase tracking-[0.25em] hover:bg-[#E0E0E0] transition-colors"
              >
                Start a commission
              </Link>
              <a
                href="mailto:hello@bosseditsfotos.space"
                className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/65 hover:text-white transition-colors"
              >
                hello@bosseditsfotos.space
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
