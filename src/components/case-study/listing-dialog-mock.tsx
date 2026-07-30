"use client";

// ListingDialogMock — interactive fake-UI (ไม่ใช่ screenshot จริง) โชว์ idea ที่ได้จาก Workflow 1:
// บนหน้า listing_detail เพิ่มปุ่ม "ดูทั้งหมด xx ประกาศ" → เปิด dialog รวมประกาศทั้งโครงการ
// (เช่า/ขาย) ไว้ในหน้าเดียว แทนที่ user จะต้องเด้งไปหน้าเช่า/ขายแยก
// Token-based (light) · เข้าชุดกับ ProjectRedesign / workflow-mocks

import * as React from "react";
import { X, MapPin, SlidersHorizontal } from "lucide-react";

type Row = {
  title: string;
  specs: string;
  price: string;
  tag?: "Premium" | "Exclusive";
  badge?: "NEW!" | "UPDATE!";
};

// ประกาศในโครงการเดียวกัน (โชว์ในการ์ดหน้า detail — เห็นแค่ไม่กี่รายการ)
const SAME_PROJECT: Row[] = [
  { title: "Ready to move — รูปห้องจริง", specs: "1 นอน · 28 ตร.ม. · ชั้น 5", price: "฿10,000", badge: "UPDATE!" },
  { title: "ราคาดี ห้องนี้ห้องเดียว พร้อมอยู่", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿9,500", badge: "NEW!" },
  { title: "ห้องสวย แต่งครบ พร้อมเข้าอยู่", specs: "1 นอน · 28 ตร.ม. · ชั้น 3", price: "฿10,500" },
];

// ประกาศทั้งโครงการ (โชว์ใน dialog "ดูทั้งหมด")
const ALL_LISTINGS: Row[] = [
  { title: "คอนโดให้เช่า (MK-02) BTS อ่อนนุช", specs: "1 นอน · 28 ตร.ม. · ชั้น 6", price: "฿11,000", tag: "Premium" },
  { title: "ราคาดี ห้องนี้ห้องเดียว พร้อมอยู่", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿9,500", tag: "Premium" },
  { title: "ห้องสวย ชั้น 7 วิวสระว่ายน้ำ พร้อมเฟอร์", specs: "1 นอน · 28 ตร.ม. · ชั้น 7", price: "฿12,500", tag: "Premium" },
  { title: "ห้องน่าอยู่ ราคาดี ใกล้ห้างโลตัส", specs: "1 นอน · 31 ตร.ม. · ชั้น 3", price: "฿12,300", tag: "Exclusive" },
  { title: "ปล่อยเช่า ห้องมุม ชั้นสูง วิวพาโนรามา", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿12,700", tag: "Exclusive" },
  { title: "ห้องมุม วิวสวย ชั้น 9", specs: "1 นอน · 30 ตร.ม. · ชั้น 9", price: "฿13,000", tag: "Premium" },
  { title: "ให้เช่า ห้องสวย ตกแต่งครบ ใกล้ BTS", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿12,000", tag: "Premium" },
  { title: "ให้เช่า ห้องสวย วิวสระ พร้อมเฟอร์", specs: "1 นอน · 28 ตร.ม. · ชั้น 2", price: "฿10,500" },
  { title: "ราคาเบา พร้อมเข้าอยู่ ใกล้ BTS อ่อนนุช", specs: "1 นอน · 31 ตร.ม. · ชั้น 5", price: "฿10,700" },
];

function Thumb({ tag }: { tag?: Row["tag"] }) {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center bg-hover">
      <MapPin className="h-4 w-4 text-faint" strokeWidth={2} />
      {tag && (
        <span
          className={`absolute left-0 top-0 rounded-br-md px-1.5 py-0.5 text-[9px] font-semibold text-white ${
            tag === "Exclusive" ? "bg-orange-500" : "bg-amber-500"
          }`}
        >
          {tag}
        </span>
      )}
    </div>
  );
}

/** การ์ดใน grid ของ dialog */
function GridCard({ r }: { r: Row }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Thumb tag={r.tag} />
      <div className="flex flex-col gap-1 p-2.5">
        <span className="line-clamp-2 min-h-[2.4em] text-[11.5px] font-medium leading-snug text-foreground">
          {r.title}
        </span>
        <span className="text-[10.5px] text-muted-foreground">{r.specs}</span>
        <span className="text-[13px] font-bold tabular-nums text-brand">
          {r.price} <span className="text-[10px] font-normal text-muted-foreground">/ เดือน</span>
        </span>
      </div>
    </div>
  );
}

/** แถวใน list ของการ์ดหน้า detail */
function ListRow({ r }: { r: Row }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="h-14 w-16 shrink-0 overflow-hidden rounded-md">
        <Thumb />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[12.5px] font-medium text-foreground">{r.title}</span>
          {r.badge && (
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold text-white ${
                r.badge === "NEW!" ? "bg-red-500" : "bg-amber-500"
              }`}
            >
              {r.badge}
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">{r.specs}</div>
        <div className="mt-0.5 text-[13px] font-bold tabular-nums text-brand">
          {r.price} <span className="text-[10px] font-normal text-muted-foreground">/ เดือน</span>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-[12px] font-medium ${
        active ? "border-brand bg-brand/10 text-brand" : "border-border bg-card text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

export function ListingDialogMock() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div>
      {/* การ์ด "ประกาศในโครงการเดียวกัน" บนหน้า listing detail */}
      <div className="mx-auto max-w-[420px] overflow-hidden rounded-xl border border-border bg-card shadow-[0_14px_34px_-20px_rgba(30,50,90,0.35)]">
        <div className="border-b border-border px-4 py-3">
          <div className="text-[13.5px] font-semibold text-foreground">ประกาศเช่าในโครงการเดียวกัน</div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Ashton Chula – Silom</div>
        </div>
        <div className="divide-y divide-border px-4">
          {SAME_PROJECT.map((r) => (
            <ListRow key={r.title} r={r} />
          ))}
        </div>
        <div className="p-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-[13.5px] font-semibold text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            ดูทั้งหมด 106 ประกาศในโครงการ
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
        กดปุ่มเพื่อดู dialog ที่เสนอ — รวมประกาศทั้งโครงการไว้ในหน้าเดียว
      </p>

      {/* DIALOG — รวมประกาศทั้งโครงการ (เช่า/ขาย) */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <h4 className="truncate text-[16px] font-bold text-foreground">
                  ประกาศอื่นๆในโครงการ Ashton Chula – Silom
                </h4>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  ทั้งหมดในโครงการ <span className="font-semibold text-foreground">106 ประกาศ</span> (74 เช่า · 32 ขาย)
                </p>
              </div>
              <button
                type="button"
                aria-label="ปิด"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground outline-none transition-colors hover:bg-hover focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* filter bar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-3">
              <Chip active>เช่า</Chip>
              <Chip>ขาย</Chip>
              <Chip>1 ห้องนอน</Chip>
              <Chip>ทุกช่วงราคา</Chip>
              <Chip>
                <SlidersHorizontal className="h-3.5 w-3.5" /> ค้นหาแบบละเอียด
              </Chip>
              <span className="ml-auto hidden text-[12px] text-muted-foreground sm:inline">
                พบข้อมูล <span className="font-semibold text-foreground">64 ประกาศ</span>
              </span>
            </div>

            {/* grid */}
            <div className="grid grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-3">
              {ALL_LISTINGS.map((r, i) => (
                <GridCard key={i} r={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
