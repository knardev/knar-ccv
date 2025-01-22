"use client";
// states
import { beingAddedPageWithSectionState } from "@/features/homepage/atoms/states";
// hooks
import { useRecoilState } from "recoil";
import React, { useState, useMemo, useEffect } from "react";
// components
import Link from "next/link";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomepageAddDrawerContentEditableForm } from "@/features/homepage/components/add/drawer-content-editable-form";
import { ImageUploader } from "@/features/homepage/components/add/image-uploader";
import { DrawerContentPageMenuEditable } from "@/features/homepage/components/add/drawer-content-page-menu-editable";
import { SectionCard } from "@/features/homepage/components/add/section-card";
// types
import { PageWithSections, Section } from "@/features/homepage/types/types";
import {
  typeOrderMap,
  pageCategoryOptions,
  pageSubcategoryOptions,
  PageCategory,
  PageSubcategory,
} from "@/features/homepage/utils/options";
import { Enums } from "@/types/database.types";

export function HomepageAddDrawerContentEditable() {
  const [pages, setPages] = useRecoilState(beingAddedPageWithSectionState);
  const [selectedPage, setSelectedPage] = useState(pages[0]);

  // useEffect(() => {
  //   console.log("pages", pages);
  //   console.log("selectedPage", selectedPage);
  // }, [pages]);

  const handlePageSelect = (page: PageWithSections) => {
    setSelectedPage(page);
  };

  const handleRemovePage = (pageId: string) => {
    setPages((prevPages) => prevPages.filter((page) => page.id !== pageId));
    // 만약에 삭제한 페이지가 선택된 페이지라면, 선택된 페이지를 페이지들 중 첫번째 페이지로 변경
    if (selectedPage?.id === pageId) {
      setSelectedPage(pages[0]);
    }
  };

  const handleRemoveSection = (pageId: string, sectionId: string) => {
    setPages((prev) => {
      const newSections = prev
        .find((page) => page.id === pageId)
        ?.sections.filter((s) => s.id !== sectionId);
      if (!newSections) return prev;
      return prev.map((page) =>
        page.id === pageId ? { ...page, sections: newSections } : page
      );
    });
    setSelectedPage((prev) => {
      if (!prev) return prev;
      const newSections = prev.sections.filter((s) => s.id !== sectionId);
      return { ...prev, sections: newSections };
    });
  };

  const handleUpdateSectionType = (
    sectionId: string,
    type: Enums<"section_type">
  ) => {
    setPages((prev) =>
      prev.map((page) => ({
        ...page,
        sections: page.sections.map((s) =>
          s.id === sectionId ? { ...s, type: type } : s
        ),
      }))
    );
    setSelectedPage((prev) => {
      if (!prev) return prev;
      const newSections = prev.sections.map((s) =>
        s.id === sectionId ? { ...s, type } : s
      );
      return { ...prev, sections: newSections };
    });
  };

  const handleCreatePage = (
    category: PageCategory,
    subCategory: PageSubcategory
  ) => {
    const newPage: PageWithSections = {
      id: `temp-${Date.now()}`,
      created_at: new Date().toISOString(),
      homepage_id: "temp",
      category,
      sub_category: subCategory,
      sections: [],
    };

    // 1) 페이지 배열에 새 페이지를 추가
    setPages((prevPages) => [...prevPages, newPage]);

    // 2) 방금 생성한 페이지를 선택
    setSelectedPage(newPage);
  };

  const handleUpdatePage = (
    pageId: string,
    category: PageCategory,
    subCategory: PageSubcategory
  ) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? { ...page, category, sub_category: subCategory }
          : page
      )
    );
    setSelectedPage((prevSelectedPage) =>
      prevSelectedPage?.id === pageId
        ? { ...prevSelectedPage, category, sub_category: subCategory }
        : prevSelectedPage
    );
  };

  const handleUploadSection = (sections: Section[]) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === selectedPage?.id
          ? { ...page, sections: [...page.sections, ...sections] }
          : page
      )
    );
    setSelectedPage((prevSelectedPage) =>
      prevSelectedPage
        ? {
            ...prevSelectedPage,
            sections: [...prevSelectedPage.sections, ...sections],
          }
        : prevSelectedPage
    );
  };

  const sortedSections = useMemo(() => {
    if (!selectedPage) return [];

    // 원본 배열을 훼손하지 않도록, 복사본을 만든 뒤 정렬
    const copied = [...selectedPage.sections];
    return copied.sort((a, b) => {
      const typeAIndex = typeOrderMap[a.type ?? ""] ?? Infinity;
      const typeBIndex = typeOrderMap[b.type ?? ""] ?? Infinity;
      return typeAIndex - typeBIndex;
    });
  }, [selectedPage]);

  return (
    <div className="h-[80vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full md:min-w-[450px]"
      >
        {/* 왼쪽: 페이지 목록 영역 */}
        <ResizablePanel defaultSize={12}>
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
        <ResizablePanel defaultSize={67}>
          <ScrollArea className="h-[80vh] px-2">
            <div className="w-full h-full flex flex-col items-center relative">
              <div className="w-full flex flex-col items-center sticky top-0 mt-3 z-50 bg-background">
                <ImageUploader
                  key={selectedPage?.id}
                  setSections={handleUploadSection}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-2">
                {sortedSections.map((section, index) => (
                  <SectionCard
                    key={`${section.id}-${section.image_url}-${index}`}
                    pageId={selectedPage?.id}
                    section={section}
                    handleRemoveSection={handleRemoveSection}
                    handleUpdateSectionType={handleUpdateSectionType}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle disabled className="w-0" />
        <ResizablePanel defaultSize={23}>
          <ScrollArea className="h-[77vh]">
            <HomepageAddDrawerContentEditableForm />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
