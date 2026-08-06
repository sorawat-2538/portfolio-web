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

export type Decision = {
  title: string;
  reasoning: string;
  tradeoff: string;
  cut: string;
};

export type ResultRow = { label: string; change: string };
export type DeviceRow = {
  device: string;
  before: string;
  after: string;
  change: string;
};

/** สถานะโปรเจกต์ — โชว์เป็น badge บนหน้า project detail
 *  available = พร้อมดู/ใช้งานจริง · process = กำลังทำ · coming = ยังไม่เปิด (เร็ว ๆ นี้)
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
   *  phone:true → AppScreensShowcase (จอมือถือ) · category ที่ screens:[] → ป้าย "เร็ว ๆ นี้" */
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

  ctxBusiness: string;
  ctxProblem: string;
  constraints: string[];

  hypothesis: string;
  successMetrics: string[];
  guardrailMetrics: string[];

  decisionsIntro: string;
  decisions: Decision[];

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
    year: "2021 – ปัจจุบัน",
    status: "available",
    heroImage: "/uploads/Home.jpg",
    heroMock: "product", // หน้า case study โชว์ fake product-UI แทน screenshot จริง
    heroWeb: "/uploads/propertyhub-hero-web.png",
    heroPhone: "/uploads/propertyhub-hero-phone-v2.png",
    // Screens แยกตาม category (grid) — category ที่ยังไม่มีรูป = screens:[] → โชว์ "เร็ว ๆ นี้"
    webScreens: [
      {
        category: "Sign Up / Sign In",
        screens: [
          { label: "Sign in", src: "/uploads/propertyhub-signin.jpg", w: 4320, h: 3072 },
          { label: "Sign up", src: "/uploads/propertyhub-signup.jpg", w: 4320, h: 3072 },
        ],
      },
      {
        // Home + flow ต่อเนื่อง (Listing Result · Listing Detail จะตามมา)
        category: "Home",
        screens: [
          { label: "Home", src: "/uploads/propertyhub-home-full-v2.jpg", w: 1600, h: 7403 },
          { label: "Listing Detail", src: "/uploads/propertyhub-listing-detail.jpg", w: 4320, h: 15296 },
          { label: "Listing Result", src: "/uploads/propertyhub-listing-result.jpg", w: 4320, h: 15016 },
        ],
      },
      {
        category: "Project Detail",
        screens: [
          { label: "Overview", src: "/uploads/propertyhub-detail-overview.jpg", w: 4320, h: 13665 },
          { label: "Amenities", src: "/uploads/propertyhub-detail-amenities.jpg", w: 4320, h: 12891 },
          { label: "Floor plan", src: "/uploads/propertyhub-detail-floorplan.jpg", w: 4320, h: 12237 },
          { label: "Floor plan (list)", src: "/uploads/propertyhub-detail-floorplan-list.jpg", w: 4320, h: 12237 },
          { label: "Reviews", src: "/uploads/propertyhub-detail-reviews.jpg", w: 4320, h: 12880 },
        ],
      },
      {
        category: "New Project",
        screens: [
          { label: "New projects", src: "/uploads/propertyhub-new-projects.jpg", w: 4320, h: 13750 },
          { label: "Developers", src: "/uploads/propertyhub-developers.jpg", w: 4320, h: 7776 },
          { label: "Developer detail", src: "/uploads/propertyhub-developer-detail.jpg", w: 4320, h: 10163 },
        ],
      },
      {
        category: "Asset Banks",
        screens: [
          { label: "Home", src: "/uploads/propertyhub-assetbank-home.jpg", w: 4320, h: 15903 },
          { label: "All banks", src: "/uploads/propertyhub-assetbank.jpg", w: 4320, h: 9514 },
          { label: "Kasikorn (KBANK)", src: "/uploads/propertyhub-assetbank-kbank.jpg", w: 4320, h: 9562 },
        ],
      },
      {
        // จอมือถือ (responsive) — phone:true → AppScreensShowcase · เริ่มด้วย Home (ใช้รูป hero phone เดิม) จออื่นตามมาทีหลัง
        category: "Mobile (Responsive)",
        phone: true,
        screens: [
          { label: "Home", src: "/uploads/propertyhub-hero-phone-v2.png", w: 864, h: 1726 },
          { label: "Listing Detail", src: "/uploads/propertyhub-mobile-detail.png", w: 660, h: 1320 },
          { label: "Asset Bank", src: "/uploads/propertyhub-mobile-assetbank.png", w: 660, h: 1320 },
        ],
      },
    ],
    liveUrl: "https://propertyhub.in.th/",
    heroBadges: [
      { icon: "LayoutGrid", value: "5 Pages", label: "Full redesign" },
      { icon: "Activity", value: "A/B tested", label: "GA4 + Clarity" },
    ],
    tagline:
      "PropertyHub คือแพลตฟอร์มที่ช่วยให้การหาบ้านหรือคอนโดเป็นเรื่องง่าย ไม่ว่าจะซื้อหรือเช่า ก็สามารถค้นหา ดูรายละเอียด และติดต่อผู้ลงประกาศได้สะดวกในที่เดียว พร้อมเครื่องมือที่ช่วยให้เลือกที่อยู่อาศัยได้ตรงกับความต้องการมากขึ้น",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY – MMM YYYY ]",
    metaMethod: "Hypothesis-driven + Manual A/B test",
    metaScale: "[ __,000+ ] sessions measured",
    tools: ["Figma", "Claude", "Google Analytics", "Microsoft Clarity"],
    overview: [
      "PropertyHub เป็นเว็บไซต์ตลาดกลางอสังหาริมทรัพย์ออนไลน์ของไทย รวมประกาศซื้อ ขาย และเช่าคอนโด บ้านเดี่ยว ทาวน์เฮ้าส์ ที่ดิน และอสังหาฯ เชิงพาณิชย์ทั่วประเทศ พร้อมข้อมูลโครงการใหม่ รีวิวทำเล และบทความ ผู้ใช้ค้นหาตามพื้นที่ ราคา และแนวรถไฟฟ้าได้ ส่วนผู้ขายและนายหน้าลงประกาศได้ฟรี",
    ],
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
    decisionsIntro:
      "ผมเลือกเล่า 3 decision ที่ยากที่สุดใน redesign นี้ — แต่ละอันมี trade-off ที่ยอม และ option ที่ตัดออก",
    decisions: [
      {
        title: "[ ชื่อ decision 1 — action verb ]",
        reasoning:
          "[ อธิบาย data/insight ที่ทำให้ตัดสินใจแบบนี้ — อ้างอิง Clarity heatmap, GA event หรือ session recording ]",
        tradeoff: "[ บอกตรง ๆ ว่ายอมเสียอะไร ]",
        cut: "[ option อื่นที่พิจารณาแล้วตัดออก + เหตุผล ]",
      },
      {
        title: "[ ชื่อ decision 2 — action verb ]",
        reasoning: "[ อธิบาย data/insight ที่ทำให้ตัดสินใจแบบนี้ ]",
        tradeoff: "[ บอกตรง ๆ ว่ายอมเสียอะไร ]",
        cut: "[ option อื่นที่พิจารณาแล้วตัดออก + เหตุผล ]",
      },
      {
        title: "[ ชื่อ decision 3 — action verb ]",
        reasoning: "[ อธิบาย data/insight ที่ทำให้ตัดสินใจแบบนี้ ]",
        tradeoff: "[ บอกตรง ๆ ว่ายอมเสียอะไร ]",
        cut: "[ option อื่นที่พิจารณาแล้วตัดออก + เหตุผล ]",
      },
    ],
    measure: {
      goal: "เป้าหมายหลักของหน้า Project page คือ ส่งผู้ใช้ต่อไปยังหน้า listing เช่า/ขายคอนโด (/เช่าคอนโด · /ขายคอนโด) ให้ได้มากที่สุด — ยิ่งพาไปเจอ listing ที่ตรง intent มากเท่าไหร่ ยิ่งมีโอกาสกด contact agent ซึ่งเป็น revenue signal ของ Propertyhub",
      steps: [
        {
          title: "วิธีวัดผลหลัง redesign หน้า Project Detail",
          body: "ภายใต้ข้อจำกัดที่ไม่มี A/B testing tool และไม่มี research budget การวัดผลหลังปล่อย design ใหม่จึงอาศัยเครื่องมือที่เข้าถึงได้ 3 ตัว — GA4 Funnel Exploration สำหรับติดตาม conversion ตลอด funnel · Microsoft Clarity สำหรับอ่านพฤติกรรมการใช้งานจริง · และ Zimple Analytics สำหรับยืนยันผลและกำหนดเป้าหมายถัดไป",
          images: [
            { src: "/uploads/propertyhub-project-detail.jpg", caption: "หน้า Project Detail ที่ redesign ใหม่ — จุดตั้งต้นของการวัดผล", w: 1600, h: 5106 },
          ],
        },
        {
          title: "วัดผลด้วย GA4 — Funnel Exploration",
          body: "ตั้ง Funnel Exploration ใน GA4 เอง 4 ขั้น (เข้าหน้าโครงการ → ไปหน้า listing result → เข้าหน้า listing detail → กด contact agent) เพื่อดูว่าหน้า Project ใหม่ยังทำงานได้ดีหรือแย่ลงเมื่อเทียบกับ design เก่า ในช่วงเวลาใกล้เคียงกัน — จากรูป ขั้นแรก session ของ design เก่าจะสูงกว่าราวเท่าตัว เพราะเรื่อง consent การกด Accept cookies ของเว็บ แต่ช่วงกลางและปลาย funnel session ใกล้เคียงกันมาก การวิเคราะห์จึงโฟกัสที่ช่วงกลางถึงปลาย funnel ซึ่งเทียบกันได้ตรงกว่า และพบว่า design ใหม่ส่งผู้ใช้ไปถึงขั้นที่ 4 (กด contact agent) ซึ่งเป็น conversion หลักของแพลตฟอร์ม ได้ในสัดส่วนที่สูงกว่า — จาก 1.6% เป็น 3.0% ของ session",
          images: [
            { src: "/uploads/ph-ga4-funnel.jpg", caption: "GA4 Funnel Exploration — 4 ขั้น เทียบ design เก่า (ฟ้า) กับใหม่ (ม่วง) ช่วงเวลาใกล้เคียงกัน", w: 2400, h: 1122 },
          ],
        },
        {
          title: "ดู Behavior จาก Microsoft Clarity",
          body: "วัด behavior ของผู้ใช้หลังเปลี่ยน design ใหม่ — ดูว่าคนกดตรงไหนมากที่สุด (heatmap), scroll ลึกแค่ไหน (scroll depth) และกดปุ่ม เช่า/ขาย ที่เราต้องการหรือไม่ ช่วยให้เห็นภาพรวมว่าคนใช้งานหน้านี้จริงอย่างไร ไม่ใช่แค่ตัวเลข conversion",
          images: [
            { src: "/uploads/ph-clarity-1.jpg", caption: "Clarity heatmap — ส่วนบนของหน้า: คนคลิกที่แกลเลอรีรูปและปุ่มเช่า/ขายมากที่สุด", w: 2400, h: 1166 },
            { src: "/uploads/ph-clarity-2.jpg", caption: "Clarity heatmap — ส่วน listing ในโครงการ: การคลิกดูประกาศเช่า/ขายจริง", w: 2400, h: 1166 },
          ],
        },
        {
          title: "ใช้ Zimple Analytics เพื่อยืนยันและหา Goal ต่อไป",
          body: "ใช้ Dashboard Navigation Summary ของ Zimple Analytics ยืนยันผลและวิเคราะห์ว่าจะทำอะไรต่อได้ — จากรูป เมื่อเลือก Current Selection เป็น project_detail จะเห็นว่า Next Page เกือบ 50% ของ session ไปหน้า “ประกาศเช่า” ซึ่งตรงกับ goal ของหน้านี้พอดี ยืนยันว่าหน้า Project ใหม่ยังทำงานได้ดี และชี้ทางว่าจะไป optimize ต่อตรงไหน",
          images: [
            { src: "/uploads/ph-zimple-projectdetail.jpg", caption: "Zimple Analytics — Navigation Summary ของ project_detail: Next Page เกือบ 50% ไปหน้าประกาศเช่า", w: 2400, h: 1168 },
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
      "Session count Before/After ไม่เท่ากัน เพราะไม่ได้ setup event tracking ตั้งแต่ launch — เริ่มเก็บ event หลังจากนั้น แต่ conversion rate เทียบกันได้ตรง ๆ เพราะเป็น % ของ session",
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
    year: "2021 – 2023",
    status: "available",
    liveUrl: "https://www.renthub.in.th/",
    heroWeb: "/uploads/renthub-web-laptop.png",
    heroPhone: "/uploads/renthub-app-home.png",
    hideMeasure: true,
    screensFull: true,
    screens: [
      {
        label: "Home",
        url: "renthub.in.th",
        src: "/uploads/renthub-home-full.jpg",
        w: 1600,
        h: 9509,
      },
    ],
    tagline:
      "มาร์เก็ตเพลสหอพักและคอนโดให้เช่า — redesign flow เปรียบเทียบและนัดดูห้อง เพื่อให้ผู้เช่าตัดสินใจเร็วขึ้นและเจ้าของได้ lead ที่ตรงกลุ่ม",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY – MMM YYYY ]",
    metaMethod: "Hypothesis-driven + Manual A/B test",
    metaScale: "[ __,000+ ] sessions measured",
    tools: ["Figma"],
    overview: [
      "RentHub คือเว็บไซต์รวมประกาศหอพัก อพาร์ทเม้นท์ และห้องเช่าทั่วประเทศไทยกว่า 20,000 แห่ง ทั้งแบบรายเดือน รายวัน โรงแรม และที่พักเลี้ยงสัตว์ได้ ผู้ใช้ค้นหาตามแนวรถไฟฟ้า มหาวิทยาลัย จังหวัด ถนน ห้างฯ หรือนิคมอุตสาหกรรม ดูภาพและทัวร์เสมือน 360° พร้อมแชทถามห้องว่างกับเจ้าของได้ ส่วนเจ้าของหอลงประกาศฟรี",
    ],
    ctxBusiness:
      "Renthub ทำเงินจากการเชื่อมผู้เช่ากับเจ้าของห้อง — critical path คือ ค้นหา → เปรียบเทียบ → นัดดูห้อง",
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
    decisionsIntro:
      "ผมเลือกเล่า 3 decision ที่ยากที่สุดใน redesign นี้ — แต่ละอันมี trade-off ที่ยอม และ option ที่ตัดออก",
    decisions: [
      { title: "[ ชื่อ decision 1 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 2 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 3 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
    ],
    expWhy:
      "ไม่มี A/B testing tool ผมใช้ GA4 event + Clarity เก็บพฤติกรรมจริง แล้วเทียบ conversion rate before/after ระหว่าง design เดิมกับ design ใหม่",
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
    year: "2024 – ปัจจุบัน",
    status: "available",
    liveUrl: "#",
    tagline:
      "ผู้ช่วย AI ในระบบลงประกาศ ที่ช่วยเอเจนต์ร่างคำบรรยาย แนะนำราคา และจัดเรียงรูป — ออกแบบให้โปร่งใสและควบคุมผลลัพธ์ได้",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY – ปัจจุบัน ]",
    metaMethod: "Hypothesis-driven + Usage analytics",
    metaScale: "[ __,000+ ] listings created",
    tools: ["Figma", "Claude", "Google Analytics", "Microsoft Clarity"],
    overview: [
      "AI Listing Assistant เป็นฟีเจอร์ที่ฝังในระบบลงประกาศ ช่วยร่างคำบรรยายทรัพย์ แนะนำช่วงราคา และจัดเรียงรูปอัตโนมัติ โจทย์คือทำให้ AI เป็นผู้ช่วยที่โปร่งใส ตรวจสอบได้ และผู้ใช้ยังคุมผลลัพธ์ได้เต็มที่ ผมเป็น designer คนเดียว รับผิดชอบตั้งแต่ pattern การ suggest/edit/accept จนถึง measure การใช้งานจริง",
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
    decisionsIntro: "ผมเลือกเล่า 3 decision ที่ยากที่สุดในการออกแบบ AI experience นี้",
    decisions: [
      { title: "[ ชื่อ decision 1 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 2 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
      { title: "[ ชื่อ decision 3 ]", reasoning: "[ data/insight ]", tradeoff: "[ ยอมเสียอะไร ]", cut: "[ option ที่ตัดออก ]" },
    ],
    expWhy:
      "ผมวัดผลจาก usage analytics จริง (GA4 event + Clarity) เทียบเวลาและ accept rate ระหว่าง flow เดิมกับ flow ที่มี AI",
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
    year: "2018 – ปัจจุบัน",
    status: "available",
    liveUrl: "#",
    tagline:
      "งานออกแบบกราฟิกและภาพประกอบสำหรับแคมเปญการตลาดและสื่อภายในองค์กร — ทำควบคู่กับงาน product เพื่อให้ภาพลักษณ์แบรนด์สอดคล้องกัน",
    metaRole: "Designer",
    metaTimeline: "2018 – ปัจจุบัน",
    metaMethod: "Brief → Explore → Refine → Deliver",
    metaScale: "[ __+ ] ชิ้นงาน",
    tools: ["Figma", "Illustrator", "Photoshop"],
    overview: [
      "รวมงาน visual ที่ทำควบคู่กับงาน product ตั้งแต่ key visual แคมเปญ สื่อโซเชียล ไปจนถึง illustration และ guideline เล็ก ๆ โจทย์คือทำให้การสื่อสารของแบรนด์ดูเป็นอันหนึ่งอันเดียวกันในทุกช่องทาง และผลิตงานได้เร็วขึ้นด้วยชุด template ผมรับผิดชอบตั้งแต่รับ brief จากทีมการตลาด จนถึงส่งมอบไฟล์พร้อมใช้",
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
    decisionsIntro: "ผมเลือกเล่า 3 decision ด้าน visual system ที่มีผลต่อความเร็วและความสอดคล้อง",
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
    year: "2022 – 2023",
    status: "available",
    liveUrl: "#",
    tagline:
      "แดชบอร์ดสรุปแนวโน้มตลาดอสังหาฯ ที่เปลี่ยนข้อมูลจำนวนมากให้อ่านง่ายและนำไปตัดสินใจได้ในไม่กี่วินาที",
    metaRole: "Sole Product Designer",
    metaTimeline: "2022 – 2023",
    metaMethod: "Hypothesis-driven + Comprehension test",
    metaScale: "[ __+ ] ผู้ใช้ภายใน",
    tools: ["Figma", "Looker Studio", "Google Analytics"],
    overview: [
      "Market Insight Dashboard เปลี่ยนข้อมูลตลาดจำนวนมากให้อ่านง่ายและนำไปตัดสินใจได้ ผู้ใช้หลักคือทีมขายและลูกค้าองค์กร โจทย์คือจัดลำดับข้อมูลให้เริ่มจากภาพรวมแล้วเจาะลึกได้ตามทำเลและประเภททรัพย์ ผมเป็น designer คนเดียว รับผิดชอบตั้งแต่คัด metric สำคัญ จนถึงทดสอบการตีความข้อมูล",
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
    decisionsIntro: "ผมเลือกเล่า 3 decision ด้านการจัดลำดับและ visualize ข้อมูล",
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
   *  section ที่ยังไม่มีรูป = ปล่อย screens: [] ไว้ → โชว์ป้าย "เร็ว ๆ นี้" */
  appScreens?: { title: string; screens: { src: string; label: string }[] }[];
  /** หน้าเว็บแยกตาม category (โชว์แบบเดียวกับ App — พื้นเทา + header + จอเรียง scroll แนวนอน)
   *  category ที่ยังไม่มีรูป = ปล่อย screens: [] → โชว์ป้าย "เร็ว ๆ นี้" */
  /** phone: true = เรนเดอร์ด้วย AppScreensShowcase (จอมือถือขนาดเท่า App projects · ไม่มี lightbox) แทน rail เว็บ */
  webScreens?: { category: string; phone?: boolean; screens: { src?: string; label?: string; group?: string; w?: number; h?: number }[] }[];
  /** Style Guide — บอร์ด Color/Font/Icon (โชว์แบบเดียวกับ Propertyhub — รูปเต็มความกว้างเรียงลงมา) */
  styleGuide?: { label: string; src?: string; w?: number; h?: number }[];
};

export const placeholderProjects = {
  // Data & AI Workflow — render ด้วย DataAnalysisView (special-case ใน work/[slug])
  // เนื้อหาจริงอยู่ที่ data/data-analysis.ts · entry นี้ให้ title/tagline/status + SEO metadata
  "data-analysis": {
    title: "Data & AI Workflow",
    category: "Digital Product",
    status: "available",
    tagline:
      "วิเคราะห์ data ของ product เองด้วย Claude + MCP — ต่อเข้ากับ GA4 / Clarity / Zimple ขุด insight แล้วต่อยอดเป็น idea และ mockup ได้โดยไม่ต้องรอทีม data",
    tools: ["Claude", "Google Analytics", "Microsoft Clarity", "Figma"],
  },
  "propertyhub-app": {
    title: "Propertyhub App",
    category: "Digital Product",
    status: "available",
    tagline:
      "แอปมือถือของ Propertyhub — ค้นหา เปรียบเทียบ และติดต่อประกาศเช่า/ขายได้ครบในมือ",
    overview: [
      "PropertyHub App คือแอปพลิเคชันซื้อ ขาย และเช่าอสังหาฯ ทั่วไทย รวมคอนโด บ้าน ที่ดิน และอื่นๆ กว่า 240,000 ประกาศ จากทั้งเจ้าของและนายหน้ามืออาชีพ ค้นหาบนแผนที่หรือระบุทำเล ถนน รถไฟฟ้า ห้างฯ มหาวิทยาลัย พร้อมประกาศอัปเดตเรียลไทม์ทุกวัน บันทึกประกาศโปรด เซฟการค้นหาไว้ใช้ซ้ำ และแชทกับเจ้าของได้โดยตรง ปลอดภัยด้วยระบบยืนยันตัวตนและเครื่องหมาย Verify",
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
      "แอปหาหอพัก/คอนโดให้เช่า — เปรียบเทียบห้องและนัดดูห้องได้จากมือถือ",
    overview: [
      "RentHub App คือแอปพลิเคชันหาหอพักและอพาร์ทเม้นท์ให้เช่าทั่วไทยกว่า 16,000 แห่ง ทั้งรายเดือนและรายวัน ค้นหาที่พักใกล้ตัวหรือใกล้จุดสำคัญอย่างรถไฟฟ้า มหาวิทยาลัย และห้างฯ ดูภาพจริงและทัวร์เสมือน 360° ได้โดยไม่ต้องเดินทางไปดูเอง แชทถามห้องว่างกับเจ้าของแบบเรียลไทม์ พร้อมเครื่องหมาย Verify ยืนยันตัวตนเจ้าของหอเพื่อความน่าเชื่อถือ",
    ],
    tools: ["Figma"],
    appStoreUrl: "https://apps.apple.com/th/app/renthub/id1609161570",
    // hero — splash → onboarding → home
    screens: [
      { label: "Splash", src: "/uploads/renthub-app-splash.png", w: 660, h: 1320 },
      { label: "Onboarding", src: "/uploads/renthub-app-onboarding.png", w: 660, h: 1320 },
      { label: "Home", src: "/uploads/renthub-app-home-main.png", w: 660, h: 1320 },
    ],
    // Screens แยกตาม section (Wireframe / Home / Favorite / Chat / Profile)
    // section ที่ยังไม่มีรูป = screens: [] → โชว์ "เร็ว ๆ นี้"
    appScreens: [
      {
        title: "Wireframe",
        screens: [
          { src: "/uploads/renthub-app-wireframe.png", label: "หน้าแรก (wireframe)" },
          { src: "/uploads/renthub-app-wireframe-2.png", label: "รายละเอียดที่พัก (wireframe)" },
          { src: "/uploads/renthub-app-wireframe-3.png", label: "ค้นหาบนแผนที่ (wireframe)" },
          { src: "/uploads/renthub-app-wireframe-4.png", label: "รายการที่พัก (wireframe)" },
        ],
      },
      {
        title: "Onboarding",
        screens: [
          { src: "/uploads/renthub-app-onboarding.png", label: "แหล่งรวมหอพัก" },
          { src: "/uploads/renthub-app-onboarding-2.png", label: "ค้นหาห้องได้ง่ายขึ้น" },
          { src: "/uploads/renthub-app-onboarding-3.png", label: "Virtual Tour 360°" },
          { src: "/uploads/renthub-app-onboarding-4.png", label: "Verified" },
          { src: "/uploads/renthub-app-onboarding-5.png", label: "Chat กับเจ้าของหอ" },
        ],
      },
      {
        title: "Home",
        screens: [
          { src: "/uploads/renthub-app-home-main.png", label: "หน้าแรก" },
          { src: "/uploads/renthub-app-search.png", label: "ค้นหาตามสถานี" },
          { src: "/uploads/renthub-app-map.png", label: "ค้นหาบนแผนที่" },
          { src: "/uploads/renthub-app-detail.png", label: "รายละเอียดที่พัก" },
          { src: "/uploads/renthub-app-review.png", label: "รีวิวทั้งหมด" },
        ],
      },
      {
        title: "Favorite",
        screens: [
          { src: "/uploads/renthub-app-favorite.png", label: "หอพักที่คุณสนใจ" },
          { src: "/uploads/renthub-app-viewed.png", label: "หอพักที่เคยเข้าชม" },
        ],
      },
      {
        title: "Chat",
        screens: [
          { src: "/uploads/renthub-app-chat-list.png", label: "กล่องข้อความ" },
          { src: "/uploads/renthub-app-chat-1.png", label: "แชทกับเจ้าของ" },
          { src: "/uploads/renthub-app-chat-2.png", label: "ส่งรูปในแชท" },
        ],
      },
      {
        title: "Profile",
        screens: [
          { src: "/uploads/renthub-app-profile.png", label: "โปรไฟล์ (ยังไม่เข้าสู่ระบบ)" },
          { src: "/uploads/renthub-app-login.png", label: "เข้าสู่ระบบ" },
          { src: "/uploads/renthub-app-profile-loggedin.png", label: "โปรไฟล์ (เข้าสู่ระบบแล้ว)" },
          { src: "/uploads/renthub-app-profile-edit.png", label: "แก้ไขข้อมูลส่วนตัว" },
        ],
      },
    ],
  },
  "renthub-agency": {
    title: "Expat",
    category: "Digital Product",
    status: "process",
    tagline:
      "เว็บแพลตฟอร์มหาที่พักให้เช่าสำหรับชาวต่างชาติในกรุงเทพฯ — ค้นหา เปรียบเทียบ และติดต่อเอเจนต์ได้ในที่เดียว",
    liveUrl: "https://expathome.dev/",
    overview: [
      "Expat คือเว็บแพลตฟอร์มค้นหาที่พักให้เช่าสำหรับผู้เช่าชาวต่างชาติเป็นหลัก มุ่งเน้นอพาร์ตเมนต์ระดับราคาค่าเช่าสูงที่บริหารการตลาดและหาผู้เช่าด้วยตนเอง ซึ่งไม่ได้ลงประกาศบน RentHub โดยทีมงานเป็นผู้ติดต่อเพื่อรวบรวมข้อมูลอพาร์ตเมนต์เหล่านั้นมานำเสนอบนแพลตฟอร์ม จุดต่างสำคัญจาก RentHub อยู่ที่รูปแบบรายได้ กล่าวคือ Expat รับค่าคอมมิชชันจากอพาร์ตเมนต์โดยตรงเมื่อผู้เช่าระบุว่ามาจาก Expat ขณะที่ RentHub อาศัยให้เจ้าของลงประกาศเองและเก็บค่าโฆษณาจากผู้ที่ต้องการให้ประกาศแสดงบนหน้าแรก",
    ],
    tools: ["Figma"],
    heroWeb: "/uploads/renthub-agency-web-laptop.png",
    heroPhone: "/uploads/renthub-agency-app-home.png",
    // Style Guide — บอร์ด Color/Font/Icon (โชว์แบบเดียวกับ Propertyhub — รูปเต็มเรียงลงมา)
    styleGuide: [
      { label: "Color", src: "/uploads/renthub-agency-ds-color.jpg", w: 6000, h: 6000 },
      { label: "Font", src: "/uploads/renthub-agency-ds-font.jpg", w: 6000, h: 6000 },
      { label: "Icon", src: "/uploads/renthub-agency-ds-icon.jpg", w: 6000, h: 6000 },
    ],
    // Screens ของ Expat — แยกตาม category (โชว์แบบ App) · Wireframe = category ย่อยหนึ่ง
    webScreens: [
      {
        category: "Wireframe",
        screens: [
          { label: "Home", src: "/uploads/renthub-agency-wireframe-home.jpg", w: 4320, h: 12396 },
          { label: "Listing Result", src: "/uploads/renthub-agency-wireframe-listing-result-v2.jpg", w: 4320, h: 10824 },
          { label: "Listing Detail", src: "/uploads/renthub-agency-wireframe-listing-detail.jpg", w: 4320, h: 15072 },
        ],
      },
      {
        category: "Sign Up / Sign In",
        screens: [
          { label: "Sign in", src: "/uploads/renthub-agency-signin-v2.jpg", w: 4320, h: 3072 },
          { label: "Sign up", src: "/uploads/renthub-agency-signup-v2.jpg", w: 4320, h: 3072 },
        ],
      },
      {
        category: "Home",
        screens: [
          { label: "Home", src: "/uploads/renthub-agency-home.jpg", w: 1600, h: 6807 },
        ],
      },
      {
        // flow ให้ผู้ใช้กรอกความต้องการ (ติดต่อ → งบ → สิ่งอำนวยความสะดวก → ทำเล) แล้วให้ทีมช่วยหาห้อง
        category: "Find My Home",
        screens: [
          { label: "Step 1 — Contact info", src: "/uploads/renthub-agency-home-step1-contact-v2.jpg", w: 4320, h: 3072 },
          { label: "Step 2 — Budget", src: "/uploads/renthub-agency-home-step2-budget-v2.jpg", w: 4320, h: 3072 },
          { label: "Step 3 — Amenities", src: "/uploads/renthub-agency-home-step3-amenities-v2.jpg", w: 4320, h: 3072 },
          { label: "Step 4 — Location", src: "/uploads/renthub-agency-home-step4-location-v2.jpg", w: 4320, h: 3072 },
          { label: "Well done", src: "/uploads/renthub-agency-home-welldone.jpg", w: 4320, h: 3072 },
        ],
      },
      {
        category: "Listing Result",
        screens: [
          { label: "Listing result", src: "/uploads/renthub-agency-listing-result.jpg", w: 4320, h: 10839 },
          { label: "Empty state", src: "/uploads/renthub-agency-listing-empty.jpg", w: 4320, h: 7599 },
          { label: "Map view", src: "/uploads/renthub-agency-listing-map.jpg", w: 4320, h: 3072 },
        ],
      },
      {
        category: "Listing Detail",
        screens: [
          { label: "Listing detail", src: "/uploads/renthub-agency-detail-renthub.jpg", w: 4320, h: 15942 },
          { label: "Serviced apartment", src: "/uploads/renthub-agency-detail-serviced.jpg", w: 4320, h: 16185 },
          { label: "Contact host — sent", src: "/uploads/renthub-agency-detail-contact.jpg", w: 4320, h: 16608 },
        ],
      },
      {
        category: "Shortlist",
        screens: [
          { label: "Shortlist", src: "/uploads/renthub-agency-shortlist-main.jpg", w: 4320, h: 5454 },
          { label: "Unsave", src: "/uploads/renthub-agency-shortlist-filled.jpg", w: 4320, h: 5454 },
          { label: "Empty state", src: "/uploads/renthub-agency-shortlist-empty.jpg", w: 4320, h: 5454 },
        ],
      },
      {
        // จอแอปมือถือ — เรียงตาม flow การใช้งาน (ไม่ตามชื่อไฟล์)
        // phone: true → โชว์ขนาดจอเท่า App projects (AppScreensShowcase) · ไม่มี lightbox
        category: "Mobile (Responsive)",
        phone: true,
        screens: [
          { label: "Home", src: "/uploads/renthub-agency-mobile-home.png", w: 864, h: 1726 },
          { label: "Search results", src: "/uploads/renthub-agency-mobile-result.png", w: 864, h: 1726 },
          { label: "Apartment detail", src: "/uploads/renthub-agency-mobile-detail.png", w: 864, h: 1726 },
          { label: "Room detail", src: "/uploads/renthub-agency-mobile-room.png", w: 864, h: 1726 },
          { label: "Shortlist", src: "/uploads/renthub-agency-mobile-shortlist.png", w: 864, h: 1726 },
          { label: "Sign in", src: "/uploads/renthub-agency-mobile-signin.png", w: 864, h: 1726 },
        ],
      },
    ],
  },
  rentos: {
    title: "RentOS",
    category: "Digital Product",
    status: "process",
    tagline: "รายละเอียดเร็ว ๆ นี้",
  },
  baandee: {
    title: "Baandee",
    category: "AI Product",
    status: "process",
    tagline: "แพลตฟอร์มผู้ช่วยด้านที่อยู่อาศัย — เดโมหน้าเว็บที่สร้างด้วย AI (กดเปิดเล่นได้จริง)",
    demoUrl: "/demos/baandee.html",
    demoCover: "/uploads/baandee-cover.jpg",
  },
  // PropertyOS — โปรเจกต์เดียวของหมวด AI Product (Website Builder อยู่ใต้ตัวนี้)
  // เนื้อหาเต็มอยู่ที่ data/website-builder.ts — render ด้วย WebsiteBuilderView
  propertyos: {
    title: "PropertyOS",
    category: "AI Product",
    status: "process",
    tagline:
      "แพลตฟอร์มรวมงานของเอเจนต์อสังหาฯ ไว้ที่เดียว — หน้านี้เล่างาน Website Builder ที่อยู่ในนั้น: ชุดธีม 3 แบบ × 3 ประเภทหน้า ที่ระบบเอาไปสร้างเว็บให้เอเจนต์ได้ในคลิกเดียว",
  },
  // คลังงานเก่า 2018–2020 — render ด้วย EarlyWorkView (special-case ใน work/[slug])
  "early-work": {
    title: "Early Work",
    category: "Archive",
    status: "archived",
    tagline:
      "คลังงานออกแบบช่วงปี 2018–2020 — แอป เว็บ/หลังบ้าน design system และงานกราฟิก จาก portfolio เล่มเดิม",
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
  process: "On Process",
  coming: "Coming Soon",
  archived: "Old work",
};
