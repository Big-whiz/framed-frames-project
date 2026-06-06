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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-[#E0E0E0]">404</h1>
        <p className="mt-4 text-sm text-[#E0E0E0]/60">This frame doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-[#E0E0E0] hover:text-white">
          Back to work
        </Link>
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
      { title: "Boss_Edit_Fotos — Photography" },
      { name: "description", content: "Cinematic photography across dance, worship, and live events." },
      { property: "og:title", content: "Boss_Edit_Fotos" },
      { property: "og:description", content: "Cinematic photography across dance, worship, and live events." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Manrope:wght@300;500;700&display=swap" },
    ],
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
        <SiteNav />
        <Outlet />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
