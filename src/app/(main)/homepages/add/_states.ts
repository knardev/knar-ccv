/**
 * @file state/atoms.ts
 * @description Recoil state atoms for managing homepage and sections data.
 * 
 * This file defines two atoms:
 * 1. `beingAddedHomepageState`: Tracks the state of a homepage being added, including default values.
 * 2. `beingAddedPagesState`: Tracks the list of pages being added.
 * 3. `beingAddedSectionsState`: Tracks the list of sections being added.
 * 
 * ## Atoms
 * - beingAddedHomepageState: Manages state for a single homepage (e.g., name, description, etc.).
 * - beingAddedPagesState: Manages state for multiple pages associated with a homepage.
 * - beingAddedSectionsState: Manages state for multiple sections associated with a homepage.
 * 
 * ## Usage
 * Import these atoms into your React components to read or update their values using Recoil hooks:
 * - `useRecoilState`
 * - `useRecoilValue`
 * - `useSetRecoilState`
 * 
 * ## Author
 * - Maintainer: @felix
 * 
 * ## Last Updated
 * - Date: 2024-12-01
 */

import { atom } from 'recoil';
import { v4 as uuidv4 } from "uuid";
import { Enums, TablesInsert } from "@/types/database.types";

// Type definitions
type Homepage = TablesInsert<"homepages">;
type Section = TablesInsert<'sections'>;
type Page = TablesInsert<'pages'>;

export type PageWithSections = Page & {
  sections: Section[];
};

export interface HomepageWithPageAndSections extends Homepage {
  pages: Array<PageWithSections>;
}

/**
 * Atom: beingAddedHomepageState
 * 
 * @description
 * Manages the state of a homepage being added, providing default values for each property.
 */
export const beingAddedHomepageState = atom<HomepageWithPageAndSections>({
  key: 'beingAddedHomepageState',
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
        category: "메인 페이지", // Default empty string
        sections: [],
        homepage_id: "", // Default null
      }
    ],
  },
});

/**
 * Atom: beingAddedSectionsState
 * 
 * @description
 * Manages the state of multiple sections being added. The default value is an empty array.
 */
export const beingAddedSectionsState = atom<Section[]>({
  key: 'beingAddedSectionsState',
  default: [],
});

/**
 * Atom: beingAddedPagesState
 * 
 * @description
 * Manages the state of multiple pages being added. The default value is an empty array.
 *  
*/

export const beingAddedPagesState = atom<Page[]>({
  key: 'beingAddedPagesState',
  default: [],
});