// components/HomepageDetail.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomepageAddDrawerContentEditableForm } from "./drawer-content-editable-form";
import { ImageUploader } from "./imageUploader";

export function HomepageAddDrawerContentEditable() {
  return (
    <div className="h-[77vh]">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={70}>
          <ScrollArea className="h-[77vh] p-4">
            <div className="flex justify-center mb-3">
              <ImageUploader />
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle disabled className="w-0" />
        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-[77vh]">
            <HomepageAddDrawerContentEditableForm />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
