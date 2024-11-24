// components/HomepageDetail.tsx
import React from "react";
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
import { Separator } from "@/components/ui/separator";
import { SectionPreviewCard } from "./section-preview-card";
import { typeOrderMap } from "../options";

type Homepage = Tables<"homepages">;
type Section = Tables<"sections">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

export function HomepageDetailDrawerContent({
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
                  {sortedSections.map((section) => (
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
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
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
            <div className="p-4">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="mt-4 text-gray-600 break-keep">
                {data.description}
              </p>
              <p className="mt-4 text-gray-600">링크 | {data.url}</p>
              <p className="mt-4 text-gray-600">
                기업분류 | {data.company_category}
              </p>
              <Separator className="my-4" />
              <h1 className="text-2xl font-bold">디자인 정보</h1>
              <p className="mt-4 text-gray-600">무드 | {data.design_mood}</p>
              <p className="mt-4 text-gray-600">
                욕구유형 | {data.design_desire_type}
              </p>
              <p className="mt-4 text-gray-600">
                메인컬러 | {data.primary_color}
              </p>
              <Separator className="my-4" />
              <h1 className="text-2xl font-bold">기획 정보</h1>
              <p className="mt-4 text-gray-600">
                악당 | {data.villian_deficiency}
              </p>
              <p className="mt-4 text-gray-600">
                특장점 | {data.unique_selling_point}
              </p>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
