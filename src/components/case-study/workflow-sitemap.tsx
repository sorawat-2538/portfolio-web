// How I Work — variant E. Sitemap / process-diagram look: compact nodes joined
// by drawn connector lines with arrowheads, flowing left → right and wrapping
// like a flowchart. Token-based (light/dark).

import * as React from "react";
import { ChevronRight } from "lucide-react";
import type { FlowStep } from "./step-flow";

/** drawn connector: a short rule + arrowhead (turns downward on wrap/mobile) */
function Connector() {
  return (
    <span className="flex items-center gap-1 px-1 text-brand/50" aria-hidden="true">
      <span className="h-px w-5 bg-gradient-to-r from-border to-brand/40 max-sm:hidden" />
      <ChevronRight className="h-4 w-4 max-sm:rotate-90" strokeWidth={2.4} />
    </span>
  );
}

export function WorkflowSitemap({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col items-stretch gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <React.Fragment key={s.label}>
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-[0_4px_14px_-10px_rgba(30,50,90,0.4)] transition-colors hover:border-brand/40">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {Icon && <Icon className="h-[15px] w-[15px]" strokeWidth={1.9} />}
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && <Connector />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
