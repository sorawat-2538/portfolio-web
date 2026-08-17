// ProcessPhases — ตัวอย่าง (mock) วิธีเล่า Design Process แบบใหม่
// ยุบ 8 ขั้นของ WorkflowProcess เป็น 3 เฟส แล้วแขวน "ของจริงในโปรเจกต์นี้" ไว้ใต้แต่ละเฟส
// เป้าหมาย: recruiter จับ pattern ได้ใน 3 วินาที (3 ก้อน ไม่ใช่ 8) และเห็นหลักฐานว่าทำจริง
//
// ⚠️ ยังเป็นตัวอย่างให้ user เลือก ยังไม่ได้แทนที่ของเดิม
//    เฟส Design ยังไม่มีของจริง (รอ wireframe / สไลด์ present / style guide จาก user)
//    → แสดงเป็นการ์ดเส้นประ "รอเนื้อหาจริง" ชุดเดียวกับ Decision ที่ pending

import { ArrowRight, ClipboardList, PenTool, Rocket, type LucideIcon } from "lucide-react";

type Phase = {
  no: string;
  name: string;
  caption: string;
  icon: LucideIcon;
  steps: string[];
  /** ของจริงในโปรเจกต์นี้ — ไม่ใส่ = แสดงกล่องเส้นประรอเนื้อหา */
  evidence?: string;
};

const PHASES: Phase[] = [
  {
    no: "01",
    name: "Discover",
    caption: "ตั้งโจทย์ให้ชัดก่อนเริ่มออกแบบ",
    icon: ClipboardList,
    steps: ["Requirement", "Research & Ideate"],
    evidence:
      "Field matrix ตารางเทียบ field ของทรัพย์ทั้ง 8 ประเภท ใช้ตัดสินใจว่าประเภทไหนต้องกรอกอะไร และตัดอะไรออกได้",
  },
  {
    no: "02",
    name: "Design",
    caption: "แปลงโจทย์เป็นหน้าจอ",
    icon: PenTool,
    steps: ["Wireframe", "Present", "UI Design"],
  },
  {
    no: "03",
    name: "Deliver",
    caption: "ส่งต่อและวัดผล",
    icon: Rocket,
    steps: ["Hand-off", "Design Checklist", "Deploy"],
    evidence:
      "Dev spec พร้อมกำหนด GA4 event 14 ตัวไว้ตั้งแต่วันแรก แล้วกลับมาวัดผลด้วย GA4 Funnel, Microsoft Clarity และ Zimple Analytics",
  },
];

function PhaseCard({ phase }: { phase: Phase }) {
  const Icon = phase.icon;
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      {/* หัวการ์ด — ไอคอน + เลขเฟส */}
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="h-[20px] w-[20px]" strokeWidth={1.8} />
        </span>
        <span className="font-mono text-[13px] font-semibold tabular-nums text-faint">
          {phase.no}
        </span>
      </div>

      <h4 className="mt-4 text-[17px] font-bold tracking-[-0.01em] text-foreground">
        {phase.name}
      </h4>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{phase.caption}</p>

      {/* ขั้นย่อยของเฟสนี้ — chip เล็กๆ (ชื่อเดิมจาก 8 ขั้น ไม่ได้หายไปไหน) */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {phase.steps.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-lg border border-border bg-background px-2.5 py-1 text-[12px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      {/* ของจริงในโปรเจกต์นี้ — ส่วนที่ทำให้ต่างจาก process กลางบนหน้าแรก */}
      <div className="mt-5 border-t border-border pt-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
          ของจริงในโปรเจกต์นี้
        </div>
        {phase.evidence ? (
          <p className="mt-2 text-[13.5px] leading-[1.7] text-muted-foreground">{phase.evidence}</p>
        ) : (
          <div className="mt-2 rounded-lg border border-dashed border-border px-3 py-4 text-center text-[13px] text-faint">
            รอเนื้อหาจริง
          </div>
        )}
      </div>
    </div>
  );
}

export function ProcessPhases() {
  return (
    <div className="flex flex-col gap-3 min-[900px]:flex-row min-[900px]:items-stretch">
      {PHASES.map((p, i) => (
        <div key={p.name} className="contents">
          <div className="min-w-0 min-[900px]:flex-1">
            <PhaseCard phase={p} />
          </div>
          {i < PHASES.length - 1 && (
            <div className="flex shrink-0 items-center justify-center py-1 text-faint min-[900px]:px-1">
              <ArrowRight className="h-5 w-5 rotate-90 min-[900px]:rotate-0" strokeWidth={1.7} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
