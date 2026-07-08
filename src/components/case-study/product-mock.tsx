// Fake product-UI hero — a hand-built, stylized echo of Propertyhub's real
// homepage (top nav → blue hero + tabbed search → category row → popular
// projects) WITHOUT using any real screenshot. Used when a project sets
// heroMock: "product". Token-based so it adapts to light/dark. Structure mimics
// the real site; content is illustrative, not real data.

import {
  Building,
  Building2,
  ChevronDown,
  Home,
  LandPlot,
  LayoutGrid,
  Lock,
  Search,
} from "lucide-react";

/** propertyhub-style chevron mark */
function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3 20.5 20 14 20 12 15.5 10 20 3.5 20Z" fill="currentColor" />
    </svg>
  );
}

const CATEGORIES = [
  { label: "บ้าน", Icon: Home },
  { label: "ทาวน์เฮ้าส์", Icon: Building },
  { label: "คอนโดมิเนียม", Icon: Building2 },
  { label: "ที่ดิน", Icon: LandPlot },
  { label: "อสังหาอื่นๆ", Icon: LayoutGrid },
];

const PROJECTS = [
  { name: "Lumpini Park Rama 9", area: "ห้วยขวาง กรุงเทพฯ", rent: 315, sale: 105 },
  { name: "Elio Del Ray", area: "พระโขนง กรุงเทพฯ", rent: 163, sale: 74 },
  { name: "Park 24", area: "คลองเตย กรุงเทพฯ", rent: 602, sale: 280 },
  { name: "THE LINE Jatujak", area: "จตุจักร กรุงเทพฯ", rent: 482, sale: 262 },
];

export function ProductMock({ url }: { url?: string }) {
  return (
    <div className="mx-auto w-full select-none overflow-hidden rounded-[14px] border border-border bg-card shadow-[0_28px_60px_-22px_rgba(30,50,90,0.28)]">
      {/* ── BROWSER CHROME ── */}
      <div className="flex items-center gap-3 border-b border-border bg-hover px-4 py-3">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        {url && (
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-3 py-1 text-[12.5px] text-muted-foreground ring-1 ring-border">
            <Lock className="h-3 w-3 shrink-0 text-faint" strokeWidth={2.2} />
            <span className="truncate">{url}</span>
          </span>
        )}
      </div>

      {/* ── TOP NAV ── */}
      <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-[clamp(14px,3.5vw,26px)] py-3">
        <div className="flex items-center gap-[clamp(14px,3vw,28px)]">
          <span className="flex items-center gap-1.5">
            <BrandMark className="h-[18px] w-[18px] text-brand" />
            <span className="text-[15px] tracking-[-0.01em] text-foreground">
              <span className="font-bold">property</span>
              <span className="font-normal text-muted-foreground">hub</span>
            </span>
          </span>
          <nav className="hidden items-center gap-[clamp(10px,1.8vw,18px)] text-[13px] text-muted-foreground min-[560px]:flex">
            {["เช่า", "ขาย", "ใกล้ฉัน", "ทรัพย์ธนาคาร", "โครงการทั้งหมด"].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
        </div>
        <span className="shrink-0 rounded-md bg-[#ff7a29] px-3.5 py-1.5 text-[12.5px] font-medium text-white">
          ลงประกาศฟรี
        </span>
      </div>

      {/* ── BLUE HERO BAND ── */}
      <div className="bg-brand px-[clamp(14px,3.5vw,28px)] pb-[clamp(30px,5vw,44px)] pt-[clamp(22px,4vw,34px)]">
        <div className="flex flex-col items-center gap-1.5 text-white">
          <span className="flex items-center gap-1.5 opacity-95">
            <BrandMark className="h-[18px] w-[18px] text-white" />
            <span className="text-[15px]">
              <span className="font-bold">property</span>
              <span className="font-normal">hub</span>
            </span>
          </span>
          <h3 className="text-center text-[clamp(15px,2.4vw,21px)] font-bold tracking-[-0.01em]">
            เว็บรวมประกาศ คอนโด บ้าน ที่ดิน
          </h3>
        </div>

        {/* search card */}
        <div className="mx-auto mt-[clamp(14px,2.5vw,20px)] max-w-[560px] rounded-xl bg-card p-2 shadow-[0_16px_36px_-16px_rgba(15,30,60,0.45)]">
          {/* เช่า / ขาย tabs */}
          <div className="flex gap-1 px-1 pb-2 pt-0.5 text-[12.5px]">
            <span className="rounded-md bg-brand/10 px-3 py-1 font-medium text-brand">เช่า</span>
            <span className="rounded-md px-3 py-1 text-faint">ขาย</span>
          </div>
          <div className="flex flex-col gap-1.5 min-[560px]:flex-row min-[560px]:items-center">
            <span className="flex items-center justify-between gap-1.5 rounded-lg bg-hover px-3 py-2 text-[12.5px] text-muted-foreground min-[560px]:w-[130px]">
              ประเภทอสังหาฯ
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-faint" strokeWidth={2} />
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2 text-[12.5px] text-faint">
              <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span className="truncate">ค้นหา ทำเล โครงการ รถไฟฟ้า จังหวัด</span>
            </span>
            <span className="shrink-0 rounded-lg bg-brand px-4 py-2 text-center text-[12.5px] font-medium text-white">
              ค้นหาข้อมูล
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="px-[clamp(14px,3.5vw,28px)] py-[clamp(16px,3.5vw,24px)]">
        {/* category row */}
        <div className="grid grid-cols-5 gap-[clamp(6px,1.2vw,12px)]">
          {CATEGORIES.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card px-1 py-[clamp(8px,1.6vw,14px)]"
            >
              <Icon className="h-[clamp(18px,2.4vw,24px)] w-[clamp(18px,2.4vw,24px)] text-brand" strokeWidth={1.6} />
              <span className="truncate text-[clamp(9px,1.1vw,12px)] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* popular projects */}
        <div className="mt-[clamp(16px,3vw,24px)]">
          <div className="text-[clamp(13px,1.8vw,17px)] font-bold tracking-[-0.01em] text-foreground">
            โครงการยอดนิยม
          </div>
          <div className="mt-3 grid grid-cols-4 gap-[clamp(6px,1.4vw,12px)]">
            {PROJECTS.map((pj) => (
              <div
                key={pj.name}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-brand/25 via-brand/10 to-transparent" />
                <div className="p-[clamp(6px,1.2vw,10px)]">
                  <div className="truncate text-[clamp(10px,1.3vw,13px)] font-bold text-foreground">
                    {pj.name}
                  </div>
                  <div className="mt-0.5 truncate text-[clamp(9px,1.1vw,11px)] text-muted-foreground">
                    {pj.area}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-1 border-t border-border pt-1.5 text-[clamp(8.5px,1vw,10.5px)] tabular-nums">
                    <span className="text-brand">เช่า {pj.rent}</span>
                    <span className="text-muted-foreground">ขาย {pj.sale}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
