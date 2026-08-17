// ────────────────────────────────────────────────────────────────────────────
// DATA ANALYSIS — หน้า /work/data-analysis
//
// เดิมเนื้อหานี้เป็น section "AI in My Workflow" ที่ฝังอยู่ในหน้า case study
// Propertyhub เท่านั้น — ย้ายออกมาเป็นหน้าของตัวเอง เพราะมันคือ "ทักษะ" ที่ใช้ได้
// กับทุกโปรเจกต์ ไม่ใช่ผลงานเฉพาะ Propertyhub
//
// โครงหน้า: hero (terminal) → Overview → Tools → sections[]
// ทุก section ใช้โครงเดียวกับ "How I Measured?" ของ case study เป๊ะๆ —
// H2 → goal callout (เทา เส้นซ้ายหนา) → step มีเลขกำกับ + เส้นเชื่อม
// เพิ่ม section ใหม่ = ต่อ object ใน `sections` ไม่ต้องแตะ UI
//
// แก้ข้อความ / เปลี่ยนรูป = แก้ที่ไฟล์นี้ไฟล์เดียว
// ────────────────────────────────────────────────────────────────────────────

export type DataAnalysisShot = {
  src: string;
  caption: string;
  w: number;
  h: number;
};

/** หนึ่ง step ในไทม์ไลน์ — ทุก field นอกจาก title ใส่เฉพาะที่ต้องใช้ */
export type DataAnalysisStep = {
  title: string;
  /** ย่อหน้าเนื้อหา */
  body?: string;
  /** การ์ดตัวเลข — tone บอกว่าตัวเลขนี้ "ดี" หรือ "ต้องแก้"
   *  bad = แดงอ่อน (เลขที่อยากดันให้ดีขึ้น) · good = น้ำเงิน brand (เลขเป้าหมาย)
   *  ไม่ใส่ = การ์ดกลางๆ */
  stats?: { value: string; label: string; tone?: "bad" | "good" }[];
  /** รูปหลักฐาน — กดขยายเต็มจอได้ */
  image?: DataAnalysisShot;
  /** หลายรูปในขั้นเดียว — โชว์เป็นกริด 2 คอลัมน์ กดขยายได้เหมือนกัน */
  images?: DataAnalysisShot[];
  /** ข้อสรุปของขั้นนี้ — callout ส้ม */
  takeaway?: string;
  /** mockup ประกอบ — resolve เป็น component ใน ClaudeSection */
  mock?:
    | "listing-dialog"
    | "spec-handoff"
    | "claude-instructions"
    | "claude-files"
    | "ascii-screen";
};

/** หนึ่ง section — H2 + goal callout + ไทม์ไลน์ step (โครงเดียวกับ How I Measured?) */
export type DataAnalysisSection = {
  heading: string;
  /** ประโยคสรุป section เป็นบรรทัดเดียว — โชว์ตัวหนาเป็นบรรทัดแรกในกล่อง goal */
  lead?: string;
  /** เป้าหมายของ section นี้ — callout เส้นซ้ายหนา พื้นเทา ให้อ่านก่อนไล่ step */
  goal: string;
  /** แถบ workflow ย่อ (อ่านรวดเดียวจบ) — โชว์ใต้ goal ก่อนลงไทม์ไลน์
   *  icon = key ที่ map เป็นไอคอนจริงใน ClaudeSection */
  flow?: {
    label: string;
    sub?: string;
    icon?: "instructions" | "analyze" | "file" | "design" | "wireframe";
  }[];
  steps: DataAnalysisStep[];
};

export type DataAnalysisContent = {
  /** Overview — บอกว่าหน้านี้คืออะไร ทำอะไรได้ (ย่อหน้าละ 1 string)
   *  hero ของหน้าเป็น terminal mockup (components/case-study/analysis-terminal.tsx) ไม่ใช่รูป */
  overview: string[];
  /** เครื่องมือที่ใช้ในงานชุดนี้ — section Tools (กริดการ์ด ดีไซน์เดียวกับหน้า case study อื่น)
   *  ชื่อต้องตรงกับ key ใน data/tools.ts ถึงจะได้โลโก้จริง */
  tools: string[];
  /** section เนื้อหา เรียงตามลำดับที่แสดง (คั่นด้วยเส้นอัตโนมัติ) */
  sections: DataAnalysisSection[];
  /** ย่อหน้าปิดท้าย — ไม่ใส่ = ไม่แสดง (ตอนนี้ไม่ได้ใช้) */
  closing?: string;
};

