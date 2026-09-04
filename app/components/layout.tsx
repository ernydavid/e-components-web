import type { ReactNode } from "react";
import Link from "next/link";
import { GithubIcon, ComponentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getLibraryComponents } from "@/lib/component-library";
import { ThemeToggle } from "../theme-toggle";

export default async function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const components = await getLibraryComponents();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 2xl:px-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
          >
            <span className="grid size-7 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              e
            </span>
            <span>e.components</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Home
            </Link>
            <ThemeToggle />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-sm" }),
              )}
            >
              <HugeiconsIcon icon={GithubIcon} size={16} />
            </a>
            <Button variant="default" size="sm" disabled>
              v0.1
            </Button>
          </div>
        </nav>
      </header>

      <div className="flex w-full flex-1 gap-10 px-6 py-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24">
            <Link
              href="/components"
              className="flex items-center gap-2 px-3 py-2 font-heading text-sm font-semibold"
            >
              <HugeiconsIcon icon={ComponentIcon} size={15} />
              Components
            </Link>
            <Separator className="my-3" />
            <ScrollArea className="h-[calc(100dvh-10rem)]">
              <nav className="flex flex-col gap-0.5">
                {components.map((component) => (
                  <Link
                    key={component.metadata.slug}
                    href={`/components/${component.metadata.slug}`}
                    className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {component.metadata.name}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 text-foreground dark:text-foreground">
            {children}
          </div>
        </div>

        {/** Navigation */}
        <div className="w-56 hidden xl:block"></div>
      </div>
    </div>
  );
}
