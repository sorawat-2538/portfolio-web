// FeaturePhaseFlow — ภาพประกอบ Decision 1 ของหน้า Propertyhub App
//
// แทนการเอา screenshot มาวางเทียบ before/after (user สั่ง 14 ส.ค. 2026 ว่า
// "อาจจะไม่ใช้รูปก็ได้ แต่เป็น flow การคัดเลือก feature")
//
// รอบล่าสุด user สั่งเปลี่ยนเป็นแบบ "ตารางเทียบแพ็กเกจ subscription" (แบบ Pro / Pro Max)
// คือฟีเจอร์เรียงเป็นแถวเดียวกันทั้งตาราง แล้วดูว่าคอลัมน์ไหนมี/ไม่มี
// จุดที่ตารางแบบนี้เล่าได้ดีกว่า 2 คอลัมน์แยกกัน: เห็น "ช่องว่าง" ของ Phase 1 ทันที
// ว่าอะไรที่ยังไม่มีตอนปล่อยครั้งแรก
//
// ⚠️ รายชื่อฟีเจอร์อ้างจากของจริง 2 แหล่ง:
//    - ขั้น Define ของบอร์ด Design Thinking (Home / Notification / Save / Profile /
//      Inbox / Your listing)
//    - แถบเมนูล่างของแอปตอนปล่อยครั้งแรก (Home · Favorite · Menu = 3 เมนู)
//      เทียบกับปัจจุบัน (Home · Favorite · Message · Notification · Menu = 5 เมนู)
//    ถ้าลำดับการปล่อยจริงไม่ตรงนี้ แก้ที่ค่า FEATURES ด้านล่างได้เลย

import { Check, Minus } from "lucide-react";

/** ฟีเจอร์ทั้งหมดที่อยู่ในรายการตั้งแต่ขั้น Define — phase1 = มีตั้งแต่ปล่อยครั้งแรกไหม
 *  Phase ถัดไปได้ของครบทุกข้อ (เหมือนแพ็กเกจตัวบนที่รวมของตัวล่างไว้หมด) */
const FEATURES: { name: string; note: string; phase1: boolean }[] = [
  { name: "Home", note: "ค้นหาตามทำเล รถไฟฟ้า และประเภททรัพย์", phase1: true },
  { name: "Search & Map", note: "ผลการค้นหาและมุมมองแผนที่", phase1: true },
  { name: "Listing Detail", note: "รายละเอียดประกาศและปุ่มติดต่อผู้ลงประกาศ", phase1: true },
  { name: "Favorite", note: "บันทึกประกาศที่สนใจไว้ดูภายหลัง", phase1: true },
  { name: "Menu", note: "สมัครสมาชิก เข้าสู่ระบบ และโปรไฟล์", phase1: true },
  { name: "Message", note: "แชทกับผู้ลงประกาศในแอป", phase1: false },
  { name: "Notification", note: "แจ้งเตือนประกาศใหม่และความเคลื่อนไหว", phase1: false },
  { name: "Save Search", note: "เซฟเงื่อนไขการค้นหาไว้ใช้ซ้ำ", phase1: false },
  {
    name: "Your Listing",
    note: "ระบบจัดการประกาศของเอเจนต์ (ลงประกาศ เลื่อนประกาศ ดูสถิติ)",
    phase1: false,
  },
];

// หมายเหตุ: เคยมีป้ายนับจำนวนฟีเจอร์ในหัวคอลัมน์ (5 / 9) — เอาออกแล้วเพราะ user
// บอกว่าหัวตารางใหญ่ไป และนับจากเครื่องหมายถูกในตารางได้อยู่แล้ว

/** ช่องบอกว่ามี / ยังไม่มี — เครื่องหมายถูกน้ำเงิน vs ขีดเทา */
function Mark({ on }: { on: boolean }) {
  return (
    <span className="flex justify-center">
      {on ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-[15px] w-[15px]" strokeWidth={3} />
        </span>
      ) : (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-hover text-faint">
          <Minus className="h-[15px] w-[15px]" strokeWidth={3} />
        </span>
      )}
    </span>
  );
}

/** หัวคอลัมน์ของแต่ละ phase — ชื่ออย่างเดียว 17px สีเดียวกับหัวข้ออื่นในเว็บ (#1a1a1a)
 *  user สั่ง 14 ส.ค. 2026: เอาคำขยายใต้ชื่อออก และไม่ใช้สี brand กับ Phase 1 แล้ว */
function ColHead({ label }: { label: string }) {
  return (
    <div className="px-2 py-3 text-center text-[17px] font-bold leading-tight tracking-[-0.01em] text-foreground">
      {label}
    </div>
  );
}

export function FeaturePhaseFlow() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* หัวตาราง — ช่องซ้ายว่างไว้ให้ตรงกับคอลัมน์ชื่อฟีเจอร์ */}
      <div className="grid grid-cols-[1fr_72px_72px] items-center border-b border-border bg-hover/40 sm:grid-cols-[1fr_120px_120px]">
        <div className="px-[clamp(14px,2.4vw,22px)] py-3 text-[17px] font-bold leading-tight tracking-[-0.01em] text-foreground">
          Features
        </div>
        <ColHead label="Phase 1" />
        <ColHead label="Phase 2" />
      </div>

      {/* แถวฟีเจอร์ — ชื่อ + คำอธิบายสั้น แล้วตามด้วยเครื่องหมายของแต่ละ phase */}
      <div>
        {FEATURES.map((f) => (
          <div
            key={f.name}
            className="grid grid-cols-[1fr_72px_72px] items-center border-b border-border/60 last:border-b-0 sm:grid-cols-[1fr_120px_120px]"
          >
            <div className="min-w-0 px-[clamp(14px,2.4vw,22px)] py-3.5">
              {/* ชื่อฟีเจอร์ใช้สีเดียวกันทุกแถว — user สั่งให้เลิกไล่สีอ่อนกับข้อที่ยังไม่มีใน Phase 1
                  (เครื่องหมายถูก/ขีดในคอลัมน์ขวาบอกอยู่แล้วว่าอันไหนมีอันไหนไม่มี) */}
              <div className="text-[15px] font-semibold leading-tight text-foreground">
                {f.name}
              </div>
              <div className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">{f.note}</div>
            </div>
            <Mark on={f.phase1} />
            {/* Phase ถัดไปได้ของครบทุกข้อ */}
            <Mark on />
          </div>
        ))}
      </div>
    </div>
  );
}
