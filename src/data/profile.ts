// ────────────────────────────────────────────────────────────────────────────
// PROFILE / HOME PAGE CONTENT
// แก้ข้อความหน้าแรกทั้งหมดได้ที่ไฟล์นี้ไฟล์เดียว (ไม่ต้องแตะโค้ด UI)
// ────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "S.Tunaram",
  role: "UX/UI & Product Designer",
  email: "hello@example.com", // TODO: ใส่อีเมลจริง
  linkedin: "#", // TODO: ใส่ลิงก์ LinkedIn จริง
  resumeUrl: "#", // TODO: ลิงก์ไฟล์ resume (เช่น /uploads/resume.pdf หรือ Google Drive)

  hero: {
    greeting: "สวัสดีครับ",
    emoji: "👋",
    intro:
      "ผมเป็น UX/UI & Product Designer ที่จบจากศิลปากร เอกออกแบบเว็บและสื่อโต้ตอบ และทำงานสายออกแบบมาตลอดตั้งแต่วันแรกที่เริ่มทำงาน ตลอด 7 ปีที่ผ่านมา ผมเป็นดีไซเนอร์คนเดียวของบริษัท — รับโจทย์เอง คิดเอง จบงานเอง ทั้งสาย construction และ real estate",
    statement:
      "ผมเชื่อว่างานออกแบบที่ดีเริ่มจากความใส่ใจ — ใส่ใจตั้งแต่ภาพรวมไปจนถึงทุกพิกเซล",
    avatar: "/uploads/profile.png",
  },

  about: [
    "ผมเป็นคนที่มี ownership สูงและรักในงานที่ทำ การได้เป็นดีไซเนอร์คนเดียวในบริษัทสอนให้ผมรับโจทย์เอง คิด flow เอง และส่งมอบงานจนจบได้ด้วยตัวเอง",
    "ผมใส่ใจรายละเอียดระดับ pixel perfect เรียนรู้สิ่งใหม่ได้เร็ว และทำงานกับ developer ได้ลื่นไหล เพราะพอมีพื้นความรู้เรื่องโค้ดอยู่บ้าง ทุกวันนี้ผมยังเอา AI เข้ามาช่วยในกระบวนการออกแบบให้เร็วและดีขึ้นด้วย",
  ],

  aboutEnglish:
    "I bring a strong sense of ownership and genuine love for the craft. Being the only designer at my companies taught me to take a brief, shape the flow, and ship it — all on my own. I care about pixel-perfect detail, pick up new things fast, and work smoothly with developers thanks to a working knowledge of code. These days I also bring AI into my design process to move faster and sharper.",

  education: [
    {
      period: "2014 – 2018",
      title: "ปริญญาตรี เทคโนโลยีสารสนเทศและการสื่อสาร",
      detail: "เอกออกแบบเว็บและสื่อโต้ตอบ · มหาวิทยาลัยศิลปากร (ICT)",
    },
  ],

  certifications: [
    {
      label: "Certification",
      title: "[ ชื่อใบรับรอง ]", // TODO
      detail: "เพิ่มคอร์ส / certificate ที่นี่ · เช่น Google UX, Coursera",
    },
  ],

  employment: [
    {
      period: "เม.ย. 2021 – ปัจจุบัน",
      title: "UX/UI Designer",
      company: "Zimple Media",
      tag: "Real estate",
    },
    {
      period: "ต.ค. 2018 – เม.ย. 2021",
      title: "UX/UI Designer",
      company: "Builk One Group",
      tag: "Construction",
    },
  ],

  // ไอคอนอ้างอิงชื่อจาก lucide-react (https://lucide.dev) — เปลี่ยนชื่อได้ตามใจ
  skills: [
    { label: "UX/UI Design", icon: "AppWindow" },
    { label: "Product Design", icon: "Layers" },
    { label: "Prototyping", icon: "Component" },
    { label: "Pixel-perfect UI", icon: "Focus" },
    { label: "Requirement Gathering", icon: "ClipboardList" },
    { label: "Figma", icon: "Figma" },
    { label: "AI-assisted Workflow", icon: "Sparkles" },
    { label: "Developer Hand-off", icon: "Code2" },
  ],
} as const;

export type Profile = typeof profile;
