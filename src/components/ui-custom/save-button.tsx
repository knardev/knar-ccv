"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  onSave: () => Promise<void>;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await onSave();
        toast.success("변경사항이 성공적으로 저장되었습니다.");
        router.refresh();
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("변경사항을 저장하는 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <Button
      variant="default"
      className="text-lg"
      onClick={handleSave}
      disabled={isPending}
    >
      <Save />
      {isPending ? "저장 중" : "저장"}
    </Button>
  );
};
