// components/HomepageDetail.tsx
import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/database.types";
import { Separator } from "@/components/ui/separator";
import { SectionPreviewCard } from "./section-preview-card";
import { typeOrderMap } from "../options";
import { Badge } from "@/components/ui/badge";

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
          <div className="p-4 h-[77vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-10">
              {sectionImages.map((section, index) => (
                <SectionPreviewCard
                  section={section}
                  key={`${section.id}-${section.imageUrl}-${index}`}
                />
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle disabled className="w-0" />
        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-[77vh]">
            <div className="p-4">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="mt-4 text-gray-600 break-keep max-h-20 p-2 border rounded-sm">
                {data.description}
              </p>

              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">링크</p>
                <Link target="_blank" href={data.url} passHref>
                  <Button variant="outline">
                    <ExternalLink size={16} />
                    홈페이지 방문
                  </Button>
                </Link>
              </div>
              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">기업분류</p>
                <p className="flex flex-wrap gap-1">{data.company_category}</p>
              </div>
              <Separator className="my-8" />
              <h1 className="text-2xl font-bold">디자인 정보</h1>
              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">디자인 방향성</p>
                <div className="flex flex-wrap gap-1">
                  {data.design_desire_types?.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-yellow-100 hover:bg-yellow-100 hover:bg-opacity-50 text-yellow-800"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">디자인 톤앤매너</p>
                <div className="flex flex-wrap gap-1">
                  {data.design_moods?.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* <p className="mt-4 text-gray-600">
                메인 컬러 | {data.primary_color}
              </p> */}
              <Separator className="my-8" />
              <h1 className="text-2xl font-bold">기획 정보</h1>
              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">악당</p>
                <p className="flex flex-wrap gap-1 h-10">
                  {data.villian_deficiency}
                </p>
              </div>
              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">특장점</p>
                <p className="flex flex-wrap gap-1 h-10">
                  {data.unique_selling_point}
                </p>
              </div>
              <div className="my-6 flex">
                <p className="w-[25%] text-gray-600">방문자 니즈</p>
                <p className="flex flex-wrap gap-1 h-10">
                  {data.visitor_needs}
                </p>
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
