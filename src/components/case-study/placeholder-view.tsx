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
import { ProcessSection, hasProcess } from "./process-section";
import { ProjectNav } from "./project-nav";
import { SectionNav, type NavSection } from "./section-nav";
import { CraftShowcase } from "./craft-showcase";
import { DecisionFigures } from "./decision-figures";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

/** หัวข้อย่อยในหนึ่ง section (เช่น Wireframe / Style Guide) — ชุดเดียวกับขั้นย่อยใน ProcessSection */
function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[clamp(19px,2.1vw,22px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
      {children}
    </h3>
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
    text: "โปรเจกต์นี้เผยแพร่จริงแล้ว — กำลังเรียบเรียง case study ฉบับเต็ม เนื้อหาจะตามมาเร็วๆ นี้",
  },
  process: {
    icon: Hammer,
    text: "โปรเจกต์นี้กำลังพัฒนาอยู่ — จะอัปเดต case study พร้อมรายละเอียดกระบวนการเมื่อพร้อม",
  },
  coming: {
    icon: Clock,
    text: "โปรเจกต์นี้ยังไม่เปิดให้ชม — เร็วๆ นี้จะมี case study มาให้ดูแบบเต็มๆ",
  },
  archived: {
    icon: FileText,
    text: "งานเก่าที่เก็บเข้าคลัง — ดูผลงานได้ในหน้า Early Work",
  },
};

/** empty state box กลางๆ สำหรับ section ที่ยังไม่มีเนื้อหา */
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

