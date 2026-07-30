"use client";

import * as React from "react";
import Image from "next/image";
import { X, Maximize2, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectRedesign } from "./project-redesign";
import { ListingDialogMock } from "./listing-dialog-mock";

type Claude = NonNullable<Project["claude"]>;
type Shot = Claude["insight"]["image"];

/** small brand eyebrow used above flow / case-study within each workflow */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
      {children}
    </div>
  );
}

/** "AI in My Workflow" — 2 workflows, each: heading → step trail (สั้น) → case study.
 *  WF1 case study = insight ที่ขุดจาก data → idea (mockup) · WF2 = redesign (ProjectRedesign). */
export function ClaudeSection({
  claude,
  title,
}: {
  claude: Claude;
  title: string;
}) {
  // lightbox — เก็บรูปที่กำลังซูม (null = ปิด)
  const [lightbox, setLightbox] = React.useState<Shot | null>(null);

  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  /** รูปหลักฐานที่กดซูมได้ */
  const EvidenceShot = ({ shot }: { shot: Shot }) => (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(shot)}
        aria-label={`ดู ${shot.caption} เต็มจอ`}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border shadow-[0_4px_14px_-4px_rgba(30,50,90,0.2)] outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <Image
          src={shot.src}
          alt={`${title} — ${shot.caption}`}
          width={shot.w}
          height={shot.h}
          sizes="(max-width: 900px) 100vw, 680px"
          quality={88}
          className="block h-auto w-full"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1.5 text-[12px] font-medium text-foreground opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
          เต็มจอ
        </span>
      </button>
      <p className="mt-2.5 text-[13px] leading-[1.5] text-muted-foreground">{shot.caption}</p>
    </div>
  );

  // ── case study ของ Workflow 1 — insight ที่ขุดได้จาก data → idea ──
  const insightCaseStudy = (
    <div className="overflow-hidden rounded-xl border border-brand/40 bg-brand/[0.04]">
      <div className="px-[clamp(20px,3vw,30px)] pt-[clamp(20px,3vw,28px)]">
        <p className="text-[clamp(16px,1.9vw,19px)] font-medium leading-[1.6] text-foreground">
          {claude.insight.lead}
        </p>

        {/* หลักฐาน A — listing_detail คือ hub (Navigation Summary) */}
        {claude.insight.evidence && (
          <div className="mt-6">
            <EvidenceShot shot={claude.insight.evidence} />
          </div>
        )}

        {/* stat contrast — ยิ่ง engage ลึก contact ยิ่งพุ่ง */}
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

        {/* หลักฐาน B — engagement depth distribution (Session Explorer) */}
        <div className="mt-6">
          <EvidenceShot shot={claude.insight.image} />
        </div>

        <p className="mt-6 text-[16px] leading-[1.75] text-muted-foreground">
          {claude.insight.takeaway}
        </p>
      </div>

      {/* ── idea ที่ได้ → mockup (proposed) ── */}
      <div className="mt-7 border-t border-brand/20 bg-background/50 px-[clamp(20px,3vw,30px)] py-[clamp(22px,3vw,30px)]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-600">
          <Lightbulb className="h-3.5 w-3.5" />
          Proposed · ยังไม่ ship
        </span>
        <h4 className="mt-3 text-[clamp(18px,2.2vw,21px)] font-semibold tracking-[-0.01em] text-foreground">
          Idea: ให้เห็นประกาศได้เยอะขึ้นในหน้า listing detail
        </h4>
        <p className="mt-2.5 text-[15px] leading-[1.75] text-muted-foreground">
          ปัจจุบันถ้าจะดูประกาศทั้งโครงการ user ต้องเด้งออกไปหน้าเช่า/ขายแยก — navigate หลายหน้าเกินไป
          จึงเสนอปุ่ม <span className="font-medium text-foreground">“ดูทั้งหมด xx ประกาศ”</span> +
          dialog ที่รวมประกาศทั้งโครงการ (เช่า/ขาย) ไว้ในหน้าเดียว{" "}
          <span className="font-medium text-foreground">
            สมมติฐาน: user จะดูหลายประกาศขึ้น (2–3 view เพิ่ม) และ 1-view ลดลง
          </span>
        </p>
        <div className="mt-6">
          <ListingDialogMock />
        </div>
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

      {/* 2 workflows — each: heading → step trail (สั้น) → case study */}
      <div className="mt-9 flex flex-col gap-14">
        {claude.flows.map((f, fi) => (
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

            {/* ── step trail (สั้น, inline) — เครื่องมือ + ขั้นตอน แบบ caption ไม่ใช่กล่องใหญ่ ── */}
            <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2 pl-16">
              {f.steps.map((st, i) => (
                <React.Fragment key={st.label}>
                  {i > 0 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-faint" strokeWidth={2} aria-hidden="true" />
                  )}
                  <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-[12px] font-medium text-foreground/80">
                    {st.label}
                  </span>
                </React.Fragment>
              ))}
            </div>

            {/* ── case study งานที่ได้จาก flow นี้ ── */}
            <div className="mt-9">
              <Eyebrow>Case study · งานที่ได้จาก flow นี้</Eyebrow>
              <div className="mt-4">{fi === 0 ? insightCaseStudy : <ProjectRedesign />}</div>
            </div>
          </div>
        ))}
      </div>

      {/* closing — role shift */}
      <p className="mt-12 text-[17px] leading-[1.8] text-foreground">{claude.closing}</p>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="min-w-0 truncate text-sm font-medium">
              {title} — {lightbox.caption}
            </span>
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setLightbox(null)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={lightbox.src}
                alt={`${title} — ${lightbox.caption}`}
                width={lightbox.w}
                height={lightbox.h}
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
