"use client";

import dynamic from "next/dynamic";

/**
 * Component registry — maps each component slug to its lazy preview renderer.
 *
 * Every saved component in `components-library/` exports a `metadata` const
 * (see `ComponentMetadata` in `lib/component-library.ts`) that the server
 * reads to list components on `/components`. Here we only register the
 * interactive preview by slug, using the same `previewExport` from metadata.
 *
 * To add a new component:
 *  1. Save `components-library/my-component.tsx` with an exported `metadata` const.
 *  2. Add one line below mapping its slug to a dynamic import.
 */
export const componentRegistry: Record<string, React.ComponentType> = {
  "subscription-card": dynamic(
    () =>
      import("@/components-library/subscription-card").then(
        (mod) => mod.Preview,
      ),
    { ssr: false },
  ),
};

export function registerComponent(
  slug: string,
  loader: () => Promise<{ default: React.ComponentType }>,
) {
  componentRegistry[slug] = dynamic(loader, { ssr: false });
}
