import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
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
import { getNextSlug, getPrevSlug, projects } from "@/data/projects";
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
import { ClaudeSection } from "./claude-section";
import { WorkflowProcess } from "./workflow-process";
import { StatusBadge } from "./status-badge";

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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[17px] font-normal tracking-[0.01em] text-foreground">
      {children}
    </h3>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={"text-[17px] leading-[1.8] text-muted-foreground " + className}>
      {children}
    </p>
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
  const nextSlug = getNextSlug(slug);
  const prevSlug = getPrevSlug(slug);
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
    <article className="pt-5 pb-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        {/* availability status — badge ตาม p.status (Available / On Process / Coming Soon) */}
        <StatusBadge status={p.status ?? "available"} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

        {/* identity + action bar (product-page style) */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* who — avatar + name + role */}
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

          {/* primary action — full-width บนมือถือ / auto บน desktop */}
          {p.liveUrl && p.liveUrl !== "#" && (
            <div className="flex w-full shrink-0 flex-wrap gap-2.5 sm:w-auto">
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                <Rocket className="h-4 w-4" />
                เปิดดูเว็บไซต์
              </a>
            </div>
          )}
        </div>

        {/* divider between the action bar and the hero */}
        <div className="mt-6 border-t border-border" />

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

      {/* ── 1 · OVERVIEW ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {p.overview.map((para, i) => (
            <Body key={i}>{para}</Body>
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── TOOLS ── (grid 4 คอลัมน์ → กล่องเดียวก็กว้างเท่าเดิม ไม่ยืดเต็ม) */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5 grid grid-cols-2 gap-3 min-[560px]:grid-cols-4">
          {p.tools.map((tool) => (
            <ToolCard key={tool} name={tool} />
          ))}
        </div>
      </section>

      {/* ── MY WORK FLOW ── (ซ่อนได้ด้วย hideWorkflow) */}
      {!p.hideWorkflow && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section>
            <H2>How do I work?</H2>
            <div className="mt-[26px]">
              <WorkflowProcess />
            </div>
          </section>
        </>
      )}

      {/* ── ALL ABOUT WORKS — the designed screens ── */}
      {((p.webScreens && p.webScreens.length > 0) ||
        (p.screens && p.screens.length > 0)) && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <section>
            <H2>Screens</H2>
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
                    <WebScreensPanel key={c.category} title={c.category} screens={c.screens} variant="grid" />
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

      {/* ── HOW I MEASURED ── (ซ่อนได้ด้วย hideMeasure) */}
      {!p.hideMeasure && (
      <>
      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
      {p.measure ? (
        <MeasurementStory measure={p.measure} title={p.title} />
      ) : (
      <section>
        <H2>How I Measured</H2>
        <div className="mt-6">
          <H3>Why manual A/B test</H3>
          <Body className="mt-2.5">{p.expWhy}</Body>
        </div>

        <div className="mt-[26px] grid gap-px overflow-hidden rounded-lg border border-border bg-border [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {[
            { k: "Segmentation", v: p.expSegment },
            { k: "Tracking", v: p.expTracking },
            { k: "Duration", v: p.expDuration },
            { k: "Sample", v: p.expSample },
          ].map((m) => (
            <div key={m.k} className="bg-card px-[22px] py-5">
              <div className="text-[11.5px] uppercase tracking-[0.12em] text-faint">
                {m.k}
              </div>
              <div className="mt-2 text-[15px] leading-[1.5] text-foreground">
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* segmentation flow diagram */}
        <div className="mt-[22px] rounded-xl border border-border bg-card px-[clamp(22px,3vw,34px)] py-[clamp(22px,3vw,34px)]">
          <div className="mb-[22px] text-[11.5px] uppercase tracking-[0.12em] text-faint">
            Manual segmentation flow
          </div>
          <div className="flex flex-col items-stretch gap-3.5 min-[560px]:flex-row min-[560px]:items-center min-[560px]:gap-4">
            <div className="flex-1 rounded-[11px] border border-border bg-hover px-3.5 py-4 text-center min-[560px]:min-w-[120px]">
              <div className="text-[14px] text-foreground">ผู้ใช้เข้าเว็บ</div>
              <div className="mt-[5px] text-[12px] text-faint">assign by user ID</div>
            </div>
            <ArrowRight className="mx-auto h-[26px] w-[26px] shrink-0 rotate-90 text-faint min-[560px]:rotate-0" strokeWidth={1.5} />
            <div className="flex flex-1 flex-col gap-3 min-[560px]:min-w-[120px]">
              <div className="rounded-[11px] border border-border bg-card px-3.5 py-3.5 text-center">
                <div className="text-[14px] text-foreground">Variant A</div>
                <div className="mt-1 text-[12px] text-faint">design เดิม</div>
              </div>
              <div className="rounded-[11px] border border-foreground bg-card px-3.5 py-3.5 text-center">
                <div className="text-[14px] text-foreground">Variant B</div>
                <div className="mt-1 text-[12px] text-faint">design ใหม่</div>
              </div>
            </div>
            <ArrowRight className="mx-auto h-[26px] w-[26px] shrink-0 rotate-90 text-faint min-[560px]:rotate-0" strokeWidth={1.5} />
            <div className="flex-1 rounded-[11px] border border-border bg-hover px-3.5 py-4 text-center min-[560px]:min-w-[120px]">
              <div className="text-[14px] text-foreground">GA4 + Clarity</div>
              <div className="mt-[5px] text-[12px] text-faint">track &amp; เทียบ conversion</div>
            </div>
          </div>
        </div>
      </section>
      )}
      </>
      )}

      {/* ── HOW CLAUDE HELPED ── (เส้นคั่นปิดท้าย How I Measured? ก่อนเข้า section นี้) */}
      {p.claude && (
        <>
          <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />
          <ClaudeSection claude={p.claude} title={p.title} />
        </>
      )}

      {/* ── footer nav (prev / next) ── */}
      <div className="mt-[clamp(56px,8vw,90px)] flex flex-col items-stretch gap-6 border-t border-border pt-8 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
        {prevSlug ? (
          <Link href={`/work/${prevSlug}`} className="group inline-flex items-center gap-[22px] text-left">
            <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground">
              <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={1.8} />
            </span>
            <span className="flex flex-col items-start gap-1 leading-none">
              <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
                {projects[prevSlug].title}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        <Link href={`/work/${nextSlug}`} className="group inline-flex items-center justify-end gap-[22px] text-right">
          <span className="flex flex-col items-end gap-1 leading-none">
            <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
              {projects[nextSlug].title}
            </span>
          </span>
          <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground">
            <ArrowRight className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </span>
        </Link>
      </div>
    </article>
  );
}
