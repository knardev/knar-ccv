"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { HomepageDetailDrawerHeader } from "./drawer-header";
import { HomepageDetailDrawerContent } from "./drawer-content";
import { HomepageDetailDrawerHeaderEditable } from "./drawer-header-editable";
import { HomepageDetailDrawerContentEditable } from "./drawer-content-editable";
// hooks
import { usePreviousSearchParams } from "@/hooks/use-previous-search-params";
// types
import { HomepageWithPageAndSections } from "@/features/homepage/types/types";

interface HomepageDetailDrawerProps {
  data: HomepageWithPageAndSections | null;
  editable: boolean;
}

export function HomepageDetailDrawer({
  data,
  editable,
}: HomepageDetailDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { moveToPreviousSearchParams } = usePreviousSearchParams();

  const mode = React.useMemo(() => {
    return searchParams.get("mode") || "view";
  }, [searchParams]);

  const onClose = () => {
    router.back();
  };

  if (!data) {
    console.error("Homepage not found");
    moveToPreviousSearchParams();
    return null;
  }

  if (mode === "edit" && !editable) {
    // Redirect to the homepage if the user is not an admin
    router.back();
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        {mode === "edit" ? (
          <>
            <HomepageDetailDrawerHeaderEditable data={data} />
            <HomepageDetailDrawerContentEditable
              data={data}
              editable={editable}
            />
          </>
        ) : (
          <>
            <HomepageDetailDrawerHeader data={data} editable={editable} />
            <HomepageDetailDrawerContent data={data} />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
