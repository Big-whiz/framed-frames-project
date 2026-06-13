import { Link } from "@tanstack/react-router";
import { AtSign, Mail } from "lucide-react";
import { albums } from "@/lib/albums";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/5 pt-16 pb-10 px-6 md:px-10">
      <div className="mx-auto max-w-[1800px] grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-[#E0E0E0]">Boss_Edit_Fotos</p>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#E0E0E0]/55">
            Independent photographer. Available for commissions in dance,
            worship and live event coverage — based on stage edges, worldwide.
          </p>
          <a
            href="mailto:hello@bosseditsfotos.space"
            className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#E0E0E0]/80 hover:text-white transition-colors"
          >
            <Mail size={14} /> hello@bosseditsfotos.space
          </a>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45 mb-4">Albums</p>
          <ul className="space-y-2 text-[13px] text-[#E0E0E0]/75">
            {albums.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/album/$slug"
                  params={{ slug: a.slug }}
                  className="hover:text-white transition-colors"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#E0E0E0]/45 mb-4">Elsewhere</p>
          <ul className="space-y-2 text-[13px] text-[#E0E0E0]/75">
            <li>
              <a
                href="https://instagram.com/boss_edit_fotos"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <AtSign size={14} /> Instagram
              </a>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1800px] mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-[#E0E0E0]/40">
        <p>© 2026 Boss_Edit_Fotos. All frames reserved.</p>
        <p>Lagos · Worldwide</p>
      </div>
    </footer>
  );
}
