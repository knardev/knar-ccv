import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;
type Page = Tables<"pages">;
type Section = Tables<"sections">;

export type PageWithSections = Page & {
  sections: Section[];
};

export interface HomepageWithPageAndSections extends Homepage {
  pages: Array<PageWithSections>;
}