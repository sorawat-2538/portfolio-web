// WebsiteBuilderView — หน้า /work/propertyos (เนื้อหา = งาน Website Builder ที่อยู่ใต้ PropertyOS)
//
// โครงหน้าเดียวกับ case study อื่น: badge → H1 → avatar bar → hero (ThemeWindow) → Overview
// จากนั้นเป็นบล็อกเนื้อหาที่ใช้กติกาเดียวกับหน้า Data & AI Workflow:
//   H2 → goal callout เทา (โจทย์ที่ตั้งไว้) → ไทม์ไลน์ step มีเลข → takeaway ส้ม (ข้อสรุป)
// จอทั้งหมด render ด้วย WebScreensPanel variant="grid" (กรอบ browser + กดดูเต็ม)
//
// ข้อความ/รูปทั้งหมดแก้ที่ data/website-builder.ts ไฟล์เดียว

import Image from "next/image";
import type { PlaceholderProject } from "@/data/projects";
import { websiteBuilder as wb, type WBShot } from "@/data/website-builder";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { StatusBadge } from "./status-badge";
import { WebScreensPanel } from "./web-screens-panel";
import { BuilderPanelsMock } from "./builder-panels-mock";
import { BuilderOnboardingMock } from "./builder-onboarding-mock";
import { BuilderScreenMock } from "./builder-screen-mock";
import { LayoutPickerMock } from "./layout-picker-mock";
import { ProjectNav } from "./project-nav";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

/** callout เทา + เส้นซ้ายเข้ม = โจทย์/เป้าหมายที่ตั้งไว้ (อ่านก่อน) */
function GoalCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[22px] border-l-[3px] border-foreground bg-hover px-5 py-4">
      <p className="text-[15px] leading-[1.75] text-muted-foreground">{children}</p>
    </div>
  );
}

/** callout ส้ม = ข้อสรุปที่ได้ (จุดที่ต้องสะดุดตาที่สุด) */
function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 border-l-[3px] border-amber-500 bg-amber-50 px-5 py-4">
      <p className="text-[15px] leading-[1.75] text-foreground">{children}</p>
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

