"use client";

// AsciiScreenMock — artifact แบบ ASCII ที่ขอจาก Claude หลังเคาะไอเดียกันแล้ว
// ใช้ในขั้นที่ 3 ของ section "Set Workflow by Claude"
//
// เป็น layout ของหน้า "แชท" (Unified Communication Hub) ใน PropertyOS ที่เขียนด้วย
// ตัวอักษรล้วน — อ่านแล้วเห็นเป็น mini screen ได้ทันที
//
// ── 3 เรื่องที่ต้องรู้ก่อนแก้ ─────────────────────────────────────────────
//
// 1) กรอบ ┌─┬┐ │ ├─┼┤ เป็นตัวอักษรจริง แต่ "ช่อง" แต่ละคอลัมน์เป็น element ที่
//    กว้างคงที่ (%) แล้วตัดข้อความด้วย truncate — เลยใส่ภาษาไทยได้โดยกรอบไม่เบี้ยว
//    (ถ้าใช้ text ล้วนแบบนับตัวอักษร ตัวไทยความกว้างไม่เท่า mono กรอบจะเหลื่อมทันที)
//
// 2) การพิมพ์: ยืมกลไกจาก hero code editor ของ milerdev.com มาปรับ
//      · ไล่ทีละ "ช่วง" (segment) ซ้าย→ขวาในบรรทัด หน่วงสุ่ม 12–30ms
//      · จบบรรทัดพัก 45ms · พิมพ์จบแล้วหยุด (เล่นรอบเดียว ไม่วนซ้ำ)
//      · บรรทัดที่ยังไม่ถึง = จางไว้ opacity .06 + translateX(8px)
//      · บรรทัดปัจจุบันเลขสว่างขึ้น + cursor กะพริบ step-end
//    ค่าตั้งต้นคือ "เห็นครบ" — ถ้า JS ไม่ทำงานยังอ่านได้ (กติกาเดียวกับ <Reveal>)
//
// 3) แก้เนื้อหา = แก้ SIDEBAR / CHATLIST / THREAD ด้านล่าง จำนวนแถวไม่ต้องเท่ากัน

import * as React from "react";

type Tone = "dim" | "sel" | "accent" | "me" | "head" | "rule";
type Cell = { text: string; tone?: Tone };

const t = (text: string, tone?: Tone): Cell => ({ text, tone });
const RULE = t("─".repeat(60), "rule");
const BLANK = t("");

const TOP_BAR = "propertyOS        Dashboard › แชท              FREE Plan   ST";

const SIDEBAR: Cell[] = [
  t("ภาพรวม", "dim"),
  t("▤  แดชบอร์ด"),
  t("ระบบการประกาศ", "dim"),
  t("▤  ประกาศของฉัน"),
  t("▤  โพสต์ประกาศอัตโนมัติ"),
  t("▤  หาทรัพย์ในตลาด"),
  t("ลูกค้าเป้าหมาย / CRM", "dim"),
  t("▶  แชท", "sel"),
  t("▤  รายชื่อติดต่อ"),
  t("▤  ระบบงานขาย"),
  t("ทีม", "dim"),
  t("▤  ตัวแทน"),
  t("▤  ติดค้างคอมมิชชัน"),
  t("ตั้งค่า", "dim"),
  t("▤  บัญชี"),
  t("▤  ตั้งค่าแชท"),
  t("▤  ตั้งค่าการเชื่อมต่อ"),
  t("▤  การสมัครสมาชิก"),
  t("▤  การแจ้งเตือน"),
  BLANK,
  t("PropertyOS v1.0", "dim"),
];

const CHATLIST: Cell[] = [
  t("Chats", "head"),
  t("[ ค้นหาการสนทนา... ]", "dim"),
  t("ทั้งหมด · ยังไม่อ่าน (2)", "dim"),
  RULE,
  t("คุณสมชาย ใจดี      (2)", "accent"),
  t("ขอบคุณครับ รอดูราย…", "dim"),
  RULE,
  t("คุณวิภา สุขสันต์      (1)"),
  t("พรุ่งนี้สะดวกไปดูบ้าน…", "dim"),
  RULE,
  t("คุณประเสริฐ มั่งมี"),
  t("โทรสอบถามเรื่องผ่อน…", "dim"),
  RULE,
];

