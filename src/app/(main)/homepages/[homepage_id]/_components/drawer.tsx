"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { HomepageDetailDrawerHeader } from "./drawer-header";
import { HomepageDetailDrawerContent } from "./drawer-content";
import { HomepageDetailDrawerHeaderEditable } from "./drawer-header-editable";
import { HomepageDetailDrawerContentEditable } from "./drawer-content-editable";
import { Enums, Tables } from "@/types/database.types";
import { usePreviousSearchParams } from "@/hooks/use-previous-search-params";
import { HomepageWithPageAndSections } from "../types";

interface HomepageDetailDrawerProps {
  data: HomepageWithPageAndSections | null;
  accountRole: Enums<"account_role">;
}

export function HomepageDetailDrawer({
  data,
  accountRole,
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

  if (mode === "edit" && accountRole !== "ADMIN") {
    // Redirect to the homepage if the user is not an admin
    router.back();
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        {mode === "edit" ? (
          <>
            <HomepageDetailDrawerHeaderEditable
              data={data}
              accountRole={accountRole}
            />
            <HomepageDetailDrawerContentEditable data={data} />
          </>
        ) : (
          <>
            <HomepageDetailDrawerHeader data={data} accountRole={accountRole} />
            <HomepageDetailDrawerContent data={data} />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
