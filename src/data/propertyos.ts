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
    "แพลตฟอร์ม Real Estate Management ของทีม โดยรับผิดชอบส่วน Chat System และ Website Builder",

  // Overview = 2 ย่อหน้า (user สั่ง 14 ส.ค. 2026 · เดิมบังคับย่อหน้าเดียว)
  //   ย่อหน้า 1 = ตัวโปรเจกต์ทำอะไร · ย่อหน้า 2 = duration / role / team
  // ⚠️ ย่อหน้า 2 เป็นร่างจาก AI — user ยังไม่ได้ยืนยันถ้อยคำ
  // ⚠️ ห้ามเขียนให้ดูเหมือนรับผิดชอบทั้งแพลตฟอร์ม — ขอบเขตจริงคือ Chat System + Website Builder
  overview: [
    "PropertyOS เป็นแพลตฟอร์มที่ช่วยให้ เอเจนต์จัดการงานขายอสังหาริมทรัพย์ได้ครบในที่เดียว ตั้งแต่การจัดการประกาศ ค้นหาทรัพย์ ดูแลลูกค้าผ่าน Chat ไปจนถึงการสร้างเว็บไซต์สำหรับนำเสนอทรัพย์ของตัวเอง โดยเชื่อมข้อมูลจากระบบเข้าด้วยกัน เพื่อลดงานที่ต้องทำซ้ำและช่วยให้เอเจนต์โฟกัสกับการขายได้มากขึ้น",
    "ในโปรเจกต์นี้รับผิดชอบการออกแบบ 2 ฟีเจอร์หลัก ได้แก่ Chat System และ Website Builder ในฐานะ Designer โดยทำงานร่วมกับ PM และ Developer ตั้งแต่การรับ Requirement, Research, Wireframe, Interface Design ไปจนถึง Design Handoff",
  ],

  tools: ["Claude", "v0 by Vercel"],

  /** สรุปสั้นๆ ว่าทำอะไรให้โปรเจกต์นี้บ้าง — 2 ใบ ไม่ต้องร่ายยาว
   *  ภาพประกอบของ section นี้คือหน้าต่างไฟล์ screen flow (BuilderPanelsMock) ไม่ใช่รูปหน้าเว็บ */
  contribution: {
    title: "What I Did",
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
    hero: { src: `${C}/chat.png`, label: "Chat System: แชทรวมทุกช่องทาง", w: 1920, h: 902 },
    body: "ศูนย์รวมแชทสำหรับเอเจนต์ ที่รวมการสนทนาจากทุกช่องทาง พร้อมข้อมูลลูกค้าและสถานะใน Pipeline เพื่อให้จัดการ Lead และติดตามการขายได้จากที่เดียว",
    screens: [
      { src: `${C}/chat.png`, label: "แชทรวมทุกช่องทาง: ข้อมูลลูกค้าอยู่ฝั่งขวา", w: 1920, h: 902 },
      { src: `${C}/chat-tags.png`, label: "แท็กลูกค้า: จัดกลุ่มตามความสนใจเพื่อติดตามต่อ", w: 1920, h: 900 },
      { src: `${C}/watchlist.png`, label: "หาทรัพย์ในตลาด: Watch List ตามเงื่อนไขที่ตั้งไว้", w: 1920, h: 901 },
      { src: `${C}/watchlist-detail.png`, label: "ผลของ Watch List: ประกาศใหม่จากหลาย portal", w: 1920, h: 901 },
      { src: `${C}/line-connect.png`, label: "ตั้งค่าการเชื่อมต่อ: LINE Official Account", w: 1920, h: 902 },
      { src: `${C}/line-dialog.png`, label: "ขั้นตอนเชื่อม LINE OA: Channel Secret + Access Token", w: 1920, h: 901 },
    ] satisfies WBShot[],
  },

  /** ── บล็อกที่ 2: Website Builder ── (รูปนำคือหน้าจอ editor · ย่อหน้าเดียวรวม what/how/result) */
  builder: {
    title: "Website Builder",
    body: "เครื่องมือที่ช่วยให้เอเจนต์มีเว็บไซต์อสังหาริมทรัพย์ของตัวเองได้ภายในไม่กี่นาที โดยไม่ต้องเขียนโค้ดหรือจ้างทำเว็บ พร้อมดึงประกาศจาก PropertyOS มาแสดงบนเว็บไซต์โดยอัตโนมัติ ลดขั้นตอนและการกรอกข้อมูลซ้ำ โดยออกแบบ Website Builder ตั้งแต่ Onboarding, Editor, Theme และ Layout ต่างๆ ให้ใช้งานง่ายและสามารถปรับแต่งเว็บไซต์ได้ด้วยตัวเอง",
  },

  /** onboarding ของ builder — สรุปจากเอกสาร screen flow */
  flow: {
    title: "Onboarding",
    goal: "ช่วยให้เอเจนต์ที่ไม่มีประสบการณ์ด้านการสร้างเว็บไซต์สามารถสร้างและเผยแพร่เว็บไซต์ที่พร้อมใช้งานได้ด้วยตนเอง โดยลดขั้นตอนและการตัดสินใจที่ไม่จำเป็นให้น้อยที่สุด",
    steps: [
      {
        title: "Name the site",
        body: "หน้าจอแรกเก็บข้อมูลเพียง ชื่อเว็บไซต์ พร้อมแสดง URL ที่จะได้รับแบบเรียลไทม์ระหว่างกรอกข้อมูล และสามารถแก้ไขภายหลังได้ ช่วยลดขั้นตอนและการตัดสินใจในช่วงเริ่มต้นของการสร้างเว็บไซต์",
      },
      {
        title: "Pick a theme",
        body: "เอเจนต์สามารถเลือกจากธีมที่เตรียมไว้ พร้อมดู Preview แบบเต็มหน้าเพื่อประเมินผลลัพธ์ก่อนเลือกใช้ โดยการเลือกธีมถือเป็นการตัดสินใจหลักของ Flow เนื่องจากส่งผลต่อทั้ง Typography, Color และ Page Layout ของเว็บไซต์",
      },
      {
        title: "System builds the site",
        body: "ระบบนำธีมที่เลือกมาประกอบกับข้อมูลจริงจากบัญชี โดยดึงประกาศจาก PropertyOS มาแสดงใน Section ที่เกี่ยวข้องโดยอัตโนมัติ เอเจนต์จึงไม่ต้องอัปโหลดรูปหรือกรอกข้อมูลประกาศซ้ำด้วยตนเอง",
      },
      {
        title: "Publish or keep editing",
        body: "จบ Flow ด้วย Publish และแชร์เว็บไซต์ได้ทันที หรือเข้าสู่ Editor เพื่อปรับแต่งสี ฟอนต์ และ Layout ต่อ โดยยังคงความสอดคล้องของเว็บไซต์",
      },
    ],
  },

  /** หน้าจอ editor ที่เอเจนต์เจอหลังจบ onboarding
   *  ที่มา: CompleteScreenFlowWebBuilder.md (1,672 บรรทัด · 8 flow) */
  screenFlow: {
    // ⚠️ title ต้องสื่อว่า "นี่คือหน้าที่เจอต่อจาก onboarding" — user ตีกลับมาแล้วรอบนึง
    title: "What agents see after onboarding",
    // ⚠️ เป็น "overview" ของหน้า editor — เล่าว่าคืออะไร ทำอะไรได้ · แสดงเป็นย่อหน้าธรรมดา ไม่ใส่กรอบเน้น
    goal:
      "หน้านี้คือ editor ที่เอเจนต์จะเจอเมื่อเลือก “แก้ต่อ” หลังจบ onboarding เป็นพื้นที่สำหรับปรับเว็บที่ระบบสร้างให้แล้วให้ตรงกับที่ต้องการมากขึ้น ทั้งเลือกหน้าที่จะแก้ เปิด–ปิดและสลับลำดับ section ของหน้านั้น ปรับ layout เนื้อหา และการตั้งค่าของแต่ละส่วน แล้วเห็นผลลัพธ์ทันทีอยู่ในหน้าเดียว โดยทุกหน้าและทุก section ใช้โครงสร้างการทำงานชุดเดียวกัน เอเจนต์จึงเรียนรู้ครั้งเดียวแล้วใช้ได้กับทั้งเว็บ",
    /** 3 พาเนลที่ทุกหน้าใน builder ใช้โครงเดียวกัน — ชื่อ Panel N โชว์เป็นแท็กเล็กๆ
     *  note = บอกสั้นๆ ว่าพาเนลนั้นเอาไว้ทำอะไร (บรรทัดเดียวพอ) */
    panels: [
      { name: "Panel 1", role: "Page & section", note: "เลือกหน้าที่จะแก้ และจัดลำดับ section ของหน้านั้น" },
      { name: "Panel 2", role: "Live preview", note: "ดูผลลัพธ์สด สลับมุมมอง Desktop / Tablet / Mobile" },
      { name: "Panel 3", role: "Editing controls", note: "ปรับ layout เนื้อหา และการตั้งค่าของ section ที่เลือก" },
    ],
    /** ที่มาของ dialog เลือก layout — ต้องมีบรรทัดนี้ก่อน ไม่งั้นมันโผล่มาเฉยๆ */
    layoutPicker:
      "ตัวอย่างของคอนโทรลใน Panel 3 เมื่อกด “Choose layout →” ของ section ไหนก็เปิด dialog หน้าตาเดียวกันนี้ เลือกได้ทีละแบบ เห็นโครงคร่าวๆ ของแต่ละตัวเลือกพร้อมบรรทัดบอกว่าเหมาะกับอะไร ตัว dialog นี้เองที่พาไปสู่ชุด layout ของแต่ละหน้าด้านล่าง",
  },

  themesSection: {
    title: "Design 3 website themes",
    intro:
      "เว็บไซต์ของเอเจนต์หนึ่งเว็บประกอบด้วยหน้าหลัก 3 แบบ ได้แก่ Home หน้าแรกที่รวมทรัพย์เด่นและช่องค้นหา · Result หน้ารวมผลการค้นหาที่ไว้กวาดสายตาหาตัวเลือก · และ Detail หน้ารายละเอียดทรัพย์ที่พาไปสู่การติดต่อเอเจนต์ ทั้ง 3 หน้านี้ถูกออกแบบไว้ 3 ธีม คือ Luxury, Minimal และ Formal โดยธีมไม่ได้ต่างกันแค่สี แต่ตั้งใจให้แต่ละธีมพูดกับลูกค้าคนละกลุ่ม เพราะเอเจนต์ที่ขายบ้านหรูกับเอเจนต์ที่ปล่อยเช่าคอนโดใกล้ BTS ต้องการเว็บที่ให้ความรู้สึกคนละแบบ โครงหน้าและลำดับข้อมูลของทั้ง 3 ธีมเหมือนกันหมด สิ่งที่เปลี่ยนคือฟอนต์ โทนสี และความรู้สึก",
    takeaway:
      "ทั้ง 3 ธีมถูกสร้างมาให้ส่งความรู้สึกคนละแบบ เอเจนต์เลือกตัวที่เข้ากับสิ่งที่ตัวเองขาย และบอกความเป็นตัวเองได้มากที่สุด",
  },

  /** แต่ละธีมไม่ได้มีหน้าตาเดียว — ทำ layout ทางเลือกไว้ section ละ 3 แบบ
   *  (นับจากไฟล์จริง layout-1-luxury / layout-2-minimal / layout-3-formal) */
  sectionVariants: {
    title: "Customize home page with variants",
    intro:
      "ธีมไม่ได้ถูกล็อกมาเป็นหน้าตาเดียว แต่ละธีมมี layout ทางเลือกไว้ section ละ 3 แบบ เอเจนต์จึงเลือกได้ว่าอยากได้ Navbar แบบไหน Hero แบบไหน โดยยังอยู่ในธีมเดิม ไม่ต้องเปลี่ยนทั้งเว็บเพราะไม่ชอบแค่ส่วนเดียว",
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
      note: "ตัวอย่างของจริงจากไฟล์ธีม Formal หน้า Home หน้าเดียวกัน ข้อมูลชุดเดียวกัน ต่างกันแค่ตัวเลือกของ Navbar / Hero / Latest listings ที่เลือกไว้คนละชุด อีก 2 ธีมมีตัวเลือกเท่ากันทุกประการ",
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
      bestFor: "เหมาะกับผู้ที่ต้องการความหรูหรา ขายบ้านเดี่ยวหรือวิลล่าราคาสูง",
      font: "Gilda Display + Barlow",
      accent: "#aa8453",
      accentName: "ทอง",
      surface: "#f8f5f0",
      home: { src: `${U}/luxury-home.jpg`, label: "Luxury · Home", w: 1440, h: 4901 },
    },
    {
      key: "minimal",
      name: "Minimal",
      mood: "สะอาด อ่านง่าย เป็นกลาง",
      bestFor: "เหมาะกับผู้ที่ต้องการความเรียบง่าย ปล่อยเช่าคอนโดหรือห้องพัก",
      font: "Inter",
      accent: "#5d8a6b",
      accentName: "เขียว",
      surface: "#f7f9f7",
      home: { src: `${U}/minimal-home.jpg`, label: "Minimal · Home", w: 1440, h: 4706 },
    },
    {
      key: "formal",
      name: "Formal",
      mood: "ทางการ มั่นคง แบบบริษัท",
      bestFor: "เหมาะกับเอเจนซีหรือบริษัทนายหน้า ที่ต้องการดูเป็นองค์กร",
      font: "Poppins",
      accent: "#E85A2A",
      accentName: "ส้ม",
      surface: "#1A2D5C",
      home: { src: `${U}/formal-home.jpg`, label: "Formal · Home", w: 1440, h: 5059 },
    },
  ] satisfies WBTheme[],

  layoutSets: [
    {
      key: "result",
      title: "Listing result",
      goal:
        "หน้ารวมผลการค้นหา โจทย์คือผู้ใช้กำลัง “กวาดสายตา” หาตัวเลือก ไม่ได้อ่านทีละอัน จึงทำไว้ 3 layout เพราะเอเจนต์แต่ละคนมีจำนวนทรัพย์ไม่เท่ากัน คนมี 8 ประกาศกับคนมี 200 ประกาศต้องการหน้าคนละแบบ",
      // ⚠️ ลำดับต้องตรงกับไฟล์ *-result-1/2/3.jpg เป๊ะ — 18 ส.ค. 2026 เจอว่าข้อ 2 กับ 3 สลับกัน
      //    (ข้อ 2 เขียนว่า "Top filter" แต่รูปที่ 2 ฟิลเตอร์ยังค้างซ้าย ส่วนรูปที่ 3 ต่างหากที่ฟิลเตอร์อยู่บน)
      //    เช็คด้วยการเปิดรูปดูจริงก่อนแก้ข้อความตรงนี้เสมอ อย่าอ่านจากชื่อ layout
      // ชื่อหลัง "·" ต้องพอดี 1 บรรทัด และ note ไม่เกิน 2 บรรทัดในการ์ด (user สั่ง 18 ส.ค. 2026)
      layouts: [
        { name: "Layout 1 · Sidebar filter", note: "ฟิลเตอร์ค้างซ้าย เหมาะกับคนที่มีทรัพย์เยอะและต้องกรองจริง" },
        // ข้อความใหม่ (AI เขียนจากสิ่งที่เห็นในรูป) — user ยังไม่ได้ยืนยันถ้อยคำ
        { name: "Layout 2 · Sidebar + grid", note: "ฟิลเตอร์ยังอยู่ซ้าย เปลี่ยนรายการเป็นการ์ด 3 คอลัมน์" },
        { name: "Layout 3 · Top filter", note: "ย้ายฟิลเตอร์ขึ้นแถบบน เห็นทรัพย์ได้เยอะที่สุดในหน้าเดียว" },
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
        "หน้ารายละเอียดทรัพย์ หน้าที่เดียวของหน้านี้คือทำให้คนที่สนใจ “ติดต่อเอเจนต์” ทุก layout เลยต้องมีการ์ดติดต่อที่หาเจอตลอดเวลา ต่างกันแค่วิธีจัดวางแกลเลอรีกับลำดับข้อมูล",
      // ⚠️ ลำดับต้องตรงกับไฟล์ *-detail-1/2/3.jpg เป๊ะ — 18 ส.ค. 2026 เจอว่าข้อ 2 กับ 3 สลับกัน
      //    (ข้อ 2 เขียนว่า "Full-width gallery" แต่รูปที่ 2 ยังเป็นแกลเลอรีซ้าย + การ์ดเอเจนต์ขวา
      //     ส่วนรูปที่ 3 ต่างหากที่ภาพกางเต็มความกว้าง) · user เห็นเองจากหน้าเว็บ
      // ชื่อหลัง "·" ต้องพอดี 1 บรรทัด และ note ไม่เกิน 2 บรรทัดในการ์ด (user สั่ง 18 ส.ค. 2026)
      layouts: [
        { name: "Layout 1 · Gallery + agent", note: "แกลเลอรีซ้าย การ์ดเอเจนต์ค้างขวา ตัวเลือกที่ปลอดภัยที่สุด" },
        // ข้อความใหม่ (AI เขียนจากสิ่งที่เห็นในรูป) — user ยังไม่ได้ยืนยันถ้อยคำ
        { name: "Layout 2 · Card sections", note: "โครงเดิม แต่แยกแต่ละส่วนออกเป็นการ์ดคนละใบ" },
        { name: "Layout 3 · Wide gallery", note: "ภาพกางเต็มความกว้าง เหมาะกับทรัพย์ที่ขายด้วยภาพ" },
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
