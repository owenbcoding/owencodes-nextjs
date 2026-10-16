"use client";

import isPropValid from "@emotion/is-prop-valid";
import { NextStudio } from "next-sanity/studio";
import { StyleSheetManager } from "styled-components";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";

type StudioClientProps = {
  projectId: string;
  dataset: string;
};

export function StudioClient({ projectId, dataset }: StudioClientProps) {
  const config = defineConfig({
    name: "owencodes-portfolio",
    title: "Owencodes Portfolio",
    projectId,
    dataset,
    basePath: "/studio",
    plugins: [structureTool(), visionTool()],
    schema: { types: schemaTypes },
  });

  return (
    <StyleSheetManager
      shouldForwardProp={(prop, target) =>
        typeof target !== "string" || isPropValid(prop)
      }
    >
      <NextStudio config={config} />
    </StyleSheetManager>
  );
}
