"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Columns2,
  Columns3,
  GalleryHorizontal,
  PanelLeft,
  Maximize2,
  AppWindow,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Screen = {
  label: string;
  src?: string;
  desc?: string;
  url?: string;
  w?: number;
  h?: number;
};

type View = "grid3" | "grid2" | "scroll" | "nav" | "window";

// Only the "window" view is live right now. The other layouts (toggle + grid /
// scroll / nav) are kept below behind SHOW_ALT_VIEWS in case we want them back.
const SHOW_ALT_VIEWS = false;

/** "Works" gallery. Live view = browser-window frames (static top-crop). Click a
 *  frame → fullscreen lightbox with prev/next so you can browse without closing. */
export function ScreenGallery({
  screens,
  title,
  cols = 3,
  allowToggle = true,
}: {
  screens: Screen[];
  title: string;
  cols?: 2 | 3;
  allowToggle?: boolean;
}) {
  const [active, setActive] = React.useState<number | null>(null);
  const [view, setView] = React.useState<View>(cols === 2 ? "grid2" : "grid3");
  const [sel, setSel] = React.useState(0);

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight")
        setActive((a) => (a === null ? a : Math.min(screens.length - 1, a + 1)));
      else if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : Math.max(0, a - 1)));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, screens.length]);

  const open = active !== null ? screens[active] : null;
  const idx = active ?? 0;

  // used by the (currently disabled) grid / scroll layouts
  const shot = (s: Screen, i: number, extra = "") =>
    s.src ? (
      <button
        key={`${s.label}-${i}`}
        type="button"
        onClick={() => setActive(i)}
        aria-label={`ดู ${s.label} เต็มจอ`}
        className={`block cursor-pointer overflow-hidden bg-white shadow-[0_3px_12px_-3px_rgba(30,50,90,0.16)] transition-shadow duration-200 hover:shadow-[0_8px_20px_-6px_rgba(30,50,90,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${extra}`}
      >
        <Image
          src={s.src}
          alt={`${title} — ${s.label}`}
          width={s.w ?? 1600}
          height={s.h ?? 5000}
          sizes="(max-width: 640px) 100vw, 380px"
          unoptimized
          className="block h-auto w-full"
        />
      </button>
    ) : (
      <div
        key={`${s.label}-${i}`}
        className={`flex h-[280px] items-center justify-center bg-hover ${extra}`}
      >
        <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
          {s.label} · แทนที่ด้วยภาพจริง
        </span>
      </div>
    );

  const toggles: { key: View; label: string; icon: React.ReactNode }[] = [
    { key: "window", label: "หน้าต่าง", icon: <AppWindow className="h-3.5 w-3.5" /> },
    { key: "grid3", label: "3 คอลัมน์", icon: <Columns3 className="h-3.5 w-3.5" /> },
    { key: "grid2", label: "2 คอลัมน์", icon: <Columns2 className="h-3.5 w-3.5" /> },
    { key: "scroll", label: "เลื่อน", icon: <GalleryHorizontal className="h-3.5 w-3.5" /> },
    { key: "nav", label: "รายการ", icon: <PanelLeft className="h-3.5 w-3.5" /> },
  ];

  const selected = screens[Math.min(sel, screens.length - 1)];

  return (
    <>
      {/* ── LIVE: window view — browser frames, static top-crop ── */}
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
        {screens.map((s, i) =>
          s.src ? (
            <button
              key={`${s.label}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`ดู ${s.label} เต็มจอ`}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-[12px] border border-border bg-card shadow-[0_18px_44px_-20px_rgba(30,50,90,0.28)] transition-shadow duration-200 hover:shadow-[0_26px_60px_-22px_rgba(30,50,90,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {/* chrome — matches the Hero (ScrollWindow) */}
              <div className="flex items-center gap-3 border-b border-border bg-hover px-4 py-3">
                <span className="flex shrink-0 gap-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-3 py-1 text-[12.5px] text-muted-foreground ring-1 ring-border">
                  <Lock className="h-3 w-3 shrink-0 text-faint" strokeWidth={2.2} />
                  <span className="truncate">{s.url ?? "propertyhub.in.th"}</span>
                </span>
              </div>

              {/* static top-crop — no inner scroll */}
              <div className="relative h-[clamp(280px,40vh,440px)] overflow-hidden bg-white">
                <Image
                  src={s.src}
                  alt={`${title} — ${s.label}`}
                  width={s.w ?? 1600}
                  height={s.h ?? 5000}
                  sizes="(max-width: 640px) 100vw, 520px"
                  unoptimized
                  className="block h-auto w-full"
                />
                {/* fade to hint there's more below the crop */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/70 to-transparent" />
              </div>
            </button>
          ) : (
            <div
              key={`${s.label}-${i}`}
              className="flex h-[320px] items-center justify-center rounded-[12px] border border-border bg-hover"
            >
              <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
                {s.label} · แทนที่ด้วยภาพจริง
              </span>
            </div>
          ),
        )}
      </div>

      {/* ── ALT VIEWS (kept for later; disabled) ── */}
      {SHOW_ALT_VIEWS && (
        <>
          {allowToggle && (
            <div className="mb-5 hidden justify-end sm:flex">
              <div
                role="group"
                aria-label="เลือกการแสดงผล"
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
              >
                {toggles.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setView(t.key)}
                    aria-pressed={view === t.key}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                      view === t.key
                        ? "bg-brand text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === "nav" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[230px_1fr]">
              <div className="flex flex-col gap-2.5">
                {screens.map((s, i) => (
                  <button
                    key={`${s.label}-${i}`}
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={sel === i}
                    className={`w-full cursor-pointer rounded-xl px-4 py-3.5 text-left transition-colors ${
                      sel === i
                        ? "bg-foreground text-background"
                        : "bg-hover text-foreground hover:bg-border/50"
                    }`}
                  >
                    <div className="text-[14.5px] font-semibold leading-snug">{s.label}</div>
                    {s.desc && (
                      <div
                        className={`mt-1 line-clamp-2 text-[12.5px] leading-snug ${
                          sel === i ? "text-background/70" : "text-muted-foreground"
                        }`}
                      >
                        {s.desc}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selected?.src ? (
                <div className="group relative min-w-0">
                  <div className="h-[clamp(360px,56vh,560px)] overflow-y-auto overscroll-auto rounded-xl border border-border bg-white shadow-[0_3px_12px_-3px_rgba(30,50,90,0.16)] [scrollbar-width:thin]">
                    <Image
                      src={selected.src}
                      alt={`${title} — ${selected.label}`}
                      width={selected.w ?? 1600}
                      height={selected.h ?? 5000}
                      sizes="(max-width: 900px) 100vw, 700px"
                      unoptimized
                      className="block h-auto w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(sel)}
                    aria-label={`ดู ${selected.label} เต็มจอ`}
                    className="absolute right-3 top-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-[12px] font-medium text-foreground opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-opacity hover:bg-background focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    เต็มจอ
                  </button>
                </div>
              ) : (
                <div className="flex h-[360px] items-center justify-center rounded-xl bg-hover">
                  <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
                    {selected?.label} · แทนที่ด้วยภาพจริง
                  </span>
                </div>
              )}
            </div>
          ) : view === "scroll" ? (
            <div className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 [scrollbar-width:thin]">
              {screens.map((s, i) =>
                shot(s, i, "w-[80%] shrink-0 snap-start self-start sm:w-[40%]"),
              )}
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 items-start gap-5 sm:gap-6 ${
                view === "grid2" ? "sm:grid-cols-2" : "sm:grid-cols-3"
              }`}
            >
              {screens.map((s, i) => shot(s, i))}
            </div>
          )}
        </>
      )}

      {/* fullscreen lightbox — whole page, scrollable, with prev/next */}
      {open?.src && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="min-w-0 truncate text-sm font-medium">
              {title} — {open.label}
              <span className="ml-2 text-white/50">
                {idx + 1} / {screens.length}
              </span>
            </span>
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setActive(null)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* prev / next — prev hidden on first, next hidden on last */}
          {idx > 0 && (
            <button
              type="button"
              aria-label="ผลงานก่อนหน้า"
              onClick={(e) => {
                e.stopPropagation();
                setActive(idx - 1);
              }}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {idx < screens.length - 1 && (
            <button
              type="button"
              aria-label="ผลงานถัดไป"
              onClick={(e) => {
                e.stopPropagation();
                setActive(idx + 1);
              }}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 sm:right-5"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <div
            className="flex-1 overflow-y-auto px-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-3xl overflow-hidden">
              <Image
                key={open.src}
                src={open.src}
                alt={`${title} — ${open.label}`}
                width={open.w ?? 1600}
                height={open.h ?? 5000}
                sizes="(max-width: 900px) 100vw, 768px"
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
