// ────────────────────────────────────────────────────────────────────────────
// PROJECTS — ข้อมูล case study ทั้งหมด (แหล่งข้อมูล "หลังบ้าน" ของ portfolio)
//
// วิธีเพิ่มโปรเจกต์ใหม่:
//   1. วางรูปไว้ที่ public/uploads/<ชื่อไฟล์>
//   2. เพิ่ม entry ใหม่ใน object `projects` ด้านล่าง (copy ของเดิมเป็นแม่แบบ)
//   3. เสร็จ — หน้า /work/<slug> จะถูกสร้างให้อัตโนมัติ
//
// ทุกค่าที่เป็น "[ ... ]" คือ placeholder รอแทนที่ด้วยข้อมูลจริงจาก GA4 / Clarity
// ────────────────────────────────────────────────────────────────────────────

import { navGroups } from "./nav";

/** รูปประกอบในหน้า case study — กดดูเต็มจอได้ (w/h = ขนาดจริง กัน layout shift)
 *  crop: true = รูปสูงมาก ให้ตัดความสูงเหลือพอเห็นแล้วไล่เฟดท้าย (กดดูเต็มได้เหมือนเดิม) */
export type CaseImage = { src: string; label?: string; w: number; h: number; crop?: boolean };

/** 1 จุดตัดสินใจ = 4 ส่วน (Problem Observed → Options Considered → Trade-off Accepted → Validation) */
export type Decision = {
  title: string;
  /** Problem Observed — ปัญหาที่เห็นก่อนตัดสินใจ */
  reasoning: string;
  /** รูปหลักฐานประกอบ Problem (เช่น กราฟ analytics ที่ทำให้เห็นปัญหา)
   *  ปกติวาง "ใต้" ย่อหน้า Problem */
  reasoningImage?: CaseImage;
  /** true = ยก reasoningImage ขึ้นไปไว้ใต้หัวข้อ decision (เหนือย่อหน้า Problem)
   *  ตอนนี้ใช้แค่ decision 1 ของ propertyhub — user สั่งให้สลับเฉพาะข้อนั้น */
  reasoningImageFirst?: boolean;
  /** Trade-off — สิ่งที่ยอมแลก */
  tradeoff: string;
  /** Validation — วัดผลว่าเดิมพันถูกไหม */
  outcome?: string;
  /** รูปหลักฐานประกอบ Validation (เช่น heatmap) */
  outcomeImage?: CaseImage;
  /** รูปเทียบก่อน/หลังของ decision นี้ — ใส่ทั้งคู่ถึงจะแสดง */
  before?: CaseImage;
  after?: CaseImage;
  /** ชุดรูปประกอบ decision — วางใต้หัวข้อทันที เรียงเป็นกริด (default 3 คอลัมน์)
   *  ใช้กับ flow ที่มีหลายจอ เช่น ฟอร์มลงประกาศทีละสเต็ปของ Propertyhub App */
  figures?: CaseImage[];
  figuresCols?: 2 | 3;
  /** true = จัดรูปไว้กลาง แต่ขนาดรูปเท่าคอลัมน์ของ figuresCols
   *  (Before/After ของ Renthub App: 2 รูป ขนาดเท่าตอนวาง 3 รูป แต่อยู่กลาง) */
  figuresCenter?: boolean;
  /** ชื่อหัวข้อท่อนที่ 3 เฉพาะ decision นี้ — ทับค่าที่ส่งมาทั้ง section
   *  (Propertyhub App ใช้ "Why this works" เป็นค่ารวม แต่ข้อที่มีผลเทสจริงใช้ "Validation") */
  validationLabel?: string;
  /** fake-UI / diagram ประกอบ decision (แทนรูป before/after) — resolve เป็น component ใน ProcessSection
   *  "listing-dialog"  = หน้า Listing Detail ย่อส่วน + ปุ่ม "ดูทั้งหมด" ที่กดเปิด dialog ได้จริง
   *  "feature-phases"  = ตารางคัดฟีเจอร์เข้า phase แรก vs รอบถัดไป (Propertyhub App decision 1) */
  mock?: "listing-dialog" | "feature-phases";
  /** true = ยังไม่มีเนื้อหา แสดงเป็นการ์ดโครงรอไว้ (ไม่ใช่ข้อมูลจริง) */
  pending?: boolean;
  /** @deprecated ยุบไปอยู่ใน options แล้ว — เก็บไว้เพราะโปรเจกต์อื่นยังมี field นี้ */
  cut?: string;
};

/** 1 บล็อกใน Craft Showcase — รูป crop ของ section นั้นบนหน้า final + เหตุผลที่ออกแบบมาแบบนั้น
 *  w/h = ขนาดจริงของไฟล์ crop (กัน layout shift) */
export type CraftItem = {
  title: string;
  body: string;
  src: string;
  w: number;
  h: number;
  /** จอเพิ่มเติมของบล็อกนี้ — ซ่อนอยู่หลังปุ่ม กดแล้วกางออกมา (กดที่จอเปิดดูเต็มจอได้ต่อ)
   *  ใช้กับ flow ที่มีหลายขั้นแต่ไม่อยากให้กินพื้นที่หน้าหลัก เช่น Find My Home ของ Expat */
  drawer?: {
    /** ข้อความบนปุ่ม — ไม่ใส่ = "ดูจอทั้งหมด" */
    label?: string;
    /** desc = คำอธิบายใต้ชื่อจอ (จัดกลางใต้รูปในแผง) */
    screens: { src: string; label?: string; desc?: string; w?: number; h?: number }[];
  };
};

export type ResultRow = { label: string; change: string };
export type DeviceRow = {
  device: string;
  before: string;
  after: string;
  change: string;
};

/** สถานะโปรเจกต์ — โชว์เป็น badge บนหน้า project detail
 *  available = พร้อมดู/ใช้งานจริง · process = กำลังทำ · coming = ยังไม่เปิด (เร็วๆ นี้)
 *  archived = งานเก่าเก็บเข้าคลัง (ไม่ได้ active แล้ว) */
export type ProjectStatus = "available" | "process" | "coming" | "archived";

export type Project = {
  title: string;
  category: string;
  year: string;
  /** สถานะที่โชว์เป็น badge บนหัว case study (default: available) */
  status?: ProjectStatus;
  tagline: string;
  liveUrl: string;
  /** รูป hero ของงาน (path ใน public/) — ถ้าไม่มีจะโชว์ placeholder */
  heroImage?: string;
  /** โหมด hero mockup — "product" = fake product-UI, "code" = code editor.
   *  มีค่านี้จะ override heroImage ในหน้า case study (แต่ heroImage ยังใช้เป็น thumbnail ในหน้าแรก) */
  heroMock?: "product" | "code";
  /** hero แบบ present — laptop (เว็บ) + phone (แอป) วางคู่กัน · ใส่ทั้งคู่ถึงจะแสดง
   *  heroWeb = รูป laptop mockup · heroPhone = รูป phone mockup (path ใน public/) */
  heroWeb?: string;
  heroPhone?: string;
  /** ซ่อน section How I Measured (ยังไม่มีเนื้อหา) — true = ไม่แสดง */
  hideMeasure?: boolean;
  /** จอเพิ่มเติมที่โชว์ในหน้า case study (Home/Result/Listing ฯลฯ)
   *  แต่ละจอเป็น browser frame ที่เลื่อนดูหน้ายาวได้ในกรอบ + กดขยายเต็มจอ
   *  - label : ชื่อจอ (เช่น "Project detail")
   *  - desc  : คำอธิบายสั้น 1 บรรทัด ว่าจอนี้ทำหน้าที่อะไร
   *  - url   : path ที่โชว์ใน address bar ของ browser frame
   *  - src   : path รูปใน public/ (ใส่เมื่อมีรูปจริง) · w/h = ขนาดจริงของรูป (กัน layout shift) */
  screens?: { label: string; src?: string; desc?: string; url?: string; w?: number; h?: number }[];
  /** โชว์ screens แบบ "รูปเต็มยาว" (inline เต็มความสูง) แทน browser-frame gallery
   *  เหมาะกับงานที่มีจอน้อย (เช่น 1 หน้า) — ดูทั้งหน้ารวดเดียวไม่ต้องกดขยาย */
  screensFull?: boolean;
  /** Screens แยกตาม category (โครงเดียวกับ placeholder webScreens) — ถ้ามี จะ render แทน flat `screens`
   *  แต่ละ category = panel เทา + header(ชื่อ) + grid จอในกรอบ browser (กดดูเต็ม)
   *  phone:true → AppScreensShowcase (จอมือถือ) · category ที่ screens:[] → ป้าย "เร็วๆ นี้" */
  webScreens?: { category: string; phone?: boolean; screens: { src?: string; label?: string; group?: string; w?: number; h?: number }[] }[];
  /** การ์ด stat ลอยบน hero (portpro-style) — ไม่ใส่ก็ได้, โชว์เฉพาะที่มีข้อมูล */
  heroBadges?: { icon: string; value: string; label: string }[];

  /** "How I Measured" แบบเล่าเป็น Step (Goal → Step 1..n) พร้อมรูป analytics จริง
   *  ถ้ามี field นี้ จะ render section นี้แทนบล็อก How I Measured แบบเดิม */
  measure?: {
    goal: string;
    steps: {
      title: string;
      body: string;
      images?: { src: string; caption: string; w: number; h: number }[];
      /** mockup ประกอบท้าย step — resolve เป็น component ใน MeasurementStory */
      mock?: "project-redesign";
    }[];
  };

  // หมายเหตุ: section "AI in My Workflow" (2 workflow + insight จาก data) ย้ายออกไป
  // เป็นหน้าของตัวเองแล้ว → ดู data/data-analysis.ts และ /work/data-analysis
  // ส่วน "My Work Flow" ย้ายไปหน้าแรก → components/home/work-flow.tsx

  metaRole: string;
  metaTimeline: string;
  metaMethod: string;
  metaScale: string;
  tools: string[];

  overview: string[];

  /** ── ACHIEVEMENT ── ผลลัพธ์หลังเปิดตัว · section ใต้ Tools
   *  ข้อความล้วน (ย่อหน้าละ 1 string) ไม่มีการ์ด/กล่อง · ไม่ใส่ = ไม่แสดง section */
  achievement?: string[];

  /** ── CONTEXT & ROLE ──
   *  บริบทที่ recruiter สแกนหาใน 10 วินาทีแรก: ทำเมื่อไหร่ นานเท่าไหร่ ทีมกี่คน
   *  เราทำหน้าที่อะไร ใช้เครื่องมืออะไร (`tools` ถูกย้ายมาแสดงในกล่องนี้ ไม่มี section Tools แยกแล้ว)
   *  ไม่ใส่ = ไม่แสดง section นี้ */
  context?: {
    duration: string;
    team: string;
    role: string;
    /** ย่อหน้าเล่าบริบท — ทำงานกับใคร ขอบเขตงานมาจากไหน */
    body?: string[];
    /** หน้าที่ที่รับผิดชอบจริง — bullet สั้นๆ ให้สแกนได้เร็ว */
    responsibilities?: string[];
  };

  /** ── BUSINESS GOAL & OPPORTUNITY ──
   *  statement = โจทย์/เป้าหมายของโปรเจกต์ · ใส่เป็น string เดียวหรือหลายย่อหน้า (string[]) ก็ได้
   *              แสดงเป็นย่อหน้าปกติชุดเดียวกับ Overview (ไม่ใช่ callout ส้มแล้ว)
   *  body = ย่อหน้าขยายว่าทำไมปัญหานี้ถึงสำคัญทั้งมุม user และมุม business
   *  ไม่ใส่ = fallback ไปใช้ ctxProblem / ctxBusiness แบบเดิม */
  problem?: {
    statement: string | string[];
    /** รูปวางใต้ย่อหน้า statement (เหนือหัวข้อย่อย UX Challenge) */
    goalImage?: CaseImage;
    body?: string[];
    images?: CaseImage[];
  };

  /** ── SOLUTION ──
   *  สิ่งที่ออกแบบออกมาจริง — แต่ละ point ต้องผูกกลับไปที่ problem ได้ */
  solution?: { intro?: string; points: { title: string; body: string }[] };

  /** ── CRAFT SHOWCASE ── (ดูตัวอย่างที่ renthub)
   *  ผ่าหน้า final ออกเป็นบล็อก แล้วบอกที่มาของแต่ละบล็อก (เลข + หัวข้อ + เหตุผล + รูป crop)
   *  รูป crop ตัดจาก capture หน้าเต็มด้วย sharp · ไม่ใส่ = ไม่แสดง section */
  craft?: { intro?: string; items: CraftItem[] };

  /** ── REFLECTION ── ย่อหน้าสิ่งที่เรียนรู้ (ต่อท้ายด้วย reflectResource/reflectLesson ที่มีอยู่เดิม) */
  reflection?: { body: string[] };

  ctxBusiness: string;
  ctxProblem: string;
  constraints: string[];

  hypothesis: string;
  successMetrics: string[];
  guardrailMetrics: string[];

  decisionsIntro: string;
  decisions: Decision[];

  /** ── DESIGN PROCESS (บล็อกนำของ section Process) ──
   *  ย่อหน้าเล่ากระบวนการทำงานของ "งานนี้" วางใต้แถบ 5 ขั้น (Requirement → … → Hand-off)
   *  ไม่ใส่ = ไม่แสดงบล็อกนี้เลย — ตั้งใจให้เป็นแบบนี้ เพราะกระบวนการของแต่ละงานไม่เหมือนกัน
   *  งานไหนไม่มีอะไรจะเล่าตรงนี้ก็ปล่อยว่างไว้ ดีกว่าใส่ข้อความกลางที่ไม่ตรงกับงาน
   *  ⚠️ ห้ามทำเป็นค่า default ให้ทุกงานอีก (เคยพลาดมาแล้ว ดูคอมเมนต์ใน process-section.tsx) */
  processNote?: string;

  expWhy: string;
  expSegment: string;
  expTracking: string;
  expDuration: string;
  expSample: string;

  resultPrimary: { label: string; before: string; after: string; delta: string };
  resultsSecondary: ResultRow[];
  devices: DeviceRow[];
  surprised: string;
  limitation: string;

  reflectChallenge: string;
  reflectTrack: string[];
  reflectResource: string[];
  reflectLesson: string;
};

