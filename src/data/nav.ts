// ────────────────────────────────────────────────────────────────────────────
// SIDEBAR NAV — โฟลเดอร์หมวดงานในเมนูซ้าย (จัดกลุ่มโปรเจกต์เป็น folder)
// เพิ่ม/ย้ายโปรเจกต์ในเมนู = แก้ที่นี่ (slug ต้องตรงกับ key ใน data/projects.ts)
// ────────────────────────────────────────────────────────────────────────────

export type NavGroup = {
  key: string;
  title: string;
  items: { slug: string; label: string }[];
};

export const navGroups: NavGroup[] = [
  {
    key: "digital",
    title: "Digital Product",
    items: [
      { slug: "propertyhub", label: "Propertyhub" },
      { slug: "propertyhub-app", label: "Propertyhub App" },
      { slug: "renthub", label: "Renthub" },
      { slug: "renthub-app", label: "Renthub App" },
      { slug: "renthub-agency", label: "Expat" },
      // งานวิเคราะห์ data + ใช้ AI ในกระบวนการ (ต่อ Claude เข้า GA4/Clarity ผ่าน MCP)
      // แยกออกมาจาก case study Propertyhub เพราะเป็นทักษะของตัวเอง ไม่ใช่ผลงานเฉพาะโปรเจกต์เดียว
      { slug: "data-analysis", label: "Data & AI Workflow" },
    ],
  },
  {
    key: "ai",
    title: "AI Product",
    // ยุบเหลือโปรเจกต์เดียว — Website Builder เป็นงานที่อยู่ "ใต้" PropertyOS อีกที
    // ไม่ใช่โปรเจกต์คนละตัว (เนื้อหาเต็มอยู่ที่ data/propertyos.ts)
    items: [{ slug: "propertyos", label: "PropertyOS" }],
  },
  {
    key: "archive",
    title: "Archive",
    items: [{ slug: "early-work", label: "Early Work 2018 - 2020" }],
  },
];

/** หา key ของ folder ที่มี slug นี้ (ใช้เปิด folder ของงานที่กำลังดูอัตโนมัติ) */
export function groupKeyForSlug(slug: string | null): string {
  if (!slug) return navGroups[0].key;
  const g = navGroups.find((grp) => grp.items.some((it) => it.slug === slug));
  return g?.key ?? navGroups[0].key;
}
