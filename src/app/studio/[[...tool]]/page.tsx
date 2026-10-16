import { StudioClient } from "@/components/StudioClient";
import { dataset, hasSanityConfig, projectId } from "@/sanity/env";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="mx-auto max-w-xl p-8 text-center">
        <h1 className="text-xl font-semibold">Sanity is not configured</h1>
        <p className="mt-3">Set SANITY_PROJECT_ID and SANITY_DATASET in the deployment environment, then restart or redeploy.</p>
      </main>
    );
  }

  return <StudioClient projectId={projectId} dataset={dataset} />;
}
