import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { albums } from "@/lib/albums";

export function SiteNav() {
  const { location } = useRouterState();
  const [open, setOpen] = useState(false);
  const path = location.pathname;
  const linkBase = "transition-colors focus:outline-none focus-visible:text-white";

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="backdrop-blur-md bg-[#121212]/55 border-b border-white/5">
        <nav className="mx-auto max-w-[1800px] flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            to="/"
            className="font-display text-[15px] tracking-tight text-[#E0E0E0] flex items-center gap-2"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#E0E0E0]" aria-hidden />
            Boss_Edit_Fotos
          </Link>
          <div className="flex items-center gap-7 text-[12px] uppercase tracking-[0.2em] text-[#E0E0E0]/80">
            <Link to="/" className={`${linkBase} ${path === "/" ? "text-white" : "hover:text-white"}`}>
              Work
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`${linkBase} inline-flex items-center gap-1 ${
                  path.startsWith("/album") ? "text-white" : "hover:text-white"
                }`}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                Albums <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div
                  role="menu"
                  className="absolute right-0 top-full pt-3 min-w-[220px]"
                >
                  <div className="bg-[#1a1a1a]/95 backdrop-blur-lg border border-white/10 py-2">
                    {albums.map((a) => (
                      <Link
                        key={a.slug}
                        to="/album/$slug"
                        params={{ slug: a.slug }}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-[11px] tracking-[0.2em] text-[#E0E0E0]/75 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {a.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className={`${linkBase} ${path === "/about" ? "text-white" : "hover:text-white"}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${linkBase} ${path === "/contact" ? "text-white" : "hover:text-white"}`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
