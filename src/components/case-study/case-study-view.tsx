import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import type { Project, ProjectSlug } from "@/data/projects";
import { getNextSlug, getPrevSlug, projects } from "@/data/projects";
import { toolMeta } from "@/data/tools";
import { ScreenGallery } from "./screen-gallery";

// ── shared building blocks ──────────────────────────────────────────────────

function Spacer() {
  return <div className="h-[60px]" />;
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

/** macOS-style title bar (traffic-light dots + centered label) */
function WindowBar({ label }: { label?: string }) {
  return (
    <div className="relative flex items-center border-b border-border bg-card px-4 py-2.5">
      <span className="absolute left-4 flex gap-1.5">
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
      </span>
      {label && (
        <span className="w-full text-center text-[12.5px] text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

/** กรอบแสดงจอผลงาน
 *  chrome = แถบ title แบบ macOS · scroll=false = โชว์รูปเต็มไม่ scroll ในกรอบ */
function ScreenFrame({
  src,
  alt,
  label,
  priority,
  chrome,
  scroll = true,
}: {
  src?: string;
  alt: string;
  label?: string;
  priority?: boolean;
  chrome?: boolean;
  scroll?: boolean;
}) {
  const img = src ? (
    <Image
      src={src}
      alt={alt}
      width={2880}
      height={12658}
      className="block h-auto w-full"
      sizes="(max-width: 900px) 100vw, 780px"
      priority={priority}
    />
  ) : null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-hover">
      {chrome ? (
        <WindowBar label={label} />
      ) : label ? (
        <div className="border-b border-border bg-card px-4 py-2.5 text-[12.5px] text-muted-foreground">
          {label}
        </div>
      ) : null}

      {img ? (
        scroll ? (
          <div className="max-h-[560px] overflow-y-auto">{img}</div>
        ) : (
          img
        )
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center">
          <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
            {(label ?? "screen") + " · แทนที่ด้วยภาพจริง"}
          </span>
        </div>
      )}
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
  const meta = [
    { k: "Role", v: p.metaRole },
    { k: "Timeline", v: p.metaTimeline },
    { k: "Method", v: p.metaMethod },
    { k: "Scale", v: p.metaScale },
  ];
  const nextSlug = getNextSlug(slug);
  const prevSlug = getPrevSlug(slug);

  return (
    <article className="py-12 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER ── */}
      <section>
        <div className="text-[13px] uppercase tracking-[0.18em] text-faint">
          {p.category}
        </div>
        <h1 className="mt-2.5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>
        <p className="mt-3 line-clamp-1 text-[clamp(16px,1.7vw,19px)] text-muted-foreground">
          {p.tagline}
        </p>

        {/* action row (product-page style) */}
        <div className="mt-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2.5 text-[13.5px] text-muted-foreground">
            <span>{p.year}</span>
            <span className="text-faint">·</span>
            <span>{p.metaRole}</span>
          </div>
          {p.liveUrl && p.liveUrl !== "#" && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Rocket className="h-4 w-4" />
              Visit site
            </a>
          )}
        </div>

        {/* meta grid */}
        <div className="mt-8 grid gap-x-[30px] gap-y-[26px] [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          {meta.map((m) => (
            <div key={m.k}>
              <div className="text-[11.5px] uppercase tracking-[0.14em] text-faint">
                {m.k}
              </div>
              <div className="mt-2 text-[15px] leading-[1.5] text-foreground">
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* hero: scrollable 560px frame (keeps a tall screenshot compact) */}
        <div className="mt-[34px]">
          <ScreenFrame src={p.heroImage} alt={p.title} priority />
        </div>

        {/* tools */}
        <div className="mt-[40px]">
          <H2>Tools</H2>
          <div className="mt-5 flex flex-wrap gap-3 min-[560px]:flex-nowrap">
            {p.tools.map((tool) => (
              <ToolCard key={tool} name={tool} />
            ))}
          </div>
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

        <a
          href={p.liveUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[34px] inline-flex items-center gap-[11px] rounded-full bg-primary px-8 py-4 text-[16.5px] text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          <Rocket className="h-[19px] w-[19px]" strokeWidth={1.7} />
          เปิดดูเว็บไซต์
        </a>
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
