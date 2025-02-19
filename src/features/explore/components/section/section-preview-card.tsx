"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";

interface SectionPreviewCardProps {
  /** 홈페이지 이름 */
  name: string;
  favicon_url: string;
  /** 섹션의 타입 (예: "헤더 섹션", "FAQ 섹션" 등) */
  type: string;
  /** 섹션 이미지 배열 (첫 번째 이미지를 썸네일로 사용) */
  image_url?: string[] | null;
  /** 섹션과 관련된 프로필 아바타 URL (옵션) */
  profile_avatar_url?: string | null;
  /** 프로필 이름 (옵션) */
  profile_name?: string | null;
  /** 섹션 상세 페이지 링크 */
  href?: string;
  /** 외부 링크 (있다면 섹션의 원본 URL 등) */
  original_url?: string;
}

export const SectionPreviewCard = ({
  name,
  favicon_url,
  type,
  image_url,
  profile_avatar_url,
  profile_name,
  href,
  original_url,
}: SectionPreviewCardProps) => {
  const defaultFavicon = "https://google.com/favicon.ico";
  const defaultThumbnail =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";
  const bgImageUrl =
    image_url && image_url.length > 0 ? image_url[0] : defaultThumbnail;

  // 섹션 이미지를 클립보드에 복사하는 함수 (이미지 자체 복사)
  const copySectionImageAsImage = async () => {
    try {
      const response = await fetch(bgImageUrl);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      toast("이미지가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("이미지 복사 실패:", error);
      toast("이미지 복사에 실패했습니다.");
    }
  };

  return (
    <div className="relative group block w-full overflow-hidden rounded-sm shadow-sm border border-muted">
      {/* 메인 클릭 영역 */}
      <Link
        href={href || "#"}
        className="block relative z-10"
        aria-label={`View details of section: ${type}`}
      >
        {/* 오버레이 */}
        <div
          className="absolute inset-0 z-10 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        ></div>
        <AspectRatio ratio={16 / 9} className="relative w-full">
          <Image
            src={bgImageUrl}
            alt={`${type} preview`}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        </AspectRatio>
      </Link>

      {/* 상단 영역: 섹션 타입 및 액션 버튼 */}
      <div
        className="absolute top-0 left-0 right-0 z-20
          flex items-center justify-between p-4
          bg-gradient-to-b from-black/60 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity h-16"
      >
        <div className="flex-1 flex items-center space-x-2 w-full">
          <Image
            src={favicon_url || defaultFavicon}
            alt={`${name} favicon`}
            width={24}
            height={24}
            className="rounded"
          />
          <h2 className="text-white text-lg font-bold truncate max-w-48">
            {name}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* 복사 버튼: 섹션 이미지를 클립보드에 복사 (이미지 자체) */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/90 text-white"
            aria-label="섹션 이미지 복사"
            onClick={(e) => {
              e.preventDefault();
              copySectionImageAsImage();
            }}
          >
            <Copy className="w-6 h-6" />
          </Button>
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
            aria-label="Visit Section"
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

      {/* 하단 영역: 프로필 (이미지와 프로필만 표시) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20
          flex items-center p-4
          bg-gradient-to-t from-black/30 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity h-16"
      >
        {(profile_avatar_url || profile_name) && (
          <Avatar className="h-8 w-8">
            {profile_avatar_url ? (
              <AvatarImage
                src={profile_avatar_url}
                alt={profile_name || "Profile"}
              />
            ) : (
              <AvatarFallback>
                {profile_name?.slice(0, 2).toUpperCase() || "?"}
              </AvatarFallback>
            )}
          </Avatar>
        )}
        <span className="ml-3 text-white text-md font-medium truncate">
          {profile_name || ""}
        </span>
      </div>
    </div>
  );
};
