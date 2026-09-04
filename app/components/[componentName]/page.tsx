import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { CopyButton } from "../copy-button";
import { ComponentPreview } from "../component-preview";
import {
  getComponentBySlug,
  getLibraryComponents,
} from "@/lib/component-library";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const components = await getLibraryComponents();
  return components.map((component) => ({
    componentName: component.metadata.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[componentName]">): Promise<Metadata> {
  const { componentName } = await params;
  const components = await getLibraryComponents();
  const component = getComponentBySlug(componentName, components);

  return {
    title: component
      ? `${component.metadata.name} | e.components`
      : "Component not found | e.components",
    description: component
      ? component.metadata.description
      : "Component not found.",
  };
}

export default async function ComponentDetailPage({
  params,
}: PageProps<"/components/[componentName]">) {
  const { componentName } = await params;
  const components = await getLibraryComponents();
  const component = getComponentBySlug(componentName, components);

  if (!component) notFound();

  const index = components.findIndex(
    (c) => c.metadata.slug === component.metadata.slug,
  );
  const previous = components[index - 1];
  const next = components[index + 1];

  return (
    <div className="flex flex-col space-y-8">
      {/* Title */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="min-w-0 space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            {component.metadata.name}
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {component.metadata.description}
          </p>
          {component.metadata.tags && (
            <div className="flex items-center flex-wrap gap-1">
              <p className="text-sm text-muted-foreground">Tags: </p>
              {component.metadata.tags.map((item, i) => (
                <Badge variant={"secondary"} key={item + i}>
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="relative mt-5">
        <div className="absolute top-3 left-0 px-4 flex items-center justify-between">
          <Badge variant="secondary" className="">
            <HugeiconsIcon icon={Search01Icon} />
            Preview
          </Badge>
        </div>
        <div className="rounded-2xl border border-border bg-muted/30 p-6">
          <ComponentPreview name={component.metadata.slug} />
        </div>
      </section>

      {/* Code */}
      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            Code
          </h2>
          <CopyButton text={component.source} />
        </div>
        <div className="overflow-y-auto rounded-2xl border border-border bg-muted/30 max-h-132 scroll-fade">
          <pre className="overflow-y-auto whitespace-break-spaces p-5 font-mono text-xs leading-relaxed text-foreground/80">
            <code>{component.source}</code>
          </pre>
        </div>
      </section>

      {/* Prev / Next */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <Link
            href={`/components/${previous.metadata.slug}`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-ring/60"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Previous</p>
              <p className="truncate font-medium">{previous.metadata.name}</p>
            </div>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/components/${next.metadata.slug}`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-right transition-colors hover:border-ring/60"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Next</p>
              <p className="truncate font-medium">{next.metadata.name}</p>
            </div>
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              className="shrink-0 rotate-180 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
      </div>
    </div>
  );
}
