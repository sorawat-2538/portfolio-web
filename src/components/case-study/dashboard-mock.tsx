// Fake product-UI hero (portpro-style dashboard) — a hand-built, stylized
// analytics dashboard themed for Propertyhub WITHOUT any real screenshot.
// Big headline metric + rising bar chart + category stat cards, with two
// floating badges overhanging the corners. Token-based (light/dark).

import { Lock, TrendingUp, Users, Activity } from "lucide-react";

// deterministic rising bars (no Math.random so SSR/CSR match)
const BARS = [34, 41, 38, 52, 47, 58, 55, 63, 68, 64, 72, 76, 71, 80, 86, 82, 90, 96];

const STATS = [
  { label: "คอนโด", value: "48,200", delta: "+12.4%" },
  { label: "บ้าน & ทาวน์เฮาส์", value: "32,600", delta: "+8.3%" },
  { label: "ที่ดิน", value: "18,900", delta: "+15.6%" },
];

export function DashboardMock({ url = "propertyhub.in.th" }: { url?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[760px] select-none">
      {/* ── the app card ── */}
      <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-[0_28px_60px_-22px_rgba(30,50,90,0.28)]">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-hover px-4 py-3">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-3 py-1 text-[12.5px] text-muted-foreground ring-1 ring-border">
            <Lock className="h-3 w-3 shrink-0 text-faint" strokeWidth={2.2} />
            <span className="truncate">{url}</span>
          </span>
        </div>

        {/* body */}
        <div className="px-[clamp(18px,4vw,40px)] py-[clamp(20px,4vw,36px)]">
          {/* headline metric */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[clamp(12px,1.6vw,15px)] text-muted-foreground">
                การเข้าชมทั้งหมด · เดือนนี้
              </div>
              <div className="mt-1.5 flex items-end tabular-nums leading-none tracking-[-0.02em] text-foreground">
                <span className="text-[clamp(30px,6vw,52px)] font-bold">2,480,750</span>
              </div>
            </div>
            <div className="text-right leading-tight">
              <div className="inline-flex items-center gap-1 text-[clamp(15px,2.4vw,21px)] font-bold text-emerald-500">
                <TrendingUp className="h-[1em] w-[1em]" strokeWidth={2.4} />
                +24.5%
              </div>
              <div className="mt-1 text-[clamp(11px,1.5vw,14px)] tabular-nums text-muted-foreground">
                +486,200 จากเดือนก่อน
              </div>
            </div>
          </div>

          {/* bar chart */}
          <div className="mt-[clamp(18px,3.5vw,32px)] flex h-[clamp(90px,16vw,150px)] items-end gap-[clamp(3px,0.9vw,9px)]">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand/45 to-brand"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* category stat cards */}
          <div className="mt-[clamp(16px,3vw,26px)] grid grid-cols-3 gap-[clamp(8px,1.6vw,16px)]">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-hover px-[clamp(10px,1.8vw,18px)] py-[clamp(10px,1.8vw,16px)]"
              >
                <div className="truncate text-[clamp(10px,1.3vw,13px)] text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-1 text-[clamp(15px,2.4vw,22px)] font-bold tabular-nums tracking-[-0.01em] text-foreground">
                  {s.value}
                </div>
                <div className="mt-1 text-[clamp(10px,1.3vw,13px)] font-medium tabular-nums text-emerald-500">
                  {s.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── floating badges (overhang the corners) ── */}
      <div className="absolute -right-3 top-6 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-10px_rgba(30,50,90,0.28)] backdrop-blur-sm min-[560px]:flex dark:border-white/10 dark:bg-[#12233b]/90">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Users className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-[-0.01em] text-[#0b1c30] dark:text-white">
            12,000+
          </span>
          <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">
            ประกาศ Active
          </span>
        </span>
      </div>

      <div className="absolute -left-3 bottom-8 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-10px_rgba(30,50,90,0.28)] backdrop-blur-sm min-[560px]:flex dark:border-white/10 dark:bg-[#12233b]/90">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
          <Activity className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-[-0.01em] text-[#0b1c30] dark:text-white">
            Real-time
          </span>
          <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">
            ข้อมูลตลาดสด
          </span>
        </span>
      </div>
    </div>
  );
}
