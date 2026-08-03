// ClaudeFilesMock — พาเนล "Files" ของ project ใน Claude
// ใช้ในขั้นที่ 2 ของ section "Set Workflow by Claude"
//
// จุดที่อยากให้เห็น: ผลของการคุยไม่ได้หายไปกับ chat history แต่ถูกสรุปเป็นไฟล์
// เก็บไว้ใน project กลายเป็น knowledge base ที่แชตถัด ๆ ไปหยิบไปใช้ต่อได้
// ไฟล์ทั้งหมดเป็นของจริงจาก project PropertyOS · static ทั้งหมด

import { Plus } from "lucide-react";

type Kind = "TXT" | "MD" | "PDF";

const FILES: { name: string; lines: string; kind: Kind }[] = [
  { name: "PropertyOS Chat Interface - ASCII Design.txt", lines: "399 lines", kind: "TXT" },
  { name: "propertyos_chat_phase1_features_thai.md", lines: "248 lines", kind: "MD" },
  { name: "propertyos_personas_thai.md", lines: "339 lines", kind: "MD" },
  { name: "propertyos_chat_user_flow.md", lines: "371 lines", kind: "MD" },
  { name: "propertyos_chat_information_architecture.md", lines: "407 lines", kind: "MD" },
  { name: "propertyos-price.pdf", lines: "152 lines", kind: "PDF" },
];

// สีชื่อไฟล์ตามชนิด — ล้อกับ Claude ที่ย้อมชื่อไฟล์ต่างกันเล็กน้อย
const NAME_COLOR: Record<Kind, string> = {
  TXT: "#e8e6df",
  MD: "#c9b8f0",
  PDF: "#f0b8b8",
};

export function ClaudeFilesMock() {
  return (
    <div>
      <div
        className="select-none overflow-hidden rounded-xl border border-white/10 px-[clamp(16px,2.4vw,22px)] py-[clamp(16px,2.4vw,20px)] shadow-[0_28px_60px_-24px_rgba(8,15,30,0.55)]"
        style={{ background: "#262624" }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-[15px] font-semibold text-[#f5f4ef]">Files</span>
          <Plus className="h-4 w-4 text-[#a6a39b]" strokeWidth={2} />
        </div>

        {/* capacity bar */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "#413f3b" }}>
          <span className="block h-full w-[2%] rounded-full bg-[#5b8cff]" />
        </div>
        <p className="mt-2 text-[12px] text-[#a6a39b]">2% of project capacity used</p>

        {/* file cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 min-[620px]:grid-cols-3">
          {FILES.map((f) => (
            <div
              key={f.name}
              className="flex min-h-[104px] flex-col rounded-lg border p-3"
              style={{ background: "#2f2e2b", borderColor: "#413f3b" }}
            >
              <span
                className="line-clamp-3 text-[12px] font-medium leading-snug"
                style={{ color: NAME_COLOR[f.kind] }}
              >
                {f.name}
              </span>
              <span className="mt-1 text-[11px] text-[#8a8780]">{f.lines}</span>
              <span
                className="mt-auto inline-flex w-fit rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#a6a39b]"
                style={{ borderColor: "#4a4844" }}
              >
                {f.kind}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
        ผลของการคุยถูกสรุปเป็นไฟล์เก็บไว้ใน project — persona, feature phase 1, user flow, IA และโครงราคา
      </p>
    </div>
  );
}
