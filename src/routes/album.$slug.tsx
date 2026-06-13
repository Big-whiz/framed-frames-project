import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Link2, Share2, Check, Quote } from "lucide-react";
import { getAlbum, albums, photoUrl, photoSrcSet, type Photo } from "@/lib/albums";
import { Lightbox } from "@/components/Lightbox";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/album/$slug")({
  loader: ({ params }) => {
    const album = getAlbum(params.slug);
    if (!album) throw notFound();
    return { album };
  },
  head: ({ params, loaderData }) => {
    const album = loaderData?.album;
    const heroId = album?.photos[0]?.id;
    const heroImg = heroId ? photoUrl(heroId, 1600) : undefined;
    const url = `https://bosseditsfotos.space/album/${params.slug}`;
    return {
      meta: [
        { title: `${album?.title ?? "Album"} — Boss_Edit_Fotos` },
        { name: "description", content: album?.description ?? album?.tagline ?? "" },
        { property: "og:title", content: `${album?.title} — Boss_Edit_Fotos` },
        { property: "og:description", content: album?.description ?? album?.tagline ?? "" },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(heroImg ? [
          { property: "og:image", content: heroImg },
          { name: "twitter:image", content: heroImg },
        ] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${album?.title} — Boss_Edit_Fotos` },
        { name: "twitter:description", content: album?.description ?? "" },
      ],
      links: [
        { rel: "canonical", href: url },
      ],
      scripts: album ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: `${album.title} — Boss_Edit_Fotos`,
          description: album.description,
          url,
          author: { "@type": "Person", name: "Boss_Edit_Fotos" },
          image: album.photos.map((p) => photoUrl(p.id, 1600)),
        }),
      }] : [],
    };
  },
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
    : `https://bosseditsfotos.space/album/${album.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${album.title} — Boss_Edit_Fotos`,
          text: album.tagline,
          url: shareUrl,
        });
      } catch { /* ignore */ }
    } else {
      await handleCopy();
    }
  };

  const hero = album.photos[0];
  const rest = album.photos.slice(1);
  const quoteAt = Math.max(1, Math.floor(rest.length / 2));
  const beforeQuote = rest.slice(0, quoteAt);
  const afterQuote = rest.slice(quoteAt);

  const openAt = (photo: Photo) => setIndex(album.photos.findIndex((p: Photo) => p.id === photo.id));

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
            <h1 className="font-display text-5xl md:text-7xl text-[#E0E0E0] leading-[0.95]">
              {album.title}
            </h1>
            <p className="mt-4 max-w-xl text-[#E0E0E0]/65 text-sm md:text-base leading-relaxed">
              {album.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/60 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded px-1 transition-colors"
              aria-label="Copy link"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="check" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="inline-flex items-center gap-2">
                    <Check size={14} /> Copied
                  </motion.span>
                ) : (
                  <motion.span key="link" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="inline-flex items-center gap-2">
                    <Link2 size={14} /> Copy link
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/60 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded px-1 transition-colors"
              aria-label="Share"
            >
              <Share2 size={14} /> Share
            </button>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/50 ml-2">
              {album.photos.length} frames
            </span>
          </div>
        </div>

        {/* Hero frame for hierarchy */}
        {hero && (
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 cursor-view"
          >
            <button onClick={() => openAt(hero)} className="block w-full" aria-label="Open hero image">
              <img
                src={photoUrl(hero.id, 2400)}
                srcSet={photoSrcSet(hero.id)}
                sizes="100vw"
                alt={hero.caption ?? album.title}
                className="w-full h-[60vh] md:h-[78vh] object-cover bg-neutral-900"
                loading="eager"
              />
            </button>
            {(hero.caption || hero.location) && (
              <figcaption className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#E0E0E0]/50">
                <span>{hero.caption}</span>
                <span>{hero.location}</span>
              </figcaption>
            )}
          </motion.figure>
        )}

        {/* Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance] mt-12">
          {beforeQuote.map((p: Photo, i: number) => (
            <Frame key={p.id} photo={p} index={i} albumTitle={album.title} onOpen={() => openAt(p)} />
          ))}
        </div>

        {/* Pull quote */}
        {album.pullQuote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="my-16 md:my-24 max-w-3xl mx-auto text-center px-4"
          >
            <Quote className="mx-auto text-[#E0E0E0]/30 mb-4" size={22} />
            <p className="font-display text-2xl md:text-4xl text-[#E0E0E0] leading-[1.2] italic">
              "{album.pullQuote}"
            </p>
          </motion.blockquote>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {afterQuote.map((p: Photo, i: number) => (
            <Frame key={p.id} photo={p} index={i} albumTitle={album.title} onOpen={() => openAt(p)} />
          ))}
        </div>

        {/* Other albums */}
        <div className="mt-32 pt-12 border-t border-[#E0E0E0]/10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E0E0E0]/50 mb-6">More work</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {albums.filter((a) => a.slug !== album.slug).slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                to="/album/$slug"
                params={{ slug: a.slug }}
                className="group relative aspect-[4/3] overflow-hidden block"
              >
                <SmartImage
                  photoId={a.photos[0].id}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "brightness(0.7)" }}
                  alt={a.title}
                />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1">{a.tagline}</p>
                    <h3 className="font-display text-2xl text-white">{a.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        photos={album.photos}
        index={index}
        onClose={() => setIndex(null)}
        onChange={setIndex}
      />
    </main>
  );
}

function Frame({
  photo, index, albumTitle, onOpen,
}: { photo: Photo; index: number; albumTitle: string; onOpen: () => void }) {
  return (
    <motion.figure
      className="mb-4 block w-full group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.05 }}
    >
      <button
        onClick={onOpen}
        className="w-full overflow-hidden cursor-view block focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        aria-label={photo.caption ? `Open ${photo.caption}` : `Open frame ${index + 1}`}
      >
        <SmartImage
          photoId={photo.id}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-auto block transition-all duration-700 group-hover:brightness-110"
          alt={photo.caption ?? `${albumTitle} ${index + 1}`}
        />
      </button>
      {(photo.caption || photo.location) && (
        <figcaption className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#E0E0E0]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>{photo.caption}</span>
          <span>{photo.location}</span>
        </figcaption>
      )}
    </motion.figure>
  );
}
