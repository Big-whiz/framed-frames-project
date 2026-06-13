import { useState, forwardRef, type ImgHTMLAttributes } from "react";
import { photoSrcSet, photoUrl } from "@/lib/albums";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  photoId: string;
  sizes?: string;
  width?: number; // fallback src width
  eager?: boolean;
};

/**
 * Image with srcSet + fade-in once loaded. Dark placeholder shows underneath
 * so the page never flashes blank rectangles on slow networks.
 */
export const SmartImage = forwardRef<HTMLImageElement, Props>(function SmartImage(
  { photoId, sizes = "100vw", width = 1600, eager, className = "", alt = "", ...rest },
  ref,
) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      ref={ref}
      src={photoUrl(photoId, width)}
      srcSet={photoSrcSet(photoId)}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} bg-neutral-900 transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      {...rest}
    />
  );
});
