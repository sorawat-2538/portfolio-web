// ProjectNav — ปุ่มไปงานถัดไป / ก่อนหน้า ท้ายหน้า case study
// ⚠️ มือถือ (<900px) = ปุ่ม outline ดำ ตัวหนังสือดำ "Next project" อย่างเดียว ไม่มี previous (user สั่ง)
//    desktop (≥900px) = Previous / Next ตัวหนังสือใหญ่ + วงกลมลูกศร แบบเดิม
// ชื่อปลายทางอยู่ใน aria-label เพื่อให้ screen reader รู้ว่าจะไปไหน
// ลำดับอิงเมนู sidebar (data/nav.ts ผ่าน getProjectNav) → เดินเรื่องตรงกับที่ user เห็นในเมนู
// ใช้ร่วมกันทุกหน้างาน: case study เต็ม, placeholder, Propertyhub App, Early Work

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectNav } from "@/data/projects";

export function ProjectNav({ slug }: { slug: string }) {
  const { prev, next } = getProjectNav(slug);
  if (!prev && !next) return null;

  // งานสุดท้ายไม่มี next → มือถือไม่ต้องโชว์แถบนี้เลย (ไม่งั้นเหลือเส้นคั่นกับที่ว่าง)
  const wrap =
    "mt-8 border-t border-border pt-6 min-[900px]:mt-[50px] min-[900px]:pt-8" +
    (next ? "" : " hidden min-[900px]:block");

  return (
    <div className={wrap}>
      {/* ── มือถือ — ปุ่มเดียว outline ดำ ── */}
      {next && (
        <Link
          href={`/work/${next.slug}`}
          aria-label={`งานถัดไป: ${next.title}`}
          className="flex w-full items-center justify-center gap-2.5 border-[1.5px] border-foreground px-5 py-4 text-[16px] font-semibold text-foreground transition-colors hover:bg-hover min-[900px]:hidden"
        >
          Next project
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </Link>
      )}

      {/* ── desktop — Previous / Next แบบเดิม ── */}
      <div className="hidden flex-row items-center justify-between gap-4 min-[900px]:flex">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            aria-label={`งานก่อนหน้า: ${prev.title}`}
            className="group inline-flex items-center gap-[22px] text-left"
          >
            <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground">
              <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={1.8} />
            </span>
            <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
              Previous
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            aria-label={`งานถัดไป: ${next.title}`}
            className="group inline-flex items-center justify-end gap-[22px] text-right"
          >
            <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
              Next
            </span>
            <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground">
              <ArrowRight className="h-[22px] w-[22px]" strokeWidth={1.8} />
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
