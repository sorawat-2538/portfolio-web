import Image from "next/image";
import {
  Activity,
  LayoutGrid,
  Lock,
  MousePointerClick,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Project, ProjectSlug } from "@/data/projects";
import { profile } from "@/data/profile";
import { toolMeta } from "@/data/tools";
import { CodeEditorMock } from "./code-editor-mock";
import { ProductMock } from "./product-mock";
import { ScrollWindow } from "./scroll-window";
import { CropWindow } from "./crop-window";
import { LaptopMock } from "./laptop-mock";
import { WebScreensPanel } from "./web-screens-panel";
import { AppScreensShowcase } from "./app-screens-showcase";
import { MeasurementStory } from "./measurement-story";
import { DecisionFigures } from "./decision-figures";
import { SectionNav, type NavSection } from "./section-nav";
import { ProcessSection, hasProcess, isPlaceholder } from "./process-section";
import { CraftShowcase } from "./craft-showcase";
import { StatusBadge } from "./status-badge";
import { ProjectNav } from "./project-nav";

// ── shared building blocks ──────────────────────────────────────────────────

function Spacer() {
  return <div className="h-8 min-[900px]:h-[50px]" />;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

function H3({ children, bold = false }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <h3
      className={`text-[17px] tracking-[0.01em] text-foreground ${
        bold ? "font-bold" : "font-normal"
      }`}
    >
      {children}
    </h3>
  );
}

/** หัวข้อย่อยใน decision (Problem / Trade-off / Validation) — ขนาดเท่า body (17px) แต่ตัวหนา */
function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[17px] font-bold tracking-[0.01em] text-foreground">{children}</h4>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={"text-[17px] leading-[1.8] text-muted-foreground " + className}>
      {children}
    </p>
  );
}

function Divider() {
  return <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />;
}


/** isPlaceholder = ค่าที่ยังเป็น placeholder "[ ... ]" ใน data/projects.ts — ห้ามหลุดขึ้นหน้าเว็บ
 *  ทุก section ใหม่กรองด้วยตัวนี้ ทำให้โปรเจกต์ที่ยังไม่ได้กรอกข้อมูลจริงซ่อน section นั้นไปเอง
 *  (ย้ายไปนิยามที่ process-section.tsx เพื่อให้หน้าที่ใช้ view คนละตัวเรียกใช้ร่วมกันได้) */
function realItems(xs?: readonly string[]) {
  return (xs ?? []).filter((x) => !isPlaceholder(x));
}

/** ประโยคเด่น — callout ส้ม ชุดเดียวกับ Takeaway ใน propertyos-view / claude-section */
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-r-xl border-l-[3px] border-amber-500 bg-amber-400/[0.12] px-[clamp(18px,2.4vw,26px)] py-[clamp(16px,2vw,22px)]">
      <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.62] text-foreground">
        {children}
      </p>
    </div>
  );
}

function BulletList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={"space-y-2.5 " + className}>
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[17px] leading-[1.8] text-muted-foreground">
          <span className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}


/** Browser window mockup — chrome + address bar (URL จริง) + จอ scroll ได้ข้างใน */
function BrowserFrame({
  src,
  alt,
  url,
  priority,
}: {
  src?: string;
  alt: string;
  url?: string;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full select-none overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1a2b] shadow-[0_28px_60px_-20px_rgba(8,15,30,0.6)]">
      {/* ── CHROME BAR (dark) ── */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0f1f33] px-4 py-3">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        {url && (
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-[12.5px] text-slate-300 ring-1 ring-white/10">
            <Lock className="h-3 w-3 shrink-0 text-slate-400" strokeWidth={2.2} />
            <span className="truncate">{url}</span>
          </span>
        )}
      </div>

      {/* ── SCREEN — capture นิ่ง (crop ส่วนบน ไม่ scroll) ── */}
      {src ? (
        <div className="h-[clamp(300px,42vw,400px)] overflow-hidden bg-[#0d1a2b]">
          <Image
            src={src}
            alt={alt}
            width={2880}
            height={12658}
            className="block h-auto w-full"
            sizes="(max-width: 900px) 100vw, 760px"
            priority={priority}
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-white/[0.03]">
          <span className="font-mono text-[11px] tracking-[0.05em] text-slate-500">
            screen · แทนที่ด้วยภาพจริง
          </span>
        </div>
      )}
    </div>
  );
}

