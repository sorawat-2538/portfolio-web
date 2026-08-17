"use client";

import * as React from "react";
import Image from "next/image";
import type { CaseImage } from "@/data/projects";
import { Lightbox, type LightboxImg } from "./image-lightbox";

/** คลาสกริดของ variant "grid" — เขียนเต็มเพราะ Tailwind ต้องเห็นชื่อคลาสตรงๆ */
const GRID_COLS: Record<2 | 3, string> = {
  2: "grid gap-5 min-[560px]:grid-cols-2",
  3: "grid gap-5 min-[560px]:grid-cols-2 min-[820px]:grid-cols-3",
};

/** รูปประกอบใน Decision — กดดูเต็มจอได้ (ชุดเดียวกับรูปใน Impact & Results)
 *  variant "pair"   = before/after 2 คอลัมน์ · crop สูงไม่เกิน 500px เพราะจอ before ยาวมาก
 *  variant "single" = รูปเดียวเต็มความกว้าง (เช่น heatmap ประกอบ Validation)
 *  variant "grid"   = หลายรูปเรียงเป็นคอลัมน์เท่าๆ กัน ปล่อยความสูงตามจริง
 *                     (ใช้กับบอร์ด Style Guide 3 ใบใน Process — user สั่ง 14 ส.ค. 2026)
 *
 *  ⚠️ ห้ามใส่ focus-visible:ring บนปุ่มรูป — กด Esc ปิด lightbox แล้วกรอบจะค้าง */
export function DecisionFigures({
  images,
  title,
  variant,
  cols = 3,
  captions = true,
  zoomable = true,
  center = false,
}: {
  images: CaseImage[];
  title: string;
  variant: "pair" | "single" | "grid";
  /** จำนวนคอลัมน์ของ variant "grid" (default 3) */
  cols?: 2 | 3;
  /** false = ไม่โชว์ caption ใต้รูป (label ยังใช้เป็น alt และ caption ใน lightbox อยู่)
   *  ใช้กับบอร์ด Style Guide ที่ในรูปมีชื่อหัวข้ออยู่แล้ว — user สั่ง 14 ส.ค. 2026 */
  captions?: boolean;
  /** false = รูปกดขยายไม่ได้ (ไม่มีปุ่ม ไม่มี lightbox)
   *  ใช้กับรูปประกอบที่ดูจากขนาดในหน้าก็พอ เช่น จอแอปในตลาดขั้น Research */
  zoomable?: boolean;
  /** true = variant "grid" จัดรูปไว้กลาง โดยรูปกว้างเท่าคอลัมน์ของ cols เดิม
   *  ใช้ตอนมีรูปน้อยกว่าจำนวนคอลัมน์ (เช่น Before/After 2 รูปในความกว้างแบบ 3 คอลัมน์) */
  center?: boolean;
}) {
  const [active, setActive] = React.useState<LightboxImg | null>(null);
  const pair = variant === "pair";
  const grid = variant === "grid";

  return (
    <>
      <div
        className={
          pair
            ? GRID_COLS[2]
            : grid
              ? center
                ? "flex flex-wrap justify-center gap-5"
                : GRID_COLS[cols]
              : ""
        }
      >
        {images.map((img) => {
          const frame = (
            <div
              className={`relative overflow-hidden bg-background shadow-[0_10px_30px_-18px_rgba(30,50,90,0.35)] ${
                pair ? "max-h-[500px]" : img.crop ? "max-h-[440px]" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={`${title} ${img.label ?? ""}`}
                width={img.w}
                height={img.h}
                sizes={
                  pair
                    ? "(max-width: 560px) 100vw, 420px"
                    : grid
                      ? "(max-width: 560px) 100vw, (max-width: 820px) 50vw, 280px"
                      : "(max-width: 900px) 100vw, 860px"
                }
                quality={pair || grid ? 88 : 90}
                className="block h-auto w-full"
              />
              {/* รูปที่ถูกตัด — ไล่เฟดท้ายให้รู้ว่ายังมีต่อ (กดดูเต็มได้) */}
              {img.crop && !pair && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent" />
              )}
            </div>
          );

          return (
            <figure
              key={img.src}
              className={
                "min-w-0 " +
                (grid && center
                  ? cols === 3
                    ? "w-full min-[560px]:w-[calc((100%-40px)/3)]"
                    : "w-full min-[560px]:w-[calc((100%-20px)/2)]"
                  : "")
              }
            >
              {zoomable ? (
                <button
                  type="button"
                  onClick={() =>
                    setActive({ src: img.src, caption: img.label, w: img.w, h: img.h })
                  }
                  aria-label={`ดู ${img.label ?? "รูป"} เต็มจอ`}
                  className="block w-full cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
                >
                  {frame}
                </button>
              ) : (
                frame
              )}
              {captions && img.label && (
                <figcaption className="mt-3 text-center text-[13.5px] leading-[1.6] text-muted-foreground">
                  {img.label}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {active && (
        <Lightbox img={active} title={title} onClose={() => setActive(null)} />
      )}
    </>
  );
}
