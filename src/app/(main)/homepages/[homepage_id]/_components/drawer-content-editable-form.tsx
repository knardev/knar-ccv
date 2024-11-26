"use client";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { beingEdittedHomepageState } from "../_states/beingEdittedHomepage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BaseSelect } from "@/components/ui-custom/base-select";
import {
  companyCategories,
  designDesireTypeOptions,
  designMoodOptions,
  primaryColorOptions,
} from "../options";
import { Tables } from "@/types/database.types";
import { ColorSelectItem } from "@/components/ui-custom/color-select-item";

type Homepage = Tables<"homepages">;

export function HomepageDetailDrawerContentEditableForm({
  initialData,
}: {
  initialData: Homepage;
}) {
  const [homepage, setHomepage] = useRecoilState(beingEdittedHomepageState);

  useEffect(() => {
    setHomepage(initialData);
  }, [initialData, setHomepage]);

  const handleInputChange = (field: keyof Homepage) => (value: string) => {
    setHomepage({
      ...homepage,
      [field]: value,
    });
  };

  return (
    <div className="p-4 space-y-8">
      {/* Basic Information */}
      <div>
        <h1 className="text-2xl font-bold mb-4">기본 정보</h1>
        <div className="flex space-x-2 items-center mb-4">
          <Label className="w-[25%]" htmlFor="name">
            이름
          </Label>
          <Input
            id="name"
            className="w-full"
            value={homepage.name}
            onChange={(e) => handleInputChange("name")(e.target.value)}
            placeholder="홈페이지 이름"
          />
        </div>
        <div className="flex space-x-2 items-center mb-4">
          <Label className="w-[25%]" htmlFor="description">
            설명
          </Label>
          <Input
            id="description"
            className="w-full"
            value={homepage.description}
            onChange={(e) => handleInputChange("description")(e.target.value)}
            placeholder="설명을 입력하세요."
          />
        </div>
        <div className="flex space-x-2 items-center mb-4">
          <Label className="w-[25%]" htmlFor="url">
            링크
          </Label>
          <Input
            id="description"
            className="w-full"
            value={homepage.url}
            onChange={(e) => handleInputChange("url")(e.target.value)}
            placeholder="링크를 입력하세요."
          />
        </div>
        <div className="flex space-x-2 items-center">
          <Label className="w-[25%]" htmlFor="company_category">
            카테고리
          </Label>
          <BaseSelect
            id="company_category"
            options={companyCategories}
            placeholder="회사 카테고리를 선택하세요."
            value={homepage.company_category ?? ""}
            onValueChange={handleInputChange("company_category")}
            width="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Design Information */}
      <div>
        <h1 className="text-2xl font-bold mb-4">디자인 정보</h1>
        <div className="flex space-x-2 items-center mb-4">
          <Label className="w-[25%]" htmlFor="design_mood">
            무드
          </Label>
          <BaseSelect
            id="design_mood"
            options={designMoodOptions}
            placeholder="디자인 무드를 선택하세요."
            value={homepage.design_mood ?? ""}
            onValueChange={handleInputChange("design_mood")}
            width="w-full"
          />
        </div>
        <div className="flex space-x-2 items-center mb-4">
          <Label className="w-[25%]" htmlFor="design_desire_type">
            욕구 유형
          </Label>
          <BaseSelect
            id="design_desire_type"
            options={designDesireTypeOptions}
            placeholder="디자인 욕구 유형을 선택하세요."
            value={homepage.design_desire_type ?? ""}
            onValueChange={handleInputChange("design_desire_type")}
            width="w-full"
          />
        </div>
        <div className="flex space-x-2 items-center">
          <Label className="w-[25%]" htmlFor="primary_color">
            메인 컬러
          </Label>
          <BaseSelect
            id="primary_color"
            options={primaryColorOptions}
            placeholder="메인 컬러를 선택하세요."
            value={homepage.primary_color ?? ""}
            onValueChange={handleInputChange("primary_color")}
            width="w-full"
            CustomSelectItem={({ option }) => (
              <ColorSelectItem option={option} />
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Planning Information */}
      <div>
        <h1 className="text-2xl font-bold mb-4">기획 정보</h1>
        <div className="flex space-x-2 items-center mb-4">
          <Label className="w-[25%]" htmlFor="villian_deficiency">
            악당
          </Label>
          <Input
            id="villian_deficiency"
            className="w-full"
            value={homepage.villian_deficiency ?? ""}
            onChange={(e) =>
              handleInputChange("villian_deficiency")(e.target.value)
            }
            placeholder="악당 정보를 입력하세요."
          />
        </div>
        <div className="flex space-x-2 items-center">
          <Label className="w-[25%]" htmlFor="unique_selling_point">
            특장점
          </Label>
          <Input
            id="unique_selling_point"
            className="w-full"
            value={homepage.unique_selling_point ?? ""}
            onChange={(e) =>
              handleInputChange("unique_selling_point")(e.target.value)
            }
            placeholder="특장점을 입력하세요."
          />
        </div>
      </div>
    </div>
  );
}