const THREAD: Cell[] = [
  t("คุณสมชาย ใจดี          ● กำลังติดตาม", "head"),
  RULE,
  t("วันนี้ 09:15", "dim"),
  t("แอดมิน ▸ สวัสดีครับคุณสมชาย มีคอนโดใหม่…", "me"),
  t("คุณสมชาย ▸ สนใจครับ ราคาเท่าไหร่ครับ"),
  t("แอดมิน ▸ ราคาเริ่มต้น 5.9 ล้าน 2 ห้องนอน", "me"),
  t("── ข้อความที่ยังไม่ได้อ่าน ──", "dim"),
  t("คุณสมชาย ▸ มีรูปห้องตัวอย่างไหมครับ"),
  t("คุณสมชาย ▸ ขอบคุณครับ รอดูรายละเอียด…"),
  BLANK,
  RULE,
  t("▤ ติดต่อ: LINE OA · 081-234-5678", "dim"),
  t("▤ สนใจ: คอนโด ใกล้ BTS · งบ 5-7 ล้าน", "dim"),
  t("▤ ไปป์ไลน์: กำลังติดตาม", "dim"),
  BLANK,
  t("[ พิมพ์ข้อความ... ]            [ ส่ง ▸ ]", "dim"),
];

const ROW_COUNT = Math.max(SIDEBAR.length, CHATLIST.length, THREAD.length);

// ความกว้างคอลัมน์ — ต้องใช้ค่าเดียวกันทั้งแถวเนื้อหาและแถวเส้นคั่น
const W_SIDE = "w-[28%]";
const W_LIST = "w-[30%]";

const TONE: Record<Tone, string> = {
  dim: "text-slate-500",
  sel: "rounded-[3px] bg-sky-400/10 text-sky-300",
  accent: "text-amber-200",
  me: "text-emerald-300",
  head: "font-semibold text-slate-100",
  rule: "text-slate-700",
};

const B = "shrink-0 text-slate-600"; // ตัวอักษรเส้นกรอบ
const GUIDE = "text-[#b8925a]/70"; // ไอคอนนำหน้าเมนู — ล้อสี indent guide ของ VS Code

/** ช่องข้อความหนึ่งคอลัมน์ — กว้างคงที่ ตัดข้อความที่ยาวเกิน
 *  guides = ย้อมสีอักขระไอคอน/ต้นไม้ที่นำหน้าบรรทัด แยกจากข้อความ */
function Col({
  cell,
  width,
  guides = false,
}: {
  cell?: Cell;
  width: string;
  guides?: boolean;
}) {
  const cls = `${width} shrink-0 truncate px-1.5 ${
    cell?.tone ? TONE[cell.tone] : "text-slate-300"
  }`;
  const text = cell?.text || " ";

  if (guides) {
    const m = /^([▤▶│├└▼─]+\s*)(.*)$/.exec(text);
    if (m) {
      return (
        <span className={cls}>
          <span className={GUIDE}>{m[1]}</span>
          {m[2]}
        </span>
      );
    }
  }
  return <span className={cls}>{text}</span>;
}

/** ส่วนของเส้นแนวนอน — เติม ─ จนเต็มความกว้างคอลัมน์แล้วตัดส่วนเกิน */
function Fill({ width }: { width: string }) {
  return (
    <span
      className={`${width} shrink-0 overflow-hidden whitespace-nowrap text-slate-600`}
    >
      {"─".repeat(80)}
    </span>
  );
}

// ── โครงไฟล์: บรรทัด = ลิสต์ของ segment · len ใช้คำนวณ Col ใน status bar ──
type Seg = { node: React.ReactNode; len: number };
const s = (node: React.ReactNode, len: number): Seg => ({ node, len });
const border = (ch: string) => s(<span className={B}>{ch}</span>, 1);

