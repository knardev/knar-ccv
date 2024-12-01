import { TablesInsert } from "@/types/database.types";

type Homepage = TablesInsert<"homepages">;
type Page = TablesInsert<"pages">;
type Section = TablesInsert<"sections">;

export type PageWithSectionsInsert = Page & {
  sections: Section[];
};

export interface HomepageWithPageAndSectionsInsert extends Homepage {
  pages: Array<PageWithSectionsInsert>;
}