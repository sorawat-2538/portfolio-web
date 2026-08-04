// PropertyosHeroMock — hero ของหน้า /work/propertyos
//
// หน้าต่าง code editor สไตล์เดียวกับ hero หน้าอื่นในเว็บ ข้างในเป็น ASCII ของหน้า
// "Dashboard" — ภาพรวมของแพลตฟอร์ม PropertyOS (เมนูซ้าย active ที่ Dashboard)
// จงใจให้เป็นคนละหน้าจอกับบล็อก Chat System / Website Builder ที่อยู่ถัดลงไป
//
// ── 3 เรื่องที่ต้องรู้ก่อนแก้ ─────────────────────────────────────────────
// 1) กรอบ ┌─┬┐ เป็นตัวอักษรจริง แต่ "ช่อง" แต่ละคอลัมน์เป็น element กว้างคงที่ (%)
//    + truncate → กรอบไม่มีทางเบี้ยวไม่ว่าข้อความจะยาวแค่ไหน
// 2) ฟอนต์ Inter + อังกฤษล้วน (ไม่ใช่ mono) ตามที่ user สั่ง — ตัวเล็กและอ่านง่ายกว่า
// 3) ⚠️ animation มีได้อย่างเดียวคือ `float-slow` (ลอยขึ้นลงช้า ๆ) ให้เหมือน hero
//    หน้า Data & AI Workflow / Contact Me — ห้ามพิมพ์ ห้ามไล่โผล่ทีละบรรทัด (user สั่ง
//    เรื่อง consistency กับหน้าอื่น) · เป็น CSS ล้วน ไม่พึ่ง JS เลย

type Tone = "dim" | "sel" | "head" | "rule" | "up" | "accent";
type Cell = { text: string; tone?: Tone };

const t = (text: string, tone?: Tone): Cell => ({ text, tone });
const RULE = t("─".repeat(60), "rule");
const BLANK = t("");

const TOP_BAR = "propertyOS        Dashboard                          FREE Plan   ST";

