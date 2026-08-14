// PropertyosView — หน้า /work/propertyos
//
// โครงหน้า (ตามที่ user กำหนด):
//   badge → H1 → avatar bar → hero (หน้าต่าง editor: หน้า Dashboard ของแพลตฟอร์ม)
//   → Overview → Tools → What did I do with this project? (การ์ด 2 ใบ)
//   → Chat System      : หน้าต่าง editor (หน้าแชท) → ย่อหน้าเดียว → จอจริงทั้งหมด
//   → Website Builder  : หน้าต่าง editor (ไฟล์ screen flow) → ย่อหน้าเดียว →
//                        onboarding → โครง editor → ธีมและ layout ทั้งหมด
//   → prev/next
//
// ⚠️ หน้าต่าง code editor ในหน้านี้มี 3 ตัว และต้องเป็นคนละหน้าจอกัน (user สั่ง):
//    hero = Dashboard · Chat System = หน้าแชท · Website Builder = ไฟล์ screen flow
//
// ข้อความ/รูปทั้งหมดแก้ที่ data/propertyos.ts ไฟล์เดียว

import Image from "next/image";
import type { PlaceholderProject } from "@/data/projects";
import { propertyos as po, type WBShot } from "@/data/propertyos";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { WebScreensPanel } from "./web-screens-panel";
import { PropertyosHeroMock } from "./propertyos-hero-mock";
import { PropertyosPanelsMock } from "./propertyos-panels-mock";
import { BuilderPanelsMock } from "./builder-panels-mock";
import { OnboardingScreen } from "./builder-onboarding-mock";
import { BuilderScreenMock } from "./builder-screen-mock";
import { LayoutPickerMock } from "./layout-picker-mock";
import { ProcessSection, hasProcess } from "./process-section";
import { ProjectNav } from "./project-nav";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

/** หัวข้อย่อยในบล็อก — เล็กกว่า H2 เพื่อบอกว่าอยู่ "ใต้" Chat System / Website Builder */
function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[clamp(18px,2.2vw,22px)] font-bold tracking-[-0.01em] text-foreground">
      {children}
    </h3>
  );
}

/** callout เทา + เส้นซ้ายหนา = โจทย์/เป้าหมายที่ตั้งไว้ — ขนาดเดียวกับหน้า Data & AI Workflow */
function GoalCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-r-xl border-l-[3px] border-foreground bg-hover px-[clamp(18px,2.4vw,26px)] py-[clamp(18px,2.4vw,24px)]">
      <p className="text-[clamp(16px,1.9vw,20px)] leading-[1.62] text-foreground">{children}</p>
    </div>
  );
}

/** callout ส้ม = ข้อสรุปที่ได้ — ขนาดเดียวกับหน้า Data & AI Workflow */
function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-r-xl border-l-[3px] border-amber-500 bg-amber-400/[0.12] px-[clamp(18px,2.4vw,26px)] py-[clamp(16px,2vw,22px)]">
      <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.62] text-foreground">{children}</p>
    </div>
  );
}

/** อ่านค่าความสว่างของสีพื้น (#rrggbb) — ใช้เลือกสีตัวอักษรบนแถบสีของธีมให้อ่านออกทั้งพื้นอ่อน/พื้นเข้ม */
function isDark(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5;
}

/** การ์ดธีม — ให้ตัวธีมเป็นพระเอก: แถบสีพื้นจริงของธีม + ชื่อตัวใหญ่ + เส้น accent
 *  แล้วค่อยตามด้วยอารมณ์ / กลุ่มที่เหมาะ / ฟอนต์กับสี */
