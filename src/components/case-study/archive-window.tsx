// Hero ของหน้า Early Work — mockup หน้าต่าง "คลังงานเก่า"
// ใช้โครง + สีชุดเดียวกับ AnalysisTerminal ของหน้า Data & AI Workflow
// (navy + mono + traffic lights · rail ซ้าย + เซลล์คำสั่ง + พาเนล output)
// ต่างกันที่เนื้อใน: rail = โฟลเดอร์หมวดงาน · output = รูปเด่น 3 ชิ้น
//
// ตัวเลขทุกตัวนับจาก earlyWork.groups ตรงๆ (จำนวนงาน/จำนวนหมวด/แอปที่ขึ้น
// App Store) ไม่ได้ hardcode — เพิ่มงานใน early-work.ts แล้วตัวเลขขยับเอง
// Static ทั้งหมด + select-none · รูปกดไม่ได้ (ดูเต็มได้ที่ gallery ด้านล่าง)

import Image from "next/image";
import { earlyWork, SLIDE_W, SLIDE_H } from "@/data/early-work";

/** "Web & Backoffice" → "web-backoffice" */
function dirName(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const FOLDERS = earlyWork.groups.map((g) => ({
  dir: dirName(g.title),
  count: g.items.length,
}));

const TOTAL = earlyWork.groups.reduce((n, g) => n + g.items.length, 0);
const SHIPPED = earlyWork.groups.reduce(
  (n, g) => n + g.items.filter((i) => i.appStore).length,
  0,
);

export function ArchiveWindow() {
  return (
    <div className="float-slow select-none overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1a2b] shadow-[0_28px_60px_-20px_rgba(8,15,30,0.6)]">
      {/* ── CHROME — traffic lights + tab ── */}
      <div className="flex items-center gap-4 border-b border-white/[0.06] bg-[#0f1f33] px-4 py-3">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <div className="flex min-w-0 items-center gap-1 font-mono text-[13px]">
          <span className="truncate rounded-md border border-white/15 bg-white/[0.06] px-3 py-1 font-medium text-slate-100">
            early-work.archive
          </span>
          <span className="hidden px-3 text-slate-500 sm:inline">portfolio-2020.pdf</span>
        </div>
      </div>

      <div className="flex">
        {/* ── LEFT RAIL — โฟลเดอร์หมวดงาน + ตัวเลขสรุป (ซ่อนบนมือถือ) ── */}
        <aside className="hidden w-[150px] shrink-0 flex-col gap-5 border-r border-white/[0.06] bg-white/[0.02] px-4 py-4 font-mono text-[11px] min-[560px]:flex">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Archive
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {FOLDERS.map((f) => (
                <li key={f.dir} className="flex items-center gap-2 text-slate-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="min-w-0 flex-1 truncate">{f.dir}</span>
                  <span className="shrink-0 text-slate-600">{f.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Projects
            </div>
            <div className="mt-1.5 text-[17px] font-semibold leading-none text-slate-100">
              {TOTAL}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Span
            </div>
            <div className="mt-1.5 leading-snug text-slate-300">{earlyWork.years}</div>
            <div className="mt-0.5 text-slate-500">{earlyWork.tools.length} tools</div>
          </div>
        </aside>

        {/* ── MAIN — เซลล์คำสั่ง + output ── */}
        <div className="min-w-0 flex-1 px-[clamp(14px,2.4vw,20px)] py-[clamp(14px,2.4vw,18px)]">
          {/* คำสั่งสั้น 2 บรรทัด (โครงเดียวกับหน้า Data & AI Workflow) */}
          <div className="font-mono text-[clamp(11.5px,1.3vw,12.5px)] leading-[1.9]">
            <div className="flex gap-3">
              <span className="w-3 shrink-0 text-right text-slate-600">1</span>
              <span className="min-w-0 truncate">
                <span className="text-slate-300">archive</span>
                <span className="text-slate-500"> = </span>
                <span className="text-sky-300">load</span>
                <span className="text-slate-500">(</span>
                <span className="text-amber-300">&quot;portfolio-2020.pdf&quot;</span>
                <span className="text-slate-500">)</span>
              </span>
            </div>
            <div className="flex gap-3">
              <span className="w-3 shrink-0 text-right text-slate-600">2</span>
              <span className="min-w-0 truncate">
                <span className="text-slate-300">archive</span>
                <span className="text-slate-500">.</span>
                <span className="text-slate-200">filter</span>
                <span className="text-slate-500">(</span>
                <span className="text-amber-300">&quot;featured&quot;</span>
                <span className="text-slate-500">).</span>
                <span className="text-slate-200">preview</span>
                <span className="text-slate-500">()</span>
              </span>
            </div>
          </div>

          {/* ── OUTPUT — รูปเด่น 3 ชิ้น ── */}
          <div className="mt-3.5 rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-[clamp(12px,2vw,18px)] py-[clamp(12px,2vw,16px)]">
            <div className="flex items-baseline justify-between gap-3 font-mono text-[10.5px]">
              <span className="uppercase tracking-[0.12em] text-slate-500">Out [1]</span>
              <span className="truncate text-slate-400">
                featured × {earlyWork.featured.length}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-[clamp(8px,1.4vw,14px)]">
              {earlyWork.featured.map((f) => (
                <figure key={f.src} className="min-w-0">
                  <Image
                    src={f.src}
                    alt={f.label}
                    width={SLIDE_W}
                    height={SLIDE_H}
                    sizes="(max-width: 900px) 30vw, 220px"
                    className="block h-auto w-full rounded-[6px] border border-white/10 bg-white/[0.04]"
                    priority
                  />
                  <figcaption className="mt-2 min-w-0 font-mono">
                    <div className="truncate text-[10.5px] leading-tight text-slate-300">
                      {f.label}
                    </div>
                    <div className="mt-0.5 truncate text-[9.5px] leading-tight text-slate-600">
                      {f.tag}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATUS BAR — บทสรุปของคลัง ── */}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[clamp(10.5px,1.2vw,12px)] text-slate-400">
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate">
            archive · {TOTAL} projects · {FOLDERS.length} categories
          </span>
        </span>
        <span className="truncate">
          <span className="text-amber-300">{SHIPPED} apps</span> shipped to the App Store
        </span>
      </div>
    </div>
  );
}
