// components/HomepageDetail.tsx
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomepageAddDrawerContentEditableForm } from "./drawer-content-editable-form";
import { ImageUploader } from "./imageUploader";
import { DrawerContentPageMenu } from "./drawer-content-page-menu";
import { PageWithSectionsInsert } from "../types";
import { beingAddedHomepageState } from "../_states";

export function HomepageAddDrawerContentEditable() {
  const homepageState = useRecoilValue(beingAddedHomepageState);
  const [selectedPage, setSelectedPage] = useState<PageWithSectionsInsert>(
    homepageState.pages[0]
  );

  useEffect(() => {
    if (selectedPage) {
      // Find the updated version of the selected page in the homepageState
      const updatedPage = homepageState.pages.find(
        (page) => page.id === selectedPage.id
      );
      if (updatedPage) {
        setSelectedPage(updatedPage);
      }
    }
  }, [homepageState, selectedPage?.id, selectedPage]);

  const handlePageSelect = (page: PageWithSectionsInsert) => {
    setSelectedPage(page);
  };

  return (
    <div className="h-[80vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={70}>
          <DrawerContentPageMenu
            pages={homepageState.pages}
            selectedPage={selectedPage}
            handlePageSelect={handlePageSelect}
          />
          <ScrollArea className="h-[73vh] p-4">
            <div className="flex justify-center mb-3">
              <ImageUploader selectedPage={selectedPage} />
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-[80vh]">
            <HomepageAddDrawerContentEditableForm />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