export const dataAnalysis: DataAnalysisContent = {
  overview: [
    // ข้อความจาก user โดยตรง 17 ส.ค. 2026 — ห้ามเรียบเรียงใหม่
    // (แก้จากต้นฉบับที่ user ส่งมาแค่จุดเดียว: "Zimple Analytic" → "Zimple Analytics"
    //  ให้ตรงกับชื่อที่ใช้ในลิสต์ Tools และ caption ทุกที่ในเว็บ)
    "อีกหนึ่งบทบาทที่ทำควบคู่กับงานออกแบบคือ Business Analysis โดยนำข้อมูลจาก Zimple Analytics มาวิเคราะห์เพื่อค้นหา Insight และโอกาสในการยกระดับ Product คัดเลือกประเด็นที่มีคุณค่าและต่อยอดเป็นไอเดียสำหรับพัฒนา โดยใช้ AI เป็นส่วนหนึ่งของ Workflow เพื่อสร้างและทดสอบแนวคิดได้อย่างรวดเร็ว ลดเวลาและต้นทุนในการทดลอง",
    // ย่อหน้า 2 = duration / role / team (user สั่ง 14 ส.ค. 2026 ให้ทุกหน้ามี 2 ย่อหน้า)
    // ⚠️ ร่างจาก AI — user ยังไม่ได้ยืนยันถ้อยคำ
    "การทำงานลักษณะนี้ใช้ต่อเนื่องกับทุกโปรเจกต์ที่ดูแลอยู่ ไม่ได้ผูกกับรอบงานใดรอบหนึ่ง จึงไม่มีกำหนดระยะเวลาตายตัว รับผิดชอบการวิเคราะห์ข้อมูลของ Product ด้วยตัวเองในฐานะ Designer ตั้งแต่ตั้งคำถามจากเป้าหมายของธุรกิจ ต่อเครื่องมือวัดผลเข้ากับ Claude ผ่าน MCP อ่านพฤติกรรมผู้ใช้ จนถึงสรุปเป็นข้อเสนอส่งต่อให้ทีม PM และ Developer",
  ],

  // ลำดับ = ลำดับการใช้จริง: คุย idea → ดู data → ต่อยอดเป็น artifact → ทำ wireframe
  tools: ["Claude", "Zimple Analytics", "Claude Design", "v0 by Vercel"],

  sections: [
    {
      heading: "From Data to Decision",
      goal: "ใช้ data ตั้งโจทย์ให้ตัวเอง โดยไล่ดูจาก Zimple Analytics ว่าหน้าไหนของ Propertyhub เป็นจุดที่เกิด revenue มากที่สุด เจอว่าเป็น Listing Detail แต่ 3 ใน 4 ของ session ดูแค่ประกาศเดียวแล้วออก ตัวเลขนี้เลยกลายเป็นโจทย์ออกแบบ",
      steps: [
        {
          title: "Navigation Summary",
          body: "listing detail คือหน้าที่ session สูงสุดของเว็บ และเป็นที่ที่ contact agent เกิดขึ้นจริง โดย user วนกลับเข้ามาเองตลอด แต่ส่วนใหญ่ดูประกาศเดียวแล้วออก",
          image: {
            src: "/uploads/ph-zimple-listingdetail.jpg",
            caption:
              "Zimple Navigation Summary: listing_detail คือหน้าที่ session สูงสุดของเว็บ (3.4M) และ user วนกลับเข้า listing_detail เอง (Previous 38% · Next 73% เป็น listing_detail)",
            w: 2400,
            h: 1166,
          },
        },
        {
          title: "Session Explorer",
          body: "แบ่ง session ตาม engagement depth (1 / 2 / 3 / 4+ views) แล้วเทียบ contact rate ของแต่ละกลุ่ม",
          stats: [
            {
              value: "75%",
              label:
                "ของ session ดู listing แค่ 1 view แล้วออก (367K+ sessions)",
            },
            {
              value: "1.31%",
              label: "contact rate ของกลุ่ม 1 view",
              tone: "bad",
            },
            {
              value: "21.25%",
              label: "contact rate ของกลุ่มที่ดู 4+ views",
              tone: "good",
            },
          ],
          image: {
            src: "/uploads/ph-zimple-session.jpg",
            caption:
              "Zimple Analytics Session Explorer: engagement depth distribution (1 / 2 / 3 / 4+ views) เทียบ contact rate",
            w: 2400,
            h: 1167,
          },
          takeaway:
            "ยิ่งดูลึก contact rate ยิ่งสูงขึ้น โจทย์จึงไม่ใช่ “ส่งคนไป listing” แต่คือ “ทำยังไงให้ดูมากกว่า 1 ประกาศ”",
        },
        {
          title: "Design Change",
          body: "ใน sidebar ของหน้า Listing Detail มีการ์ด “ประกาศเช่าใน แอชตัน จุฬา สีลม” ที่โชว์ได้แค่ไม่กี่รายการ หากต้องการดูต่อจะต้องออกไปหน้าอื่น จึงเพิ่มปุ่ม “ดูทั้งหมด xx ประกาศ” ที่เปิด dialog รวมประกาศทั้งโครงการพร้อม filter ไว้ในหน้าเดียว ดูต่อได้โดยไม่ต้องออกจากหน้า",
          mock: "listing-dialog",
        },
        {
          title: "Handoff to Dev",
          body: "เขียน dev spec เป็นไฟล์ .md ส่งให้ทีม dev โดยตรง ครอบคลุม 3 feature (mobile section / desktop sidebar / modal) กติกาที่ใช้ร่วมกัน pre-filter logic และ GA4 event ครบ 14 ตัว ส่งคู่ไปกับ standalone HTML ที่ทำจาก Claude Design (Idea 3b Same Project Sidebar + Modal) เปิดไฟล์เดียวจบ กดใช้งานได้จริงทั้ง sidebar และ modal ทีม dev จึงได้ทั้ง “กติกาเป็นตัวหนังสือ” และ “ของที่ต้องได้” พร้อมกัน ไม่ต้องเดาจากภาพนิ่ง",
          mock: "spec-handoff",
          takeaway:
            "spec มี event tracking ติดไปตั้งแต่วันแรก วงจรเลยครบ: data ตั้งโจทย์ → ออกแบบ → ส่ง dev → กลับมาวัดด้วย data ชุดเดิม",
        },
      ],
    },

    {
      heading: "AI Workflow by Claude",
      goal: "ออกแบบให้ AI เป็นส่วนหนึ่งของกระบวนการทำงาน ไม่ใช่เครื่องมือที่เรียกใช้เป็นครั้งคราว โดยกำหนดลำดับขั้นตอนไว้ล่วงหน้าในโปรเจกต์เดียวของ Claude ตั้งแต่การให้บริบทของโปรดักต์ วิเคราะห์ไอเดีย ร่างโครงหน้าจอ ไปจนถึงต่อยอดเป็น wireframe ทำให้ทุกครั้งที่เริ่มงานใหม่ได้ผลลัพธ์ในมาตรฐานเดียวกัน ตัวอย่างที่ยกมาคือ PropertyOS แพลตฟอร์ม SaaS สำหรับเอเจนต์อสังหาริมทรัพย์ที่กำลังพัฒนาอยู่",
      flow: [
        { label: "Set instructions", sub: "บริบทของทั้งโปรดักต์", icon: "instructions" },
        { label: "Claude analyzes", sub: "คุยไอเดียทีละหัวข้อ", icon: "analyze" },
        { label: "ASCII screen", sub: "ร่างโครงเป็นตัวอักษร", icon: "design" },
        { label: "Wireframe", sub: "ต่อยอดใน v0 by Vercel", icon: "wireframe" },
      ],
      steps: [
        {
          title: "Set Project Instructions",
          body: "เขียน instruction ครั้งเดียวว่าโปรดักต์คืออะไร ใครใช้ และมี core feature อะไร หลังจากนั้นทุกแชตในโปรเจกต์รู้บริบทเอง ไม่ต้องเล่าใหม่",
          mock: "claude-instructions",
        },
        {
          title: "Claude Analyzes",
          body: "คุยไอเดียทีละหัวข้อ แล้วให้สรุปเป็นไฟล์เก็บไว้ใน project ทั้ง persona, feature phase 1, user flow และ IA กลายเป็น knowledge base ที่แชตถัดๆ ไปใช้ต่อได้",
          mock: "claude-files",
        },
        {
          title: "ASCII Artifact as a Mini Screen",
          body: "ขอ artifact เป็น ASCII layout ของแต่ละหน้าจอ เป็นการร่างโครงหน้าจอก่อนจะไปเป็น wireframe จริง ว่าหน้านี้มีส่วนอะไรบ้าง วางตรงไหน และเรียงลำดับข้อมูลยังไง อ่านแล้วเห็นเป็นหน้าจอทันที แก้ง่ายเพราะเป็นแค่ตัวอักษร",
          mock: "ascii-screen",
        },
        {
          title: "From ASCII to Wireframe",
          body: "พอโครงนิ่งค่อยเอา ASCII ไปทำต่อเป็น wireframe ใน v0 by Vercel ยังไม่ใช่หน้าจอจริง แต่เป็น wireframe ที่ใกล้เคียงของจริงพอจะกดดูฟังก์ชันได้ ตั้งใจให้ดู “มันทำงานยังไง” มากกว่า “มันสวยแค่ไหน” ความสวยค่อยไปจบทีหลัง",
          images: [
            { src: "/uploads/propertyos/chat.png", caption: "แชท: รวมทุกช่องทางไว้ที่เดียว พร้อมข้อมูลลูกค้าฝั่งขวา", w: 1920, h: 902 },
            { src: "/uploads/propertyos/chat-tags.png", caption: "แท็กลูกค้า: จัดกลุ่มตามความสนใจเพื่อติดตามต่อ", w: 1920, h: 900 },
            { src: "/uploads/propertyos/watchlist.png", caption: "หาทรัพย์ในตลาด: Watch List คอยจับประกาศใหม่ตามเงื่อนไข", w: 1920, h: 901 },
            { src: "/uploads/propertyos/watchlist-detail.png", caption: "ผลของ Watch List: ประกาศใหม่จากหลาย portal พร้อมช่องทางติดต่อเจ้าของ", w: 1920, h: 901 },
            { src: "/uploads/propertyos/line-connect.png", caption: "ตั้งค่าการเชื่อมต่อ: LINE Official Account", w: 1920, h: 902 },
            { src: "/uploads/propertyos/line-dialog.png", caption: "ขั้นตอนเชื่อม LINE OA: Channel Secret + Access Token", w: 1920, h: 901 },
          ],
        },
      ],
    },
  ],
};
