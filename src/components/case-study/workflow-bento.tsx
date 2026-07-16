// How I Work — bento variant (feature-grid style). Icon square, bold title,
// short caption. Two modes:
//   • default: 3-col grid with a step number (variant B)
//   • arrow:   flowing cards connected by arrows, no numbers (variant D)
// Token-based (light/dark).

import * as React from "react";
import { ArrowRight } from "lucide-react";
import type { FlowStep } from "./step-flow";

function Card({
  step,
  index,
  showNumber,
  showSub = true,
}: {
  step: FlowStep;
  index: number;
  showNumber: boolean;
  showSub?: boolean;
}) {
  const Icon = step.icon;
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
          {Icon && <Icon className="h-[20px] w-[20px]" strokeWidth={1.8} />}
        </span>
        {showNumber && (
          <span className="font-mono text-[13px] font-semibold tabular-nums text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <h4 className="mt-4 text-[15px] font-bold tracking-[-0.01em] text-foreground">
        {step.label}
      </h4>
      {showSub && step.sub && (
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
          {step.sub}
        </p>
      )}
    </div>
  );
}

export function WorkflowBento({
  steps,
  arrow = false,
  showNumber = true,
  showSub = true,
}: {
  steps: FlowStep[];
  arrow?: boolean;
  showNumber?: boolean;
  showSub?: boolean;
}) {
  if (arrow) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-y-3">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="sm:w-[212px]">
              <Card step={s} index={i} showNumber={false} />
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center py-1 text-faint sm:px-1">
                <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" strokeWidth={1.7} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Card key={s.label} step={s} index={i} showNumber={showNumber} showSub={showSub} />
      ))}
    </div>
  );
}

/** Variant A — minimal numbered cards (colored number + title, 4-col). No icon,
 *  no description. Matches the reference grid. */
export function WorkflowCards({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div
          key={s.label}
          className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
        >
          <span className="block font-mono text-[15px] font-bold tabular-nums text-red-500 dark:text-red-400">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="mt-3 block text-[15px] font-bold leading-snug tracking-[-0.01em] text-foreground">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
