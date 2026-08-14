// AppScreensShowcase — จอมือถือวางบนพื้นเทา (#f3f3f1) แบบ present:
// header = text ตัวใหญ่ (uppercase) มุมซ้ายบน · จอเลื่อนแนวนอนได้ในตัว (ไม่มีปุ่มลูกศร —
// touchpad ปัดเอา · เมาส์กดค้างแล้วลาก ผ่าน ScrollRail) · free scroll ไม่มี snap
// padding: ตัว panel เว้นเฉพาะบน/ล่าง — ซ้าย/ขวาเป็น padding "ภายใน rail" (เป็น gutter ของจอแรก/
// จอสุดท้าย) จอเลยเลื่อนได้เต็มความกว้าง panel ไม่ดูเหมือนมุดใต้ padding

import Image from "next/image";
import { ScrollRail } from "./scroll-rail";

type Shot = { src: string; label: string };

/** หัวข้อของ panel / ของแต่ละกลุ่มในนั้น — ตัวหนา + ขีด accent สั้น ๆ ใต้ชื่อ */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">{children}</h3>
      <div className="mt-2 h-0.5 w-9 rounded-full bg-brand" />
    </div>
  );
}

/** กริดจอมือถือ 3 คอลัมน์ (มือถือ 2) — ใช้ทั้งแบบกลุ่มเดียวและแบบแยกกลุ่ม */
function ScreenGrid({ screens }: { screens: Shot[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {screens.map((s) => (
        <div key={s.src} className="min-w-0">
          <Image
            src={s.src}
            alt={s.label}
            width={660}
            height={1320}
            sizes="(max-width: 640px) 44vw, 260px"
            className="block h-auto w-full drop-shadow-[0_18px_40px_-22px_rgba(30,50,90,0.5)]"
          />
        </div>
      ))}
    </div>
  );
}

export function AppScreensShowcase({
  title,
  screens,
  variant = "rail",
  groups,
}: {
  title?: string;
  screens?: Shot[];
  /** "rail" = เลื่อนแนวนอนในตัว (ค่าเดิม) · "grid" = เรียง 3 จอต่อแถว ตกแถวใหม่เอง ไม่มี scroll
   *  grid ใช้กับ Final User Interface ของ Propertyhub App (user สั่ง 14 ส.ค. 2026) */
  variant?: "rail" | "grid";
  /** แยกจอเป็นกลุ่มตามชื่อหน้า (Home / Detail / …) แต่ยังอยู่บนพื้นเทาผืนเดียวกัน
   *  มีค่านี้ = ใช้แทน screens และบังคับเป็นกริดเสมอ (user สั่ง 14 ส.ค. 2026) */
  groups?: { title: string; screens: Shot[] }[];
}) {
  // ── โหมดแยกกลุ่ม — panel เทาผืนเดียว หัวข้อชื่อหน้าคั่นแต่ละกลุ่ม ──
  if (groups && groups.length > 0) {
    return (
      <div className="overflow-hidden bg-[#f3f3f1] px-[clamp(18px,3vw,30px)] py-[clamp(18px,3vw,30px)]">
        <div className="flex flex-col gap-[clamp(28px,4vw,40px)]">
          {groups.map((g) => (
            <div key={g.title}>
              <GroupHeading>{g.title}</GroupHeading>
              <div className="mt-6">
                <ScreenGrid screens={g.screens} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const list = screens ?? [];
  return (
    <div className="overflow-hidden bg-[#f3f3f1] py-[clamp(18px,3vw,30px)]">
      {/* header — title + เส้นใต้ accent (36×2px ตาม reference) */}
      <div className="mb-6 px-[clamp(18px,3vw,30px)]">
        <GroupHeading>{title}</GroupHeading>
      </div>

      {/* section ที่ยังไม่มีรูป — ป้าย "เร็ว ๆ นี้" (แทน rail ว่าง) */}
      {list.length === 0 ? (
        <div className="mx-[clamp(18px,3vw,30px)] flex items-center justify-center rounded-xl border border-dashed border-border/70 py-10 text-[14px] text-muted-foreground">
          รูปกำลังจะมา — เร็ว ๆ นี้
        </div>
      ) : variant === "grid" ? (
        /* grid — 3 จอต่อแถว กว้างเท่ากันทุกจอ เกินแล้วขึ้นแถวใหม่ ไม่มี scroll แนวนอน
           มือถือใช้ 2 คอลัมน์ เพราะ 3 จอบนจอแคบจะเล็กจนดูไม่ออก */
        <div className="px-[clamp(18px,3vw,30px)]">
          <ScreenGrid screens={list} />
        </div>
      ) : (
        /* rail — full-width free scroll (ไม่มี snap); padding อยู่ "ในตัว rail" เป็น gutter หัว/ท้าย
           ครอบด้วย ScrollRail → กดค้างลากด้วยเมาส์ได้ (PC ที่ไม่มี touchpad) */
        <ScrollRail className="flex gap-4 overflow-x-auto px-[clamp(18px,3vw,30px)] pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
          {list.map((s) => (
            <div
              key={s.src}
              className="w-[46%] shrink-0 sm:w-[190px] lg:w-[204px]"
            >
              <Image
                src={s.src}
                alt={s.label}
                width={660}
                height={1320}
                sizes="(max-width: 640px) 46vw, 200px"
                draggable={false}
                className="block h-auto w-full drop-shadow-[0_18px_40px_-22px_rgba(30,50,90,0.5)]"
              />
            </div>
          ))}
        </ScrollRail>
      )}
    </div>
  );
}
