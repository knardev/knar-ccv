"use client";

import React, { useEffect } from "react";
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
    router.back();
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
