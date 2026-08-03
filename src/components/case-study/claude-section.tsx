"use client";

// เนื้อหาหลักของหน้า Data & AI Workflow — Tools + ทุก section ใน data
//
// ทุก section ใช้โครงเดียวกับ "How I Measured?" ของ case study เป๊ะ ๆ:
// H2 → goal callout (เทา เส้นซ้ายหนา) → step มีเลขกำกับ + เส้นเชื่อม
// เพิ่ม/สลับ section = แก้ `sections` ใน data/data-analysis.ts ไม่ต้องแตะไฟล์นี้
//
// แต่ละ step ประกอบร่างจาก field ที่มีใน data เท่านั้น
// (stats / image / takeaway / mock) — ไม่มี field ไหน = ไม่ render ส่วนนั้น

import * as React from "react";
import Image from "next/image";
import {
  AppWindow,
  FileText,
  LayoutTemplate,
  ListChecks,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import type {
  DataAnalysisContent,
  DataAnalysisSection,
  DataAnalysisShot,
} from "@/data/data-analysis";
import { toolMeta } from "@/data/tools";
import { ListingDialogMock } from "./listing-dialog-mock";
import { SpecHandoffMock } from "./spec-handoff-mock";
import { ClaudeInstructionsMock } from "./claude-instructions-mock";
import { ClaudeFilesMock } from "./claude-files-mock";
import { AsciiScreenMock } from "./ascii-screen-mock";
import { WorkflowBento } from "../home/work-flow-bento";

type Claude = DataAnalysisContent;
type Shot = DataAnalysisShot;

/** key ใน data → ไอคอนจริง (data เป็น .ts เลยไม่ให้ import component เข้าไปเอง) */
const FLOW_ICON: Record<
  NonNullable<NonNullable<DataAnalysisSection["flow"]>[number]["icon"]>,
  LucideIcon
> = {
  instructions: ListChecks,
  analyze: Sparkles,
  file: FileText,
  design: LayoutTemplate,
  wireframe: AppWindow,
};

/** รูปหลักฐานที่กดซูมได้ (caption จัดกลางใต้รูป)
 *  treatment เดียวกับรูปใน How I Measured? ของ Propertyhub เป๊ะ ๆ:
 *  ไม่มีปุ่ม "เต็มจอ" ตอน hover และไม่มีกรอบ focus สีน้ำเงินค้างหลังกด Esc ปิด lightbox
 *  (outline-none บน <button> — โฟกัสกลับมาที่ปุ่มก็ไม่เห็นวงแหวน) */
function EvidenceShot({
  shot,
  title,
  onZoom,
}: {
  shot: Shot;
  title: string;
  onZoom: (shot: Shot) => void;
}) {
  return (
    <figure className="min-w-0">
      <button
        type="button"
        onClick={() => onZoom(shot)}
        aria-label={`ดู ${shot.caption} เต็มจอ`}
        className="group relative block w-full cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
      >
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_4px_14px_-4px_rgba(30,50,90,0.2)]">
          <Image
            src={shot.src}
            alt={`${title} — ${shot.caption}`}
            width={shot.w}
            height={shot.h}
            sizes="(max-width: 900px) 100vw, 680px"
            quality={88}
            className="block h-auto w-full"
          />
        </div>
      </button>
      <figcaption className="mt-2.5 text-center text-[13px] leading-[1.5] text-muted-foreground">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

/** การ์ดเครื่องมือ — ดีไซน์เดียวกับ section Tools ของหน้า case study อื่น
 *  (โลโก้ 30px + ชื่อ ไม่มีคำอธิบาย · กริด 4 คอลัมน์) */
function ToolCard({ name }: { name: string }) {
  const meta = toolMeta(name);
  return (
    <div className="flex min-h-[70px] items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
      {"icon" in meta ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.icon}
          alt={name}
          width={30}
          height={30}
          className="block h-[30px] w-[30px] shrink-0 object-contain"
        />
      ) : (
        <span
          className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg text-[13px] font-bold"
          style={{ background: meta.bg, color: meta.fg }}
        >
          {meta.mono}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-[15px] text-foreground">
        {name}
      </span>
    </div>
  );
}

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

  return (
    <section>
      {/* ── TOOLS — กริดการ์ด ดีไซน์เดียวกับ section Tools ของหน้า case study อื่น ── */}
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
        Tools
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
        {claude.tools.map((t) => (
          <ToolCard key={t} name={t} />
        ))}
      </div>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── ทุก section ใช้โครงเดียวกัน: H2 → goal callout → ไทม์ไลน์ step ── */}
      {claude.sections.map((sec, si) => (
        <React.Fragment key={sec.heading}>
          {si > 0 && (
            <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          )}

          <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
            {sec.heading}
          </h2>

          {/* goal — callout เดียวกับ How I Measured? (เส้นซ้ายหนา + พื้นเทา) ให้อ่านก่อน
              lead = ประโยคสรุป section ตัวหนาบรรทัดแรก (มีเฉพาะบาง section) */}
          <div className="mt-6 rounded-r-xl border-l-[3px] border-foreground bg-hover px-[clamp(18px,2.4vw,26px)] py-[clamp(18px,2.4vw,24px)]">
            {sec.lead && (
              <p className="mb-3 text-[clamp(17px,2vw,21px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
                {sec.lead}
              </p>
            )}
            <p className="text-[clamp(16px,1.9vw,20px)] leading-[1.62] text-foreground">
              {sec.goal}
            </p>
          </div>

          {/* flow — แถบ workflow ย่อ ให้เห็นทั้งกระบวนการก่อนลงรายละเอียดทีละขั้น
              ใช้การ์ดชุดเดียวกับ "My Work Flow" หน้าแรก (WorkflowBento) ให้ภาษาภาพตรงกัน */}
          {sec.flow && sec.flow.length > 0 && (
            <div className="mt-7">
              <WorkflowBento
                showNumber={false}
                steps={sec.flow.map((f) => ({
                  label: f.label,
                  sub: f.sub,
                  icon: f.icon ? FLOW_ICON[f.icon] : undefined,
                }))}
              />
            </div>
          )}

          {/* steps — ไทม์ไลน์มีเลขกำกับ + เส้นเชื่อม */}
          <div className="mt-[38px] flex flex-col">
            {sec.steps.map((s, i) => {
              const last = i === sec.steps.length - 1;
              return (
                <div
                  key={s.title}
                  className="relative flex gap-5 pb-12 last:pb-0 sm:gap-6"
                >
                  {/* left — เลขขั้น + เส้นต่อลงขั้นถัดไป */}
                  <div className="relative flex shrink-0 flex-col items-center">
                    {!last && (
                      <span className="absolute bottom-0 left-1/2 top-[52px] w-[2px] -translate-x-1/2 bg-border" />
                    )}
                    <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-brand text-[22px] font-bold tabular-nums text-white shadow-[0_8px_20px_-6px_rgba(45,104,255,0.5)]">
                      {i + 1}
                    </span>
                  </div>

                  {/* right — เนื้อหาของขั้นนี้ */}
                  <div className="min-w-0 flex-1 pb-2">
                    <h3 className="text-[clamp(19px,2.1vw,22px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
                      {s.title}
                    </h3>
                    {s.body && (
                      <p className="mt-3 text-[16px] leading-[1.75] text-muted-foreground">
                        {s.body}
                      </p>
                    )}

                    {/* stat cards — tone บอกทิศทางของตัวเลข (bad = เลขที่อยากดันให้ดีขึ้น) */}
                    {s.stats && s.stats.length > 0 && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        {s.stats.map((st) => (
                          <div
                            key={st.value}
                            className={`rounded-xl border px-4 py-4 ${
                              st.tone === "good"
                                ? "border-brand/50 bg-brand/[0.06]"
                                : st.tone === "bad"
                                  ? "border-red-300 bg-red-500/[0.06]"
                                  : "border-border bg-card"
                            }`}
                          >
                            <div
                              className={`text-[clamp(26px,4vw,34px)] font-bold leading-none tracking-[-0.02em] tabular-nums ${
                                st.tone === "good"
                                  ? "text-brand"
                                  : st.tone === "bad"
                                    ? "text-red-500"
                                    : "text-foreground"
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
                    )}

                    {s.image && (
                      <div className="mt-5">
                        <EvidenceShot
                          shot={s.image}
                          title={title}
                          onZoom={setLightbox}
                        />
                      </div>
                    )}

                    {/* หลายรูปในขั้นเดียว — กริด 2 คอลัมน์ */}
                    {s.images && s.images.length > 0 && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {s.images.map((shot) => (
                          <EvidenceShot
                            key={shot.src}
                            shot={shot}
                            title={title}
                            onZoom={setLightbox}
                          />
                        ))}
                      </div>
                    )}

                    {/* mock ก่อน takeaway เสมอ — ให้เห็นของจริงก่อน แล้วค่อยสรุป */}
                    {s.mock === "listing-dialog" && (
                      <div className="mt-6">
                        <ListingDialogMock />
                      </div>
                    )}
                    {s.mock === "spec-handoff" && (
                      <div className="mt-6">
                        <SpecHandoffMock />
                      </div>
                    )}
                    {s.mock === "claude-instructions" && (
                      <div className="mt-6">
                        <ClaudeInstructionsMock />
                      </div>
                    )}
                    {s.mock === "claude-files" && (
                      <div className="mt-6">
                        <ClaudeFilesMock />
                      </div>
                    )}
                    {s.mock === "ascii-screen" && (
                      <div className="mt-6">
                        <AsciiScreenMock />
                      </div>
                    )}

                    {/* takeaway — callout ส้ม: ข้อสรุปที่ควรสะดุดตาที่สุดของขั้นนี้ */}
                    {s.takeaway && (
                      <div className="mt-6 rounded-r-xl border-l-[3px] border-amber-500 bg-amber-400/[0.12] px-[clamp(18px,2.4vw,26px)] py-[clamp(16px,2vw,22px)]">
                        <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.62] text-foreground">
                          {s.takeaway}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ))}

      {/* closing — ย่อหน้าปิดท้าย (ใส่หรือไม่ใส่ก็ได้ใน data) */}
      {claude.closing && (
        <p className="mt-12 text-[17px] leading-[1.8] text-foreground">
          {claude.closing}
        </p>
      )}

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
          <div
            className="flex-1 overflow-y-auto px-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={lightbox.src}
                alt={`${title} — ${lightbox.caption}`}
                width={lightbox.w}
                height={lightbox.h}
                sizes="100vw"
                quality={92}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
