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
// import { BaseSelect } from "@/components/ui-custom/base-select";
import { BaseSelectWithGroup } from "@/components/ui-custom/base-select-with-group";
import { DeleteDialogButton } from "@/components/ui-custom/delete-dialog-button";
import { X, Save } from "lucide-react";
// utils
import { sectionTypeOptions } from "@/features/homepage/utils/options";
import { Enums, TablesInsert } from "@/types/database.types";
import { PageWithSections, Section } from "@/features/homepage/types/types";

interface SectionCardProps {
  pageId: string;
  section: Section;
  handleRemoveSection: (pageId: string, sectionId: string) => void;
  handleUpdateSectionType: (
    sectionId: string,
    type: Enums<"section_type">
  ) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  pageId,
  section,
  handleRemoveSection,
  handleUpdateSectionType,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(section.type);

  const handleDelete = () => {
    // pageId와 동일한 페이지의 섹션에서 섹션과 동일한 id를 가진 섹션을 제외한 섹션들만 필터링
    handleRemoveSection(pageId, section.id);
    setIsDialogOpen(false);
  };

  const handleTypeChange = (value: string) => {
    const newSectionType = value as Enums<"section_type">;
    handleUpdateSectionType(section.id, newSectionType);
    setSelectedType(newSectionType);
  };

  return (
    <>
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
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>섹션 설정</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={section.image_url[0]}
                  alt={`Section ${section.type}`}
                  fill
                  className="object-cover rounded-md"
                />
              </AspectRatio>
              <div className="mt-4 w-full">
                <BaseSelectWithGroup
                  groups={sectionTypeOptions}
                  placeholder="섹션 타입을 선택하세요"
                  value={selectedType ?? ""}
                  onValueChange={handleTypeChange}
                  width="w-full"
                />
              </div>
            </div>
            {/* <div className="mt-4 flex justify-end">
              <Button onClick={handleSave}>
                <Save />
                저장
              </Button>
            </div> */}
          </DialogContent>
        </Dialog>

        {/* Delete Icon */}
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
          <div className="w-full h-10 bg-gradient-to-b from-black/40 to-transparent" />
          {/* 오른쪽 상단 배지 */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-sm font-medium rounded-full">
            {section.type ?? "섹션"}
          </div>
        </div>
      </div>
    </>
  );
};
