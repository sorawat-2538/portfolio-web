// ────────────────────────────────────────────────────────────────────────────
// PROFILE / HOME PAGE CONTENT
// แก้ข้อความหน้าแรกทั้งหมดได้ที่ไฟล์นี้ไฟล์เดียว (ไม่ต้องแตะโค้ด UI)
// ────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "S.Tunaram", // ชื่อสั้น (โลโก้/header/footer)
  fullName: "Sorawat Tunaram", // ชื่อเต็ม (author credit ในหน้า case study)
  role: "UX/UI & Product Designer",
  headline: "UX/UI Designer", // ตำแหน่งใหญ่ในการ์ด About + byline ทุกหน้า case study
  email: "sorawat.tun@gmail.com",
  phone: "095 575 1594",
  lineId: "sorawat2538",
  location: "Bangkok, Thailand",
  linkedin: "https://www.linkedin.com/in/sorawat-tunaram-497091207/",
  // ไฟล์อยู่ที่ public/ — อัปเดต resume = วางไฟล์ทับชื่อเดิม ไม่ต้องแก้โค้ด
  resumeUrl: "/resume-sorawat-tunaram.pdf",

  hero: {
    greeting: "Hello there! I'm",
    nickname: "Fluke",
    emoji: "👋",
    intro:
      "ผมเป็น UX/UI & Product Designer ที่จบจากศิลปากร เอกออกแบบเว็บและสื่อโต้ตอบ และทำงานสายออกแบบมาตลอดตั้งแต่วันแรกที่เริ่มทำงาน ตลอด 7 ปีที่ผ่านมา ผมเป็นดีไซเนอร์คนเดียวของบริษัท — รับโจทย์เอง คิดเอง จบงานเอง ทั้งสาย construction และ real estate",
    statement:
      "ผมเชื่อว่างานออกแบบที่ดีเริ่มจากความใส่ใจ — ใส่ใจตั้งแต่ภาพรวมไปจนถึงทุกพิกเซล",
    avatar: "/uploads/profile.png",
    /** avatar เวอร์ชันลายเส้นขาวดำ พื้นโปร่งใส — ใช้เฉพาะวงกลมเล็กบน navbar
     *  สีพื้นวงกลมคุมด้วย CSS ที่ site-header.tsx (เปลี่ยนสีได้โดยไม่ต้องทำรูปใหม่)
     *  ⚠️ ถ้าแก้ไฟล์รูป ให้เปลี่ยนชื่อไฟล์ด้วย ไม่งั้น cache ของ next/image ค้างรูปเก่า */
    navAvatar: "/uploads/avatar-nav-74.png",
    /** รูปถ่ายจริง — วงกลม 150px ใน section About Me (ลายเส้นเดิมอยู่ที่ avatar-about.png)
     *  ⚠️ ถ้าเปลี่ยนรูป ให้เปลี่ยนชื่อไฟล์ด้วย ไม่งั้น cache ของ next/image ค้างรูปเก่า */
    aboutAvatar: "/uploads/avatar-about-photo.jpg",
  },

  about: [
    "ผมเป็นคนที่มี ownership สูงและรักในงานที่ทำ การได้เป็นดีไซเนอร์คนเดียวในบริษัทสอนให้ผมรับโจทย์เอง คิด flow เอง และส่งมอบงานจนจบได้ด้วยตัวเอง",
    "ผมใส่ใจรายละเอียดระดับ pixel perfect เรียนรู้สิ่งใหม่ได้เร็ว และทำงานกับ developer ได้ลื่นไหล เพราะพอมีพื้นความรู้เรื่องโค้ดอยู่บ้าง ทุกวันนี้ผมยังเอา AI เข้ามาช่วยในกระบวนการออกแบบให้เร็วและดีขึ้นด้วย",
  ],

  aboutEnglish:
    "I bring a strong sense of ownership and genuine love for the craft. Being the only designer at my companies taught me to take a brief, shape the flow, and ship it — all on my own. I care about pixel-perfect detail, pick up new things fast, and work smoothly with developers thanks to a working knowledge of code. These days I also bring AI into my design process to move faster and sharper.",

  // สั้นๆ ใต้ตำแหน่งในการ์ด About — โทนภาษาพูด บอกความเป็นตัวเองผ่านมุมมองการทำงาน
  aboutSummary:
    "ประสบการณ์กว่า 7+ ปีในวงการออกแบบ ผ่านโปรเจกต์มากกว่า 10+ projects ทั้งบริษัทสตาร์ทอัพด้านวงการก่อสร้างและบริษัทแพลตฟอร์มสื่อดิจิทัล ดูแลงานออกแบบทั้งหมดตั้งแต่ต้นจนจบ และสามารถผสมผสานความเข้าใจด้าน Design, AI หรือ Technology เข้าด้วยกัน",

  // stat 2 ช่องในการ์ด About
  stats: [
    { value: "7+", label: "Years Exp." },
    { value: "10+", label: "Projects" },
  ],

  // จุดแข็ง/แนวทางการทำงาน (แสดงเป็น pills ในการ์ด About)
  certifications: [
    "End-to-End Design Ownership",
    "Design–Dev Collaboration",
    "Pixel-Perfect Execution",
    "AI-Assisted Workflow",
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
      period: "2021 - 2026",
      title: "UX/UI Designer",
      company: "Zimple Media",
      tag: "Real estate",
      description:
        "บริษัทแพลตฟอร์มสื่อดิจิทัล ผู้ให้บริการเว็บไซต์ Renthub สำหรับหาหอพักและห้องเช่า และเว็บไซต์ Propertyhub สำหรับซื้อ ขาย และเช่าอสังหาริมทรัพย์",
    },
    {
      period: "2018 - 2021",
      title: "Junior UX/UI Designer",
      company: "Builk One Group",
      tag: "Construction",
      description:
        "บริษัทสตาร์ทอัพด้านเทคโนโลยีเพื่ออุตสาหกรรมการก่อสร้าง",
    },
  ],

  // รางวัล/ความสำเร็จ — แสดงเป็น timeline ใต้ Career Journey
  achievements: [
    {
      period: "2019",
      title: "ชนะเลิศ Builk x AWS Hackathon",
      detail:
        "คว้ารางวัลชนะเลิศการแข่งขัน Hackathon ออกแบบและพัฒนาโซลูชันสำหรับงานก่อสร้าง/อสังหาฯ",
    },
  ],

  // Technical Skills แบ่ง 3 กลุ่ม — icon แต่ละอันอ้างชื่อจาก lucide-react
  skillGroups: [
    {
      title: "Design",
      items: [
        { label: "Research", icon: "Search" },
        { label: "User Interface Design", icon: "AppWindow" },
        { label: "Visual Design", icon: "Palette" },
        { label: "Prototyping", icon: "MousePointerClick" },
        { label: "Usability Testing", icon: "ClipboardCheck" },
        { label: "Design Systems", icon: "Boxes" },
        { label: "User Flows", icon: "Workflow" },
        { label: "Wireframing", icon: "LayoutTemplate" },
        { label: "Responsive & Mobile UI", icon: "MonitorSmartphone" },
      ],
    },
    {
      title: "Tools",
      items: [
        { label: "Figma", icon: "Frame" },
        { label: "Photoshop", icon: "Image" },
        { label: "Illustrator", icon: "Brush" },
      ],
    },
    {
      title: "AI-Assisted Workflow",
      items: [
        { label: "AI Design Workflow", icon: "GitBranch" },
        { label: "AI Prototyping", icon: "Sparkles" },
      ],
    },
  ],
} as const;

export type Profile = typeof profile;
