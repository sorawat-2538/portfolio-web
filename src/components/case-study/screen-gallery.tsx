"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

type Screen = { label: string; src?: string };

function WindowDots() {
  return (
    <span className="flex gap-1.5">
      <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
      <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
      <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
    </span>
  );
}

/** Compact paired thumbnails (crop to top) → click opens a fullscreen,
 *  scrollable view of the whole screenshot. */
export function ScreenGallery({
  screens,
  title,
}: {
  screens: Screen[];
  title: string;
}) {
  const [active, setActive] = React.useState<number | null>(null);

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

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {screens.map((s, i) => (
          <button
            key={`${s.label}-${i}`}
            type="button"
            onClick={() => s.src && setActive(i)}
            className="group block overflow-hidden rounded-xl border border-border bg-hover text-left"
          >
            <div className="relative flex items-center border-b border-border bg-card px-4 py-2.5">
              <span className="absolute left-4">
                <WindowDots />
              </span>
              <span className="w-full text-center text-[12.5px] text-muted-foreground">
                {s.label}
              </span>
            </div>
            {s.src ? (
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={s.src}
                  alt={`${title} — ${s.label}`}
                  width={2880}
                  height={12658}
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
                <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-[12px] font-medium text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" />
                  ดูเต็มจอ
                </span>
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center">
                <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
                  {s.label} · แทนที่ด้วยภาพจริง
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* lightbox */}
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
              aria-label="Close"
              onClick={() => setActive(null)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl">
              <Image
                src={open.src}
                alt={`${title} — ${open.label}`}
                width={2880}
                height={12658}
                className="block h-auto w-full"
                sizes="(max-width: 900px) 100vw, 768px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