export const projects = {
  propertyhub: {
    title: "Propertyhub",
    category: "Digital Product",
    year: "2021 - ปัจจุบัน",
    status: "available",
    heroImage: "/uploads/Home.jpg",
    heroMock: "product", // หน้า case study โชว์ fake product-UI แทน screenshot จริง
    heroWeb: "/uploads/propertyhub-hero-web.png",
    heroPhone: "/uploads/propertyhub-hero-phone-v2.png",
    // Screens แยกตาม category (grid) — category ที่ยังไม่มีรูป = screens:[] → โชว์ "เร็วๆ นี้"
    webScreens: [
      {
        // จอเว็บทั้งหมดอยู่ใน panel เดียว พื้นหลังเดียวกัน ไม่แยก category ต่อหน้าแล้ว
        // (user สั่ง 13 ส.ค. 2026 — "มีแค่คำว่า Main Screen ก็พอ")
        // จอที่ตัดออกไป (Amenities, Floor plan, Reviews, Developers, All banks ฯลฯ)
        // ไฟล์ยังอยู่ใน public/uploads เอากลับมาใส่ได้ตลอด
        category: "Main Screen",
        screens: [
          { label: "Home", src: "/uploads/propertyhub-home-full-v2.jpg", w: 1600, h: 7403 },
          { label: "Listing Detail", src: "/uploads/propertyhub-listing-detail.jpg", w: 4320, h: 15296 },
          { label: "Listing Result", src: "/uploads/propertyhub-listing-result.jpg", w: 1600, h: 5561 },
          { label: "Project Detail", src: "/uploads/propertyhub-detail-overview.jpg", w: 1600, h: 5061 },
          { label: "New Project", src: "/uploads/propertyhub-new-projects.jpg", w: 1600, h: 5092 },
          { label: "Asset Bank", src: "/uploads/propertyhub-assetbank-home.jpg", w: 1600, h: 5890 },
        ],
      },
      // หมายเหตุ: category "Mobile (Responsive)" (phone:true → AppScreensShowcase) ถูกเอาออก
      // ตามคำสั่ง user 13 ส.ค. 2026 — รูปจอมือถือยังอยู่ใน public/uploads เอากลับมาใส่ได้
    ],
    liveUrl: "https://propertyhub.in.th/",
    heroBadges: [
      { icon: "LayoutGrid", value: "5 Pages", label: "Full redesign" },
      { icon: "Activity", value: "A/B tested", label: "GA4 + Clarity" },
    ],
    tagline:
      "รีดีไซน์หน้าหลักของ Propertyhub ทั้ง Home, Listing Result, Listing Detail และ Project Page เพื่อขยายจากแพลตฟอร์มประกาศคอนโดมิเนียม สู่แพลตฟอร์มอสังหาริมทรัพย์ครบทุกประเภท",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY - MMM YYYY ]",
    metaMethod: "Hypothesis-driven + Manual A/B test",
    metaScale: "[ __,000+ ] sessions measured",
    tools: ["Figma", "Illustrator", "Google Analytics", "Microsoft Clarity"],
    // Overview = 3 วินาทีแรกที่ recruiter ตัดสินใจว่าจะอ่านต่อไหม → ทำอะไร ให้ใคร ผลลัพธ์อะไร (ตัวเลขจริง)
    overview: [
      "ออกแบบหน้าเว็บไซต์หลักของ Propertyhub ใหม่ ได้แก่ Home, Listing Result, Listing Detail และ Project Page จากเดิมที่เป็นเว็บไซต์ลงประกาศสำหรับคอนโดมิเนียมอย่างเดียว ให้รองรับการลงประกาศอสังหาริมทรัพย์ประเภทอื่นได้ครบในเว็บไซต์เดียว หลังเปิดตัวในปี 2024 จำนวนผู้ใช้งานเติบโตจาก 5.5M เป็น 7.9M ในปี 2025 หรือเพิ่มขึ้นกว่า 43%",
    ],
    // duration / team / role = metadata เฉยๆ ไม่ได้เรนเดอร์ (เคยลองแยกเป็นบรรทัด
    // "Duration:" / "Role:" อยู่ช่วงสั้นๆ 14 ส.ค. 2026 แล้ว user สั่งกลับมาเป็นย่อหน้าเดียว)
    // ตัวที่ขึ้นหน้าเว็บจริงคือ body ด้านล่าง = ย่อหน้าที่ 2 ของ Overview
    context: {
      duration: "ไม่มีระยะเวลากำหนด เป็นแพลตฟอร์มของบริษัท",
      team: "PM, Business, Marketing, Developer",
      role: "UX/UI Designer คนเดียวของโปรเจกต์",
      // ข้อความตามที่ user เขียนเอง 14 ส.ค. 2026 — ห้ามเรียบเรียงใหม่
      body: [
        "โปรเจกต์นี้เป็นแพลตฟอร์มหลักของบริษัทที่พัฒนาต่อเนื่องตามการเติบโตของธุรกิจ รับผิดชอบในฐานะ UX/UI Designer เพียงคนเดียวแบบ end-to-end ตั้งแต่ research และ design ไปจนถึง hand-off และตรวจงานก่อน deploy โดยทำงานร่วมกับทีม PM, Business, Marketing และ Developer",
      ],
    },
    // ── ACHIEVEMENT ── user สั่งเอา section นี้ออก 17 ส.ค. 2026 เพราะข้อความซ้ำกับ
    // ประโยคสุดท้ายของ Overview คำต่อคำ · field `achievement` ยังอยู่ใน type ใส่กลับมาได้ตลอด
    problem: {
      // เดิมเป็นประโยคเดียวใน callout ส้ม — ขยายเป็น 3 ย่อหน้าและย้ายมาเป็นเนื้อความปกติ
      // ตัวอย่าง field ที่ยกมาอ้างอิงจาก field matrix (รูปด้านล่างของ section นี้)
      statement: [
        "เปลี่ยน Propertyhub จากแพลตฟอร์มที่รองรับเฉพาะประกาศคอนโดมิเนียม สู่แพลตฟอร์มอสังหาริมทรัพย์แบบครบวงจร ครอบคลุมทุกประเภททรัพย์สิน ตั้งแต่บ้าน ทาวน์โฮม ที่ดิน ไปจนถึงอาคารพาณิชย์ สำนักงาน พื้นที่ขายของ และกิจการ เพื่อสร้าง One-stop Platform สำหรับการค้นหาและลงประกาศอสังหาริมทรัพย์ และก้าวสู่การเป็นแพลตฟอร์มอสังหาริมทรัพย์ดิจิทัลชั้นนำและน่าเชื่อถือของประเทศไทย",
      ],
      // รูปวางใต้ย่อหน้า Business Goal (เหนือหัวข้อ UX Challenge)
      // ⚠️ ต้นฉบับ export มาพื้นหลังโปร่งใส (มุมดำ) — ไฟล์นี้เทพื้นขาวทับแล้ว อย่าเอาตัวโปร่งใสมาทับ
      goalImage: {
        src: "/uploads/propertyhub-branch-map.png",
        label: "จากรับประกาศคอนโดมิเนียมประเภทเดียว สู่ One-stop Platform ที่ครอบคลุมทรัพย์ทุกประเภท",
        w: 2720,
        h: 1360,
      },
      // หมายเหตุ: หัวข้อย่อย "UX Challenge" (body + field matrix) ถูกย้ายไปเป็น Decision 1
      // ตามคำสั่ง user 13 ส.ค. 2026 — section Business Goal เหลือย่อหน้าเป้าหมาย + รูป branch map
    },
    // แต่ละข้อผูกกลับไปที่ decision ด้านบน 1:1 — ข้อ 1–3 มาจาก Decision 1 (จัดหน้า Project Detail)
    // ข้อ 4 มาจาก Decision 2 (ลดการพึ่งพาหน้าเก่า) · แก้ decision เมื่อไหร่ต้องไล่แก้ตรงนี้ด้วย
    solution: {
      intro:
        "การตัดสินใจทั้งสองข้อด้านบนถูกแปลงออกมาเป็นงานออกแบบจริงในสองหน้าหลักของ flow คือหน้า Project Detail ที่ทำหน้าที่พาผู้ใช้ไปยังประกาศที่ตรงความต้องการ และหน้า Listing Detail ที่ทำหน้าที่ให้ดูประกาศต่อได้โดยไม่หลุดจากสิ่งที่กำลังดูอยู่",
      points: [
        {
          title: "ย้ายข้อมูลเชิงลึกเข้า tab",
          body: "จาก Decision 1 สิ่งอำนวยความสะดวก ผังห้อง และรีวิว ถูกจัดเข้า tab เพื่อให้หน้าสั้นลงและเส้นทางหลักไม่ถูกกลบด้วยเนื้อหาที่ยาว",
        },
        {
          title: "ยกปุ่มเช่าและขายขึ้นมาไว้ส่วนบนสุด",
          body: "เมื่อหน้าสั้นลงแล้ว ทางเลือกหลักต้องเห็นทันที ผู้ใช้เข้ามาด้วย intent คนละแบบ จึงให้เลือกเส้นทางได้โดยไม่ต้องเลื่อนหา heatmap ยืนยันว่าปุ่มนี้กับแกลเลอรีรูปคือจุดที่ถูกคลิกมากที่สุดของหน้า",
        },
        {
          title: "ดึงประกาศจริงในโครงการมาไว้ในหน้าเดียวกัน",
          body: "แสดงประกาศเช่าและขายที่มีอยู่จริงในโครงการต่อจากข้อมูลโครงการเลย ผู้ใช้ไม่ต้องย้อนกลับไปค้นหาใหม่",
        },
        {
          title: "ปุ่ม “ดูทั้งหมด” ที่ pre-filter ตามประกาศที่กำลังดู",
          body: "จาก Decision 2 หน้า Listing Detail ได้ปุ่มที่เปิดประกาศทั้งโครงการโดยไม่พาผู้ใช้ออกจากหน้าเดิม และกรองผลลัพธ์ให้ตรงกับประกาศที่กำลังดูอยู่ตั้งแต่แรก เช่น ประกาศเช่า 1 ห้องนอน ก็จะเห็นเฉพาะห้องเช่า 1 ห้องนอนในโครงการเดียวกัน",
        },
      ],
    },
    // ข้อความตามที่ user เขียนเอง (13 ส.ค. 2026) — 3 ย่อหน้า ห้ามเรียบเรียงใหม่
    reflection: {
      body: [
        "เปลี่ยนบทบาทของตัวเองไปในทาง Product มากขึ้น โดยไม่ใช่ออกแบบอย่างเดียว ใช้ Data เพื่อหาช่องทางหรือโอกาสในการยกระดับ Product ของบริษัท",
        "งานช่วงต้นเน้นความเร็วจนมองข้าม Auto Layout และ component หลังปรับให้วางตาม logic ที่ dev นำไปใช้จริง การ hand-off หน้า Project Detail แทบไม่ต้องอธิบายเพิ่ม บทเรียนคือการส่งต่อที่ดีเริ่มตั้งแต่โครงสร้างไฟล์",
        "เดิมสรุปทิศทางกับหัวหน้าเป็นหลัก เมื่อเริ่มคุยกับ Business และ Sales มากขึ้น จึงได้มุมจากลูกค้าจริงที่นำไปสู่ทางเลือกการออกแบบที่หลากหลายกว่าเดิม",
      ],
    },
    ctxBusiness:
      "Propertyhub ทำเงินจากการที่ user กด contact agent — critical path คือ traffic เข้า → เจอทรัพย์ที่ตรง intent → ติดต่อ agent หน้า Project page เป็นจุดที่ traffic เข้ามาเยอะและกระจายต่อไปยัง listing",
    ctxProblem:
      "user ที่เข้าหน้า Project page มักหลุดออกก่อนจะไปถึงหน้า listing ที่ตรงกับ intent (เช่า/ขายในย่านนั้น) ทำให้ funnel ขาดตอนและ contact rate ไม่โต",
    constraints: [
      "Solo designer — ไม่มีทีม design",
      "ไม่มี user research budget",
      "ไม่มี A/B testing tool (Optimizely, VWO)",
      "Dev team ขนาดเล็ก — solution ต้อง implement ได้จริง",
      "ห้ามกระทบ SEO ranking ของหน้าเดิม",
    ],
    hypothesis:
      "ถ้าเราออกแบบหน้า Project page ให้มี clear pathway ไปหน้า listing ที่ตรงกับ intent user (เช่า/ขายในย่านนั้น) จะเห็น CTR ไปหน้า listing เพิ่มขึ้น โดยไม่กระทบ contact agent rate",
    successMetrics: [
      "Primary: CTR จาก Project page → Listing result page",
      "Secondary: Funnel completion rate (4-step)",
    ],
    guardrailMetrics: [
      "Contact agent rate ต้องไม่ลด (revenue signal)",
      "Bounce rate ต้องไม่เพิ่ม",
    ],
    decisionsIntro: "",
    // ── DESIGN PROCESS ── ย่อหน้าใต้แถบ 5 ขั้นของหน้านี้
    // ข้อความ user เขียนเอง 14 ส.ค. 2026 ห้ามเรียบเรียงใหม่ · เดิมเป็น DEFAULT_NOTE ที่ทุกหน้าได้
    // อัตโนมัติ ย้ายมาเก็บที่นี่ 17 ส.ค. 2026 เพราะเนื้อความยกตัวอย่างของ Propertyhub โดยเฉพาะ
    processNote:
      "ขั้นตอนการ research เป็นสิ่งที่สำคัญสำหรับกระบวนการออกแบบและเป็นส่วนหนึ่งของการตัดสินใจของงานในหลายๆครั้ง เช่น การออกแบบ Input Field ในหน้าลงประกาศเพื่อให้การลงประกาศและหน้าแสดงผลมีความยืดหยุ่นสำหรับรองรับทุกประเภทอสังหาฯ",
    decisions: [
      {
        // ย้ายมาจากหัวข้อย่อย "UX Challenge" ใน section Business Goal (13 ส.ค. 2026)
        // ยังไม่มี trade-off / validation ของขั้นนี้ — เว้นเป็นค่าว่างไว้ ตัว render จะซ่อนหัวข้อนั้นเอง
        // user สั่งเลิกใช้คำว่า "Data Architecture" เปลี่ยนเป็น "Input Field" (14 ส.ค. 2026)
        title:
          "ออกแบบ Input Field ให้รองรับทรัพย์ทุกประเภท โดยแยกโครงสร้าง Input ของแต่ละประเภทออกจากกัน",
        reasoning:
          "ไม่มีข้อมูลของอสังหาริมทรัพย์ประเภทอื่นๆ สำหรับการลงประกาศ ต้องออกแบบ Input Field ใหม่ เพราะก่อนหน้านั้นสามารถลงประกาศได้แค่คอนโดมิเนียม ปัญหาคือไม่รู้ข้อมูล input ต่างๆ ว่าต้องมีอะไรบ้าง",
        reasoningImage: {
          src: "/uploads/propertyhub-field-matrix.png",
          label: "Field matrix ข้อมูลที่แต่ละประเภทต้องกรอก (required / optional / ไม่มี field นี้)",
          w: 3120,
          h: 4245,
          crop: true,
        },
        reasoningImageFirst: true,
        // ข้อความตามที่ user เขียนเอง 14 ส.ค. 2026 — ห้ามเรียบเรียงใหม่
        tradeoff:
          "การออกแบบ input แต่ละเว็บไซต์มีความแตกต่างกันออกไปอย่างสิ้นเชิง ยิ่งกรอก field มากเท่าไหร่ ข้อมูลก็ยิ่งครบและค้นหาได้ละเอียดขึ้น แต่ในมุมของผู้ลงประกาศยิ่ง field เยอะยิ่งใช้เวลากรอกนาน จำเป็นต้องตัดสินใจเลือก field ที่จำเป็นก่อน และบาง field ถ้าไม่จำเป็นในมุมของการค้นหาก็ให้เป็น optional ไป",
        outcome:
          "หลังจากใช้งานยังไม่มี feedback จาก user ตอนนี้ประกาศทั้งหมดของ Propertyhub มีประมาณ 300,000 ประกาศ และ 85% ของประกาศทั้งหมดคือคอนโดมิเนียม ซึ่งจะเป็น behavior เดิมของ user",
      },
      {
        title: "จัดข้อมูลหน้า Project Detail จาก long-scroll เป็น tab",
        reasoning:
          "ก่อนหน้าที่จะ redesign หน้า project detail มีปัญหาหนึ่งคือ design เก่าเป็นการเรียงข้อมูลตั้งแต่บนลงล่าง แล้วตอน scroll ก็จะมี navigation นำทางให้เพื่อไปแต่ละ section ข้อดีคือ user จะเห็นทั้งหมดในหน้าเดียวแล้วค่อยๆ ลงไปข้างล่าง ปัญหาคือหน้ายาวมาก",
        tradeoff:
          "สิ่งที่ต้อง trade-off คือ ลดความยาวของหน้าได้แต่ user จะไม่เห็นภาพรวมทั้งหมดในหน้าเดียว ต้องกดดูทีละ tab ก่อนถึงจะเห็นข้อมูลในแต่ละส่วน แต่เนื้อหาบางส่วนที่สำคัญก็ยังคงอยู่",
        outcome:
          "หลังจาก launch ก็ใช้ Clarity ดู Heatmap เพื่อดู Behavior การกดของ user ว่ามีคนกด tab ไหม และสามารถพา user ไปยังหน้าที่ต้องการได้หรือเปล่า",
        outcomeImage: {
          src: "/uploads/ph-clarity-heatmap.jpg",
          label: "Clarity heatmap หน้า Project Detail หลัง launch",
          w: 2400,
          h: 1170,
        },
        before: {
          src: "/uploads/propertyhub-project-before.jpg",
          label: "Before",
          w: 4320,
          h: 20283,
        },
        after: {
          src: "/uploads/propertyhub-project-detail.jpg",
          label: "After",
          w: 1600,
          h: 5106,
        },
      },
      {
        // เนื้อหาปรับมาจาก section "From Data to Decision" ของหน้า /work/data-analysis
        // (Session Explorer + What I Changed) — user สั่งให้ยกมาใช้เป็น decision 2
        title:
          "เพิ่มปุ่มดูประกาศทั้งหมดของโครงการนั้น ในหน้า Listing Detail เพื่อเพิ่ม engagement depth และ user ยังคงอยู่ใน context เดิม",
        mock: "listing-dialog",
        reasoning:
          "ตอนนี้ในหน้า Listing Detail จะแสดงประกาศจากโครงการเดียวกันเพียงบางส่วน หาก user ต้องการดูประกาศทั้งหมดในโครงการเดียวกัน จะต้องไปที่หน้า “ประกาศเช่า” หรือ “ประกาศขาย” ของโครงการนั้น ซึ่งปัจจุบันยังเป็นหน้าเก่าอยู่ โดยเหตุผลที่ยังต้องพา user ไปหน้าเก่าเพราะหน้านั้นมี traffic สูงและติด SEO บน Google ในการค้นหา ดังนั้นสิ่งที่เราจะทำคือพยายามพึ่งพาหน้าเก่าให้น้อยที่สุด โดยไม่ให้ user หลุดออกจาก context เดิมของประกาศที่กำลังดูอยู่ ซึ่งคาดว่าจะช่วยเพิ่ม engagement depth ได้",
        reasoningImage: {
          src: "/uploads/ph-zimple-session.jpg",
          label:
            "Zimple Analytics Session Explorer: สัดส่วน session ตาม engagement depth เทียบกับ contact rate ของแต่ละกลุ่ม",
          w: 2400,
          h: 1167,
        },
        // ข้อความตามที่ user เขียนเอง 14 ส.ค. 2026 — ห้ามเรียบเรียงใหม่
        tradeoff:
          "ลดการไปหน้าเก่าที่เป็นหน้า traffic หลัก แต่เลือกสิ่งที่ตรง intent ของ user มากกว่าในการเลือกดู listing และคาดว่าการพยายามให้ user วนอยู่กับหน้าประกาศที่ดูอยู่จะเจอสิ่งที่ต้องการมากกว่าการเข้าไปหน้า “ประกาศเช่า” หรือ “ประกาศขาย”",
        outcome:
          "อยู่ระหว่างการพัฒนาและรอวัดผล โดยจะกลับมาวัดด้วยข้อมูลชุดเดิมที่ใช้ตั้งโจทย์ คือสัดส่วน session ที่ดูมากกว่าหนึ่งประกาศ และ contact rate ของแต่ละกลุ่ม engagement depth",
      },
      // decision 3 (การ์ด pending "รอเนื้อหาจริง") ถูกเอาออกตามคำสั่ง user 13 ส.ค. 2026
      // ถ้าจะเพิ่ม decision ใหม่ ใส่ object ต่อท้ายได้เลย
    ],
    measure: {
      goal: "เป้าหมายหลักของหน้า Project page คือ ส่งผู้ใช้ต่อไปยังหน้า listing เช่า/ขายคอนโด (/เช่าคอนโด · /ขายคอนโด) ให้ได้มากที่สุด ยิ่งพาไปเจอ listing ที่ตรง intent มากเท่าไหร่ ยิ่งมีโอกาสกด contact agent ซึ่งเป็น revenue signal ของ Propertyhub",
      steps: [
        {
          title: "วิธีวัดผลหลัง redesign หน้า Project Detail",
          body: "การวัดผลหลังปล่อย design ใหม่ใช้เครื่องมือ 3 ตัวประกอบกัน GA4 Funnel Exploration สำหรับติดตาม conversion ตลอด funnel · Microsoft Clarity สำหรับอ่านพฤติกรรมการใช้งานจริง · และ Zimple Analytics สำหรับยืนยันผลและกำหนดเป้าหมายถัดไป",
          images: [
            { src: "/uploads/propertyhub-project-detail.jpg", caption: "หน้า Project Detail ที่ redesign ใหม่ จุดตั้งต้นของการวัดผล", w: 1600, h: 5106 },
          ],
        },
        {
          title: "วัดผลด้วย GA4 Funnel Exploration",
          body: "ตั้ง Funnel Exploration ใน GA4 เอง 4 ขั้น (เข้าหน้าโครงการ → ไปหน้า listing result → เข้าหน้า listing detail → กด contact agent) เพื่อดูว่าหน้า Project ใหม่ยังทำงานได้ดีหรือแย่ลงเมื่อเทียบกับ design เก่า ในช่วงเวลาใกล้เคียงกัน จากรูป ขั้นแรก session ของ design เก่าจะสูงกว่าราวเท่าตัว เพราะเรื่อง consent การกด Accept cookies ของเว็บ แต่ช่วงกลางและปลาย funnel session ใกล้เคียงกันมาก การวิเคราะห์จึงโฟกัสที่ช่วงกลางถึงปลาย funnel ซึ่งเทียบกันได้ตรงกว่า และพบว่า design ใหม่ส่งผู้ใช้ไปถึงขั้นที่ 4 (กด contact agent) ซึ่งเป็น conversion หลักของแพลตฟอร์ม ได้ในสัดส่วนที่สูงกว่า จาก 1.6% เป็น 3.0% ของ session",
          images: [
            { src: "/uploads/ph-ga4-funnel.jpg", caption: "GA4 Funnel Exploration 4 ขั้น เทียบ design เก่า (ฟ้า) กับใหม่ (ม่วง) ช่วงเวลาใกล้เคียงกัน", w: 2400, h: 1122 },
          ],
        },
        {
          title: "ดู Behavior จาก Microsoft Clarity",
          body: "วัด behavior ของผู้ใช้หลังเปลี่ยน design ใหม่ ดูว่าคนกดตรงไหนมากที่สุด (heatmap), scroll ลึกแค่ไหน (scroll depth) และกดปุ่ม เช่า/ขาย ที่เราต้องการหรือไม่ ช่วยให้เห็นภาพรวมว่าคนใช้งานหน้านี้จริงอย่างไร ไม่ใช่แค่ตัวเลข conversion",
          images: [
            { src: "/uploads/ph-clarity-1.jpg", caption: "Clarity heatmap ส่วนบนของหน้า: คนคลิกที่แกลเลอรีรูปและปุ่มเช่า/ขายมากที่สุด", w: 2400, h: 1166 },
            { src: "/uploads/ph-clarity-2.jpg", caption: "Clarity heatmap ส่วน listing ในโครงการ: การคลิกดูประกาศเช่า/ขายจริง", w: 2400, h: 1166 },
          ],
        },
        {
          title: "ใช้ Zimple Analytics เพื่อยืนยันและหา Goal ต่อไป",
          body: "ใช้ Dashboard Navigation Summary ของ Zimple Analytics ยืนยันผลและวิเคราะห์ว่าจะทำอะไรต่อได้ จากรูป เมื่อเลือก Current Selection เป็น project_detail จะเห็นว่า Next Page เกือบ 50% ของ session ไปหน้า “ประกาศเช่า” ซึ่งตรงกับ goal ของหน้านี้พอดี ยืนยันว่าหน้า Project ใหม่ยังทำงานได้ดี และชี้ทางว่าจะไป optimize ต่อตรงไหน",
          images: [
            { src: "/uploads/ph-zimple-projectdetail.jpg", caption: "Zimple Analytics Navigation Summary ของ project_detail: Next Page เกือบ 50% ไปหน้าประกาศเช่า", w: 2400, h: 1168 },
          ],
        },
      ],
    },
    expWhy:
      "ภายใต้ข้อจำกัดที่ไม่มี A/B testing tool และ research budget จึงออกแบบ manual A/B test ขึ้นเอง โดยเก็บพฤติกรรมจริงผ่าน GA4 event ร่วมกับ Microsoft Clarity แล้วเปรียบเทียบ conversion rate แบบ before/after ระหว่าง design เดิมกับ design ใหม่",
    expSegment: "[ วิธีแบ่ง variant — เช่น by user ID ]",
    expTracking: "GA4 event + Microsoft Clarity",
    expDuration: "[ __ สัปดาห์ ]",
    expSample: "Before [ __,000 ] · After [ __,000 ] sessions",
    // ⚠️ ฟิลด์ result*/devices ชุดนี้ยังไม่มี component ไหนเรนเดอร์ (ไม่มี section Results ในหน้า)
    //    ตัวเลขจริงที่ผู้ใช้เห็น อยู่ใน measure.steps ขั้น GA4 ด้านบน
    resultPrimary: {
      label: "Contact agent rate (% ของ session)",
      before: "1.6%",
      after: "3.0%",
      delta: "+88% relative improvement",
    },
    resultsSecondary: [
      { label: "Listing detail → result conversion", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
      { label: "Bounce rate (step 1)", change: "[ ก่อน ] → [ หลัง ]  ([ −% ])" },
      { label: "Contact agent rate (guardrail)", change: "[ ก่อน ] → [ หลัง ]  (✓)" },
    ],
    devices: [
      { device: "Mobile", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Desktop", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Tablet", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
    ],
    surprised:
      "[ เล่า insight ที่ไม่คาดคิด — เช่น device ไหน improvement มากสุดทั้งที่ traffic น้อยกว่า ]",
    limitation:
      "Session count Before/After ไม่เท่ากัน เพราะไม่ได้ setup event tracking ตั้งแต่ launch เริ่มเก็บ event หลังจากนั้น แต่ conversion rate เทียบกันได้ตรงๆ เพราะเป็น % ของ session",
    reflectChallenge:
      "[ hypothesis ข้อไหนที่ตอนนั้นเชื่อเร็วเกินไป และควร challenge ด้วย data มากกว่านี้ก่อนลงมือ design ]",
    reflectTrack: [
      "[ metric ที่ควร track เพิ่ม — เช่น scroll depth บน Project page ]",
      "[ metric ที่ควร track เพิ่ม — เช่น time-to-first-contact ]",
    ],
    reflectResource: [
      "ถ้ามี research budget: จะ recruit user มา moderated test ก่อน ship",
      "ถ้ามีทีม designer อื่น: จะทำ design critique เพื่อ challenge decision",
    ],
    reflectLesson:
      '[ 1 ประโยค specific + actionable ที่ apply กับงานต่อไป — เลี่ยงคำ cliché เช่น "I learned the importance of..." ]',
  },

  renthub: {
    title: "Renthub",
    category: "Digital Product",
    year: "2021 - 2023",
    status: "available",
    liveUrl: "https://www.renthub.in.th/",
    heroWeb: "/uploads/renthub-web-laptop.png",
    heroPhone: "/uploads/renthub-app-home.png",
    hideMeasure: true,
    screensFull: true,
    // หน้าเต็มของเว็บเวอร์ชันปัจจุบัน — แคปสดจาก renthub.in.th ด้วย Chrome (กว้าง 1600px) 14 ส.ค. 2026
    // ไฟล์เก่า renthub-home-full.jpg (1600×9509) = เวอร์ชันก่อนหน้า ยังอยู่ใน public/uploads เผื่ออยากทำ before/after
    screens: [
      {
        label: "Home",
        url: "renthub.in.th",
        src: "/uploads/renthub-home-2026.jpg",
        w: 1600,
        h: 9654,
      },
    ],
    tagline:
      "รีดีไซน์หน้า Home Page ของ Renthub แพลตฟอร์มรวมประกาศหอพักและห้องเช่าทั่วไทยกว่า 20,000 แห่ง ให้รองรับหลาย section และพาผู้ใช้เข้าสู่เส้นทางการค้นหาได้เร็วขึ้น",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY - MMM YYYY ]",
    metaMethod: "Hypothesis-driven + Manual A/B test",
    metaScale: "[ __,000+ ] sessions measured",
    tools: ["Figma", "Illustrator"],
    // ย่อหน้า 1 = ทำอะไร ให้ใคร · ย่อหน้า 2 = duration / role / team (โครงเดียวกับ propertyhub)
    // ข้อความจาก user โดยตรง (14 ส.ค. 2026) — ไม่ใช่ร่างจาก AI แล้ว
    overview: [
      "ออกแบบหน้า Home Page ของ Renthub ใหม่ ซึ่งเป็นแพลตฟอร์มรวมประกาศหอพัก อพาร์ทเม้นท์ และห้องเช่าทั่วประเทศไทยกว่า 20,000 แห่ง ครอบคลุมทั้งที่พักรายเดือนและรายวัน ช่วยให้ผู้ใช้งานสามารถค้นหาที่พักที่ตรงกับความต้องการได้ง่ายและสะดวกยิ่งขึ้น ไม่ว่าจะค้นหาตามทำเล ใกล้สถานศึกษา หรือใกล้สถานีรถไฟฟ้า",
      "การ Redesign หน้านี้ใช้เวลาประมาณ 2 เดือน รับผิดชอบงานออกแบบหน้า Home แบบ end-to-end ทำงานร่วมกับทีม Business และ Marketing โดยงานภาพบนหน้ามาจากทั้งที่ออกแบบเองและกราฟิกที่ได้รับจากฝั่ง Business",
    ],
    // ข้อความจาก user โดยตรง (14 ส.ค. 2026)
    problem: {
      statement: [
        "โจทย์จากธุรกิจคือการปรับ Home Page ให้รองรับ Section ที่หลากหลายมากขึ้น จากเดิมที่เน้นการแสดง Apartment List เป็นหลัก สู่หน้าที่ช่วยนำผู้ใช้เข้าสู่เส้นทางการค้นหาที่ตรงกับความต้องการได้รวดเร็วยิ่งขึ้น พร้อมรองรับการขยายและเพิ่ม Section ใหม่ๆ ของธุรกิจในอนาคต",
      ],
    },
    ctxBusiness:
      "Renthub ทำเงินจากการเชื่อมผู้เช่ากับเจ้าของห้อง critical path คือ ค้นหา → เปรียบเทียบ → นัดดูห้อง",
    ctxProblem: "ผู้เช่าเทียบหลายห้องพร้อมกันได้ยาก ทำให้ลังเลและออกก่อนนัดดูห้อง",
    constraints: [
      "Solo designer — ไม่มีทีม design",
      "ไม่มี user research budget",
      "ไม่มี A/B testing tool",
      "Dev team ขนาดเล็ก",
      "ห้ามกระทบ SEO ranking",
    ],
    hypothesis:
      "ถ้าทำให้ผู้เช่าเปรียบเทียบห้องแบบ side-by-side ได้ชัดเจน จะเห็นอัตราการนัดดูห้องเพิ่มขึ้น โดยไม่กระทบ lead quality",
    successMetrics: [
      "Primary: อัตราการนัดดูห้อง (schedule rate)",
      "Secondary: จำนวนห้องที่ถูกเปรียบเทียบต่อ session",
    ],
    guardrailMetrics: ["Lead quality ต้องไม่ลด", "Bounce rate ต้องไม่เพิ่ม"],
    // ── CRAFT SHOWCASE ── ผ่าหน้า Home ออกเป็น 5 บล็อก
    // รูป crop มาจาก renthub-home-2026.jpg (1600×9654 · แคปสดจาก renthub.in.th) ตัดด้วย sharp ที่พิกัด y:
    //   search 0-1090 · featured 1090-2845 · stay 2845-4600 · destination 4600-5968 · location 6900-8620
    //   ช่วงที่ไม่ได้เอามา: 5968-6900 (แถบชวนโหลดแอป + ตัวเลข 1.2M/700k/20k/4,000) และ 8620-9654 (footer)
    //   อยากได้เพิ่มค่อยตัดจากไฟล์เต็มด้วยพิกัดนี้
    // ⚠️ ตัด crop ใหม่ = ตั้งชื่อไฟล์ใหม่ (v2, v3, …) อย่าทับชื่อเดิม ไม่งั้น next/image เสิร์ฟรูปเก่าค้าง
    // body ทั้ง 5 บล็อกเป็นข้อความจาก user โดยตรง (17 ส.ค. 2026) ห้ามเรียบเรียงใหม่
    // ส่วน title เป็นภาษาอังกฤษสั้นๆ ที่ AI ตั้งให้ (user สั่งให้คิดให้) เปลี่ยนได้ตามต้องการ
    craft: {
      // intro ถูกเอาออกตามคำสั่ง user (14 ส.ค. 2026) — ให้เข้าบล็อกแรกเลย
      items: [
        {
          title: "Search Entry Point",
          body: "สร้างระบบการค้นหาที่ครบครันโดยการพิมพ์ค้นหาทำเลหรืออพาร์ทเม้นท์ในช่องค้นหา หาอพาร์ทเม้นท์ตาม BTS/MRT ในรูปแผนที่ interactive โดยอ้างอิงผู้ใช้งานที่ต้องการหาอพาร์ทเม้นท์ใกล้สถานีรถไฟฟ้า",
          src: "/uploads/renthub-craft-v3-search.jpg",
          w: 1600,
          h: 1090,
        },
        {
          title: "Featured & Rental Periods",
          body: "อพาร์ทเม้นท์แนะนำไว้สำหรับเป็นพื้นโฆษณาของฝั่งเจ้าของหอพักที่จะลงโฆษณากับทาง Renthub เพื่อให้อพาร์ทเม้นท์ของตัวเองโดดเด่นเพื่อเป็นที่น่าดึงดูดสำหรับผู้เช่า และมี section ระยะเวลาเข้าพัก รายเดือน สามเดือน หกเดือน และรายปี เพื่อให้ผู้เช่ามีทางเลือกหลากหลายหากต้องการเช่าห้องในระยะสั้น",
          src: "/uploads/renthub-craft-v3-featured.jpg",
          w: 1600,
          h: 1755,
        },
        {
          title: "Dedicated Segments",
          body: "แยก section เฉพาะกลุ่มที่มีเงื่อนไขชัดเจนออกมาให้เห็นง่าย ตอบโจทย์ธุรกิจที่ต้องการรองรับหลาย segment บนหน้าเดียว ไม่ว่าจะเป็นโรงแรมหรือที่พัก รวมถึงผู้เช่าที่ชอบเลี้ยงสัตว์ก็สามารถค้นหาได้จาก section นี้ และมีการเพิ่มโครงการคอนโดของ Propertyhub เข้ามาเป็นตัวเลือกอีกด้วย",
          src: "/uploads/renthub-craft-v3-stay.jpg",
          w: 1600,
          h: 1755,
        },
        {
          title: "Explore by Place",
          body: "ช่วงกลางหน้าเปลี่ยนเป็น section เชิงสำรวจ สำหรับผู้ใช้ที่ยังไม่มีทำเลในใจ ใช้ภาพสถานที่จริงเป็น entry point แทนการให้กรอกเงื่อนไข เลือกจากจังหวัดหรือมหาวิทยาลัยที่ตัวเองอยู่ก่อน",
          src: "/uploads/renthub-craft-v3-destination.jpg",
          w: 1600,
          h: 1368,
        },
        {
          title: "Local Areas & Content",
          body: "ปิดท้ายด้วยการค้นหาทำเล ย่าน และถนนในกรุงเทพ รองรับผู้ใช้ที่เข้ามาสำรวจโดยยังไม่พร้อมค้นหา และปิดท้ายด้วยส่วนบทความที่รองรับงานฝั่ง Marketing และ SEO โดยตรง วางไว้ล่างสุดเพราะไม่ใช่เส้นทางหลักของคนที่มาหาห้อง",
          src: "/uploads/renthub-craft-v3-location.jpg",
          w: 1600,
          h: 1720,
        },
      ],
    },
    decisionsIntro: "",
    // Process & Key Decisions — user สั่งตัดออกจากหน้านี้ (14 ส.ค. 2026) · ใส่ decision กลับมาเมื่อไหร่ section ก็ขึ้นเอง
    decisions: [],
    expWhy:
      "เก็บพฤติกรรมจริงด้วย GA4 event ร่วมกับ Microsoft Clarity แล้วเทียบ conversion rate แบบ before/after ระหว่าง design เดิมกับ design ใหม่",
    expSegment: "[ วิธีแบ่ง variant ]",
    expTracking: "GA4 event + Microsoft Clarity",
    expDuration: "[ __ สัปดาห์ ]",
    expSample: "Before [ __,000 ] · After [ __,000 ] sessions",
    resultPrimary: {
      label: "Schedule viewing rate",
      before: "[ ก่อน ]",
      after: "[ หลัง ]",
      delta: "+[ __% ] relative improvement",
    },
    resultsSecondary: [
      { label: "Compare → schedule conversion", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
      { label: "Bounce rate", change: "[ ก่อน ] → [ หลัง ]  ([ −% ])" },
      { label: "Lead quality (guardrail)", change: "[ ก่อน ] → [ หลัง ]  (✓)" },
    ],
    devices: [
      { device: "Mobile", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Desktop", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Tablet", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
    ],
    surprised: "[ insight ที่ไม่คาดคิด ]",
    limitation: "[ ยอมรับ constraint ของ experiment — เช่น sample ไม่เท่ากัน ]",
    reflectChallenge: "[ hypothesis ที่ควร challenge มากกว่านี้ ]",
    reflectTrack: ["[ metric ที่ควร track เพิ่ม ]", "[ metric ที่ควร track เพิ่ม ]"],
    reflectResource: [
      "ถ้ามี research budget: moderated test ก่อน ship",
      "ถ้ามีทีม designer: design critique",
    ],
    reflectLesson: "[ 1 ประโยค specific + actionable ]",
  },

  "ai-copilot": {
    title: "AI Listing Assistant",
    category: "AI Digital Product",
    year: "2024 - ปัจจุบัน",
    status: "available",
    liveUrl: "#",
    tagline:
      "ผู้ช่วย AI ในระบบลงประกาศ ที่ช่วยเอเจนต์ร่างคำบรรยาย แนะนำราคา และจัดเรียงรูป — ออกแบบให้โปร่งใสและควบคุมผลลัพธ์ได้",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY - ปัจจุบัน ]",
    metaMethod: "Hypothesis-driven + Usage analytics",
    metaScale: "[ __,000+ ] listings created",
    tools: ["Figma", "Claude", "Google Analytics", "Microsoft Clarity"],
    overview: [
      "AI Listing Assistant เป็นฟีเจอร์ที่ฝังในระบบลงประกาศ ช่วยร่างคำบรรยายทรัพย์ แนะนำช่วงราคา และจัดเรียงรูปอัตโนมัติ โจทย์คือทำให้ AI เป็นผู้ช่วยที่โปร่งใส ตรวจสอบได้ และผู้ใช้ยังคุมผลลัพธ์ได้เต็มที่ รับผิดชอบในฐานะ designer คนเดียวตั้งแต่ pattern การ suggest/edit/accept จนถึง measure การใช้งานจริง",
    ],
    ctxBusiness:
      "revenue signal คือจำนวนประกาศที่ลงสำเร็จและคุณภาพเนื้อหาที่ทำให้ทรัพย์ถูกค้นเจอ",
    ctxProblem: "การลงประกาศใช้เวลานาน เอเจนต์จึงลงทรัพย์ได้น้อยและเนื้อหาไม่สม่ำเสมอ",
    constraints: [
      "Solo designer",
      "ไม่มี user research budget",
      "ต้องออกแบบให้ผู้ใช้ trust AI แต่ยังคุมได้",
      "Dev + model team ขนาดเล็ก",
      "latency ของ AI จำกัด UX",
    ],
    hypothesis:
      "ถ้าให้ AI ร่างเนื้อหาแบบ suggest/edit/accept ที่โปร่งใส จะลดเวลาในการลงประกาศ โดยที่ผู้ใช้ยังรู้สึกควบคุมผลลัพธ์ได้",
    successMetrics: [
      "Primary: เวลาเฉลี่ยในการลงประกาศ 1 ชิ้น",
      "Secondary: อัตราการใช้ AI suggestion (accept rate)",
    ],
    guardrailMetrics: [
      "อัตราการลงประกาศสำเร็จต้องไม่ลด",
      "คุณภาพเนื้อหา (reject/edit rate) ต้องไม่แย่ลง",
    ],
    decisionsIntro: "3 decision ที่ยากที่สุดในการออกแบบ AI experience นี้",
    decisions: [
      { title: "[ ชื่อ decision 1 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 2 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 3 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
    ],
    expWhy:
      "วัดผลจาก usage analytics จริง (GA4 event + Clarity) เทียบเวลาและ accept rate ระหว่าง flow เดิมกับ flow ที่มี AI",
    expSegment: "[ วิธีแบ่ง variant ]",
    expTracking: "GA4 event + Microsoft Clarity",
    expDuration: "[ __ สัปดาห์ ]",
    expSample: "Before [ __,000 ] · After [ __,000 ] listings",
    resultPrimary: {
      label: "เวลาเฉลี่ยในการลงประกาศ",
      before: "[ ก่อน ]",
      after: "[ หลัง ]",
      delta: "−[ __% ] relative improvement",
    },
    resultsSecondary: [
      { label: "AI suggestion accept rate", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
      { label: "การลงประกาศสำเร็จ (guardrail)", change: "[ ก่อน ] → [ หลัง ]  (✓)" },
      { label: "Edit rate หลัง AI ร่าง", change: "[ ก่อน ] → [ หลัง ]  ([ % ])" },
    ],
    devices: [
      { device: "Desktop", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Mobile", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Tablet", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
    ],
    surprised: "[ insight ที่ไม่คาดคิดเกี่ยวกับพฤติกรรมการใช้ AI ]",
    limitation: "[ ยอมรับ constraint — เช่น measure ได้เฉพาะ user ที่เปิดใช้ AI ]",
    reflectChallenge: "[ hypothesis ที่ควร challenge — เช่น สมมติว่าผู้ใช้อยาก automate ทั้งหมด ]",
    reflectTrack: ["[ metric ที่ควร track เพิ่ม — เช่น trust signal ]", "[ metric ที่ควร track เพิ่ม ]"],
    reflectResource: [
      "ถ้ามี research budget: สัมภาษณ์เอเจนต์เรื่อง trust ต่อ AI",
      "ถ้ามี content strategist: จูน tone ของ AI",
    ],
    reflectLesson: "[ 1 ประโยค specific + actionable ]",
  },

  brand: {
    title: "Brand & Graphic Works",
    category: "Visual",
    year: "2018 - ปัจจุบัน",
    status: "available",
    liveUrl: "#",
    tagline:
      "งานออกแบบกราฟิกและภาพประกอบสำหรับแคมเปญการตลาดและสื่อภายในองค์กร — ทำควบคู่กับงาน product เพื่อให้ภาพลักษณ์แบรนด์สอดคล้องกัน",
    metaRole: "Designer",
    metaTimeline: "2018 - ปัจจุบัน",
    metaMethod: "Brief → Explore → Refine → Deliver",
    metaScale: "[ __+ ] ชิ้นงาน",
    tools: ["Figma", "Illustrator", "Photoshop"],
    overview: [
      "รวมงาน visual ที่ทำควบคู่กับงาน product ตั้งแต่ key visual แคมเปญ สื่อโซเชียล ไปจนถึง illustration และ guideline เล็กๆ โจทย์คือทำให้การสื่อสารของแบรนด์ดูเป็นอันหนึ่งอันเดียวกันในทุกช่องทาง และผลิตงานได้เร็วขึ้นด้วยชุด template รับผิดชอบตั้งแต่รับ brief จากทีมการตลาด จนถึงส่งมอบไฟล์พร้อมใช้",
    ],
    ctxBusiness:
      "สื่อของแบรนด์ต้องดูสอดคล้องกันในทุกช่องทางเพื่อสร้างการจดจำ และผลิตซ้ำได้เร็ว",
    ctxProblem: "งาน visual กระจัดกระจาย ไม่มี template กลาง ทำให้ผลิตซ้ำช้าและสไตล์ไม่นิ่ง",
    constraints: [
      "ทำคนเดียวควบคู่งาน product",
      "timeline แคมเปญสั้น",
      "ต้องคงสไตล์ให้นิ่งข้ามหลายชิ้น",
      "ไม่มี brand guideline ตั้งต้นชัดเจน",
    ],
    hypothesis:
      "ถ้าสร้างชุด template และระบบ visual ที่นำกลับมาใช้ได้ จะผลิตงานเร็วขึ้นโดยยังคงคุณภาพและความสอดคล้อง",
    successMetrics: [
      "Primary: เวลาเฉลี่ยในการผลิตงาน 1 ชิ้น",
      "Secondary: จำนวนชิ้นงานที่ reuse template",
    ],
    guardrailMetrics: ["คุณภาพงานต้องไม่ลด", "ความสอดคล้องของแบรนด์ต้องไม่แย่ลง"],
    decisionsIntro: "3 decision ด้าน visual system ที่มีผลต่อความเร็วและความสอดคล้อง",
    decisions: [
      { title: "[ ชื่อ decision 1 ]", reasoning: "[ เหตุผล/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 2 ]", reasoning: "[ เหตุผล/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 3 ]", reasoning: "[ เหตุผล/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
    ],
    expWhy: "วัดผลจาก feedback ทีมการตลาดและ engagement บนโซเชียล เทียบก่อน/หลังใช้ template system",
    expSegment: "[ วิธีเทียบ — เช่น แคมเปญก่อน/หลัง template ]",
    expTracking: "Social engagement + feedback",
    expDuration: "[ __ แคมเปญ ]",
    expSample: "Before [ __ ] · After [ __ ] ชิ้นงาน",
    resultPrimary: {
      label: "เวลาเฉลี่ยในการผลิตงาน 1 ชิ้น",
      before: "[ ก่อน ]",
      after: "[ หลัง ]",
      delta: "−[ __% ] relative improvement",
    },
    resultsSecondary: [
      { label: "Social engagement rate", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
      { label: "อัตราการ reuse template", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
      { label: "คุณภาพงาน (guardrail)", change: "[ ก่อน ] → [ หลัง ]  (✓)" },
    ],
    devices: [
      { device: "Social", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Print", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Web", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
    ],
    surprised: "[ insight ที่ไม่คาดคิด ]",
    limitation: "[ ยอมรับ constraint — เช่น engagement วัดผลตรงกับ visual ได้ยาก ]",
    reflectChallenge: "[ hypothesis ที่ควร challenge ]",
    reflectTrack: ["[ metric ที่ควร track เพิ่ม ]", "[ metric ที่ควร track เพิ่ม ]"],
    reflectResource: [
      "ถ้ามี brand strategist: วาง guideline ตั้งต้น",
      "ถ้ามีทีม designer: แบ่งงานผลิตได้เร็วขึ้น",
    ],
    reflectLesson: "[ 1 ประโยค specific + actionable ]",
  },

  "market-insight": {
    title: "Market Insight Dashboard",
    category: "Analytics",
    year: "2022 - 2023",
    status: "available",
    liveUrl: "#",
    tagline:
      "แดชบอร์ดสรุปแนวโน้มตลาดอสังหาฯ ที่เปลี่ยนข้อมูลจำนวนมากให้อ่านง่ายและนำไปตัดสินใจได้ในไม่กี่วินาที",
    metaRole: "Sole Product Designer",
    metaTimeline: "2022 - 2023",
    metaMethod: "Hypothesis-driven + Comprehension test",
    metaScale: "[ __+ ] ผู้ใช้ภายใน",
    tools: ["Figma", "Looker Studio", "Google Analytics"],
    overview: [
      "Market Insight Dashboard เปลี่ยนข้อมูลตลาดจำนวนมากให้อ่านง่ายและนำไปตัดสินใจได้ ผู้ใช้หลักคือทีมขายและลูกค้าองค์กร โจทย์คือจัดลำดับข้อมูลให้เริ่มจากภาพรวมแล้วเจาะลึกได้ตามทำเลและประเภททรัพย์ รับผิดชอบในฐานะ designer คนเดียวตั้งแต่คัด metric สำคัญ จนถึงทดสอบการตีความข้อมูล",
    ],
    ctxBusiness:
      "ทีมขายและลูกค้าต้องการข้อมูลตลาดที่เชื่อถือได้เพื่อประกอบการตัดสินใจ — value คือความเร็วในการเข้าใจข้อมูล",
    ctxProblem: "ข้อมูลล้นเกินและกระจัดกระจาย ทำให้ผู้ใช้ตีความช้าและตัดสินใจได้ยาก",
    constraints: [
      "Solo designer",
      "ไม่มี user research budget",
      "data source จำกัดโครงสร้างที่ทำได้",
      "ผู้ใช้ไม่ใช่ data expert",
    ],
    hypothesis:
      "ถ้าจัดลำดับการอ่านจาก KPI ภาพรวม → เจาะลึก จะทำให้ผู้ใช้ตีความข้อมูลได้เร็วและถูกต้องขึ้น",
    successMetrics: [
      "Primary: เวลาในการตอบคำถามจากแดชบอร์ด",
      "Secondary: ความถูกต้องในการตีความ",
    ],
    guardrailMetrics: ["อัตราการเข้าใช้ซ้ำต้องไม่ลด", "ความเชื่อมั่นในข้อมูลต้องไม่ลด"],
    decisionsIntro: "3 decision ด้านการจัดลำดับและ visualize ข้อมูล",
    decisions: [
      { title: "[ ชื่อ decision 1 ]", reasoning: "[ เหตุผล/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 2 ]", reasoning: "[ เหตุผล/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 3 ]", reasoning: "[ เหตุผล/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
    ],
    expWhy:
      "วัดผลด้วย comprehension test — ให้ผู้ใช้ตอบคำถามจากแดชบอร์ด แล้วเทียบเวลาและความถูกต้องระหว่าง version เดิมกับใหม่",
    expSegment: "[ วิธีแบ่งกลุ่มผู้ทดสอบ ]",
    expTracking: "Task timing + accuracy log",
    expDuration: "[ __ สัปดาห์ ]",
    expSample: "Before [ __ ] · After [ __ ] ผู้ทดสอบ",
    resultPrimary: {
      label: "เวลาในการตอบคำถามจากแดชบอร์ด",
      before: "[ ก่อน ]",
      after: "[ หลัง ]",
      delta: "−[ __% ] relative improvement",
    },
    resultsSecondary: [
      { label: "ความถูกต้องในการตีความ", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
      { label: "อัตราการเข้าใช้ซ้ำ (guardrail)", change: "[ ก่อน ] → [ หลัง ]  (✓)" },
      { label: "ความเชื่อมั่นในข้อมูล", change: "[ ก่อน ] → [ หลัง ]  ([ +% ])" },
    ],
    devices: [
      { device: "Desktop", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Tablet", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
      { device: "Mobile", before: "[ __% ]", after: "[ __% ]", change: "[ +% ]" },
    ],
    surprised: "[ insight ที่ไม่คาดคิดเกี่ยวกับการอ่านข้อมูล ]",
    limitation: "[ ยอมรับ constraint — เช่น sample เป็นผู้ใช้ภายในเท่านั้น ]",
    reflectChallenge: "[ hypothesis ที่ควร challenge ]",
    reflectTrack: ["[ metric ที่ควร track เพิ่ม ]", "[ metric ที่ควร track เพิ่ม ]"],
    reflectResource: [
      "ถ้ามี research budget: ทดสอบกับลูกค้าจริงหลายกลุ่ม",
      "ถ้ามี data analyst: จูน metric ให้ตรง insight",
    ],
    reflectLesson: "[ 1 ประโยค specific + actionable ]",
  },
} satisfies Record<string, Project>;

export type ProjectSlug = keyof typeof projects;

/** ลำดับการแสดงผล (Home grid) = ลำดับ key ด้านบน
 *  หมายเหตุ: ปุ่ม prev/next ท้ายหน้า case study ไม่ได้ใช้ลำดับนี้แล้ว — ดู getProjectNav() ท้ายไฟล์ */
export const projectSlugs = Object.keys(projects) as ProjectSlug[];

export function getProject(slug: string): Project | undefined {
  return (projects as Record<string, Project>)[slug];
}

// ────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER PROJECTS — งานที่มีในเมนูแต่ยัง "ไม่มี case study เต็ม"
// หน้า /work/<slug> จะ render เป็นหน้า placeholder (โชว์ status + ข้อความสั้น)
// พอมีข้อมูลจริงแล้ว → ย้าย entry ไปไว้ใน `projects` ด้านบน (พร้อม field ครบ) ได้เลย
// ────────────────────────────────────────────────────────────────────────────

export type PlaceholderProject = {
  title: string;
  category: string;
  status: ProjectStatus;
  tagline: string;
  /** ลิงก์เว็บจริง/เดโม — โชว์เป็นปุ่ม "เปิดดูเว็บไซต์" บน header ถ้ามี */
  liveUrl?: string;
  /** เนื้อหา Overview (ย่อหน้าเดียวต่อ project) — ถ้าไม่ใส่ = empty state */
  overview?: string[];
  /** section "Business Goal" (โครงเดียวกับหน้า propertyhub) — ไม่ใส่ = ไม่แสดง section */
  businessGoal?: string[];
  /** รูปประกอบใต้ย่อหน้า Business Goal (กดดูเต็มจอได้) — เทียบเท่า problem.goalImage ของหน้า project จริง */
  businessGoalImage?: CaseImage;
  /** true = รูป Business Goal กดขยายเต็มจอไม่ได้ (Expat — user สั่ง 17 ส.ค. 2026) */
  businessGoalImageNoZoom?: boolean;
  /** section "Process & Key Decisions" (โครงเดียวกับหน้า propertyhub · เรนเดอร์ด้วย ProcessSection)
   *  decision ที่ยังไม่มีเนื้อหาจริงใส่ `{ pending: true }` → การ์ดเส้นประ "รอเนื้อหาจริง"
   *  ไม่ใส่ field นี้เลย = ไม่แสดง section (ใช้กับ Archive / Data & AI Workflow) */
  decisions?: Decision[];
  /** ย่อหน้าใต้รูป process ของ section นี้ — ไม่ใส่ = ใช้ข้อความกลางของ ProcessSection */
  processNote?: string;
  /** ชื่อ H2 ของ section นี้ — ไม่ใส่ = "Process & Key Decisions"
   *  Renthub App ใช้ "Key Decision" เพราะ Wireframe ถูกแยกไปเป็น section ของตัวเอง */
  processHeading?: string;
  /** รูปหัว section Process (เช่น บอร์ด Design Thinking) — ไม่ใส่ = ใช้แถบ 5 ขั้นมาตรฐาน */
  processImage?: CaseImage;
  /** ขั้นย่อยใน Process (Requirement / Research / Wireframe & Style Guide ฯลฯ)
   *  cols > 1 = รูปของขั้นนั้นเรียงเป็นกริดคอลัมน์เท่ากัน ปล่อยความสูงตามจริง */
  processPhases?: {
    title: string;
    body?: string;
    images?: CaseImage[];
    cols?: 1 | 2 | 3;
    /** true = ไม่โชว์ caption ใต้รูป (รูปที่มีชื่อหัวข้ออยู่ในตัวแล้ว เช่น บอร์ด Style Guide) */
    hideCaptions?: boolean;
    /** true = รูปในขั้นนี้กดขยายเต็มจอไม่ได้ */
    noZoom?: boolean;
    /** มีค่านี้ = รูปในขั้นนี้เรียงเป็นแถวเดียวเลื่อนแนวนอน (ลากด้วยเมาส์ได้ + กดดูเต็มจอ) แทนกริด
     *  "phone" = สล็อตแคบสำหรับจอมือถือ · ใช้กับ Wireframe ของ Renthub App */
    rail?: "wide" | "phone";
  }[];
  /** เครื่องมือที่ใช้ — โชว์เป็นการ์ดใน section Tools (ถ้าไม่ใส่ = empty state) */
  tools?: string[];
  /** hero แบบ present — laptop (เว็บ) + phone (แอป) วางคู่กัน · ใส่ทั้งคู่ถึงจะแสดง */
  heroWeb?: string;
  heroPhone?: string;
  /** ลิงก์ App Store — โชว์เป็นปุ่ม "โหลดแอป" บน header ถ้ามี */
  appStoreUrl?: string;
  /** ภาพผลงาน (mockup มือถือ ฯลฯ มีกรอบเครื่องในตัว) — โชว์ใน section "All about works" ถ้ามี */
  screens?: { label?: string; src: string; w: number; h: number }[];
  /** หน้าเว็บที่ออกแบบ — โชว์เป็น browser-frame gallery ("All about works") กดดูเต็มหน้าได้
   *  (เหมือน screens ของ project จริง) */
  works?: { label: string; src?: string; desc?: string; url?: string; w?: number; h?: number }[];
  /** เดโมเว็บ HTML (path ใน public/ เช่น "/demos/baandee.html")
   *  ถ้ามี → โชว์รูปปกในกรอบ browser กดแล้วเปิดเดโมเต็มในแท็บใหม่ (ไม่ฝัง iframe เพราะขนาดเพี้ยน) */
  demoUrl?: string;
  /** รูปปกของเดโม (screenshot หน้าเว็บ) — โชว์ในกรอบ browser ให้กดเปิด demoUrl */
  demoCover?: string;
  /** จอแอปแยกตาม section (โชว์แบบ Propertyhub App — phone บนพื้นเทา, เลื่อนแนวนอน)
   *  section ที่ยังไม่มีรูป = ปล่อย screens: [] ไว้ → โชว์ป้าย "เร็วๆ นี้" */
  appScreens?: { title: string; screens: { src: string; label: string }[] }[];
  /** หน้าเว็บแยกตาม category (โชว์แบบเดียวกับ App — พื้นเทา + header + จอเรียง scroll แนวนอน)
   *  category ที่ยังไม่มีรูป = ปล่อย screens: [] → โชว์ป้าย "เร็วๆ นี้" */
  /** phone: true = เรนเดอร์ด้วย AppScreensShowcase (จอมือถือขนาดเท่า App projects · ไม่มี lightbox) แทน rail เว็บ */
  webScreens?: { category: string; phone?: boolean; screens: { src?: string; label?: string; group?: string; w?: number; h?: number }[] }[];
  /** Style Guide — บอร์ด Color/Font/Icon (โชว์แบบเดียวกับ Propertyhub — รูปเต็มความกว้างเรียงลงมา)
   *  ถ้ามี `wireframes` ด้วย section จะเปลี่ยนชื่อเป็น "Wireframe & Style Guide"
   *  แล้วแบ่งเป็นหัวข้อย่อย Wireframe → Style Guide (user สั่ง 17 ส.ค. 2026) */
  styleGuide?: { label: string; src?: string; w?: number; h?: number }[];
  /** จอ wireframe — วางเป็นหัวข้อย่อยแรกของ section Style Guide (กดดูเต็มจอได้)
   *  ย้ายมาจาก webScreens category "Wireframe" เพื่อไม่ให้ไปปนกับ Final User Interface */
  wireframes?: { label?: string; src?: string; w?: number; h?: number }[];
  /** มีค่านี้ = wireframe เรียงเป็นแถวเดียวเลื่อนแนวนอนแทนกริด ("phone" = สล็อตแคบสำหรับจอมือถือ)
   *  Renthub App ใช้ "phone" · Expat ไม่ใส่ (จอเว็บ ใช้กริด 3 คอลัมน์) */
  wireframesRail?: "wide" | "phone";
  /** true = จอ wireframe กดขยายเต็มจอไม่ได้ (Renthub App — user สั่ง 17 ส.ค. 2026) */
  wireframesNoZoom?: boolean;
  /** ── USER FLOW ── ผังการใช้งานจากจอที่ออกแบบไว้ (จอไหน → ไปจอไหน)
   *  แสดงใน section Process & Key Decisions ก่อนขั้นย่อยของ process
   *  1 lane = 1 เส้นทาง · step ใช้ path รูปจอเดียวกับที่อยู่ใน appScreens */
  userFlow?: {
    title?: string;
    body?: string;
    lanes: { title: string; steps: { src: string; label: string }[] }[];
  };
  /** ── CRAFT SHOWCASE ── โครงเดียวกับของ renthub (ดู CraftItem)
   *  ผ่าหน้า final ออกเป็นบล็อก + เหตุผลของแต่ละบล็อก · ไม่ใส่ = ไม่แสดง section */
  craft?: { intro?: string; items: CraftItem[] };
};

export const placeholderProjects = {
  // Data & AI Workflow — render ด้วย DataAnalysisView (special-case ใน work/[slug])
  // เนื้อหาจริงอยู่ที่ data/data-analysis.ts · entry นี้ให้ title/tagline/status + SEO metadata
  "data-analysis": {
    title: "Data & AI Workflow",
    category: "Digital Product",
    status: "available",
    tagline:
      "วิเคราะห์ data ของ product เองด้วย Claude + MCP ต่อเข้ากับ GA4 / Clarity / Zimple ขุด insight แล้วต่อยอดเป็น idea และ mockup ได้โดยไม่ต้องรอทีม data",
    tools: ["Claude", "Google Analytics", "Microsoft Clarity", "Figma"],
  },
  "propertyhub-app": {
    title: "Propertyhub App",
    category: "Digital Product",
    status: "available",
    tagline:
      "แอปมือถือของ Propertyhub บน iOS และ Android ค้นหา เปรียบเทียบ และติดต่อประกาศเช่า/ขายได้ครบในมือ",
    // โครงเดียวกับ overview ของ propertyhub (เว็บ): ทำอะไรกับโปรเจกต์ → ตัวเลขหลังเปิดตัว
    // ข้อความทั้ง 2 ย่อหน้าตามที่ user เขียนเอง (แก้ล่าสุด 17 ส.ค. 2026) — ห้ามเรียบเรียงใหม่
    overview: [
      "ออกแบบแอปพลิเคชัน Propertyhub บน iOS และ Android สำหรับซื้อ ขาย และเช่าอสังหาริมทรัพย์ทั่วไทย ครอบคลุมคอนโด บ้าน ที่ดิน และอสังหาริมทรัพย์กว่า 240,000 ประกาศ พร้อมฟีเจอร์ค้นหาผ่านแผนที่ บันทึกประกาศและการค้นหา รวมถึงแชทกับผู้ลงประกาศโดยตรง หลังเปิดตัวปีแรก มียอดดาวน์โหลดกว่า 73,000 ครั้ง และการเข้าชมกว่า 18.4 ล้านหน้า",
      "ใช้เวลาพัฒนาประมาณ 4 เดือนก่อนเปิดตัว โดยรับผิดชอบในฐานะ Designer เพียงคนเดียวแบบ End-to-End ตั้งแต่การทำ Research, วาง Design System, ออกแบบ Interface, Hand-off ไปจนถึงการตรวจสอบงานก่อน Deploy โดยทำงานร่วมกับทีม PM, Business, Marketing, Sales และ Developer เพื่อให้การออกแบบตอบโจทย์ทั้งด้านผู้ใช้งานและ Business Goal ของโปรเจกต์",
    ],
    // ── PROCESS & KEY DECISIONS ── แบ่งเป็นขั้นย่อย (user สั่ง 14 ส.ค. 2026)
    // ไม่มี processNote = ไม่แสดงแถบ process 5 ขั้นด้านบน (ย่อหน้าย้ายลงไปอยู่ใน Requirement แล้ว)
    processPhases: [
      {
        title: "Requirement",
        // ข้อความตามที่ user เขียนเอง 14 ส.ค. 2026 — ห้ามเรียบเรียงใหม่
        body: "การเริ่มต้นหา solution ใช้การคุยและทำ Design Thinking ร่วมกับทีม PM, Business, Marketing และ Sales เพื่อรวบรวมสิ่งที่อยากมีและสิ่งที่ user ต้องการ เพราะทีม Sales และ Marketing เป็นคนที่พูดคุยกับลูกค้ามากที่สุด",
        // บอร์ด Design Thinking เฉพาะขั้น Empathize + Define (user เปลี่ยนรูปเป็นตัวครอปนี้
        // 14 ส.ค. 2026 · ตัวเต็มที่มี Ideate/Prototype/Test ถูกแทนที่ไปแล้ว)
        //
        // ท้าย "-v2" ในชื่อไฟล์มีไว้บังคับให้เบราว์เซอร์เลิกใช้รูปเก่าที่ cache ไว้
        // (เคยชื่อ propertyhub-app-design-thinking.jpg → Design-Thiking.jpg → ตัวนี้)
        // ⚠️ เปลี่ยนรูปเมื่อไหร่ต้องแก้ w/h ให้ตรงขนาดจริงด้วย ไม่งั้นสัดส่วนเพี้ยน
        // ⚠️ ไฟล์นี้กว้าง 922px ตัวหนังสือใน sticky note เลยเล็ก ถ้าอยากให้ซูมอ่านได้ชัด
        //    ต้อง export ใหม่ที่ ~2000px
        images: [
          {
            src: "/uploads/propertyhub-app-design-thinking-v2.jpg",
            label: "บอร์ด Design Thinking ขั้น Empathize และ Define ที่ทำร่วมกับทีม",
            w: 922,
            h: 722,
          },
        ],
      },
      {
        title: "Research",
        // ⚠️ ย่อหน้านี้เป็นร่างจาก AI — user พิมพ์ค้างไว้แค่ "Research คือ " ยังไม่ได้ให้เนื้อความ
        body: "สำรวจแอปอสังหาริมทรัพย์ที่มีอยู่ในตลาดเพื่อดูว่าแต่ละเจ้าจัดลำดับอะไรไว้บนหน้าแรก วางการค้นหาแบบไหน และพาผู้ใช้ไปถึงการติดต่อผู้ลงประกาศด้วยเส้นทางกี่ขั้น ข้อมูลชุดนี้ใช้ตรวจสอบว่ารายการฟีเจอร์ที่ได้จากขั้น Requirement อันไหนเป็นมาตรฐานที่ผู้ใช้คาดหวังอยู่แล้ว และอันไหนเป็นของที่เพิ่มมาโดยยังไม่มีใครทำ",
        cols: 3,
        // user สั่ง 14 ส.ค. 2026 — จอแอปในตลาดดูจากขนาดในหน้าก็พอ ไม่ต้องกดขยาย
        noZoom: true,
        // ⚠️ research-1 ลงท้าย "-v3" เพราะเปลี่ยนรูป/ครอปหลายรอบ แล้วเบราว์เซอร์ cache URL เดิมไว้
        //    เปลี่ยนชื่อไฟล์ = เปลี่ยน URL = บังคับโหลดใหม่
        // ตัว v3 ถูกครอปความสูงจาก 797 → 650 ให้อัตราส่วน (0.560) เท่ากับรูป 2 และ 3
        //    จอในกริดจะได้สูงเท่ากันทั้งสามใบ (user สั่ง 14 ส.ค. 2026)
        // ⚠️ ชื่อแอปในรูป 1–2 อ่านจากโลโก้ในรูปโดยตรง · รูป 3 ยังไม่ยืนยัน (ดูจากป้าย
        //    "Curated by 99" คาดว่าเป็น 99.co) — ให้ user ยืนยันก่อนถือว่าถูก
        images: [
          { src: "/uploads/propertyhub-app-research-1-v3.jpg", label: "LivingInsider", w: 364, h: 650 },
          { src: "/uploads/propertyhub-app-research-2.jpg", label: "PropertyGuru", w: 446, h: 797 },
          { src: "/uploads/propertyhub-app-research-3.jpg", label: "99.co (สิงคโปร์)", w: 442, h: 795 },
        ],
      },
      {
        title: "Wireframe & Style Guide",
        // ใจความตามที่ user เขียนเอง 14 ส.ค. 2026 (ปรับเป็นภาษาทางการ ไม่มีสรรพนาม)
        body: "Wireframe ที่ใช้เป็นแบบ High-Fidelity คือลงรายละเอียด UI ไปพร้อมกับโครงหน้าในขั้นเดียว ควบคู่กับการวาง Style Guide ของแอปทั้งชุดสี ตัวอักษร และไอคอน เพื่อให้ทุกจอที่ออกแบบต่อจากนั้นใช้ของชุดเดียวกันทั้งแอป",
        cols: 3,
        // hideCaptions = ในรูปมีคำว่า Color / Typography / Icon อยู่แล้ว ไม่ต้องซ้ำใต้รูป
        // (label ยังอยู่เพราะใช้เป็น alt และ caption ตอนกดดูเต็มจอ)
        hideCaptions: true,
        images: [
          { src: "/uploads/propertyhub-app-ds-color.jpg", label: "Color", w: 4320, h: 4200 },
          { src: "/uploads/propertyhub-app-ds-typography.jpg", label: "Typography", w: 4320, h: 5700 },
          { src: "/uploads/propertyhub-app-ds-icon-v2.jpg", label: "Icon", w: 4320, h: 7818 },
        ],
      },
    ],
    decisions: [
      {
        // หัวข้อ = ข้อความที่ user เขียนเอง (ปรับเป็นภาษาทางการ ไม่มีสรรพนาม ความหมายเดิม)
        // ⚠️ Problem / Trade-off / Validation เป็นร่างจาก AI — อ้างจากข้อเท็จจริงที่ user ให้มา
        //    (เวลาพัฒนา 4 เดือน · รายการหน้าในขั้น Define · เมนูล่างตอนปล่อยครั้งแรก 3 เมนู
        //    · ยอดดาวน์โหลด 73,000 ครั้งปีแรก) user ยังไม่ได้ยืนยันถ้อยคำ
        title:
          "คัดฟีเจอร์พื้นฐานให้ใช้งานได้ก่อนใน phase แรก แทนการใส่ฟีเจอร์ทุกอย่างในครั้งเดียวแล้วใช้เวลานานในการ Develop และทำให้งานเกินระยะเวลาที่กำหนด",
        mock: "feature-phases",
        // Problem / Trade-off / Validation = ฉบับสมบูรณ์ที่ user เขียนเอง 14 ส.ค. 2026 (เย็น)
        // ห้ามเรียบเรียงใหม่ — เป็นถ้อยคำที่ user เคาะแล้ว
        reasoning:
          "การพัฒนาแอปให้ครบทุกฟีเจอร์ตั้งแต่เปิดตัวใช้เวลานาน ขณะที่ timeline การ launch มีจำกัด การฝืนทำทุกอย่างพร้อมกันเสี่ยงที่งานจะออกมาไม่เรียบร้อยและเทสไม่ทั่วถึง โจทย์จึงอยู่ที่การเลือกว่าจะโฟกัสอะไรก่อนใน launch แรก",
        tradeoff:
          "เลือกให้ launch แรกโฟกัสฝั่งผู้หาที่อยู่อาศัย ค้นหา ดูประกาศ และบันทึกรายการโปรด ส่วนฟีเจอร์ลงประกาศที่เป็นงานของเอเจนต์และผูกกับระบบจัดการทั้งหมด (ลงประกาศ เลื่อนประกาศ ดูสถิติ) เลื่อนไป Phase ถัดไป เพราะกลุ่มนี้ยังใช้งานผ่านเว็บได้สะดวกอยู่แล้ว",
        outcome:
          "การตัดสินใจนี้มองว่ามือถือคือช่องทางของผู้หาที่ต้องการค้นหาได้ทุกที่ทุกเวลา ขณะที่การลงประกาศเป็นงานที่ทำบนเดสก์ท็อปได้ดีกว่า การโฟกัสฝั่งผู้หาก่อนจึงเป็นส่วนสำคัญหลักของแอปที่ต้องส่งให้ถึงมือผู้ใช้กลุ่มใหญ่ที่สุดก่อน แล้วค่อยขยายไปฝั่งผู้ลงประกาศเมื่อพร้อม",
      },
      {
        // Decision 2 — ข้อความทั้งหมด (หัวข้อ / Problem / Trade-off / Validation)
        // เป็นของ user โดยตรง 17 ส.ค. 2026 ห้ามเรียบเรียงใหม่
        // (Decision 2 เดิมเรื่อง checklist ก่อนปล่อยงาน ถูกตัดไปแล้ว 14 ส.ค. 2026)
        title:
          "เปลี่ยน Input Form ยาวๆ เป็นแบบทีละสเต็ป แบ่งข้อมูลการลงประกาศเป็นหน้าย่อย เพื่อลดความรู้สึกซับซ้อนและน่าเบื่อของผู้ใช้งาน เพราะการลงประกาศข้อมูลค่อนข้างเยอะ",
        // จอจริงของฟอร์มลงประกาศ — เห็นแถบบอกขั้นตอนด้านบนและปุ่ม "บันทึกแบบ" ที่พูดถึงใน Validation
        // user เปลี่ยนเป็นชุด screenshot ไม่มีกรอบเครื่อง 17 ส.ค. 2026
        // (ต้นฉบับ Downloads/S__31686661_0.jpg, S__31686662_0.jpg, S__31686663_0.jpg)
        // ไฟล์ชุดเดิม propertyhub-app-post-step1/2.png ไม่ได้ใช้แล้ว แต่ยังอยู่ใน public/uploads
        figures: [
          { src: "/uploads/propertyhub-app-post-form-1.jpg", label: "ข้อมูลทั่วไป", w: 921, h: 1777 },
          { src: "/uploads/propertyhub-app-post-form-2.jpg", label: "ประเภทประกาศ / ราคา", w: 924, h: 1772 },
          { src: "/uploads/propertyhub-app-post-form-3.jpg", label: "จัดการรูปภาพ", w: 923, h: 1773 },
        ],
        reasoning:
          "จากการทำ User Testing พบว่าผู้ใช้งานรู้สึกเหนื่อยในการกรอก เพราะกล่อง Input Field ค่อนข้างเยอะ จะส่งผลให้รู้สึกว่าขั้นตอนยุ่งยากและเลิกใช้งานไปในที่สุด",
        tradeoff:
          "ช่วยลด Cognitive Overload โดยแบ่งข้อมูลเป็นสัดส่วน ผู้ใช้โฟกัสทีละเรื่อง มี Progress Bar บอกชัดเจนว่าเหลืออีกกี่ขั้นตอน แต่สิ่งที่ต้องแลกคือ ผู้ใช้ไม่สามารถเห็นภาพรวมของฟอร์มทั้งหมดได้ในพริบตาและจำนวนคลิกเพิ่มขึ้นเพราะต้องกดปุ่ม “ถัดไป” หลายครั้ง",
        // ข้อนี้มีผลเทสจริง จึงใช้หัวข้อ "Validation" แทนค่ารวมของหน้านี้ที่เป็น "Why this works"
        validationLabel: "Validation",
        outcome:
          "จากการทำ Usability Testing รอบใหม่ ฟีดแบ็กว่า “รู้สึกกรอกง่ายขึ้น ไม่น่าเบื่อเหมือนก่อน” ทำให้ไม่หลุดโฟกัสในการกรอก มีบอกว่ากำลังอยู่ step ไหนตอนกรอก และนอกจากนี้ยังเพิ่มปุ่ม “บันทึกแบบ” เพื่อแก้ปัญหาการกรอกทีเดียวทั้งหมดก่อนถึงจะบันทึกได้ ผู้ใช้จะบันทึกตอนไหนก็ได้ไม่จำเป็นต้องกรอกให้เสร็จทีเดียว",
      },
    ],
    // ⚠️ AI ร่างจาก overview ของโปรเจกต์นี้ — user ยังไม่ได้ยืนยันถ้อยคำ
    businessGoal: [
      "ขยายแพลตฟอร์มจากเว็บไซต์มาสู่มือถือ เพื่อให้การค้นหาและติดตามประกาศเกิดขึ้นได้ทุกที่ ไม่จำกัดอยู่แค่ตอนที่ผู้ใช้นั่งอยู่หน้าคอมพิวเตอร์ โดยยกความสามารถหลักของเว็บมาให้ครบ ทั้งการค้นหาบนแผนที่ การบันทึกประกาศโปรด การเซฟการค้นหาไว้ใช้ซ้ำ และการแชทกับผู้ลงประกาศโดยตรง ซึ่งเป็นจุดที่เกิดรายได้ของแพลตฟอร์ม",
    ],
    screens: [
      { label: "Home", src: "/uploads/propertyhub-app-home.png", w: 660, h: 1320 },
      { label: "Listing detail", src: "/uploads/propertyhub-app-detail.png", w: 660, h: 1320 },
    ],
  },
  "renthub-app": {
    title: "Renthub App",
    category: "Digital Product",
    status: "available",
    tagline:
      "ออกแบบแอป Renthub บน iOS และ Android สำหรับค้นหาหอพักและอพาร์ทเม้นท์ให้เช่าทั่วไทย พร้อมค้นหาบนแผนที่ เปรียบเทียบที่พัก และแชทกับเจ้าของโดยตรง",
    // ข้อความทั้ง 2 ย่อหน้าจาก user โดยตรง (17 ส.ค. 2026) — ห้ามเรียบเรียงใหม่
    overview: [
      "ออกแบบแอปพลิเคชัน Renthub บน iOS และ Android สำหรับค้นหาหอพักและอพาร์ทเม้นท์ให้เช่าทั่วไทยกว่า 20,000 แห่ง ทั้งรายเดือนและรายวัน พร้อมฟีเจอร์ค้นหาตามทำเลและจุดสำคัญ เปรียบเทียบหอพัก ดูภาพและ Virtual Tour 360° รวมถึงแชทกับเจ้าของแบบเรียลไทม์ และ Verify เพื่อเพิ่มความน่าเชื่อถือของประกาศ โดยในปี 2025 แพลตฟอร์มมีผู้ใช้งานกว่า 10 ล้านคน, 106 ล้าน Pageviews และยอดดาวน์โหลดแอปกว่า 770,000 ครั้งบน iOS และ Android",
      "ใช้เวลาพัฒนาประมาณ 3 - 5 เดือน ทำงานร่วมกับ PM, Business และ Developer ในฐานะ Designer คนเดียวของโปรเจกต์ รับผิดชอบตั้งแต่รับ Requirement, Research, Wireframe, Prototype, Interface Design, Hand-off ไปจนถึงตรวจงานก่อนปล่อยขึ้นสโตร์",
    ],
    // section "Key Decision" — เนื้อหาทั้งหมดเป็นข้อความจาก user โดยตรง (17 ส.ค. 2026) ห้ามเรียบเรียงใหม่
    decisions: [
      {
        title:
          "เปลี่ยนการแสดงผลบนแผนที่จากหมุดไอคอนเป็นป้ายราคา เพื่อเพิ่มการค้นหาราคาที่ตรงกับความต้องการของผู้ใช้งานมากขึ้น",
        // รูปเทียบก่อน/หลัง — ใช้ figures (กริด 2 คอลัมน์) ไม่ใช้ before/after
        // เพราะ variant pair จะ crop ความสูงไว้ 500px ซึ่งตัดจอมือถือขาดครึ่ง
        // ไฟล์ user วางไว้ใน public/uploads เองแล้ว (Renthub_Map_UI_Before / _After)
        // ⚠️ ตั้งชื่อไฟล์เป็น kebab-case ตัวเล็กล้วนเสมอ (เดิมชื่อ RentHub_Map_UI_Before/After.jpg)
        //    17 ส.ค. 2026: การแทนที่คำว่า RentHub → Renthub ทั้งไฟล์ไปโดนชื่อไฟล์ในนี้ด้วย
        //    Windows ไม่แยกตัวพิมพ์เลยไม่พังตอน dev แต่ Vercel รันบน Linux → รูป 404 บนเว็บจริง
        figures: [
          { src: "/uploads/renthub-app-map-before.jpg", label: "Before", w: 1125, h: 2436 },
          { src: "/uploads/renthub-app-map-after.jpg", label: "After", w: 868, h: 1887 },
        ],
        // ขนาดรูปเท่าตอนวาง 3 รูป แต่จัดไว้กลาง (user สั่ง 17 ส.ค. 2026)
        figuresCols: 3,
        figuresCenter: true,
        reasoning:
          "ราคาคือปัจจัยอันดับ 1 ในการตัดสินใจเลือกเช่าหอพักของผู้ใช้งาน Renthub โดยการใช้หมุดไอคอนแบบเดิม บังคับให้ผู้ใช้ต้อง “สุ่มกด” (Blind Clicking) เปิดดูทีละหมุดเพื่อเช็คราคาว่าอยู่ในงบประมาณหรือไม่ เกิด Friction ส่งผลให้ผู้ใช้ Bounce ไปก่อนจะเจอห้องที่ต้องการ",
        tradeoff:
          "สิ่งที่ได้มาคือผู้ใช้เปรียบเทียบราคาในทำเลเดียวกันได้ทันที สแกนหาห้องพักที่อยู่ในงบได้เร็วขึ้น แต่สิ่งที่ต้องแลกมาคือ ความแออัดของหน้าจอ (UI Cluttering) ป้ายราคาใช้พื้นที่บนจอมากกว่าหมุดไอคอนปกติ หากมีหอพักในบริเวณนั้นหนาแน่น ป้ายจะซ้อนทับกันจนอ่านไม่ออก รวมถึงการดึงข้อมูลและเรนเดอร์ตัวเลขราคาจำนวนมากพร้อมกันบนแผนที่ อาจทำให้แอปกระตุกหรือโหลดช้าลง",
        outcome:
          "จากการทำ Usability Testing พบว่าผู้ทดสอบสามารถมองหาและเลือกห้องพักที่อยู่ในงบประมาณของตัวเองได้ทันทีในครั้งแรก โดยไม่มีผู้ทดสอบคนใดสุ่มกดหมุดก่อนเพื่อดูราคาในการ์ดด้านล่างเหมือนใน UI เก่า",
      },
    ],
    // หมายเหตุ: เคยมี `userFlow` (ผังจอ 3 เส้นทาง) ตรงนี้ — user สั่งเอาออก 17 ส.ค. 2026
    //   component ยังอยู่ที่ components/case-study/user-flow.tsx ถ้าจะกลับมาใช้
    // section Process เปลี่ยนชื่อเป็น "Key Decision" เพราะ Wireframe ถูกแยกไปรวมกับ Style Guide
    // เป็น section "Wireframe & Style Guide" แบบหน้า Expat (user สั่ง 17 ส.ค. 2026)
    processHeading: "Key Decision",
    // จอ wireframe — โชว์เป็นหัวข้อย่อยแรกของ section Wireframe & Style Guide (แถวเลื่อนแนวนอน)
    // ไฟล์ชุดใหม่ที่ user วางไว้ใน public/uploads เอง (17 ส.ค. 2026)
    // ชุดเดิม renthub-app-wireframe*.png ไม่ได้ใช้แล้ว แต่ยังอยู่ในโฟลเดอร์
    // เหลือ 3 จอ วางเป็นกริด 3 คอลัมน์กว้างเท่ากัน (user สั่ง 17 ส.ค. 2026)
    // จอที่ 4 "รายการที่พัก" (Renthub-Wirefram-4.jpg) ถูกตัดออก ไฟล์ยังอยู่ในโฟลเดอร์
    // user สั่ง 17 ส.ค. 2026 — จอ wireframe ดูจากขนาดในหน้าก็พอ ไม่ต้องกดขยาย
    wireframesNoZoom: true,
    wireframes: [
      { label: "หน้าแรก", src: "/uploads/Renthub-Wirefram-1.jpg", w: 374, h: 820 },
      { label: "รายละเอียดที่พัก", src: "/uploads/Renthub-Wirefram-2.jpg", w: 319, h: 701 },
      { label: "ค้นหาบนแผนที่", src: "/uploads/Renthub-Wirefram-3.jpg", w: 296, h: 646 },
    ],
    // ข้อความจาก user โดยตรง (17 ส.ค. 2026)
    businessGoal: [
      "สร้าง Mobile App เพื่อขยายการเข้าถึงผู้ใช้งานบนมือถือ และรองรับพฤติกรรมการค้นหาที่พักที่ต้องการความสะดวกและรวดเร็วมากขึ้น โดยสร้างประสบการณ์ตั้งแต่การค้นหาที่พักตามตำแหน่งและทำเล ไปจนถึงการดูรายละเอียดและติดต่อเจ้าของหอพักโดยตรง เพื่อเพิ่ม Engagement และโอกาสในการเปลี่ยนผู้ค้นหาให้เป็นผู้เช่า",
    ],
    tools: ["Figma"],
    appStoreUrl: "https://apps.apple.com/th/app/renthub/id1609161570",
    // hero — splash → onboarding → home
    screens: [
      { label: "Splash", src: "/uploads/renthub-app-splash.png", w: 660, h: 1320 },
      { label: "Onboarding", src: "/uploads/renthub-app-onboarding.png", w: 660, h: 1320 },
      { label: "Home", src: "/uploads/renthub-app-home-main.png", w: 660, h: 1320 },
    ],
    // Style Guide ของแอป — 5 บอร์ด เรียงตามที่ user กำหนด (17 ส.ค. 2026)
    // แสดงเป็นกริด 3 คอลัมน์ 2 แถว (ไม่ใช้แถวเลื่อน เพราะเงาโดนตัด)
    // ไฟล์ย่อจาก 4320px เหลือ 2160px แล้ว (ต้นฉบับอยู่ที่ Downloads/DPM_Wireframe)
    styleGuide: [
      { label: "Typography", src: "/uploads/renthub-app-ds-typography.jpg", w: 2160, h: 1536 },
      { label: "Color", src: "/uploads/renthub-app-ds-color.jpg", w: 2160, h: 1536 },
      { label: "Element", src: "/uploads/renthub-app-ds-element.jpg", w: 2160, h: 1536 },
      { label: "Spacing", src: "/uploads/renthub-app-ds-spacing.jpg", w: 2160, h: 1536 },
      { label: "Button", src: "/uploads/renthub-app-ds-buttons.jpg", w: 2160, h: 1536 },
    ],
    // Final User Interface — กลุ่มเดียวรวมทุกจอ (user สั่งตัด Related ออก 17 ส.ค. 2026)
    // จอ Wireframe อยู่ใน Process & Key Decisions (processPhases ด้านบน) ไม่ได้อยู่ในนี้
    appScreens: [
      {
        title: "Main Screen",
        // 9 จอ เรียงตามเลขที่ user เขียนกำกับบนรูป (17 ส.ค. 2026)
        // จอที่กากบาททิ้ง: Onboarding 5 จอ · รีวิวทั้งหมด · หอพักที่เคยเข้าชม · แชท 2 จอ
        //   · เข้าสู่ระบบ · โปรไฟล์ (เข้าสู่ระบบแล้ว) · แก้ไขข้อมูลส่วนตัว — ไฟล์ยังอยู่ครบ
        screens: [
          { src: "/uploads/renthub-app-home-main.png", label: "หน้าแรก" }, // 1
          { src: "/uploads/renthub-app-favorite.png", label: "หอพักที่คุณสนใจ" }, // 2
          { src: "/uploads/renthub-app-chat-list.png", label: "กล่องข้อความ" }, // 3
          { src: "/uploads/renthub-app-profile.png", label: "โปรไฟล์" }, // 4
          { src: "/uploads/renthub-app-map.png", label: "ค้นหาบนแผนที่" }, // 5
          { src: "/uploads/renthub-app-detail.png", label: "รายละเอียดที่พัก" }, // 6
          { src: "/uploads/renthub-app-search.png", label: "ค้นหาตามสถานี" }, // 7
          { src: "/uploads/renthub-app-compare.png", label: "เลือกเปรียบเทียบจากหน้ารายละเอียด" }, // 8
          { src: "/uploads/renthub-app-compare-detail.png", label: "เปรียบเทียบที่พัก" }, // 9
        ],
      },
    ],
  },
  "renthub-agency": {
    title: "Expat",
    category: "Digital Product",
    status: "process",
    tagline:
      "เว็บแพลตฟอร์มหาที่พักให้เช่าสำหรับชาวต่างชาติในกรุงเทพฯ ค้นหา เปรียบเทียบ และติดต่อเอเจนต์ได้ในที่เดียว",
    liveUrl: "https://expathome.dev/",
    // ข้อความทั้ง 2 ย่อหน้าจาก user โดยตรง (17 ส.ค. 2026) — ห้ามเรียบเรียงใหม่
    overview: [
      "ออกแบบเว็บไซต์ Expat แพลตฟอร์มค้นหาที่พักให้เช่าสำหรับชาวต่างชาติ โดยรวบรวมอพาร์ทเม้นท์ระดับราคาค่าเช่าสูงที่ไม่ได้ลงประกาศบน Renthub มานำเสนอในรูปแบบที่เหมาะกับกลุ่มผู้เช่าต่างชาติ ครอบคลุมทั้งประสบการณ์บน Web และ Mobile",
      "ใช้เวลาพัฒนาประมาณ 3 เดือน ทำงานร่วมกับ PM, Business และ Developer ในฐานะ Designer คนเดียวของโปรเจกต์ รับผิดชอบตั้งแต่ Requirement, Research, Wireframe, Style Guide, Interface Design ทั้ง Web และ Mobile ไปจนถึง Hand-off ให้ทีม Developer",
    ],
    // Process & Key Decisions — user สั่งตัดออกจากหน้านี้ก่อน (17 ส.ค. 2026)
    // ใส่ decision กลับเข้ามาเมื่อไหร่ section ก็ขึ้นเอง
    decisions: [],
    // ข้อความจาก user โดยตรง (17 ส.ค. 2026) — ยุบจาก 2 ย่อหน้าเหลือย่อหน้าเดียว
    // รูปสรุปโมเดลรายได้ (โฆษณา → คอมมิชชัน + funnel ที่ต้องพาไปให้ถึงการติดต่อ)
    // user ส่งไฟล์มา 17 ส.ค. 2026 (Downloads/renthub_expat_commission.png)
    // user สั่ง 17 ส.ค. 2026 — รูปนี้ดูจากขนาดในหน้าก็พอ ไม่ต้องกดขยาย
    businessGoalImageNoZoom: true,
    businessGoalImage: {
      src: "/uploads/expat-commission-flow.png",
      label: "Business Model การสร้างรายได้ของ Expat",
      w: 2720,
      h: 2264,
    },
    businessGoal: [
      "เปิดช่องทางรายได้ใหม่ที่แตกต่างจากโมเดลโฆษณาของ Renthub โดยเจาะกลุ่มอพาร์ทเม้นท์ระดับราคาค่าเช่าสูงและผู้เช่าชาวต่างชาติในกรุงเทพฯ เน้นสร้าง Conversion จากผู้ค้นหาไปสู่การติดต่ออพาร์ทเม้นท์ เนื่องจากรายได้หลักมาจากค่าคอมมิชชันเมื่อผู้เช่าระบุว่ามาจาก Expat",
    ],
    tools: ["Figma"],
    // hero ตัวใหม่ 17 ส.ค. 2026 — user ส่ง Downloads/Hero-Expat.jpg มาแบบพื้นหลังดำ (export โปร่งใสแล้วเซฟ JPG)
    // ลบพื้นหลังด้วย flood fill จากขอบภาพเฉพาะพิกเซลที่มืดจัด แล้ว trim ขอบว่างออก
    // (สัดส่วนเท่าไฟล์เดิมพอดี 1.649 — ไม่ต้องแก้ w/h ที่ placeholder-view)
    heroWeb: "/uploads/expat-hero-laptop.png",
    heroPhone: "/uploads/renthub-agency-app-home.png",
    // ── CRAFT SHOWCASE ── ผ่าหน้า Home ของ Expat ออกเป็น 6 บล็อก (โครงเดียวกับ renthub)
    // crop จาก renthub-agency-home-v3.jpg (1600×6808) ด้วย sharp ที่พิกัด y:
    //   hero 0-1194 · neighborhood 1206-2563 · destination 2572-3263
    //   recommend 3266-4978 · steps 4980-5508 · contact 5510-6252
    //   (เลี่ยงเส้นคั่นของหน้าที่ y=1200 กับ 2567 และรอยต่อพื้นหลังแต่ละ section)
    // body ทั้ง 6 เป็นข้อความจาก user โดยตรง (17 ส.ค. 2026) ห้ามเรียบเรียงใหม่
    //
    // capture หน้า Home ถูกอัปเดต 2 รอบใน 17 ส.ค. 2026 (ตั้งชื่อ v2/v3 กัน next/image cache ค้าง)
    //   v2 = section Find My Home แก้ step 1 จาก Bedroom เป็น Information
    //        และการ์ดทั้ง 4 ใบมีคำบรรยายของตัวเอง (เดิมซ้ำกันหมด)
    //   v3 = เปลี่ยนแบรนด์ในหน้าจาก "Houser" เป็น "Expat" (หัวข้อ Find My Home, ท้ายฟอร์ม Contact
    //        และในรูป hero) · ไฟล์ v1/v2 ถูกลบทิ้งแล้วเพราะไม่มีอะไรอ้างถึง
    // ถ้าจะตัด crop ใหม่: ย่อ capture เป็นกว้าง 1600px ก่อน แล้วใช้พิกัด y ข้างบน
    craft: {
      items: [
        {
          title: "Search & Mass Transit",
          body: "Hero Section ที่ผสาน Value Proposition เข้ากับ Search Bar เพื่อให้ผู้ใช้สามารถเริ่มค้นหาที่พักได้ทันที โดยรองรับการค้นหาตามจุดหมาย ช่วงราคา และประเภทห้อง พร้อม Explore by BTS/MRT สำหรับค้นหาที่พักตามสถานีรถไฟฟ้ายอดนิยม เหมาะสำหรับผู้ใช้ที่เดินทางด้วยระบบขนส่งสาธารณะเป็นหลัก",
          src: "/uploads/expat-craft-v3-hero.jpg",
          w: 1600,
          h: 1194,
        },
        {
          title: "Bangkok Neighborhoods",
          body: "นำเสนอย่านยอดนิยมในกรุงเทพฯ เช่น Thonglor, Silom, Sathorn และ Asoke ผ่าน Visual Grid ขนาดใหญ่ ช่วยให้ผู้ใช้สามารถสำรวจและเลือกทำเลที่สนใจได้ง่ายขึ้น โดยไม่จำเป็นต้องเริ่มต้นจากการค้นหาด้วยตัวเอง",
          src: "/uploads/expat-craft-v3-neighborhood.jpg",
          w: 1600,
          h: 1357,
        },
        {
          title: "Top Destinations",
          body: "ขยายการค้นหาไปยังจุดหมายปลายทางยอดนิยม เช่น Phuket, Pattaya และ Chonburi ผ่าน Carousel เพื่อให้ผู้ใช้สามารถสำรวจตัวเลือกที่พักในพื้นที่ต่างๆ ได้อย่างรวดเร็ว",
          src: "/uploads/expat-craft-v3-destination.jpg",
          w: 1600,
          h: 691,
        },
        {
          title: "Recommended Apartments",
          body: "แสดงรายการอพาร์ทเม้นท์แนะนำในรูปแบบ Card โดยรวบรวมข้อมูลสำคัญสำหรับการตัดสินใจไว้ในจุดเดียว ทั้งราคาเริ่มต้น รีวิว และสิ่งอำนวยความสะดวก พร้อม CTA “Check Availability” สำหรับดูรายละเอียดและติดต่ออพาร์ทเม้นท์",
          src: "/uploads/expat-craft-v3-recommend.jpg",
          w: 1600,
          h: 1712,
        },
        {
          title: "Find My Home in 4 Steps",
          body: "Guided Search ที่ช่วยให้ผู้ใช้ค้นหาที่พักผ่าน 4 ขั้นตอน ได้แก่ Information, Budget, Amenities และ Location โดยออกแบบให้การค้นหาเป็นลำดับและเข้าใจง่าย เหมาะสำหรับผู้ใช้ที่ยังไม่มีเกณฑ์การค้นหาที่ชัดเจน",
          src: "/uploads/expat-craft-v3-steps.jpg",
          w: 1600,
          h: 528,
          // จอจริงของ flow นี้ ย้ายมาจาก webScreens category "Find My Home" (user สั่ง 17 ส.ค. 2026)
          drawer: {
            label: "See all steps",
            // desc เป็นข้อความจาก user โดยตรง (17 ส.ค. 2026) — ห้ามเรียบเรียงใหม่
            screens: [
              {
                label: "Step 1 · Information",
                desc: "ระบุข้อมูลเบื้องต้นเพื่อให้ง่ายในการติดต่อกลับ",
                src: "/uploads/renthub-agency-home-step1-contact-v2.jpg",
                w: 1600,
                h: 1137,
              },
              {
                label: "Step 2 · Budget",
                desc: "เลือกช่วงราคา รูปแบบห้อง ระยะเวลาการเข้าพัก วันพร้อมเข้าอยู่ เพื่อให้ได้ห้องที่ตรงความต้องการ",
                src: "/uploads/renthub-agency-home-step2-budget-v2.jpg",
                w: 1600,
                h: 1137,
              },
              {
                label: "Step 3 · Amenities",
                desc: "เลือกสิ่งอำนวยความสะดวกเพื่อให้ตรงตาม life style ของตัวเอง",
                src: "/uploads/renthub-agency-home-step3-amenities-v2.jpg",
                w: 1600,
                h: 1137,
              },
              {
                label: "Step 4 · Location",
                desc: "เลือกทำเลตามความต้องการ และสามารถระบุให้มากกว่า 1 พื้นที่",
                src: "/uploads/renthub-agency-home-step4-location-v2.jpg",
                w: 1600,
                h: 1137,
              },
              {
                label: "Well done",
                desc: "รอระบบคัดกรองอพาร์ทเม้นท์มาให้ตรงตามความต้องการ",
                src: "/uploads/renthub-agency-home-welldone.jpg",
                w: 1600,
                h: 1137,
              },
            ],
          },
        },
        {
          title: "Contact & Lead Capture",
          body: "Contact Form สำหรับผู้ใช้ที่ต้องการคำแนะนำเพิ่มเติม โดยเก็บข้อมูลพื้นฐาน ได้แก่ Name, Email และ Phone เพื่อให้สามารถติดต่อและให้คำแนะนำเกี่ยวกับที่พักที่เหมาะสมได้",
          src: "/uploads/expat-craft-v3-contact.jpg",
          w: 1600,
          h: 742,
        },
      ],
    },
    // Wireframe + Style Guide = section เดียวกัน "Wireframe & Style Guide" (user สั่ง 17 ส.ค. 2026)
    // wireframes ย้ายมาจาก webScreens category "Wireframe" เดิม
    wireframes: [
      { label: "Home", src: "/uploads/renthub-agency-wireframe-home.jpg", w: 1600, h: 4591 },
      { label: "Listing Result", src: "/uploads/renthub-agency-wireframe-listing-result-v2.jpg", w: 1600, h: 4009 },
      { label: "Listing Detail", src: "/uploads/renthub-agency-wireframe-listing-detail.jpg", w: 1600, h: 5582 },
    ],
    styleGuide: [
      { label: "Color", src: "/uploads/renthub-agency-ds-color.jpg", w: 1600, h: 1600 },
      { label: "Font", src: "/uploads/renthub-agency-ds-font.jpg", w: 1600, h: 1600 },
      { label: "Icon", src: "/uploads/renthub-agency-ds-icon.jpg", w: 1600, h: 1600 },
    ],
    // Screens ของ Expat — แยกตาม category
    // เอาออกแล้ว: "Wireframe" (ย้ายไป field wireframes) · "Sign Up / Sign In" (user สั่งตัดทิ้ง 17 ส.ค. 2026
    // — ไฟล์ renthub-agency-signin-v2.jpg / signup-v2.jpg ยังอยู่ใน public/uploads เอากลับมาได้)
    webScreens: [
      {
        // panel เทาผืนเดียวชื่อ "Main Screen" (โครงเดียวกับหน้า Propertyhub · user สั่ง 17 ส.ค. 2026)
        // ยุบจาก 4 category เดิม: Home / Listing Result / Listing Detail / Shortlist
        // เหลือ 5 จอ — user สั่งตัดรูปที่ 3, 6, 7, 9, 10 ออก 17 ส.ค. 2026 (ไฟล์ยังอยู่ใน public/uploads)
        // "Find My Home" ถูกย้ายไปเป็น drawer ของ Craft Showcase บล็อก 05 แล้ว
        category: "Main Screen",
        screens: [
          { label: "Home", src: "/uploads/renthub-agency-home-v3.jpg", w: 1600, h: 6808 },
          { label: "Listing result", src: "/uploads/renthub-agency-listing-result.jpg", w: 1600, h: 4014 },
          { label: "Listing result · map view", src: "/uploads/renthub-agency-listing-map.jpg", w: 1600, h: 1137 },
          { label: "Listing detail", src: "/uploads/renthub-agency-detail-renthub.jpg", w: 1600, h: 5904 },
          { label: "Shortlist", src: "/uploads/renthub-agency-shortlist-main.jpg", w: 1600, h: 2020 },
        ],
      },
      {
        // จอแอปมือถือ — เรียงตาม flow การใช้งาน (ไม่ตามชื่อไฟล์)
        // phone: true → โชว์ขนาดจอเท่า App projects (AppScreensShowcase) · ไม่มี lightbox
        category: "Mobile (Responsive)",
        phone: true,
        // เหลือ 3 จอ (user สั่งตัด Room detail / Shortlist / Sign in ออก 17 ส.ค. 2026 — ไฟล์ยังอยู่)
        screens: [
          { label: "Home", src: "/uploads/renthub-agency-mobile-home.png", w: 864, h: 1726 },
          { label: "Search results", src: "/uploads/renthub-agency-mobile-result.png", w: 864, h: 1726 },
          { label: "Apartment detail", src: "/uploads/renthub-agency-mobile-detail.png", w: 864, h: 1726 },
        ],
      },
    ],
  },
  rentos: {
    title: "RentOS",
    category: "Digital Product",
    status: "process",
    tagline: "รายละเอียดเร็วๆ นี้",
  },
  baandee: {
    title: "Baandee",
    category: "AI Product",
    status: "process",
    tagline: "แพลตฟอร์มผู้ช่วยด้านที่อยู่อาศัย เดโมหน้าเว็บที่สร้างด้วย AI (กดเปิดเล่นได้จริง)",
    demoUrl: "/demos/baandee.html",
    demoCover: "/uploads/baandee-cover.jpg",
  },
  // PropertyOS — โปรเจกต์เดียวของหมวด AI Product (Website Builder อยู่ใต้ตัวนี้)
  // เนื้อหาเต็มอยู่ที่ data/propertyos.ts · render ด้วย PropertyosView
  propertyos: {
    title: "PropertyOS",
    category: "AI Product",
    status: "process",
    tagline:
      "แพลตฟอร์มรวมงานของเอเจนต์อสังหาฯ ไว้ที่เดียว หน้านี้เล่างาน Website Builder ที่อยู่ในนั้น: ชุดธีม 3 แบบ × 3 ประเภทหน้า ที่ระบบเอาไปสร้างเว็บให้เอเจนต์ได้ในคลิกเดียว",
    // Process & Key Decisions — user สั่งตัดออกจากหน้านี้ (17 ส.ค. 2026)
    // ใส่ decision กลับเข้ามาเมื่อไหร่ section ก็ขึ้นเอง (propertyos-view เช็คด้วย hasProcess)
    // เนื้อหาอื่นของหน้านี้อยู่ที่ data/propertyos.ts
    decisions: [],
  },
  // คลังงานเก่า 2018–2020 — render ด้วย EarlyWorkView (special-case ใน work/[slug])
  "early-work": {
    title: "Early Work",
    category: "Archive",
    status: "archived",
    tagline:
      "คลังงานออกแบบช่วงปี 2018 - 2020 ทั้งแอป เว็บ/หลังบ้าน design system และงานกราฟิก จาก portfolio เล่มเดิม",
  },
} satisfies Record<string, PlaceholderProject>;

export type PlaceholderSlug = keyof typeof placeholderProjects;
export const placeholderSlugs = Object.keys(placeholderProjects) as PlaceholderSlug[];

export function getPlaceholder(slug: string): PlaceholderProject | undefined {
  return (placeholderProjects as Record<string, PlaceholderProject>)[slug];
}

// ────────────────────────────────────────────────────────────────────────────
// PROJECT NAV (prev / next ท้ายหน้า case study)
// ลำดับอิง "เมนู sidebar" (data/nav.ts) ไม่ใช่ลำดับ key ใน `projects` — เพื่อให้
// การกดถัดไปเดินเรื่องตรงกับที่ user เห็นในเมนู และครอบคลุมงาน placeholder ด้วย
// (เช่น Propertyhub → Propertyhub App → Renthub → …)
// งานที่ไม่ได้อยู่ในเมนูจะไม่มีปุ่ม prev/next — กันไม่ให้หลุดไปหน้าที่ยังไม่เปิด
// ────────────────────────────────────────────────────────────────────────────

/** slug ของงานทั้งหมดเรียงตามเมนู sidebar (flatten ทุก folder) */
export const navOrderSlugs: string[] = navGroups.flatMap((g) =>
  g.items.map((it) => it.slug),
);

/** ชื่องานจาก slug — หาใน projects → placeholder → label ในเมนู ตามลำดับ */
export function projectTitle(slug: string): string {
  return (
    getProject(slug)?.title ??
    getPlaceholder(slug)?.title ??
    navGroups.flatMap((g) => g.items).find((it) => it.slug === slug)?.label ??
    slug
  );
}

export type ProjectNavLink = { slug: string; title: string };

/** งานก่อนหน้า / ถัดไป ตามลำดับเมนู — ไม่วน loop (อันแรกไม่มี prev · อันสุดท้ายไม่มี next) */
export function getProjectNav(slug: string): {
  prev: ProjectNavLink | null;
  next: ProjectNavLink | null;
} {
  const i = navOrderSlugs.indexOf(slug);
  if (i === -1) return { prev: null, next: null };
  const at = (n: number): ProjectNavLink | null => {
    const s = navOrderSlugs[n];
    return s ? { slug: s, title: projectTitle(s) } : null;
  };
  return { prev: at(i - 1), next: at(i + 1) };
}

/** label ไทยของแต่ละ status (ใช้บน badge) */
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  available: "Available",
  process: "In Progress",
  coming: "Coming Soon",
  archived: "Archived",
};
