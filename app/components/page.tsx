import type { Metadata } from "next";
import { ComponentIcon, FolderOpenIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { getLibraryComponents } from "@/lib/component-library";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Components | e.components",
  description: "Browse and copy components from the e.components library.",
};

export default async function ComponentsPage() {
  const components = await getLibraryComponents();

  return (
    <div className="flex flex-col space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Components
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Here you can find all the components available in the library. We are
          working on adding more components.
        </p>
      </div>

      {/* Grid */}
      {components.length > 0 ? (
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3">
          {components.map((component) => (
            <Link
              className="font-medium hover:text-foreground/80 transition-all"
              key={component.path}
              href={`/components/${component.metadata.slug}`}
            >
              {component.metadata.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-20 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
            <HugeiconsIcon icon={FolderOpenIcon} size={21} />
          </div>
          <h2 className="mt-5 font-heading text-xl font-semibold">
            No components saved yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add a <code className="font-mono">.tsx</code> component to{" "}
            <code className="font-mono">components-library</code> and refresh
            this page to see it here.
          </p>
        </div>
      )}
    </div>
  );
}