/** เมนูของแพลตฟอร์ม — hero เปิดค้างไว้ที่หน้า Dashboard */
const NAV: Cell[] = [
  t("OVERVIEW", "dim"),
  t("▶  Dashboard", "sel"),
  t("LISTINGS", "dim"),
  t("▤  My listings"),
  t("▤  Auto-posting"),
  t("▤  Market search"),
  t("LEADS / CRM", "dim"),
  t("▤  Chats"),
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

/** ตัวเลขภาพรวมของเดือนนี้ */
const STATS: Cell[] = [
  t("Overview", "head"),
  t("This month · All agents", "dim"),
  RULE,
  t("Active listings            128"),
  t("▲ 12 new this week", "up"),
  RULE,
  t("New leads                   46"),
  t("▲ 8 still unread", "up"),
  RULE,
  t("Viewings booked             19"),
  t("Deals closed                 4"),
  RULE,
  t("Sites published              7", "accent"),
  t("Built with Website Builder", "dim"),
  RULE,
  t("Pipeline", "head"),
  t("New 12 · Following 8 · Won 4", "dim"),
  // ⚠️ █ / ░ ไม่มีใน Inter → ตกไปใช้ฟอนต์ระบบซึ่งกว้างเกือบ 1em ต่อตัว
  //    ใส่ยาวกว่านี้แล้วคอลัมน์จะโดน truncate
  t("██████░░░░  62%", "up"),
];

/** ฟีดเหตุการณ์ล่าสุด — บอกว่าแพลตฟอร์มทำงานอะไรให้เอเจนต์บ้าง */
const FEED: Cell[] = [
  t("Today", "head"),
  RULE,
  t("09:15  Somchai J. ▸ new message"),
  t("09:02  Auto-post ▸ 6 listings live", "up"),
  t("08:40  Wipa S. ▸ booked a viewing"),
  t("08:12  Watch list ▸ 3 new matches", "up"),
  t("07:55  Prasert M. ▸ asked about terms"),
  BLANK,
  t("Channels", "head"),
  RULE,
  t("▤ LINE OA          connected", "dim"),
  t("▤ Facebook page    connected", "dim"),
  t("▤ Website form     connected", "dim"),
  BLANK,
  t("Team", "head"),
  RULE,
  t("▤ Agents online          5 / 9", "dim"),
  t("▤ Unassigned leads           3", "dim"),
];

const ROWS = Math.max(NAV.length, STATS.length, FEED.length);

// ความกว้างคอลัมน์ — ต้องใช้ค่าเดียวกันทั้งแถวเนื้อหาและแถวเส้นคั่น
const W_NAV = "w-[25%]";
const W_STATS = "w-[33%]";

const TONE: Record<Tone, string> = {
  dim: "text-slate-500",
  sel: "rounded-[3px] bg-sky-400/10 text-sky-300",
  head: "font-semibold text-slate-100",
  rule: "text-slate-700",
  up: "text-emerald-300",
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

/** 1 บรรทัดของไฟล์ */
function Line({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center">{children}</div>;
}

export function PropertyosHeroMock() {
  return (
    <div className="float-slow select-none overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1a2b] shadow-[0_28px_60px_-20px_rgba(8,15,30,0.6)]">
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
            <span className="truncate">PropertyOS Dashboard - ASCII Design.txt</span>
          </span>
        </div>
      </div>

      {/* ── เนื้อไฟล์ ── */}
      <div className="px-[clamp(10px,1.8vw,18px)] pb-[clamp(12px,2vw,18px)] pt-3">
        <div className="mb-2 truncate font-mono text-[10.5px] text-slate-600">
          propertyos <span className="text-slate-700">›</span> ASCII Design.txt{" "}
          <span className="text-slate-700">›</span> Dashboard overview
        </div>

        <div className="overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar]:h-1.5">
          <div className="min-w-[520px] text-[clamp(8.5px,1vw,10.5px)] leading-[1.75] tracking-[0.005em]">
            {/* กรอบบน */}
            <Line>
              <span className={B}>┌</span>
              <Fill width="flex-1" />
              <span className={B}>┐</span>
            </Line>

            {/* แถบบนสุดของแอป */}
            <Line>
              <span className={B}>│</span>
              <span className="min-w-0 flex-1 truncate px-1.5 font-semibold text-slate-100">
                {TOP_BAR}
              </span>
              <span className={B}>│</span>
            </Line>

            {/* เส้นคั่น + จุดแตกคอลัมน์ */}
            <Line>
              <span className={B}>├</span>
              <Fill width={W_NAV} />
              <span className={B}>┬</span>
              <Fill width={W_STATS} />
              <span className={B}>┬</span>
              <Fill width="flex-1" />
              <span className={B}>┤</span>
            </Line>

            {/* เนื้อหา 3 คอลัมน์ */}
            {Array.from({ length: ROWS }, (_, i) => (
              <Line key={i}>
                <span className={B}>│</span>
                <Col cell={NAV[i]} width={W_NAV} />
                <span className={B}>│</span>
                <Col cell={STATS[i]} width={W_STATS} />
                <span className={B}>│</span>
                <Col cell={FEED[i]} width="min-w-0 flex-1" />
                <span className={B}>│</span>
              </Line>
            ))}

            {/* กรอบล่าง */}
            <Line>
              <span className={B}>└</span>
              <Fill width={W_NAV} />
              <span className={B}>┴</span>
              <Fill width={W_STATS} />
              <span className={B}>┴</span>
              <Fill width="flex-1" />
              <span className={B}>┘</span>
            </Line>
          </div>
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[clamp(10.5px,1.2vw,12px)] text-slate-400">
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate">plain text · dashboard overview</span>
        </span>
        <span className="truncate">
          <span className="text-amber-300">PropertyOS</span> · Real Estate Management Platform
        </span>
      </div>
    </div>
  );
}
