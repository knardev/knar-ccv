// components/HomepagePreviewCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
>(({ name, description, favicon_url, thumbnail_url, href, onClick }, ref) => {
  return (
    <a
      href={href}
      onClick={onClick}
      ref={ref}
      className="block mb-4 hover:bg-gray-50 transition-all p-4 rounded-md border-slate-300 border group"
    >
      <div className="flex items-center space-x-4">
        <Image
          src={favicon_url || "https://google.com/favicon.ico"}
          alt={`${name} favicon`}
          width={24}
          height={24}
          className="rounded"
          // placeholder="blur"
          // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
      <p className="mt-2 text-sm text-gray-600 break-keep h-[40px]">
        {description}
      </p>
      <AspectRatio
        ratio={16 / 9}
        className="mt-4 bg-transparent border border-slate-200 cursor-pointer overflow-hidden rounded-md"
      >
        <Image
          src={
            thumbnail_url ||
            "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          }
          alt={`${name} preview`}
          fill
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </AspectRatio>
    </a>
  );
});

HomepagePreviewCard.displayName = "HomepagePreviewCard";