function ThemeCard({ theme: t }: { theme: (typeof po.themes)[number] }) {
  const onDark = isDark(t.surface);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      {/* แถบสีของธีม — พื้นจริงที่ธีมนั้นใช้ + ขีด accent ด้านล่าง */}
      <div
        className="relative flex h-[132px] flex-col justify-end px-5 pb-5"
        style={{ background: t.surface }}
      >
        <span
          className="text-[11px] font-medium uppercase tracking-[0.16em]"
          style={{ color: onDark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.42)" }}
        >
          Theme
        </span>
        <h4
          className="mt-1 text-[27px] font-semibold leading-none tracking-[-0.015em]"
          style={{ color: onDark ? "#ffffff" : "#1a1a1a" }}
        >
          {t.name}
        </h4>
        <span
          className="absolute inset-x-0 bottom-0 h-[5px]"
          style={{ background: t.accent }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[16px] font-medium leading-[1.6] text-foreground">{t.mood}</p>
        <p className="mb-2 mt-2 text-[14px] leading-[1.7] text-muted-foreground">{t.bestFor}</p>
        <dl className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-[13px] [margin-block-start:1.25rem]">
          <div className="flex gap-2">
            <dt className="w-[52px] shrink-0 text-muted-foreground">Font</dt>
            <dd className="min-w-0 text-foreground">{t.font}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="w-[52px] shrink-0 text-muted-foreground">Accent</dt>
            <dd className="flex min-w-0 items-center gap-2 text-foreground">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/10"
                style={{ background: t.accent }}
              />
              {t.accentName} <span className="text-muted-foreground">{t.accent}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
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

/** ไทม์ไลน์เลขใหญ่ + เส้นเชื่อม — treatment เดียวกับ "Data for Future Growth"
 *  screen = จอประกอบของขั้นนั้น (ถ้ามี) วางใต้คำอธิบายเหมือนรูปหลักฐานในหน้า Data */
function StepTimeline({
  items,
  screen,
}: {
  items: { title: string; body: string }[];
  screen?: (index: number) => React.ReactNode;
}) {
  return (
    <div className="mt-[38px] flex flex-col">
      {items.map((s, i) => {
        const last = i === items.length - 1;
        return (
          <div key={s.title} className="relative flex gap-5 pb-12 last:pb-0 sm:gap-6">
            <div className="relative flex shrink-0 flex-col items-center">
              {!last && (
                <span className="absolute bottom-0 left-1/2 top-[52px] w-[2px] -translate-x-1/2 bg-border" />
              )}
              <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-brand text-[22px] font-bold tabular-nums text-white shadow-[0_8px_20px_-6px_rgba(45,104,255,0.5)]">
                {i + 1}
              </span>
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <h4 className="text-[clamp(19px,2.1vw,22px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
                {s.title}
              </h4>
              <p className="mt-3 text-[16px] leading-[1.75] text-muted-foreground">{s.body}</p>
              {screen && <div className="mt-5">{screen(i)}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** แท็กเล็ก ๆ โทนน้ำเงิน (--brand) — "Panel 1" / "Layout 2" ที่ไม่ต้องตะโกนเป็นตัวใหญ่ */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-brand/25 bg-brand/[0.08] px-2.5 py-1 text-[11.5px] font-semibold text-brand">
      {children}
    </span>
  );
}

/** การ์ดใน "What did I do with this project?" กดแล้วเลื่อนไปที่บล็อกของงานนั้น
 *  (key ของ contribution.items → id ของ section · scroll-behavior: smooth ตั้งไว้ที่ globals.css) */
const SECTION_ID: Record<string, string> = {
  chat: "chat-system",
  builder: "website-builder",
};

/** "Layout 1 — Sidebar filter" → แท็ก "Layout 1" + ชื่อ "Sidebar filter" */
function splitName(name: string) {
  const [tag, ...rest] = name.split("—");
  return rest.length
    ? { tag: tag.trim(), title: rest.join("—").trim() }
    : { tag: "", title: name };
}

export function PropertyosView({ project: p }: { project: PlaceholderProject }) {
  return (
    <article className="pt-5 pb-5 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {po.title}
        </h1>

        <div className="mt-5 flex items-center gap-3">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-white">
            <Image
              src={profile.hero.navAvatar}
              alt={profile.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="text-[15px] font-semibold text-foreground">{profile.fullName}</div>
            <div className="mt-0.5 text-[13px] text-muted-foreground">{profile.headline}</div>
          </div>
        </div>

        <div className="mt-5 border-t border-border" />

        {/* hero — หน้าต่าง code editor เนื้อในเป็นหน้า Dashboard ของแพลตฟอร์ม
            animation มีแค่ float ขึ้นลงเหมือน hero หน้าอื่น (user สั่งเรื่อง consistency) */}
        <div className="mt-8 min-[900px]:mt-[50px]">
          <PropertyosHeroMock />
        </div>
      </section>

      <div className="h-8 min-[900px]:h-[50px]" />

      {/* ── OVERVIEW ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {po.overview.map((para, i) => (
            <p key={i} className="text-[17px] leading-[1.8] text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── TOOLS ── */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-3">
          {po.tools.map((t) => (
            <ToolCard key={t} name={t} />
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── ทำอะไรให้โปรเจกต์นี้บ้าง — การ์ด image + title + description
             ช่องรูปคือหน้าต่าง editor ของงานนั้น ๆ ย่อลงมาทั้งอัน (ไม่ใช่ screenshot) ── */}
      <section>
        <H2>{po.contribution.title}</H2>

        <div className="mt-6 grid grid-cols-1 gap-4 min-[720px]:grid-cols-2">
          {po.contribution.items.map((it) => (
            <a
              key={it.key}
              href={`#${SECTION_ID[it.key] ?? ""}`}
              className="block cursor-pointer overflow-hidden rounded-xl border border-border bg-card"
            >
              {/* ช่องรูป — หน้าต่าง editor ตัวเต็มย่อด้วย scale เต็มกรอบ ไม่มีขอบเทา
                  (origin ซ้ายบน + กว้าง 2 เท่าเพื่อชดเชย · พื้นหลังใช้สีเดียวกับตัว editor
                  เพื่อให้มุมโค้งของหน้าต่างกลืนไปกับกรอบการ์ด) */}
              <div className="relative h-[clamp(160px,24vw,215px)] overflow-hidden border-b border-border bg-[#0d1a2b]">
                <div className="pointer-events-none absolute -left-px -top-px w-[calc(200%+2px)] origin-top-left scale-[0.5]">
                  {it.key === "chat" ? <PropertyosPanelsMock /> : <BuilderPanelsMock />}
                </div>
              </div>

              <div className="p-5">
                <div className="text-[19px] font-bold tracking-[-0.01em] text-foreground">
                  {it.name}
                </div>
                <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{it.note}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── PROCESS & KEY DECISIONS ── โครงเดียวกับหน้า propertyhub (user สั่ง 14 ส.ค. 2026)
          วางก่อนบล็อก Chat System / Website Builder เพราะเป็นวิธีคิดที่นำไปสู่ทั้งสองฟีเจอร์
          decisions อยู่ใน placeholderProjects.propertyos (data/projects.ts) */}
      {hasProcess(p.decisions) && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <ProcessSection
            title={po.title}
            decisions={p.decisions!}
            note={p.processNote}
            image={p.processImage}
            phases={p.processPhases}
          />
        </>
      )}

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ══ บล็อก 1 — CHAT SYSTEM ══ (รูปนำ → ข้อความใต้รูป → จอทั้งหมด)
             id = เป้าหมายของการ์ดใน "What did I do with this project?"
             scroll-mt เผื่อ header ที่ sticky อยู่ด้านบน */}
      <section id="chat-system" className="scroll-mt-24">
        <H2>{po.chat.title}</H2>

        {/* รูปนำของบล็อก = หน้าต่าง editor ที่ข้างในเป็น ASCII ของหน้าแชท
            (พิมพ์ตอนเลื่อนถึง) ส่วน screenshot จริงทั้งหมดอยู่ในพาเนลถัดลงไป */}
        <div className="mt-6">
          <PropertyosPanelsMock />
        </div>

        <p className="mt-6 text-[17px] leading-[1.8] text-muted-foreground">{po.chat.body}</p>

        <div className="mt-7">
          <WebScreensPanel title={po.chat.title} variant="grid" screens={po.chat.screens} />
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ══ บล็อก 2 — WEBSITE BUILDER ══ */}
      <section id="website-builder" className="scroll-mt-24">
        <H2>{po.builder.title}</H2>

        {/* รูปนำของบล็อก = ไฟล์ screen flow ของ builder (ASCII) */}
        <div className="mt-6">
          <BuilderPanelsMock />
        </div>

        <p className="mt-6 text-[17px] leading-[1.8] text-muted-foreground">{po.builder.body}</p>

        {/* onboarding — เล่าแบบเดียวกับ "Data for Future Growth": เลขใหญ่ + คำอธิบาย + จอของขั้นนั้น */}
        <div className="mt-10">
          <H3>{po.flow.title}</H3>
          <GoalCallout>{po.flow.goal}</GoalCallout>
          <StepTimeline
            items={po.flow.steps}
            screen={(i) => <OnboardingScreen step={(i + 1) as 1 | 2 | 3 | 4} />}
          />
        </div>

        {/* โครงหน้าจอของ editor */}
        <div className="mt-12">
          <H3>{po.screenFlow.title}</H3>
          {/* overview ของหน้า editor — ย่อหน้าธรรมดา ไม่ใส่กรอบเน้น (user สั่ง) */}
          <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
            {po.screenFlow.goal}
          </p>

          {/* หน้าจอ editor ที่แกะจากไฟล์ ASCII มาทำเป็นหน้าจอจริง */}
          <div className="mt-7">
            <BuilderScreenMock />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 min-[720px]:grid-cols-3">
            {po.screenFlow.panels.map((panel) => (
              <div key={panel.name} className="rounded-xl border border-border bg-card p-4">
                <Tag>{panel.name}</Tag>
                <div className="mt-2.5 text-[16px] font-semibold text-foreground">{panel.role}</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{panel.note}</p>
              </div>
            ))}
          </div>

          {/* dialog เลือก layout — ต้องมีบรรทัดเกริ่นก่อน ไม่งั้นมันโผล่มาเฉย ๆ
              และเป็นตัวเชื่อมไปยังบล็อก layout ด้านล่าง */}
          <p className="mt-7 text-[17px] leading-[1.8] text-muted-foreground">
            {po.screenFlow.layoutPicker}
          </p>
          <div className="mt-6">
            <LayoutPickerMock />
          </div>
        </div>

        {/* ธีมและ layout ที่ทำเสร็จแล้ว */}
        <div className="mt-12">
          <H3>{po.themesSection.title}</H3>
          <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
            {po.themesSection.intro}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-5 min-[720px]:grid-cols-3">
            {po.themes.map((t) => (
              <ThemeCard key={t.key} theme={t} />
            ))}
          </div>

          <div className="mt-6">
            <WebScreensPanel
              title="Home"
              variant="grid"
              screens={po.themes.map((t) => ({
                src: t.home.src,
                label: t.name,
                w: t.home.w,
                h: t.home.h,
              }))}
            />
          </div>

          <Takeaway>{po.themesSection.takeaway}</Takeaway>
        </div>

        {/* section variants — ธีมเดียวกันยังเลือก layout ของแต่ละ section ได้อีก 3 แบบ */}
        <div className="mt-12">
          <H3>{po.sectionVariants.title}</H3>
          <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
            {po.sectionVariants.intro}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
            {po.sectionVariants.sections.map((s) => (
              <div key={s} className="rounded-xl border border-border bg-card px-4 py-3.5">
                <div className="truncate text-[15px] font-semibold text-foreground">{s}</div>
                <div className="mt-1 text-[13px] text-muted-foreground">3 layouts</div>
              </div>
            ))}
          </div>

          {/* ตัวอย่างของจริง — Home หน้าเดียวกันที่สลับ variant ของแต่ละ section แล้ว capture มา */}
          <p className="mt-8 text-[17px] leading-[1.8] text-muted-foreground">
            {po.sectionVariants.example.note}
          </p>
          <div className="mt-6">
            <WebScreensPanel
              title="Custom variants"
              variant="grid"
              cols={3}
              screens={po.sectionVariants.example.homes}
            />
          </div>
        </div>

        {/* layout ของแต่ละประเภทหน้า */}
        {po.layoutSets.map((set) => (
          <div key={set.key} className="mt-10">
            <H3>{set.title}</H3>
            <GoalCallout>{set.goal}</GoalCallout>

            {/* 3 layout เรียงแนวนอน — เทียบกันได้ในสายตาเดียว (ตกลงมาซ้อนกันบนจอแคบ) */}
            <ol className="mt-7 grid grid-cols-1 gap-3 min-[720px]:grid-cols-3">
              {set.layouts.map((l) => {
                const { tag, title } = splitName(l.name);
                return (
                  <li key={l.name} className="rounded-xl border border-border bg-card p-4">
                    {tag && <Tag>{tag}</Tag>}
                    <h4 className="mt-2.5 text-[16px] font-semibold text-foreground">{title}</h4>
                    <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{l.note}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-7 flex flex-col gap-4">
              {po.themes.map((t) => {
                const shots: Record<string, WBShot[]> = set.shots;
                return (
                  <WebScreensPanel
                    key={t.key}
                    title={t.name}
                    variant="grid"
                    screens={shots[t.key] ?? []}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <ProjectNav slug="propertyos" />
    </article>
  );
}
