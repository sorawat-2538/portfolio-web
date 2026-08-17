// BuilderPanelsMock — โครง 3 พาเนลของ Website Builder ที่ร่างไว้เป็น ASCII
// ใช้ใน section "What I Did" ของหน้า PropertyOS
// (หน้าจอจริงที่แกะจากไฟล์เดียวกันเป็นรูปนำของบล็อก Website Builder → BuilderScreenMock)
// static ล้วน ไม่มี animation ลอยขึ้นลง — อยู่กลางหน้า ไม่ใช่ hero
//
// ที่มา: ไฟล์ CompleteScreenFlowWebBuilder.md (1,672 บรรทัด · 8 flow) ที่เขียนไว้ก่อนลงมือทำจริง
// ตัดมาเฉพาะหน้า Home Page Editor ซึ่งเป็นหน้าที่ใช้โครงพาเนลครบที่สุด
//
// เทคนิคเดียวกับ AsciiScreenMock: กรอบ ┌─┬┐ เป็นตัวอักษรจริง แต่ "ช่อง" แต่ละคอลัมน์
// เป็น element กว้างคงที่ (%) + truncate — กรอบเลยไม่มีทางเบี้ยวไม่ว่าข้อความจะยาวแค่ไหน
//
// ⚠️ ตัวนี้ใช้ฟอนต์ Inter (ไม่ใช่ mono) + เนื้อหาอังกฤษล้วน ตามที่ user สั่ง —
//    Inter ทำให้ตัวอักษรเล็กลงและอ่านง่ายกว่าในกล่องแคบๆ · static ล้วน ไม่มี animation พิมพ์

type Tone = "dim" | "sel" | "head" | "rule" | "accent";
type Cell = { text: string; tone?: Tone };

const t = (text: string, tone?: Tone): Cell => ({ text, tone });
const RULE = t("─".repeat(60), "rule");
const BLANK = t("");

const TOP_BAR = "PropertyOS Website Builder   [Save] [Preview] [Publish]   john-property.propertyos.com";

/** PANEL 1 — ไล่หน้า/ไล่ section + กลุ่ม Active / Inactive ที่ลากสลับกันได้ */
const NAV: Cell[] = [
  t("PANEL 1 · Page & section", "head"),
  t("▼ HOME PAGE"),
  t("ACTIVE (8)", "dim"),
  t("☰ Header"),
  t("☰ Hero  ← editing", "sel"),
  t("☰ Featured properties (12)"),
  t("☰ Latest listings (12)"),
  t("☰ Search bar"),
  t("☰ About"),
  t("☰ Contact"),
  t("☰ Footer"),
  t("INACTIVE (2)", "dim"),
  t("☰ Services", "dim"),
  t("☰ Testimonials", "dim"),
];

/** PANEL 2 — พรีวิวสดของหน้าเว็บที่กำลังแก้
 *  ⚠️ ห้ามใส่อักขระกรอบ "ปิดท้าย" หลังข้อความไทย — ไทยไม่ใช่ความกว้าง mono
 *     ตัวปิดจะไม่ตรงคอลัมน์กัน (กรอบซ้ายใส่ได้ เพราะอยู่ต้นบรรทัดเสมอ) */
const PREVIEW: Cell[] = [
  t("PANEL 2 · Live preview", "head"),
  t("[Desktop] [Tablet] [Mobile]  [Site style]", "dim"),
  RULE,
  t("╔══ HERO SECTION ═══════════", "accent"),
  t("║  [ Background image ]"),
  t("║  Find your dream home"),
  t("║  [ Search location… ] [ Search ]"),
  t("╚═══════════════════════════", "accent"),
  BLANK,
  t("╔══ FEATURED PROPERTIES ════", "accent"),
  t("║  [img] [img] [img] [img]"),
  t("║  5.5M   12M   8M   3.2M ฿"),
  t("║  [ View all listings → ]"),
  t("╚═══════════════════════════", "accent"),
];

/** PANEL 3 — คอนโทรลของ section ที่เลือก เรียง Layout → Content → Settings เสมอ */
const EDIT: Cell[] = [
  t("PANEL 3 · Controls", "head"),
  t("Editing: Hero section", "sel"),
  RULE,
  t("▼ LAYOUT", "dim"),
  t("[ Choose layout → ]"),
  t("Current: Centered with BG", "dim"),
  BLANK,
  t("▼ CONTENT", "dim"),
  t("Headline  [ Find your dream home ]"),
  t("Sub       [ With property experts ]"),
  t("BG image  [ Change image ]"),
  BLANK,
  t("▼ SETTINGS", "dim"),
  t("☑ Show search bar   ☑ Filters"),
];

const ROWS = Math.max(NAV.length, PREVIEW.length, EDIT.length);

