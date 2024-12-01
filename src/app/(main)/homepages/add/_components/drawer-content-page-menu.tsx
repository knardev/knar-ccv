import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BaseSelect } from "@/components/ui-custom/base-select";
import { Enums } from "@/types/database.types";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { beingAddedHomepageState } from "../_states";
import { PageWithSectionsInsert } from "../types";
import { v4 as uuidv4 } from "uuid";
import { pageCategoryOptions, pageSubcategoryOptions } from "../options";
import { Trash } from "lucide-react";

export function DrawerContentPageMenu({
  pages,
  selectedPage,
  handlePageSelect,
}: {
  pages: PageWithSectionsInsert[];
  selectedPage: PageWithSectionsInsert;
  handlePageSelect: (page: PageWithSectionsInsert) => void;
}) {
  type _pageCategory = Enums<"page_category">;
  type _pageSubcategory = Enums<"page_subcategory">;

  const [homepageState, setHomepageState] = useRecoilState(
    beingAddedHomepageState
  );

  // State for managing Add Page dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newPageCategory, setNewPageCategory] =
    useState<_pageCategory>("메인 페이지");
  const [newPageSubcategory, setNewPageSubcategory] =
    useState<_pageSubcategory>("인사말");

  // State for managing Edit Page dialog
  const [editDialogPageId, setEditDialogPageId] = useState<string | null>(null);

  const handleAddPage = () => {
    const newPage: PageWithSectionsInsert = {
      id: uuidv4(), // Temporary unique ID
      homepage_id: "", // To be updated later
      category: "메인 페이지",
      sub_category: "인사말",
      sections: [],
    };

    setHomepageState((prevState) => ({
      ...prevState,
      pages: [...prevState.pages, newPage],
    }));

    handlePageSelect(newPage);
    setAddDialogOpen(false);
    // Reset the new page category and subcategory
    setNewPageCategory("메인 페이지");
    setNewPageSubcategory("인사말");
  };

  const handleEditPage = (
    field: "category" | "sub_category",
    value: string
  ) => {
    if (!editDialogPageId) return;

    setHomepageState((prevState) => ({
      ...prevState,
      pages: prevState.pages.map((page) =>
        page.id === editDialogPageId ? { ...page, [field]: value } : page
      ),
    }));
  };

  const handleDeletePage = () => {
    if (!editDialogPageId) return;

    setHomepageState((prevState) => ({
      ...prevState,
      pages: prevState.pages.filter((page) => page.id !== editDialogPageId),
    }));

    if (selectedPage?.id === editDialogPageId) {
      handlePageSelect(pages[0] || null); // Select the first page or null
    }

    setEditDialogPageId(null);
  };

  return (
    <div className="flex items-center w-full px-4 py-2 border-b border-slate-200">
      {/* Page List */}
      {pages.map((page) => (
        <React.Fragment key={page.id}>
          <div className="flex items-center">
            <Button
              variant="link"
              className={cn(
                `${selectedPage?.id === page.id ? "underline font-bold" : ""}`,
                "text-slate-700 pr-0"
              )}
              onClick={() => {
                handlePageSelect(page);
              }}
            >
              {page.category}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-slate-700"
              onClick={() => setEditDialogPageId(page.id ?? null)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          {editDialogPageId === page.id && (
            <Dialog
              open={editDialogPageId === page.id}
              onOpenChange={(isOpen) =>
                setEditDialogPageId(isOpen ? page.id ?? null : null)
              }
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>페이지 수정</DialogTitle>
                  <DialogDescription>
                    페이지를 수정하거나 삭제할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex space-x-2 items-center">
                    <Label className="w-[25%]" htmlFor="page_category">
                      카테고리
                    </Label>
                    <BaseSelect
                      id="page_category"
                      options={pageCategoryOptions}
                      placeholder="페이지의 종류를 입력하세요."
                      value={page.category}
                      onValueChange={(value) =>
                        handleEditPage("category", value as _pageCategory)
                      }
                      width="w-full"
                    />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <Label className="w-[25%]" htmlFor="page_subcategory">
                      소분류
                    </Label>
                    <BaseSelect
                      id="page_subcategory"
                      options={pageSubcategoryOptions}
                      placeholder="페이지의 소분류를 선택하세요."
                      value={page.sub_category ?? ""}
                      onValueChange={(value) =>
                        handleEditPage(
                          "sub_category",
                          value as _pageSubcategory
                        )
                      }
                      width="w-full"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="destructive" onClick={handleDeletePage}>
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setEditDialogPageId(null)}
                  >
                    저장
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </React.Fragment>
      ))}

      {/* Add Page Button */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="ml-4 text-slate-700">
            + 페이지 추가
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>페이지 추가</DialogTitle>
            <DialogDescription>
              새로운 서브페이지를 추가해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex space-x-2 items-center">
              <Label className="w-[25%]" htmlFor="page_category">
                카테고리
              </Label>
              <BaseSelect
                id="page_category"
                options={pageCategoryOptions}
                placeholder="페이지의 종류를 입력하세요."
                value={newPageCategory}
                onValueChange={(value) =>
                  setNewPageCategory(value as _pageCategory)
                }
                width="w-full"
              />
            </div>
            <div className="flex space-x-2 items-center">
              <Label className="w-[25%]" htmlFor="page_subcategory">
                소분류
              </Label>
              <BaseSelect
                id="page_subcategory"
                options={pageSubcategoryOptions}
                placeholder="페이지의 소분류를 선택하세요."
                value={newPageSubcategory}
                onValueChange={(value) =>
                  setNewPageSubcategory(value as _pageSubcategory)
                }
                width="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleAddPage()}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
