"use client";

// Early Work gallery — grid ของ project ต่อหมวด (SlideGrid) + sheet ตัวเดียวที่ครอบ
// ทุกหมวด (ArchiveGallery) เพื่อให้กดเปลี่ยน project ต่อเนื่อง "ข้ามหมวด" ได้ไม่สะดุด
//
// sheet สไตล์ Dribbble shot: ขาวเต็มความกว้างเลื่อนขึ้นจากล่าง
//  • close = ลอยนอก dialog มุมบนขวาจอ
//  • title (ชื่อ project) เลื่อนหายไปตอน scroll
//  • ผู้จัดทำ + ปุ่ม download = sticky navbar ตอน scroll
//  • body รูปทุกจอเรียงต่อกัน (พื้นขาว) · footer = guideline คีย์บอร์ด (Prev/Next/Esc)
// header + content กว้าง 1024px padding เท่ากัน (ซ้าย/ขวา align ตรงกัน)

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images, ExternalLink } from "lucide-react";
import { SLIDE_W, SLIDE_H, type ArchiveItem } from "@/data/early-work";
import { profile } from "@/data/profile";

type Ctx = { open: (globalIndex: number) => void };
const LightboxCtx = React.createContext<Ctx | null>(null);

/** grid ของ 1 หมวด — การ์ดกดเปิด sheet ที่ global index (offset + ตำแหน่งในหมวด) */
export function SlideGrid({ items, offset }: { items: ArchiveItem[]; offset: number }) {
  const ctx = React.useContext(LightboxCtx);
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <button
          key={it.srcs[0]}
          type="button"
          onClick={() => ctx?.open(offset + i)}
          aria-label={`ดู ${it.label}`}
          className="group block cursor-pointer text-left outline-none"
        >
          <div className="relative overflow-hidden rounded-[12px] bg-card shadow-[0_14px_36px_-20px_rgba(30,50,90,0.28)] transition-shadow duration-200 group-hover:shadow-[0_22px_50px_-22px_rgba(30,50,90,0.36)]">
            <Image
              src={it.srcs[0]}
              alt={it.label}
              width={SLIDE_W}
              height={SLIDE_H}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
              className="block h-auto w-full"
            />
            {it.srcs.length > 1 && (
              <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
                <Images className="h-3.5 w-3.5" />
                {it.srcs.length}
              </span>
            )}
          </div>
          <div className="mt-3 leading-tight">
            <div className="text-[15px] font-semibold text-foreground">{it.label}</div>
            {it.sub && <div className="mt-0.5 text-[13px] text-muted-foreground">{it.sub}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}

/** provider — ถือ state + render sheet ตัวเดียว ครอบทุกหมวด (นำทางต่อเนื่องข้ามหมวด) */
export function ArchiveGallery({
  items,
  children,
}: {
  items: ArchiveItem[];
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState<number | null>(null);
  // scrolled = เลื่อนพ้น title แล้ว (navbar sticky) → ย้าย close จากมุมบนเข้าไปใน navbar
  const [scrolled, setScrolled] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const go = React.useCallback(
    (dir: -1 | 1) =>
      setActive((a) => (a === null ? a : Math.min(items.length - 1, Math.max(0, a + dir)))),
    [items.length],
  );

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, go]);

  // เปลี่ยนโปรเจกต์แล้วเลื่อน body กลับบนสุด + reset สถานะ scroll
  React.useEffect(() => {
    if (active !== null && scrollRef.current) scrollRef.current.scrollTop = 0;
    setScrolled(false);
  }, [active]);

  const ctx = React.useMemo<Ctx>(() => ({ open: setActive }), []);
  const open = active !== null ? items[active] : null;

  return (
    <LightboxCtx.Provider value={ctx}>
      {children}

      {open && active !== null && (
        <div
          className="fixed inset-0 z-[100] flex justify-center bg-black/60 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mt-[5dvh] flex h-[95dvh] w-full flex-col overflow-hidden rounded-t-[20px] border-t border-border bg-card shadow-[0_-24px_70px_-24px_rgba(15,25,45,0.5)] motion-safe:animate-in motion-safe:slide-in-from-bottom-32 motion-safe:fade-in motion-safe:duration-300 motion-safe:ease-out"
          >
            {/* close — วงกลมดำอยู่ขวาสุดตลอด (ตำแหน่งเดิม) · ตอนยังไม่ scroll ลอยเหนือ title (มีเงา)
                พอ scroll พื้น navbar (full-width) มาอยู่ข้างหลัง → ตัดเงาออกให้แนบเป็นส่วนหนึ่งของ navbar */}
            <button
              type="button"
              aria-label="ปิด"
              onClick={() => setActive(null)}
              className={
                "absolute right-4 top-3 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-foreground text-background transition-shadow duration-200 hover:opacity-85 " +
                (scrolled ? "shadow-none" : "shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)]")
              }
            >
              <X className="h-5 w-5" />
            </button>

            {/* scroll body */}
            <div
              ref={scrollRef}
              onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 40)}
              className="flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]"
            >
              {/* title — เลื่อนหายไปตอน scroll (ไม่ fix) */}
              <div className="mx-auto w-full max-w-[1024px] px-5 pb-4 pt-7 sm:px-8">
                <h3 className="text-[22px] font-bold tracking-[-0.01em] text-foreground sm:text-[26px]">
                  {open.label}
                </h3>
              </div>

              {/* sticky navbar — ผู้จัดทำ + download (fix ตอน scroll) */}
              <div className="sticky top-0 z-10 border-b border-border bg-card">
                <div className="mx-auto flex w-full max-w-[1024px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
                  {/* author — ขนาดเดียวกับหน้าหลัก */}
                  <div className="flex items-center gap-3">
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-hover">
                      <Image
                        src={profile.hero.avatar}
                        alt={profile.name}
                        fill
                        sizes="40px"
                        className="object-cover object-top [image-rendering:pixelated]"
                      />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <div className="text-[15px] font-semibold text-foreground">
                        {profile.fullName}
                      </div>
                      <div className="mt-0.5 text-[13px] text-muted-foreground">
                        {profile.headline}
                      </div>
                    </div>
                  </div>

                  {/* download app — ใช้ปุ่มเดียวกับ header หน้า case study (ถ้ามีลิงก์)
                      max-lg:mr-14 = เว้นที่ให้ close ขวาสุดเฉพาะจอแคบ (จอกว้าง close อยู่ไกลริมจออยู่แล้ว) */}
                  {open.appStore && (
                    <a
                      href={open.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 max-lg:mr-14"
                    >
                      <ExternalLink className="h-4 w-4" />
                      App Store
                    </a>
                  )}
                </div>
              </div>

              {/* images — ทุกจอเรียงต่อกันลงมา (พื้นขาว) */}
              <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-4 px-5 py-6 sm:px-8">
                {open.srcs.map((src, k) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${open.label} — ${k + 1}`}
                    width={SLIDE_W}
                    height={SLIDE_H}
                    sizes="(max-width: 1080px) 92vw, 1024px"
                    className="block h-auto w-full rounded-[10px] shadow-[0_10px_30px_-16px_rgba(30,50,90,0.35)]"
                  />
                ))}
              </div>
            </div>

            {/* footer — guideline เปลี่ยน project (คีย์บอร์ด) · ต่อเนื่องข้ามหมวด */}
            <div className="shrink-0 border-t border-border bg-card">
              <div className="flex items-center justify-center gap-6 px-5 py-3 sm:gap-8">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={active === 0}
                  className="inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-default disabled:opacity-40 disabled:hover:text-muted-foreground"
                >
                  <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md border border-border bg-card px-1.5 shadow-[0_1px_0_rgba(15,25,45,0.06)]">
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={active === items.length - 1}
                  className="inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-default disabled:opacity-40 disabled:hover:text-muted-foreground"
                >
                  <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md border border-border bg-card px-1.5 shadow-[0_1px_0_rgba(15,25,45,0.06)]">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="inline-flex h-7 items-center justify-center rounded-md border border-border bg-card px-2 text-[11px] font-medium shadow-[0_1px_0_rgba(15,25,45,0.06)]">
                    esc
                  </span>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LightboxCtx.Provider>
  );
}