// ความกว้างคอลัมน์ — ต้องใช้ค่าเดียวกันทั้งแถวเนื้อหาและแถวเส้นคั่น
const W_NAV = "w-[27%]";
const W_PREVIEW = "w-[38%]";

const TONE: Record<Tone, string> = {
  dim: "text-slate-500",
  sel: "rounded-[3px] bg-sky-400/10 text-sky-300",
  head: "font-semibold text-slate-100",
  rule: "text-slate-700",
  accent: "text-emerald-300/80",
};

const B = "shrink-0 text-slate-600"; // ตัวอักษรเส้นกรอบ

function Col({ cell, width }: { cell?: Cell; width: string }) {
  return (
    <span
      className={`${width} shrink-0 truncate px-1.5 ${
        cell?.tone ? TONE[cell.tone] : "text-slate-300"
      }`}
    >
      {cell?.text || " "}
    </span>
  );
}

/** ส่วนของเส้นแนวนอน — เติม ─ จนเต็มความกว้างคอลัมน์แล้วตัดส่วนเกิน */
function Fill({ width }: { width: string }) {
  return (
    <span className={`${width} shrink-0 overflow-hidden whitespace-nowrap text-slate-600`}>
      {"─".repeat(80)}
    </span>
  );
}

export function BuilderPanelsMock() {
  return (
    <div>
      <div className="select-none overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1a2b] shadow-[0_28px_60px_-24px_rgba(8,15,30,0.6)]">
        {/* ── CHROME ── */}
        <div className="flex items-center gap-4 border-b border-white/[0.06] bg-[#0f1f33] px-4 py-3">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </span>
          <div className="flex min-w-0 items-center gap-1 font-mono text-[13px]">
            <span className="flex min-w-0 items-center gap-2 truncate rounded-md border border-white/15 bg-white/[0.06] px-3 py-1 font-medium text-slate-100">
              <span className="shrink-0 rounded-[3px] bg-white/10 px-1 text-[10px] tracking-wide text-slate-400">
                MD
              </span>
              <span className="truncate">CompleteScreenFlowWebBuilder.md</span>
            </span>
          </div>
        </div>

        {/* ── เนื้อไฟล์ ── */}
        <div className="px-[clamp(10px,1.8vw,18px)] pb-[clamp(12px,2vw,18px)] pt-3">
          <div className="mb-2 truncate font-mono text-[10.5px] text-slate-600">
            website-builder <span className="text-slate-700">›</span> screen flow{" "}
            <span className="text-slate-700">›</span> Home page editor
          </div>

          {/* จอแคบให้ปัดดูแนวนอนได้ — ถ้าปล่อยให้บีบ คอลัมน์จะแคบจนอ่านไม่ออก */}
          <div className="overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar]:h-1.5">
            <div className="min-w-[520px] text-[clamp(8.5px,1vw,10.5px)] leading-[1.75] tracking-[0.005em]">
              {/* กรอบบน + แถบบนสุดของ builder */}
              <div className="flex items-center">
                <span className={B}>┌</span>
                <Fill width="flex-1" />
                <span className={B}>┐</span>
              </div>
              <div className="flex items-center">
                <span className={B}>│</span>
                <span className="min-w-0 flex-1 truncate px-1.5 font-semibold text-slate-100">
                  {TOP_BAR}
                </span>
                <span className={B}>│</span>
              </div>
              <div className="flex items-center">
                <span className={B}>├</span>
                <Fill width={W_NAV} />
                <span className={B}>┬</span>
                <Fill width={W_PREVIEW} />
                <span className={B}>┬</span>
                <Fill width="flex-1" />
                <span className={B}>┤</span>
              </div>

              {/* เนื้อหา 3 พาเนล */}
              {Array.from({ length: ROWS }, (_, i) => (
                <div key={i} className="flex items-center">
                  <span className={B}>│</span>
                  <Col cell={NAV[i]} width={W_NAV} />
                  <span className={B}>│</span>
                  <Col cell={PREVIEW[i]} width={W_PREVIEW} />
                  <span className={B}>│</span>
                  <Col cell={EDIT[i]} width="min-w-0 flex-1" />
                  <span className={B}>│</span>
                </div>
              ))}

              {/* กรอบล่าง */}
              <div className="flex items-center">
                <span className={B}>└</span>
                <Fill width={W_NAV} />
                <span className={B}>┴</span>
                <Fill width={W_PREVIEW} />
                <span className={B}>┴</span>
                <Fill width="flex-1" />
                <span className={B}>┘</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATUS BAR ── */}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[clamp(10.5px,1.2vw,12px)] text-slate-400">
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span className="truncate">markdown · 1,672 lines</span>
          </span>
          <span className="truncate">
            <span className="text-amber-300">8 flows</span> · Layout → Content → Settings
          </span>
        </div>
      </div>
    </div>
  );
}
