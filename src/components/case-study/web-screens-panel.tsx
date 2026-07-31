"use client";

// WebScreensPanel — 1 category = พื้นเทา + header(ชื่อ category) + จอเรียง scroll แนวนอนเป็นราง
// (treatment เดียวกับ AppScreensShowcase · เอาแค่รูป ไม่มี caption/กรอบ)
// ปกติ 1 จอ = 1 สล็อตในราง · แต่ถ้าจอไหนมี `group` เดียวกัน จะถูกซ้อนลงมาในสล็อตเดียว
//   → ใช้กับ section Home ที่มีจอ Home ยาว ๆ + จอย่อย (dropdown / step) ให้จอย่อยเรียงลงมา
//     เป็น 3 สล็อต (Home | dropdown | step) แทนที่จะกางเป็นรางยาว
// กดที่จอ → เปิดดูรูปใหญ่เต็มจอ (lightbox + เลื่อน prev/next ในหมวดนั้น) เหมือน ScreenGallery เดิม
// category ที่ยังไม่มีรูป (screens: []) → โชว์ป้าย "เร็ว ๆ นี้"

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type WebScreen = { src?: string; label?: string; group?: string; w?: number; h?: number };
type Shot = WebScreen & { src: string };

/** จัดจอเป็นคอลัมน์: จอที่ไม่มี group = 1 สล็อตของตัวเอง · จอที่ group เดียวกัน = ซ้อนลงมาในสล็อตเดียว
 *  (คง index เดิมของ shots ไว้เพื่อให้ lightbox prev/next ต่อเนื่อง) */
function buildColumns(shots: Shot[]): { s: Shot; i: number }[][] {
  const cols: { s: Shot; i: number }[][] = [];
  const groupCol = new Map<string, number>();
  shots.forEach((s, i) => {
    const g = s.group;
    if (g && groupCol.has(g)) {
      cols[groupCol.get(g)!].push({ s, i });
    } else {
      if (g) groupCol.set(g, cols.length);
      cols.push([{ s, i }]);
    }
  });
  return cols;
}

