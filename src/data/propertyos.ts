// ────────────────────────────────────────────────────────────────────────────
// PROPERTYOS — หน้า /work/propertyos (เดิมชื่อไฟล์ website-builder.ts)
//
// PropertyOS = แพลตฟอร์ม Real Estate Management ของทีม — เจ้าของ portfolio
// รับผิดชอบ 2 ฟีเจอร์เท่านั้น: Chat System และ Website Builder
// หน้านี้จึงเล่าเป็น 2 บล็อกคู่ขนาน บล็อกละ 3 จังหวะ: What → How → Result
//
// ⚠️ ห้ามเขียนให้ดูเหมือนทำทั้งแพลตฟอร์ม — ตัวระบบใหญ่เป็นงานของทีม
//
// รูป: /uploads/propertyos/*.png (Chat System) · /uploads/website-builder/*.jpg (Builder)
// เพิ่ม/แก้เนื้อหา = แก้ไฟล์นี้ไฟล์เดียว ไม่ต้องแตะ component
// ────────────────────────────────────────────────────────────────────────────

const U = "/uploads/website-builder";
const C = "/uploads/propertyos";

export type WBShot = { src: string; label: string; w: number; h: number };

export type WBTheme = {
  key: string;
  name: string;
  /** คำเดียวที่สรุปคาแรกเตอร์ของธีม */
  mood: string;
  /** ลูกค้าปลายทางที่ธีมนี้ทำมาเพื่อ */
  bestFor: string;
  font: string;
  /** สี accent จริงจาก tailwind.config ของธีมนั้น */
  accent: string;
  accentName: string;
  surface: string;
  home: WBShot;
};

export type WBLayoutSet = {
  key: string;
  title: string;
  /** โจทย์ของหน้านี้ — ทำไมต้องมีหลาย layout */
  goal: string;
  /** ชื่อ + ความต่างของแต่ละ layout (เรียงตรงกับ shots ของแต่ละธีม) */
  layouts: { name: string; note: string }[];
  /** จอของแต่ละธีม — key ตรงกับ WBTheme.key */
  shots: Record<string, WBShot[]>;
};

