"use client";

import { cn } from "@/lib/utils";
import type { ComponentMetadata } from "@/lib/component-library";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Metadata — required by the registry to list this component on /components
// ---------------------------------------------------------------------------

export const metadata: ComponentMetadata = {
  name: "Subscription Card",
  slug: "subscription-card",
  description:
    "Pricing cards for subscription plans with selection state and feature lists.",
  previewExport: "Preview",
  metadataExport: "metadata",
  category: "pricing",
  tags: ["pricing", "card", "plans", "subscription"],
};

// ---------------------------------------------------------------------------
// Icons (inline, avoids external deps)
// ---------------------------------------------------------------------------

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Type Classes
// ---------------------------------------------------------------------------

type Variant = {
  background?: string;
  foreground?: string;
  accent?: string;
};

// ---------------------------------------------------------------------------
// PlanCard
// ---------------------------------------------------------------------------

function SubscriptionCard({
  title,
  description,
  price,
  variant,
  features,
  position,
  isSelected,
  isFeatured,
  onSelect,
}: {
  title: string;
  description: string;
  price: number;
  features: string[];
  variant?: Variant;
  position?: number;
  isSelected?: boolean;
  isFeatured?: boolean;
  onSelect?: () => void;
}) {
  return (
    <div
      className={cn(
        "w-full flex flex-col bg-secondary rounded-4xl overflow-hidden transition-all shadow-md hover:shadow-2xl hover:shadow-primary/40",
        isSelected && "bg-linear-to-br from-sky-400 via-purple-700 to-sky-800",
      )}
      role="button"
      tabIndex={0}
      onClick={onSelect}
    >
      {isFeatured ? (
        <div className="p-4 flex items-center justify-center gap-1">
          <FlameIcon className="size-4" />
          <h3 className="text-sm uppercase">Popular choice</h3>
        </div>
      ) : (
        <div className="p-4">
          <h3 className="text-sm text-center uppercase text-foreground">
            {position && (
              <>
                <span className="font-bold opacity-70">0{position}</span>{" "}
              </>
            )}
            {title}
          </h3>
        </div>
      )}

      <div className="m-1 flex-1 flex flex-col rounded-[28px] overflow-hidden bg-muted">
        <div
          className={cn(
            "p-6 flex flex-col gap-3 rounded-3xl shadow-lg bg-linear-to-br from-indigo-500 to-purple-600 text-white",
            variant?.background,
            variant?.foreground,
          )}
        >
          <h2 className="text-4xl font-semibold">
            {title.split(" ")?.[0]}
            <span className="text-3xl font-serif italic font-normal opacity-80">
              member
            </span>
          </h2>

          <p className="text-sm opacity-80">{description}</p>

          <div className="flex items-center gap-6 justify-between">
            <button
              className={cn(
                "h-12 transition-all gap-1 uppercase inline-flex items-center justify-center rounded-4xl border border-border/80 bg-clip-padding px-3 text-sm font-medium whitespace-nowrap select-none hover:cursor-pointer hover:opacity-90 bg-purple-600/5",
                variant?.accent && variant.accent,
                variant?.foreground && variant.foreground,
              )}
              onClick={(e) => (e.stopPropagation(), alert(`Select ${title}`))}
            >
              {isSelected && <CheckIcon className="size-4" />}
              {isSelected ? `${title} member` : "Join Us"}
            </button>

            <div className="flex flex-col leading-none text-right">
              <p className="text-2xl font-semibold">
                ${price}
                <span className="font-normal font-serif italic opacity-80">
                  /mo
                </span>
              </p>
              <span className="text-xs">Pause or cancel anytime</span>
            </div>
          </div>

          {isSelected && (
            <div className="flex flex-col gap-1 rounded-2xl bg-white/10 p-4 text-sm">
              <p className="font-medium">Join {title}</p>
              <p className="opacity-80 text-xs">
                Complete the form below to get started with the{" "}
                {title.split(" ")?.[0]}.
              </p>
            </div>
          )}
        </div>

        <footer className="px-6 py-7 flex flex-col gap-1 text-sm text-muted-foreground">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckIcon className="size-3 shrink-0" />
              <p>{feature}</p>
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
}

export function Preview() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col space-y-8">
      <SubscriptionCard
        title="Gold Plan"
        position={1}
        isSelected={selected === 1}
        description="For teams that need everything."
        features={[
          "Unlimited workspaces",
          "Dedicated support",
          "Custom integrations",
          "API access",
          "White-label",
          "SLA guarantee",
        ]}
        price={79.99}
        variant={{
          accent: "bg-yellow-800",
          background: "bg-linear-90 from-yellow-800 to-orange-300",
          foreground: "text-white",
        }}
        onSelect={() => setSelected(1)}
      />

      <SubscriptionCard
        title="Diamond Plan"
        isSelected={selected === 2}
        isFeatured
        position={2}
        description="For teams that need everything."
        features={[
          "Unlimited workspaces",
          "Dedicated support",
          "Custom integrations",
          "API access",
          "White-label",
          "SLA guarantee",
        ]}
        price={99.99}
        onSelect={() => setSelected(2)}
      />
    </div>
  );
}
