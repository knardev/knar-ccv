// explore/homepage/design/page.tsx
import React from "react";
import Link from "next/link";
import { fetchHomepages } from "../../_actions/fetch-homepages";
import { DesignSelectorGroup } from "../../_components/design-select-group";
import { IndustrySelectorGroup } from "../../_components/industry-select-group";
import { ExplorePageTemplate } from "../../_components/explore-page-template";
import { Tables } from "@/types/database.types";
import { normalizeQueryParams } from "../../utils";
import { HomepagePreviewCard } from "../../_components/homepage-preview-card";

export const dynamic = "force-dynamic";

interface DesignHomepagesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

type Homepage = Tables<"homepages">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

export default async function Page({ searchParams }: DesignHomepagesPageProps) {
  const normalizedParams = normalizeQueryParams(searchParams);
  const homepages: HomepageWithSections[] = await fetchHomepages(
    new URLSearchParams(normalizedParams)
  );

  return (
    <ExplorePageTemplate
      selectors={
        <>
          <IndustrySelectorGroup />
          <DesignSelectorGroup />
        </>
      }
    >
      <div className="grid grid-cols-2 gap-5">
        {homepages.map((homepage) => (
          <Link
            prefetch={true}
            key={homepage.id}
            href={`/homepages/${homepage.id}`}
            passHref
            legacyBehavior
          >
            <HomepagePreviewCard
              name={homepage.name}
              description={homepage.description}
              favicon_url={homepage.favicon_url}
              thumbnail_url={homepage.sections[0].image_url[0]}
            />
          </Link>
        ))}
      </div>
    </ExplorePageTemplate>
  );
}
