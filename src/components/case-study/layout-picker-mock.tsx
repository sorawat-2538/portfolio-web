// LayoutPickerMock — dialog "Choose layout style" ที่ใช้ร่วมกันทุก section/หน้า
// ใช้ปิดท้าย section "Screen flow before pixels" — เป็นสะพานไปยังบล็อก layout ด้านล่าง
// (หน้า Listing result / Listing detail ที่มี 3 layout ต่อหนึ่งประเภทหน้า)
//
// แกะจาก CompleteScreenFlowWebBuilder.md ส่วน 🎯 Layout Selection Dialog (Universal):
// เลือกได้ทีละแบบ · แต่ละตัวเลือกมีพรีวิวใหญ่ + บรรทัด "Best for" บอกว่าเหมาะกับอะไร
//
// fake UI · token-based สีสว่าง · พรีวิวเป็นบล็อกเปล่า ๆ เพราะจุดสนใจคือ "โครง" ไม่ใช่รูป

import { Check } from "lucide-react";

/** การ์ดสี่เหลี่ยมแทนทรัพย์หนึ่งใบในพรีวิว */
function Box({ className = "" }: { className?: string }) {
  return <div className={`rounded-[3px] bg-hover ${className}`} />;
}

const OPTIONS = [
  {
    key: "grid",
    name: "Grid — 3 columns",
    bestFor: "โชว์ทรัพย์แบบมาตรฐาน กวาดสายตาได้เร็ว",
    active: true,
    preview: (
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} className="h-7" />
        ))}
      </div>
    ),
  },
  {
    key: "carousel",
    name: "Carousel / Slider",
    bestFor: "ทรัพย์ชิ้นเด่นที่อยากให้เลื่อนดูทีละใบ",
    active: false,
    preview: (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="shrink-0 text-[9px] text-muted-foreground">◀</span>
          <Box className="h-7 flex-1" />
          <Box className="h-7 flex-1" />
          <Box className="h-7 flex-1" />
          <span className="shrink-0 text-[9px] text-muted-foreground">▶</span>
        </div>
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full ${i === 0 ? "bg-brand" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "list",
    name: "List view",
    bestFor: "ข้อมูลละเอียด เทียบทรัพย์ทีละรายการ",
    active: false,
    preview: (
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Box className="h-5 w-8 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="h-1 w-3/4 rounded-full bg-hover" />
              <span className="h-1 w-1/2 rounded-full bg-hover" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export function LayoutPickerMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_16px_40px_-24px_rgba(30,50,90,0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <span className="text-[13px] font-semibold text-foreground">Choose layout style</span>
        <span className="text-[13px] text-muted-foreground">✕</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 p-3.5 min-[720px]:grid-cols-3">
        {OPTIONS.map((o) => (
          <div
            key={o.key}
            className={`rounded-lg border p-2.5 ${
              o.active
                ? "border-brand/60 bg-brand/[0.04] shadow-[0_0_0_3px_rgba(45,104,255,0.07)]"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                  o.active ? "border-brand bg-brand text-white" : "border-border"
                }`}
              >
                {o.active && <Check className="h-2.5 w-2.5" />}
              </span>
              <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-foreground">
                {o.name}
              </span>
            </div>

            <div className="mt-2.5 rounded-md border border-border bg-hover/40 p-2">{o.preview}</div>

            <div className="mt-2 text-[10px] leading-snug text-muted-foreground">
              Best for: {o.bestFor}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-border px-4 py-2.5">
        <span className="text-[11px] text-muted-foreground">Cancel</span>
        <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">
          Apply selected style
        </span>
      </div>
    </div>
  );
}
