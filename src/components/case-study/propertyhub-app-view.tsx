// PropertyhubAppView — case study เต็มของ "Propertyhub App"
// โครง: Header (+ปุ่มดาวน์โหลดแอป) → Overview → Tools → Design Thinking
// → Design System (Color/Typography/Icon) → Screens (แยกตาม tab menu ในแอป)
// เนื้อหา Overview / Design Thinking เป็น draft — แก้ข้อความได้ที่ไฟล์นี้ตรง ๆ

import Image from "next/image";
import {
  Bell,
  ExternalLink,
  Home,
  LayoutGrid,
  LayoutList,
  Menu,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import type { PlaceholderProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { AppScreensShowcase } from "./app-screens-showcase";

const APP_STORE_URL = "https://apps.apple.com/th/app/propertyhub/id1574599780?l=th";
const TOOLS = ["Figma", "Claude"];

// ── content ──────────────────────────────────────────────────────────────────
const OVERVIEW = [
  "Propertyhub App คือแอปพลิเคชันมือถือของ Propertyhub ที่ยกประสบการณ์การหาบ้าน/คอนโดทั้งเช่าและขายมาไว้บนมือถือ — ผู้ใช้ค้นหาตามทำเล/รถไฟฟ้า เปิดดูรายละเอียดประกาศและโครงการ บันทึกประกาศที่สนใจ และแชทกับเอเจนต์ได้โดยตรง ส่วนเอเจนต์ก็จัดการประกาศของตัวเองได้ครบในแอปเดียว",
];

const DESIGN_THINKING: { label: string; body: string }[] = [
  { label: "Empathize", body: "เข้าใจผู้ใช้ 2 กลุ่ม — ผู้เช่า/ผู้ซื้อ ที่อยากหาทรัพย์ให้เร็ว และเอเจนต์ที่อยากจัดการประกาศสะดวก" },
  { label: "Define", body: "สรุปโจทย์ให้ค้นหา–ดู–ติดต่อ จบได้ในมือถือ และให้เอเจนต์คุมประกาศของตัวเองได้ครบ" },
  { label: "Ideate", body: "ออกแบบ flow และ information architecture ของแต่ละ tab ให้เข้าถึงสิ่งที่ต้องการได้เร็ว" },
  { label: "Prototype", body: "ลงมือทำ UI ต่อยอดจาก design system ให้ทุกหน้าจอสอดคล้องกัน" },
  { label: "Test", body: "ทดสอบการใช้งานจริง เก็บ feedback แล้ววนปรับให้ลื่นขึ้น" },
];

const DESIGN_SYSTEM: { label: string; src: string; w: number; h: number }[] = [
  { label: "Color", src: "/uploads/propertyhub-app-ds-color.jpg", w: 4320, h: 4200 },
  { label: "Typography", src: "/uploads/propertyhub-app-ds-typography.jpg", w: 4320, h: 5700 },
  { label: "Icon", src: "/uploads/propertyhub-app-ds-icon-v2.jpg", w: 4320, h: 7818 },
];

type Shot = { src: string; label: string };
const S = (src: string, label: string): Shot => ({ src: `/uploads/${src}`, label });

const TABS: { tab: string; en: string; icon: LucideIcon; screens: Shot[] }[] = [
  {
    tab: "หน้าหลัก",
    en: "HOME",
    icon: Home,
    screens: [
      S("propertyhub-app-home.png", "หน้าแรก"),
      S("propertyhub-app-detail.png", "รายละเอียดประกาศ"),
      S("propertyhub-app-project.png", "รายละเอียดโครงการ"),
      S("propertyhub-app-agent.png", "โปรไฟล์เอเจนต์"),
    ],
  },
  { tab: "ประกาศ", en: "LISTINGS", icon: LayoutList, screens: [S("propertyhub-app-listings.png", "รายการประกาศ")] },
  {
    tab: "กิจกรรม",
    en: "ACTIVITY",
    icon: LayoutGrid,
    screens: [
      S("propertyhub-app-activity.png", "ประกาศที่สนใจ"),
      S("propertyhub-app-activity-savesearch.png", "บันทึกการค้นหา"),
      S("propertyhub-app-activity-viewed.png", "เคยเข้าชม"),
    ],
  },
  { tab: "ข้อความ", en: "MESSAGES", icon: MessageSquareText, screens: [S("propertyhub-app-messages.png", "ข้อความ")] },
  { tab: "แจ้งเตือน", en: "NOTIFICATIONS", icon: Bell, screens: [S("propertyhub-app-notification.png", "การแจ้งเตือน")] },
  { tab: "เมนู", en: "MENU", icon: Menu, screens: [S("propertyhub-app-menu.png", "เมนู")] },
];

// ── shared bits ──────────────────────────────────────────────────────────────
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[17px] leading-[1.8] text-muted-foreground">{children}</p>;
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

/** phone mockup (มีกรอบเครื่องในตัว) — ไม่มี label badge ใต้รูป */
function PhoneShot({
  src,
  label,
  priority,
  className = "w-full",
}: {
  src: string;
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={label ?? "Propertyhub App"}
      width={660}
      height={1320}
      sizes="(max-width: 640px) 46vw, 220px"
      className={"block h-auto w-full drop-shadow-[0_24px_48px_-24px_rgba(30,50,90,0.45)] " + className}
      priority={priority}
    />
  );
}

// ── page ─────────────────────────────────────────────────────────────────────
export function PropertyhubAppView({ project: p }: { project: PlaceholderProject }) {
  return (
    <article className="py-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-hover">
              <Image src={profile.hero.avatar} alt={profile.name} fill sizes="40px" className="object-cover object-top [image-rendering:pixelated]" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[15px] font-semibold text-foreground">{profile.fullName}</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">{profile.headline}</div>
            </div>
          </div>

          {/* primary action — ดาวน์โหลดแอป */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <ExternalLink className="h-4 w-4" />
            ลองโหลดดูสิ
          </a>
        </div>

        <div className="mt-6 border-t border-border" />

        {/* hero — splash → onboarding → home */}
        <div className="mt-[50px] flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
          <PhoneShot src="/uploads/propertyhub-app-splash.png" label="Splash screen" priority className="w-[45%] max-w-[240px]" />
          <PhoneShot src="/uploads/propertyhub-app-onboarding.png" label="Onboarding" priority className="w-[45%] max-w-[240px]" />
          <PhoneShot src="/uploads/propertyhub-app-home.png" label="หน้าแรก" className="w-[45%] max-w-[240px]" />
        </div>
      </section>

      <div className="h-[50px]" />

      {/* ── OVERVIEW ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {OVERVIEW.map((para, i) => (
            <Body key={i}>{para}</Body>
          ))}
        </div>
      </section>

      <div className="my-[50px] h-px bg-border" />

      {/* ── TOOLS ── (กว้างเท่า layout 4 กล่อง → grid 4 คอลัมน์) */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          {TOOLS.map((t) => (
            <ToolCard key={t} name={t} />
          ))}
        </div>
      </section>

      <div className="my-[50px] h-px bg-border" />

      {/* ── DESIGN THINKING ── */}
      <section>
        <H2>Design Thinking</H2>
        <p className="mt-[18px] max-w-[70ch] text-[17px] leading-[1.8] text-muted-foreground">
          กระบวนการออกแบบที่ผมใช้ตั้งต้นจากผู้ใช้จริง แล้วไล่ตั้งแต่เข้าใจปัญหา ไปจนถึงทดสอบและปรับ
        </p>
        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DESIGN_THINKING.map((s, i) => (
            <li key={s.label} className="rounded-xl border border-border bg-card p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-[13px] font-bold tabular-nums text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-3 text-[15px] font-semibold text-foreground">{s.label}</div>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="my-[50px] h-px bg-border" />

      {/* ── STYLE GUIDE ── วางคู่: แบบเดิม (รูปเต็ม) + แบบใหม่ (viewer) เพื่อเทียบ */}
      <section>
        <H2>Style Guide</H2>
        <div className="mt-7 space-y-10">
          {DESIGN_SYSTEM.map((b) => (
            <figure key={b.label}>
              <Image
                src={b.src}
                alt={`Propertyhub App style guide — ${b.label}`}
                width={b.w}
                height={b.h}
                sizes="(max-width: 900px) 100vw, 860px"
                quality={88}
                className="block h-auto w-full shadow-[0_22px_60px_-28px_rgba(30,50,90,0.4)]"
              />
            </figure>
          ))}
        </div>
      </section>

      <div className="my-[50px] h-px bg-border" />

      {/* ── SCREENS ── แต่ละ tab = พื้นเทา + จอ + ปุ่มเลื่อนเมื่อ >4 */}
      <section>
        <H2>Screens</H2>
        <div className="mt-8 flex flex-col gap-6">
          {TABS.map((t) => (
            <AppScreensShowcase key={t.tab} title={t.en} screens={t.screens} />
          ))}
        </div>
      </section>
    </article>
  );
}
