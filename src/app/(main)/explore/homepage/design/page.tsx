// explore/homepage/design/page.tsx
import React from "react";
import Link from "next/link";
// actions
import { fetchHomepages } from "@/features/explore/actions/fetch-homepages";
// components
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

  return (
    <div className="grid grid-cols-3 gap-0">
      {homepages.map((homepage: FetchHomepages[number]) => {
        const profile = homepage.profile;

        return (
          <HomepagePreviewCard
            key={homepage.id}
            name={homepage.name}
            description={homepage.description}
            favicon_url={homepage.favicon_url}
            thumbnail_url={homepage.sections[0]?.image_url?.[0]}
            profile_name={profile?.name}
            avatar_url={profile?.avatar_url}
            href={`/homepages/${homepage.id}`}
            original_url={homepage.url}
          />
        );
      })}
    </div>
  );
}
