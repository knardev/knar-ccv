import { FetchHomepageWithPagesAndSections } from "@/features/homepage/queries/define-fetch-homepage-with-sections-query";

export type HomepageWithPageAndSections =
    FetchHomepageWithPagesAndSections[number];

// Homepage without the pages and sections
export type Homepage = Omit<HomepageWithPageAndSections, "pages">;

export type PageWithSections = HomepageWithPageAndSections["pages"][number];

export type Section = PageWithSections["sections"][number];

export type SectionWithImageUrl = Section & { imageUrl: string };
