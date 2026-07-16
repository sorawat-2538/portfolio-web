// Fake product-UI hero #2 (same theme as DashboardMock, different elements) —
// a minimal, skeleton-style Propertyhub "home / listings" page: search bar,
// category chips, and a grid of listing cards. Illustrative, not detailed.
// No real screenshot. Token-based (light/dark).

import { Lock, Search, Heart, MapPin, Image as ImageIcon } from "lucide-react";

// skeleton bar
function Bar({ w = "100%", className = "" }: { w?: string; className?: string }) {
  return <span className={`block h-2 rounded-full bg-hover ${className}`} style={{ width: w }} />;
}

function ListingCard({ price, accent = false }: { price: string; accent?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-hover">
        <ImageIcon className="h-6 w-6 text-faint" strokeWidth={1.5} />
        <span
          className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-medium ${
            accent ? "bg-brand text-white" : "bg-background/85 text-muted-foreground"
          }`}
        >
          {accent ? "เช่า" : "ขาย"}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-[clamp(7px,1.4vw,11px)]">
        <span className="text-[clamp(11px,1.7vw,15px)] font-bold tabular-nums tracking-[-0.01em] text-brand">
          {price}
        </span>
        <Bar w="90%" />
        <span className="flex items-center gap-1 text-faint">
          <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} />
          <Bar w="55%" />
        </span>
      </div>
    </div>
  );
}

export function DashboardMock2({ url = "propertyhub.in.th" }: { url?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[760px] select-none">
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
        <div className="px-[clamp(16px,3.5vw,32px)] py-[clamp(18px,3.5vw,30px)]">
          {/* search bar */}
          <div className="flex items-center gap-2.5">
            <span className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-hover px-3.5 py-2.5 text-faint">
              <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
              <Bar w="60%" className="bg-border" />
            </span>
            <span className="shrink-0 rounded-xl bg-brand px-[clamp(12px,2.5vw,22px)] py-2.5 text-[clamp(11px,1.5vw,13px)] font-medium text-white">
              ค้นหา
            </span>
          </div>

          {/* category chips */}
          <div className="mt-[clamp(12px,2.5vw,18px)] flex flex-wrap gap-2">
            {[true, false, false, false, false].map((active, i) => (
              <span
                key={i}
                className={`rounded-full px-4 py-1.5 ${
                  active ? "bg-brand/10 ring-1 ring-brand/30" : "bg-hover"
                }`}
              >
                <span className={`block h-2 w-[clamp(28px,5vw,52px)] rounded-full ${active ? "bg-brand/60" : "bg-border"}`} />
              </span>
            ))}
          </div>

          {/* listing grid */}
          <div className="mt-[clamp(14px,3vw,22px)] grid grid-cols-3 gap-[clamp(8px,1.8vw,16px)]">
            <ListingCard price="฿18,500" accent />
            <ListingCard price="฿4.2M" />
            <ListingCard price="฿25,000" accent />
          </div>
        </div>
      </div>

      {/* floating badges */}
      <div className="absolute -right-3 top-6 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-10px_rgba(30,50,90,0.28)] backdrop-blur-sm min-[560px]:flex dark:border-white/10 dark:bg-[#12233b]/90">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <MapPin className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-[-0.01em] text-[#0b1c30] dark:text-white">
            12,000+
          </span>
          <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">ประกาศทั่วไทย</span>
        </span>
      </div>

      <div className="absolute -left-3 bottom-8 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_12px_32px_-10px_rgba(30,50,90,0.28)] backdrop-blur-sm min-[560px]:flex dark:border-white/10 dark:bg-[#12233b]/90">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-400/15 text-rose-500">
          <Heart className="h-[18px] w-[18px]" strokeWidth={2} fill="currentColor" />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-[-0.01em] text-[#0b1c30] dark:text-white">
            บันทึกทรัพย์
          </span>
          <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">ถูกใจไว้ดูทีหลัง</span>
        </span>
      </div>
    </div>
  );
}
