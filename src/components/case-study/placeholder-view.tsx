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
import { AppScreensShowcase } from "./app-screens-showcase";
import { WebScreensPanel } from "./web-screens-panel";

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
          // hero — จอมือถือเรียงเป็นแถว (เหมือน Propertyhub App เป๊ะ: flex-wrap, ไม่มี caption)
          <div className="mt-[50px] flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
            {p.screens.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.label ? `${p.title} — ${s.label}` : p.title}
                width={s.w}
                height={s.h}
                sizes="(max-width: 640px) 45vw, 240px"
                className="block h-auto w-[45%] max-w-[240px] drop-shadow-[0_24px_48px_-24px_rgba(30,50,90,0.45)]"
                priority={i < 3}
              />
            ))}
          </div>
        ) : p.demoUrl ? (
          <div className="mt-[50px]">
            <DemoFrame url={p.demoUrl} title={p.title} cover={p.demoCover} />
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

      {/* ── SCREENS — จอแอปแยกตาม section (แบบ Propertyhub App) ── */}
      {p.appScreens && p.appScreens.length > 0 && (
        <>
          <div className="my-[50px] h-px bg-border" />
          <section>
            <H2>Screens</H2>
            <div className="mt-8 flex flex-col gap-6">
              {p.appScreens.map((s) => (
                <AppScreensShowcase key={s.title} title={s.title} screens={s.screens} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── STYLE GUIDE — บอร์ด Color/Font/Icon (รูปเต็มความกว้างเรียงลงมา · treatment เดียวกับ Propertyhub) ── */}
      {p.styleGuide && p.styleGuide.length > 0 && (
        <>
          <div className="my-[50px] h-px bg-border" />
          <section>
            <H2>Style Guide</H2>
            <div className="mt-7 space-y-10">
              {p.styleGuide.map((b) =>
                b.src ? (
                  <Image
                    key={b.label}
                    src={b.src}
                    alt={`${p.title} style guide — ${b.label}`}
                    width={b.w ?? 4320}
                    height={b.h ?? 4320}
                    sizes="(max-width: 900px) 100vw, 860px"
                    quality={88}
                    className="block h-auto w-full shadow-[0_22px_60px_-28px_rgba(30,50,90,0.4)]"
                  />
                ) : (
                  <EmptyState key={b.label} icon={ImageIcon} text={`${b.label} — รูปกำลังจะมา เร็ว ๆ นี้`} />
                ),
              )}
            </div>
          </section>
        </>
      )}

      {/* ── SCREENS — หน้าเว็บแยกตาม category (พื้นเทา + header + จอเรียง scroll แนวนอน · แบบ App) ── */}
      {p.webScreens && p.webScreens.length > 0 && (
        <>
          <div className="my-[50px] h-px bg-border" />
          <section>
            <H2>Screens</H2>
            <div className="mt-8 flex flex-col gap-6">
              {p.webScreens.map((c) => (
                <WebScreensPanel key={c.category} title={c.category} screens={c.screens} />
              ))}
            </div>
          </section>
        </>
      )}
    </article>
  );
}


/** DemoFrame — รูปปกเดโมในกรอบ browser · กดแล้วเปิดเดโมเต็มในแท็บใหม่ (ไม่ฝัง iframe) */
function DemoFrame({ url, title, cover }: { url: string; title: string; cover?: string }) {
  return (
    <figure>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-[14px] border border-border bg-card shadow-[0_22px_60px_-28px_rgba(30,50,90,0.4)] outline-none transition-shadow duration-200 hover:shadow-[0_30px_72px_-30px_rgba(30,50,90,0.5)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-hover/60 px-4 py-2.5">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 hidden flex-1 truncate rounded-md bg-background px-3 py-1 text-center text-[12px] text-muted-foreground sm:block">
            {title} — live preview
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-brand">
            <ExternalLink className="h-3.5 w-3.5" /> เปิดเต็มจอ
          </span>
        </div>

        {cover ? (
          <div className="relative">
            <Image
              src={cover}
              alt={`${title} — เดโม`}
              width={2000}
              height={1250}
              sizes="(max-width: 900px) 100vw, 860px"
              className="block h-auto w-full"
            />
            {/* hover overlay — บอกว่ากดแล้วเปิดแท็บใหม่ */}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-200 group-hover:bg-foreground/10 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-[14px] font-medium text-foreground shadow-lg">
                <ExternalLink className="h-4 w-4" /> เปิดเดโมในแท็บใหม่
              </span>
            </span>
          </div>
        ) : (
          <div className="flex h-[clamp(260px,38vw,400px)] items-center justify-center bg-hover/40">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white">
              <ExternalLink className="h-4 w-4" /> เปิดเดโม {title}
            </span>
          </div>
        )}
      </a>
      <figcaption className="mt-4 text-center text-[13px] text-muted-foreground">
        กดที่ภาพเพื่อเปิดเดโมเต็มในแท็บใหม่
      </figcaption>
    </figure>
  );
}
