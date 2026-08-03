// BuilderOnboardingMock — 4 หน้าจอ onboarding ของ Website Builder (30–120 วินาที)
// ใช้ใน section "How a theme gets used" ของหน้า PropertyOS
//
// แกะจาก CompleteScreenFlowWebBuilder.md ส่วน 🚀 Onboarding Flow ทีละสเต็ป:
//   1) ตั้งชื่อเว็บ + โชว์ URL ที่จะได้ทันที   2) เลือกธีม (progress 2/2)
//   3) หน้าโหลดที่บอกว่าระบบกำลังทำอะไรอยู่   4) หน้าสำเร็จ + ลิงก์ + สิ่งที่เตรียมให้แล้ว
// ธีมในสเต็ป 2 ดึงจาก data/website-builder.ts ตรง ๆ (สี accent จริงของแต่ละธีม)
//
// fake UI (ไม่ใช่ screenshot) · token-based สีสว่าง เข้าชุดกับ mock อื่นในเว็บ
// ข้อความในจอเป็นภาษาไทยตามของจริง — ตัวอังกฤษใช้เฉพาะไฟล์ ASCII

import { Check, Copy, Link2, Share2 } from "lucide-react";
import { websiteBuilder as wb } from "@/data/website-builder";

/** กรอบหนึ่งสเต็ป — หัวเรื่องเล็กด้านบน + ตัว dialog ด้านใน */
function StepFrame({
  step,
  title,
  time,
  children,
}: {
  step: number;
  title: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
          {step}
        </span>
        <span className="min-w-0 truncate text-[13px] font-semibold text-foreground">{title}</span>
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{time}</span>
      </div>

      <div className="mt-2.5 h-[218px] overflow-hidden rounded-xl border border-border bg-card p-3.5 shadow-[0_10px_30px_-18px_rgba(30,50,90,0.35)]">
        {children}
      </div>
    </figure>
  );
}

/** แถบ progress ของ dialog (สเต็ป x/2) */
function Progress({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-hover">
        <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
      </div>
      <span className="shrink-0 text-[9.5px] text-muted-foreground">
        {value >= 100 ? "Step 2/2" : "Step 1/2"}
      </span>
    </div>
  );
}

