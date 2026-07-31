// PropertyhubAppView — case study เต็มของ "Propertyhub App"
// โครง: Header (+ปุ่มดาวน์โหลดแอป) → Overview → Tools → Design Thinking
// → Design System (Color/Typography/Icon) → Screens (แยกตามเมนูแอป 6 เมนู + Detail:
//   Home / Detail / Listings / Activity / Messages / Notifications / Menu)
// เนื้อหา Overview / Design Thinking เป็น draft — แก้ข้อความได้ที่ไฟล์นี้ตรง ๆ

import Image from "next/image";
import {
  Bell,
  ExternalLink,
  FileText,
  Home,
  LayoutGrid,
  LayoutList,
  Menu,
  MessageSquareText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { PlaceholderProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { AppScreensShowcase } from "./app-screens-showcase";
import { ProjectNav } from "./project-nav";

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
    // 5 จอ onboarding — step 1–4 + step 5 (propertyhub-app-onboarding.png เดิม = จอ "มาเริ่มกันเลย")
    tab: "เริ่มต้นใช้งาน",
    en: "Onboarding",
    icon: Sparkles,
    screens: [
      S("propertyhub-app-onboarding-1.png", "สวัสดี"),
      S("propertyhub-app-onboarding-2.png", "ค้นหาด้วยแผนที่"),
      S("propertyhub-app-onboarding-3.png", "ค้นหาแบบพื้นที่"),
      S("propertyhub-app-onboarding-4.png", "สัญลักษณ์ยืนยันตัวตน"),
      S("propertyhub-app-onboarding.png", "มาเริ่มกันเลย"),
    ],
  },
  {
    tab: "หน้าหลัก",
    en: "Home",
    icon: Home,
    screens: [
      S("propertyhub-app-home.png", "หน้าแรก"),
      S("propertyhub-app-home-2.png", "ประกาศที่ดูล่าสุด · โครงการยอดนิยม"),
      S("propertyhub-app-home-3.png", "โครงการใหม่ · ผู้พัฒนาแนะนำ"),
      S("propertyhub-app-home-4.png", "ทรัพย์ธนาคาร · ประกาศเช่าล่าสุด"),
      S("propertyhub-app-province.png", "ค้นหาตามจังหวัด"),
    ],
  },
  {
    tab: "รายละเอียด",
    en: "Detail",
    icon: FileText,
    screens: [
      S("propertyhub-app-detail.png", "รายละเอียดประกาศ"),
      S("propertyhub-app-search-results.png", "ผลการค้นหา"),
      S("propertyhub-app-search-map.png", "มุมมองแผนที่"),
      S("propertyhub-app-detail-contact.png", "ติดต่อเจ้าของประกาศ"),
      S("propertyhub-app-project.png", "รายละเอียดโครงการ"),
      S("propertyhub-app-new-projects.png", "รวมโครงการใหม่"),
      S("propertyhub-app-developers.png", "ผู้พัฒนาอสังหาฯ"),
      S("propertyhub-app-developer-detail.png", "รายละเอียดผู้พัฒนา"),
      S("propertyhub-app-agent.png", "โปรไฟล์เอเจนต์"),
      S("propertyhub-app-assetbank.png", "ทรัพย์ธนาคาร (Asset Bank)"),
      S("propertyhub-app-assetbank-kbank.png", "ทรัพย์ธนาคารกสิกร (KBANK)"),
    ],
  },
  {
    tab: "ประกาศ",
    en: "Listings",
    icon: LayoutList,
    screens: [
      S("propertyhub-app-listings.png", "รายการประกาศ"),
      S("propertyhub-app-listings-rejected.png", "ประกาศไม่ผ่านการตรวจสอบ"),
      S("propertyhub-app-listings-bulk.png", "เลือกหลายประกาศ"),
      S("propertyhub-app-listings-tags.png", "จัดการแท็ก"),
      S("propertyhub-app-package.png", "รายละเอียดแพ็กเกจ"),
      S("propertyhub-app-post-step1.png", "ลงประกาศ · ข้อมูลทั่วไป"),
      S("propertyhub-app-post-step4.png", "ลงประกาศ · จัดการรูปภาพ"),
    ],
  },
  {
    tab: "กิจกรรม",
    en: "Activity",
    icon: LayoutGrid,
    screens: [
      S("propertyhub-app-activity.png", "ประกาศที่สนใจ"),
      S("propertyhub-app-activity-savesearch.png", "บันทึกการค้นหา"),
      S("propertyhub-app-save-search.png", "บันทึกการค้นหาใหม่"),
      S("propertyhub-app-activity-viewed.png", "เคยเข้าชม"),
    ],
  },
  {
    tab: "ข้อความ",
    en: "Messages",
    icon: MessageSquareText,
    screens: [
      S("propertyhub-app-messages.png", "ข้อความ"),
      S("propertyhub-app-messages-chat.png", "แชทกับเอเจนต์"),
      S("propertyhub-app-messages-photos.png", "ส่งรูปในแชท"),
    ],
  },
  { tab: "แจ้งเตือน", en: "Notifications", icon: Bell, screens: [S("propertyhub-app-notification.png", "การแจ้งเตือน")] },
  {
    tab: "เมนู",
    en: "Menu",
    icon: Menu,
    screens: [
      S("propertyhub-app-menu.png", "เมนู"),
      S("propertyhub-app-menu-register.png", "สมัครสมาชิก"),
      S("propertyhub-app-menu-signin.png", "เข้าสู่ระบบ"),
      S("propertyhub-app-menu-editprofile.png", "แก้ไขข้อมูลส่วนตัว"),
    ],
  },
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
    <article className="pt-5 pb-12 font-sans font-normal min-[900px]:py-[50px]">
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

          {/* primary action — ดาวน์โหลดแอป (full-width บนมือถือ / auto บน desktop) */}
          <div className="flex w-full shrink-0 flex-wrap gap-2.5 sm:w-auto">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
            >
              <ExternalLink className="h-4 w-4" />
              App Store
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-border" />

        {/* hero — splash → onboarding → home · มือถือ = rail เลื่อนซ้ายขวา (bleed ผ่าน padding) · desktop = จัดกลาง */}
        <div className="mt-8 min-[900px]:mt-[50px]">
          <div className="-mx-5 flex snap-x items-start gap-5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scroll-padding-inline:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 min-[900px]:mx-0 min-[900px]:flex-wrap min-[900px]:justify-center min-[900px]:gap-x-6 min-[900px]:gap-y-8 min-[900px]:overflow-visible min-[900px]:px-0">
            <div className="w-[58%] max-w-[240px] shrink-0 snap-start min-[900px]:w-[45%]">
              <PhoneShot src="/uploads/propertyhub-app-splash.png" label="Splash screen" priority />
            </div>
            <div className="w-[58%] max-w-[240px] shrink-0 snap-start min-[900px]:w-[45%]">
              <PhoneShot src="/uploads/propertyhub-app-onboarding.png" label="Onboarding" priority />
            </div>
            <div className="w-[58%] max-w-[240px] shrink-0 snap-start min-[900px]:w-[45%]">
              <PhoneShot src="/uploads/propertyhub-app-home.png" label="หน้าแรก" />
            </div>
          </div>
        </div>
      </section>

      <div className="h-8 min-[900px]:h-[50px]" />

      {/* ── OVERVIEW ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {OVERVIEW.map((para, i) => (
            <Body key={i}>{para}</Body>
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── TOOLS ── (กว้างเท่า layout 4 กล่อง → grid 4 คอลัมน์) */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          {TOOLS.map((t) => (
            <ToolCard key={t} name={t} />
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

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

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

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

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── SCREENS ── แต่ละ tab = พื้นเทา + จอ + ปุ่มเลื่อนเมื่อ >4 */}
      <section>
        <H2>Screens</H2>
        <div className="mt-8 flex flex-col gap-6">
          {TABS.map((t) => (
            <AppScreensShowcase key={t.tab} title={t.en} screens={t.screens} />
          ))}
        </div>
      </section>

      {/* ── footer nav (prev / next) — ลำดับอิงเมนู sidebar ── */}
      <ProjectNav slug="propertyhub-app" />
    </article>
  );
}
