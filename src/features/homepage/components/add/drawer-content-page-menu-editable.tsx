"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Edit } from "lucide-react";
import { HoverSelectItem } from "@/features/homepage/components/hover-select-item";
// utils
import { cn } from "@/lib/utils";
// types
import { PageWithSections } from "@/features/homepage/types/types";
import {
  pageCategoryOptions,
  pageSubcategoryOptions,
  PageCategory,
  PageSubcategory,
} from "@/features/homepage/utils/options";

interface DrawerContentPageMenuProps {
  pages: PageWithSections[];
  selectedPage: PageWithSections | null;
  handlePageSelect: (page: PageWithSections) => void;
  onRemovePage: (pageId: string) => void;
  onCreatePage: (category: PageCategory, subCategory: PageSubcategory) => void;
  onUpdatePage: (
    pageId: string,
    category: PageCategory,
    subCategory: PageSubcategory
  ) => void;
}

export function DrawerContentPageMenuEditable({
  pages,
  selectedPage,
  handlePageSelect,
  onRemovePage,
  onCreatePage,
  onUpdatePage,
}: DrawerContentPageMenuProps) {
  // 다이얼로그 열림 여부
  const [dialogOpen, setDialogOpen] = useState(false);

  // Select로 선택할 임시 Category/SubCategory
  const [tempCategory, setTempCategory] = useState<PageCategory>("메인 페이지");
  const [tempSubCategory, setTempSubCategory] =
    useState<PageSubcategory>("메인페이지");

  const [mode, setMode] = useState<"edit" | "new">("new");
  const [edittingPage, setEdittingPage] = useState<PageWithSections | null>(
    null
  );

  // -------------------------------------------------
  //    +페이지 추가 버튼 -> 새 페이지 모드 (dialog)
  // -------------------------------------------------
  const handleOpenAddDialog = () => {
    setEdittingPage(null);
    setMode("new");
    setTempCategory("메인 페이지");
    setTempSubCategory("메인페이지");
    setDialogOpen(true);
  };

  // -------------------------------------------------
  //    "수정 아이콘" 클릭 -> 기존/새 페이지 편집 (dialog)
  // -------------------------------------------------
  const handleOpenEditDialog = (page: PageWithSections) => {
    setEdittingPage(page);
    setMode("edit");
    setTempCategory(page.category ?? "메인 페이지");
    setTempSubCategory(page.sub_category ?? "메인페이지");
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (mode === "new") {
      onCreatePage(tempCategory, tempSubCategory);
    } else {
      onUpdatePage(edittingPage!.id, tempCategory, tempSubCategory);
    }
    setDialogOpen(false);
  };

  const handleDeleteInDialog = () => {
    if (edittingPage) {
      onRemovePage(edittingPage.id);
    }
    setDialogOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full px-1 py-2 overflow-y-auto space-y-1">
      {pages.map((page) => (
        <div key={page.id} className="flex items-center justify-between">
          {/* (1) 페이지명 클릭 -> 단순히 페이지 선택만 */}
          <Button
            variant="link"
            onClick={() => handlePageSelect(page)}
            className={cn(
              selectedPage?.id === page.id ? "underline font-bold" : "",
              "text-foreground p-2"
            )}
          >
            {page.sub_category}
          </Button>

          {/* (2) 페이지 우측 아이콘들 (isNew 분기) */}
          <div className="flex items-center space-x-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEditDialog(page);
              }}
              className="px-1"
            >
              <Edit size={12} />
            </Button>
          </div>
        </div>
      ))}

      {/* 맨 하단 "+페이지 추가" 버튼 */}
      <Button
        variant="link"
        onClick={handleOpenAddDialog}
        className="text-primary"
      >
        +페이지 추가
      </Button>

      {/* 다이얼로그 (기존 페이지/새 페이지 공용) */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "페이지 정보 수정" : "새 페이지 추가"}
            </DialogTitle>
          </DialogHeader>

          {/* 카테고리 Select */}
          {/* <div className="mt-2">
            <label className="block text-sm font-medium mb-1">
              페이지 카테고리
            </label>
            <Select
              value={tempCategory}
              onValueChange={(value: PageCategory) => setTempCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="카테고리를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>카테고리</SelectLabel>
                  {pageCategoryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}

          {/* 서브카테고리 Select */}
          <div className="mt-4">
            <label className="block text-sm font-medium  mb-1">
              페이지 종류
            </label>
            <Select
              value={tempSubCategory}
              onValueChange={(value: PageSubcategory) =>
                setTempSubCategory(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder=" 페이지를 선택해주세요" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {pageSubcategoryOptions.map((group) => (
                  <SelectGroup key={group.groupLabel}>
                    <SelectLabel>{group.groupLabel}</SelectLabel>
                    {group.options.map((opt) => (
                      <HoverSelectItem key={opt.value} option={opt} />
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 버튼 영역: 취소 / (기존:삭제) / 확인 */}
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              취소
            </Button>

            {/* 기존 페이지라면 "삭제" 버튼 표시 (isNew === false) */}
            {mode === "edit" && (
              <Button variant="destructive" onClick={handleDeleteInDialog}>
                삭제
              </Button>
            )}

            <Button onClick={handleConfirm} disabled={!tempSubCategory}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