export function PlaceholderView({
  slug,
  project: p,
}: {
  slug: string;
  project: PlaceholderProject;
}) {
  const note = NOTE[p.status];
  const HeroIcon = note.icon;
  const hasPresent = Boolean(p.heroWeb && p.heroPhone);

  // สารบัญลอยขอบขวา — ปิดไว้ (user สั่ง 17 ส.ค. 2026: จำเป็นแค่หน้า propertyhub ที่ยาวกว่าหน้าอื่น)
  // ตั้งเป็น true เพื่อเปิดคืน · id ของ section ยังอยู่ครบ ใช้เป็น anchor ได้เหมือนเดิม
  const SHOW_SECTION_NAV = false;
  // สารบัญลอยขอบขวา — เงื่อนไข show ต้องตรงกับเงื่อนไข render ของ section นั้นเป๊ะ
  // หน้านี้มี Final User Interface ได้ 2 แบบ (จอแอป / จอเว็บ) แยก id กันไว้
  const navSections: NavSection[] = (
    [
      { id: "s-overview", label: "Overview", show: true },
      { id: "s-tools", label: "Tools", show: true },
      { id: "s-goal", label: "Business Goal", show: Boolean(p.businessGoal?.length) },
      { id: "s-process", label: "Process & Key Decisions", show: hasProcess(p.decisions) },
      { id: "s-screens", label: "Final User Interface", show: Boolean(p.appScreens?.length) },
      {
        id: "s-style",
        label: p.wireframes?.length ? "Wireframe & Style Guide" : "Style Guide",
        show: Boolean(p.styleGuide?.length),
      },
      { id: "s-craft", label: "Craft Showcase", show: Boolean(p.craft?.items.length) },
      {
        id: "s-webscreens",
        label: p.appScreens?.length ? "Final User Interface (Web)" : "Final User Interface",
        show: Boolean(p.webScreens?.length),
      },
    ] as (NavSection & { show: boolean })[]
  )
    .filter((s) => s.show)
    .map(({ id, label }) => ({ id, label }));

  return (
    <article className="pt-5 pb-5 font-sans font-normal min-[900px]:py-[50px]">
      {SHOW_SECTION_NAV && <SectionNav sections={navSections} />}

      {/* ── HEADER — เหมือนหน้า project จริงทุกอย่าง ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

        {/* identity bar — avatar + name + role (ตำแหน่งเดียวกับหน้าจริง) */}
        <div className="mt-5 flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div className="flex items-center gap-3">
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 min-[900px]:w-auto"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 min-[900px]:w-auto"
                >
                  <ExternalLink className="h-4 w-4" />
                  App Store
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-border" />

        {/* hero — laptop+phone present > phone screens > empty state */}
        {hasPresent ? (
          <div className="mt-8 min-[900px]:mt-[50px]">
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
              {/* phone overlapping bottom-right — สัดส่วนคงที่ทุกจอ (ไม่ใช้ min-width) */}
              <Image
                src={p.heroPhone!}
                alt={`${p.title} — แอปมือถือ`}
                width={660}
                height={1320}
                sizes="(max-width: 900px) 22vw, 190px"
                className="absolute bottom-0 right-0 w-[22%] drop-shadow-[0_22px_44px_-16px_rgba(15,25,45,0.5)]"
              />
            </div>
          </div>
        ) : p.screens && p.screens.length > 0 ? (
          // hero — มือถือ = rail เลื่อนซ้ายขวา (bleed ผ่าน padding) · desktop = จัดกลาง
          <div className="mt-8 min-[900px]:mt-[50px]">
            <div className="-mx-5 flex snap-x items-start gap-5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scroll-padding-inline:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 min-[900px]:mx-0 min-[900px]:flex-wrap min-[900px]:justify-center min-[900px]:gap-x-6 min-[900px]:gap-y-8 min-[900px]:overflow-visible min-[900px]:px-0">
              {p.screens.map((s, i) => (
                <div
                  key={s.src}
                  className="w-[58%] max-w-[240px] shrink-0 snap-start min-[900px]:w-[45%]"
                >
                  <Image
                    src={s.src}
                    alt={s.label ? `${p.title} — ${s.label}` : p.title}
                    width={s.w}
                    height={s.h}
                    sizes="(max-width: 640px) 58vw, 220px"
                    className="block h-auto w-full drop-shadow-[0_24px_48px_-24px_rgba(30,50,90,0.45)]"
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : p.demoUrl ? (
          <div className="mt-8 min-[900px]:mt-[50px]">
            <DemoFrame url={p.demoUrl} title={p.title} cover={p.demoCover} />
          </div>
        ) : (
          <div className="mt-8 min-[900px]:mt-[50px]">
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

      <div className="h-8 min-[900px]:h-[50px]" />

      {/* ── OVERVIEW — เนื้อหาจริง (ถ้ามี) หรือ empty state ── */}
      <section id="s-overview" className="scroll-mt-24">
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

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── TOOLS — การ์ดเครื่องมือ (ถ้ามี) หรือ empty state ── */}
      <section id="s-tools" className="scroll-mt-24">
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

      {/* ── BUSINESS GOAL ── ลำดับเดียวกับหน้า propertyhub (อยู่ถัดจาก Tools)
          ไม่มีข้อมูล = ไม่แสดง section */}
      {p.businessGoal && p.businessGoal.length > 0 && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section id="s-goal" className="scroll-mt-24">
            <H2>Business Goal</H2>
            <div className="mt-[22px] space-y-[18px]">
              {p.businessGoal.map((para, i) => (
                <p key={i} className="text-[17px] leading-[1.8] text-muted-foreground">
                  {para}
                </p>
              ))}
            </div>

            {/* รูปสรุปเป้าหมาย/โมเดลธุรกิจ วางใต้ย่อหน้า
                (treatment เดียวกับ problem.goalImage ของหน้า Propertyhub)
                businessGoalImageNoZoom = ปิดการกดดูเต็มจอ (Expat) */}
            {p.businessGoalImage && (
              <div className="mt-8">
                <DecisionFigures
                  images={[p.businessGoalImage]}
                  title={p.title}
                  variant="single"
                  zoomable={!p.businessGoalImageNoZoom}
                />
              </div>
            )}
          </section>
        </>
      )}

      {/* ── PROCESS & KEY DECISIONS ── ลำดับเดียวกับหน้า propertyhub (ถัดจาก Business Goal)
          ไม่มี p.decisions = ไม่แสดง section */}
      {hasProcess(p.decisions) && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <ProcessSection
            title={p.title}
            heading={p.processHeading}
            decisions={p.decisions!}
            note={p.processNote}
            image={p.processImage}
            phases={p.processPhases}
            flow={p.userFlow}
          />
        </>
      )}

      {/* ── STYLE GUIDE — บอร์ด Color/Font/Icon (รูปเต็มความกว้างเรียงลงมา · treatment เดียวกับ Propertyhub) ── */}
      {p.styleGuide && p.styleGuide.length > 0 && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section id="s-style" className="scroll-mt-24">
            {/* มี wireframes = รวมสอง section เป็นอันเดียว แล้วแบ่งเป็นหัวข้อย่อย (user สั่ง 17 ส.ค. 2026) */}
            <H2>{p.wireframes?.length ? "Wireframe & Style Guide" : "Style Guide"}</H2>

            {p.wireframes && p.wireframes.length > 0 && (
              <div className="mt-7">
                <H3>Wireframe</H3>
                <div className="mt-6">
                  {/* wireframesRail = แถวเดียวเลื่อนแนวนอน (จอมือถือของ Renthub App)
                      ไม่ใส่ = กริด 3 คอลัมน์ treatment เดียวกับหน้า Propertyhub App / Expat */}
                  {p.wireframesRail ? (
                    <WebScreensPanel
                      screens={p.wireframes}
                      variant="rail"
                      railWidth={p.wireframesRail}
                      bare
                    />
                  ) : (
                    <DecisionFigures
                      // crop เฉพาะรูปที่ยาวมาก (หน้าเว็บเต็มหน้าของ Expat)
                      // จอมือถือ (สัดส่วนราว 1:2.2) ไม่ต้อง crop ไม่งั้นถูกตัดครึ่งจอ
                      images={p.wireframes.flatMap((w) =>
                        w.src
                          ? [
                              {
                                src: w.src,
                                label: w.label,
                                w: w.w ?? 4320,
                                h: w.h ?? 4320,
                                crop: (w.h ?? 1) / (w.w ?? 1) > 2.4,
                              },
                            ]
                          : [],
                      )}
                      title={p.title}
                      variant="grid"
                      cols={3}
                      captions={false}
                      zoomable={!p.wireframesNoZoom}
                      railOnMobile={p.wireframesRailOnMobile}
                    />
                  )}
                </div>
              </div>
            )}

            {p.wireframes && p.wireframes.length > 0 && (
              <div className="mt-10">
                <H3>Style Guide</H3>
              </div>
            )}

            {/* บอร์ด Style Guide — กริด 3 คอลัมน์ (ชุดเดียวกับ Propertyhub App) กดดูรูปใหญ่ได้
                เคยลองเป็นแถวเดียวเลื่อนแนวนอน แต่เงาโดนตัด user จึงสั่งกลับมาเป็นกริด 17 ส.ค. 2026
                hideCaptions เพราะในรูปมีชื่อหัวข้ออยู่แล้ว */}
            <div className="mt-6">
              <DecisionFigures
                images={p.styleGuide.flatMap((b) =>
                  b.src ? [{ src: b.src, label: b.label, w: b.w ?? 4320, h: b.h ?? 4320 }] : [],
                )}
                title={p.title}
                variant="grid"
                cols={3}
                captions={false}
                railOnMobile={p.styleGuideRailOnMobile}
              />
            </div>
          </section>
        </>
      )}

      {/* ── SCREENS — จอแอปแยกตาม section (แบบ Propertyhub App) ── */}
      {p.appScreens && p.appScreens.length > 0 && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section id="s-screens" className="scroll-mt-24">
            <H2>Final User Interface</H2>
            {/* พื้นเทาผืนเดียว แบ่งกลุ่มด้วยชื่อหน้า · กริด 3 จอต่อแถว ไม่มี scroll แนวนอน
                (treatment เดียวกับ Final User Interface ของ Propertyhub App — user สั่ง 17 ส.ค. 2026) */}
            <div className="mt-8">
              <AppScreensShowcase groups={p.appScreens} />
            </div>
          </section>
        </>
      )}

      {/* ── CRAFT SHOWCASE ── ผ่าหน้า final เป็นบล็อก + เหตุผลของแต่ละบล็อก (โครงเดียวกับ renthub)
          วางก่อน Final User Interface เพื่อให้อ่านที่มาของแต่ละส่วนก่อนเห็นหน้าเต็ม */}
      {p.craft && p.craft.items.length > 0 && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <CraftShowcase title={p.title} intro={p.craft.intro} items={p.craft.items} />
        </>
      )}

      {/* ── SCREENS — หน้าเว็บแยกตาม category (พื้นเทา + header + จอเรียง scroll แนวนอน · แบบ App) ── */}
      {p.webScreens && p.webScreens.length > 0 && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section id="s-webscreens" className="scroll-mt-24">
            <H2>Final User Interface</H2>
            <div className="mt-8 flex flex-col gap-6">
              {p.webScreens.map((c) =>
                c.phone ? (
                  // Mobile section — จอมือถือขนาดเท่า App projects · ไม่มี lightbox
                  <AppScreensShowcase
                    key={c.category}
                    title={c.category}
                    variant="grid"
                    screens={c.screens.flatMap((s) => (s.src ? [{ src: s.src, label: s.label ?? "" }] : []))}
                  />
                ) : (
                  // desktop — วางเดี่ยวเรียงลงมาเต็มความกว้าง (cols=1 แบบหน้า Propertyhub)
                  // แบบเดิม (rail — จอเต็มสูง เลื่อนแนวนอน) · เก็บไว้เผื่อกลับมาใช้
                  // <WebScreensPanel key={c.category} title={c.category} screens={c.screens} />
                  <WebScreensPanel key={c.category} title={c.category} screens={c.screens} variant="grid" cols={1} />
                ),
              )}
            </div>
          </section>
        </>
      )}

      {/* ── footer nav (prev / next) — ลำดับอิงเมนู sidebar ── */}
      <ProjectNav slug={slug} />
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
