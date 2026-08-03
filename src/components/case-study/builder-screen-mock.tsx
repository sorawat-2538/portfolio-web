// BuilderScreenMock — หน้าจอ Home Page Editor ของ Website Builder แบบ "หน้าจอจริง"
// hero ของหน้า /work/propertyos
//
// ทุกอย่างในนี้แกะมาจาก CompleteScreenFlowWebBuilder.md ตรง ๆ (ส่วน 🏠 Home Page Editor):
//   · แถบบน: Save / Preview / Publish + โดเมนของเอเจนต์ + สถานะบันทึก
//   · Panel 1 — section ของหน้า Home แบ่งเป็นกลุ่ม ACTIVE (8) / INACTIVE (2: Services, Testimonials)
//     ต่อด้วยหน้าอื่นที่เป็น layout-based (Listing Detail / Property Listing / About Us / Contact)
//     และ Global Site Style ปิดท้าย
//   · Panel 2 — พรีวิวสด: Hero → Featured Properties → Latest Listings (+ ปุ่มสลับ device)
//   · Panel 3 — คอนโทรลของ section ที่เลือก เรียง LAYOUT → CONTENT → SETTINGS เสมอ
//
// เป็น fake UI (ไม่ใช่ screenshot) · token-based สีสว่าง เข้าชุดกับ ListingDialogMock
// จอแคบ: ซ่อน Panel 3 ต่ำกว่า 900px และซ่อน Panel 1 ต่ำกว่า 640px — ไม่ให้มี scroll แนวนอน

import {
  ChevronDown,
  GripVertical,
  Monitor,
  Palette,
  Search,
  Smartphone,
  Tablet,
  Upload,
} from "lucide-react";

const ACTIVE = [
  "Header",
  "Hero",
  "Featured Properties",
  "Latest Listings",
  "Search Bar",
  "About",
  "Contact",
  "Footer",
];
const INACTIVE = ["Services", "Testimonials"];
const PAGES = ["Listing Detail", "Property Listing", "About Us", "Contact"];

const FEATURED = ["5.5M ฿", "12M ฿", "8M ฿", "3.2M ฿"];
const LATEST = ["3.8M ฿", "7.2M ฿", "5.9M ฿", "10M ฿"];

