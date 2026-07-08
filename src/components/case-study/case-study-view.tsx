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
import { ScreenGallery } from "./screen-gallery";

// ── shared building blocks ──────────────────────────────────────────────────

function Spacer() {
  return <div className="h-[50px]" />;
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

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 text-[16px] leading-[1.5] text-muted-foreground">
      <span className="h-[5px] w-[5px] shrink-0 -translate-y-[3px] rounded-full bg-faint" />
      <span>{children}</span>
    </div>
  );
}

function PlaceholderSlot({ label, ratio }: { label: string; ratio: string }) {
  return (
    <div
      className="flex items-center justify-center bg-hover"
      style={{ aspectRatio: ratio }}
    >
      <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
        {label}
      </span>
    </div>
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

  return (
    <article className="py-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        {/* availability status — blinking dot */}
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[12.5px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Project available
        </span>

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>
        <p className="mt-3 text-[16px] leading-[1.7] text-muted-foreground">
          {p.tagline}
        </p>

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

          {/* primary action */}
          {p.liveUrl && p.liveUrl !== "#" && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
            >
              <Rocket className="h-4 w-4" />
              เปิดดูเว็บไซต์
            </a>
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

        {/* live scrollable window of the full homepage — 50px จากเส้นคั่น */}
        <div className="mt-[50px]">
          <ScrollWindow
            src="/uploads/propertyhub-home-full.jpg"
            url="propertyhub.in.th"
            alt="Propertyhub homepage — full page"
            width={1600}
            height={7403}
            priority
          />
        </div>
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

      <Spacer />

      {/* ── TOOLS ── */}
      <section>
        <H2>Tools</H2>
        <div className="mt-5 flex flex-wrap gap-3 min-[560px]:flex-nowrap">
          {p.tools.map((tool) => (
            <ToolCard key={tool} name={tool} />
          ))}
        </div>
      </section>

      {/* ── SCREENS (จอที่ออกแบบ) — stacked labeled frames ── */}
      {p.screens && p.screens.length > 0 && (
        <>
          <Spacer />
          <section>
            <H2>Screens</H2>
            <p className="mt-2 text-[14px] text-faint">กดที่ภาพเพื่อดูเต็มจอ</p>
            <div className="mt-[26px]">
              <ScreenGallery screens={p.screens} title={p.title} />
            </div>
          </section>
        </>
      )}

      <Spacer />

      {/* ── 2 · CONTEXT & CONSTRAINT ── */}
      <section>
        <H2>Context & Constraint</H2>
        <div className="mt-[26px]">
          <H3>The Business</H3>
          <Body className="mt-2.5">{p.ctxBusiness}</Body>
        </div>
        <div className="mt-[26px]">
          <H3>The Problem</H3>
          <Body className="mt-2.5">{p.ctxProblem}</Body>
        </div>
        <div className="mt-[26px]">
          <H3>Constraint</H3>
          <div className="mt-3.5 flex flex-col gap-[11px]">
            {p.constraints.map((c, i) => (
              <Bullet key={i}>{c}</Bullet>
            ))}
          </div>
        </div>
      </section>

      <Spacer />

      {/* ── 3 · HYPOTHESIS ── */}
      <section>
        <H2>Hypothesis</H2>
        <div className="mt-6 rounded-r-xl border-l-[3px] border-foreground bg-hover px-[26px] py-6">
          <p className="text-[clamp(18px,2vw,21px)] leading-[1.62] text-foreground">
            {p.hypothesis}
          </p>
        </div>
        <div className="mt-[30px] grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <div>
            <h3 className="text-[15px] font-normal tracking-[0.02em] text-foreground">
              Success Metrics <span className="text-[13px] text-faint">(ตั้งก่อนทำ)</span>
            </h3>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {p.successMetrics.map((m, i) => (
                <Bullet key={i}>{m}</Bullet>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-normal tracking-[0.02em] text-foreground">
              Guardrail Metrics <span className="text-[13px] text-faint">(ต้องไม่ลด)</span>
            </h3>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {p.guardrailMetrics.map((m, i) => (
                <Bullet key={i}>{m}</Bullet>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Spacer />

      {/* ── 4 · DESIGN DECISIONS ── */}
      <section>
        <H2>Design Decisions</H2>
        <Body className="mt-[18px]">{p.decisionsIntro}</Body>
        <div className="mt-[30px] flex flex-col gap-[22px]">
          {p.decisions.map((d, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="border-b border-border">
                <PlaceholderSlot label="screen · แทนที่ด้วยภาพ decision" ratio="16/6" />
              </div>
              <div className="px-[26px] pb-7 pt-[26px]">
                <div className="text-[12px] uppercase tracking-[0.12em] text-faint">
                  Decision {i + 1}
                </div>
                <h3 className="mt-2 text-[clamp(19px,2.1vw,22px)] font-normal tracking-[-0.01em] text-foreground">
                  {d.title}
                </h3>
                <div className="mt-[22px] grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                  {[
                    { k: "Reasoning", v: d.reasoning },
                    { k: "Trade-off", v: d.tradeoff },
                    { k: "What I cut", v: d.cut },
                  ].map((row) => (
                    <div key={row.k}>
                      <div className="text-[12.5px] uppercase tracking-[0.1em] text-foreground">
                        {row.k}
                      </div>
                      <p className="mt-2.5 text-[15px] leading-[1.66] text-muted-foreground">
                        {row.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Spacer />

      {/* ── 5 · EXPERIMENT SETUP ── */}
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

      <Spacer />

      {/* ── 6 · RESULTS ── */}
      <section>
        <H2>Results</H2>

        {/* primary metric */}
        <div className="mt-[26px] rounded-xl border border-foreground bg-hover px-[clamp(26px,4vw,40px)] py-[clamp(26px,4vw,40px)]">
          <div className="text-[12px] uppercase tracking-[0.14em] text-faint">
            Primary Metric
          </div>
          <div className="mt-3.5 text-[16px] text-muted-foreground">
            {p.resultPrimary.label}
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-4">
            <span className="text-[clamp(30px,5vw,46px)] tracking-[-0.02em] text-faint">
              {p.resultPrimary.before}
            </span>
            <span className="text-[clamp(24px,3vw,32px)] text-faint">→</span>
            <span className="text-[clamp(38px,7vw,64px)] leading-none tracking-[-0.03em] text-foreground">
              {p.resultPrimary.after}
            </span>
          </div>
          <div className="mt-3.5 text-[16px] text-muted-foreground">
            {p.resultPrimary.delta}
          </div>
        </div>

        {/* secondary metrics */}
        <div className="mt-5 overflow-hidden rounded-lg border border-border">
          {p.resultsSecondary.map((row, i) => (
            <div
              key={i}
              className={
                "flex items-center justify-between gap-4 px-[18px] py-3.5" +
                (i < p.resultsSecondary.length - 1 ? " border-b border-border" : "")
              }
            >
              <span className="text-[15px] text-foreground">{row.label}</span>
              <span className="text-right text-[15px] tabular-nums text-muted-foreground">
                {row.change}
              </span>
            </div>
          ))}
        </div>

        {/* device breakdown */}
        <div className="mt-[34px]">
          <H3>Device Breakdown</H3>
          <div className="mt-4 overflow-hidden rounded-lg border border-border tabular-nums">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-border bg-hover">
              {["Device", "Before", "After", "Change"].map((h, i) => (
                <span
                  key={h}
                  className={
                    "px-[18px] py-3.5 text-[12px] uppercase tracking-[0.08em] text-faint" +
                    (i === 0 ? "" : " text-right")
                  }
                >
                  {h}
                </span>
              ))}
            </div>
            {p.devices.map((d, i) => (
              <div
                key={d.device}
                className={
                  "grid grid-cols-[1.4fr_1fr_1fr_1fr]" +
                  (i < p.devices.length - 1 ? " border-b border-border" : "")
                }
              >
                <span className="px-[18px] py-3.5 text-[15px] text-foreground">{d.device}</span>
                <span className="px-[18px] py-3.5 text-right text-[15px] text-muted-foreground">{d.before}</span>
                <span className="px-[18px] py-3.5 text-right text-[15px] text-muted-foreground">{d.after}</span>
                <span className="px-[18px] py-3.5 text-right text-[15px] text-foreground">{d.change}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[30px]">
          <H3>What surprised me</H3>
          <Body className="mt-2.5">{p.surprised}</Body>
        </div>
        <div className="mt-[26px]">
          <H3>Limitation</H3>
          <Body className="mt-2.5">{p.limitation}</Body>
        </div>

        {/* GA4 screenshot slot */}
        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <PlaceholderSlot label="screenshot GA4 / Clarity · blur sensitive" ratio="16/7" />
        </div>
      </section>

      <Spacer />

      {/* ── 7 · REFLECTION ── */}
      <section>
        <H2>What I&apos;d Do Differently</H2>
        <div className="mt-[26px]">
          <H3>Hypothesis ที่ควร challenge มากกว่านี้</H3>
          <Body className="mt-2.5">{p.reflectChallenge}</Body>
        </div>
        <div className="mt-[26px]">
          <H3>Metric ที่ควร track เพิ่ม</H3>
          <div className="mt-3.5 flex flex-col gap-[11px]">
            {p.reflectTrack.map((t, i) => (
              <Bullet key={i}>{t}</Bullet>
            ))}
          </div>
        </div>
        <div className="mt-[26px]">
          <H3>ถ้ามี resource ที่ขาด</H3>
          <div className="mt-3.5 flex flex-col gap-[11px]">
            {p.reflectResource.map((r, i) => (
              <Bullet key={i}>{r}</Bullet>
            ))}
          </div>
        </div>
        <div className="mt-[26px]">
          <H3>Discipline lesson</H3>
          <Body className="mt-2.5">{p.reflectLesson}</Body>
        </div>
      </section>

      {/* ── footer nav (prev / next) ── */}
      <div className="mt-[clamp(56px,8vw,90px)] flex flex-col items-stretch gap-6 border-t border-border pt-8 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
        {prevSlug ? (
          <Link href={`/work/${prevSlug}`} className="group inline-flex items-center gap-[22px] text-left">
            <span className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground">
              <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={1.8} />
            </span>
            <span className="flex flex-col items-start gap-1 leading-none">
              <span className="text-[13px] uppercase tracking-[0.22em] text-faint">Previous</span>
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
            <span className="text-[13px] uppercase tracking-[0.22em] text-faint">Next</span>
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