const LINES: Seg[][] = [
  [
    s(
      <span className="truncate text-slate-500"># PropertyOS · Chat (แชท)</span>,
      26,
    ),
  ],
  [
    s(
      <span className="truncate text-slate-500">
        # screen 03/08 — Unified Communication Hub
      </span>,
      42,
    ),
  ],
  [s(<span>&nbsp;</span>, 0)],

  // กรอบบน
  [border("┌"), s(<Fill width="flex-1" />, 64), border("┐")],

  // แถบบนสุดของแอป
  [
    border("│"),
    s(
      <span className="min-w-0 flex-1 truncate px-1.5 font-semibold text-slate-100">
        {TOP_BAR}
      </span>,
      TOP_BAR.length,
    ),
    border("│"),
  ],

  // เส้นคั่น + จุดแตกคอลัมน์
  [
    border("├"),
    s(<Fill width={W_SIDE} />, 18),
    border("┬"),
    s(<Fill width={W_LIST} />, 19),
    border("┬"),
    s(<Fill width="flex-1" />, 26),
    border("┤"),
  ],

  // เนื้อหา 3 คอลัมน์ — 1 บรรทัด = 4 ช่วง (ซ้าย → กลาง → ขวา → ปิดกรอบ)
  ...Array.from({ length: ROW_COUNT }, (_, i): Seg[] => [
    s(
      <>
        <span className={B}>│</span>
        <Col cell={SIDEBAR[i]} width={W_SIDE} guides />
      </>,
      (SIDEBAR[i]?.text.length ?? 0) + 1,
    ),
    s(
      <>
        <span className={B}>│</span>
        <Col cell={CHATLIST[i]} width={W_LIST} />
      </>,
      (CHATLIST[i]?.text.length ?? 0) + 1,
    ),
    s(
      <>
        <span className={B}>│</span>
        <Col cell={THREAD[i]} width="min-w-0 flex-1" />
      </>,
      (THREAD[i]?.text.length ?? 0) + 1,
    ),
    border("│"),
  ]),

  // กรอบล่าง
  [
    border("└"),
    s(<Fill width={W_SIDE} />, 18),
    border("┴"),
    s(<Fill width={W_LIST} />, 19),
    border("┴"),
    s(<Fill width="flex-1" />, 26),
    border("┘"),
  ],

  // บรรทัดที่กำลังจะพิมพ์ต่อ
  [
    s(
      <span className="text-slate-500"># screen 04/08 — Watch List</span>,
      27,
    ),
  ],
];

const TOTAL = LINES.length;
const LAST_COL = LINES[TOTAL - 1].reduce((n, x) => n + x.len, 0) + 1;

/** ตัวขับการพิมพ์ — เล่นรอบเดียวตอนเลื่อนถึง ไม่วนซ้ำ
 *  armed=false คือ "เห็นครบทั้งไฟล์" — ค่าตั้งต้น จึงปลอดภัยกับ SSR / เครื่องที่ JS ไม่ทำงาน */
function useTyping(ref: React.RefObject<HTMLElement | null>) {
  const [armed, setArmed] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [line, setLine] = React.useState(TOTAL);
  const [seg, setSeg] = React.useState(0);
  // พิมพ์จบแล้วยังไม่ "นิ่ง" ทันที — บรรทัดท้าย ๆ ยังสไลด์จาก translateX(8px) กลับเข้าที่
  // อีก 0.24s (ดู .ascii-line ใน globals.css) ซึ่งพื้นที่ที่ถูก transform ยังนับเป็น
  // scroll area อยู่ → ถ้าเปิด overflow-x ตอนนั้นจะเห็น scrollbar แวบนึงแล้วหาย
  const [settled, setSettled] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // อยู่ในจอตั้งแต่โหลด → ไม่เล่น กันภาพกระพริบตอน hydrate
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setArmed(true);
    setLine(0);
    setSeg(0);
    setSettled(false);

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  React.useEffect(() => {
    // พิมพ์ครบแล้วก็แค่หยุดตั้ง timer — line === TOTAL ทำให้ทุกบรรทัดเป็น "พิมพ์แล้ว" เอง
    if (!armed || !started || line >= TOTAL) return;

    const last = seg >= LINES[line].length;
    const timer = window.setTimeout(
      () => {
        if (last) {
          setLine((l) => l + 1);
          setSeg(0);
        } else {
          setSeg((c) => c + 1);
        }
      },
      last ? 45 : 12 + Math.random() * 18,
    );
    return () => window.clearTimeout(timer);
  }, [armed, started, line, seg]);

  // พิมพ์ครบแล้วรอให้บรรทัดสุดท้ายสไลด์เข้าที่จบก่อน ค่อยถือว่า "นิ่ง"
  React.useEffect(() => {
    if (!armed || line < TOTAL || settled) return;
    const id = window.setTimeout(() => setSettled(true), 320);
    return () => window.clearTimeout(id);
  }, [armed, line, settled]);

  return {
    line: armed ? line : TOTAL,
    seg,
    typing: armed && line < TOTAL,
    settled,
  };
}

