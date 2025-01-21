"use client";

// states
import { beingEdittedHomepageState } from "@/features/homepage/atoms/states";
// hooks
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
//components
import Image from "next/image";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DeleteDialogButton } from "@/components/ui-custom/delete-dialog-button";
import { SaveButton } from "@/components/ui-custom/save-button";
import { CircleX, Save } from "lucide-react";
// actions
import { updateHomepage } from "@/features/homepage/actions/update-homepage";
import { deleteHomepage } from "@/features/homepage/actions/delete-homepage";
// types
import { Enums } from "@/types/database.types";
import { HomepageWithPageAndSections } from "@/features/homepage/types/types";
// utils
import { revalidate } from "@/utils/revalidate";

interface HomepageDetailDrawerProps {
  data: HomepageWithPageAndSections;
  accountRole: Enums<"account_role">;
}

export function HomepageDetailDrawerHeaderEditable({
  data,
  accountRole,
}: HomepageDetailDrawerProps) {
  const router = useRouter();
  const updatedHomepage = useRecoilValue(beingEdittedHomepageState);

  const onCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    await updateHomepage(updatedHomepage.id, updatedHomepage);
    router.back();
  };

  const onDelete = async () => {
    await deleteHomepage(data.id);
    await revalidate("/explore/homepage/design", "page");
  };

  return (
    <DrawerHeader className="border-b border-slate-200 p-4 gap-0">
      <DrawerTitle>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={data.favicon_url || "https://www.google.com/favicon.ico"}
              alt={`${data.name} favicon`}
              width={25}
              height={25}
            />
            <h1 className="text-2xl font-bold">{data.name}</h1>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" className="text-lg" onClick={onCancel}>
              <CircleX />
              취소
            </Button>
            <SaveButton onSave={handleSave} />
            <DeleteDialogButton name={data.name} onDelete={onDelete} />
          </div>
        </div>
      </DrawerTitle>
      <DrawerDescription></DrawerDescription>
    </DrawerHeader>
  );
}
