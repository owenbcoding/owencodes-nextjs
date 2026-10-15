"use client";

import isPropValid from "@emotion/is-prop-valid";
import { NextStudio } from "next-sanity/studio";
import { StyleSheetManager } from "styled-components";
import config from "../../sanity.config";

export function StudioClient() {
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
