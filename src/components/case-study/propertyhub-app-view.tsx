// PropertyhubAppView — case study เต็มของ "Propertyhub App"
// โครง: Header (+ปุ่มดาวน์โหลดแอป) → Overview → Tools → Business Goal
// → Process & Key Decisions (Requirement / Research / Wireframe & Style Guide → Decision 1..n)
// → Final User Interface (พื้นเทาผืนเดียว แบ่งกลุ่มด้วยชื่อหน้า · กริด 3 จอต่อแถว)
//
// ข้อความ + รูป Style Guide อ่านจาก data/projects.ts
// (placeholderProjects["propertyhub-app"] → overview / processNote / processPhases / decisions)
// เหลือแค่ MAIN_GROUPS (จอในแต่ละหน้า) ที่ยังอยู่ในไฟล์นี้

import Image from "next/image";
// ไอคอนของ tab (Bell/Home/Menu ฯลฯ) ไม่ได้ใช้แล้ว ตั้งแต่ยุบ 8 panel เหลือพื้นเทาผืนเดียว
import { ExternalLink } from "lucide-react";
import type { PlaceholderProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { AppScreensShowcase } from "./app-screens-showcase";
import { ProcessSection, hasProcess } from "./process-section";
import { SectionNav, type NavSection } from "./section-nav";
import { ProjectNav } from "./project-nav";

const APP_STORE_URL = "https://apps.apple.com/th/app/propertyhub/id1574599780?l=th";
// user สั่ง 14 ส.ค. 2026 — เอา Claude ออก ใส่ Illustrator / Photoshop แทน (โลโก้ Adobe จริง)
// ชื่อไม่มีคำว่า "Adobe" นำหน้า ให้ตรงกับหน้า Archive และ Brand & Graphic Works
const TOOLS = ["Figma", "Illustrator", "Photoshop"];

// ── content ──────────────────────────────────────────────────────────────────
// หมายเหตุ: DESIGN_SYSTEM (Color/Typography/Icon) ย้ายไปอยู่ใน processPhases ของ
// placeholderProjects["propertyhub-app"] แล้ว — แก้รูป Style Guide ที่ data/projects.ts

type Shot = { src: string; label: string };
const S = (src: string, label: string): Shot => ({ src: `/uploads/${src}`, label });

// Final User Interface — พื้นเทาผืนเดียว แบ่งกลุ่มด้วยชื่อหน้า · กริด 3 จอต่อแถว
//
// รอบแก้ 14 ส.ค. 2026 (เย็น): เหลือ 2 กลุ่ม — ยุบ section Home / Activity / Messages / Listings ทิ้ง
// เก็บจอ "ลงประกาศ · จัดการรูปภาพ" จาก Listings ไว้ท้าย Related · เปลี่ยนชื่อ Detail เป็น Related
//
// จอที่ไม่ได้ใช้ยังอยู่ครบใน public/uploads เอากลับมาใส่ได้ตลอด:
//   onboarding 5 จอ · home-3 · province · developers · developer-detail
//   listings-rejected · listings-bulk · listings-tags · save-search · messages-photos
//   menu-register · menu-signin · menu-editprofile
//   + จอที่เพิ่งตัดรอบนี้: detail-contact · new-projects · assetbank · assetbank-kbank
//     · activity-savesearch · activity-viewed · messages-chat · home-2 · home-4
//     · package · post-step1
const MAIN_GROUPS: { title: string; screens: Shot[] }[] = [
  {
    // ภาพรวมเมนูหลักของแอป — เมนูละ 1 จอ (6 เมนู) · user สั่ง "เหมือนเดิม" ห้ามแตะ
    title: "Main Screen",
    screens: [
      S("propertyhub-app-home.png", "หน้าหลัก"),
      S("propertyhub-app-listings.png", "ประกาศ"),
      S("propertyhub-app-activity.png", "กิจกรรม"),
      S("propertyhub-app-messages.png", "ข้อความ"),
      S("propertyhub-app-notification.png", "แจ้งเตือน"),
      S("propertyhub-app-menu.png", "เมนู"),
    ],
  },
  {
    // เดิมชื่อ "Detail" — user เปลี่ยน wording เป็น "Related"
    // ตัดจอลำดับที่ 4,6,8,9 ของกลุ่มนี้ออก (นับจาก 9 จอที่แสดงอยู่ ไม่ใช่ลิสต์ตั้งต้น 11 จอ
    // — user ระบุว่า "เรียกชื่อ screen เป็นตัวเลขเฉพาะใน section นี้"):
    //   1 detail · 2 search-results · 3 search-map · [4 detail-contact] · 5 project
    //   [6 new-projects] · 7 agent · [8 assetbank] · [9 assetbank-kbank]
    // จอสุดท้ายย้ายมาจาก section Listings ที่ถูกยุบทิ้ง
    title: "Related",
    screens: [
      S("propertyhub-app-detail.png", "รายละเอียดประกาศ"),
      S("propertyhub-app-search-results.png", "ผลการค้นหา"),
      S("propertyhub-app-search-map.png", "มุมมองแผนที่"),
      S("propertyhub-app-project.png", "รายละเอียดโครงการ"),
      S("propertyhub-app-agent.png", "โปรไฟล์เอเจนต์"),
      S("propertyhub-app-post-step4.png", "ลงประกาศ · จัดการรูปภาพ"),
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
  // สารบัญลอยขอบขวา — ปิดไว้ (user สั่ง 17 ส.ค. 2026: จำเป็นแค่หน้า propertyhub ที่ยาวกว่าหน้าอื่น)
  // ตั้งเป็น true เพื่อเปิดคืน · id ของ section ยังอยู่ครบ ใช้เป็น anchor ได้เหมือนเดิม
  const SHOW_SECTION_NAV = false;
  // สารบัญลอยขอบขวา — เงื่อนไข show ต้องตรงกับเงื่อนไข render ของ section นั้นเป๊ะ
  const navSections: NavSection[] = (
    [
      { id: "s-overview", label: "Overview", show: true },
      { id: "s-tools", label: "Tools", show: true },
      { id: "s-goal", label: "Business Goal", show: Boolean(p.businessGoal?.length) },
      { id: "s-process", label: "Process & Key Decisions", show: hasProcess(p.decisions) },
      { id: "s-screens", label: "Final User Interface", show: true },
    ] as (NavSection & { show: boolean })[]
  )
    .filter((s) => s.show)
    .map(({ id, label }) => ({ id, label }));

  return (
    <article className="pt-5 pb-5 font-sans font-normal min-[900px]:py-[50px]">
      {SHOW_SECTION_NAV && <SectionNav sections={navSections} />}

      {/* ── HEADER ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

        {/* มือถือ/แท็บเล็ต = ชื่อบน · ปุ่มเต็มความกว้างข้างล่าง (user สั่ง — เดิมสลับไปเรียงข้างกันตั้งแต่ 640px เร็วไป)
            desktop (≥900px) = เรียงข้างกัน ชื่อซ้าย ปุ่มขวา */}
        <div className="mt-5 flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-white">
              <Image src={profile.hero.navAvatar} alt={profile.name} fill sizes="40px" className="object-cover" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[15px] font-semibold text-foreground">{profile.fullName}</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">{profile.headline}</div>
            </div>
          </div>

          {/* primary action — ดาวน์โหลดแอป (full-width บนมือถือ / auto บน desktop) */}
          <div className="flex w-full shrink-0 flex-wrap gap-2.5 min-[900px]:w-auto">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 min-[900px]:w-auto"
            >
              <ExternalLink className="h-4 w-4" />
              App Store
            </a>
          </div>
        </div>

        <div className="mt-5 border-t border-border" />

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
      <section id="s-overview" className="scroll-mt-24">
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {(p.overview ?? []).map((para, i) => (
            <Body key={i}>{para}</Body>
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── TOOLS ── (กว้างเท่า layout 4 กล่อง → grid 4 คอลัมน์) */}
      <section id="s-tools" className="scroll-mt-24">
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          {TOOLS.map((t) => (
            <ToolCard key={t} name={t} />
          ))}
        </div>
      </section>

      {/* ── BUSINESS GOAL ── ลำดับเดียวกับหน้า propertyhub เว็บ (อยู่ถัดจาก Tools)
          ไม่มีข้อมูล = ไม่แสดง section */}
      {p.businessGoal && p.businessGoal.length > 0 && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section id="s-goal" className="scroll-mt-24">
            <H2>Business Goal</H2>
            <div className="mt-[22px] space-y-[18px]">
              {p.businessGoal.map((para, i) => (
                <Body key={i}>{para}</Body>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── PROCESS & KEY DECISIONS ── ลำดับเดียวกับหน้า propertyhub (ถัดจาก Business Goal) */}
      {hasProcess(p.decisions) && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <ProcessSection
            title={p.title}
            decisions={p.decisions!}
            note={p.processNote}
            image={p.processImage}
            phases={p.processPhases}
            validationLabel="Why this works"
          />
        </>
      )}

      {/* หมายเหตุ: section "Style Guide" ที่เคยอยู่ตรงนี้ (รูป Color/Typography/Icon เต็มความกว้าง
          เรียงลงมา) ถูกย้ายเข้าไปเป็นขั้นย่อย "Wireframe & Style Guide" ใน Process & Key Decisions
          และเปลี่ยนเป็นกริด 3 คอลัมน์ ตามคำสั่ง user 14 ส.ค. 2026 — รูปชุดเดิมทั้งหมด
          ตอนนี้อ่านจาก placeholderProjects["propertyhub-app"].processPhases ใน data/projects.ts */}

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── FINAL USER INTERFACE ── พื้นเทาผืนเดียว แบ่งกลุ่มด้วยชื่อหน้า (Home / Detail / …)
          แต่ละกลุ่มเรียงกริด 3 จอต่อแถว ไม่มี scroll แนวนอน */}
      <section id="s-screens" className="scroll-mt-24">
        <H2>Final User Interface</H2>
        <div className="mt-8">
          <AppScreensShowcase groups={MAIN_GROUPS} />
        </div>
      </section>

      {/* ── footer nav (prev / next) — ลำดับอิงเมนู sidebar ── */}
      <ProjectNav slug="propertyhub-app" />
    </article>
  );
}
