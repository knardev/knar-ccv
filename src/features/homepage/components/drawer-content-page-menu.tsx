import React from "react";
// components
import { Button } from "@/components/ui/button";
// types
import { PageWithSections } from "@/features/homepage/types/types";
import { cn } from "@/lib/utils";

export function DrawerContentPageMenu({
  pages,
  selectedPage,
  handlePageSelect,
}: {
  pages: PageWithSections[];
  selectedPage: PageWithSections | null;
  handlePageSelect: (page: PageWithSections) => void;
}) {
  return (
    <div className="flex items-center w-full px-4 py-2 border-b border-slate-200">
      {pages.map((page) => (
        <Button
          key={page.id}
          variant="link"
          onClick={() => handlePageSelect(page)}
          className={cn(
            `${selectedPage?.id === page.id ? "underline font-bold" : ""}`,
            "text-slate-700"
          )}
        >
          {page.category}
        </Button>
      ))}
    </div>
  );
}
