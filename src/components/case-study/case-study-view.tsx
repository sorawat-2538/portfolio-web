import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Project, ProjectSlug } from "@/data/projects";
import { getNextSlug, getPrevSlug, projects } from "@/data/projects";

// ── small building blocks ───────────────────────────────────────────────────

function Spacer() {
  return <div className="h-[60px]" />;
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="text-[13px] tracking-[0.2em] text-faint">{n}</span>
      <h2 className="text-[clamp(20px,2.6vw,26px)] tracking-[-0.01em] text-foreground">
        {title}
      </h2>
    </div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16.5px] leading-[1.85] text-muted-foreground">{children}</p>
  );
}

// ── the full case study ─────────────────────────────────────────────────────

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
    <article className="mx-auto w-full max-w-3xl px-5 py-12 font-thai font-normal sm:px-8 sm:py-16 [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal">
      {/* back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับหน้าแรก
      </Link>

      {/* ── HEADER ── */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {p.category}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {p.year}
          </span>
        </div>

        <h1 className="mt-5 text-[clamp(30px,5vw,44px)] leading-[1.12] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>
        <p className="mt-4 text-[clamp(16px,1.6vw,18px)] leading-[1.7] text-muted-foreground">
          {p.tagline}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k} className="bg-card px-4 py-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-faint">
                {m.k}
              </div>
              <div className="mt-1.5 text-[13.5px] leading-snug text-foreground">
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* hero image or placeholder */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          {p.heroImage ? (
            <Image
              src={p.heroImage}
              alt={`${p.title} — final screen`}
              width={1600}
              height={1000}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-hover text-sm text-faint">
              final screen · แทนที่ด้วยภาพจริง
            </div>
          )}
        </div>

        {/* tools */}
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-md bg-hover px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </header>

      <Spacer />

      {/* ── 01 OVERVIEW ── */}
      <section>
        <SectionLabel n="01" title="Overview" />
        <div className="space-y-4">
          {p.overview.map((para, i) => (
            <Para key={i}>{para}</Para>
          ))}
        </div>
      </section>

      <Spacer />

      {/* ── 02 CONTEXT & CONSTRAINT ── */}
      <section>
        <SectionLabel n="02" title="Context & Constraint" />
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 text-[13px] uppercase tracking-[0.12em] text-faint">
              Business context
            </div>
            <Para>{p.ctxBusiness}</Para>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] uppercase tracking-[0.12em] text-faint">
              Problem
            </div>
            <Para>{p.ctxProblem}</Para>
          </div>
        </div>
        <ul className="mt-6 space-y-2">
          {p.constraints.map((c, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15.5px] leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      <Spacer />

      {/* ── 03 HYPOTHESIS ── */}
      <section>
        <SectionLabel n="03" title="Hypothesis" />
        <div className="rounded-r-xl border-l-[3px] border-foreground bg-hover px-6 py-6">
          <p className="text-[clamp(17px,2vw,21px)] leading-[1.5] text-foreground">
            {p.hypothesis}
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-[13px] uppercase tracking-[0.12em] text-faint">
              Success metrics
            </div>
            <ul className="space-y-1.5">
              {p.successMetrics.map((m, i) => (
                <li key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-[13px] uppercase tracking-[0.12em] text-faint">
              Guardrail metrics
            </div>
            <ul className="space-y-1.5">
              {p.guardrailMetrics.map((m, i) => (
                <li key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Spacer />

      {/* ── 04 DESIGN DECISIONS ── */}
      <section>
        <SectionLabel n="04" title="Design Decisions" />
        <Para>{p.decisionsIntro}</Para>
        <div className="mt-6 space-y-4">
          {p.decisions.map((d, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card px-6 py-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] tracking-[0.15em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(17px,2vw,20px)] tracking-[-0.01em] text-foreground">
                  {d.title}
                </h3>
              </div>
              <dl className="mt-4 space-y-3">
                {[
                  { k: "Reasoning", v: d.reasoning },
                  { k: "Trade-off", v: d.tradeoff },
                  { k: "What I cut", v: d.cut },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="text-[12.5px] uppercase tracking-[0.12em] text-faint">
                      {row.k}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <Spacer />

      {/* ── 05 EXPERIMENT SETUP ── */}
      <section>
        <SectionLabel n="05" title="Experiment Setup" />
        <Para>{p.expWhy}</Para>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {[
            { k: "Segment", v: p.expSegment },
            { k: "Tracking", v: p.expTracking },
            { k: "Duration", v: p.expDuration },
            { k: "Sample", v: p.expSample },
          ].map((m) => (
            <div key={m.k} className="bg-card px-4 py-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-faint">
                {m.k}
              </div>
              <div className="mt-1.5 text-[14px] leading-snug text-foreground">
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* diagram flow: users → Variant A/B → GA4 */}
        <div className="mt-6 flex flex-col items-stretch gap-3 rounded-2xl border border-border bg-hover px-5 py-6 text-center sm:flex-row sm:items-center">
          <div className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-[14px] text-foreground">
            ผู้ใช้
          </div>
          <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-faint sm:rotate-0" />
          <div className="flex-1 space-y-2">
            <div className="rounded-lg border border-border bg-card px-4 py-3 text-[14px] text-foreground">
              Variant A (เดิม)
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3 text-[14px] text-foreground">
              Variant B (ใหม่)
            </div>
          </div>
          <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-faint sm:rotate-0" />
          <div className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-[14px] text-foreground">
            GA4 + Clarity
          </div>
        </div>
      </section>

      <Spacer />

      {/* ── 06 RESULTS ── */}
      <section>
        <SectionLabel n="06" title="Results" />

        {/* primary result */}
        <div className="rounded-2xl border border-foreground bg-card px-6 py-7">
          <div className="text-[13px] uppercase tracking-[0.12em] text-faint">
            {p.resultPrimary.label}
          </div>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="text-[15px] text-muted-foreground line-through decoration-faint">
              {p.resultPrimary.before}
            </span>
            <ArrowRight className="h-4 w-4 text-faint" />
            <span className="text-[clamp(26px,4vw,38px)] tracking-[-0.02em] text-foreground">
              {p.resultPrimary.after}
            </span>
          </div>
          <div className="mt-2 text-[14px] text-muted-foreground">
            {p.resultPrimary.delta}
          </div>
        </div>

        {/* secondary results table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          {p.resultsSecondary.map((row, i) => (
            <div
              key={i}
              className={
                "flex items-center justify-between gap-4 px-5 py-3.5 text-[14.5px]" +
                (i < p.resultsSecondary.length - 1 ? " border-b border-border" : "")
              }
            >
              <span className="text-muted-foreground">{row.label}</span>
              <span className="text-right text-foreground">{row.change}</span>
            </div>
          ))}
        </div>

        {/* device breakdown table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-4 gap-4 border-b border-border bg-hover px-5 py-3 text-[12px] uppercase tracking-[0.1em] text-faint">
            <span>Device</span>
            <span className="text-right">Before</span>
            <span className="text-right">After</span>
            <span className="text-right">Change</span>
          </div>
          {p.devices.map((d, i) => (
            <div
              key={d.device}
              className={
                "grid grid-cols-4 gap-4 px-5 py-3 text-[14px]" +
                (i < p.devices.length - 1 ? " border-b border-border" : "")
              }
            >
              <span className="text-foreground">{d.device}</span>
              <span className="text-right text-muted-foreground">{d.before}</span>
              <span className="text-right text-muted-foreground">{d.after}</span>
              <span className="text-right text-foreground">{d.change}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-1.5 text-[13px] uppercase tracking-[0.12em] text-faint">
              สิ่งที่เซอร์ไพรส์
            </div>
            <Para>{p.surprised}</Para>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] uppercase tracking-[0.12em] text-faint">
              Limitation
            </div>
            <Para>{p.limitation}</Para>
          </div>
        </div>
      </section>

      <Spacer />

      {/* ── 07 REFLECTION ── */}
      <section>
        <SectionLabel n="07" title="Reflection — What I'd Do Differently" />
        <div className="space-y-6">
          <div>
            <div className="mb-1.5 text-[13px] uppercase tracking-[0.12em] text-faint">
              Challenge
            </div>
            <Para>{p.reflectChallenge}</Para>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-[13px] uppercase tracking-[0.12em] text-faint">
                จะ track เพิ่ม
              </div>
              <ul className="space-y-1.5">
                {p.reflectTrack.map((t, i) => (
                  <li key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[13px] uppercase tracking-[0.12em] text-faint">
                ถ้ามี resource เพิ่ม
              </div>
              <ul className="space-y-1.5">
                {p.reflectResource.map((r, i) => (
                  <li key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-r-xl border-l-[3px] border-foreground bg-hover px-6 py-5">
            <div className="mb-1.5 text-[13px] uppercase tracking-[0.12em] text-faint">
              Key lesson
            </div>
            <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.5] text-foreground">
              {p.reflectLesson}
            </p>
          </div>
        </div>

        {p.liveUrl && p.liveUrl !== "#" && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            เปิดดูเว็บไซต์
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </section>

      {/* ── footer nav (prev / next) ── */}
      <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8">
        {prevSlug ? (
          <Link
            href={`/work/${prevSlug}`}
            className="group flex flex-col gap-1 text-left"
          >
            <span className="text-xs uppercase tracking-[0.14em] text-faint">
              ← ก่อนหน้า
            </span>
            <span className="text-[15px] text-foreground transition-colors group-hover:text-muted-foreground">
              {projects[prevSlug].title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/work/${nextSlug}`}
          className="group flex flex-col gap-1 text-right"
        >
          <span className="text-xs uppercase tracking-[0.14em] text-faint">
            ถัดไป →
          </span>
          <span className="text-[15px] text-foreground transition-colors group-hover:text-muted-foreground">
            {projects[nextSlug].title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