export function WebsiteBuilderView({ project: p }: { project: PlaceholderProject }) {
  return (
    <article className="pt-5 pb-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {wb.title}
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

        <div className="mt-6 border-t border-border" />

        {/* hero — ไฟล์ screen flow ตัวจริง: เปิดมาต้องรู้ทันทีว่านี่คือ "เว็บที่เอาไว้สร้างเว็บ" */}
        <div className="mt-8 min-[900px]:mt-[50px]">
          <BuilderPanelsMock />
        </div>
      </section>

      <div className="h-8 min-[900px]:h-[50px]" />

      {/* ── OVERVIEW ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {wb.overview.map((para, i) => (
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
          {wb.tools.map((t) => (
            <ToolCard key={t} name={t} />
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── ที่ยืนใน PropertyOS ── */}
      <section>
        <H2>{wb.platform.title}</H2>
        <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
          {wb.platform.intro}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 min-[900px]:grid-cols-4">
          {wb.platform.groups.map((g) => (
            <div key={g.title} className="rounded-xl border border-border bg-card p-4">
              <div className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {g.title}
              </div>
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {g.items.map((it) => (
                  <li key={it} className="text-[14px] leading-snug text-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl border-l-[3px] border-amber-500 bg-amber-50 px-4 py-3.5">
          <span className="text-[14px] font-semibold text-foreground">
            {wb.platform.highlight}
          </span>
          <span className="text-[14px] text-muted-foreground">— งานในหน้านี้</span>
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── FLOW — โจทย์ + ไทม์ไลน์ 4 ขั้น ── */}
      <section>
        <H2>{wb.flow.title}</H2>
        <GoalCallout>{wb.flow.goal}</GoalCallout>

        <ol className="mt-7 flex flex-col gap-6">
          {wb.flow.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-[13px] font-semibold text-foreground">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.75] text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* onboarding 4 จอ — แกะจากไฟล์ screen flow มาทำเป็นหน้าจอ */}
        <div className="mt-8">
          <BuilderOnboardingMock />
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── SCREEN FLOW — โครง 3 พาเนล + ข้อตัดสินใจเชิงโครงสร้าง ── */}
      <section>
        <H2>{wb.screenFlow.title}</H2>
        <GoalCallout>{wb.screenFlow.goal}</GoalCallout>

        {/* หน้าจอ editor ที่แกะจากไฟล์ ASCII (ตัวเดียวกับ hero) มาทำเป็นหน้าจอจริง */}
        <div className="mt-7">
          <BuilderScreenMock />
        </div>

        {/* 3 พาเนล — การ์ดสั้น ๆ อธิบายหน้าที่ของแต่ละพาเนล */}
        <div className="mt-7 grid grid-cols-1 gap-3 min-[720px]:grid-cols-3">
          {wb.screenFlow.panels.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-card p-4">
              <div className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {p.name}
              </div>
              <div className="mt-1.5 text-[16px] font-semibold text-foreground">{p.role}</div>
              <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>

        <ol className="mt-7 flex flex-col gap-5">
          {wb.screenFlow.decisions.map((d, i) => (
            <li key={d.title} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-[13px] font-semibold text-foreground">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-semibold text-foreground">{d.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.75] text-muted-foreground">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* dialog เลือก layout — ตัวเชื่อมไปยังบล็อก layout ของแต่ละประเภทหน้าด้านล่าง */}
        <div className="mt-7">
          <LayoutPickerMock />
        </div>

        <Takeaway>{wb.screenFlow.takeaway}</Takeaway>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── 3 ธีม ── */}
      <section>
        <H2>{wb.themesSection.title}</H2>
        <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
          {wb.themesSection.intro}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 min-[720px]:grid-cols-3">
          {wb.themes.map((t) => (
            <div key={t.key} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-4 w-4 shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ background: t.accent }}
                />
                <h3 className="text-[17px] font-semibold text-foreground">{t.name}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-[1.7] text-foreground">{t.mood}</p>
              <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">{t.bestFor}</p>
              <dl className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3.5 text-[13px]">
                <div className="flex gap-2">
                  <dt className="w-[52px] shrink-0 text-muted-foreground">Font</dt>
                  <dd className="min-w-0 text-foreground">{t.font}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-[52px] shrink-0 text-muted-foreground">Accent</dt>
                  <dd className="min-w-0 text-foreground">
                    {t.accentName} <span className="text-muted-foreground">{t.accent}</span>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <WebScreensPanel
            title="Home — ธีมเดียวกันทั้ง 3 แบบ (กดดูเต็มหน้า)"
            variant="grid"
            screens={wb.themes.map((t) => ({
              src: t.home.src,
              label: t.name,
              w: t.home.w,
              h: t.home.h,
            }))}
          />
        </div>

        <Takeaway>{wb.themesSection.takeaway}</Takeaway>
      </section>

      {/* ── layout ของแต่ละประเภทหน้า ── */}
      {wb.layoutSets.map((set) => (
        <div key={set.key}>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section>
            <H2>{set.title}</H2>
            <GoalCallout>{set.goal}</GoalCallout>

            <ol className="mt-7 flex flex-col gap-5">
              {set.layouts.map((l, i) => (
                <li key={l.name} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-[13px] font-semibold text-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold text-foreground">{l.name}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.75] text-muted-foreground">
                      {l.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-col gap-4">
              {wb.themes.map((t) => {
                const shots: Record<string, WBShot[]> = set.shots;
                return (
                  <WebScreensPanel
                    key={t.key}
                    title={`${t.name} — ${set.title}`}
                    variant="grid"
                    screens={shots[t.key] ?? []}
                  />
                );
              })}
            </div>
          </section>
        </div>
      ))}

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── CLOSING ── */}
      <section>
        <H2>{wb.closing.title}</H2>
        <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">
          {wb.closing.body}
        </p>
      </section>

      <ProjectNav slug="propertyos" />
    </article>
  );
}
