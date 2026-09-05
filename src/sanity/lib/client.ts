import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanityConfig, projectId } from "@/sanity/env";

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
