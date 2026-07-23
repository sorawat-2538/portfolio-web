// ────────────────────────────────────────────────────────────────────────────
// PROFILE / HOME PAGE CONTENT
// แก้ข้อความหน้าแรกทั้งหมดได้ที่ไฟล์นี้ไฟล์เดียว (ไม่ต้องแตะโค้ด UI)
// ────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "S.Tunaram", // ชื่อสั้น (โลโก้/header/footer)
  fullName: "Sorawat Tunaram", // ชื่อเต็ม (author credit ในหน้า case study)
  role: "UX/UI & Product Designer",
  headline: "UX/UI Designer", // ตำแหน่งใหญ่ในการ์ด About
  email: "sorawat.tun@gmail.com",
  phone: "095 575 1594",
  lineId: "sorawat2538",
  location: "Bangkok, Thailand",
  linkedin: "#", // TODO: ใส่ลิงก์ LinkedIn จริง
  resumeUrl: "#", // TODO: ลิงก์ resume แยกจาก portfolio (เช่น PDF / Google Drive)

  hero: {
    greeting: "Hello there! I'm",
    nickname: "Fluke",
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

  // สั้นๆ ใต้ตำแหน่งในการ์ด About — โทนภาษาพูด บอกความเป็นตัวเองผ่านมุมมองการทำงาน
  aboutSummary:
    "ผมเป็น UX/UI & Product Designer ที่ชอบลุยงานเองตั้งแต่ต้นจนจบ — รับโจทย์มาก็คิด flow เอง ออกแบบเอง แล้วทำจนออกมาเป็นของจริงที่ใช้งานได้ ผมสนุกกับการแก้ปัญหาให้คนใช้ และเชื่อว่ารายละเอียดเล็กๆ นี่แหละที่ทำให้งานออกมาต่างกัน",

  // stat 2 ช่องในการ์ด About
  stats: [
    { value: "7+", label: "Years Exp." },
    { value: "5", label: "Projects" },
  ],

  // ใบรับรอง (แสดงเป็น pills ในการ์ด About) — ใส่ของจริงได้เลย
  certifications: [
    "Google UX Design Certificate",
    "Google AI Essentials",
    "Claude Code Certified",
    "Figma Professional Certificate",
  ],

  education: [
    {
      period: "2014 - 2018",
      title: "Silpakorn University (ICT)",
      detail: "ปริญญาตรี · สาขาเทคโนโลยีสารสนเทศและการสื่อสาร · เอกออกแบบเว็บและสื่อโต้ตอบ",
    },
  ],

  employment: [
    {
      period: "2021 - ปัจจุบัน",
      title: "UX/UI Designer",
      company: "Zimple Media",
      tag: "Real estate",
      description:
        "ดูแลงานออกแบบ UX/UI ของผลิตภัณฑ์ด้านอสังหาริมทรัพย์ทั้งหมดในฐานะดีไซเนอร์คนเดียว ตั้งแต่รับ requirement, research, design, prototype จนถึง hand-off ให้ทีม dev และวัดผลหลัง ship",
    },
    {
      period: "2018 - 2021",
      title: "UX/UI Designer",
      company: "Builk One Group",
      tag: "Construction",
      description:
        "ออกแบบ UX/UI ให้ผลิตภัณฑ์สายก่อสร้าง ดูแล flow การใช้งานและ design system ทำงานใกล้ชิดกับทีม developer เพื่อส่งมอบงานที่ implement ได้จริง",
    },
  ],

  // รางวัล/ความสำเร็จ — แสดงเป็น timeline ใต้ Career Journey
  achievements: [
    {
      period: "2019",
      title: "ชนะเลิศ Builk x AWS Hackathon",
      detail:
        "คว้ารางวัลชนะเลิศการแข่งขัน Hackathon ร่วมระหว่าง Builk One Group และ AWS — ออกแบบและพัฒนาโซลูชันสำหรับงานก่อสร้าง/อสังหาฯ ภายในเวลาจำกัดร่วมกับทีม",
    },
  ],

  // Technical Skills แบ่ง 3 กลุ่ม — icon แต่ละอันอ้างชื่อจาก lucide-react
  skillGroups: [
    {
      title: "Design Skills",
      items: [
        { label: "User research", icon: "Search" },
        { label: "User interface design", icon: "AppWindow" },
        { label: "Visual design", icon: "Palette" },
        { label: "Prototyping", icon: "MousePointerClick" },
        { label: "Usability testing", icon: "ClipboardCheck" },
        { label: "Design system", icon: "Boxes" },
        { label: "User flow", icon: "Workflow" },
      ],
    },
    {
      title: "Computer Skills",
      items: [
        { label: "Figma", icon: "Frame" },
        { label: "Adobe xd", icon: "PenTool" },
        { label: "Adobe photoshop", icon: "Image" },
        { label: "Adobe illustrator", icon: "Brush" },
        { label: "VS code", icon: "Code2" },
        { label: "HTML", icon: "FileCode2" },
      ],
    },
    {
      title: "AI Skills",
      items: [
        { label: "Claude design", icon: "Sparkles" },
        { label: "Claude Code", icon: "Bot" },
        { label: "Claude → MCP → Figma", icon: "Workflow" },
        { label: "AI design workflow", icon: "GitBranch" },
        { label: "AI agents", icon: "BrainCircuit" },
        { label: "Design tokens", icon: "Braces" },
      ],
    },
  ],
} as const;

export type Profile = typeof profile;
