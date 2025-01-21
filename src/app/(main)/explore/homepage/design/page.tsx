// explore/homepage/design/page.tsx
import React from "react";
import Link from "next/link";
// actions
import { fetchHomepages } from "@/features/homepage/actions/fetch-homepages";
// components
import { ExplorePageTemplate } from "@/features/explore/components/explore-page-template";
import { DesignSelectorGroup } from "@/features/explore/components/design-select-group";
import { IndustrySelectorGroup } from "@/features/explore/components/industry-select-group";
import { HomepagePreviewCard } from "@/features/explore/components/homepage-preview-card";
// types
import { FetchHomepages } from "@/features/explore/queries/define-fetch-homepage";
// utils
import { normalizeQueryParams } from "@/features/explore/utils/utils";

export const dynamic = "force-dynamic";

interface DesignHomepagesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page({ searchParams }: DesignHomepagesPageProps) {
  const normalizedParams = normalizeQueryParams(searchParams);
  const homepages: FetchHomepages = await fetchHomepages(
    new URLSearchParams(normalizedParams)
  );
  console.log(homepages[0]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {homepages.map((homepage: FetchHomepages[number]) => (
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
  );
}
