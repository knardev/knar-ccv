import React, { useState } from "react";

// components
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionPreviewCard } from "@/features/homepage/components/section-preview-card";
import { HomepageDetailDrawerContentEditableForm } from "@/features/homepage/components/drawer-content-editable-form";
import { DrawerContentPageMenu } from "@/features/homepage/components/drawer-content-page-menu";
// types
import { typeOrderMap } from "@/features/homepage/utils/options";
import {
  HomepageWithPageAndSections,
  PageWithSections,
  Section,
} from "@/features/homepage/types/types";

export function HomepageDetailDrawerContentEditable({
  data,
}: {
  data: HomepageWithPageAndSections;
}) {
  const [selectedPage, setSelectedPage] = useState<PageWithSections | null>(
    data.pages[0] || null
  );

  // Handler for selecting a page
  const handlePageSelect = (page: PageWithSections) => {
    setSelectedPage(page);
  };

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

  const { pages: _pages, ...initialData } = data;

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
            <div className="grid grid-cols-2 gap-4">
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
            <HomepageDetailDrawerContentEditableForm
              initialData={initialData}
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
