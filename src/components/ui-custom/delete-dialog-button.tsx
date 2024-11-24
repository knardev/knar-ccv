"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteDialogButtonProps {
  name: string; // Name of the item to be deleted
  onDelete: () => Promise<void>; // Callback function to handle the delete action
  navigateBack?: boolean; // Whether to navigate back after deletion
  trigger?: React.ReactNode; // Custom trigger button
}

export const DeleteDialogButton: React.FC<DeleteDialogButtonProps> = ({
  name,
  onDelete,
  navigateBack = false,
  trigger,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();

      if (navigateBack) {
        // Get the previous URL from document.referrer
        const previousURL = document.referrer;

        // Ensure previousURL is within the same origin for security
        if (
          previousURL &&
          new URL(previousURL).origin === window.location.origin
        ) {
          router.push(previousURL);
        } else {
          // Fallback to a default URL if referrer is not available or from a different origin
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="icon">
            <Trash2 />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>알림</DialogTitle>
          <DialogDescription>
            <strong>{name}</strong>을(를) 삭제하시겠습니까?
            <br />
            삭제된 데이터는 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            className="text-lg"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
