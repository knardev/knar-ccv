"use server";

import { defineAddHomepageQuery } from "../query";
import { TablesInsert } from "@/types/database.types";
import * as cheerio from "cheerio";

type Homepage = TablesInsert<"homepages">;

/**
 * Action to add a new homepage
 * @param homepageData - The data for the new homepage
 * @returns The newly created homepage
 */
export async function addHomepage(
  homepageData: Homepage
): Promise<Homepage> {
  // Define the favicon-fetching and meta data logic
  const fetchPageMetadata = async (url: string): Promise<{
    faviconUrl: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
  }> => {
    try {
      // Fetch the HTML of the page
      const htmlResponse = await fetch(url);
      const html = await htmlResponse.text();

      // Parse the HTML with Cheerio
      const $ = cheerio.load(html);

      // Extract meta title
      const metaTitle = $("title").text().trim() || null;

      // Extract meta description
      const metaDescription =
        $('meta[name="description"]').attr("content")?.trim() || null;

      // Extract favicon
      const specificIcon = $('link[rel="icon"], link[rel="shortcut icon"]')
        .toArray()
        .find((link) => {
          const sizes = $(link).attr("sizes");
          return sizes === "128x128"; // Match exact size
        });

      let faviconUrl = null;

      if (specificIcon) {
        const href = $(specificIcon).attr("href");
        faviconUrl = new URL(href!, url).href; // Resolve relative URL
      } else {
        // Fallback to the first available icon
        const defaultIcon = $('link[rel="icon"], link[rel="shortcut icon"]').first();
        if (defaultIcon.length > 0) {
          const href = defaultIcon.attr("href");
          faviconUrl = new URL(href!, url).href; // Resolve relative URL
        }
      }

      // If no icons are found in the HTML, try fetching favicon.ico
      if (!faviconUrl) {
        const faviconFallbackUrl = `${url}/favicon.ico`;
        const response = await fetch(faviconFallbackUrl, { method: "HEAD" });

        if (response.ok) {
          faviconUrl = faviconFallbackUrl;
        }
      }

      // Default favicon if everything fails
      faviconUrl = faviconUrl || "https://www.google.com/favicon.ico";

      return { faviconUrl, metaTitle, metaDescription };
    } catch (error) {
      console.error("Error fetching page metadata:", error);
      return { faviconUrl: null, metaTitle: null, metaDescription: null };
    }
  };

  try {
    // Fetch the metadata for the homepage
    const { faviconUrl, metaTitle, metaDescription } = await fetchPageMetadata(
      homepageData.url
    );

    // Include the metadata in the homepage data, overriding `name` and `description` if applicable
    const homepageWithMetadata = {
      ...homepageData,
      favicon_url: faviconUrl, // Update favicon_url field with the fetched URL
      name: metaTitle || homepageData.name, // Override name with meta title if available
      description: metaDescription || homepageData.description, // Override description with meta description if available
    };

    // Insert the homepage with the fetched metadata
    const query = defineAddHomepageQuery(homepageWithMetadata);

    const { data, error } = await query;

    if (error) {
      console.error("Error adding homepage:", error);
      throw new Error("Failed to add homepage");
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned after adding homepage");
    }

    return data[0]; // Return the first inserted row
  } catch (error) {
    console.error("Error in addHomepage action:", error);
    throw error;
  }
}
