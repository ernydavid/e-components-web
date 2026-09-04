"use client";

import { FolderOpenIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { componentRegistry } from "./registry";

export function ComponentPreview({ name }: { name: string }) {
  if (!(name in componentRegistry)) {
    return (
      <div className="flex h-full min-h-48 flex-col items-center justify-center gap-2 p-8 text-center">
        <span className="grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground">
          <HugeiconsIcon icon={FolderOpenIcon} size={18} />
        </span>
        <p className="text-sm text-muted-foreground">
          No preview registered for{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            {name}
          </code>
          .
        </p>
      </div>
    );
  }

  const Preview = componentRegistry[name];

  return (
    <div className="flex min-h-48 items-center justify-center p-8">
      <Preview />
    </div>
  );
}
