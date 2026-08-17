"use client";

// CraftShowcase — section "Craft Showcase" ที่ผ่าหน้า final ออกเป็นบล็อก แล้วบอกที่มาของแต่ละบล็อก
//
// 1 item = เลขลำดับ + หัวข้อ + เหตุผล 1 ย่อหน้า + รูป crop ของบล็อกนั้นจากหน้าจริง
// รูปทั้งหมด crop มาจาก capture หน้าเต็ม (เช่น /uploads/renthub-home-full.jpg) ด้วย sharp
// → เพิ่ม/ตัดบล็อกได้โดยแก้ `craft.items` ใน data/projects.ts ไม่ต้องแตะ component นี้
//
// item ที่มี `drawer` จะมีปุ่มใต้ย่อหน้า กดแล้วแผงเลื่อนเข้ามาจากขอบขวา (slide-over)
// ข้างในวางจอเรียงลงมาทีละจอ พร้อมคำอธิบายใต้จอ
// กดที่รูปบล็อก = เปิดดูเต็มจอ (Lightbox ตัวเดียวกับที่ MeasurementStory / Decision ใช้)
// ⚠️ ปุ่มรูปห้ามมี focus ring — user ไม่เอากรอบน้ำเงินค้างหลังกด Esc (blur ตอนปิดด้วย)

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { CraftItem } from "@/data/projects";
import { Lightbox } from "./image-lightbox";

type DrawerScreen = { src: string; label?: string; desc?: string; w?: number; h?: number };

/** slide-over จากขอบขวา (โครงเดียวกับ drawer ของ Tailwind UI ที่ user ส่งมา)
 *  เข้า/ออกด้วย translate-x + backdrop fade · ปิดด้วยปุ่ม X, กดพื้นหลัง หรือ Esc */
