"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckIcon,
  CheckmarkCircle01Icon,
  ComponentIcon,
  Copy01Icon,
  DragDropIcon,
  GithubIcon,
  GridIcon,
  Moon01Icon,
  PaletteIcon,
  SparklesIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoMain } from "@/components/logo-main";

const DynamicThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle),
  { ssr: false },
);

const INSTALL_CMD =
  "pnpm dlx shadcn@latest init --base-color base --theme maia";

const FEATURES = [
  {
    icon: Copy01Icon,
    title: "Copy, paste, ship",
    description:
      "Drop a component into your project and it just works. No boilerplate, no setup.",
  },
  {
    icon: CheckmarkCircle01Icon,
    title: "Accessible by default",
    description:
      "Built on Base UI primitives — keyboard, focus, and screen-reader friendly out of the box.",
  },
  {
    icon: PaletteIcon,
    title: "Fully customizable",
    description:
      "Style with Tailwind classes and theme tokens. Your design system, not ours.",
  },
  {
    icon: Moon01Icon,
    title: "Dark mode included",
    description:
      "Light and dark themes with CSS variables. Switch with one click.",
  },
];

const NAV_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Install", href: "#install" },
  { label: "Themes", href: "#themes" },
];

function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex w-full max-w-xs md:max-w-md items-center gap-2 rounded-4xl border border-border bg-input/30 px-4 py-2.5 text-left font-mono text-xs text-muted-foreground transition-colors hover:border-ring/60 hover:bg-input/50"
    >
      <span className="truncate">$ {INSTALL_CMD}</span>
      <span className="ml-auto shrink-0 text-foreground/70">
        <HugeiconsIcon icon={copied ? CheckIcon : Copy01Icon} size={15} />
      </span>
    </button>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 2xl:px-0">
          {/* <a
            href="#"
            className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
          >
            <span className="grid size-7 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              e
            </span>
            <span>e.components</span>
          </a> */}

          <LogoMain />

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <DynamicThemeToggle />
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
            <a
              href="#install"
              className={cn(
                buttonVariants({ size: "default" }),
                "hidden sm:inline-flex",
              )}
            >
              Get started
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 2xl:px-0 pt-24 pb-16 text-center sm:pt-32">
        <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1">
          <HugeiconsIcon icon={SparklesIcon} size={13} />
          New — Base UI + Maia theme
        </Badge>

        <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Beautiful components.{" "}
          <span className="text-muted-foreground">Copy, paste, ship.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          A growing library of accessible, production-ready components built on
          shadcn/ui and Base UI — ready to drop into your Next.js project.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/components"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Browse components
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
            <Link
              href="#install"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <HugeiconsIcon icon={ZapIcon} size={16} />
              Install
            </Link>
          </div>
          <InstallCommand />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {[
            "shadcn/ui",
            "Base UI",
            "Tailwind v4",
            "React/Next.js",
            "Dark mode",
          ].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={13} />
              {t}
            </span>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section
        id="components"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 2xl:px-0 py-20"
      >
        <div className="mb-10 flex flex-col items-start gap-3">
          <Badge variant="secondary" className="gap-1.5">
            <HugeiconsIcon icon={GridIcon} size={13} />
            Components
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Everything you need to build
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Buttons, forms, dialogs, navigation, and more — consistent,
            accessible, and yours to customize.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="gap-4">
              <CardHeader className="flex-row items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
                  <HugeiconsIcon icon={f.icon} size={18} />
                </span>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{f.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Install */}
      <section
        id="install"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 2xl:px-0 py-20"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <Badge variant="secondary" className="gap-1.5">
              <HugeiconsIcon icon={ComponentIcon} size={13} />
              Install
            </Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Get started in seconds
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Initialize shadcn/ui with the Base UI preset and Maia theme, then
              add only the components you need — tree-shaken and ready to go.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/components" className={cn(buttonVariants())}>
                View components
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </Link>
            </div>
          </div>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col gap-3 p-0">
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <HugeiconsIcon icon={DragDropIcon} size={14} />
                  terminal
                </span>
                <InstallCommand />
              </div>
              <pre className="overflow-x-auto px-5 pb-5 font-mono text-xs leading-relaxed text-foreground/80">
                {`pnpm dlx shadcn@latest init --base-color base --theme maia

# then add components
pnpm dlx shadcn@latest add button card input
pnpm dlx shadcn@latest add dialog sheet tabs`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section
        id="themes"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 2xl:px-0 pb-24"
      >
        <Card className="items-center gap-6 bg-primary p-10 text-center text-primary-foreground ring-primary sm:p-16">
          <CardTitle className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
            Start building today
          </CardTitle>
          <CardDescription className="max-w-md text-primary-foreground/80">
            Copy-paste components into your Next.js app and focus on what makes
            your product unique.
          </CardDescription>
          <a
            href="#install"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            Get started
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </a>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 2xl:px-0 py-8 sm:flex-row">
          <div className="flex items-center gap-2 font-heading text-sm font-semibold">
            <span className="grid size-6 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              e
            </span>
            e.components
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} e.components. Built with shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  );
}
