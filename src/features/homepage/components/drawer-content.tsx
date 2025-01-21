// components/HomepageDetail.tsx
import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/database.types";
import { Separator } from "@/components/ui/separator";
import { SectionPreviewCard } from "./section-preview-card";
import { typeOrderMap } from "../options";
import { Badge } from "@/components/ui/badge";
import { DrawerContentPageMenu } from "./drawer-content-page-menu";
import { HomepageWithPageAndSections, PageWithSections } from "../types";

type Section = Tables<"sections">;

export function HomepageDetailDrawerContent({
  data,
}: {
  data: HomepageWithPageAndSections;
}) {
  // Initialize selectedPage state with the first page or null
  const [selectedPage, setSelectedPage] =
    React.useState<PageWithSections | null>(data.pages[0] || null);

  // Handler for selecting a page
  const handlePageSelect = (page: PageWithSections) => {
    setSelectedPage(page);
  };

  // Get sections of the selected page
  const sortedSections = React.useMemo(() => {
    if (!selectedPage) return [];

    return [...selectedPage.sections].sort((a, b) => {
      const typeAIndex = typeOrderMap[a.type ?? ""] ?? Infinity;
      const typeBIndex = typeOrderMap[b.type ?? ""] ?? Infinity;
      return typeAIndex - typeBIndex;
    });
  }, [selectedPage]);

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
    <div className="h-[80vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={70}>
          <DrawerContentPageMenu
            pages={data.pages}
            handlePageSelect={handlePageSelect}
            selectedPage={selectedPage}
          />
          <ScrollArea className="h-[73vh] p-4">
            <div className="grid grid-cols-1 gap-5">
              {sectionImages.map((section, index) => (
                <SectionPreviewCard
                  section={section}
                  key={`${section.id}-${section.imageUrl}-${index}`}
                />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-[80vh]">
            <div className="p-4">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="mt-4 text-gray-600 break-keep max-h-20 p-2 border rounded-sm overflow-y-auto">
                {data.description}
              </p>

              <div className="my-6 flex">
                <p className="w-[30%] text-gray-600">링크</p>
                <Link target="_blank" href={data.url} passHref>
                  <Button variant="outline">
                    <ExternalLink size={16} />
                    홈페이지 방문
                  </Button>
                </Link>
              </div>
              <div className="my-6 flex">
                <p className="w-[30%] text-gray-600">기업분류</p>
                <p className="flex flex-wrap gap-1">{data.company_category}</p>
              </div>
              <Separator className="my-8" />
              <h1 className="text-2xl font-bold">디자인 정보</h1>
              <div className="my-6 flex">
                <p className="w-[30%] text-gray-600">디자인 방향성</p>
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
                <p className="w-[30%] text-gray-600">디자인 톤앤매너</p>
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
                <p className="w-[30%] text-gray-600">악당</p>
                <p className="flex flex-wrap gap-1 h-10">
                  {data.villian_deficiency ?? "내용이 없습니다."}
                </p>
              </div>
              <div className="my-6 flex">
                <p className="w-[30%] text-gray-600">특장점</p>
                <p className="flex flex-wrap gap-1 h-10">
                  {data.unique_selling_point ?? "내용이 없습니다."}
                </p>
              </div>
              <div className="my-6 flex">
                <p className="w-[30%] text-gray-600">방문자 니즈</p>
                <p className="flex flex-wrap gap-1 h-10">
                  {data.visitor_needs ?? "내용이 없습니다."}
                </p>
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
