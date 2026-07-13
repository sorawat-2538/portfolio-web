"use client";

import * as React from "react";
import Image from "next/image";
import { X, Maximize2, ArrowRight, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";

type Claude = NonNullable<Project["claude"]>;

/** "How Claude Helped" — flow diagram of the working method, then the insight
 *  it surfaced (stat contrast + Session Explorer shot), then the role-shift note. */
export function ClaudeSection({
  claude,
  title,
}: {
  claude: Claude;
  title: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const img = claude.insight.image;

  return (
    <section>
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
        How Claude Helped
      </h2>
      <p className="mt-[18px] max-w-[68ch] text-[17px] leading-[1.8] text-muted-foreground">
        {claude.intro}
      </p>

      {/* flow diagram — method */}
      <div className="mt-7 rounded-xl border border-border bg-card px-[clamp(18px,3vw,30px)] py-[clamp(20px,3vw,28px)]">
        <div className="mb-5 inline-flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-brand">
          <Sparkles className="h-3.5 w-3.5" />
          Workflow
        </div>
        <div className="flex flex-col items-stretch gap-3 min-[680px]:flex-row min-[680px]:items-center">
          {claude.flow.map((node, i) => (
            <React.Fragment key={node.label}>
              <div className="flex-1 rounded-[11px] border border-border bg-hover px-4 py-3.5 text-center min-[680px]:min-w-0">
                <div className="text-[14.5px] font-semibold text-foreground">{node.label}</div>
                <div className="mt-1 text-[12px] leading-snug text-muted-foreground">{node.sub}</div>
              </div>
              {i < claude.flow.length - 1 && (
                <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-faint min-[680px]:rotate-0" strokeWidth={1.6} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* insight — the finding */}
      <div className="mt-6 overflow-hidden rounded-xl border border-brand/40 bg-brand/[0.04]">
        <div className="px-[clamp(20px,3vw,30px)] pt-[clamp(20px,3vw,28px)]">
          <div className="text-[12px] uppercase tracking-[0.14em] text-brand">Insight</div>
          <p className="mt-2.5 max-w-[64ch] text-[clamp(16px,1.9vw,19px)] font-medium leading-[1.6] text-foreground">
            {claude.insight.lead}
          </p>

          {/* stat contrast */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {claude.insight.stats.map((st, i) => (
              <div
                key={i}
                className={`rounded-xl border px-4 py-4 ${
                  i === claude.insight.stats.length - 1
                    ? "border-brand/50 bg-brand/[0.06]"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className={`text-[clamp(26px,4vw,34px)] font-bold leading-none tracking-[-0.02em] ${
                    i === claude.insight.stats.length - 1 ? "text-brand" : "text-foreground"
                  }`}
                >
                  {st.value}
                </div>
                <div className="mt-2 text-[13px] leading-snug text-muted-foreground">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-[66ch] text-[16px] leading-[1.75] text-muted-foreground">
            {claude.insight.takeaway}
          </p>
        </div>

        {/* Session Explorer shot — clickable */}
        <div className="mt-6 px-[clamp(20px,3vw,30px)] pb-[clamp(20px,3vw,28px)]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`ดู ${img.caption} เต็มจอ`}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border shadow-[0_4px_14px_-4px_rgba(30,50,90,0.2)]"
          >
            <Image
              src={img.src}
              alt={`${title} — ${img.caption}`}
              width={img.w}
              height={img.h}
              sizes="(max-width: 900px) 100vw, 680px"
              quality={88}
              className="block h-auto w-full"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1.5 text-[12px] font-medium text-foreground opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
              เต็มจอ
            </span>
          </button>
          <p className="mt-2.5 text-[13px] leading-[1.5] text-muted-foreground">{img.caption}</p>
        </div>
      </div>

      {/* closing — role shift */}
      <p className="mt-7 max-w-[68ch] text-[17px] leading-[1.8] text-foreground">
        {claude.closing}
      </p>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="min-w-0 truncate text-sm font-medium">
              {title} — {img.caption}
            </span>
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={`${title} — ${img.caption}`}
                width={img.w}
                height={img.h}
                sizes="(max-width: 1024px) 100vw, 900px"
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
