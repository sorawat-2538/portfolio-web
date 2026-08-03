// ────────────────────────────────────────────────────────────────────────────
// TOOL META — โลโก้/แบดจ์ของเครื่องมือที่โชว์ในหน้า case study
// icon = ไฟล์ svg ใน public/uploads · mono = แบดจ์ตัวอักษร (เมื่อไม่มีโลโก้ svg)
// ────────────────────────────────────────────────────────────────────────────

export type ToolMeta =
  | { icon: string }
  | { mono: string; bg: string; fg: string };

export const TOOL_META: Record<string, ToolMeta> = {
  Figma: { icon: "/uploads/tool-figma.svg" },
  "Google Analytics": { icon: "/uploads/tool-google-analytics.svg" },
  "Microsoft Clarity": { icon: "/uploads/tool-microsoft.svg" },
  Claude: { icon: "/uploads/tool-claude.svg" },
  // ขั้นตอนที่ใช้ Claude ทำงานออกแบบ (wireframe/UI) — โลโก้เดียวกับ Claude
  "Claude Design": { icon: "/uploads/tool-claude.svg" },
  Illustrator: { mono: "Ai", bg: "#2a0e00", fg: "#FF9A00" },
  Photoshop: { mono: "Ps", bg: "#001E36", fg: "#31A8FF" },
  "Adobe XD": { mono: "Xd", bg: "#2b0a3d", fg: "#FF61F6" },
  "Looker Studio": { mono: "Lo", bg: "#4285F4", fg: "#ffffff" },
  "Tailwind CSS": { mono: "Tw", bg: "#0b2b36", fg: "#38BDF8" },
  "Zimple Analytics": { mono: "Zi", bg: "#1a1a18", fg: "#ffffff" },
  // v0 by Vercel — ใช้ต่อยอด ASCII เป็น wireframe (โลโก้เป็นตัวอักษรตามแบรนด์)
  "v0 by Vercel": { mono: "v0", bg: "#000000", fg: "#ffffff" },
};

export function toolMeta(name: string): ToolMeta {
  return TOOL_META[name] ?? { mono: (name || "?").slice(0, 2), bg: "#1a1a18", fg: "#ffffff" };
}
