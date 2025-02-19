// features/section/components/detail/section-detail-view.tsx
"use client";

// hooks
import React from "react";
import { useRouter } from "next/navigation";
// components
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Copy, Bookmark, ExternalLink } from "lucide-react";
import { toast } from "sonner";
// types
import { FetchSectionWithHomepage } from "@/features/section/queries/define-fetch-section-with-homepage-query";

interface SectionDetailDrawerProps {
  data: FetchSectionWithHomepage | null;
}

export function SectionDetailDrawer({ data }: SectionDetailDrawerProps) {
  const router = useRouter();
  const defaultImage =
    "https://oguzdjlnwsdproeuoywm.supabase.co/storage/v1/object/public/images/6297033d-d146-4f5a-aed2-b617398cbb8f.png";
  const imageUrl =
    data && data.image_url && data.image_url.length > 0
      ? data.image_url[0]
      : defaultImage;

  const handleCopyImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      toast("이미지가 복사되었습니다.");
    } catch (error) {
      console.error("이미지 복사 실패:", error);
      toast("이미지 복사에 실패했습니다.");
    }
  };

  const onClose = () => {
    router.back();
  };

  if (!data) {
    console.error("섹션을 찾을 수 없습니다.");
    return null;
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="border-b border-b-muted p-4 gap-0">
          <DrawerTitle>
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={data.homepage?.favicon_url ?? ""}
                  alt="Section Favicon"
                  width={25}
                  height={25}
                />
                <h1 className="text-2xl font-bold">{data.homepage?.name}</h1>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={handleCopyImage}>
                  <Copy className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto h-[80vh] w-[130vh] pt-8">
          <ScrollArea className="w-full h-full">
            <AspectRatio
              ratio={16 / 9}
              className="w-full h-full bg-muted rounded-md border-2 border-muted overflow-hidden"
            >
              <Image
                src={imageUrl}
                alt={`${data.type ?? "섹션"}`}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </AspectRatio>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
