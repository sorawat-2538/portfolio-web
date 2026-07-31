// ────────────────────────────────────────────────────────────────────────────
// DATA ANALYSIS — หน้า /work/data-analysis
//
// เดิมเนื้อหานี้เป็น section "AI in My Workflow" ที่ฝังอยู่ในหน้า case study
// Propertyhub เท่านั้น — ย้ายออกมาเป็นหน้าของตัวเอง เพราะมันคือ "ทักษะ" ที่ใช้ได้
// กับทุกโปรเจกต์ ไม่ใช่ผลงานเฉพาะ Propertyhub
//
// โครงหน้า: hero (terminal) → Overview → Tools → sections[]
// ทุก section ใช้โครงเดียวกับ "How I Measured?" ของ case study เป๊ะ ๆ —
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
   *  ไม่ใส่ = การ์ดกลาง ๆ */
  stats?: { value: string; label: string; tone?: "bad" | "good" }[];
  /** รูปหลักฐาน — กดขยายเต็มจอได้ */
  image?: DataAnalysisShot;
  /** ข้อสรุปของขั้นนี้ — callout ส้ม */
  takeaway?: string;
  /** mockup ประกอบ — resolve เป็น component ใน ClaudeSection */
  mock?: "listing-dialog" | "project-redesign";
};

/** หนึ่ง section — H2 + goal callout + ไทม์ไลน์ step (โครงเดียวกับ How I Measured?) */
export type DataAnalysisSection = {
  heading: string;
  /** เป้าหมายของ section นี้ — callout เส้นซ้ายหนา พื้นเทา ให้อ่านก่อนไล่ step */
  goal: string;
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
  closing: string;
};

export const dataAnalysis: DataAnalysisContent = {
  overview: [
    "ปกติเวลา designer อยากรู้ว่างานที่ปล่อยไปได้ผลไหม ต้องตั้งคำถามแล้วรอทีม data ดึงตัวเลขให้ ซึ่งช้าและถามต่อยาก ผมเลยต่อ Claude เข้ากับเครื่องมือ analytics โดยตรงผ่าน MCP (GA4, Microsoft Clarity, Zimple Analytics) แล้ววิเคราะห์เอง — หน้านี้รวม 2 วิธีที่ใช้จริง คือขุด insight จาก data เพื่อหาว่าโจทย์ถัดไปควรเป็นอะไร และแปลง insight นั้นเป็นสเปกกับ wireframe ให้เร็วพอจะเอาไปเสนอทีมได้ ตัวอย่างทั้งหมดใช้ data จริงของ Propertyhub",
  ],

  // ลำดับ = ลำดับการใช้จริง: คุย idea → ดู data → ต่อยอด wireframe → ทำ UI
  tools: ["Claude", "Zimple Analytics", "Claude Design", "Figma"],

  sections: [
    {
      heading: "Data for Future Growth",
      goal: "Set project instructions ให้กับ Claude เพื่อคุย Idea ว่าเรากำลังจะทำอะไร และหลังจากนั้นใช้ Zimple Analytics ดู Data ของ Propertyhub เพื่อหาช่องทางในการเพิ่มหรือดัน User มาหน้าที่มีการ Landing มากที่สุดของ Website เช่นหน้า Listing Detail",
      steps: [
        {
          title: "Navigation Summary",
          body: "หน้าที่ hit target และสร้าง revenue จริงคือ listing detail (contact agent เกิดที่นี่) — พอต่อ Claude กับ analytics ขุดดู เจอว่ามันคือ “หัวใจ” ของเว็บ: session สูงสุด และ user วนกลับเข้ามาเองตลอด แต่กลับดูแค่ประกาศเดียวแล้วออกเป็นส่วนใหญ่",
          image: {
            src: "/uploads/ph-zimple-listingdetail.jpg",
            caption:
              "Zimple Navigation Summary — listing_detail คือหน้าที่ session สูงสุดของเว็บ (3.4M) และ user วนกลับเข้า listing_detail เอง (Previous 38% · Next 73% เป็น listing_detail)",
            w: 2400,
            h: 1166,
          },
        },
        {
          title: "Session Explorer",
          body: "ขุดต่อว่า user ที่เข้า listing detail ดูกี่ประกาศก่อนจะกด contact agent — แบ่ง session ตาม engagement depth (1 / 2 / 3 / 4+ views) แล้วเทียบ contact rate ของแต่ละกลุ่ม",
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
              "Zimple Analytics — Session Explorer: engagement depth distribution (1 / 2 / 3 / 4+ views) เทียบ contact rate",
            w: 2400,
            h: 1167,
          },
          takeaway:
            "ยิ่ง user engage ลึก (ดู listing หลายอัน) contact rate ยิ่งพุ่ง — โจทย์ถัดไปจึงไม่ใช่แค่ “ส่งคนไป listing” แต่คือ “ทำยังไงให้ดูลึกกว่า 1 ประกาศ”",
        },
        {
          title: "What I Changed",
          body: "ปัจจุบันถ้าจะดูประกาศทั้งโครงการ user ต้องเด้งออกไปหน้าเช่า/ขายแยก — navigate หลายหน้าเกินไป จึงเสนอปุ่ม “ดูทั้งหมด xx ประกาศ” + dialog ที่รวมประกาศทั้งโครงการ (เช่า/ขาย) ไว้ในหน้าเดียว สมมติฐาน: user จะดูหลายประกาศขึ้น (2–3 view เพิ่ม) และ 1-view ลดลง",
          mock: "listing-dialog",
        },
      ],
    },

    {
      heading: "From Idea to Mockup",
      goal: "อีกวิธีที่ใช้ AI คนละส่วนกับการหา insight ด้านบน — set instruction ให้ Claude วิเคราะห์ สรุปเป็น MD file แล้วต่อยอดเป็น wireframe/UI ได้เร็วพอจะเอาไปนำเสนอ ไม่ต้องรอคิว dev หรือเริ่มจากหน้าขาวใน Figma",
      steps: [
        { title: "Set instructions", body: "กำหนดสิ่งที่จะทำ" },
        { title: "Claude analyzes", body: "วิเคราะห์ + ได้ไอเดีย" },
        { title: "MD file", body: "สรุปเป็นสเปก" },
        {
          title: "Wireframe / UI",
          body: "Claude สร้างจาก MD",
          mock: "project-redesign",
        },
      ],
    },
  ],

  closing:
    "จุดนี้ทำให้รู้สึกว่าตัวเองขยับจาก “designer” ไปทาง “product” มากขึ้น — ไม่ใช่แค่ออกแบบหน้าจอ แต่ใช้ data ตั้งโจทย์ วัดผล และหา direction ต่อได้เองทั้งวงจร",
};
