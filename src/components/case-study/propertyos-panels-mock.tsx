// PropertyosPanelsMock — หน้าต่าง code editor ของบล็อก "Chat System" ในหน้า /work/propertyos
// ข้างในเป็น ASCII ของหน้าจอ "แชท" ใน PropertyOS —
// เมนูซ้ายของแพลตฟอร์ม · รายการแชท · บทสนทนา + ข้อมูลลูกค้า
//
// ที่มา: ไฟล์ PropertyOS Chat Interface - ASCII Design.txt (8 หน้าจอ · 399 บรรทัด)
// (hero ของหน้าเป็นคนละตัว → PropertyosHeroMock ที่เปิดค้างไว้ที่หน้า Dashboard)
//
// ── 3 เรื่องที่ต้องรู้ก่อนแก้ ─────────────────────────────────────────────
// 1) กรอบ ┌─┬┐ เป็นตัวอักษรจริง แต่ "ช่อง" แต่ละคอลัมน์เป็น element กว้างคงที่ (%)
//    + truncate → กรอบไม่มีทางเบี้ยวไม่ว่าข้อความจะยาวแค่ไหน
// 2) ฟอนต์ Inter + อังกฤษล้วน (ไม่ใช่ mono) ตามที่ user สั่ง — ตัวเล็กและอ่านง่ายกว่า
// 3) ⚠️ static ล้วน — ไม่มี animation ใด ๆ ทั้งพิมพ์และลอยขึ้นลง (user สั่ง: ตัวนี้
//    อยู่กลางหน้า ให้เป็นภาพนิ่ง · ตัวที่ลอยได้มีแค่ hero บนสุดของหน้า)

type Tone = "dim" | "sel" | "head" | "rule" | "me" | "accent";
type Cell = { text: string; tone?: Tone };

const t = (text: string, tone?: Tone): Cell => ({ text, tone });
const RULE = t("─".repeat(60), "rule");
const BLANK = t("");

const TOP_BAR = "propertyOS        Dashboard › Chats                    FREE Plan   ST";

/** เมนูของแพลตฟอร์ม — แชทคือหน้าที่กำลังเปิดอยู่ */
const NAV: Cell[] = [
  t("OVERVIEW", "dim"),
  t("▤  Dashboard"),
  t("LISTINGS", "dim"),
  t("▤  My listings"),
  t("▤  Auto-posting"),
  t("▤  Market search"),
  t("LEADS / CRM", "dim"),
  t("▶  Chats", "sel"),
  t("▤  Contacts"),
  t("▤  Sales pipeline"),
  t("TEAM", "dim"),
  t("▤  Agents"),
  t("▤  Commissions"),
  t("SETTINGS", "dim"),
  t("▤  Account"),
  t("▤  Chat settings"),
  t("▤  Connections"),
  t("▤  Subscription"),
  BLANK,
  t("PropertyOS v1.0", "dim"),
];

/** รายการแชท — รวมทุกช่องทางไว้ในลิสต์เดียว */
const CHATS: Cell[] = [
  t("Chats", "head"),
  t("[ Search conversations… ]", "dim"),
  t("All · Unread (2) · Following (1)", "dim"),
  RULE,
  t("Somchai J.            (2)", "accent"),
  t("Thanks, I'll review the…", "dim"),
  RULE,
  t("Wipa S.               (1)"),
  t("Can I view the house tomorrow?", "dim"),
  RULE,
  t("Prasert M."),
  t("Called about installments", "dim"),
  RULE,
];

