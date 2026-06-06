import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Link2, Share2, Check } from "lucide-react";
import { getAlbum, albums } from "@/lib/albums";
import { Lightbox } from "@/components/Lightbox";

export const Route = createFileRoute("/album/$slug")({
  loader: ({ params }) => {
    const album = getAlbum(params.slug);
    if (!album) throw notFound();
    return { album };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.album.title ?? "Album"} — Boss_Edit_Fotos` },
      { name: "description", content: loaderData?.album.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.album.title} — Boss_Edit_Fotos` },
      { property: "og:description", content: loaderData?.album.tagline ?? "" },
      { property: "og:url", content: `/album/${params.slug}` },
      { property: "og:type", content: "article" },
      { property: "og:image", content: loaderData?.album.cover },
    ],
    links: [
      { rel: "canonical", href: `/album/${params.slug}` },
    ],
  }),
  component: AlbumPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-[#E0E0E0]/60">Album not found.</p>
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-[#E0E0E0]/60">Couldn't load this album.</p>
    </div>
  ),
});

function AlbumPage() {
  const { album } = Route.useLoaderData();
  const [index, setIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/album/${album.slug}`
    : `/album/${album.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${album.title} — Boss_Edit_Fotos`,
          text: album.tagline,
          url: shareUrl,
        });
      } catch {
        // ignore abort / failure
      }
    } else {
      await handleCopy();
    }
  };

  return (
    <main className="pt-28 px-4 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> All work
        </Link>
        <div className="mt-6 mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#E0E0E0]/50 mb-3">
              {album.tagline}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-[#E0E0E0]">
              {album.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/60 hover:text-white transition-colors"
              aria-label="Copy link"
              title="Copy link"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check size={14} /> Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="link"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Link2 size={14} /> Copy link
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/60 hover:text-white transition-colors"
              aria-label="Share"
              title="Share"
            >
              <Share2 size={14} /> Share
            </button>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/50 ml-2">
              {album.images.length} frames
            </span>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {album.images.map((src: string, i: number) => (
            <motion.button
              key={src}
              onClick={() => setIndex(i)}
              className="mb-4 block w-full overflow-hidden cursor-zoom-in"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
            >
              <motion.img
                src={src}
                alt={`${album.title} ${i + 1}`}
                className="w-full h-auto block"
                loading="lazy"
                whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Other albums */}
        <div className="mt-32 pt-12 border-t border-[#E0E0E0]/10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E0E0E0]/50 mb-6">
            More work
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {albums.filter((a) => a.slug !== album.slug).slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                to="/album/$slug"
                params={{ slug: a.slug }}
                className="group relative aspect-[4/3] overflow-hidden block"
              >
                <img
                  src={a.cover}
                  alt={a.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "brightness(0.75)" }}
                />
                <div className="absolute inset-0 flex items-end p-5">
                  <h3 className="font-display text-2xl text-white">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        images={album.images}
        index={index}
        onClose={() => setIndex(null)}
        onChange={setIndex}
      />
    </main>
  );
}