const BADGE_ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Users,
  Activity,
  LayoutGrid,
  MousePointerClick,
  Zap,
};

/** การ์ด stat ลอยบน hero (portpro-style) — พื้นขาวโปร่ง เงานุ่ม ไอคอนน้ำเงิน */
function HeroBadge({
  icon,
  value,
  label,
  className = "",
}: {
  icon: string;
  value: string;
  label: string;
  className?: string;
}) {
  const Icon = BADGE_ICONS[icon] ?? TrendingUp;
  return (
    <div
      className={
        "absolute z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-10px_rgba(30,50,90,0.28)] backdrop-blur-sm min-[560px]:flex " +
        className
      }
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2d68ff]/10 text-[#2d68ff]">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-[-0.01em] text-foreground">
          {value}
        </span>
        <span className="block text-[11.5px] text-muted-foreground">{label}</span>
      </span>
    </div>
  );
}

function ToolCard({ name }: { name: string }) {
  const meta = toolMeta(name);
  return (
    <div className="flex min-h-[70px] flex-1 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
      {"icon" in meta ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.icon}
          alt={name}
          width={30}
          height={30}
          className="block h-[30px] w-[30px] shrink-0 object-contain"
        />
      ) : (
        <span
          className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg text-[13px] font-bold"
          style={{ background: meta.bg, color: meta.fg }}
        >
          {meta.mono}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-[15px] text-foreground">
        {name}
      </span>
    </div>
  );
}

// ── full case study ─────────────────────────────────────────────────────────

