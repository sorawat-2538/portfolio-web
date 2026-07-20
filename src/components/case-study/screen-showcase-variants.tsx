"use client";

// 2 ตัวอย่างการวาง "Screens" (นอกจาก browser-frame gallery):
//   ScreensStack  — รูปเต็มความกว้าง crop สูงคงที่ + ปุ่ม "ดูทั้งหมด" ขยาย inline (ทีละหน้า)
//   ScreensViewer — thumbnail เลือกหน้า + main crop + ปุ่ม "ดูทั้งหมด"
// ทั้งคู่รับ screens ชุดเดียวกับ ScreenGallery ({ label, src, desc, url, w, h })

import * as React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

type Screen = {
  label: string;
  src?: string;
  desc?: string;
  url?: string;
  w?: number;
  h?: number;
};

const CROP = "clamp(320px,52vh,520px)";

function ShotImage({ s, title }: { s: Screen; title: string }) {
  return (
    <Image
      src={s.src as string}
      alt={`${title} — ${s.label}`}
      width={s.w ?? 1600}
      height={s.h ?? 5000}
      sizes="(max-width: 900px) 100vw, 860px"
      unoptimized
      className="block h-auto w-full"
    />
  );
}

function ExpandButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[13.5px] font-medium text-foreground outline-none transition-colors hover:bg-hover focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      {open ? (
        <>
          ย่อลง
          <ChevronUp className="h-4 w-4" />
        </>
      ) : (
        <>
          ดูทั้งหมด
          <ChevronDown className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

/** ── Example 2 — รูปเต็ม crop สูงคงที่ + กด "ดูทั้งหมด" ขยาย inline (แต่ละหน้าแยกกัน) ── */
export function ScreensStack({
  screens,
  title,
}: {
  screens: Screen[];
  title: string;
}) {
  const [open, setOpen] = React.useState<Record<number, boolean>>({});

  return (
    <div className="space-y-10">
      {screens.map((s, i) =>
        s.src ? (
          <figure key={s.src}>
            <figcaption className="mb-3">
              <span className="text-[15px] font-semibold text-foreground">{s.label}</span>
              {s.desc && (
                <span className="mt-1 block text-[14px] leading-[1.7] text-muted-foreground">
                  {s.desc}
                </span>
              )}
            </figcaption>

            <div className="overflow-hidden rounded-[12px] border border-border bg-white shadow-[0_18px_44px_-24px_rgba(30,50,90,0.3)]">
              <div
                className="relative overflow-hidden"
                style={{ maxHeight: open[i] ? "none" : CROP }}
              >
                <ShotImage s={s} title={title} />
                {!open[i] && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/70 to-transparent" />
                )}
              </div>
            </div>

            <ExpandButton open={!!open[i]} onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} />
          </figure>
        ) : null,
      )}
    </div>
  );
}

/** ── Example 3 — thumbnail เลือกหน้า + main crop สูงคงที่ + กด "ดูทั้งหมด" ── */
export function ScreensViewer({
  screens,
  title,
}: {
  screens: Screen[];
  title: string;
}) {
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const cur = screens[active];

  const select = (i: number) => {
    setActive(i);
    setOpen(false); // สลับหน้าแล้วกลับไปโหมด crop
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto border-b border-border p-3 [scrollbar-width:thin]">
        {screens.map((s, i) =>
          s.src ? (
            <button
              key={s.src}
              type="button"
              onClick={() => select(i)}
              aria-label={s.label}
              aria-pressed={i === active}
              className={
                "group relative h-[70px] w-[112px] shrink-0 overflow-hidden rounded-lg border-2 bg-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand " +
                (i === active ? "border-brand" : "border-border hover:border-brand/40")
              }
            >
              <Image
                src={s.src}
                alt=""
                width={s.w ?? 1600}
                height={s.h ?? 5000}
                sizes="112px"
                unoptimized
                className="h-auto w-full"
              />
              <span
                className={
                  "absolute inset-x-0 bottom-0 truncate bg-foreground/80 px-1.5 py-0.5 text-center text-[10px] font-medium text-background " +
                  (i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100")
                }
              >
                {s.label}
              </span>
            </button>
          ) : null,
        )}
      </div>

      {/* main — หน้าที่เลือก */}
      <div className="p-4 sm:p-5">
        <div className="mb-3">
          <span className="text-[15px] font-semibold text-foreground">{cur.label}</span>
          {cur.desc && (
            <span className="mt-1 block text-[14px] leading-[1.7] text-muted-foreground">
              {cur.desc}
            </span>
          )}
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border bg-white">
          <div
            className="relative overflow-hidden"
            style={{ maxHeight: open ? "none" : CROP }}
          >
            {cur.src && <ShotImage s={cur} title={title} />}
            {!open && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/70 to-transparent" />
            )}
          </div>
        </div>

        <ExpandButton open={open} onClick={() => setOpen((v) => !v)} />
      </div>
    </div>
  );
}
