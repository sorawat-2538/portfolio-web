// AppScreensShowcase — จอมือถือวางบนพื้นเทา (#f3f3f1) แบบ present:
// header = text ตัวใหญ่ (uppercase) มุมซ้ายบน · จอเลื่อนแนวนอนได้ในตัว (ไม่มีปุ่มลูกศร —
// เลื่อนดูเอาเพราะรู้อยู่แล้วว่าต้อง scroll)
// padding: ตัว panel เว้นเฉพาะบน/ล่าง — ซ้าย/ขวาเป็น padding "ภายใน rail" (เป็น gutter ของจอแรก/
// จอสุดท้าย) จอเลยเลื่อนได้เต็มความกว้าง panel ไม่ดูเหมือนมุดใต้ padding

import Image from "next/image";

type Shot = { src: string; label: string };

export function AppScreensShowcase({
  title,
  screens,
}: {
  title: string;
  screens: Shot[];
}) {
  return (
    <div className="overflow-hidden bg-[#f3f3f1] py-[clamp(18px,3vw,30px)]">
      {/* header — title + เส้นใต้ accent (36×2px ตาม reference) */}
      <div className="mb-6 px-[clamp(18px,3vw,30px)]">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">
          {title}
        </h3>
        <div className="mt-2 h-0.5 w-9 rounded-full bg-brand" />
      </div>

      {/* section ที่ยังไม่มีรูป — ป้าย "เร็ว ๆ นี้" (แทน rail ว่าง) */}
      {screens.length === 0 ? (
        <div className="mx-[clamp(18px,3vw,30px)] flex items-center justify-center rounded-xl border border-dashed border-border/70 py-10 text-[14px] text-muted-foreground">
          รูปกำลังจะมา — เร็ว ๆ นี้
        </div>
      ) : (
        /* rail — full-width scroll; padding อยู่ "ในตัว rail" ทำหน้าที่เป็น gutter หัว/ท้าย */
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(18px,3vw,30px)] pb-1 [-ms-overflow-style:none] [scroll-padding-inline:clamp(18px,3vw,30px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
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
      )}
    </div>
  );
}
