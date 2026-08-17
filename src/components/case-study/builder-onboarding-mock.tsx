// OnboardingScreen — จอ onboarding ของ Website Builder ทีละสเต็ป (รวม 4 จอ · 30–120 วินาที)
// เรียกใช้จากไทม์ไลน์ในหน้า PropertyOS: 1 step = เลขใหญ่ + คำอธิบาย + จอของสเต็ปนั้น
// (treatment เดียวกับ "Data for Future Growth" ที่มีรูปหลักฐานใต้แต่ละขั้น)
//
// แกะจาก CompleteScreenFlowWebBuilder.md ส่วน 🚀 Onboarding Flow ทีละสเต็ป:
//   1) ตั้งชื่อเว็บ + โชว์ URL ที่จะได้ทันที   2) เลือกธีม (progress 2/2)
//   3) หน้าโหลดที่บอกว่าระบบกำลังทำอะไรอยู่   4) หน้าสำเร็จ + ลิงก์ + สิ่งที่เตรียมให้แล้ว
// ธีมในสเต็ป 2 ดึงจาก data/website-builder.ts ตรงๆ (สี accent จริงของแต่ละธีม)
//
// fake UI (ไม่ใช่ screenshot) · token-based สีสว่าง เข้าชุดกับ mock อื่นในเว็บ
// ⚠️ ข้อความในจอเป็นภาษาอังกฤษ + ฟอนต์ Inter ทั้งหมด ตามที่ user สั่ง

import { Check, Copy, Link2, Share2 } from "lucide-react";
import { propertyos as po } from "@/data/propertyos";

/** กรอบหนึ่งสเต็ป — dialog ตัวเดียวพร้อมคำอธิบายใต้ภาพ (ใช้เดี่ยวๆ ใต้ step ในไทม์ไลน์) */
function StepFrame({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-border bg-card p-[clamp(14px,2vw,20px)] shadow-[0_12px_34px_-20px_rgba(30,50,90,0.35)]">
        <div className="mx-auto max-w-[420px]">{children}</div>
      </div>
      <figcaption className="mt-2.5 text-center text-[13px] leading-[1.5] text-muted-foreground">
        {caption}
      </figcaption>
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

/** จอของ onboarding ทีละสเต็ป — เรียกจากไทม์ไลน์ในหน้า PropertyOS (1 step = 1 จอ) */
export function OnboardingScreen({ step }: { step: 1 | 2 | 3 | 4 }) {
  if (step === 1) {
    return (
      <StepFrame caption="ถามแค่ชื่อเว็บ แล้วโชว์ URL ที่จะได้ทันทีระหว่างพิมพ์">
        <Progress value={50} />
        <div className="mt-3 text-[12px] font-bold text-foreground">Name your website</div>

        <div className="mt-3">
          <span className="text-[10px] text-muted-foreground">Site name</span>
          <div className="mt-1 rounded-lg border border-brand/60 bg-card px-2.5 py-2 text-[12px] text-foreground shadow-[0_0_0_3px_rgba(45,104,255,0.08)]">
            john-property
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-hover px-2.5 py-2">
          <div className="text-[9.5px] text-muted-foreground">Your URL will be</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
            <Link2 className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="min-w-0 truncate">john-property.propertyos.com</span>
          </div>
          <div className="mt-1 text-[9.5px] text-muted-foreground">
            You can change it later
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">
            Next →
          </span>
        </div>
      </StepFrame>
    );
  }

  if (step === 2) {
    return (
      <StepFrame caption="เลือกธีม ดู preview ได้ก่อนตัดสินใจ (เปลี่ยนทีหลังได้)">
        <Progress value={100} />
        <div className="mt-3 text-[12px] font-bold text-foreground">Choose the theme that fits you</div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {po.themes.map((t, i) => (
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
                <div className="mt-0.5 truncate text-[9px] text-muted-foreground">{t.font}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 text-[9.5px] text-muted-foreground">
          Pick the one that matches your style — you can switch anytime
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">← Back</span>
          <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">
            Create website
          </span>
        </div>
      </StepFrame>
    );
  }

  if (step === 3) {
    return (
      <StepFrame caption="ระหว่างรอ ระบบแสดง สถานะการทำงาน เพื่อให้เอเจนต์เห็นความคืบหน้าของการสร้างเว็บไซต์">
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <div className="text-[12px] font-bold text-foreground">Building your website...</div>

          <div className="mt-3 w-full max-w-[220px]">
            <div className="h-1.5 overflow-hidden rounded-full bg-hover">
              <div className="h-full w-[75%] rounded-full bg-brand" />
            </div>
            <div className="mt-1.5 text-[11px] font-semibold tabular-nums text-brand">75%</div>
          </div>

          <ul className="mt-3.5 flex w-full max-w-[240px] flex-col gap-1.5 text-left">
            <Tick>Setting up the selected theme</Tick>
            <Tick>Pulling listings from PropertyOS</Tick>
            <Tick done={false}>Almost there...</Tick>
          </ul>
        </div>
      </StepFrame>
    );
  }

  return (
    <StepFrame caption="สามารถเลือกได้ว่าจะแก้ไขต่อหรือจะดูหน้าเว็บไซต์">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <Check className="h-3 w-3" />
          </span>
          <span className="text-[12px] font-bold text-foreground">Your site is live!</span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-hover px-2.5 py-2 text-[11px] font-medium text-foreground">
          <Link2 className="h-3 w-3 shrink-0 text-muted-foreground" />
          <span className="min-w-0 truncate">john-property.propertyos.com</span>
        </div>

        <div className="mt-2 flex gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[9.5px] text-foreground">
            <Copy className="h-2.5 w-2.5" /> Copy link
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[9.5px] text-foreground">
            <Share2 className="h-2.5 w-2.5" /> Share
          </span>
        </div>

        <ul className="mt-2.5 flex flex-col gap-1">
          <Tick>Selected theme is ready</Tick>
          <Tick>Listings pulled from PropertyOS (24 items)</Tick>
          <Tick>Main pages and contact form are live</Tick>
        </ul>

        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-lg bg-brand px-2.5 py-1.5 text-[10.5px] font-semibold text-white">
            Start editing
          </span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10.5px] text-foreground">
            View site
          </span>
        </div>
    </StepFrame>
  );
}
