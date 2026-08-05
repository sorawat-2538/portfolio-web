// How I Work — bento variant (feature-grid style). Icon square, bold title,
// short caption. Two modes:
//   • default: 3-col grid with a step number (variant B)
//   • arrow:   flowing cards connected by arrows, no numbers (variant D)
// Token-based (light/dark).

import * as React from "react";
import { ArrowRight } from "lucide-react";
import type { FlowStep } from "../case-study/step-flow";
import { ScrollRail } from "../case-study/scroll-rail";

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

  // มือถือ = rail เลื่อนแนวนอน (การ์ด 8 ใบเรียงลงมาทำให้หน้ายาวเกินไป — user สั่ง)
  //          bleed ออกนอก padding ของ shell เพื่อให้เลื่อนได้เต็มความกว้างจอ
  // ≥640px  = grid เหมือนเดิม (ปิด scroll ด้วย sm:overflow-visible)
  return (
    <ScrollRail className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div key={s.label} className="w-[62%] max-w-[240px] shrink-0 sm:w-auto sm:max-w-none">
          <Card step={s} index={i} showNumber={showNumber} showSub={showSub} />
        </div>
      ))}
    </ScrollRail>
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