export function WebScreensPanel({
  title,
  screens,
  variant = "rail",
}: {
  title?: string;
  screens: WebScreen[];
  /** "rail" = จอเต็มความสูงเลื่อนแนวนอน (default) · "grid" = จอในกรอบ browser crop หัวเท่ากัน 2 ต่อแถว */
  variant?: "rail" | "grid";
}) {
  const shots = screens.filter((s): s is Shot => Boolean(s.src));
  const [active, setActive] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        // เลิกโฟกัสปุ่ม thumbnail ที่เปิด lightbox ไว้ ไม่งั้น focus-ring น้ำเงินจะค้างหลังกด ESC
        (document.activeElement as HTMLElement | null)?.blur();
      } else if (e.key === "ArrowRight")
        setActive((a) => (a === null ? a : Math.min(shots.length - 1, a + 1)));
      else if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : Math.max(0, a - 1)));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, shots.length]);

  const open = active !== null ? shots[active] : null;
  const idx = active ?? 0;

  const columns = buildColumns(shots);

  return (
    <div className="overflow-hidden bg-[#f3f3f1] py-[clamp(18px,3vw,30px)]">
      {/* header — title(ชื่อ category) + เส้นใต้ accent (เหมือน AppScreensShowcase) · ไม่มี title = ไม่โชว์ header */}
      {title && (
        <div className="mb-6 px-[clamp(18px,3vw,30px)]">
          <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">{title}</h3>
          <div className="mt-2 h-0.5 w-9 rounded-full bg-brand" />
        </div>
      )}

      {shots.length === 0 ? (
        /* category ที่ยังไม่มีรูป — ป้าย "เร็ว ๆ นี้" */
        <div className="mx-[clamp(18px,3vw,30px)] flex items-center justify-center rounded-xl border border-dashed border-border/70 py-10 text-[14px] text-muted-foreground">
          รูปกำลังจะมา — เร็ว ๆ นี้
        </div>
      ) : variant === "grid" ? (
        /* grid — จอในกรอบ browser · crop หัวเท่ากัน + ป้าย "full page" · 2 ต่อแถว (≥560px) · กดดูเต็ม */
        <div className="grid grid-cols-1 items-start gap-4 px-[clamp(18px,3vw,30px)] min-[560px]:grid-cols-2 min-[560px]:gap-6">
          {shots.map((s, i) => {
            // จอยาว (h/w > 1) → crop + ป้าย "full page" · จอเตี้ย → โชว์เต็มจอในกรอบ (กรอบ border ปิดครบ) ไม่มีป้าย
            const tall = (s.h ?? 5000) / (s.w ?? 1600) > 1;
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`ดู ${s.label ?? title ?? "ภาพ"} เต็มหน้า`}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-[12px] border border-border bg-white shadow-[0_18px_44px_-24px_rgba(30,50,90,0.28)] outline-none transition-shadow duration-200 hover:shadow-[0_26px_60px_-24px_rgba(30,50,90,0.34)] focus:outline-none focus-visible:outline-none"
              >
                {/* chrome — traffic lights */}
                <div className="flex items-center gap-2 border-b border-border bg-white px-3.5 py-2.5">
                  <span className="flex shrink-0 gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
                  </span>
                </div>

                {/* จอยาว = top-crop สูงเท่ากัน + fade + ป้าย full page · จอเตี้ย = เต็มจอในกรอบ */}
                <div className={"relative bg-white" + (tall ? " h-[clamp(240px,30vw,340px)] overflow-hidden" : "")}>
                  <Image
                    src={s.src}
                    alt={[title, s.label].filter(Boolean).join(" — ") || "screen"}
                    width={s.w ?? 1600}
                    height={s.h ?? 5000}
                    sizes="(max-width: 560px) 100vw, 420px"
                    quality={88}
                    unoptimized
                    className="block h-auto w-full"
                  />
                  {tall && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/70 to-transparent" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* rail — จอเรียง scroll แนวนอน · top-align · แต่ละสล็อตอาจเป็นจอเดี่ยว หรือจอย่อยซ้อนลงมา */
        <div className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-[clamp(18px,3vw,30px)] pb-1 [-ms-overflow-style:none] [scroll-padding-inline:clamp(18px,3vw,30px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6">
          {columns.map((col, ci) => (
            <div
              key={ci}
              className="flex w-[78%] shrink-0 snap-start flex-col gap-4 sm:w-[320px]"
            >
              {col.map(({ s, i }) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`ดู ${s.label ?? title ?? "ภาพ"} เต็มจอ`}
                  className="block w-full cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                >
                  <Image
                    src={s.src}
                    alt={[title, s.label].filter(Boolean).join(" — ") || "screen"}
                    width={s.w ?? 1600}
                    height={s.h ?? 5000}
                    sizes="(max-width: 640px) 78vw, 320px"
                    quality={88}
                    unoptimized
                    className="block h-auto w-full"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* fullscreen lightbox — เต็มหน้า เลื่อนได้ + prev/next (เหมือน ScreenGallery) */}
      {open?.src && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="min-w-0 truncate text-sm font-medium">
              {[title, open.label].filter(Boolean).join(" — ")}
              <span className="ml-2 text-white/50">
                {idx + 1} / {shots.length}
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

          {/* prev / next — prev ซ่อนตอนหน้าแรก, next ซ่อนตอนหน้าสุดท้าย */}
          {idx > 0 && (
            <button
              type="button"
              aria-label="รูปก่อนหน้า"
              onClick={(e) => {
                e.stopPropagation();
                setActive(idx - 1);
              }}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {idx < shots.length - 1 && (
            <button
              type="button"
              aria-label="รูปถัดไป"
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
                alt={[title, open.label].filter(Boolean).join(" — ") || "screen"}
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
    </div>
  );
}
