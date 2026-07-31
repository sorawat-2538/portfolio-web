// ProjectNav — ปุ่ม "งานก่อนหน้า / งานถัดไป" ท้ายหน้า case study
// ลำดับอิงเมนู sidebar (data/nav.ts ผ่าน getProjectNav) → เดินเรื่องตรงกับที่ user เห็นในเมนู
// ใช้ร่วมกันทุกหน้างาน: case study เต็ม, placeholder, Propertyhub App, Early Work

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectNav } from "@/data/projects";

export function ProjectNav({ slug }: { slug: string }) {
  const { prev, next } = getProjectNav(slug);
  if (!prev && !next) return null;

  return (
    <div className="mt-[clamp(56px,8vw,90px)] flex flex-col items-stretch gap-6 border-t border-border pt-8 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group inline-flex items-center gap-[22px] text-left"
        >
          <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground">
            <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </span>
          <span className="flex flex-col items-start gap-1 leading-none">
            <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
              {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group inline-flex items-center justify-end gap-[22px] text-right"
        >
          <span className="flex flex-col items-end gap-1 leading-none">
            <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
              {next.title}
            </span>
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
