"use client";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/ui-custom/base-select";
import { BaseMultiSelector } from "@/components/ui-custom/base-multi-select";
import {
  companyCategories,
  designDesireTypeOptions,
  designMoodOptions,
} from "../options";
import { TablesInsert } from "@/types/database.types";
import { beingAddedHomepageState } from "../_states";
import { ColorSelectItem } from "@/components/ui-custom/color-select-item";

type Homepage = TablesInsert<"homepages">;

export function HomepageAddDrawerContentEditableForm() {
  const [homepage, setHomepage] = useRecoilState(beingAddedHomepageState);

  const handleInputChange =
    (field: keyof Homepage) => (value: string | string[]) => {
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
        {/* <div className="flex space-x-2 items-center mb-4">
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
        </div> */}
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
        <h1 className="text-2xl font-bold mb-8">디자인 정보</h1>
        <div className="h-16 flex space-x-2 mb-4">
          <Label className="w-[25%] mt-2" htmlFor="design_desire_type">
            방향성
          </Label>
          <BaseMultiSelector
            options={designDesireTypeOptions}
            placeholder="디자인 방향성"
            values={homepage.design_desire_types ?? []}
            onValuesChange={handleInputChange("design_desire_types")}
            maxBadges={4}
            badgeColor="bg-yellow-100"
            badgeTextColor="text-yellow-800"
          />
        </div>
        <div className="h-16 flex space-x-2 mb-4">
          <Label className="w-[25%] mt-2" htmlFor="design_mood">
            톤앤매너
          </Label>
          <BaseMultiSelector
            options={designMoodOptions}
            placeholder="디자인 톤앤매너"
            values={homepage.design_moods ?? []}
            onValuesChange={handleInputChange("design_moods")}
            maxBadges={4}
          />
        </div>
        {/* <div className="flex space-x-2 items-center">
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
        </div> */}
      </div>

      <Separator />

      {/* Planning Information */}
      <div>
        <h1 className="text-2xl font-bold mb-6">기획 정보</h1>
        <div className="flex space-x-2 mb-4">
          <Label className="w-[25%] mt-2" htmlFor="villian_deficiency">
            악당
          </Label>
          <Textarea
            rows={3}
            id="villian_deficiency"
            className="w-full"
            value={homepage.villian_deficiency ?? ""}
            onChange={(e) =>
              handleInputChange("villian_deficiency")(e.target.value)
            }
            placeholder="악당 정보를 입력하세요."
          />
        </div>
        <div className="flex space-x-2 mb-4">
          <Label className="w-[25%] mt-2" htmlFor="unique_selling_point">
            특장점
          </Label>
          <Textarea
            rows={3}
            id="unique_selling_point"
            className="w-full"
            value={homepage.unique_selling_point ?? ""}
            onChange={(e) =>
              handleInputChange("unique_selling_point")(e.target.value)
            }
            placeholder="특장점을 입력하세요."
          />
        </div>
        <div className="flex space-x-2 mb-4">
          <Label className="w-[25%] mt-2" htmlFor="visitor_needs">
            방문자 니즈
          </Label>
          <Textarea
            placeholder="방문자 니즈를 입력하세요."
            id="visitor_needs"
            className="w-full"
            rows={3}
            value={homepage.visitor_needs ?? ""}
            onChange={(e) => handleInputChange("visitor_needs")(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
