"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { beingEdittedHomepageState } from "../_states/beingEdittedHomepage";
import { CircleX, Save } from "lucide-react";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DeleteDialogButton } from "@/components/ui-custom/delete-dialog-button";
import { SaveButton } from "@/components/ui-custom/save-button";
import { Enums, Tables } from "@/types/database.types";
import { updateHomepage } from "../_actions/update-homepage";
import { deleteHomepage } from "../_actions/delete-homepage";
import { revalidate } from "@/utils/revalidate";

type Homepage = Tables<"homepages">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

interface HomepageDetailDrawerProps {
  data: HomepageWithSections;
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

  const handleDeleteHomepage = async () => {
    // 이전 페이지 URl을 저장하고, 삭제 후에 이전 페이지로 이동
    const previousUrl = document.referrer;

    await deleteHomepage(data.id);

    await revalidate(previousUrl);
    router.push(previousUrl);
  };

  return (
    <DrawerHeader>
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
            <DeleteDialogButton
              name={data.name}
              onDelete={handleDeleteHomepage}
              // navigateBack={true}
            />
          </div>
        </div>
      </DrawerTitle>
      <DrawerDescription></DrawerDescription>
    </DrawerHeader>
  );
}
