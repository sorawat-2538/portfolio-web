"use client";

// SlideGallery — grid ของ project (สไลด์ landscape จาก portfolio เล่มเก่า)
// การ์ดโชว์รูปแรก + badge จำนวนรูป · กดเปิด lightbox เต็มจอ (รูปใหญ่ ~1080px เห็น detail)
// เลื่อน prev/next ดูได้ทุกรูปของทุก project ในหมวด + แถบ thumbnail ล่างของ project ปัจจุบัน

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { SLIDE_W, SLIDE_H, type ArchiveItem } from "@/data/early-work";

type Flat = { src: string; label: string; sub?: string; item: number };

export function SlideGallery({ items }: { items: ArchiveItem[] }) {
  const [active, setActive] = React.useState<number | null>(null);

  // flatten ทุกรูปของทุก project ในหมวด → ใช้เลื่อนใน lightbox ต่อเนื่อง
  const { flat, firstIndex } = React.useMemo(() => {
    const flat: Flat[] = [];
    const firstIndex: number[] = [];
    items.forEach((it, itemIdx) => {
      firstIndex.push(flat.length);
      it.srcs.forEach((src) => flat.push({ src, label: it.label, sub: it.sub, item: itemIdx }));
    });
    return { flat, firstIndex };
  }, [items]);

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight")
        setActive((a) => (a === null ? a : Math.min(flat.length - 1, a + 1)));
      else if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : Math.max(0, a - 1)));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, flat.length]);

  const open = active !== null ? flat[active] : null;
  const idx = active ?? 0;
  // รูปทั้งหมดของ project ที่กำลังดู (ไว้ทำ thumbnail strip)
  const curItem = open ? items[open.item] : null;
  const curStart = open ? firstIndex[open.item] : 0;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.srcs[0]}
            type="button"
            onClick={() => setActive(firstIndex[i])}
            aria-label={`ดู ${it.label} เต็มจอ`}
            className="group block cursor-pointer text-left outline-none"
          >
            <div className="relative overflow-hidden rounded-[12px] border border-border bg-card shadow-[0_14px_36px_-20px_rgba(30,50,90,0.28)] transition-shadow duration-200 group-hover:shadow-[0_22px_50px_-22px_rgba(30,50,90,0.36)]">
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

      {/* fullscreen lightbox */}
      {open && curItem && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="min-w-0 truncate text-sm font-medium">
              {open.label}
              {open.sub && <span className="ml-2 text-white/50">{open.sub}</span>}
              {curItem.srcs.length > 1 && (
                <span className="ml-2 text-white/40">
                  {idx - curStart + 1} / {curItem.srcs.length}
                </span>
              )}
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

          {idx > 0 && (
            <button
              type="button"
              aria-label="ก่อนหน้า"
              onClick={(e) => {
                e.stopPropagation();
                setActive(idx - 1);
              }}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {idx < flat.length - 1 && (
            <button
              type="button"
              aria-label="ถัดไป"
              onClick={(e) => {
                e.stopPropagation();
                setActive(idx + 1);
              }}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 sm:right-5"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* รูปใหญ่ — กว้างสูงสุด ~1080px เห็น detail ชัด · เลื่อนแนวตั้งได้ถ้าจอเตี้ย */}
          <div
            className="flex-1 overflow-y-auto px-4 py-2 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={open.src}
              src={open.src}
              alt={open.label}
              width={SLIDE_W}
              height={SLIDE_H}
              sizes="(max-width: 1120px) 92vw, 1080px"
              className="mx-auto block h-auto w-full max-w-[1080px] rounded-[8px] shadow-2xl"
            />
          </div>

          {/* thumbnail strip — รูปอื่น ๆ ของ project นี้ (โชว์เมื่อมีมากกว่า 1 รูป) */}
          {curItem.srcs.length > 1 && (
            <div
              className="flex shrink-0 justify-center gap-2.5 overflow-x-auto px-4 py-3 [scrollbar-width:thin]"
              onClick={(e) => e.stopPropagation()}
            >
              {curItem.srcs.map((src, k) => {
                const flatI = curStart + k;
                const isActive = flatI === idx;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(flatI)}
                    aria-label={`รูปที่ ${k + 1}`}
                    aria-pressed={isActive}
                    className={
                      "relative h-[52px] w-[74px] shrink-0 overflow-hidden rounded-md border-2 bg-black/30 outline-none transition-opacity " +
                      (isActive ? "border-white opacity-100" : "border-white/25 opacity-60 hover:opacity-100")
                    }
                  >
                    <Image src={src} alt="" width={SLIDE_W} height={SLIDE_H} sizes="74px" className="h-auto w-full" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
