"use client";

// StyleGuideViewer — ตัวอย่างการโชว์ Style Guide แบบ course/video-player:
// sidebar รายการซ้าย (Color / Typography / Icon) → main viewer โชว์บอร์ดที่เลือก
// → แถบ thumbnail ล่างกดสลับได้ (adapt เป็น light mode ตามระบบสีเว็บ)

import * as React from "react";
import Image from "next/image";

type Board = { label: string; src: string; w: number; h: number };

export function StyleGuideViewer({ items }: { items: Board[] }) {
  const [active, setActive] = React.useState(0);
  const cur = items[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid md:grid-cols-[210px_minmax(0,1fr)]">
        {/* sidebar */}
        <nav className="flex gap-1 border-b border-border p-3 md:flex-col md:border-b-0 md:border-r">
          {items.map((it, i) => (
            <button
              key={it.label}
              type="button"
              onClick={() => setActive(i)}
              className={
                "flex-1 rounded-lg px-3.5 py-2.5 text-left text-[14px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand md:flex-none " +
                (i === active
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground hover:bg-hover hover:text-foreground")
              }
            >
              {it.label}
            </button>
          ))}
        </nav>

        {/* main viewer — บอร์ดที่เลือก (scroll ในกรอบ) */}
        <div className="max-h-[560px] min-w-0 overflow-y-auto bg-hover/40 p-4">
          <Image
            key={cur.src}
            src={cur.src}
            alt={`Style guide — ${cur.label}`}
            width={cur.w}
            height={cur.h}
            sizes="(max-width: 900px) 100vw, 640px"
            quality={88}
            className="block h-auto w-full rounded-lg bg-background shadow-[0_10px_30px_-18px_rgba(30,50,90,0.35)]"
          />
        </div>
      </div>

      {/* thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto border-t border-border p-3 [scrollbar-width:thin]">
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={it.label}
            className={
              "group relative h-[64px] w-[104px] shrink-0 overflow-hidden rounded-lg border-2 bg-background outline-none transition-colors focus:outline-none focus-visible:outline-none " +
              (i === active ? "border-brand" : "border-border hover:border-brand/40")
            }
          >
            <Image
              src={it.src}
              alt=""
              width={it.w}
              height={it.h}
              sizes="104px"
              className="h-auto w-full"
            />
            <span
              className={
                "absolute inset-x-0 bottom-0 bg-foreground/80 py-0.5 text-center text-[10px] font-medium text-background " +
                (i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100")
              }
            >
              {it.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
