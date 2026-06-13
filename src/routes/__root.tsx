import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";

const BG_404 = "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=2000&q=80";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#121212] px-4 overflow-hidden">
      <img
        src={BG_404}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        style={{ filter: "brightness(0.4) grayscale(0.4)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/70 to-[#121212]" />
      <div className="relative max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#E0E0E0]/50 mb-4">Out of frame</p>
        <h1 className="font-display text-7xl md:text-8xl text-[#E0E0E0]">404</h1>
        <p className="mt-5 text-sm text-[#E0E0E0]/60">This frame doesn't exist — try the work, or head home.</p>
        <div className="mt-8 flex items-center justify-center gap-6">
          <Link to="/" className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0] border-b border-[#E0E0E0]/40 hover:border-white pb-1">
            Back to work
          </Link>
          <Link to="/contact" className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/60 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-[#E0E0E0]">Something broke</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 text-sm uppercase tracking-[0.2em] text-[#E0E0E0] hover:text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#121212" },
      { title: "Boss_Edit_Fotos — Photography" },
      { name: "description", content: "Cinematic photography across dance, worship, and live events." },
      { property: "og:site_name", content: "Boss_Edit_Fotos" },
      { property: "og:type", content: "website" },
      { name: "twitter:site", content: "@boss_edit_fotos" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Inter:wght@300;400;500&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Boss_Edit_Fotos",
        url: "https://bosseditsfotos.space",
        image: "https://bosseditsfotos.space/og-cover.jpg",
        jobTitle: "Photographer",
        sameAs: ["https://instagram.com/boss_edit_fotos"],
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#121212] text-[#E0E0E0]">
        <ScrollProgress />
        <SiteNav />
        <Outlet />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
