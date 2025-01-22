// components/SearchPageTemplate.tsx
import React from "react";
import Link from "next/link";
import { ImagePlus, Menu } from "lucide-react"; // Import the Menu icon
import { Button } from "@/components/ui/button";
import { checkAccountRole } from "@/utils/auth/check-account-role";
import { SidebarTrigger } from "@/components/ui/sidebar"; // Import the trigger

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
    <div className="w-full flex-1 relative overflow-hidden">
      <header className="absolute top-0 inset-x-0 h-16 z-50 bg-background px-4">
        <div className="w-full flex justify-between items-center h-full">
          <div className="flex h-16 items-center">
            <SidebarTrigger className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition">
              <Menu className="w-4 h-4" />
              <span className="text-sm">Toggle</span>
            </SidebarTrigger>
          </div>

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
        </div>
      </header>

      {/* Additional Content - Scrollable */}
      <div className="w-full h-full overflow-y-auto pt-16 pb-4 px-4">
        {children}
      </div>
    </div>
  );
}
