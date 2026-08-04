// ProjectNav — ปุ่ม "Previous / Next" ท้ายหน้า case study
// ตัวหนังสือใหญ่ = คำว่า Previous/Next เฉย ๆ (ไม่ใช่ชื่อโปรเจกต์) ตามที่ user สั่ง
// ชื่อปลายทางยังอยู่ใน aria-label เพื่อให้ screen reader รู้ว่าจะไปไหน
// ลำดับอิงเมนู sidebar (data/nav.ts ผ่าน getProjectNav) → เดินเรื่องตรงกับที่ user เห็นในเมนู
// ใช้ร่วมกันทุกหน้างาน: case study เต็ม, placeholder, Propertyhub App, Early Work

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectNav } from "@/data/projects";

export function ProjectNav({ slug }: { slug: string }) {
  const { prev, next } = getProjectNav(slug);
  if (!prev && !next) return null;

  // ระยะห่างจาก section สุดท้ายถึงแถบ prev/next — cap ที่ 50px (เดิม 90px ว่างเกินไป)
  return (
    <div className="mt-[clamp(40px,6vw,50px)] flex flex-col items-stretch gap-6 border-t border-border pt-8 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
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
  );
}