function Tick({ children, done = true }: { children: React.ReactNode; done?: boolean }) {
  return (
    <li className="flex items-start gap-1.5 text-[10px] leading-snug text-muted-foreground">
      <Check
        className={`mt-[1px] h-3 w-3 shrink-0 ${done ? "text-brand" : "text-muted-foreground/40"}`}
      />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export function BuilderOnboardingMock() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-6 min-[720px]:grid-cols-2">
      {/* ── STEP 1 — ตั้งชื่อเว็บ ── */}
      <StepFrame step={1} title="ตั้งชื่อเว็บไซต์" time="~10 วินาที">
        <Progress value={50} />
        <div className="mt-3 text-[12px] font-bold text-foreground">ตั้งชื่อเว็บไซต์ของคุณ</div>

        <div className="mt-3">
          <span className="text-[10px] text-muted-foreground">ชื่อเว็บ</span>
          <div className="mt-1 rounded-lg border border-brand/60 bg-card px-2.5 py-2 text-[12px] text-foreground shadow-[0_0_0_3px_rgba(45,104,255,0.08)]">
            john-property
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-hover px-2.5 py-2">
          <div className="text-[9.5px] text-muted-foreground">URL ของคุณจะเป็น</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
            <Link2 className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="min-w-0 truncate">john-property.propertyos.com</span>
          </div>
          <div className="mt-1 text-[9.5px] text-muted-foreground">
            เปลี่ยนทีหลังได้ ไม่ต้องกังวล
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">
            ถัดไป →
          </span>
        </div>
      </StepFrame>

      {/* ── STEP 2 — เลือกธีม ── */}
      <StepFrame step={2} title="เลือกธีม" time="~20 วินาที">
        <Progress value={100} />
        <div className="mt-3 text-[12px] font-bold text-foreground">เลือกธีมที่ใช่สำหรับคุณ</div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {wb.themes.map((t, i) => (
            <div
              key={t.key}
              className={`overflow-hidden rounded-lg border bg-card ${
                i === 1 ? "border-brand/60 shadow-[0_0_0_3px_rgba(45,104,255,0.08)]" : "border-border"
              }`}
            >
              {/* พรีวิวย่อของธีม — แถบสี accent จริง + เส้น placeholder */}
              <div className="h-[46px] bg-hover p-1.5">
                <div className="h-1.5 w-full rounded-full" style={{ background: t.accent }} />
                <div className="mt-1.5 h-1 w-3/4 rounded-full bg-border" />
                <div className="mt-1 flex gap-1">
                  <div className="h-4 flex-1 rounded-[3px] bg-border/70" />
                  <div className="h-4 flex-1 rounded-[3px] bg-border/70" />
                </div>
              </div>
              <div className="px-1.5 py-1.5">
                <div className="truncate text-[10px] font-semibold text-foreground">{t.name}</div>
                <div className="mt-0.5 truncate text-[9px] text-muted-foreground">{t.mood}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 text-[9.5px] text-muted-foreground">
          เลือกธีมที่เข้ากับสไตล์ของคุณ — เปลี่ยนได้ทีหลังเสมอ
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">← ย้อนกลับ</span>
          <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">
            สร้างเว็บไซต์
          </span>
        </div>
      </StepFrame>

      {/* ── STEP 3 — ระบบสร้างให้ ── */}
      <StepFrame step={3} title="ระบบสร้างเว็บให้" time="~30 วินาที">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="text-[12px] font-bold text-foreground">กำลังสร้างเว็บไซต์...</div>

          <div className="mt-3 w-full max-w-[220px]">
            <div className="h-1.5 overflow-hidden rounded-full bg-hover">
              <div className="h-full w-[75%] rounded-full bg-brand" />
            </div>
            <div className="mt-1.5 text-[11px] font-semibold tabular-nums text-brand">75%</div>
          </div>

          <ul className="mt-3.5 flex w-full max-w-[240px] flex-col gap-1.5 text-left">
            <Tick>กำลังตั้งค่าธีมที่เลือกไว้</Tick>
            <Tick>กำลังดึงลิสต์ประกาศจาก PropertyOS</Tick>
            <Tick done={false}>เกือบเสร็จแล้ว...</Tick>
          </ul>
        </div>
      </StepFrame>

      {/* ── STEP 4 — เสร็จแล้ว ── */}
      <StepFrame step={4} title="เผยแพร่ หรือเข้าไปปรับต่อ" time="เสร็จ">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <Check className="h-3 w-3" />
          </span>
          <span className="text-[12px] font-bold text-foreground">สร้างเว็บไซต์สำเร็จ!</span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-hover px-2.5 py-2 text-[11px] font-medium text-foreground">
          <Link2 className="h-3 w-3 shrink-0 text-muted-foreground" />
          <span className="min-w-0 truncate">john-property.propertyos.com</span>
        </div>

        <div className="mt-2 flex gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[9.5px] text-foreground">
            <Copy className="h-2.5 w-2.5" /> คัดลอกลิงก์
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[9.5px] text-foreground">
            <Share2 className="h-2.5 w-2.5" /> แชร์
          </span>
        </div>

        <ul className="mt-2.5 flex flex-col gap-1">
          <Tick>ธีมที่เลือกพร้อมใช้งาน</Tick>
          <Tick>ดึงลิสต์ประกาศจาก PropertyOS ให้แล้ว (24 รายการ)</Tick>
          <Tick>หน้าเพจหลักและฟอร์มติดต่อพร้อมใช้งาน</Tick>
        </ul>

        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-lg bg-brand px-2.5 py-1.5 text-[10.5px] font-semibold text-white">
            เริ่มแก้ไขเว็บไซต์
          </span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10.5px] text-foreground">
            ดูเว็บไซต์
          </span>
        </div>
      </StepFrame>
    </div>
  );
}
