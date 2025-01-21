import { atom } from 'recoil';
import { Tables } from "@/types/database.types";

// Updated Recoil state
export const beingEdittedHomepageState = atom<Tables<"homepages">>({
  key: 'beingEdittedHomepageState',
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
