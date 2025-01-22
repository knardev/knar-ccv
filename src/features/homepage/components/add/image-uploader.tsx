"use client";

// hooks
import React, { useRef, useState, useEffect, useCallback } from "react";
// import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { useProfileData } from "@/hooks/useProfileData";
// states
// import { beingAddedSectionsState } from "@/features/homepage/atoms/states";
// components
import { Images } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { SectionCard } from "@/features/homepage/components/add/section-card";
// actions
import { addSections } from "@/features/homepage/actions/add-sections";
// utils
import { createClient } from "@/utils/supabase/browser";
import { v4 as uuidv4 } from "uuid";
// types
import { Section } from "@/features/homepage/types/types";

interface ImageUploaderProps {
  setSections: (sections: Section[]) => void;
}

export function ImageUploader({ setSections }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const supabase = createClient();
  const uploadAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, isLoading: isProfileLoading } = useProfileData();

  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) {
        toast.error("선택된 파일이 없습니다.");
        return;
      }

      setIsUploading(true); // Start uploading

      try {
        const newSections: Section[] = [];

        for (const file of Array.from(files)) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, file);

          if (uploadError) {
            console.error("Error uploading file:", uploadError);
            toast.error(`파일 업로드 중 오류가 발생했습니다: ${file.name}`);
            continue;
          }

          const { data } = supabase.storage
            .from("images")
            .getPublicUrl(filePath);

          if (data.publicUrl && profile?.id) {
            // Create a new section
            const newSection: Section = {
              image_url: [data.publicUrl],
              profile_id: profile?.id,
              content: null,
              created_at: null,
              homepage_id: null,
              id: uuidv4(),
              main_copy: null,
              page_id: null,
              page_sequence: null,
              sub_copy: null,
              type: null,
            };
            newSections.push(newSection);
            setSections(newSections);
            toast.success("이미지가 성공적으로 업로드되었습니다.");
          }
        }
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
      } finally {
        setIsUploading(false); // End uploading
      }
    },
    [supabase, setSections, profile]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files);
  };

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      if (isUploading) {
        event.preventDefault();
        return;
      }

      // Ensure the event is not coming from an input or textarea to avoid interfering with normal paste operations
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Check if clipboardData is available
      if (!event.clipboardData) {
        return;
      }

      const items = event.clipboardData.items;
      const files: File[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        event.preventDefault();
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        handleFileUpload(dataTransfer.files);
      }
    },
    [isUploading, handleFileUpload]
  );

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileUpload(event.dataTransfer.files);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (isUploading) {
        event.preventDefault();
        return;
      }

      // Ensure the event is not coming from an input or textarea to avoid interfering with normal paste operations
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Check if clipboardData is available
      if (!event.clipboardData) {
        return;
      }

      const items = event.clipboardData.items;
      const files: File[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        event.preventDefault();
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        handleFileUpload(dataTransfer.files);
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [isUploading, handlePaste, handleFileUpload]);

  return (
    <div className="flex flex-col items-center mb-3 w-[90%]">
      <div ref={uploadAreaRef} className="w-full">
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer ${
            isUploading ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          onDragOver={isUploading ? undefined : handleDragOver}
          onDrop={isUploading ? undefined : handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <>
                <DotLottieReact
                  src="https://lottie.host/062e8bfb-1742-452a-a36d-bd31c63cee78/vjVSIz2YYR.lottie"
                  autoplay
                  loop
                  style={{ width: "150px", height: "150px" }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  이미지 업로드 중...
                </p>
              </>
            ) : (
              <>
                <Images size={36} className="text-gray-500 mb-4" />
                <p className="mb-2 text-sm text-gray-500 text-center">
                  <span className="font-semibold">여기를 클릭하거나</span>
                  이미지를 드래그 앤 드롭, <br />
                  복사/붙여넣기로 업로드할 수 있습니다.
                </p>
                <p className="text-xs text-gray-500">
                  파일 형식: png, jpg, gif
                </p>
              </>
            )}
          </div>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleInputChange}
            multiple
            accept="image/*"
            disabled={isUploading}
          />
        </label>
      </div>
      {/* Image Preview Grid */}
      {/* <div className="grid grid-cols-3 gap-2 mt-4 w-full">
        {sections.map((section, index) => (
          <div key={index}>
            <SectionCard section={section} />
          </div>
        ))}
      </div> */}
    </div>
  );
}
