import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getAlbum, albums } from "@/lib/albums";
import { Lightbox } from "@/components/Lightbox";

export const Route = createFileRoute("/album/$slug")({
  loader: ({ params }) => {
    const album = getAlbum(params.slug);
    if (!album) throw notFound();
    return { album };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.album.title ?? "Album"} — Boss_Edit_Fotos` },
      { name: "description", content: loaderData?.album.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.album.title} — Boss_Edit_Fotos` },
      { property: "og:image", content: loaderData?.album.cover },
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
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0E0E0]/50">
            {album.images.length} frames
          </span>
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
