// Shared step-flow — uniform boxes connected by arrows, left → right (wraps to a
// horizontal scroll rail when there are many steps). Vertical stack with down-
// arrows on mobile. Each box is the SAME size so 4-step and 5-step flows line up.
// A box shows an icon (if given) or its step number, then a label + optional sub.

import { ArrowRight, type LucideIcon } from "lucide-react";

export type FlowStep = { label: string; sub?: string; icon?: LucideIcon };

export function StepFlow({
  steps,
  variant = "card",
  wrap = false,
}: {
  steps: FlowStep[];
  variant?: "card" | "plain";
  /** wrap onto multiple rows instead of a horizontal scroll rail */
  wrap?: boolean;
}) {
  const boxed = variant === "card";
  return (
    <ol
      className={`flex list-none flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-x-0 [scrollbar-width:thin] ${
        wrap ? "sm:flex-wrap sm:gap-y-3" : "sm:overflow-x-auto sm:pb-2"
      }`}
    >
      {steps.map((s, i) => {
        const Icon = s.icon;
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className="flex flex-col sm:flex-row sm:items-stretch">
            <div
              className={`flex w-full flex-col gap-3 p-4 sm:min-h-[140px] sm:w-[152px] sm:shrink-0 ${
                boxed
                  ? "rounded-2xl border border-border bg-card transition-colors hover:border-brand/40"
                  : ""
              }`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                {Icon ? (
                  <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
                ) : (
                  <span className="text-[15px] font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </span>
              <span className="mt-auto block">
                <span className="block text-[13.5px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                  {s.label}
                </span>
                {s.sub && (
                  <span className="mt-1 block text-[11.5px] leading-snug text-muted-foreground">
                    {s.sub}
                  </span>
                )}
              </span>
            </div>

            {!last && (
              <div className="flex items-center justify-center py-1 text-faint sm:px-1.5 sm:py-0">
                <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" strokeWidth={1.7} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
