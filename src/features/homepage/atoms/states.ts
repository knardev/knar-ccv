import { atom } from "recoil";
import { Tables, TablesInsert } from "@/types/database.types";
import {
  HomepageWithPageAndSections,
  PageInsert,
  PageWithSections,
} from "@/features/homepage/types/types";

type HomepageInsert = TablesInsert<"homepages">;
type SectionInsert = TablesInsert<"sections">;

// Updated Recoil state
export const beingEdittedHomepageState = atom<Tables<"homepages">>({
  key: "beingEdittedHomepageState",
  default: {
    id: "",
    name: "",
    created_at: null,
    description: "",
    url: "",
    favicon_url: null,
    company_category: null,
    // design_desire_type: null,
    // design_mood: null,
    design_desire_types: null,
    design_moods: null,
    primary_color: null,
    visitor_needs: null,
    villian_deficiency: null,
    unique_selling_point: null,
    plan_grammar: null,
    industry_category: null,
    industry_subcategory: null,
    profile_id: null,
  },
});

export const beingAddedHomepageState = atom<HomepageInsert>({
  key: "beingAddedHomepageState",
  default: {
    name: "",
    description: "",
    url: "",
    favicon_url: null,
    company_category: null,
    // design_desire_type: null,
    // design_mood: null,
    primary_color: null,
    villian_deficiency: null,
    unique_selling_point: null,
    plan_grammar: null,
    industry_category: null,
    industry_subcategory: null,
    profile_id: null,
  },
});

export const beingAddedPageWithSectionState = atom<PageWithSections[]>({
  key: "beingAddedPageState",
  default: [{
    id: "TEMP_MAIN_PAGE",
    homepage_id: "",
    category: "메인 페이지",
    sub_category: "메인페이지",
    sections: [],
    created_at: "",
  }],
});

export const beingAddedSectionsState = atom<SectionInsert[]>({
  key: "beingAddedSectionsState",
  default: [],
});
