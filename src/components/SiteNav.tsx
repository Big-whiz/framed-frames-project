import { Link, useRouterState } from "@tanstack/react-router";

export function SiteNav() {
  const { location } = useRouterState();
  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="backdrop-blur-md bg-[#121212]/40">
        <nav className="mx-auto max-w-[1800px] flex items-center justify-between px-6 md:px-10 py-5">
          <Link to="/" className="font-display text-[15px] tracking-tight text-[#E0E0E0]">
            Boss_Edit_Fotos
          </Link>
          <div className="flex items-center gap-7 text-[13px] uppercase tracking-[0.18em] text-[#E0E0E0]/80">
            <Link
              to="/"
              className={`transition-colors ${isHome ? "text-white" : "hover:text-white"}`}
            >
              Work
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${isAbout ? "text-white" : "hover:text-white"}`}
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
