// Vertical "data architecture" flow — boxes stacked top → bottom, connected by
// a line + down-chevron, like a data pipeline diagram. Each box = icon chip +
// label + sub. Used for the AI workflows. Token-based (light/dark).

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { FlowStep } from "./step-flow";

export function DataArchFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex w-full max-w-[340px] list-none flex-col items-stretch">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className="flex flex-col items-center">
            <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 shadow-[0_5px_16px_-12px_rgba(30,50,90,0.35)] transition-colors hover:border-brand/40">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {Icon && <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />}
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                  {s.label}
                </span>
                {s.sub && (
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-muted-foreground">
                    {s.sub}
                  </span>
                )}
              </span>
            </div>

            {!last && (
              <div className="flex flex-col items-center py-0.5 text-brand/50">
                <span className="h-3 w-px bg-gradient-to-b from-brand/50 to-brand/15" />
                <ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={2} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
