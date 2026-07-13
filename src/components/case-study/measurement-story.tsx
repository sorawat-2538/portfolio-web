"use client";

import * as React from "react";
import Image from "next/image";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Img = { src: string; caption: string; w: number; h: number };
type Measure = NonNullable<Project["measure"]>;

/** Fullscreen, scrollable view of a single image. */
function Lightbox({
  img,
  title,
  onClose,
}: {
  img: Img;
  title: string;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
        <span className="min-w-0 truncate text-sm font-medium">
          {title} — {img.caption}
        </span>
        <button
          type="button"
          aria-label="ปิด"
          onClick={onClose}
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
  );
}

/** One framed, clickable screenshot (crops tall shots). */
function Shot({
  img,
  title,
  onOpen,
}: {
  img: Img;
  title: string;
  onOpen: (img: Img) => void;
}) {
  const tall = img.h > img.w;
  return (
    <figure className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(img)}
        aria-label={`ดู ${img.caption} เต็มจอ`}
        className="group relative block w-full cursor-pointer"
      >
        <div
          className={`relative overflow-hidden rounded-lg border border-border shadow-[0_4px_14px_-4px_rgba(30,50,90,0.2)] ${
            tall ? "max-h-[440px]" : ""
          }`}
        >
          <Image
            src={img.src}
            alt={`${title} — ${img.caption}`}
            width={img.w}
            height={img.h}
            sizes="(max-width: 900px) 100vw, 660px"
            quality={88}
            className="block h-auto w-full"
          />
          {tall && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/85 to-transparent" />
          )}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1.5 text-[12px] font-medium text-foreground opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
            เต็มจอ
          </span>
        </div>
      </button>
      <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-muted-foreground">
        {img.caption}
      </figcaption>
    </figure>
  );
}

/** Swipeable slider for a step with multiple images (scroll-snap + arrows + dots). */
function Slider({
  images,
  title,
  onOpen,
}: {
  images: Img[];
  title: string;
  onOpen: (img: Img) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [idx, setIdx] = React.useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = Math.max(0, Math.min(images.length - 1, i));
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img) => (
          <div key={img.src} className="w-full shrink-0 snap-center px-0.5">
            <Shot img={img} title={title} onOpen={onOpen} />
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        type="button"
        aria-label="ก่อนหน้า"
        onClick={() => go(idx - 1)}
        disabled={idx === 0}
        className="absolute left-2 top-[38%] inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow ring-1 ring-border backdrop-blur transition disabled:cursor-default disabled:opacity-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="ถัดไป"
        onClick={() => go(idx + 1)}
        disabled={idx === images.length - 1}
        className="absolute right-2 top-[38%] inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow ring-1 ring-border backdrop-blur transition disabled:cursor-default disabled:opacity-0"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="mt-3 flex justify-center gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`ไปภาพที่ ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-5 bg-brand" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** "How I Measured?" — goal callout + numbered timeline with clickable images. */
export function MeasurementStory({
  measure,
  title,
}: {
  measure: Measure;
  title: string;
}) {
  const [active, setActive] = React.useState<Img | null>(null);

  return (
    <section>
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
        How I Measured?
      </h2>

      {/* goal — callout like Hypothesis */}
      <div className="mt-6 rounded-r-xl border-l-[3px] border-foreground bg-hover px-[26px] py-6">
        <p className="text-[clamp(18px,2vw,21px)] leading-[1.62] text-foreground">
          {measure.goal}
        </p>
      </div>

      {/* steps — numbered timeline */}
      <div className="mt-[38px] flex flex-col">
        {measure.steps.map((s, i) => {
          const last = i === measure.steps.length - 1;
          const imgs = (s.images ?? []) as Img[];
          return (
            <div key={i} className="relative flex gap-5 pb-12 last:pb-0 sm:gap-6">
              {/* left: filled number chip + connecting line */}
              <div className="relative flex shrink-0 flex-col items-center">
                {!last && (
                  <span className="absolute left-1/2 top-[52px] bottom-0 w-[2px] -translate-x-1/2 bg-border" />
                )}
                <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-brand text-[22px] font-bold tabular-nums text-white shadow-[0_8px_20px_-6px_rgba(45,104,255,0.5)]">
                  {i + 1}
                </span>
              </div>

              {/* right: content + image(s) */}
              <div className="min-w-0 flex-1 pb-2">
                <h3 className="text-[clamp(19px,2.1vw,22px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[66ch] text-[16px] leading-[1.75] text-muted-foreground">
                  {s.body}
                </p>

                {imgs.length > 1 ? (
                  <div className="mt-5">
                    <Slider images={imgs} title={title} onOpen={setActive} />
                  </div>
                ) : imgs.length === 1 ? (
                  <div className="mt-5">
                    <Shot img={imgs[0]} title={title} onOpen={setActive} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {active && (
        <Lightbox img={active} title={title} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