/** แถวใน Panel 1 — มีที่จับสำหรับลาก (วิธีเดียวที่ใช้ซ่อน/โชว์ section) */
function SectionRow({
  name,
  state = "idle",
}: {
  name: string;
  state?: "idle" | "current" | "off";
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] ${
        state === "current"
          ? "border-brand/50 bg-brand/[0.07] font-semibold text-foreground"
          : state === "off"
            ? "border-dashed border-border bg-transparent text-muted-foreground"
            : "border-border bg-card text-foreground"
      }`}
    >
      <GripVertical className="h-3 w-3 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 truncate">{name}</span>
    </div>
  );
}

/** หัวข้อกลุ่มเล็ก ๆ ใน Panel 1 / Panel 3 */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  );
}

/** การ์ดทรัพย์ในพรีวิว — กรอบรูปเปล่า + ราคา (จุดสนใจอยู่ที่โครง ไม่ใช่ดีเทลการ์ด) */
function PropertyCard({ price }: { price: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="aspect-[4/3] bg-hover" />
      <div className="flex flex-col gap-1 p-1.5">
        <span className="block h-1.5 w-full rounded-full bg-hover" />
        <span className="text-[9.5px] font-bold tabular-nums text-brand">{price}</span>
      </div>
    </div>
  );
}

/** บล็อกหนึ่ง section ในพรีวิว — มีป้ายชื่อ section มุมบนซ้ายเหมือนตอนแก้จริง */
function PreviewSection({
  label,
  active = false,
  children,
}: {
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border bg-card p-2.5 ${
        active ? "border-brand/60 shadow-[0_0_0_3px_rgba(45,104,255,0.08)]" : "border-border"
      }`}
    >
      <div
        className={`mb-2 text-[9px] uppercase tracking-[0.12em] ${
          active ? "text-brand" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

/** ช่องกรอกใน Panel 3 */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="mt-1 block truncate rounded-md border border-border bg-card px-2 py-1.5 text-[10.5px] text-foreground">
        {value}
      </span>
    </label>
  );
}

export function BuilderScreenMock() {
  return (
    <div className="float-slow select-none overflow-hidden rounded-[14px] border border-border bg-card shadow-[0_28px_60px_-24px_rgba(30,50,90,0.32)]">
      {/* ── แถบบนของแอป ── */}
      <div className="flex items-center gap-3 border-b border-border bg-hover px-3 py-2.5">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span className="shrink-0 text-[11.5px] font-semibold text-foreground">
          PropertyOS Website Builder
        </span>
        <span className="ml-auto hidden min-w-0 items-center gap-2 min-[560px]:flex">
          <span className="truncate text-[10.5px] text-muted-foreground">
            john-property.propertyos.com
          </span>
          <span className="shrink-0 rounded-full border border-border bg-card px-2 py-0.5 text-[9.5px] text-muted-foreground">
            บันทึกแล้ว
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-md border border-border bg-card px-2 py-1 text-[10px] text-foreground">
            Preview
          </span>
          <span className="rounded-md bg-brand px-2.5 py-1 text-[10px] font-semibold text-white">
            Publish
          </span>
        </span>
      </div>

      <div className="flex">
        {/* ── PANEL 1 — หน้า + section ── */}
        <aside className="hidden w-[170px] shrink-0 flex-col gap-3 border-r border-border bg-hover/60 px-2.5 py-3 min-[640px]:flex">
          <div className="text-[11px] font-bold text-foreground">Home page</div>

          <div className="flex flex-col gap-1.5">
            <GroupLabel>Active ({ACTIVE.length})</GroupLabel>
            {ACTIVE.map((s) => (
              <SectionRow key={s} name={s} state={s === "Hero" ? "current" : "idle"} />
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <GroupLabel>Inactive ({INACTIVE.length})</GroupLabel>
            {INACTIVE.map((s) => (
              <SectionRow key={s} name={s} state="off" />
            ))}
          </div>

          <div className="border-t border-border pt-2.5">
            <GroupLabel>Other pages</GroupLabel>
            <ul className="mt-1.5 flex flex-col gap-1">
              {PAGES.map((p) => (
                <li key={p} className="truncate text-[10.5px] text-muted-foreground">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 border-t border-border pt-2.5 text-[10.5px] text-foreground">
            <Palette className="h-3 w-3 shrink-0 text-muted-foreground" />
            Global site style
          </div>
        </aside>

        {/* ── PANEL 2 — พรีวิวสด ── */}
        <div className="min-w-0 flex-1 bg-hover/30">
          <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
            <span className="flex items-center gap-1 rounded-md bg-brand/[0.08] px-1.5 py-1 text-[10px] font-medium text-brand">
              <Monitor className="h-3 w-3" /> Desktop
            </span>
            <span className="flex items-center gap-1 px-1.5 py-1 text-[10px] text-muted-foreground">
              <Tablet className="h-3 w-3" /> Tablet
            </span>
            <span className="flex items-center gap-1 px-1.5 py-1 text-[10px] text-muted-foreground">
              <Smartphone className="h-3 w-3" /> Mobile
            </span>
          </div>

          <div className="flex flex-col gap-2.5 p-3">
            {/* HERO — section ที่กำลังแก้อยู่ */}
            <PreviewSection label="Hero section" active>
              <div className="relative overflow-hidden rounded-md bg-hover px-3 py-5">
                <div className="mx-auto max-w-[260px] text-center">
                  <div className="text-[12px] font-bold text-foreground">
                    ค้นหาบ้านในฝันของคุณ
                  </div>
                  <div className="mt-1 text-[9.5px] text-muted-foreground">
                    กับผู้เชี่ยวชาญอสังหาริมทรัพย์
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5">
                    <Search className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate text-left text-[9.5px] text-muted-foreground">
                      ค้นหาตำแหน่ง, โครงการ...
                    </span>
                    <span className="shrink-0 rounded bg-brand px-1.5 py-0.5 text-[9px] text-white">
                      ค้นหา
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {["ซื้อ", "เช่า", "คอนโด", "บ้าน"].map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-border bg-card px-1.5 py-0.5 text-[9px] text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </PreviewSection>

            {/* FEATURED */}
            <PreviewSection label="Featured properties">
              <div className="text-[10.5px] font-semibold text-foreground">แนะนำประกาศพิเศษ</div>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {FEATURED.map((p) => (
                  <PropertyCard key={p} price={p} />
                ))}
              </div>
            </PreviewSection>

            {/* LATEST — ตัดครึ่งไว้ให้รู้ว่ายังมีต่อ */}
            <PreviewSection label="Latest listings">
              <div className="text-[10.5px] font-semibold text-foreground">ประกาศล่าสุด</div>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {LATEST.map((p) => (
                  <PropertyCard key={p} price={p} />
                ))}
              </div>
            </PreviewSection>
          </div>
        </div>

        {/* ── PANEL 3 — คอนโทรลของ section ที่เลือก ── */}
        <aside className="hidden w-[210px] shrink-0 flex-col gap-3 border-l border-border bg-hover/60 px-3 py-3 min-[900px]:flex">
          <div>
            <GroupLabel>Editing</GroupLabel>
            <div className="mt-1 text-[11.5px] font-bold text-foreground">Hero section</div>
          </div>

          <div className="border-t border-border pt-2.5">
            <div className="flex items-center gap-1">
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
              <GroupLabel>Layout</GroupLabel>
            </div>
            <div className="mt-2 rounded-md border border-border bg-card px-2 py-1.5 text-[10.5px] text-foreground">
              Choose layout →
            </div>
            <div className="mt-1.5 text-[9.5px] text-muted-foreground">
              Current: Centered with BG
            </div>
          </div>

          <div className="border-t border-border pt-2.5">
            <div className="flex items-center gap-1">
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
              <GroupLabel>Content</GroupLabel>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <Field label="Headline" value="ค้นหาบ้านในฝันของคุณ" />
              <Field label="Subheading" value="กับผู้เชี่ยวชาญอสังหาฯ" />
              <div>
                <span className="text-[10px] text-muted-foreground">Background image</span>
                <div className="mt-1 flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5 text-[10.5px] text-foreground">
                  <Upload className="h-3 w-3 shrink-0 text-muted-foreground" />
                  Change image
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-2.5">
            <div className="flex items-center gap-1">
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
              <GroupLabel>Settings</GroupLabel>
            </div>
            <ul className="mt-2 flex flex-col gap-1.5 text-[10.5px] text-foreground">
              <li className="flex items-center gap-1.5">
                <span className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] bg-brand text-[8px] font-bold text-white">
                  ✓
                </span>
                Show search bar
              </li>
              <li className="flex items-center gap-1.5">
                <span className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] bg-brand text-[8px] font-bold text-white">
                  ✓
                </span>
                Show quick filters
              </li>
              <li className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-3 w-3 shrink-0 rounded-[3px] border border-border bg-card" />
                Auto-play video
              </li>
            </ul>
            <div className="mt-2.5 text-[10px] text-muted-foreground">Section height</div>
            <div className="mt-1 flex gap-1">
              {["Auto", "Tall", "Full"].map((h) => (
                <span
                  key={h}
                  className={`rounded-md px-1.5 py-0.5 text-[9.5px] ${
                    h === "Tall"
                      ? "bg-brand/[0.08] font-medium text-brand"
                      : "border border-border bg-card text-muted-foreground"
                  }`}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
