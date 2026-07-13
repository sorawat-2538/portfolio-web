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
  MousePointerClick,
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

/** "Works" gallery — full-page screenshots, placed as-is with just a soft shadow
 *  (no frame, no radius, no border, no captions). Click a shot → fullscreen scroll.
 *  Three layouts via the toggle: 3-across grid, 2-across grid, or a horizontal
 *  scroll row that shows ~2.5 shots so it reads as scrollable. */
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const open = active !== null ? screens[active] : null;

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

      {/* guideline — tell the reader the frames are clickable to view full work */}
      {view === "window" && (
        <p className="mb-5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <MousePointerClick className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.8} />
          กดที่หน้าต่างเพื่อดูผลงานเต็ม
        </p>
      )}

      {view === "window" ? (
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
          {screens.map((s, i) =>
            s.src ? (
              <button
                key={`${s.label}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`ดู ${s.label} เต็มจอ`}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-[12px] border border-border bg-card text-left shadow-[0_18px_44px_-20px_rgba(30,50,90,0.28)] transition-shadow duration-200 hover:shadow-[0_26px_60px_-22px_rgba(30,50,90,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
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
                  {/* persistent click affordance (not hover-only) */}
                  <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/80 px-4 py-2 text-[12.5px] font-medium text-white shadow-sm backdrop-blur transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Maximize2 className="h-3.5 w-3.5" />
                    กดเพื่อดูผลงานเต็ม
                  </span>
                </div>

                {/* label */}
                <div className="border-t border-border px-4 py-3.5">
                  <div className="text-[14.5px] font-semibold leading-snug text-foreground">
                    {s.label}
                  </div>
                  {s.desc && (
                    <div className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">
                      {s.desc}
                    </div>
                  )}
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
      ) : view === "nav" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[230px_1fr]">
          {/* left: list of works */}
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

          {/* right: preview of the selected work — scroll inside, click = fullscreen */}
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

      {/* fullscreen lightbox — whole page, scrollable */}
      {open?.src && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 text-white">
            <span className="text-sm font-medium">
              {title} — {open.label}
            </span>
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setActive(null)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto px-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-3xl overflow-hidden">
              <Image
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
