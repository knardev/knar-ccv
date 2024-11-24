"use server";

import { checkAccountRole } from "@/utils/auth/check-account-role";
import { fetchHomepageWithSections } from "./fetch-homepage-with-sections";

export async function fetchHomepageDetailPageData(homepage_id: string) {
  const accountRole = await checkAccountRole();
  const homepageWithSections = await fetchHomepageWithSections(homepage_id);

  return { accountRole, homepageWithSections };
}