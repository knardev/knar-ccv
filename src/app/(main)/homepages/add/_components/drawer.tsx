"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { HomepageAddDrawerHeaderEditable } from "./drawer-header-editable";
import { HomepageAddDrawerContentEditable } from "./drawer-content-editable";
import { Enums, Tables } from "@/types/database.types";

interface HomepageAddDrawerProps {
  accountRole: Enums<"account_role">;
}

export function HomepageAddDrawer({ accountRole }: HomepageAddDrawerProps) {
  const router = useRouter();

  const onClose = () => {
    if (window.history.length > 2) {
      // Go back to the previous page if history exists
      router.back();
    } else {
      // Redirect to the homepage if no history exists
      router.push("/");
    }
  };

  if (accountRole !== "ADMIN") {
    // Redirect to the homepage if the user is not an admin
    router.back();
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <HomepageAddDrawerHeaderEditable />
        <HomepageAddDrawerContentEditable />
      </DrawerContent>
    </Drawer>
  );
}
