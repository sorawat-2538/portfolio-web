// PlaceholderView — หน้า /work/<slug> ของงานที่ยังไม่มี case study เต็ม
// ใช้ "โครงเดียวกับหน้า project จริง" ทุกอย่าง (header + badge + avatar + section
// Overview/Tools ตำแหน่งเดิม) แต่ส่วนที่ยังไม่มีเนื้อหา = empty state
// พอมีข้อมูลจริง ให้ย้าย entry ไปที่ `projects` ใน projects.ts → จะได้หน้าเต็มทันที

import Image from "next/image";
import { Clock, ExternalLink, FileText, Hammer, ImageIcon, Rocket, type LucideIcon } from "lucide-react";
import type { PlaceholderProject, ProjectStatus } from "@/data/projects";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { ScreenGallery } from "./screen-gallery";
import { ScreensStack, ScreensViewer } from "./screen-showcase-variants";

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
  archived: {
    icon: FileText,
    text: "งานเก่าที่เก็บเข้าคลัง — ดูผลงานได้ในหน้า Early Work",
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
  const hasPresent = Boolean(p.heroWeb && p.heroPhone);

  return (
    <article className="py-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER — เหมือนหน้า project จริงทุกอย่าง ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

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

          {/* primary action — เปิดเว็บ / ดาวน์โหลดแอป (ถ้ามีลิงก์) */}
          {(p.liveUrl || p.appStoreUrl) && (
            <div className="flex shrink-0 flex-wrap gap-2.5">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Rocket className="h-4 w-4" />
                  เปิดดูเว็บไซต์
                </a>
              )}
              {p.appStoreUrl && (
                <a
                  href={p.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  ลองโหลดดูสิ
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-border" />

        {/* hero — laptop+phone present > phone screens > empty state */}
        {hasPresent ? (
          <div className="mt-[50px]">
            <div className="relative mx-auto max-w-[860px] pr-[2%]">
              <Image
                src={p.heroWeb!}
                alt={`${p.title} — เว็บไซต์ (laptop mockup)`}
                width={2174}
                height={1318}
                sizes="(max-width: 900px) 100vw, 860px"
                className="block h-auto w-full"
                priority
              />
              {/* phone overlapping bottom-right — เว็บ + แอป คู่กัน */}
              <Image
                src={p.heroPhone!}
                alt={`${p.title} — แอปมือถือ`}
                width={660}
                height={1320}
                sizes="150px"
                className="absolute bottom-0 right-0 w-[16%] min-w-[150px] max-w-[200px] drop-shadow-[0_22px_44px_-16px_rgba(15,25,45,0.5)]"
              />
            </div>
          </div>
        ) : p.screens && p.screens.length > 0 ? (
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

      {/* ── OVERVIEW — เนื้อหาจริง (ถ้ามี) หรือ empty state ── */}
      <section>
        <H2>Overview</H2>
        {p.overview && p.overview.length > 0 ? (
          <div className="mt-[22px] space-y-[18px]">
            {p.overview.map((para, i) => (
              <p key={i} className="text-[17px] leading-[1.8] text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        ) : (
          <div className="mt-[22px]">
            <EmptyState icon={ImageIcon} text="ยังไม่มีเนื้อหา overview สำหรับโปรเจกต์นี้ — จะเพิ่มเมื่อ case study พร้อม" />
          </div>
        )}
      </section>

      <div className="my-[50px] h-px bg-border" />

      {/* ── TOOLS — การ์ดเครื่องมือ (ถ้ามี) หรือ empty state ── */}
      <section>
        <H2>Tools</H2>
        {p.tools && p.tools.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
            {p.tools.map((t) => (
              <ToolCard key={t} name={t} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState icon={ImageIcon} text="ยังไม่ได้ระบุเครื่องมือที่ใช้ในโปรเจกต์นี้" />
          </div>
        )}
      </section>

      {/* ── SCREENS — 3 ตัวอย่างการวาง (ให้เลือกแบบที่ชอบ) ── */}
      {p.works && p.works.length > 0 && (
        <>
          <div className="my-[50px] h-px bg-border" />
          <section>
            <H2>Screens</H2>
            <p className="mt-[18px] max-w-[70ch] text-[17px] leading-[1.8] text-muted-foreground">
              3 ตัวอย่างการวางหน้าจอ — ลองเทียบแล้วเลือกแบบที่ชอบ เดี๋ยวเก็บให้เหลือแบบเดียว
            </p>

            {/* ตัวอย่าง 1 — browser-frame gallery + คลิกดูเต็มจอ */}
            <ExampleLabel n={1} caption="Browser-frame gallery — คลิกเปิดดูเต็มหน้า (lightbox)" />
            <ScreenGallery screens={p.works} title={p.title} cols={2} />

            {/* ตัวอย่าง 2 — รูปเต็ม crop + กดดูทั้งหมด (ทีละหน้า) */}
            <ExampleLabel n={2} caption="รูปเต็มความกว้าง (crop) — กด “ดูทั้งหมด” ขยายในหน้า" />
            <ScreensStack screens={p.works} title={p.title} />

            {/* ตัวอย่าง 3 — thumbnail เลือกหน้า + กดดูทั้งหมด */}
            <ExampleLabel n={3} caption="Thumbnail เลือกหน้า — กด “ดูทั้งหมด” ขยายในกรอบ" />
            <ScreensViewer screens={p.works} title={p.title} />
          </section>
        </>
      )}
    </article>
  );
}

/** ป้ายกำกับตัวอย่างแต่ละแบบ (ใช้เฉพาะช่วงเลือกดีไซน์) */
function ExampleLabel({ n, caption }: { n: number; caption: string }) {
  return (
    <div className="mb-5 mt-12 flex flex-wrap items-center gap-2.5">
      <span className="inline-flex h-7 items-center rounded-full bg-foreground px-3 text-[12px] font-semibold tracking-[0.04em] text-background">
        ตัวอย่าง {n}
      </span>
      <span className="text-[14px] text-muted-foreground">{caption}</span>
    </div>
  );
}
