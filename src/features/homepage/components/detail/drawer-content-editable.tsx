"use client";

// states
// import { beingAddedPageState } from "@/features/homepage/atoms/states";
// hooks
import React, { useState, useMemo, useEffect } from "react";
// import { useRecoilState } from "recoil";
// components
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionPreviewCard } from "@/features/homepage/components/detail/section-preview-card";
import { HomepageDetailDrawerContentEditableForm } from "@/features/homepage/components/detail/drawer-content-editable-form";
import { DrawerContentPageMenuEditable } from "@/features/homepage/components/detail/drawer-content-page-menu-editable";
// actions
import { addPages } from "@/features/homepage/actions/add-pages";
import { updatePage } from "@/features/homepage/actions/update-page";
import { deletePage } from "@/features/homepage/actions/delete-page";
// types
import {
  typeOrderMap,
  PageCategory,
  PageSubcategory,
} from "@/features/homepage/utils/options";
import {
  HomepageWithPageAndSections,
  PageWithSections,
  SectionWithImageUrl,
  Section,
  PageInsert,
  SectionInsert,
} from "@/features/homepage/types/types";
import { ImageUploader } from "@/features/homepage/components/detail/image-uploader";

export function HomepageDetailDrawerContentEditable({
  data,
  editable,
}: {
  data: HomepageWithPageAndSections;
  editable: boolean;
}) {
  const [pages, setPages] = useState<PageWithSections[]>(data.pages);

  // // 2) Recoil 상태: 새로 추가된 페이지만 따로 저장(필요시 서버 반영 등)
  // const [beingAddedPages, setBeingAddedPages] =
  //   useRecoilState(beingAddedPageState);

  // 3) 현재 선택된 페이지
  const [selectedPage, setSelectedPage] = useState<PageWithSections | null>(
    pages[0] || null
  );
  // console.log("selectedPage", selectedPage);

  const [sections, setSections] = useState<Section[]>(pages[0]?.sections || []);

  useEffect(() => {
    if (!selectedPage) return;
    console.log("selectedPage", selectedPage);
    console.log("selectedPage.sections", selectedPage.sections);
    setSections(selectedPage.sections);
  }, [selectedPage]);

  const handleCreatePage = async (
    category: PageCategory,
    subCategory: PageSubcategory
  ) => {
    // 새 페이지 생성
    const payload = {
      homepage_id: data.id,
      category,
      sub_category: subCategory,
    };
    const newPages = await addPages([payload]);
    setPages((prev) => [...prev, ...newPages]);
    setSelectedPage(newPages[0]);
  };

  const handleUpdatePage = async (
    pageId: string,
    category: PageCategory,
    subCategory: PageSubcategory
  ) => {
    const updates = {
      category,
      sub_category: subCategory,
    };
    const updatedPages = await updatePage(pageId, updates);
    setPages((prev) =>
      prev.map((page) => (page.id === pageId ? updatedPages : page))
    );
  };

  const handlePageSelect = (page: PageWithSections) => {
    setSelectedPage(page);
  };

  const handleRemovePage = async (pageId: string) => {
    await deletePage(pageId);

    // 선택된 페이지였다면 다른 페이지로 변경
    if (selectedPage?.id === pageId) {
      const remaining = pages.filter((p) => p.id !== pageId);
      const newSelected = remaining[0] || null;
      setSelectedPage(newSelected);
    }
  };

  // -----------------------------------------------------------
  //                      섹션 정렬 및 이미지
  // -----------------------------------------------------------
  const sortedSections = useMemo(() => {
    if (!sections) return [];
    return sections.sort((a, b) => {
      const typeAIndex = typeOrderMap[a.type ?? ""] ?? Infinity;
      const typeBIndex = typeOrderMap[b.type ?? ""] ?? Infinity;
      return typeAIndex - typeBIndex;
    });
  }, [sections]);

  // const sectionImages: SectionWithImageUrl[] = useMemo(() => {
  //   return sortedSections
  //     .map((section) =>
  //       section.image_url.map((url) => ({
  //         ...section,
  //         imageUrl: url,
  //       }))
  //     )
  //     .flat();
  // }, [sortedSections]);

  const { pages: _pages, ...initialData } = data; // 페이지 제외한 나머지(홈페이지 정보)

  return (
    <div className="h-[80vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full md:min-w-[450px]"
      >
        {/* 왼쪽: 페이지 목록 영역 */}
        <ResizablePanel defaultSize={10}>
          <DrawerContentPageMenuEditable
            pages={pages}
            selectedPage={selectedPage}
            handlePageSelect={handlePageSelect}
            onRemovePage={handleRemovePage}
            onCreatePage={handleCreatePage}
            onUpdatePage={handleUpdatePage}
          />
        </ResizablePanel>

        <ResizableHandle disabled />

        {/* 가운데: 선택된 페이지 섹션 미리보기 */}
        <ResizablePanel defaultSize={67}>
          <ScrollArea className="h-[80vh] px-2">
            <div className="w-full h-full flex flex-col items-center relative">
              <div className="w-full flex flex-col items-center sticky top-0 mt-3 z-50 bg-background">
                <ImageUploader
                  key={selectedPage?.id ?? ""}
                  setSections={setSections}
                  pageId={selectedPage?.id ?? ""}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-2">
                {sortedSections.map((section, index) => (
                  <SectionPreviewCard
                    key={`${section.id}-${section.image_url}-${index}`}
                    editable={editable}
                    section={section}
                    setSections={setSections}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle disabled />

        {/* 오른쪽: 폼 편집 영역 */}
        <ResizablePanel defaultSize={23}>
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
