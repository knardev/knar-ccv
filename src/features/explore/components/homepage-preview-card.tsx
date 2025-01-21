"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink } from "lucide-react";

interface HomepagePreviewCardProps {
  name: string;
  description: string;
  favicon_url?: string | null;
  thumbnail_url?: string | null;
  avatar_url?: string | null;
  profile_name?: string | null;
  href?: string;
  original_url?: string;
}

export const HomepagePreviewCard = ({
  name,
  favicon_url,
  thumbnail_url,
  avatar_url,
  profile_name,
  href,
  original_url,
}: HomepagePreviewCardProps) => {
  const defaultFavicon = "https://google.com/favicon.ico";
  const defaultThumbnail =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";

  const bgImageUrl = thumbnail_url || defaultThumbnail;

  return (
    <div className="relative group block w-full overflow-hidden">
      {/* Main clickable area */}
      <Link
        href={href || "#"}
        className="block relative z-10"
        aria-label={`View details of ${name}`}
      >
        {/* Full-card dark overlay inside the Link */}
        <div
          className="absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        ></div>

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
      </Link>

      {/* Top section: Actions */}
      <div
        className="absolute top-0 left-0 right-0 z-20
          flex items-center justify-between p-4
          bg-gradient-to-b from-black/60 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity h-16"
      >
        <div className="flex-1 flex items-center space-x-2 w-full">
          <Image
            src={favicon_url || defaultFavicon}
            alt={`${name} favicon`}
            width={24}
            height={24}
            className="rounded"
          />
          <h2 className="text-white text-lg font-bold truncate max-w-36">
            {name}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/90 text-white"
            aria-label="Bookmark"
            onClick={() => alert("Bookmark clicked")}
          >
            <Bookmark className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/90 text-white"
            aria-label="Visit Homepage"
            onClick={(e) => {
              e.preventDefault();
              if (original_url) {
                window.open(original_url, "_blank", "noopener noreferrer");
              }
            }}
          >
            <ExternalLink className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom section: Profile */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20
          flex items-center p-4
          bg-gradient-to-t from-black/30 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity h-16"
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar_url || ""} alt={profile_name || "Profile"} />
          <AvatarFallback>
            {profile_name?.slice(0, 2).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <span className="ml-3 text-white text-md font-medium truncate">
          {profile_name || "Unknown"}
        </span>
      </div>
    </div>
  );
};
