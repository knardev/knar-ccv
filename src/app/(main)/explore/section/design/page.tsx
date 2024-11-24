import React from "react";
import { DesignSelectorGroup } from "../../_components/design-select-group";
import { IndustrySelectorGroup } from "../../_components/industry-select-group";
import { SectionSelectorGroup } from "../../_components/section-select-group";
import { ExplorePageTemplate } from "../../_components/explore-page-template";
import { fetchSections } from "../../_actions/fetch-sections";
import { normalizeQueryParams } from "../../utils";
import { Tables } from "@/types/database.types";

interface DesignSectionsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

type Section = Tables<"sections">;

export default async function Page({ searchParams }: DesignSectionsPageProps) {
  const normalizedParams = normalizeQueryParams(searchParams);
  const sections: Section[] = await fetchSections(
    new URLSearchParams(normalizedParams)
  );

  return (
    <ExplorePageTemplate
      selectors={
        <>
          <IndustrySelectorGroup />
          <SectionSelectorGroup />
          <DesignSelectorGroup />
        </>
      }
    >
      <div>
        {sections.map((section) => (
          <div key={section.id} className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-bold">{section.type}</h2>
            <p className="text-sm text-gray-600">{section.image_url}</p>
          </div>
        ))}
      </div>
    </ExplorePageTemplate>
  );
}
