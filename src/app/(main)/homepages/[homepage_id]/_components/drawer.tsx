"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { HomepageDetailDrawerHeader } from "./drawer-header";
import { HomepageDetailDrawerContent } from "./drawer-content";
import { HomepageDetailDrawerHeaderEditable } from "./drawer-header-editable";
import { HomepageDetailDrawerContentEditable } from "./drawer-content-editable";
import { Enums, Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

interface HomepageDetailDrawerProps {
  data: HomepageWithSections;
  accountRole: Enums<"account_role">;
}

export function HomepageDetailDrawer({
  data,
  accountRole,
}: HomepageDetailDrawerProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const mode = React.useMemo(() => {
    return searchParams.get("mode") || "view";
  }, [searchParams]);

  const onClose = () => {
    const referrer = document.referrer; // Get the referring URL
    const currentOrigin = window.location.origin;

    if (referrer && referrer.includes(currentOrigin)) {
      const relativeReferrer = referrer.replace(currentOrigin, "");

      if (relativeReferrer.includes("/add")) {
        // If the referrer contains '/add', go back two pages
        window.history.go(-2);
      } else {
        // Otherwise, go back one page
        router.back();
      }
    } else {
      // Redirect to the homepage if no valid referrer exists
      router.push("/");
    }
  };

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
