import React from "react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/database.types";
import { PageWithSections } from "../types";
import { cn } from "@/lib/utils";
type Page = Tables<"pages">;

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
