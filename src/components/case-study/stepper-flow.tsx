// StepperFlow — "Flow การทำงาน" สไตล์ stepper (numbered node + connector)
// adapt จาก reference (dark + ม่วง) → light mode + ใช้ --brand ตามระบบสีเดิม
//   orientation="vertical"   = node เรียงลง + เส้นเชื่อมแนวตั้ง (ไม่มี scroll, รับ step เยอะได้)
//   orientation="horizontal" = node เรียงข้าง + chevron คั่น, wrap ลงแถวใหม่แทนการ scroll
// ใช้ตัวเลข (01, 02, …) ในวงกลม ตามตัวอย่าง — เป็น process flow จึง treat ทุก step เท่ากัน

import { ChevronRight } from "lucide-react";
import type { FlowStep } from "./step-flow";

function Node({ n }: { n: number }) {
  return (
    <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-background text-[13px] font-bold tabular-nums text-brand">
      {String(n).padStart(2, "0")}
    </span>
  );
}

function VerticalStepper({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className="relative flex gap-4 pb-7 last:pb-0">
            {!last && (
              <span
                className="absolute bottom-0 left-5 top-10 w-px -translate-x-1/2 bg-border"
                aria-hidden="true"
              />
            )}
            <Node n={i + 1} />
            <div className="pt-1.5">
              <div className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                {s.label}
              </div>
              {s.sub && (
                <div className="mt-0.5 text-[13.5px] leading-snug text-muted-foreground">
                  {s.sub}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function HorizontalStepper({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-1 sm:gap-y-6">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li
            key={s.label}
            className="flex items-start gap-3 sm:flex-1 sm:basis-[190px]"
          >
            <Node n={i + 1} />
            <div className="min-w-0 pt-1.5">
              <div className="text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                {s.label}
              </div>
              {s.sub && (
                <div className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                  {s.sub}
                </div>
              )}
            </div>
            {!last && (
              <ChevronRight
                className="mt-2 hidden h-4 w-4 shrink-0 text-brand/40 sm:block"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function StepperFlow({
  steps,
  orientation = "vertical",
}: {
  steps: FlowStep[];
  orientation?: "vertical" | "horizontal";
}) {
  return orientation === "horizontal" ? (
    <HorizontalStepper steps={steps} />
  ) : (
    <VerticalStepper steps={steps} />
  );
}
