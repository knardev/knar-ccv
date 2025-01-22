"use client";

import React, { useEffect } from "react";
// hooks
import { useRouter } from "next/navigation";
// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { HomepageAddDrawerHeaderEditable } from "@/features/homepage/components/add/drawer-header-editable";
import { HomepageAddDrawerContentEditable } from "@/features/homepage/components/add/drawer-content-editable";

interface HomepageAddDrawerProps {
  addable: boolean;
}

export function HomepageAddDrawer({ addable }: HomepageAddDrawerProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  if (!addable) {
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
