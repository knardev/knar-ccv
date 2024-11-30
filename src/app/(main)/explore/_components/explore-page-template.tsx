// components/SearchPageTemplate.tsx
import React from "react";
import Link from "next/link";
import { Search, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkAccountRole } from "@/utils/auth/check-account-role";

interface ExplorePageTemplateProps {
  // Additional selectors to be rendered alongside IndustrySelector
  selectors?: React.ReactNode;
  // Any additional content or sections
  children?: React.ReactNode;
}

export async function ExplorePageTemplate({
  selectors,
  children,
}: ExplorePageTemplateProps) {
  const accountRole = await checkAccountRole();

  return (
    <div className="w-full h-[85vh] flex flex-col relative">
      <div className="absolute top-0 w-full h-20">
        {/* Search Input Section */}
        {/* <section className="w-1/2 m-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="w-full h-[40px] pl-10"
          />
        </div>
      </section> */}

        {/* Selectors Section */}
        <section className="w-full flex justify-between">
          <div className="w-full flex space-x-2 h-16">{selectors}</div>
          <div>
            {accountRole === "ADMIN" && (
              <Link href={`/homepages/add`}>
                <Button variant="default" className="text-lg">
                  <ImagePlus />
                  추가
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* Additional Content - Scrollable */}
      <div className="flex-1 overflow-y-auto mt-20 py-5">{children}</div>
    </div>
  );
}
