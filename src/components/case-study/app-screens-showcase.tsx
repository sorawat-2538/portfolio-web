"use client";

// AppScreensShowcase — จอมือถือวางบนพื้นเทา (#f3f3f1) แบบ present:
// header = text ตัวใหญ่ (uppercase) มุมซ้ายบน · ปุ่มเลื่อน ‹ › มุมขวาบน (โผล่เมื่อ > 4 จอ)
// padding: ตัว panel เว้นเฉพาะบน/ล่าง — ซ้าย/ขวาเป็น padding "ภายใน rail" (เป็น gutter ของจอแรก/
// จอสุดท้าย) จอเลยเลื่อนได้เต็มความกว้าง panel ไม่ดูเหมือนมุดใต้ padding

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Shot = { src: string; label: string };

export function AppScreensShowcase({
  title,
  screens,
}: {
  title: string;
  screens: Shot[];
}) {
  const railRef = React.useRef<HTMLDivElement>(null);
  const hasNav = screens.length > 4;

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden bg-[#f3f3f1] py-[clamp(18px,3vw,30px)]">
      {/* header — plain uppercase text + nav arrows */}
      <div className="mb-6 flex items-center justify-between gap-4 px-[clamp(18px,3vw,30px)]">
        <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground">
          {title}
        </h3>
        {hasNav && (
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => page(dir)}
                aria-label={dir === -1 ? "ก่อนหน้า" : "ถัดไป"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground outline-none transition-colors hover:bg-hover focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {dir === -1 ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* rail — full-width scroll; padding อยู่ "ในตัว rail" ทำหน้าที่เป็น gutter หัว/ท้าย */}
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(18px,3vw,30px)] pb-1 [-ms-overflow-style:none] [scroll-padding-inline:clamp(18px,3vw,30px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
      >
        {screens.map((s) => (
          <div
            key={s.src}
            className="w-[46%] shrink-0 snap-start sm:w-[190px] lg:w-[204px]"
          >
            <Image
              src={s.src}
              alt={s.label}
              width={660}
              height={1320}
              sizes="(max-width: 640px) 46vw, 200px"
              className="block h-auto w-full drop-shadow-[0_18px_40px_-22px_rgba(30,50,90,0.5)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
