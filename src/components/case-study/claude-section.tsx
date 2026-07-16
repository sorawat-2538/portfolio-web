"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Maximize2,
  Sparkles,
  Plug,
  Database,
  Brain,
  Target,
  ClipboardList,
  FileText,
  LayoutTemplate,
  Presentation,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { StepFlow, type FlowStep } from "./step-flow";
import { StepperFlow } from "./stepper-flow";
import { ProjectRedesign } from "./project-redesign";

// lucide icon names used by claude flow steps → components
const STEP_ICONS: Record<string, LucideIcon> = {
  Plug,
  Database,
  Brain,
  Target,
  ClipboardList,
  Sparkles,
  FileText,
  LayoutTemplate,
  Presentation,
  BarChart3,
};

type Claude = NonNullable<Project["claude"]>;

/** small brand eyebrow used above flow / case-study within each workflow */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
      {children}
    </div>
  );
}

/** "AI in My Workflow" — 2 workflows, each shown prominently as:
 *  heading → flow การทำงาน (wraps, no horizontal scroll) → case study งานที่ได้จาก flow นั้น.
 *  WF1 case study = the insight surfaced from data · WF2 case study = the redesign (ProjectRedesign). */
export function ClaudeSection({
  claude,
  title,
}: {
  claude: Claude;
  title: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const img = claude.insight.image;

  // sample steps (ใช้ flow แรก) สำหรับบล็อกเทียบสไตล์ Flow ด้านล่าง
  const sampleSteps: FlowStep[] = claude.flows[0].steps.map((st) => ({
    label: st.label,
    sub: st.sub,
    icon: st.icon ? STEP_ICONS[st.icon] : undefined,
  }));

  // ── case study ของ Workflow 1 — insight ที่ขุดได้จาก data ──
  const insightCaseStudy = (
    <div className="overflow-hidden rounded-xl border border-brand/40 bg-brand/[0.04]">
      <div className="px-[clamp(20px,3vw,30px)] pt-[clamp(20px,3vw,28px)]">
        <p className="text-[clamp(16px,1.9vw,19px)] font-medium leading-[1.6] text-foreground">
          {claude.insight.lead}
        </p>

        {/* stat contrast */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {claude.insight.stats.map((st, i) => (
            <div
              key={i}
              className={`rounded-xl border px-4 py-4 ${
                i === claude.insight.stats.length - 1
                  ? "border-brand/50 bg-brand/[0.06]"
                  : "border-border bg-card"
              }`}
            >
              <div
                className={`text-[clamp(26px,4vw,34px)] font-bold leading-none tracking-[-0.02em] tabular-nums ${
                  i === claude.insight.stats.length - 1 ? "text-brand" : "text-foreground"
                }`}
              >
                {st.value}
              </div>
              <div className="mt-2 text-[13px] leading-snug text-muted-foreground">
                {st.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[16px] leading-[1.75] text-muted-foreground">
          {claude.insight.takeaway}
        </p>
      </div>

      {/* Session Explorer shot — clickable */}
      <div className="mt-6 px-[clamp(20px,3vw,30px)] pb-[clamp(20px,3vw,28px)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`ดู ${img.caption} เต็มจอ`}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border shadow-[0_4px_14px_-4px_rgba(30,50,90,0.2)] outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <Image
            src={img.src}
            alt={`${title} — ${img.caption}`}
            width={img.w}
            height={img.h}
            sizes="(max-width: 900px) 100vw, 680px"
            quality={88}
            className="block h-auto w-full"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1.5 text-[12px] font-medium text-foreground opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
            เต็มจอ
          </span>
        </button>
        <p className="mt-2.5 text-[13px] leading-[1.5] text-muted-foreground">{img.caption}</p>
      </div>
    </div>
  );

  return (
    <section>
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
        AI in My Workflow
      </h2>
      <p className="mt-[18px] text-[17px] leading-[1.8] text-muted-foreground">
        {claude.intro}
      </p>

      {/* ── ตัวเลือกสไตล์ "Flow การทำงาน" (ชั่วคราว — เลือกอันที่ชอบ แล้วผม apply + ลบบล็อกนี้) ── */}
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-hover/30 p-[clamp(18px,3vw,28px)]">
        <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
          ตัวเลือกสไตล์ Flow การทำงาน
        </div>
        <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
          เลือกอันที่ชอบ แล้วบอกผมได้เลย เดี๋ยว apply ให้ทั้ง 2 workflow แล้วลบบล็อกนี้ออก
        </p>

        <div className="mt-7 flex flex-col gap-9">
          {[
            { key: "A · แบบปัจจุบัน (card)", node: <StepFlow steps={sampleSteps} variant="card" wrap /> },
            { key: "B · Stepper แนวตั้ง (แนะนำ)", node: <div className="max-w-[440px]"><StepperFlow steps={sampleSteps} orientation="vertical" /></div> },
            { key: "C · Stepper แนวนอน", node: <StepperFlow steps={sampleSteps} orientation="horizontal" /> },
          ].map((opt) => (
            <div key={opt.key}>
              <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[12px] font-semibold text-foreground">
                {opt.key}
              </div>
              {opt.node}
            </div>
          ))}
        </div>
      </div>

      {/* 2 workflows — each: prominent heading → flow → case study */}
      <div className="mt-9 flex flex-col gap-14">
        {claude.flows.map((f, fi) => {
          const steps: FlowStep[] = f.steps.map((st) => ({
            label: st.label,
            sub: st.sub,
            icon: st.icon ? STEP_ICONS[st.icon] : undefined,
          }));

          return (
            <div key={f.label}>
              {fi > 0 && <div className="mb-14 h-px bg-border" />}

              {/* ── prominent workflow header ── */}
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-[19px] font-bold tabular-nums text-white shadow-[0_10px_24px_-10px_rgba(45,104,255,0.6)]">
                  {fi + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand ring-1 ring-brand/20">
                    <Sparkles className="h-3 w-3" />
                    Workflow {fi + 1}
                  </span>
                  <h3 className="mt-2 text-[clamp(21px,2.6vw,27px)] font-bold leading-[1.2] tracking-[-0.02em] text-foreground">
                    {f.label}
                  </h3>
                  {f.sub && (
                    <p className="mt-1.5 max-w-[60ch] text-[14.5px] leading-relaxed text-muted-foreground">
                      {f.sub}
                    </p>
                  )}
                </div>
              </div>

              {/* ── flow การทำงาน (wrap → ไม่มี scroll แนวนอน) ── */}
              <div className="mt-7">
                <Eyebrow>Flow การทำงาน</Eyebrow>
                <div className="mt-4">
                  <StepFlow steps={steps} variant="card" wrap />
                </div>
              </div>

              {/* ── case study งานที่ได้จาก flow นี้ ── */}
              <div className="mt-9">
                <Eyebrow>Case study · งานที่ได้จาก flow นี้</Eyebrow>
                <div className="mt-4">
                  {fi === 0 ? insightCaseStudy : <ProjectRedesign />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* closing — role shift */}
      <p className="mt-12 text-[17px] leading-[1.8] text-foreground">
        {claude.closing}
      </p>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="min-w-0 truncate text-sm font-medium">
              {title} — {img.caption}
            </span>
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={`${title} — ${img.caption}`}
                width={img.w}
                height={img.h}
                sizes="(max-width: 1024px) 100vw, 900px"
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
