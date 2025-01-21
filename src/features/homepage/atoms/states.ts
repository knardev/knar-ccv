import { atom } from "recoil";
import { Tables, TablesInsert } from "@/types/database.types";
import { HomepageWithPageAndSections } from "@/features/homepage/types/types";

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
    design_desire_type: null,
    design_desire_types: null,
    design_mood: null,
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

type Section = TablesInsert<"sections">;
export const beingAddedSectionsState = atom<Section[]>({
  key: "beingAddedSectionsState",
  default: [],
});

// Updated Recoil state
export const beingAddedHomepageState = atom<TablesInsert<"homepages">>({
  key: "beingAddedHomepageState",
  default: {
    name: "", // Default empty string
    description: "", // Default empty string
    url: "", // Default empty string
    favicon_url: null, // Default null (corrected to match type)
    company_category: null, // Default null (as per Row type)
    design_desire_type: null, // Default null (as per Row type)
    design_mood: null, // Default null (as per Row type)
    primary_color: null, // Default null (as per Row type)
    villian_deficiency: null, // Default null (as per Row type)
    unique_selling_point: null, // Default null (as per Row type)
    plan_grammar: null, // Default null (as per Row type)
    industry_category: null,
    industry_subcategory: null,
    profile_id: null,
  },
});

export const beingAddedHomepageState = atom<HomepageWithPageAndSections>({
  key: "beingAddedHomepageState",
  default: {
    name: "", // Default empty string
    description: "", // Default empty string
    url: "", // Default empty string
    favicon_url: null, // Default null
    company_category: null, // Default null
    design_desire_type: null, // Default null
    design_desire_types: null, // Default null
    design_mood: null, // Default null
    design_moods: null, // Default null
    primary_color: null, // Default null
    visitor_needs: null, // Default null
    villian_deficiency: null, // Default null
    unique_selling_point: null, // Default null
    plan_grammar: null, // Default null
    industry_category: null, // Default null
    industry_subcategory: null, // Default null
    profile_id: null, // Default null,
    pages: [
      {
        id: uuidv4(),
        sections: [],
        homepage_id: "", // Default null
        category: "메인 페이지", // Default empty string
      },
    ],
  },
});

export const beingAddedPagesState = atom<Page[]>({
  key: "beingAddedPagesState",
  default: [],
});
