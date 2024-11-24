import { atom } from 'recoil';
import { Enums, TablesInsert } from "@/types/database.types";

// Updated Recoil state
export const beingAddedHomepageState = atom<TablesInsert<"homepages">>({
  key: 'beingAddedHomepageState',
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
