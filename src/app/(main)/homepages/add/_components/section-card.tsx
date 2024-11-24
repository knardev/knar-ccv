// components/SectionPreviewCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRecoilState } from "recoil";
import { beingAddedSectionsState } from "../_states/beingAddedSections";
import { BaseSelect } from "@/components/ui-custom/base-select";
import { sectionTypeOptions } from "../options";
import { Enums, TablesInsert } from "@/types/database.types";

type Section = TablesInsert<"sections">;

interface SectionCardProps {
  section: Section;
}

export const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  const [sections, setSections] = useRecoilState(beingAddedSectionsState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(section.type);

  const handleDelete = () => {
    setSections((prev) =>
      prev.filter((s) => s.image_url !== section.image_url)
    );
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as Enums<"section_type">);
  };

  const handleSave = () => {
    setSections((prev) =>
      prev.map((s) =>
        s.image_url === section.image_url ? { ...s, type: selectedType } : s
      )
    );
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="relative group">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <AspectRatio
              ratio={16 / 9}
              className="bg-transparent overflow-hidden rounded-md cursor-pointer"
            >
              <Image
                src={section.image_url[0]}
                alt={`Section ${section.type}`}
                fill
                className="h-full w-full rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
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
              <Button onClick={handleSave}>
                <Save />
                저장
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Icon */}
        <Button
          onClick={handleDelete}
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
        >
          <X size={16} />
        </Button>
      </div>
    </>
  );
};
