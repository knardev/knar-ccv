"use server";

import { defineAddHomepageQuery } from "../query";
import { TablesInsert } from "@/types/database.types";
import * as cheerio from "cheerio";
import { createClient } from "@/utils/supabase/server"; // Import server-side Supabase client
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch"; // Ensure node-fetch is available in your environment

type Homepage = TablesInsert<"homepages">;

/**
 * Action to add a new homepage
 * @param homepageData - The data for the new homepage
 * @returns The newly created homepage
 */
export async function addHomepage(homepageData: Homepage): Promise<Homepage> {
  // Define the favicon-fetching and meta data logic
  const fetchPageMetadata = async (url: string): Promise<{
    faviconUrl: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
  }> => {
    try {
      // Create a Supabase client for server-side
      const supabase = createClient();

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

      // Extract favicon URL
      let faviconUrl: string | null = null;

      // Try to find specific favicon links in the HTML
      const faviconLinks = $('link[rel="icon"], link[rel="shortcut icon"]');
      if (faviconLinks.length > 0) {
        const href = faviconLinks.first().attr("href");
        if (href) {
          faviconUrl = new URL(href, url).href; // Resolve relative URL
        }
      }

      // If no icons are found in the HTML, try fetching /favicon.ico
      if (!faviconUrl) {
        const faviconFallbackUrl = new URL("/favicon.ico", url).href;
        const response = await fetch(faviconFallbackUrl);
        if (response.ok) {
          faviconUrl = faviconFallbackUrl;
        }
      }

      // If favicon URL is found, download and upload it to Supabase
      let uploadedFaviconUrl = null;
      if (faviconUrl) {
        // Fetch the favicon image
        const faviconResponse = await fetch(faviconUrl);
        if (faviconResponse.ok) {
          const arrayBuffer = await faviconResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Generate a unique filename
          const fileExt = faviconUrl.split(".").pop() || "ico";
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `favicons/${fileName}`;

          // Upload the image to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, buffer, {
              contentType: faviconResponse.headers.get("content-type") || undefined,
            });

          if (uploadError) {
            console.error("Error uploading favicon to Supabase:", uploadError);
          } else {
            // Get the public URL of the uploaded image
            const { data } = supabase.storage.from("images").getPublicUrl(filePath);
            uploadedFaviconUrl = data.publicUrl;
          }
        } else {
          console.error("Error fetching favicon image:", faviconResponse.statusText);
        }
      }

      // Default favicon if everything fails
      uploadedFaviconUrl =
        uploadedFaviconUrl || "https://www.google.com/favicon.ico";

      return { faviconUrl: uploadedFaviconUrl, metaTitle, metaDescription };
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
      favicon_url: faviconUrl, // Update favicon_url field with the uploaded Supabase URL
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
