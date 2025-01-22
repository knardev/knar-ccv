"use client";

// states
import {
  beingAddedHomepageState,
  beingAddedSectionsState,
  beingAddedPageWithSectionState,
} from "@/features/homepage/atoms/states";
// hooks
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useProfileData } from "@/hooks/useProfileData";
// components
import Image from "next/image";
import { CircleX, Save } from "lucide-react";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// actions
import { addNewHomepage } from "@/features/homepage/actions/add-new-homepage";

export function HomepageAddDrawerHeaderEditable() {
  const router = useRouter();
  const addedHomepage = useRecoilValue(beingAddedHomepageState);
  const addedPageWithSections = useRecoilValue(beingAddedPageWithSectionState);

  const resetHomepage = useResetRecoilState(beingAddedHomepageState);
  const resetPageWithSections = useResetRecoilState(
    beingAddedPageWithSectionState
  );

  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileData();
  const [isPending, startTransition] = useTransition();

  const onCancel = () => {
    resetHomepage();
    resetPageWithSections();
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

        const newHomepage = await addNewHomepage(
          homepageWithProfile,
          addedPageWithSections
        );

        toast.success("변경사항이 성공적으로 저장되었습니다.");

        // Reset Recoil states after saving
        resetHomepage();
        resetPageWithSections();
        router.replace(`/homepages/${newHomepage.id}`);
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("변경사항을 저장하는 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <DrawerHeader className="border-b border-b-muted p-4 gap-0">
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