export const propertyos = {
  title: "PropertyOS",
  tagline:
    "แพลตฟอร์ม Real Estate Management ของทีม — งานที่ผมรับผิดชอบคือ Chat System และ Website Builder",

  // ⚠️ Overview = ย่อหน้าเดียวเสมอ (user สั่งซ้ำหลายรอบ) — ยาวได้ แต่ห้ามขึ้นย่อหน้าใหม่
  //    เว้นจังหวะการอ่านด้วย em space ( ) แทนการขึ้นบรรทัด เพราะ HTML ยุบ space ปกติทิ้ง
  overview: [
    "PropertyOS เป็นแพลตฟอร์ม Real Estate Management สำหรับเอเจนต์และเอเจนซีอสังหาริมทรัพย์ — รวมงานที่เดิมกระจายอยู่หลายเครื่องมือ ทั้งการลงประกาศ การหาทรัพย์ในตลาด การติดต่อลูกค้าจากหลายช่องทาง และการบริหารทีมขาย มาไว้ในระบบเดียว เป้าหมายของโปรดักต์คือลดงานประจำวันที่กินเวลาเอเจนต์ เพื่อให้เหลือเวลาไปโฟกัสกับการปิดการขายมากขึ้น ตัวแพลตฟอร์มในภาพรวมเป็นงานของทีม ส่วนที่ผมรับผิดชอบมี 2 ฟีเจอร์ — Chat System ศูนย์รวมข้อความจากทุกช่องทางให้ตอบได้ในหน้าเดียว และ Website Builder เครื่องมือที่ให้เอเจนต์สร้างเว็บไซต์ของตัวเองจากข้อมูลประกาศที่มีอยู่แล้วในระบบ ทั้งสองงานผมดูแลตั้งแต่ตั้งโจทย์ วางโครงหน้าจอ ไปจนถึงงานออกแบบจริงที่ส่งต่อให้ทีมพัฒนา",
  ],

  tools: ["Claude", "v0 by Vercel"],

  /** สรุปสั้น ๆ ว่าทำอะไรให้โปรเจกต์นี้บ้าง — 2 ใบ ไม่ต้องร่ายยาว
   *  ภาพประกอบของ section นี้คือหน้าต่างไฟล์ screen flow (BuilderPanelsMock) ไม่ใช่รูปหน้าเว็บ */
  contribution: {
    title: "What did I do with this project?",
    items: [
      {
        key: "chat",
        name: "Chat System",
        note: "รวมแชททุกช่องทางมาตอบในหน้าเดียว พร้อมข้อมูลลูกค้าข้างบทสนทนา",
      },
      {
        key: "builder",
        name: "Website Builder",
        note: "ให้เอเจนต์กดสร้างเว็บไซต์ของตัวเองจากประกาศที่มีอยู่แล้วในระบบ",
      },
    ],
  },

  /** ── บล็อกที่ 1: Chat System ── (รูปนำ + ย่อหน้าเดียวรวม what/how/result) */
  chat: {
    title: "Chat System",
    hero: { src: `${C}/chat.png`, label: "Chat System — แชทรวมทุกช่องทาง", w: 1920, h: 902 },
    body: "ศูนย์รวมข้อความของเอเจนต์ — ดึงแชทจากทุกช่องทางที่ลูกค้าทักเข้ามามารวมในหน้าเดียว โดยมีข้อมูลลูกค้า แท็กความสนใจ และสถานะในไปป์ไลน์อยู่ข้างบทสนทนาเสมอ ตอบและติดตามต่อได้โดยไม่ต้องสลับแอป กระบวนการทำงานใช้ชุดเดียวกับที่เล่าไว้ในหน้า Data & AI Workflow: วางบริบทของโปรดักต์เป็น project instructions ครั้งเดียว คุยทีละหัวข้อจนได้ persona / ฟีเจอร์เฟสแรก / user flow / IA แล้วขอ artifact เป็น ASCII layout ทั้ง 8 หน้าจอเพื่อเคาะโครงให้จบก่อนลงมือทำจริง ผลลัพธ์คือหน้าจอหลักครบชุด ตั้งแต่แชทรวม การจัดกลุ่มลูกค้าด้วยแท็ก การเฝ้าหาทรัพย์ในตลาด ไปจนถึงขั้นตอนเชื่อมต่อ LINE OA ที่มีทั้งหน้าตั้งค่าและ dialog อธิบายวิธีเอา Channel Secret และ Access Token มาใส่",
    screens: [
      { src: `${C}/chat.png`, label: "แชทรวมทุกช่องทาง — ข้อมูลลูกค้าอยู่ฝั่งขวา", w: 1920, h: 902 },
      { src: `${C}/chat-tags.png`, label: "แท็กลูกค้า — จัดกลุ่มตามความสนใจเพื่อติดตามต่อ", w: 1920, h: 900 },
      { src: `${C}/watchlist.png`, label: "หาทรัพย์ในตลาด — Watch List ตามเงื่อนไขที่ตั้งไว้", w: 1920, h: 901 },
      { src: `${C}/watchlist-detail.png`, label: "ผลของ Watch List — ประกาศใหม่จากหลาย portal", w: 1920, h: 901 },
      { src: `${C}/line-connect.png`, label: "ตั้งค่าการเชื่อมต่อ — LINE Official Account", w: 1920, h: 902 },
      { src: `${C}/line-dialog.png`, label: "ขั้นตอนเชื่อม LINE OA — Channel Secret + Access Token", w: 1920, h: 901 },
    ] satisfies WBShot[],
  },

  /** ── บล็อกที่ 2: Website Builder ── (รูปนำคือหน้าจอ editor · ย่อหน้าเดียวรวม what/how/result) */
  builder: {
    title: "Website Builder",
    body: "เครื่องมือให้เอเจนต์กดสร้างเว็บไซต์ของตัวเองได้ในไม่กี่นาที — คนที่อยากมีเว็บเป็นของตัวเองแต่ไม่มีทั้งงบและเวลาไปจ้างทำ โจทย์จึงเป็น “กดปุ่มเดียวได้เว็บที่ใช้งานได้จริง แล้วค่อยไปปรับทีหลัง” โดยระบบดึงลิสต์ประกาศที่ลงไว้ใน PropertyOS มาเติมให้เอง ไม่ต้องกรอกซ้ำสองรอบ วิธีทำคือร่าง screen flow ของทั้ง builder เป็นไฟล์ตัวอักษรให้จบก่อนเปิดไฟล์ออกแบบ แล้วค่อยไล่ทำทีละส่วน ตั้งแต่ onboarding ที่ตัดการตัดสินใจให้เหลือน้อยที่สุด โครง editor 3 พาเนลที่ทุกหน้าใช้ร่วมกัน ไปจนถึงชุดธีมและ layout ทางเลือกของแต่ละ section ที่เป็นของจริงส่งเข้าระบบ",
  },

  /** onboarding ของ builder — สรุปจากเอกสาร screen flow */
  flow: {
    title: "Onboarding",
    goal: "เป้าหมายที่ตั้งไว้: เอเจนต์ที่ไม่เคยทำเว็บมาก่อน ต้องได้เว็บที่เผยแพร่ได้จริงภายในเวลาไม่เกิน 2 นาที โดยไม่ต้องตัดสินใจอะไรมากกว่า 2 เรื่อง",
    steps: [
      {
        title: "Name the site",
        body: "หน้าจอแรกถามอย่างเดียวคือชื่อ แล้วโชว์ URL ที่จะได้ทันทีระหว่างพิมพ์ (ชื่อ.propertyos.com) — เปลี่ยนทีหลังได้ ไม่ต้องคิดนาน",
      },
      {
        title: "Pick a theme",
        body: "จุดที่งานของผมเข้ามา — เอเจนต์เลือกจากธีมที่ทำไว้ ดู preview เต็มหน้าได้ก่อนตัดสินใจ นี่คือการตัดสินใจก้อนใหญ่ที่สุดของทั้ง flow เพราะมันกำหนดทั้งฟอนต์ สี และโครงหน้าที่จะได้",
      },
      {
        title: "System builds the site",
        body: "ระบบเอาธีมที่เลือกมาประกอบกับข้อมูลจริงในบัญชี — ดึงลิสต์ประกาศจาก PropertyOS มาเติมทุก section ที่ต้องใช้ทรัพย์ เอเจนต์ไม่ต้องอัปโหลดรูปหรือพิมพ์ราคาซ้ำ",
      },
      {
        title: "Publish or keep editing",
        body: "จบ flow ด้วยทางแยก — กด publish แล้วแชร์ลิงก์ได้เลย หรือเข้า editor ไปเปลี่ยนสี ฟอนต์ สลับ layout ของแต่ละ section ต่อ ธีมจึงต้องถูกออกแบบให้ “ทนต่อการถูกแก้” ไม่ใช่สวยเฉพาะตอนที่ยังไม่มีใครแตะ",
      },
    ],
  },

  /** หน้าจอ editor ที่เอเจนต์เจอหลังจบ onboarding
   *  ที่มา: CompleteScreenFlowWebBuilder.md (1,672 บรรทัด · 8 flow) */
  screenFlow: {
    // ⚠️ title ต้องสื่อว่า "นี่คือหน้าที่เจอต่อจาก onboarding" — user ตีกลับมาแล้วรอบนึง
    title: "What agents see after onboarding",
    goal:
      "จบ onboarding แล้วถ้าเอเจนต์เลือก “แก้ต่อ” จะมาโผล่ที่หน้านี้ — editor ที่ใช้โครงเดียวกันทุกหน้าและทุก section ก่อนเปิดไฟล์ออกแบบผมร่างทุกหน้าจอ ทุก dialog ทุก state ของ builder เป็นไฟล์ตัวอักษรจนจบก่อน (1,672 บรรทัด ครอบคลุม 8 flow ตั้งแต่ onboarding ถึงหน้าตั้งค่าสไตล์) เพราะการแก้ตอนที่ยังเป็นตัวหนังสือถูกกว่าการแก้ตอนที่เป็นไฟล์ดีไซน์แล้วมาก",
    /** 3 พาเนลที่ทุกหน้าใน builder ใช้โครงเดียวกัน — ชื่อ Panel N โชว์เป็นแท็กเล็ก ๆ */
    panels: [
      { name: "Panel 1", role: "Page & section", note: "ไล่หน้าและไล่ section ของหน้านั้น ลากสลับระหว่างกลุ่ม Active / Inactive ได้ตรงนี้" },
      { name: "Panel 2", role: "Live preview", note: "เห็นผลทันทีที่แก้ สลับดู Desktop / Tablet / Mobile ได้จากแถบเดียวกัน" },
      { name: "Panel 3", role: "Editing controls", note: "คอนโทรลของ section ที่เลือก เรียง Layout → Content → Settings เหมือนกันทุกหน้า" },
    ],
    /** ข้อตัดสินใจเชิงโครงสร้างที่ล็อกไว้ในไฟล์ตั้งแต่ต้น — ย่อหน้าเดียว ไม่แตกเป็นข้อ ๆ */
    decisions:
      "ข้อตัดสินใจที่ล็อกไว้ตั้งแต่ยังเป็นไฟล์ตัวอักษรมีอยู่ไม่กี่ข้อ แต่เป็นตัวกำหนดหน้าตาของทั้ง builder — หน้าแรกคือหน้าที่เอเจนต์อยากปรับจริง เลยให้แก้ได้ทีละ section ทั้งเพิ่ม ลบ และสลับลำดับ ส่วนหน้าอื่นให้เลือก layout สำเร็จรูปแล้วเติมเนื้อหาแทน เป็นการแลกความยืดหยุ่นกับความเร็วคนละแบบตามความสำคัญของหน้า การซ่อนหรือโชว์ section ก็ใช้วิธีเดียวคือลากข้ามระหว่างกลุ่ม ACTIVE กับ INACTIVE ไม่มีไอคอนรูปตาให้ต้องเดาว่าแปลว่าซ่อนอยู่หรือกำลังโชว์ การเลือกทรัพย์ที่จะเอาไปโชว์จบในหน้าต่างเดียว เลือกและลากจัดลำดับพร้อมเห็น preview สดอยู่ในนั้นเลย เพราะอยากให้ตัว UI อธิบายตัวเองแทนการเขียนคำแนะนำยาว ๆ และหน้ารายละเอียดทรัพย์ยึดโครง 70:30 ตามที่เว็บอสังหาฯ ส่วนใหญ่ใช้ เพราะเป็นโครงที่คนหาบ้านคุ้นมืออยู่แล้ว ไม่ใช่ที่ที่ควรเอามาทดลองของใหม่",
    /** ที่มาของ dialog เลือก layout — ต้องมีบรรทัดนี้ก่อน ไม่งั้นมันโผล่มาเฉย ๆ */
    layoutPicker:
      "ตัวอย่างของคอนโทรลใน Panel 3 — กด “Choose layout →” ของ section ไหนก็เปิด dialog หน้าตาเดียวกันนี้ เลือกได้ทีละแบบ เห็นโครงคร่าว ๆ ของแต่ละตัวเลือกพร้อมบรรทัดบอกว่าเหมาะกับอะไร ตัว dialog นี้เองที่พาไปสู่ชุด layout ของแต่ละหน้าด้านล่าง",
  },

  themesSection: {
    title: "Design 3 website themes",
    intro:
      "เว็บไซต์ของเอเจนต์หนึ่งเว็บประกอบด้วยหน้าหลัก 3 แบบ — Home หน้าแรกที่รวมทรัพย์เด่นและช่องค้นหา · Result หน้ารวมผลการค้นหาที่ไว้กวาดสายตาหาตัวเลือก · และ Detail หน้ารายละเอียดทรัพย์ที่พาไปสู่การติดต่อเอเจนต์ ผมออกแบบทั้ง 3 หน้านี้ไว้ 3 ธีม คือ Luxury, Minimal และ Formal โดยธีมไม่ได้ต่างกันแค่สี แต่ตั้งใจให้แต่ละธีมพูดกับลูกค้าคนละกลุ่ม เพราะเอเจนต์ที่ขายบ้านหรูกับเอเจนต์ที่ปล่อยเช่าคอนโดใกล้ BTS ต้องการเว็บที่ให้ความรู้สึกคนละแบบ โครงหน้าและลำดับข้อมูลของทั้ง 3 ธีมเหมือนกันหมด สิ่งที่เปลี่ยนคือฟอนต์ จังหวะช่องไฟ และน้ำหนักของภาพ",
    takeaway:
      "ทั้ง 3 ธีมใช้ component และลำดับ section ชุดเดียวกัน — ทำให้ระบบสลับธีมได้โดยเนื้อหาไม่หาย และเพิ่มธีมที่ 4 ทีหลังได้โดยไม่ต้องรื้อ",
  },

  /** แต่ละธีมไม่ได้มีหน้าตาเดียว — ทำ layout ทางเลือกไว้ section ละ 3 แบบ
   *  (นับจากไฟล์จริง layout-1-luxury / layout-2-minimal / layout-3-formal) */
  sectionVariants: {
    title: "Customize the home page with variants",
    intro:
      "ธีมไม่ได้ถูกล็อกมาเป็นหน้าตาเดียว — ในแต่ละธีมผมทำ layout ทางเลือกไว้ section ละ 3 แบบ เอเจนต์จึงเลือกได้ว่าอยากได้ Navbar แบบไหน Hero แบบไหน โดยยังอยู่ในธีมเดิม ไม่ต้องเปลี่ยนทั้งเว็บเพราะไม่ชอบแค่ส่วนเดียว",
    /** ชื่อ section ที่มี 3 ตัวเลือกเท่ากันทั้ง 3 ธีม */
    sections: [
      "Navbar",
      "Hero",
      "Latest listings",
      "Recommended listings",
      "About",
      "Contact",
      "Footer",
    ],
    /** ตัวอย่างของจริง — capture จากไฟล์ธีม Formal (layout.html) โดยกดสลับ variant
     *  ของ Navbar / Hero / Latest listings ก่อนถ่ายทีละชุด (วิธีทำ: ดู memory)
     *  ⚠️ ตอน capture ต้อง crop แถบสลับ layout ที่อยู่หัวไฟล์ธีมออก (y เริ่มที่ 50px)
     *  label ใช้เป็น alt/aria เท่านั้น ไม่ได้โชว์ใต้รูป */
    example: {
      note: "ตัวอย่างของจริงจากไฟล์ธีม Formal — หน้า Home หน้าเดียวกัน ข้อมูลชุดเดียวกัน ต่างกันแค่ตัวเลือกของ Navbar / Hero / Latest listings ที่เลือกไว้คนละชุด อีก 2 ธีมมีตัวเลือกเท่ากันทุกประการ",
      homes: [
        {
          src: `${U}/formal-variant-1.jpg`,
          label: "Navbar 1 · Hero 1 · Listings 1",
          w: 1440,
          h: 1900,
        },
        {
          src: `${U}/formal-variant-2.jpg`,
          label: "Navbar 2 · Hero 2 · Listings 2",
          w: 1440,
          h: 1900,
        },
        {
          src: `${U}/formal-variant-3.jpg`,
          label: "Navbar 3 · Hero 3 · Listings 3",
          w: 1440,
          h: 1900,
        },
      ],
    },
  },

  themes: [
    {
      key: "luxury",
      name: "Luxury",
      mood: "หรู เงียบ มีระยะห่าง",
      bestFor: "บ้านเดี่ยว/วิลล่าราคาสูง ที่ขายด้วยภาพและความน่าเชื่อถือ",
      font: "Gilda Display + Barlow",
      accent: "#aa8453",
      accentName: "ทอง",
      surface: "#f8f5f0",
      home: { src: `${U}/luxury-home.jpg`, label: "Luxury — Home", w: 1440, h: 4901 },
    },
    {
      key: "minimal",
      name: "Minimal",
      mood: "สะอาด อ่านง่าย เป็นกลาง",
      bestFor: "คอนโด/ห้องเช่า ที่ต้องสแกนหลายรายการเร็ว ๆ",
      font: "Inter",
      accent: "#5d8a6b",
      accentName: "เขียว",
      surface: "#f7f9f7",
      home: { src: `${U}/minimal-home.jpg`, label: "Minimal — Home", w: 1440, h: 4706 },
    },
    {
      key: "formal",
      name: "Formal",
      mood: "ทางการ มั่นคง แบบบริษัท",
      bestFor: "เอเจนซี/บริษัทนายหน้า ที่ต้องดูเป็นองค์กร",
      font: "Poppins",
      accent: "#E85A2A",
      accentName: "ส้ม",
      surface: "#1A2D5C",
      home: { src: `${U}/formal-home.jpg`, label: "Formal — Home", w: 1440, h: 5059 },
    },
  ] satisfies WBTheme[],

  layoutSets: [
    {
      key: "result",
      title: "Listing result",
      goal:
        "หน้ารวมผลการค้นหา — โจทย์คือคนใช้กำลัง “กวาดสายตา” หาตัวเลือก ไม่ได้อ่านทีละอัน ผมทำ 3 layout เพราะเอเจนต์แต่ละคนมีจำนวนทรัพย์ไม่เท่ากัน คนมี 8 ประกาศกับคนมี 200 ประกาศต้องการหน้าคนละแบบ",
      layouts: [
        { name: "Layout 1 — Sidebar filter", note: "ฟิลเตอร์ค้างซ้าย เห็นเงื่อนไขที่กรองอยู่ตลอด เหมาะกับคนที่มีทรัพย์เยอะและต้องกรองจริง" },
        { name: "Layout 2 — Top filter", note: "ย้ายฟิลเตอร์ขึ้นด้านบน คืนพื้นที่ให้การ์ดทรัพย์เต็มความกว้าง เหมาะกับทรัพย์จำนวนกลาง ๆ" },
        { name: "Layout 3 — Compact grid", note: "ตัดฟิลเตอร์เหลือเท่าที่จำเป็น เน้นให้เห็นทรัพย์เยอะที่สุดในหน้าเดียว เหมาะกับเอเจนต์ที่มีของไม่กี่ชิ้น" },
      ],
      shots: {
        luxury: [
          { src: `${U}/luxury-result-1.jpg`, label: "Layout 1", w: 1440, h: 3983 },
          { src: `${U}/luxury-result-2.jpg`, label: "Layout 2", w: 1440, h: 2702 },
          { src: `${U}/luxury-result-3.jpg`, label: "Layout 3", w: 1440, h: 2319 },
        ],
        minimal: [
          { src: `${U}/minimal-result-1.jpg`, label: "Layout 1", w: 1440, h: 3992 },
          { src: `${U}/minimal-result-2.jpg`, label: "Layout 2", w: 1440, h: 2807 },
          { src: `${U}/minimal-result-3.jpg`, label: "Layout 3", w: 1440, h: 2328 },
        ],
        formal: [
          { src: `${U}/formal-result-1.jpg`, label: "Layout 1", w: 1440, h: 4013 },
          { src: `${U}/formal-result-2.jpg`, label: "Layout 2", w: 1440, h: 2823 },
          { src: `${U}/formal-result-3.jpg`, label: "Layout 3", w: 1440, h: 2377 },
        ],
      },
    },
    {
      key: "detail",
      title: "Listing detail",
      goal:
        "หน้ารายละเอียดทรัพย์ — หน้าที่เดียวของหน้านี้คือทำให้คนที่สนใจ “ติดต่อเอเจนต์” ทุก layout เลยต้องมีการ์ดติดต่อที่หาเจอตลอดเวลา ต่างกันแค่วิธีจัดวางแกลเลอรีกับลำดับข้อมูล",
      layouts: [
        { name: "Layout 1 — Gallery + sticky agent", note: "แกลเลอรีใหญ่ด้านซ้าย การ์ดเอเจนต์ค้างขวา (โครง 70:30 แบบที่เว็บอสังหาฯ ส่วนใหญ่ใช้) — ปลอดภัยที่สุด" },
        { name: "Layout 2 — Full-width gallery", note: "ดันภาพเต็มความกว้างก่อน แล้วค่อยลงรายละเอียด เหมาะกับทรัพย์ที่ขายด้วยภาพ" },
        { name: "Layout 3 — Compact", note: "อัดข้อมูลสำคัญไว้ครึ่งบนให้ครบ ลดการเลื่อน เหมาะกับทรัพย์ที่ขายด้วยสเปกและราคา" },
      ],
      shots: {
        luxury: [
          { src: `${U}/luxury-detail-1.jpg`, label: "Layout 1", w: 1440, h: 3888 },
          { src: `${U}/luxury-detail-2.jpg`, label: "Layout 2", w: 1440, h: 4051 },
          { src: `${U}/luxury-detail-3.jpg`, label: "Layout 3", w: 1440, h: 3794 },
        ],
        minimal: [
          { src: `${U}/minimal-detail-1.jpg`, label: "Layout 1", w: 1440, h: 3887 },
          { src: `${U}/minimal-detail-2.jpg`, label: "Layout 2", w: 1440, h: 4050 },
          { src: `${U}/minimal-detail-3.jpg`, label: "Layout 3", w: 1440, h: 3793 },
        ],
        formal: [
          { src: `${U}/formal-detail-1.jpg`, label: "Layout 1", w: 1440, h: 3953 },
          { src: `${U}/formal-detail-2.jpg`, label: "Layout 2", w: 1440, h: 4117 },
          { src: `${U}/formal-detail-3.jpg`, label: "Layout 3", w: 1440, h: 3859 },
        ],
      },
    },
  ] satisfies WBLayoutSet[],
};
