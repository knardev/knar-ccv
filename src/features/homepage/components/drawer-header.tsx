// components
import Link from "next/link";
import Image from "next/image";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ImagePlus, Pencil, Bookmark, Share2 } from "lucide-react";
import { DeleteDialogButton } from "@/components/ui-custom/delete-dialog-button";
// actions
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

export function HomepageDetailDrawerHeader({
  data,
  accountRole,
}: HomepageDetailDrawerProps) {
  const onDelete = async () => {
    await deleteHomepage(data.id);
    await revalidate("/explore/homepage/design", "layout");
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
            {/* <Button variant="ghost" className="text-lg">
              <Bookmark />
              저장
            </Button>
            <Button variant="ghost" className="text-lg">
              <Share2 />
              공유
            </Button> */}
            {accountRole === "ADMIN" && (
              <>
                {/* <Button variant="ghost" className="text-lg">
                  <ImagePlus />
                  섹션 추가
                </Button> */}
                <Link href={`/homepages/${data.id}?mode=edit`}>
                  <Button variant="ghost" className="text-lg">
                    <Pencil />
                    수정
                  </Button>
                </Link>
                <DeleteDialogButton name={data.name} onDelete={onDelete} />
              </>
            )}
          </div>
        </div>
      </DrawerTitle>
      <DrawerDescription></DrawerDescription>
    </DrawerHeader>
  );
}
