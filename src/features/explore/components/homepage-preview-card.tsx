"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * If you have more robust type definitions for homepage data,
 * you can use them here. This is just a minimal example.
 */
interface HomepagePreviewCardProps {
  name: string;
  description: string;
  favicon_url?: string | null;
  thumbnail_url?: string | null;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const HomepagePreviewCard = React.forwardRef<
  HTMLAnchorElement,
  HomepagePreviewCardProps
>(function HomepagePreviewCard(
  { name, description, favicon_url, thumbnail_url, href, onClick },
  ref
) {
  // Fallbacks
  const defaultFavicon = "https://google.com/favicon.ico";
  const defaultThumbnail =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";

  // Decide which image to use for the background + main
  const bgImageUrl = thumbnail_url || defaultThumbnail;

  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      ref={ref}
      /**
       * The group class helps with hover states for child elements.
       * We fix the card’s overall size using `relative` + `overflow-hidden`.
       */
      className="group relative block w-full rounded-md border border-slate-300 overflow-hidden"
    >
      {/* 
        2) Main image in a 16:9 AspectRatio container.
          - This ensures the card always maintains a 16:9 shape.
          - The height is effectively "fixed" since the ratio is enforced.
      */}
      <AspectRatio ratio={16 / 9} className="relative w-full">
        <Image
          src={bgImageUrl}
          alt={`${name} preview`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </AspectRatio>

      {/* 
        3) Overlay with favicon, title, and description
          that is hidden by default and shown on hover.
          - Place absolute to float over the image area.
      */}
      <div
        className="
          absolute inset-0 flex flex-col p-4 
          justify-start items-start
          bg-black/60  /* dark overlay for text clarity */
          opacity-0 group-hover:opacity-100
          transition-opacity 
        "
      >
        {/* Favicon + Title row */}
        <div className="flex items-center space-x-2 mb-2">
          <Image
            src={favicon_url || defaultFavicon}
            alt={`${name} favicon`}
            width={24}
            height={24}
            className="rounded"
          />
          <h2 className="text-white text-lg font-bold">{name}</h2>
        </div>

        {/* Description */}
        {/* <p className="text-sm text-gray-200 line-clamp-2 break-keep">
          {description}
        </p> */}
      </div>
    </Link>
  );
});