/** บทสนทนา + ข้อมูลลูกค้าที่ค้างอยู่ข้างแชทเสมอ */
const THREAD: Cell[] = [
  t("Somchai J.            ● Following", "head"),
  RULE,
  t("Today 09:15", "dim"),
  t("Admin ▸ Hi, we have a new condo…", "me"),
  t("Somchai ▸ Interested. How much?"),
  t("Admin ▸ Starts at 5.9M · 2 bedrooms", "me"),
  t("── unread messages ──", "dim"),
  t("Somchai ▸ Any photos of the unit?"),
  t("Somchai ▸ Thanks, I'll review the…"),
  BLANK,
  RULE,
  t("▤ Contact: LINE OA · 081-234-5678", "dim"),
  t("▤ Interest: Condo near BTS · 5-7M", "dim"),
  t("▤ Pipeline: Following up", "dim"),
  BLANK,
  t("[ Type a message… ]        [ Send ▸ ]", "dim"),
];

const ROWS = Math.max(NAV.length, CHATS.length, THREAD.length);

// ความกว้างคอลัมน์ — ต้องใช้ค่าเดียวกันทั้งแถวเนื้อหาและแถวเส้นคั่น
const W_NAV = "w-[26%]";
const W_CHATS = "w-[30%]";

const TONE: Record<Tone, string> = {
  dim: "text-slate-500",
  sel: "rounded-[3px] bg-sky-400/10 text-sky-300",
  head: "font-semibold text-slate-100",
  rule: "text-slate-700",
  me: "text-emerald-300",
  accent: "text-amber-200",
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

export function PropertyosPanelsMock() {
  return (
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
              TXT
            </span>
            <span className="truncate">PropertyOS Chat Interface - ASCII Design.txt</span>
          </span>
        </div>
      </div>

      {/* ── เนื้อไฟล์ ── */}
      <div className="px-[clamp(10px,1.8vw,18px)] pb-[clamp(12px,2vw,18px)] pt-3">
        <div className="mb-2 truncate font-mono text-[10.5px] text-slate-600">
          propertyos <span className="text-slate-700">›</span> ASCII Design.txt{" "}
          <span className="text-slate-700">›</span> Unified Communication Hub
        </div>

        {/* จอแคบให้ปัดดูแนวนอนได้ — ถ้าปล่อยให้บีบ คอลัมน์จะแคบจนอ่านไม่ออก */}
        <div className="overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar]:h-1.5">
          <div className="min-w-[520px] text-[clamp(8.5px,1vw,10.5px)] leading-[1.75] tracking-[0.005em]">
            {/* กรอบบน */}
            <div className="flex items-center">
              <span className={B}>┌</span>
              <Fill width="flex-1" />
              <span className={B}>┐</span>
            </div>

            {/* แถบบนสุดของแอป */}
            <div className="flex items-center">
              <span className={B}>│</span>
              <span className="min-w-0 flex-1 truncate px-1.5 font-semibold text-slate-100">
                {TOP_BAR}
              </span>
              <span className={B}>│</span>
            </div>

            {/* เส้นคั่น + จุดแตกคอลัมน์ */}
            <div className="flex items-center">
              <span className={B}>├</span>
              <Fill width={W_NAV} />
              <span className={B}>┬</span>
              <Fill width={W_CHATS} />
              <span className={B}>┬</span>
              <Fill width="flex-1" />
              <span className={B}>┤</span>
            </div>

            {/* เนื้อหา 3 คอลัมน์ */}
            {Array.from({ length: ROWS }, (_, i) => (
              <div key={i} className="flex items-center">
                <span className={B}>│</span>
                <Col cell={NAV[i]} width={W_NAV} />
                <span className={B}>│</span>
                <Col cell={CHATS[i]} width={W_CHATS} />
                <span className={B}>│</span>
                <Col cell={THREAD[i]} width="min-w-0 flex-1" />
                <span className={B}>│</span>
              </div>
            ))}

            {/* กรอบล่าง */}
            <div className="flex items-center">
              <span className={B}>└</span>
              <Fill width={W_NAV} />
              <span className={B}>┴</span>
              <Fill width={W_CHATS} />
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
          <span className="truncate">plain text · 399 lines</span>
        </span>
        <span className="truncate">
          <span className="text-amber-300">8 screens</span> · Unified Communication Hub
        </span>
      </div>
    </div>
  );
}
