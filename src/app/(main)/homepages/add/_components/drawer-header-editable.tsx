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
import { addHomepage } from "../_actions/add-homepage";
import { beingAddedHomepageState } from "../_states/beingAddedHomepage";
import { addSections } from "../_actions/add-sections";
import { beingAddedSectionsState } from "../_states/beingAddedSections";
import { useProfileData } from "@/hooks/useProfileData";

export function HomepageAddDrawerHeaderEditable() {
  const router = useRouter();
  const addedHomepage = useRecoilValue(beingAddedHomepageState);
  const addedSections = useRecoilValue(beingAddedSectionsState);

  const resetHomepage = useResetRecoilState(beingAddedHomepageState); // Reset function for homepage
  const resetSections = useResetRecoilState(beingAddedSectionsState); // Reset function for sections

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
        const homepageWithProfile = {
          ...addedHomepage,
          profile_id: profile.id,
        };

        const newHomepage = await addHomepage(homepageWithProfile);

        // Update sections with the 'homepage_id' and save them
        const updatedSections = addedSections.map((section) => ({
          ...section,
          homepage_id: newHomepage.id,
        }));

        await addSections(updatedSections);

        // Reset Recoil states after saving
        resetHomepage();
        resetSections();

        toast.success("변경사항이 성공적으로 저장되었습니다.");
        router.refresh();
        router.push(`/homepages/${newHomepage.id}`);
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("변경사항을 저장하는 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <DrawerHeader>
      <DrawerTitle>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={"https://www.google.com/favicon.ico"}
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
