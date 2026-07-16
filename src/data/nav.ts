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
      { slug: "renthub-agency", label: "Renthub Agency" },
    ],
  },
  {
    key: "ai",
    title: "AI Product",
    items: [
      { slug: "propertyos-chat", label: "PropertyOS Chat" },
      { slug: "baandee", label: "Baandee" },
      { slug: "website-builder", label: "Website Builder" },
      { slug: "ai-copilot", label: "AI Listing Assistant" },
    ],
  },
  {
    key: "visual",
    title: "Visual",
    items: [{ slug: "brand", label: "Brand & Graphic Works" }],
  },
  {
    key: "analytics",
    title: "Analytics",
    items: [{ slug: "market-insight", label: "Market Insight Dashboard" }],
  },
];

/** หา key ของ folder ที่มี slug นี้ (ใช้เปิด folder ของงานที่กำลังดูอัตโนมัติ) */
export function groupKeyForSlug(slug: string | null): string {
  if (!slug) return navGroups[0].key;
  const g = navGroups.find((grp) => grp.items.some((it) => it.slug === slug));
  return g?.key ?? navGroups[0].key;
}
