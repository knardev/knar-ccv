import React, { Suspense } from "react";
// components
import { SectionGroups } from "@/features/explore/components/section/section-groups";
import { SectionSkeletonGrid } from "@/features/explore/components/section/section-skeleton-grid";
// actions
import { fetchSections } from "@/features/explore/actions/fetch-sections";
// types
import { FetchSections } from "@/features/explore/queries/define-fetch-section-query";
import { pageSubcategoryOptions } from "@/features/explore/types/options";
// utils
import { normalizeQueryParams } from "@/features/explore/utils/utils";

interface DesignSectionsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: DesignSectionsPageProps) {
  const normalizedParams = normalizeQueryParams(searchParams);
  const sections: FetchSections = await fetchSections(
    new URLSearchParams(normalizedParams)
  );

  // page_subcategory 기준으로 그룹화 (없으면 "미지정")
  const groupedSections = sections.reduce((acc, section) => {
    const subCategory = section.page?.sub_category || "미지정";
    if (!acc[subCategory]) {
      acc[subCategory] = [];
    }
    acc[subCategory].push(section);
    return acc;
  }, {} as Record<string, FetchSections[number][]>);

  // 기존 그룹 키
  const groupKeys = Object.keys(groupedSections);

  // 옵션의 값들을 string[]로 캐스팅
  const optionValues = pageSubcategoryOptions.map(
    (option) => option.value as string
  );

  // pageSubcategoryOptions 순서대로 정렬 (옵션에 있는 값이 먼저 나오고, 나머지는 뒤에)
  const sortedGroupKeys = [
    ...optionValues.filter((value) => groupKeys.includes(value)),
    ...groupKeys.filter((key) => !optionValues.includes(key)),
  ];

  return (
    <Suspense fallback={<SectionSkeletonGrid />}>
      <SectionGroups
        groupKeys={sortedGroupKeys}
        groupedSections={groupedSections}
      />
    </Suspense>
  );
}