export function AsciiScreenMock() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { line, seg, typing, settled } = useTyping(ref);

  const col = typing
    ? LINES[Math.min(line, TOTAL - 1)]
        .slice(0, seg)
        .reduce((n, x) => n + x.len, 0) + 1
    : LAST_COL;

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
                TXT
              </span>
              <span className="truncate">
                PropertyOS Chat Interface - ASCII Design.txt
              </span>
            </span>
          </div>
        </div>

        {/* ── ไฟล์ ── */}
        <div className="px-[clamp(10px,1.8vw,18px)] pb-[clamp(12px,2vw,18px)] pt-3">
          {/* breadcrumb — รายละเอียดเล็ก ๆ ที่ทำให้ดูเป็น editor จริง */}
          <div className="mb-2 truncate font-mono text-[10.5px] text-slate-600">
            propertyos <span className="text-slate-700">›</span> ASCII Design.txt{" "}
            <span className="text-slate-700">›</span> Plain Text
          </div>

          {/* จอแคบให้ปัดดูแนวนอนได้ — ถ้าปล่อยให้บีบ คอลัมน์จะแคบจนอ่านไม่ออก
              ปิด scroll ไว้ตลอดช่วง animation (รวมช่วงที่บรรทัดสุดท้ายยังสไลด์เข้าที่)
              แล้วค่อยเปิดตอนทุกอย่างนิ่ง — กัน scrollbar เด้งแวบเดียวตอนพิมพ์จบ
              ค่าตั้งต้นตอน SSR / เครื่องที่ JS ไม่ทำงาน = เปิด scroll ปกติ */}
          <div
            ref={ref}
            className={`pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar]:h-1.5 ${
              typing || !settled ? "overflow-x-hidden" : "overflow-x-auto"
            }`}
          >
            <div className="min-w-[520px] font-mono text-[clamp(9px,1.1vw,11.5px)] leading-[1.7]">
              {LINES.map((segs, i) => {
                const past = i < line;
                const isCurrent = typing && i === line;
                const shown = past || isCurrent;
                return (
                  <div
                    key={i}
                    className="ascii-line flex items-center"
                    style={{
                      opacity: shown ? 1 : 0.06,
                      transform: shown ? "translateX(0)" : "translateX(8px)",
                    }}
                  >
                    <span
                      className="w-7 shrink-0 select-none pr-2.5 text-right tabular-nums"
                      style={{ color: isCurrent ? "#e2e8f0" : "#475569" }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex min-w-0 flex-1 items-center">
                      {past &&
                        segs.map((x, k) => (
                          <React.Fragment key={k}>{x.node}</React.Fragment>
                        ))}
                      {isCurrent &&
                        segs
                          .slice(0, seg)
                          .map((x, k) => (
                            <React.Fragment key={k}>{x.node}</React.Fragment>
                          ))}
                      {isCurrent && (
                        <span className="ascii-caret ml-px inline-block h-[1.05em] w-[2px] shrink-0 translate-y-[1px] bg-sky-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── STATUS BAR — Ln/Col วิ่งตามที่พิมพ์จริง ── */}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[clamp(10.5px,1.2vw,12px)] text-slate-400">
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                typing ? "bg-amber-400" : "bg-emerald-500"
              }`}
            />
            <span className="truncate tabular-nums">
              Ln {Math.min(line + 1, TOTAL)}, Col {col}
            </span>
          </span>
          <span className="truncate">
            Plain Text · <span className="text-amber-300">8 screens</span> · 399 lines
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
        ร่างโครงหน้าจอด้วย ASCII ก่อนลงมือทำ wireframe
      </p>
    </div>
  );
}
