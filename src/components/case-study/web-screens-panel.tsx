"use client";

// WebScreensPanel — 1 category = พื้นเทา + header(ชื่อ category) + จอเรียง scroll แนวนอนเป็นราง
// (treatment เดียวกับ AppScreensShowcase · เอาแค่รูป ไม่มี caption/กรอบ)
// ปกติ 1 จอ = 1 สล็อตในราง · แต่ถ้าจอไหนมี `group` เดียวกัน จะถูกซ้อนลงมาในสล็อตเดียว
//   → ใช้กับ section Home ที่มีจอ Home ยาวๆ + จอย่อย (dropdown / step) ให้จอย่อยเรียงลงมา
//     เป็น 3 สล็อต (Home | dropdown | step) แทนที่จะกางเป็นรางยาว
// กดที่จอ → เปิดดูรูปใหญ่เต็มจอ (lightbox + เลื่อน prev/next ในหมวดนั้น) เหมือน ScreenGallery เดิม
// category ที่ยังไม่มีรูป (screens: []) → โชว์ป้าย "เร็วๆ นี้"

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollRail } from "./scroll-rail";

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

/** หัวข้อของ panel / ของแต่ละกลุ่มในนั้น — ตัวหนา + ขีด accent สั้นๆ ใต้ชื่อ
 *  (ชุดเดียวกับ GroupHeading ของ AppScreensShowcase เพื่อให้สอง component หน้าตาตรงกัน) */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">{children}</h3>
      <div className="mt-2 h-0.5 w-9 rounded-full bg-brand" />
    </div>
  );
}

