// PlaceholderView — หน้า /work/<slug> ของงานที่ยังไม่มี case study เต็ม
// ใช้ "โครงเดียวกับหน้า project จริง" ทุกอย่าง (header + badge + avatar + section
// Overview/Tools ตำแหน่งเดิม) แต่ส่วนที่ยังไม่มีเนื้อหา = empty state
// พอมีข้อมูลจริง ให้ย้าย entry ไปที่ `projects` ใน projects.ts → จะได้หน้าเต็มทันที

import Image from "next/image";
import { Clock, FileText, Hammer, ImageIcon, Wrench, type LucideIcon } from "lucide-react";
import type { PlaceholderProject, ProjectStatus } from "@/data/projects";
import { profile } from "@/data/profile";
import { StatusBadge } from "./status-badge";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

/** ข้อความ empty state ตามสถานะ (ใช้ในกล่อง hero) */
const NOTE: Record<ProjectStatus, { icon: LucideIcon; text: string }> = {
  available: {
    icon: FileText,
    text: "โปรเจกต์นี้เผยแพร่จริงแล้ว — กำลังเรียบเรียง case study ฉบับเต็ม เนื้อหาจะตามมาเร็ว ๆ นี้",
  },
  process: {
    icon: Hammer,
    text: "โปรเจกต์นี้กำลังพัฒนาอยู่ — จะอัปเดต case study พร้อมรายละเอียดกระบวนการเมื่อพร้อม",
  },
  coming: {
    icon: Clock,
    text: "โปรเจกต์นี้ยังไม่เปิดให้ชม — เร็ว ๆ นี้จะมี case study มาให้ดูแบบเต็ม ๆ",
  },
};

/** empty state box กลาง ๆ สำหรับ section ที่ยังไม่มีเนื้อหา */
function EmptyState({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-hover/40 px-6 py-12 text-center">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-hover text-faint">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <p className="max-w-[46ch] text-[15px] leading-[1.7] text-muted-foreground">{text}</p>
    </div>
  );
}

export function PlaceholderView({ project: p }: { project: PlaceholderProject }) {
  const note = NOTE[p.status];
  const HeroIcon = note.icon;

  return (
    <article className="py-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER — เหมือนหน้า project จริงทุกอย่าง ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>
        <p className="mt-3 text-[16px] leading-[1.7] text-muted-foreground">
          {p.tagline}
        </p>

        {/* identity bar — avatar + name + role (ตำแหน่งเดียวกับหน้าจริง) */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
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
              <div className="text-[15px] font-semibold text-foreground">
                {profile.fullName}
              </div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">
                {profile.headline}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border" />

        {/* hero — ถ้ามีภาพผลงานแล้ว โชว์ mockup, ถ้ายังไม่มี = empty state */}
        {p.screens && p.screens.length > 0 ? (
          <div className="mt-[50px]">
            <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-10">
              {p.screens.map((s) => (
                <figure key={s.src} className="flex w-full flex-col items-center">
                  <Image
                    src={s.src}
                    alt={s.label ? `${p.title} — ${s.label}` : p.title}
                    width={s.w}
                    height={s.h}
                    sizes="(max-width: 640px) 78vw, 320px"
                    className="block h-auto w-full max-w-[300px] drop-shadow-[0_24px_48px_-24px_rgba(30,50,90,0.45)]"
                    priority
                  />
                  {s.label && (
                    <figcaption className="mt-5 text-[13px] font-medium tracking-[0.01em] text-muted-foreground">
                      {s.label}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-[50px]">
            <div className="flex min-h-[clamp(280px,40vw,380px)] flex-col items-center justify-center gap-4 rounded-[14px] border border-dashed border-border bg-hover/40 px-6 py-14 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-hover text-faint">
                <HeroIcon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <p className="max-w-[48ch] text-[16px] leading-[1.75] text-muted-foreground">
                {note.text}
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="h-[50px]" />

      {/* ── OVERVIEW — empty state ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px]">
          <EmptyState icon={ImageIcon} text="ยังไม่มีเนื้อหา overview สำหรับโปรเจกต์นี้ — จะเพิ่มเมื่อ case study พร้อม" />
        </div>
      </section>

      <div className="my-[50px] h-px bg-border" />

      {/* ── TOOLS — empty state ── */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5">
          <EmptyState icon={Wrench} text="ยังไม่ได้ระบุเครื่องมือที่ใช้ในโปรเจกต์นี้" />
        </div>
      </section>
    </article>
  );
}
