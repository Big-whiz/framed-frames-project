import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Instagram, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Boss_Edit_Fotos" },
      { name: "description", content: "Get in touch with Boss_Edit_Fotos for commissions, prints, and event coverage." },
      { property: "og:title", content: "Contact — Boss_Edit_Fotos" },
      { property: "og:description", content: "Get in touch for commissions, prints, and event coverage." },
      { property: "og:url", content: "https://bosseditsfotos.space/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://bosseditsfotos.space/contact" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main className="pt-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto py-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-[11px] uppercase tracking-[0.35em] text-[#E0E0E0]/50 mb-6"
        >
          Contact
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-[#E0E0E0] leading-[1.05]"
        >
          Let's make something with light.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-8 max-w-xl text-[#E0E0E0]/65 text-base md:text-lg leading-relaxed"
        >
          Available for commissions in dance, worship, and live events. Prints
          and licensing on request. Most messages get a reply within 48 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10"
        >
          <a
            href="mailto:hello@bosseditsfotos.space"
            className="group bg-[#121212] p-7 hover:bg-[#1a1a1a] transition-colors"
          >
            <Mail className="text-[#E0E0E0]/60 group-hover:text-white transition-colors" size={18} />
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45">Email</p>
            <p className="mt-2 font-display text-lg text-[#E0E0E0] group-hover:text-white">
              hello@bosseditsfotos.space
            </p>
          </a>
          <a
            href="https://instagram.com/boss_edit_fotos"
            target="_blank" rel="noreferrer noopener"
            className="group bg-[#121212] p-7 hover:bg-[#1a1a1a] transition-colors"
          >
            <Instagram className="text-[#E0E0E0]/60 group-hover:text-white transition-colors" size={18} />
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45">Instagram</p>
            <p className="mt-2 font-display text-lg text-[#E0E0E0] group-hover:text-white">
              @boss_edit_fotos
            </p>
          </a>
          <div className="bg-[#121212] p-7">
            <MapPin className="text-[#E0E0E0]/60" size={18} />
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45">Based</p>
            <p className="mt-2 font-display text-lg text-[#E0E0E0]">Lagos, Nigeria · Worldwide</p>
          </div>
          <div className="bg-[#121212] p-7">
            <Clock className="text-[#E0E0E0]/60" size={18} />
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45">Response</p>
            <p className="mt-2 font-display text-lg text-[#E0E0E0]">Within 48 hours</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