function ScreensDrawer({
  heading,
  screens,
  onClose,
}: {
  heading: string;
  screens: readonly DrawerScreen[];
  onClose: () => void;
}) {
  // shown = false ตอน mount แล้วสลับเป็น true เฟรมถัดไป เพื่อให้ transition วิ่ง
  const [shown, setShown] = React.useState(false);

  // ปิดแบบมีอนิเมชัน — เลื่อนออกก่อน แล้วค่อย unmount
  const requestClose = React.useCallback(() => {
    setShown(false);
    window.setTimeout(onClose, 450);
  }, [onClose]);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    // ล็อก scroll ของหน้า + ชดเชยความกว้างหลอด scroll ที่หายไป
    // ไม่งั้นเนื้อหาจะกระโดดไปทางขวาตอนเปิด แล้วกระโดดกลับตอนปิด (user เห็นเป็นอาการกระตุก)
    const barWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (barWidth > 0) document.body.style.paddingRight = `${barWidth}px`;
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = prevPadding;
    };
  }, [requestClose]);

  return (
    <div className="fixed inset-0 z-[95]" role="dialog" aria-modal="true" aria-label={heading}>
      {/* backdrop */}
      <div
        onClick={requestClose}
        className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-500 ease-in-out ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ช่องว่างซ้ายมือไว้วางปุ่มปิด (เหมือน pl-10 sm:pl-16 ของ Tailwind UI) */}
      <div className="pointer-events-none absolute inset-0 pl-10 sm:pl-16">
        <div
          className={`pointer-events-auto relative ml-auto flex h-full w-full max-w-[700px] flex-col bg-background shadow-[0_0_60px_-12px_rgba(15,25,45,0.45)] transition-transform duration-500 ease-in-out sm:duration-700 ${
            shown ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* ปุ่มปิด — ลอยนอกแผงทางซ้าย จางหายตอนแผงยังไม่เข้า */}
          <div
            className={`absolute left-0 top-0 -ml-8 flex pr-2 pt-4 transition-opacity duration-500 ease-in-out sm:-ml-10 sm:pr-4 ${
              shown ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={requestClose}
              className="relative cursor-pointer rounded-md text-white/70 transition-colors hover:text-white"
            >
              <span className="absolute -inset-2.5" />
              <span className="sr-only">ปิด</span>
              <X className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </div>

          {/* หัวแผง */}
          <div className="shrink-0 border-b border-border px-[clamp(18px,3vw,28px)] py-4">
            <h3 className="text-[16px] font-bold tracking-[-0.01em] text-foreground">{heading}</h3>
          </div>

          {/* เนื้อใน — จอเรียงลงมาทีละจอ คำอธิบายอยู่ใต้จอ */}
          <div className="flex-1 overflow-y-auto px-[clamp(18px,3vw,28px)] py-[clamp(20px,3vw,28px)]">
            <div className="flex flex-col gap-[clamp(24px,3vw,36px)]">
              {screens.map((s) => (
                <figure key={s.src}>
                  <Image
                    src={s.src}
                    alt={s.label ?? heading}
                    width={s.w ?? 1600}
                    height={s.h ?? 1000}
                    sizes="(max-width: 900px) 90vw, 800px"
                    quality={88}
                    unoptimized
                    draggable={false}
                    className="block h-auto w-full shadow-[0_14px_36px_-22px_rgba(30,50,90,0.45)]"
                  />
                  {/* คำอธิบายบรรทัดเดียว จัดกลางใต้รูป (user สั่ง 17 ส.ค. 2026 — ไม่เอาชื่อจอ)
                      label ยังใช้เป็น alt ของรูปอยู่ */}
                  {s.desc && (
                    <figcaption className="mx-auto mt-4 max-w-[56ch] text-center text-[13.5px] leading-[1.7] text-muted-foreground">
                      {s.desc}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CraftShowcase({
  title,
  intro,
  items,
}: {
  /** ชื่อโปรเจกต์ — ใช้เป็นหัว lightbox */
  title: string;
  intro?: string;
  items: readonly CraftItem[];
}) {
  const [active, setActive] = React.useState<number | null>(null);
  const open = active !== null ? items[active] : null;
  // index ของบล็อกที่เปิด drawer อยู่ (ทีละอัน)
  const [drawer, setDrawer] = React.useState<number | null>(null);
  const openDrawerItem = drawer !== null ? items[drawer] : null;

  const close = React.useCallback(() => {
    setActive(null);
    // เลิกโฟกัสปุ่มที่เปิด lightbox ไว้ ไม่งั้น focus-ring จะค้างบนรูปหลังกด Esc
    (document.activeElement as HTMLElement | null)?.blur();
  }, []);

  const closeDrawer = React.useCallback(() => {
    setDrawer(null);
    (document.activeElement as HTMLElement | null)?.blur();
  }, []);

  return (
    <section id="s-craft" className="scroll-mt-24">
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
        Craft Showcase
      </h2>

      {intro && (
        <p className="mt-[22px] text-[17px] leading-[1.8] text-muted-foreground">{intro}</p>
      )}

      <div className="mt-8 flex flex-col gap-5">
        {items.map((it, i) => (
          <article
            key={it.src}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            {/* หัวบล็อก — เลข + หัวข้อ แล้วเหตุผลเรียงลงมาเต็มความกว้าง
                (เคยแยกซ้าย-ขวาเป็น 2 คอลัมน์ · user ตีกลับ 14 ส.ค. 2026 เพราะบรรทัดสั้นจนอ่านสะดุด) */}
            <div className="p-[clamp(18px,3vw,26px)]">
              {/* เลข + หัวข้อ จัดกึ่งกลางแนวนอนให้ตรงกัน · กล่องเลขสีน้ำเงิน ตัวอักษรขาว (user สั่ง) */}
              <div className="flex items-center gap-3.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand text-[12.5px] font-bold tabular-nums text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[18px] font-bold leading-snug tracking-[-0.01em] text-foreground">
                  {it.title}
                </h3>
              </div>
              {/* ย่อหน้าชิดขอบการ์ด ไม่เยื้องตามหัวข้อ (user สั่งเอา padding 42px ออก) */}
              <p className="mt-3 text-[16px] leading-[1.8] text-muted-foreground">{it.body}</p>
            </div>

            {/* บล็อกเทา — รูป (กดดูเต็มจอ) + ปุ่มเปิด drawer อยู่ใน section เดียวกัน
                padding เท่ากันทุกด้าน ชุดเดียวกับ WebScreensPanel */}
            <div className="border-t border-border bg-[#f3f3f1] p-[clamp(14px,2.4vw,26px)]">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`ดู ${it.title} เต็มจอ`}
                className="block w-full cursor-zoom-in outline-none focus:outline-none focus-visible:outline-none"
              >
                <Image
                  src={it.src}
                  alt={`${title} — ${it.title}`}
                  width={it.w}
                  height={it.h}
                  sizes="(max-width: 900px) 100vw, 820px"
                  quality={88}
                  // unoptimized เหมือน WebScreensPanel — ตัดปัญหา next/image cache ค้าง
                  // (ตัด crop ใหม่ทับชื่อไฟล์เดิมแล้วรูปย่อยังเป็นของเก่า ส่วน lightbox ถูกเพราะ unoptimized)
                  unoptimized
                  draggable={false}
                  className="block h-auto w-full rounded-[6px] shadow-[0_14px_36px_-22px_rgba(30,50,90,0.45)]"
                />
              </button>

              {/* ปุ่มเปิด drawer — อยู่ในบล็อกเทาเดียวกับรูป เว้นระยะเท่า padding ของบล็อก
                  (แยก div ไม่ได้เพราะรูปเป็นปุ่มอยู่แล้ว ซ้อนปุ่มในปุ่มไม่ได้) */}
              {it.drawer && it.drawer.screens.length > 0 && (
                <div className="mt-[clamp(14px,2.4vw,26px)] flex justify-center">
                  <button
                    type="button"
                    onClick={() => setDrawer(i)}
                    className="inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2.5 text-[14px] font-medium text-white outline-none transition-opacity hover:opacity-90 focus:outline-none focus-visible:outline-none"
                  >
                    {it.drawer.label ?? "See all steps"}
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {openDrawerItem?.drawer && (
        <ScreensDrawer
          heading={openDrawerItem.title}
          screens={openDrawerItem.drawer.screens}
          onClose={closeDrawer}
        />
      )}

      {open && (
        <Lightbox
          img={{ src: open.src, caption: open.title, w: open.w, h: open.h }}
          title={title}
          onClose={close}
        />
      )}
    </section>
  );
}
