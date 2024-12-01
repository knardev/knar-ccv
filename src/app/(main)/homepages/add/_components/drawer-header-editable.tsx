"use client";

import { useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { CircleX, Save } from "lucide-react";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { beingAddedHomepageState } from "../_states";
import { addHomepage } from "../_actions/add-homepage";
import { addSections } from "../_actions/add-sections";
import { addPages } from "../_actions/add-pages";
import { useProfileData } from "@/hooks/useProfileData";
import { revalidate } from "@/utils/revalidate";
import { TablesInsert } from "@/types/database.types";

export function HomepageAddDrawerHeaderEditable() {
  const router = useRouter();
  const addedHomepage = useRecoilValue(beingAddedHomepageState);

  const resetHomepage = useResetRecoilState(beingAddedHomepageState);

  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileData();
  const [isPending, startTransition] = useTransition();

  const onCancel = () => {
    router.back();
  };

  const onSave = () => {
    if (isProfileLoading) {
      toast.error("다시 시도해주세요.");
      return;
    }

    if (profileError) {
      toast.error("다시 시도해주세요.");
      return;
    }

    if (!profile?.id) {
      toast.error("다시 시도해주세요.");
      return;
    }

    startTransition(async () => {
      try {
        // Save the homepage first to get the 'homepage_id'
        const { pages, ...homepageData } = addedHomepage;
        const homepageWithProfile = {
          ...homepageData,
          profile_id: profile.id,
        };

        const newHomepage = await addHomepage(homepageWithProfile);

        // Map temporary page IDs to real IDs
        const pageIdMap = new Map<string, string>(); // Map<tempId, realId>

        // Save pages and collect new pages with real IDs
        const newPages = [];
        for (const page of pages) {
          const { sections, id: tempPageId, ...pageData } = page;
          const pageWithHomepageId = {
            ...pageData,
            homepage_id: newHomepage.id as string,
          };

          const savedPage = await addPages([pageWithHomepageId]);
          if (!savedPage || savedPage.length === 0) {
            throw new Error("Failed to save page");
          }

          const newPage = savedPage[0];
          pageIdMap.set(tempPageId ?? "", newPage.id as string);
          newPages.push({ ...newPage, sections, tempId: tempPageId });
        }

        // Map temporary section IDs to real IDs if needed
        // Collect sections to save
        const sectionsToSave: TablesInsert<"sections">[] = [];

        for (const page of newPages) {
          const { sections, tempId: tempPageId } = page;
          const realPageId = page.id;

          for (const section of sections) {
            const { id: tempSectionId, ...sectionData } = section;
            const sectionWithIds = {
              ...sectionData,
              homepage_id: newHomepage.id as string,
              page_id: realPageId as string,
            };
            sectionsToSave.push(sectionWithIds);
          }
        }

        // Save sections
        if (sectionsToSave.length > 0) {
          await addSections(sectionsToSave);
        }

        toast.success("변경사항이 성공적으로 저장되었습니다.");

        await revalidate(`/explore/homepage/design`, "layout");
        // Reset Recoil states after saving
        resetHomepage();
        router.replace(`/homepages/${newHomepage.id}`);
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("변경사항을 저장하는 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <DrawerHeader className="border-b border-slate-200 p-4 gap-0">
      <DrawerTitle>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={
                "https://oguzdjlnwsdproeuoywm.supabase.co/storage/v1/object/public/images/knar%20logo.jpg"
              }
              alt="temp favicon"
              width={25}
              height={25}
            />
            <h1 className="text-2xl font-bold">
              새로운 홈페이지를 추가합니다.
            </h1>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" className="text-lg" onClick={onCancel}>
              <CircleX />
              취소
            </Button>
            <Button
              variant="default"
              className="text-lg"
              onClick={onSave}
              disabled={isPending}
            >
              <Save />
              {isPending ? "저장 중" : "저장"}
            </Button>
          </div>
        </div>
      </DrawerTitle>
      <DrawerDescription></DrawerDescription>
    </DrawerHeader>
  );
}
