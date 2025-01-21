"use client";

import React, { useState } from "react";
// hooks
import { useRouter } from "next/navigation";
// components
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { DeleteDialogButton } from "@/components/ui-custom/delete-dialog-button";
import { SaveButton } from "@/components/ui-custom/save-button";
import { BaseSelect } from "@/components/ui-custom/base-select";
// actions
import { deleteSection } from "@/features/homepage/actions/delete-section";
import { updateSection } from "@/features/homepage/actions/update-section";
// utils
import { sectionTypeOptions } from "@/features/homepage/utils/options";
// types
import { Enums } from "@/types/database.types";
import { SectionWithImageUrl } from "@/features/homepage/types/types";

interface SectionPreviewCardProps {
  section: SectionWithImageUrl;
}

export const SectionPreviewCard: React.FC<SectionPreviewCardProps> = ({
  section,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(section.type);

  const handleDelete = async () => {
    await deleteSection(section.id);
  };

  const handleSave = async () => {
    await updateSection(section.id, { type: selectedType });
    setIsDialogOpen(false);
    router.refresh();
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as Enums<"section_type">);
  };

  return (
    <>
      <div className="relative group">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <AspectRatio
              ratio={16 / 9}
              className="bg-transparent border border-slate-200 cursor-pointer overflow-hidden rounded-md"
            >
              <Image
                src={section.imageUrl}
                alt={`SectionWithImageUrl ${section.type ?? "섹션"}`}
                fill
                className="h-full w-full object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </AspectRatio>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>섹션 설정</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={section.image_url[0]}
                  alt={`SectionWithImageUrl ${section.type ?? "섹션"}`}
                  fill
                  className="object-cover rounded-md"
                />
              </AspectRatio>
              <div className="mt-4 w-full">
                <BaseSelect
                  options={sectionTypeOptions}
                  placeholder="섹션 타입을 선택하세요"
                  value={selectedType ?? ""}
                  onValueChange={handleTypeChange}
                  width="w-full"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <SaveButton onSave={handleSave} />
            </div>
          </DialogContent>
        </Dialog>
        {/* Delete Icon */}
        <DeleteDialogButton
          name={section.type ?? "섹션"}
          onDelete={handleDelete}
          navigateBack={true}
          trigger={
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </Button>
          }
        />
      </div>
    </>
  );
};
