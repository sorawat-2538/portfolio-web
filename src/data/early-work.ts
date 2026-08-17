// ────────────────────────────────────────────────────────────────────────────
// EARLY WORK (2018–2020) — คลังงานเก่าจาก portfolio เล่มเดิม (PDF)
// แต่ละชิ้น = 1 project ที่มีได้หลายสไลด์ (srcs[]) จาก public/uploads/archive/*.jpg
// การ์ดโชว์รูปแรก (srcs[0]) + badge จำนวนรูป · กดแล้วเปิด lightbox เลื่อนดูได้ทุกรูป
// แบ่งเป็น 4 หมวด (App / Web / Design System / Graphic)
// ────────────────────────────────────────────────────────────────────────────

export type ArchiveItem = {
  label: string;
  sub?: string;
  /** รูปทั้งหมดของ project นี้ (รูปแรก = thumbnail การ์ด) */
  srcs: string[];
  /** ลิงก์ดาวน์โหลดแอป (App Store) — โชว์ปุ่ม download ใน sheet ถ้ามี */
  appStore?: string;
};

export type ArchiveGroup = { title: string; items: ArchiveItem[] };

/** สไลด์ทุกใบขนาดเท่ากัน (จาก PDF เล่มเดิม) */
export const SLIDE_W = 2400;
export const SLIDE_H = 1697;

const A = (label: string, sub: string, ...names: string[]): ArchiveItem => ({
  label,
  sub,
  srcs: names.map((n) => `/uploads/archive/${n}.jpg`),
});

export const earlyWork = {
  title: "Early Work",
  years: "2018 - 2020",
  overview:
    "รวมผลงานช่วงปี 2018 - 2020 ครอบคลุมงานออกแบบที่หลากหลาย ทั้งงานออกแบบแอปพลิเคชัน เว็บไซต์และระบบหลังบ้าน การวาง design system ตลอดจนงานกราฟิกสำหรับสื่อต่างๆ โดยหลายชิ้นอยู่ในสายก่อสร้างและอสังหาริมทรัพย์ ได้แก่ Builk, INSITE และ Site Report รวมถึงงานฟรีแลนซ์ที่รับทำในช่วงเวลาดังกล่าว สะท้อนขอบเขตงานที่ผ่านมาตั้งแต่การออกแบบ interface การจัดระบบงานดีไซน์ ไปจนถึงงานสื่อสารด้วยภาพ เก็บรวบรวมไว้เป็นคลังอ้างอิงถึงจุดเริ่มต้นของเส้นทางการทำงาน",
  tools: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
  /** รูปเด่นโชว์เป็น preview ในหน้าต่าง hero (ArchiveWindow) — 3 ชิ้น */
  featured: [
    { src: "/uploads/archive/kwanjai-next.jpg", label: "Kwanjai Next", tag: "app" },
    { src: "/uploads/archive/insite-web-admin.jpg", label: "INSITE Web Admin", tag: "web" },
    { src: "/uploads/archive/micha-cafe.jpg", label: "Micha Cafe", tag: "graphic" },
  ],
  groups: [
    {
      title: "App Design",
      items: [
        { ...A("Kwanjai Next", "แอปหาห้อง/อสังหาฯ", "kwanjai-next", "kwanjai-next-2", "kwanjai-next-3", "kwanjai-next-4", "kwanjai-next-5"), appStore: "https://apps.apple.com/th/app/kwanjai-next/id1476012866?l=th" },
        { ...A("INSITE for Construction", "แอปจัดการงานก่อสร้าง", "insite-construction", "insite-construction-2", "insite-construction-3"), appStore: "https://apps.apple.com/th/app/builk-insite/id1544700237?l=th" },
        { ...A("Site Report Inspection", "แอปตรวจงานหน้าไซต์", "site-report-app", "site-report-app-2"), appStore: "https://apps.apple.com/th/app/site-report-toc/id6748724060?l=th" },
        { ...A("Pojjaman Approve", "แอปอนุมัติเอกสาร", "pojjaman-approve"), appStore: "https://apps.apple.com/th/app/pjm-app-approve/id1531276061?l=th" },
        A("WoiceNote", "แอปบันทึกเสียงประชุม", "woicenote"),
        A("Riviera Hotel", "UI จองโรงแรม", "riviera-hotel"),
      ],
    },
    {
      title: "Web & Backoffice",
      items: [
        A("INSITE Web Admin", "หลังบ้านงานก่อสร้าง", "insite-web-admin", "insite-web-admin-2"),
        A("Site Report Web Admin", "หลังบ้านรายงานหน้าไซต์", "site-report-web-admin", "site-report-web-admin-2"),
        A("Contractor Request", "เว็บ responsive หาผู้รับเหมา", "contractor-request", "contractor-request-2", "contractor-request-3"),
        A("SEDA Redesign", "รีดีไซน์เว็บ Startup Camp", "seda-redesign", "seda-redesign-2", "seda-redesign-3"),
        A("Money and Happy", "เว็บให้ความรู้การเงิน", "money-and-happy"),
      ],
    },
    {
      title: "Design Process",
      items: [
        A("Requirement & Ideation", "เก็บโจทย์ + ระดมไอเดีย (whiteboard)", "process-requirement", "process-requirement-2"),
        A("Design System Planning", "วางระบบดีไซน์", "process-designsystem"),
        A("Flow Diagram & User Flow", "ผังงาน + เส้นทางผู้ใช้", "process-flow", "process-flow-2"),
        A("Wireframe & Prototype", "ร่างโครง + prototype", "process-wireframe"),
      ],
    },
    {
      title: "Design System",
      items: [
        A("Builk Design System", "Color · typography · components", "builk-ds-color", "builk-ds-2", "builk-ds-components", "builk-ds-3", "builk-ds-4", "builk-ds-5"),
      ],
    },
    {
      title: "Graphic",
      items: [
        A("Micha Cafe", "เมนู/โปสเตอร์ร้าน", "micha-cafe"),
        A("FROZMED", "Roll-up นิทรรศการ", "frozmed-rollup"),
        A("Beauty Institute", "Artwork ชุดโซเชียล", "beauty-institute"),
        A("Beauty Clinic", "Social media campaign", "beauty-clinic-social"),
      ],
    },
  ] satisfies ArchiveGroup[],
};
