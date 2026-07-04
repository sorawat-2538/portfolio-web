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

export type Project = {
  title: string;
  category: string;
  year: string;
  tagline: string;
  liveUrl: string;
  /** รูป hero ของงาน (path ใน public/) — ถ้าไม่มีจะโชว์ placeholder */
  heroImage?: string;

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
    heroImage: "/uploads/Home.jpg",
    liveUrl: "#",
    tagline:
      "Real estate marketplace ไทย ที่ redesign เพื่อ push traffic ผ่าน funnel ไปหน้า SEO landing ที่เป็น revenue driver — โดยผมเป็น designer คนเดียวของทีม",
    metaRole: "Sole Product Designer",
    metaTimeline: "[ MMM YYYY – MMM YYYY ]",
    metaMethod: "Hypothesis-driven + Manual A/B test",
    metaScale: "[ __,000+ ] sessions measured",
    tools: ["Figma", "Claude", "Google Analytics", "Microsoft Clarity"],
    overview: [
      "Propertyhub คือ real estate marketplace ไทย ที่รวมประกาศเช่า/ขายคอนโด บ้าน และที่ดินจากเจ้าของทรัพย์และ agent — revenue signal หลักคือการที่ user กด contact agent (Line/phone/email)",
      "Project นี้เป็นการ redesign ทั้งเว็บ ครอบคลุม 5 หน้าหลัก: Home, Project page, Listing detail, Listing result และหน้ารวมทรัพย์จากธนาคาร (สร้างใหม่ 0→1) โดย deep dive ใน case นี้จะโฟกัสที่ Project page ซึ่งเป็นหน้าที่มี traffic และ business impact สูงสุด",
      "ผมเป็น designer คนเดียวของทีม รับผิดชอบตั้งแต่ requirement, research, design, prototype, hand-off ให้ dev จนถึง measure ผลหลัง ship",
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
