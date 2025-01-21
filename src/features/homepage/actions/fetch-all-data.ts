"use server";

import { checkAccountRole } from "@/utils/auth/check-account-role";
import { fetchHomepageWithPageAndSections } from "./fetch-homepage-with-page-and-sections";

export async function fetchAllData(homepage_id: string) {
  const accountRole = await checkAccountRole();
  const data = await fetchHomepageWithPageAndSections(homepage_id);

  return { accountRole, data };
}