"use client";

import React, { useState } from "react";
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
import { DeleteDialogButton } from "@/components/ui-custom/delete-dialog-button";
import { BaseSelectWithGroup } from "@/components/ui-custom/base-select-with-group";
import { deleteSection } from "@/features/homepage/actions/delete-section";
import { updateSection } from "@/features/homepage/actions/update-section";
import { HoverSelectItem } from "@/features/homepage/components/hover-select-item";
// utils
import { sectionTypeOptions } from "@/features/homepage/utils/options";
// types
import { Enums } from "@/types/database.types";
import { Section } from "@/features/homepage/types/types";

interface SectionPreviewCardProps {
  editable: boolean;
  section: Section;
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

export const SectionPreviewCard: React.FC<SectionPreviewCardProps> = ({
  editable,
  section,
  setSections,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(section.type);

  const handleDelete = async () => {
    await deleteSection(section.id);
    setSections((prev) => prev.filter((s) => s.id !== section.id));
  };

  const handleSave = async (value: string) => {
    const newSectionType = value as Enums<"section_type">;
    setSelectedType(newSectionType);
    await updateSection(section.id, { type: newSectionType });
    setSections((prev) =>
      prev.map((s) =>
        s.id === section.id ? { ...s, type: newSectionType } : s
      )
    );
    // setIsDialogOpen(false);
  };

  // const handleTypeChange = (value: string) => {
  //   setSelectedType(value as Enums<"section_type">);
  // };

  if (editable) {
    return (
      <div className="relative group">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <AspectRatio
              ratio={16 / 9}
              className="bg-transparent border border-muted cursor-pointer overflow-hidden shadow-sm rounded-sm"
            >
              <Image
                src={section.image_url[0]}
                alt={`${section.type ?? "섹션"}`}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </AspectRatio>
          </DialogTrigger>

          <DialogContent className="max-w-[750px]">
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
                <BaseSelectWithGroup
                  groups={sectionTypeOptions}
                  placeholder="섹션 타입을 선택하세요"
                  value={selectedType ?? ""}
                  onValueChange={handleSave}
                  width="w-full"
                  CustomSelectItem={({ option }) => (
                    <HoverSelectItem option={option} />
                  )}
                />
              </div>
            </div>
            {/* <div className="mt-4 flex justify-end">
              <SaveButton onSave={handleSave} />
            </div> */}
          </DialogContent>
        </Dialog>

        {/* 삭제 버튼 (우측 상단 or 좌측 등 원하는 위치) */}
        <DeleteDialogButton
          name={section.type ?? "섹션"}
          onDelete={handleDelete}
          navigateBack={false}
          trigger={
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 left-2 bg-gray-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </Button>
          }
        />

        <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* 상단 그라데이션 영역 */}
          <div className="w-full h-10 bg-gradient-to-b from-black/40 to-transparent rounded-sm" />
          {/* 오른쪽 상단 배지 */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-sm font-medium rounded-full">
            {section.type ?? "섹션"}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative group">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <AspectRatio
              ratio={16 / 9}
              className="bg-transparent border border-muted overflow-hidden rounded-sm shadow-sm cursor-pointer"
            >
              <Image
                src={section.image_url[0]}
                alt={`SectionWithImageUrl ${section.type ?? "섹션"}`}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </AspectRatio>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px] min-w-[1000px]">
            <DialogHeader></DialogHeader>
            <AspectRatio ratio={16 / 9} className="w-full">
              <Image
                src={section.image_url[0]}
                alt={`SectionWithImageUrl ${section.type ?? "섹션"}`}
                fill
                className="object-cover rounded-md"
              />
            </AspectRatio>
          </DialogContent>
        </Dialog>

        <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-full h-16 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute top-5 right-4 px-3 py-1 bg-black/40 text-white text-base font-medium rounded-full">
            {section.type ?? "섹션"}
          </div>
        </div>
      </div>
    );
  }
};