export function CaseStudyView({
  slug,
  project: p,
}: {
  slug: ProjectSlug;
  project: Project;
}) {
  // section Solution — ปิดไว้ก่อน (user สั่ง 13 ส.ค. 2026 "เอาออกไปก่อน เก็บไว้อย่าเพิ่งลบทิ้ง")
  // เหตุผล: เนื้อหาซ้ำกับ Decision 1/2 ที่เล่าไปแล้ว + หัวข้อย่อย "Final Design" ชนกับ section
  // "Final User Interface" · ข้อมูล `solution` ใน projects.ts ยังอยู่ครบ เปลี่ยนเป็น true เพื่อเปิดคืน
  const SHOW_SOLUTION = false;

  // Business Goal — statement รับได้ทั้งย่อหน้าเดียว (string) และหลายย่อหน้า (string[])
  const statement = p.problem?.statement ?? p.ctxProblem;
  const goalParas = Array.isArray(statement) ? statement : [statement];

  // ── สารบัญลอยขอบขวา ──
  // เงื่อนไขแต่ละข้อต้องตรงกับเงื่อนไข render ของ section นั้นเป๊ะ ไม่งั้นสารบัญจะชี้ไปที่ไม่มีอยู่
  // สารบัญลอยขอบขวา — ปิดทุกหน้าแล้ว (user สั่ง 17 ส.ค. 2026 · propertyhub เป็นหน้าสุดท้ายที่เอาออก)
  // ตั้งเป็น true เพื่อเปิดคืน แล้วใส่ slug ที่ต้องการใน NAV_SLUGS
  // (view อื่นมีสวิตช์ชื่อเดียวกันของตัวเอง — placeholder / propertyhub-app / propertyos / data-analysis / early-work)
  const SHOW_SECTION_NAV = false;
  const NAV_SLUGS: string[] = ["propertyhub"];
  const navSections: NavSection[] = ([
    { id: "s-overview", label: "Overview", show: true },
    { id: "s-context", label: "Tools", show: true },
    { id: "s-achievement", label: "Achievement", show: Boolean(p.achievement?.length) },
    { id: "s-goal", label: "Business Goal", show: !isPlaceholder(goalParas[0]) },
    {
      id: "s-process",
      label: "Process & Key Decisions",
      show: hasProcess(p.decisions),
    },
    {
      id: "s-craft",
      label: "Craft Showcase",
      show: Boolean(p.craft?.items.length),
    },
    {
      id: "s-solution",
      label: "Solution",
      show: SHOW_SOLUTION && Boolean(p.solution && p.solution.points.length > 0),
    },
    { id: "s-impact", label: "Impact & Results", show: !p.hideMeasure },
    {
      id: "s-screens",
      label: "Final User Interface",
      show: Boolean(p.webScreens?.length) || Boolean(p.screens?.length),
    },
    {
      id: "s-reflection",
      label: "Reflection",
      show: Boolean(
        p.reflection?.body.length ||
          !isPlaceholder(p.reflectLesson) ||
          !isPlaceholder(p.reflectChallenge),
      ),
    },
  ] as (NavSection & { show: boolean })[])
    .filter((s) => s.show)
    .map(({ id, label }) => ({ id, label }));

  // host สำหรับ address bar ของ browser mockup (ตัด protocol + / ท้าย)
  const heroUrl =
    p.liveUrl && p.liveUrl !== "#"
      ? p.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : undefined;

  // hero เดิม (ProductMock + รูป static) เก็บโค้ดไว้ก่อน — เปลี่ยนเป็น true เพื่อกลับมาแสดง
  const SHOW_HERO_MOCKS = false;

  // hero visual variant — สลับได้ที่เดียว:
  //   "scroll" = v1 browser chrome + เลื่อนดูในกรอบ
  //   "crop"   = v2 crop นิ่ง ไม่มีกรอบ/มุมโค้ง/scroll
  //   "laptop" = v3 MacBook mockup (รูป home crop ในจอ)
  const HERO_VARIANT = "scroll" as "scroll" | "crop" | "laptop";
  // ชั่วคราว: วางทั้ง 3 variant เรียงกันเพื่อเทียบบนหน้า — เลือกได้แล้วตั้งเป็น false
  const HERO_COMPARE = false;
  // hero อันเก่า (scroll/crop/laptop) — เลือกใช้ Web+App present แทนแล้ว เก็บโค้ดไว้ก่อน
  const SHOW_OLD_HERO = false;

  const heroSrc = "/uploads/propertyhub-home-full.jpg";
  const renderHero = (v: "scroll" | "crop" | "laptop") => {
    if (v === "crop")
      return <CropWindow src={heroSrc} alt={p.title} width={1600} height={7403} priority />;
    if (v === "laptop")
      return <LaptopMock src={heroSrc} alt={p.title} width={1600} height={7403} priority />;
    return (
      <ScrollWindow src={heroSrc} url="propertyhub.in.th" alt={p.title} width={1600} height={7403} priority />
    );
  };
  const HERO_LABELS: Record<string, string> = {
    scroll: "v1 — scroll (แบบเดิม)",
    crop: "v2 — crop นิ่ง",
    laptop: "v3 — MacBook mockup",
  };

  return (
    <article className="pt-5 pb-5 font-sans font-normal min-[900px]:py-[50px]">
      {SHOW_SECTION_NAV && NAV_SLUGS.includes(slug) && <SectionNav sections={navSections} />}

      {/* ── HEADER ── */}
      <section>
        {/* availability status — badge ตาม p.status (Available / On Process / Coming Soon) */}
        <StatusBadge status={p.status ?? "available"} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

        {/* identity + action bar (product-page style) */}
        <div className="mt-5 flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          {/* who — avatar + name + role */}
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

          {/* primary action — full-width บนมือถือ / auto บน desktop */}
          {p.liveUrl && p.liveUrl !== "#" && (
            <div className="flex w-full shrink-0 flex-wrap gap-2.5 min-[900px]:w-auto">
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 min-[900px]:w-auto"
              >
                <Rocket className="h-4 w-4" />
                เปิดดูเว็บไซต์
              </a>
            </div>
          )}
        </div>

        {/* divider between the action bar and the hero */}
        <div className="mt-5 border-t border-border" />

        {/* hero เดิม (ProductMock + รูป static) — เก็บไว้ก่อน; ตั้ง SHOW_HERO_MOCKS=true เพื่อกลับมาแสดง */}
        {SHOW_HERO_MOCKS && (
          <>
        {/* hero: MacBook mockup ในกรอบ gradient + floating badge (portpro-style) */}
        <div className="mt-8">
          <div className="relative px-[clamp(0px,3vw,32px)] py-[clamp(8px,3vw,28px)]">
            <div className="relative mx-auto max-w-[760px]">
              {p.heroMock === "product" ? (
                <ProductMock url={heroUrl} />
              ) : p.heroMock === "code" ? (
                <CodeEditorMock />
              ) : p.heroImage ? (
                <BrowserFrame
                  src={p.heroImage}
                  alt={p.title}
                  url={heroUrl}
                  priority
                />
              ) : (
                <CodeEditorMock />
              )}

              {/* floating badges — overhang the mockup corners */}
              {p.heroBadges?.[0] && (
                <HeroBadge {...p.heroBadges[0]} className="-right-5 top-8" />
              )}
              {p.heroBadges?.[1] && (
                <HeroBadge {...p.heroBadges[1]} className="-left-5 bottom-8" />
              )}
            </div>
          </div>
        </div>

        {/* second example — optimized (AVIF/WebP, right-sized per device) but
            quality 90 so UI text/edges stay crisp; lazy-loads by default */}
        <div className="mt-6">
          <Image
            src="/uploads/propertyhub-preview.jpg"
            alt="Propertyhub homepage — aura.build preview"
            width={2764}
            height={1819}
            quality={90}
            sizes="(min-width: 900px) 788px, 100vw"
            className="block h-auto w-full"
          />
        </div>
          </>
        )}

        {/* hero (อันเก่า) — scroll/crop/laptop variant · เก็บโค้ดไว้ (SHOW_OLD_HERO=false) */}
        {SHOW_OLD_HERO && (
          <div className="mt-[50px]">
            {HERO_COMPARE ? (
              <div className="flex flex-col gap-14">
                {(["scroll", "crop", "laptop"] as const).map((v) => (
                  <div key={v}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
                      <span className="font-mono uppercase tracking-[0.1em] text-brand">
                        Hero
                      </span>
                      {HERO_LABELS[v]}
                    </div>
                    {renderHero(v)}
                  </div>
                ))}
              </div>
            ) : (
              renderHero(HERO_VARIANT)
            )}
          </div>
        )}

        {/* ── HERO — Laptop (เว็บ) + App (มือถือ) วางคู่แบบ present ── */}
        {p.heroWeb && p.heroPhone && (
          <div className="mt-8 min-[900px]:mt-[50px]">
            <div className="relative mx-auto max-w-[860px] pr-[2%]">
              <Image
                src={p.heroWeb}
                alt={`${p.title} — เว็บไซต์ (laptop mockup)`}
                width={2174}
                height={1318}
                sizes="(max-width: 900px) 100vw, 860px"
                className="block h-auto w-full"
                priority
              />
              {/* phone overlapping bottom-right — สัดส่วนคงที่ทุกจอ (ไม่ใช้ min-width) */}
              <Image
                src={p.heroPhone}
                alt={`${p.title} — แอปมือถือ`}
                width={660}
                height={1320}
                sizes="(max-width: 900px) 22vw, 190px"
                className="absolute bottom-0 right-0 w-[22%] drop-shadow-[0_22px_44px_-16px_rgba(15,25,45,0.5)]"
              />
            </div>
          </div>
        )}
      </section>

      <Spacer />

      {/* ── 1 · OVERVIEW ── ทำอะไร ให้ใคร ผลลัพธ์อะไร (ตัวเลขจริง)
          + ย่อหน้าบทบาท/ทีม (context.body) ต่อท้ายเป็นอีกย่อหน้าในหัวข้อเดียวกัน
          14 ส.ค. 2026: เคยลองแยกเป็นบรรทัด "Duration:" / "Role:" แล้ว user สั่งกลับมาเป็นย่อหน้า */}
      <section id="s-overview" className="scroll-mt-24">
        <H2>Overview</H2>

        <div className="mt-[22px] space-y-[18px]">
          {p.overview.map((para, i) => (
            <Body key={`ov-${i}`}>{para}</Body>
          ))}
          {p.context?.body?.map((para, i) => (
            <Body key={`ctx-${i}`}>{para}</Body>
          ))}
        </div>

        {p.context?.responsibilities && p.context.responsibilities.length > 0 && (
          <div className="mt-8">
            <H3>สิ่งที่รับผิดชอบ</H3>
            <BulletList items={p.context.responsibilities} className="mt-3.5" />
          </div>
        )}
      </section>

      {/* ── 2 · TOOLS ── section ใหญ่ของตัวเอง (grid 4 คอลัมน์ → กล่องเดียวก็กว้างเท่าเดิม ไม่ยืดเต็ม) */}
      <Divider />
      <section id="s-context" className="scroll-mt-24">
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          {p.tools.map((tool) => (
            <ToolCard key={tool} name={tool} />
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENT ── ผลลัพธ์หลังเปิดตัว วางใต้ Tools (user สั่ง 14 ส.ค. 2026)
          ข้อความล้วน ไม่มีการ์ด/กล่อง · ไม่มี p.achievement = ไม่แสดง section */}
      {p.achievement && p.achievement.length > 0 && (
        <>
          <Divider />
          <section id="s-achievement" className="scroll-mt-24">
            <H2>Achievement</H2>
            <div className="mt-[22px] space-y-[18px]">
              {p.achievement.map((para, i) => (
                <Body key={`ach-${i}`}>{para}</Body>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── 3 · BUSINESS GOAL ──
          statement เคยอยู่ใน callout ส้ม — ย้ายมาเป็นย่อหน้าปกติชุดเดียวกับ Overview
          หัวข้อย่อย "UX Challenge" จะขึ้นก็ต่อเมื่อ `problem.body` มีจริงเท่านั้น
          (propertyhub ย้าย body ไปเป็น Decision 1 แล้ว → section นี้เหลือย่อหน้าเป้าหมาย + รูป)
          โปรเจกต์ที่ยังใช้ fallback ctxProblem/ctxBusiness จะไม่มีหัวข้อย่อย (ไม่มี p.problem) */}
      {!isPlaceholder(goalParas[0]) && (
        <>
          <Divider />
          <section id="s-goal" className="scroll-mt-24">
            <H2>Business Goal</H2>

            <div className="mt-[22px] space-y-[18px]">
              {goalParas
                .filter((t) => !isPlaceholder(t))
                .map((para, i) => (
                  <Body key={`goal-${i}`}>{para}</Body>
                ))}
            </div>

            {/* รูปสรุปเป้าหมาย (flow ขยาย 8 ประเภท → รายได้) — วางใต้ย่อหน้า Business Goal */}
            {p.problem?.goalImage && (
              <div className="mt-8">
                <DecisionFigures
                  images={[p.problem.goalImage]}
                  title={p.title}
                  variant="single"
                />
              </div>
            )}

            {realItems(p.problem ? p.problem.body : [p.ctxBusiness]).length > 0 && (
              <div className="mt-8">
                {p.problem && <H3 bold>UX Challenge</H3>}
                <div className={p.problem ? "mt-3.5 space-y-[18px]" : "space-y-[18px]"}>
                  {realItems(p.problem ? p.problem.body : [p.ctxBusiness]).map((para, i) => (
                    <Body key={`ch-${i}`}>{para}</Body>
                  ))}
                </div>
              </div>
            )}

            {/* รูปประกอบปัญหา (เช่น field matrix) — แสดงเต็มความกว้าง ไม่ใส่กรอบ browser */}
            {p.problem?.images?.map((img) => (
              <figure key={img.src} className="mt-8">
                <Image
                  src={img.src}
                  alt={`${p.title} — ${img.label ?? "รูปประกอบ"}`}
                  width={img.w}
                  height={img.h}
                  sizes="(max-width: 900px) 100vw, 860px"
                  quality={90}
                  className="block h-auto w-full"
                />
                {img.label && (
                  <figcaption className="mt-3 text-center text-[13.5px] leading-[1.6] text-muted-foreground">
                    {img.label}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        </>
      )}

      {/* ── 4 · PROCESS & KEY DECISIONS ──
          โครงย้ายไปอยู่ที่ process-section.tsx แล้ว (ใช้ร่วมกับหน้างานอื่นที่ view คนละตัว)
          Design Process (แถบ 5 ขั้น) ก่อน แล้วตามด้วย decision ทีละหัวข้อ
          แต่ละ decision = Problem → Trade-off → Validation */}
      {hasProcess(p.decisions) && (
        <>
          <Divider />
          <ProcessSection
            title={p.title}
            decisions={p.decisions}
            // บล็อกนำ Design Process ขึ้นเฉพาะงานที่เขียน processNote ของตัวเองไว้ใน projects.ts
            note={p.processNote}
          />
        </>
      )}

      {/* ── CRAFT SHOWCASE ── ผ่าหน้า final ออกเป็นบล็อก + เหตุผลของแต่ละบล็อก
          วางก่อน Final User Interface เพื่อให้อ่านที่มาของแต่ละส่วนก่อนเห็นหน้าเต็ม
          ไม่มี p.craft = ไม่แสดง section (ตอนนี้มีเฉพาะ renthub) */}
      {p.craft && p.craft.items.length > 0 && (
        <>
          <Divider />
          <CraftShowcase title={p.title} intro={p.craft.intro} items={p.craft.items} />
        </>
      )}

      {/* ── 5 · SOLUTION ── สิ่งที่ออกแบบออกมาจริง แต่ละข้อผูกกลับไปที่ Problem
          แบ่งหัวข้อย่อย 2 อันตามสูตร: Final Design (ภาพรวมว่าหน้าถูกออกแบบให้ทำอะไร)
          → Design Decisions (แต่ละข้อ = สิ่งที่เปลี่ยน + เหตุผลที่ผูกกลับไปที่โจทย์) */}
      {SHOW_SOLUTION && p.solution && p.solution.points.length > 0 && (
        <>
          <Divider />
          <section id="s-solution" className="scroll-mt-24">
            <H2>Solution</H2>

            {p.solution.intro && (
              <div className="mt-[22px]">
                <H3 bold>Final Design</H3>
                <Body className="mt-3.5">{p.solution.intro}</Body>
              </div>
            )}

            <div className="mt-8">
              <H3 bold>Design Decisions</H3>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {p.solution.points.map((pt, i) => (
                <div key={pt.title} className="rounded-xl border border-border bg-card p-[clamp(20px,3vw,28px)]">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-[16px] font-bold tabular-nums text-white">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[19px] font-bold leading-snug tracking-[-0.01em] text-foreground">
                        {pt.title}
                      </h3>
                      <p className="mt-2.5 text-[16px] leading-[1.75] text-muted-foreground">
                        {pt.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* หมายเหตุ: section "My Work Flow" ย้ายไปหน้าแรกแล้ว (ก่อน Technical Skills)
          เพราะเป็น process กลาง ไม่ผูกกับโปรเจกต์ไหน → components/home/work-flow.tsx */}

      {/* ── 6 · IMPACT & RESULTS ── (ซ่อนได้ด้วย hideMeasure) */}
      {!p.hideMeasure && (
        <>
          <Divider />
          {p.measure ? (
            <div id="s-impact" className="scroll-mt-24">
              <MeasurementStory measure={p.measure} title={p.title} />
            </div>
          ) : (
            <section id="s-impact" className="scroll-mt-24">
              <H2>Impact &amp; Results</H2>
              {!isPlaceholder(p.expWhy) && (
                <div className="mt-6">
                  <H3>Why manual A/B test</H3>
                  <Body className="mt-2.5">{p.expWhy}</Body>
                </div>
              )}
            </section>
          )}

        </>
      )}

      {/* ── 7 · FINAL DESIGN — จอจริงทั้งหมดที่ออกแบบ ── */}
      {((p.webScreens && p.webScreens.length > 0) ||
        (p.screens && p.screens.length > 0)) && (
        <>
          <Divider />
          <section id="s-screens" className="scroll-mt-24">
            <H2>Final User Interface</H2>
            {p.webScreens && p.webScreens.length > 0 ? (
              // แยกตาม category (grid) — phone category = จอมือถือ (AppScreensShowcase) · ที่เหลือ = grid เว็บ
              <div className="mt-8 flex flex-col gap-6">
                {p.webScreens.map((c) =>
                  c.phone ? (
                    <AppScreensShowcase
                      key={c.category}
                      title={c.category}
                      screens={c.screens.flatMap((s) => (s.src ? [{ src: s.src, label: s.label ?? "" }] : []))}
                    />
                  ) : (
                    <WebScreensPanel key={c.category} title={c.category} screens={c.screens} variant="grid" cols={1} />
                  ),
                )}
              </div>
            ) : p.screensFull ? (
              // screensFull = โชว์รูปเต็มยาว (จอน้อย)
              <div className="mt-[26px] space-y-10">
                {p.screens!.map((s) =>
                  s.src ? (
                    <figure key={s.src}>
                      {s.desc && (
                        <figcaption className="mb-4 text-[15px] leading-[1.7] text-muted-foreground">
                          {s.desc}
                        </figcaption>
                      )}
                      <Image
                        src={s.src}
                        alt={`${p.title} — ${s.label}`}
                        width={s.w ?? 1600}
                        height={s.h ?? 5000}
                        sizes="(max-width: 900px) 100vw, 860px"
                        quality={88}
                        className="block h-auto w-full shadow-[0_22px_60px_-28px_rgba(30,50,90,0.4)]"
                      />
                    </figure>
                  ) : null,
                )}
              </div>
            ) : (
              <div className="mt-[26px]">
                {/* Screens — panel เทา (ยังไม่แยก category → ไม่ใส่ title) */}
                {/* แบบเดิม (rail — จอเต็มสูง เลื่อนแนวนอน) · เก็บไว้เผื่อกลับมาใช้ */}
                {/* <WebScreensPanel screens={p.screens!} /> */}
                <WebScreensPanel screens={p.screens!} variant="grid" />
              </div>
            )}
          </section>
        </>
      )}

      {/* ── 8 · REFLECTION — สิ่งที่เรียนรู้ / จะทำต่างไปถ้าได้ทำใหม่ (โชว์ growth mindset) ── */}
      {(p.reflection?.body.length ||
        !isPlaceholder(p.reflectLesson) ||
        !isPlaceholder(p.reflectChallenge)) && (
        <>
          <Divider />
          <section id="s-reflection" className="scroll-mt-24">
            <H2>Reflection</H2>

            {p.reflection?.body && p.reflection.body.length > 0 && (
              <div className="mt-[22px] space-y-[18px]">
                {p.reflection.body.map((para, i) => (
                  <Body key={i}>{para}</Body>
                ))}
              </div>
            )}

            {!isPlaceholder(p.reflectChallenge) && (
              <div className="mt-8">
                <H3>สมมติฐานที่ควร challenge ให้หนักกว่านี้</H3>
                <Body className="mt-2.5">{p.reflectChallenge}</Body>
              </div>
            )}

            {realItems(p.reflectTrack).length > 0 && (
              <div className="mt-8">
                <H3>สิ่งที่จะเก็บข้อมูลเพิ่มในรอบถัดไป</H3>
                <BulletList items={realItems(p.reflectTrack)} className="mt-3.5" />
              </div>
            )}

            {!isPlaceholder(p.reflectLesson) && <Callout>{p.reflectLesson}</Callout>}
          </section>
        </>
      )}

      {/* ── footer nav (prev / next) — ลำดับอิงเมนู sidebar ── */}
      <ProjectNav slug={slug} />
    </article>
  );
}
