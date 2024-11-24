// components/HomepageDetail.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tables } from "@/types/database.types";
import { SectionPreviewCard } from "@/app/(main)/homepages/[homepage_id]/_components/section-preview-card";
import { HomepageDetailDrawerContentEditableForm } from "./drawer-content-editable-form";
import { typeOrderMap } from "../options";

type Homepage = Tables<"homepages">;
type Section = Tables<"sections">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

export function HomepageDetailDrawerContentEditable({
  data,
}: {
  data: HomepageWithSections;
}) {
  // Sort sections by created_at in ascending order
  const sortedSections = React.useMemo(() => {
    return [...data.sections].sort((a, b) => {
      const typeAIndex = typeOrderMap[a.type ?? ""] ?? Infinity;
      const typeBIndex = typeOrderMap[b.type ?? ""] ?? Infinity;
      return typeAIndex - typeBIndex;
    });
  }, [data.sections]);

  // Flatten section images and assign imagesUrl
  type SectionWithImageUrl = Section & { imageUrl: string };
  const sectionImages: SectionWithImageUrl[] = React.useMemo(() => {
    return sortedSections
      .map((section) => {
        return section.image_url.map((url) => {
          return { ...section, imageUrl: url };
        });
      })
      .flat();
  }, [sortedSections]);

  const { sections: _sections, ...initialData } = data;

  return (
    <div className="h-[77vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={70}>
          <ScrollArea className="h-[77vh] p-4">
            <div className="flex justify-center mb-3">
              <Carousel className="w-full">
                <CarouselContent>
                  {sectionImages.slice(0, 3).map((section) => (
                    <CarouselItem key={section.id}>
                      <AspectRatio
                        ratio={16 / 9}
                        className="bg-transparent rounded-md"
                      >
                        <Image
                          src={
                            section.image_url[0] ??
                            "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                          }
                          alt={`${data.name}/${section.type}`}
                          fill
                          className="h-full w-full rounded-md object-cover"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
              </Carousel>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sectionImages.map((section, index) => (
                <SectionPreviewCard
                  section={section}
                  key={`${section.id}-${section.imageUrl}-${index}`}
                />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle disabled className="w-0" />
        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-[77vh]">
            <HomepageDetailDrawerContentEditableForm
              initialData={initialData}
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
