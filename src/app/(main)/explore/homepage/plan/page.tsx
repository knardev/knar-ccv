import React from "react";
import { PlanSelectorGroup } from "@/features/explore/components/plan-select-group";
import { IndustrySelectorGroup } from "@/features/explore/components/industry-select-group";
import { ExplorePageTemplate } from "@/features/explore/components/explore-page-template";
import { fetchHomepages } from "@/features/explore/actions/fetch-homepages";
import { normalizeQueryParams } from "@/features/explore/utils/utils";
import { Tables } from "@/types/database.types";

interface PlanHomepagesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

type Homepage = Tables<"homepages">;

export default async function Page({ searchParams }: PlanHomepagesPageProps) {
  const normalizedParams = normalizeQueryParams(searchParams);
  const homepages: Homepage[] = await fetchHomepages(
    new URLSearchParams(normalizedParams)
  );

  return (
    <ExplorePageTemplate
      selectors={
        <>
          <IndustrySelectorGroup />
          <PlanSelectorGroup />
        </>
      }
    >
      <div>
        {homepages.map((homepage) => (
          <div key={homepage.id} className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-bold">{homepage.name}</h2>
            <p className="text-sm text-gray-600">{homepage.description}</p>
          </div>
        ))}
      </div>
    </ExplorePageTemplate>
  );
}
