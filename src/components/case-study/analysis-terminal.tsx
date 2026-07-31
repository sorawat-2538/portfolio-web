// Hero ของหน้า Data & AI Workflow — mockup หน้าต่าง "เครื่องมือวิเคราะห์"
// (สีเดียวกับ code editor ที่ Contact Me: navy + mono + traffic lights)
// แต่เนื้อในไม่ใช่ข้อความยาว ๆ — เป็นโครงแบบ IDE จริง: rail แหล่งข้อมูลด้านซ้าย
// + เซลล์คำสั่งสั้น ๆ + พาเนล output ที่เป็น "ชาร์ตจริง" ให้เห็นผลวิเคราะห์ทันที
//
// ตัวเลขทุกตัวเป็นของจริงจาก Zimple Analytics ของ Propertyhub (ชุดเดียวกับที่
// โชว์เป็นหลักฐานใน Workflow 1 ด้านล่างของหน้า) — ไม่ใช่ตัวเลขสมมติ
// Static ทั้งหมด + select-none · ไม่ใช่เครื่องมือจริง

const SOURCES = ["ga4", "clarity", "zimple"];

// contact rate แยกตาม engagement depth — แกน y สูงสุด 25% (มีแค่ 2 จุดที่วัดได้จริง)
const Y_MAX = 25;
const BARS = [
  { label: "1 view", value: 1.31, note: "75% ของ session", accent: false },
  { label: "4+ views", value: 21.25, note: "", accent: true },
];

export function AnalysisTerminal() {
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
            listing-detail.analysis
          </span>
          <span className="hidden px-3 text-slate-500 sm:inline">mcp.json</span>
        </div>
      </div>

      <div className="flex">
        {/* ── LEFT RAIL — แหล่งข้อมูลที่ต่อไว้ + ตัวเลขสรุป (ซ่อนบนมือถือ) ── */}
        <aside className="hidden w-[132px] shrink-0 flex-col gap-5 border-r border-white/[0.06] bg-white/[0.02] px-4 py-4 font-mono text-[11.5px] min-[560px]:flex">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Sources
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {SOURCES.map((s) => (
                <li key={s} className="flex items-center gap-2 text-slate-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Sessions
            </div>
            <div className="mt-1.5 text-[17px] font-semibold leading-none text-slate-100">
              4.2M
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Top page
            </div>
            <div className="mt-1.5 leading-snug text-slate-300">listing_detail</div>
            <div className="mt-0.5 text-slate-500">3.4M sessions</div>
          </div>
        </aside>

        {/* ── MAIN — เซลล์คำสั่ง + output ── */}
        <div className="min-w-0 flex-1 px-[clamp(14px,2.4vw,20px)] py-[clamp(14px,2.4vw,18px)]">
          {/* คำสั่งสั้น 2 บรรทัด (ไม่ใช่ข้อความยาว) */}
          <div className="font-mono text-[clamp(11.5px,1.3vw,12.5px)] leading-[1.9]">
            <div className="flex gap-3">
              <span className="w-3 shrink-0 text-right text-slate-600">1</span>
              <span className="min-w-0 truncate">
                <span className="text-slate-300">q</span>
                <span className="text-slate-500"> = </span>
                <span className="text-sky-300">mcp</span>
                <span className="text-slate-500">.</span>
                <span className="text-slate-200">ga4</span>
                <span className="text-slate-500">(</span>
                <span className="text-amber-300">&quot;listing_detail&quot;</span>
                <span className="text-slate-500">)</span>
              </span>
            </div>
            <div className="flex gap-3">
              <span className="w-3 shrink-0 text-right text-slate-600">2</span>
              <span className="min-w-0 truncate">
                <span className="text-slate-300">q</span>
                <span className="text-slate-500">.</span>
                <span className="text-slate-200">groupby</span>
                <span className="text-slate-500">(</span>
                <span className="text-amber-300">&quot;depth&quot;</span>
                <span className="text-slate-500">).</span>
                <span className="text-slate-200">contact_rate</span>
                <span className="text-slate-500">()</span>
              </span>
            </div>
          </div>

          {/* ── OUTPUT — ชาร์ตจริง ── */}
          <div className="mt-3.5 rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-[clamp(12px,2vw,18px)] py-[clamp(12px,2vw,16px)]">
            <div className="flex items-baseline justify-between gap-3 font-mono text-[10.5px]">
              <span className="uppercase tracking-[0.12em] text-slate-500">Out [1]</span>
              <span className="truncate text-slate-400">contact_rate × depth</span>
            </div>

            {/* plot — gridline จาง ๆ + แท่งวางบนเส้นฐาน */}
            <div className="relative mt-3 h-[clamp(104px,15vw,138px)]">
              {[25, 12.5, 0].map((tick) => (
                <div
                  key={tick}
                  className="absolute inset-x-0 flex items-center gap-2"
                  style={{ bottom: `${(tick / Y_MAX) * 100}%` }}
                >
                  <span className="w-[26px] shrink-0 translate-y-[-1px] text-right font-mono text-[9.5px] text-slate-600">
                    {tick}%
                  </span>
                  <span className="h-px flex-1 bg-white/[0.07]" />
                </div>
              ))}

              {/* แท่ง — วางทับ grid โดยเว้นที่ป้ายแกน y ทางซ้าย */}
              <div className="absolute inset-y-0 left-[34px] right-0 flex items-end justify-around gap-2">
                {BARS.map((b) => (
                  <div key={b.label} className="flex w-full max-w-[92px] flex-col items-center">
                    <span
                      className={`mb-1.5 font-mono text-[clamp(11px,1.4vw,13px)] font-semibold leading-none ${
                        b.accent ? "text-amber-200" : "text-slate-400"
                      }`}
                    >
                      {b.value}%
                    </span>
                    <span
                      className="w-full rounded-t-[4px]"
                      style={{
                        height: `${Math.max((b.value / Y_MAX) * 100, 2.5)}%`,
                        background: b.accent ? "#fcd34d" : "#94a3b8",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ป้ายแกน x */}
            <div className="ml-[34px] flex items-start justify-around gap-2 border-t border-white/[0.07] pt-2">
              {BARS.map((b) => (
                <div key={b.label} className="w-full max-w-[92px] text-center">
                  <div className="font-mono text-[10.5px] text-slate-300">{b.label}</div>
                  {b.note && (
                    <div className="mt-0.5 font-mono text-[9.5px] leading-tight text-slate-600">
                      {b.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATUS BAR — บทสรุปที่ได้จาก output ── */}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[clamp(10.5px,1.2vw,12px)] text-slate-400">
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate">mcp · 3 connected</span>
        </span>
        <span className="truncate">
          <span className="text-amber-300">16×</span> higher when users go deeper
        </span>
      </div>
    </div>
  );
}
