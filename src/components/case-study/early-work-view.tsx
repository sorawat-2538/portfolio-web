// EarlyWorkView — หน้า /work/early-work : คลังงานเก่า 2018–2020 จาก portfolio เล่มเดิม
// โครงเดียวกับหน้า project จริง (badge + title + avatar + Overview + Tools) แต่ส่วน
// ผลงาน = gallery สไลด์แบ่ง 4 หมวด (App / Web / Design System / Graphic) กดดูเต็มได้

import * as React from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { earlyWork } from "@/data/early-work";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { ArchiveWindow } from "./archive-window";
import { ArchiveGallery, SlideGrid } from "./slide-gallery";
import { ProjectNav } from "./project-nav";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

function ToolCard({ name }: { name: string }) {
  const meta = toolMeta(name);
  return (
    <div className="flex min-h-[70px] items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
      {"icon" in meta ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={meta.icon} alt={name} width={30} height={30} className="block h-[30px] w-[30px] shrink-0 object-contain" />
      ) : (
        <span
          className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg text-[13px] font-bold"
          style={{ background: meta.bg, color: meta.fg }}
        >
          {meta.mono}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-[15px] text-foreground">{name}</span>
    </div>
  );
}

export function EarlyWorkView() {
  return (
    <article className="pt-5 pb-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        <StatusBadge status="archived" />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {earlyWork.title} {earlyWork.years}
        </h1>

        <div className="mt-5 flex items-center gap-3">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-hover">
            <Image
              src={profile.hero.avatar}
              alt={profile.name}
              fill
              sizes="40px"
              className="object-cover object-top [image-rendering:pixelated]"
            />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="text-[15px] font-semibold text-foreground">{profile.fullName}</div>
            <div className="mt-0.5 text-[13px] text-muted-foreground">{profile.headline}</div>
          </div>
        </div>

        <div className="mt-5 border-t border-border" />

        {/* ── HERO — หน้าต่าง "คลังงานเก่า" (สไตล์เดียวกับ terminal ของหน้า
            Data & AI Workflow) · รูปเด่น 3 ชิ้นอยู่ในพาเนล output ── */}
        <div className="mt-8 min-[900px]:mt-[50px]">
          <ArchiveWindow />
        </div>
      </section>

      <div className="h-8 min-[900px]:h-[50px]" />

      {/* ── OVERVIEW ── */}
      <section>
        <H2>Overview</H2>
        <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
          {earlyWork.overview}
        </p>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── TOOLS ── */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          {earlyWork.tools.map((t) => (
            <ToolCard key={t} name={t} />
          ))}
        </div>
      </section>

      {/* ── WORKS — gallery แบ่งหมวด (แต่ sheet ตัวเดียว นำทางต่อเนื่องข้ามหมวด) ── */}
      <ArchiveGallery items={earlyWork.groups.flatMap((g) => g.items)}>
        {(() => {
          let offset = 0;
          return earlyWork.groups.map((g) => {
            const groupOffset = offset;
            offset += g.items.length;
            return (
              <React.Fragment key={g.title}>
                <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
                <section>
                  <H2>{g.title}</H2>
                  <div className="mt-[26px]">
                    <SlideGrid items={g.items} offset={groupOffset} />
                  </div>
                </section>
              </React.Fragment>
            );
          });
        })()}
      </ArchiveGallery>

      {/* ── footer nav (prev / next) — ลำดับอิงเมนู sidebar ── */}
      <ProjectNav slug="early-work" />
    </article>
  );
}
