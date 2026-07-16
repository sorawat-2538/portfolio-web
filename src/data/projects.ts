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
 *  available = พร้อมดู/ใช้งานจริง · process = กำลังทำ · coming = ยังไม่เปิด (เร็ว ๆ นี้) */
export type ProjectStatus = "available" | "process" | "coming";

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
  /** จอเพิ่มเติมที่โชว์ในหน้า case study (Home/Result/Listing ฯลฯ)
   *  แต่ละจอเป็น browser frame ที่เลื่อนดูหน้ายาวได้ในกรอบ + กดขยายเต็มจอ
   *  - label : ชื่อจอ (เช่น "Project detail")
   *  - desc  : คำอธิบายสั้น 1 บรรทัด ว่าจอนี้ทำหน้าที่อะไร
   *  - url   : path ที่โชว์ใน address bar ของ browser frame
   *  - src   : path รูปใน public/ (ใส่เมื่อมีรูปจริง) · w/h = ขนาดจริงของรูป (กัน layout shift) */
  screens?: { label: string; src?: string; desc?: string; url?: string; w?: number; h?: number }[];
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
    }[];
  };

  /** "How Claude Helped" — เล่าเป็น flow: ต่อ Claude กับ data → เจอ insight → ขยับบทบาทไปทาง product */
  claude?: {
    intro: string;
    /** ways I put AI to work — each is its own labeled step-flow.
     *  icon = lucide icon name resolved in ClaudeSection */
    flows: {
      label: string;
      sub?: string;
      steps: { label: string; sub: string; icon?: string }[];
    }[];
    insight: {
      lead: string;
      stats: { value: string; label: string }[];
      takeaway: string;
      image: { src: string; caption: string; w: number; h: number };
    };
    closing: string;
  };

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
    // 3 จอจริงจาก Propertyhub — เลื่อนดูทั้งหน้าได้ในกรอบ หรือกดขยายเต็มจอ
    screens: [
      {
        label: "Home",
        desc: "หน้าแรกของ Propertyhub — จุดเริ่มต้นการค้นหา รวมทางเข้าไปยังเช่า/ขาย โครงการใหม่ และทรัพย์แนะนำ",
        url: "propertyhub.in.th",
        src: "/uploads/propertyhub-home-full.jpg",
        w: 1600,
        h: 7403,
      },
      {
        label: "Project detail",
        desc: "หน้ารายละเอียดโครงการ — รวมข้อมูล ทำเล และประกาศเช่า/ขายในโครงการเดียวกัน เป็นจุดที่ traffic เข้าสูงสุด",
        url: "propertyhub.in.th/project",
        src: "/uploads/propertyhub-project-detail.jpg",
        w: 1600,
        h: 5106,
      },
      {
        label: "AssetBank — ทรัพย์มือสองจากธนาคาร",
        desc: "หน้ารวมทรัพย์ NPA ราคาพิเศษจากธนาคารชั้นนำ พร้อมระบบค้นหาและโปรโมชันดอกเบี้ยต่ำ",
        url: "propertyhub.in.th/asset-bank",
        src: "/uploads/propertyhub-assetbank.jpg",
        w: 1600,
        h: 5890,
      },
      {
        label: "New projects",
        desc: "หน้ารวมโครงการใหม่ บ้าน–ทาวน์เฮาส์–คอนโด คัดโครงการแนะนำและจัดกลุ่มตามทำเล/ผู้พัฒนา",
        url: "propertyhub.in.th/new-projects",
        src: "/uploads/propertyhub-new-projects.jpg",
        w: 1600,
        h: 5138,
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
      "Propertyhub คือ real estate marketplace ไทย ที่รวมประกาศเช่า/ขายคอนโด บ้าน และที่ดิน โดย revenue signal หลักคือการที่ user กด contact agent งานนี้คือ redesign ทั้งเว็บ 5 หน้าหลัก ซึ่งผมรับผิดชอบคนเดียวตั้งแต่ research จนถึง measure ผลหลัง ship — โดย case นี้จะ deep dive ที่ Project page หน้าที่มี traffic และ business impact สูงสุด",
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
          title: "หลัง redesign หน้า Project Detail ใหม่ ผมวัดผลยังไง?",
          body: "หลังปล่อย design ใหม่ ผมไม่มี A/B testing tool หรือ research budget จึงวัดผลเองด้วย 3 เครื่องมือฟรี — GA4, Microsoft Clarity และ Zimple Analytics — เก็บพฤติกรรมผู้ใช้จริง แล้วเทียบกับ design เก่าในช่วงเวลาที่ใกล้เคียงกัน เพื่อตอบคำถามเดียวว่า “หน้าใหม่ยังส่งคนไปหน้า listing เช่า/ขายได้ดีขึ้นไหม”",
          images: [
            { src: "/uploads/propertyhub-project-detail.jpg", caption: "หน้า Project Detail ที่ redesign ใหม่ — จุดตั้งต้นของการวัดผล", w: 1600, h: 5106 },
          ],
        },
        {
          title: "วัดผลด้วย GA4 — Funnel Exploration",
          body: "ตั้ง Funnel Exploration ใน GA4 เอง 4 ขั้น (เข้าหน้าโครงการ → ไปหน้า listing result → เข้าหน้า listing detail → กด contact agent) เพื่อดูว่าหน้า Project ใหม่ยังทำงานได้ดีหรือแย่ลงเมื่อเทียบกับ design เก่า ในช่วงเวลาใกล้เคียงกัน — จากรูป ขั้นแรก session ของ design เก่าจะสูงกว่าราวเท่าตัว เพราะเรื่อง consent การกด Accept cookies ของเว็บ แต่ช่วงกลางและปลาย funnel session ใกล้เคียงกันมาก และเมื่อดูตัวเลขจะเห็นว่า design ใหม่ส่ง user ไปถึงขั้นที่ 4 (กด contact agent) ได้มากกว่า design เก่า",
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
            { src: "/uploads/ph-zimple-projectdetail.png", caption: "Zimple Analytics — Navigation Summary ของ project_detail: Next Page เกือบ 50% ไปหน้าประกาศเช่า", w: 3840, h: 1866 },
          ],
        },
      ],
    },
    claude: {
      intro: "ผมไม่ได้ใช้ AI แค่ช่วยงาน UX/UI — แต่ใช้ Claude เป็นเครื่องมือตลอดกระบวนการ ตั้งแต่ขุด insight จาก data จริง ไปจนถึงปั้น wireframe/mockup ให้เร็ว จุดนี้ทำให้ผมขยับบทบาทจาก designer ไปทาง product มากขึ้น — มองหาช่องทางเพิ่ม value ในมุมอื่นได้เอง โดยไม่ต้องรอทีม data หรือ dev",
      flows: [
        {
          label: "ขุด insight จาก data",
          sub: "ต่อ Claude เข้ากับ analytics ผ่าน MCP แล้ววิเคราะห์เอง ไม่ต้องรอทีม data",
          steps: [
            { label: "Claude + MCP", sub: "เชื่อมเครื่องมือ", icon: "Plug" },
            { label: "GA4 · Clarity", sub: "ดึง data ผ่าน MCP", icon: "BarChart3" },
            { label: "Analyze", sub: "ให้ Claude ช่วยวิเคราะห์", icon: "Brain" },
            { label: "Zimple confirm", sub: "power dashboard · ยืนยัน funnel", icon: "Database" },
            { label: "Actionable result", sub: "ได้ทิศทางไป work ต่อ", icon: "Target" },
          ],
        },
        {
          label: "จาก idea สู่ mockup",
          sub: "set instruction ให้ Claude วิเคราะห์ สรุปเป็น MD file แล้วต่อยอดเป็น wireframe/UI ได้เร็วเพื่อนำเสนอ",
          steps: [
            { label: "Set instructions", sub: "กำหนดสิ่งที่จะทำ", icon: "ClipboardList" },
            { label: "Claude analyzes", sub: "วิเคราะห์ + ได้ไอเดีย", icon: "Sparkles" },
            { label: "MD file", sub: "สรุปเป็นสเปก", icon: "FileText" },
            { label: "Wireframe / UI", sub: "Claude สร้างจาก MD", icon: "LayoutTemplate" },
            { label: "Present fast", sub: "ได้ UI เร็วเพื่อนำเสนอ", icon: "Presentation" },
          ],
        },
      ],
      insight: {
        lead: "พอขุดจริง เจอ insight ที่เปลี่ยนโจทย์ทั้งงาน — ผู้ใช้ส่วนใหญ่ที่เข้าหน้า listing ดูแค่ประกาศเดียวแล้วออก",
        stats: [
          { value: "~75%", label: "ของ session ดู listing แค่ 1 view แล้วออก (367K+ sessions)" },
          { value: "1.31%", label: "contact rate ของกลุ่ม 1 view" },
          { value: "21.25%", label: "contact rate ของกลุ่มที่ดู 4+ views" },
        ],
        takeaway: "ยิ่ง user engage ลึก (ดู listing หลายอัน) contact rate ยิ่งพุ่ง — โจทย์ถัดไปจึงไม่ใช่แค่ “ส่งคนไป listing” แต่คือ “ทำยังไงให้ดูลึกกว่า 1 ประกาศ”",
        image: { src: "/uploads/ph-zimple-session.jpg", caption: "Zimple Analytics — Session Explorer: engagement depth distribution (1 / 2 / 3 / 4+ views) เทียบ contact rate", w: 2400, h: 1167 },
      },
      closing: "จุดนี้ทำให้รู้สึกว่าตัวเองขยับจาก “designer” ไปทาง “product” มากขึ้น — ไม่ใช่แค่ออกแบบหน้าจอ แต่ใช้ data ตั้งโจทย์ วัดผล และหา direction ต่อได้เองทั้งวงจร",
    },
    expWhy:
      "ไม่มี A/B testing tool และ research budget ผมจึงออกแบบ manual A/B test โดยใช้ GA4 event + Microsoft Clarity เก็บพฤติกรรมจริง แล้วเทียบ conversion rate แบบ before/after ของ variant เดิมกับ design ใหม่",
    expSegment: "[ วิธีแบ่ง variant — เช่น by user ID ]",
    expTracking: "GA4 event + Microsoft Clarity",
    expDuration: "[ __ สัปดาห์ ]",
    expSample: "Before [ __,000 ] · After [ __,000 ] sessions",
    resultPrimary: {
      label: "CTR: Project page → Listing Result",
      before: "[ ก่อน ]",
      after: "[ หลัง ]",
      delta: "+[ __% ] relative improvement",
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
    liveUrl: "#",
    tagline:
      "มาร์เก็ตเพลสหอพักและคอนโดให้เช่า — redesign flow เปรียบเทียบและนัดดูห้อง เพื่อให้ผู้เช่าตัดสินใจเร็วขึ้นและเจ้าของได้ lead ที่ตรงกลุ่ม",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY – MMM YYYY ]",
    metaMethod: "Hypothesis-driven + Manual A/B test",
    metaScale: "[ __,000+ ] sessions measured",
    tools: ["Figma", "Google Analytics", "Microsoft Clarity"],
    overview: [
      "Renthub เป็นมาร์เก็ตเพลสสำหรับผู้เช่าที่มองหาหอพัก/คอนโดใกล้ที่ทำงานหรือมหาวิทยาลัย revenue signal คือการที่ผู้เช่านัดดูห้องหรือติดต่อเจ้าของ",
      "Project นี้โฟกัสที่ flow การเปรียบเทียบห้องและการนัดดูห้อง ซึ่งเป็นจุดที่ผู้เช่าตัดสินใจ",
      "ผมเป็น designer คนเดียว รับผิดชอบตั้งแต่ requirement, design, prototype จนถึง measure ผลหลัง ship",
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
      "AI Listing Assistant เป็นฟีเจอร์ที่ฝังในระบบลงประกาศ ช่วยร่างคำบรรยายทรัพย์ แนะนำช่วงราคา และจัดเรียงรูปอัตโนมัติ",
      "โจทย์คือทำให้ AI เป็นผู้ช่วยที่โปร่งใส ตรวจสอบได้ และผู้ใช้ยังคุมผลลัพธ์ได้เต็มที่",
      "ผมเป็น designer คนเดียว รับผิดชอบตั้งแต่ pattern การ suggest/edit/accept จนถึง measure การใช้งานจริง",
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
      "รวมงาน visual ที่ทำควบคู่กับงาน product ตั้งแต่ key visual แคมเปญ สื่อโซเชียล ไปจนถึง illustration และ guideline เล็ก ๆ",
      "โจทย์คือทำให้การสื่อสารของแบรนด์ดูเป็นอันหนึ่งอันเดียวกันในทุกช่องทาง และผลิตงานได้เร็วขึ้นด้วยชุด template",
      "ผมรับผิดชอบตั้งแต่รับ brief จากทีมการตลาด จนถึงส่งมอบไฟล์พร้อมใช้",
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
      "Market Insight Dashboard เปลี่ยนข้อมูลตลาดจำนวนมากให้อ่านง่ายและนำไปตัดสินใจได้ ผู้ใช้หลักคือทีมขายและลูกค้าองค์กร",
      "โจทย์คือจัดลำดับข้อมูลให้เริ่มจากภาพรวมแล้วเจาะลึกได้ตามทำเลและประเภททรัพย์",
      "ผมเป็น designer คนเดียว รับผิดชอบตั้งแต่คัด metric สำคัญ จนถึงทดสอบการตีความข้อมูล",
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

/** ลำดับการแสดงผล (Home grid + next/prev nav) = ลำดับ key ด้านบน */
export const projectSlugs = Object.keys(projects) as ProjectSlug[];

export function getProject(slug: string): Project | undefined {
  return (projects as Record<string, Project>)[slug];
}

/** slug ถัดไป (วน loop) สำหรับปุ่ม "ดูงานถัดไป" */
export function getNextSlug(slug: ProjectSlug): ProjectSlug {
  const i = projectSlugs.indexOf(slug);
  return projectSlugs[(i + 1) % projectSlugs.length];
}

export function getPrevSlug(slug: ProjectSlug): ProjectSlug | null {
  const i = projectSlugs.indexOf(slug);
  return i <= 0 ? null : projectSlugs[i - 1];
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
  /** ภาพผลงาน (mockup มือถือ ฯลฯ มีกรอบเครื่องในตัว) — โชว์ใน section "All about works" ถ้ามี */
  screens?: { label?: string; src: string; w: number; h: number }[];
};

export const placeholderProjects = {
  "propertyhub-app": {
    title: "Propertyhub App",
    category: "Digital Product",
    status: "available",
    tagline:
      "แอปมือถือของ Propertyhub — ค้นหา เปรียบเทียบ และติดต่อประกาศเช่า/ขายได้ครบในมือ",
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
  },
  "renthub-agency": {
    title: "Renthub Agency",
    category: "Digital Product",
    status: "coming",
    tagline:
      "เครื่องมือสำหรับเอเจนซี/เจ้าของห้อง จัดการประกาศและ lead ผู้เช่าในที่เดียว",
  },
  "propertyos-chat": {
    title: "PropertyOS Chat",
    category: "AI Product",
    status: "process",
    tagline:
      "ผู้ช่วย AI แชทสำหรับงานอสังหาฯ — ถาม-ตอบข้อมูลทรัพย์และช่วยงานประจำวันของทีม",
  },
  baandee: {
    title: "Baandee",
    category: "AI Product",
    status: "coming",
    tagline: "แพลตฟอร์มผู้ช่วยด้านที่อยู่อาศัย — รายละเอียดเร็ว ๆ นี้",
  },
  "website-builder": {
    title: "Website Builder",
    category: "AI Product",
    status: "process",
    tagline:
      "เครื่องมือสร้างเว็บไซต์ประกาศอสังหาฯ สำหรับเอเจนต์ — ตั้งค่าและปล่อยเว็บได้เอง",
  },
} satisfies Record<string, PlaceholderProject>;

export type PlaceholderSlug = keyof typeof placeholderProjects;
export const placeholderSlugs = Object.keys(placeholderProjects) as PlaceholderSlug[];

export function getPlaceholder(slug: string): PlaceholderProject | undefined {
  return (placeholderProjects as Record<string, PlaceholderProject>)[slug];
}

/** label ไทยของแต่ละ status (ใช้บน badge) */
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  available: "Available",
  process: "On Process",
  coming: "Coming Soon",
};