export function WebScreensPanel({
  title,
  screens,
  groups,
  variant = "rail",
  cols = 2,
  bare = false,
  railWidth = "wide",
}: {
  title?: string;
  screens?: WebScreen[];
  /** แยกจอเป็นกลุ่มที่มีหัวข้อของตัวเอง แต่ยังอยู่บนพื้นเทา "ผืนเดียวกัน"
   *  โครงเดียวกับ groups ของ AppScreensShowcase (Final User Interface ของ Propertyhub App)
   *  มีค่านี้ = ใช้แทน `screens` และต้องคู่กับ variant="grid"
   *  lightbox ยังเลื่อน prev/next ข้ามกลุ่มได้ เพราะ index นับต่อเนื่องทั้ง panel
   *  ใช้กับ Listing result / Listing detail ของ PropertyOS (user สั่ง 18 ส.ค. 2026) */
  groups?: { title: string; screens: WebScreen[] }[];
  /** "rail" = จอเต็มความสูงเลื่อนแนวนอน (default) · "grid" = จอในกรอบ browser crop หัวเท่ากัน 2 ต่อแถว */
  variant?: "rail" | "grid";
  /** grid เท่านั้น — จำนวนคอลัมน์บนจอกว้าง
   *  1 = วางเดี่ยวเรียงลงมาเต็มความกว้าง (crop สูงกว่าเพราะกรอบกว้างขึ้น) · 3 = เทียบกันในสายตาเดียว */
  cols?: 1 | 2 | 3;
  /** true = ไม่มีพื้นหลังเทาและ padding รอบนอก (วางบนพื้นขาวของหน้าเลย)
   *  ใช้กับ Wireframe / Style Guide ของ Expat ที่อยู่ในหัวข้อย่อยอยู่แล้ว (user สั่ง 17 ส.ค. 2026) */
  bare?: boolean;
  /** rail เท่านั้น — ความกว้างของแต่ละสล็อต
   *  "wide" (default) = บอร์ด/จอเว็บ · "phone" = จอมือถือ แคบลงเพราะจอสูง */
  railWidth?: "wide" | "phone";
}) {
  // มี groups = เอาจอทุกกลุ่มมาต่อกันเป็นชุดเดียว เพื่อให้ index ของ lightbox เดินข้ามกลุ่มได้
  const grouped = groups && groups.length > 0 ? groups : null;
  const shots = (grouped ? grouped.flatMap((g) => g.screens) : (screens ?? [])).filter(
    (s): s is Shot => Boolean(s.src),
  );
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

  const gridClass = `grid grid-cols-1 items-start gap-4 min-[560px]:gap-6 ${
    bare ? "" : "px-[clamp(18px,3vw,30px)]"
  } ${
    cols === 1
      ? ""
      : cols === 3
        ? "min-[560px]:grid-cols-2 min-[820px]:grid-cols-3"
        : "min-[560px]:grid-cols-2"
  }`;

  /** จอ 1 ใบในโหมด grid — i ต้องเป็น index ใน `shots` เพื่อให้ lightbox เปิดใบที่ถูก */
  const gridCard = (s: Shot, i: number) => {
    // จอยาว (h/w > 1) → crop + ป้าย "full page" · จอเตี้ย → โชว์เต็มจอในกรอบ (กรอบ border ปิดครบ) ไม่มีป้าย
    const tall = (s.h ?? 5000) / (s.w ?? 1600) > 1;
    return (
      <button
        key={s.src}
        type="button"
        onClick={() => setActive(i)}
        aria-label={`ดู ${s.label ?? title ?? "ภาพ"} เต็มหน้า`}
        // bare = ไม่เอามุมโค้งและเส้นขอบ (user สั่ง 17 ส.ค. 2026 — Wireframe & Style Guide)
        className={
          "group relative block w-full cursor-pointer overflow-hidden bg-white shadow-[0_18px_44px_-24px_rgba(30,50,90,0.28)] outline-none transition-shadow duration-200 hover:shadow-[0_26px_60px_-24px_rgba(30,50,90,0.34)] focus:outline-none focus-visible:outline-none" +
          (bare ? "" : " rounded-[12px] border border-border")
        }
      >
        {/* หมายเหตุ: แถบ chrome (จุดจราจรแดง/เหลือง/เขียว) ถูกเอาออกแล้ว
            user สั่ง 17 ส.ค. 2026 — เอาออกทุกที่ที่ใช้ variant="grid" */}

        {/* จอยาว = top-crop สูงเท่ากัน + fade + ป้าย full page · จอเตี้ย = เต็มจอในกรอบ
            cols=1 กรอบกว้างเต็มความกว้าง → crop สูงขึ้นตามสัดส่วน ไม่งั้นจะเห็นแค่แถบบางๆ
            cols=3 กรอบแคบสุด → คุมความสูงไว้ 250px คงที่ (user สั่ง 18 ส.ค. 2026
            ของเดิม clamp(240,30vw,340) ตกที่ ~290px บนจอ desktop ซึ่งสูงเกินไป) */}
        <div
          className={
            "relative bg-white" +
            (tall
              ? cols === 1
                ? " h-[clamp(300px,46vw,560px)] overflow-hidden"
                : cols === 3
                  ? " h-[250px] overflow-hidden"
                  : " h-[clamp(240px,30vw,340px)] overflow-hidden"
              : "")
          }
        >
          <Image
            src={s.src}
            alt={[title, s.label].filter(Boolean).join(" — ") || "screen"}
            width={s.w ?? 1600}
            height={s.h ?? 5000}
            sizes={cols === 1 ? "(max-width: 900px) 100vw, 860px" : "(max-width: 560px) 100vw, 420px"}
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
  };

  return (
    // bare = ไม่มีพื้นเทา และไม่ crop เงา (overflow-hidden จะตัดเงาของจอในราง)
    <div className={bare ? "" : "overflow-hidden bg-[#f3f3f1] py-[clamp(18px,3vw,30px)]"}>
      {/* header — title(ชื่อ category) + เส้นใต้ accent (เหมือน AppScreensShowcase) · ไม่มี title = ไม่โชว์ header */}
      {title && (
        <div className="mb-6 px-[clamp(18px,3vw,30px)]">
          <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">{title}</h3>
          <div className="mt-2 h-0.5 w-9 rounded-full bg-brand" />
        </div>
      )}

      {shots.length === 0 ? (
        /* category ที่ยังไม่มีรูป — ป้าย "เร็วๆ นี้" */
        <div className="mx-[clamp(18px,3vw,30px)] flex items-center justify-center rounded-xl border border-dashed border-border/70 py-10 text-[14px] text-muted-foreground">
          รูปกำลังจะมา — เร็วๆ นี้
        </div>
      ) : variant === "grid" ? (
        /* grid — จอในกรอบ browser · crop หัวเท่ากัน + ป้าย "full page" · กดดูเต็ม
           มี groups = แบ่งเป็นหัวข้อย่อย แต่ยังอยู่บนพื้นเทาผืนเดียวกัน */
        grouped ? (
          <div className="flex flex-col gap-[clamp(28px,4vw,40px)]">
            {(() => {
              let offset = 0;
              return grouped.map((g) => {
                const items = g.screens.filter((s): s is Shot => Boolean(s.src));
                const start = offset;
                offset += items.length;
                return (
                  <div key={g.title}>
                    <div className={bare ? "" : "px-[clamp(18px,3vw,30px)]"}>
                      <GroupHeading>{g.title}</GroupHeading>
                    </div>
                    <div className={`mt-6 ${gridClass}`}>
                      {items.map((s, j) => gridCard(s, start + j))}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        ) : (
          <div className={gridClass}>{shots.map((s, i) => gridCard(s, i))}</div>
        )
      ) : (
        /* rail — จอเรียง free scroll แนวนอน (ไม่มี snap) · top-align · แต่ละสล็อตอาจเป็นจอเดี่ยว หรือจอย่อยซ้อนลงมา
           ScrollRail = กดค้างลากด้วยเมาส์ได้ (ลากแล้วปล่อยจะไม่เปิด lightbox) */
        <ScrollRail
          className={`flex items-start gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 ${
            bare ? "py-2" : "px-[clamp(18px,3vw,30px)]"
          }`}
        >
          {columns.map((col, ci) => (
            <div
              key={ci}
              className={`flex shrink-0 flex-col gap-4 ${
                railWidth === "phone" ? "w-[44%] sm:w-[190px]" : "w-[78%] sm:w-[320px]"
              }`}
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
                    draggable={false}
                    // เงาชุดเดียวกับ DecisionFigures (Wireframe & Style Guide ของ Expat / Propertyhub App)
                    className="block h-auto w-full shadow-[0_10px_30px_-18px_rgba(30,50,90,0.35)]"
                  />
                </button>
              ))}
            </div>
          ))}
        </ScrollRail>
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
