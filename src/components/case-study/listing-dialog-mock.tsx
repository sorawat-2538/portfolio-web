"use client";

// ListingDialogMock — interactive fake-UI (ไม่ใช่ screenshot จริง) โชว์สิ่งที่เสนอบนหน้า
// Listing Detail ของ Propertyhub:
//   sidebar ขวา "ประกาศเช่าใน แอชตัน จุฬา สีลม" เดิมโชว์ได้ไม่กี่รายการ
//   → เพิ่มปุ่ม "ดูทั้งหมด xx ประกาศในโครงการ" → เปิด dialog รวมประกาศทั้งโครงการ
//     (เช่า/ขาย) ไว้ในหน้าเดียว แทนที่ user จะต้องเด้งออกไปหน้าเช่า/ขายแยก
//
// จงใจให้ "จืด": ไม่มี badge Premium/NEW/UPDATE และไม่มีไอคอนหมุดในกรอบรูป
// เพราะจุดที่ต้องการให้เห็นคือปุ่มกับ dialog ไม่ใช่ดีเทลของการ์ดประกาศ
// Token-based (light) · เข้าชุดกับ ProjectRedesign / workflow-mocks

import * as React from "react";
import { X, SlidersHorizontal } from "lucide-react";

type Row = { title: string; specs: string; price: string };

// ประกาศในโครงการเดียวกัน (โชว์ใน sidebar หน้า detail — เห็นแค่ไม่กี่รายการ)
const SAME_PROJECT: Row[] = [
  { title: "Ready to move — รูปห้องจริง", specs: "1 นอน · 28 ตร.ม. · ชั้น 5", price: "฿10,000" },
  { title: "ราคาดี ห้องนี้ห้องเดียว พร้อมอยู่", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿9,500" },
  { title: "ห้องสวย แต่งครบ พร้อมเข้าอยู่", specs: "1 นอน · 28 ตร.ม. · ชั้น 3", price: "฿10,500" },
];

// ประกาศทั้งโครงการ (โชว์ใน dialog "ดูทั้งหมด")
const ALL_LISTINGS: Row[] = [
  { title: "คอนโดให้เช่า (MK-02) ใกล้ BTS", specs: "1 นอน · 28 ตร.ม. · ชั้น 6", price: "฿11,000" },
  { title: "ราคาดี ห้องนี้ห้องเดียว พร้อมอยู่", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿9,500" },
  { title: "ห้องสวย ชั้น 7 วิวสระว่ายน้ำ พร้อมเฟอร์", specs: "1 นอน · 28 ตร.ม. · ชั้น 7", price: "฿12,500" },
  { title: "ห้องน่าอยู่ ราคาดี ใกล้ห้าง", specs: "1 นอน · 31 ตร.ม. · ชั้น 3", price: "฿12,300" },
  { title: "ปล่อยเช่า ห้องมุม ชั้นสูง วิวพาโนรามา", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿12,700" },
  { title: "ห้องมุม วิวสวย ชั้น 9", specs: "1 นอน · 30 ตร.ม. · ชั้น 9", price: "฿13,000" },
  { title: "ให้เช่า ห้องสวย ตกแต่งครบ ใกล้ BTS", specs: "1 นอน · 28 ตร.ม. · ชั้น 4", price: "฿12,000" },
  { title: "ให้เช่า ห้องสวย วิวสระ พร้อมเฟอร์", specs: "1 นอน · 28 ตร.ม. · ชั้น 2", price: "฿10,500" },
  { title: "ราคาเบา พร้อมเข้าอยู่ ใกล้รถไฟฟ้า", specs: "1 นอน · 31 ตร.ม. · ชั้น 5", price: "฿10,700" },
];

/** กรอบรูปเปล่า — ไม่มีไอคอน ไม่มีป้าย */
function Thumb({ className = "" }: { className?: string }) {
  return <div className={`bg-hover ${className}`} />;
}

/** เส้น placeholder แทนข้อความบนหน้า detail (ให้สายตาไปโฟกัสที่ sidebar) */
function Line({ w = "100%", className = "" }: { w?: string; className?: string }) {
  return <span className={`block h-2 rounded-full bg-hover ${className}`} style={{ width: w }} />;
}

/** การ์ดใน grid ของ dialog */
function GridCard({ r }: { r: Row }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Thumb className="aspect-[4/3]" />
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

/** แถวใน sidebar ของหน้า detail */
function ListRow({ r }: { r: Row }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Thumb className="h-14 w-16 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-medium text-foreground">{r.title}</span>
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
      {/* ── หน้า Listing Detail ย่อส่วน — เนื้อหาหลักซ้าย + sidebar ขวา ── */}
      <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_14px_34px_-20px_rgba(30,50,90,0.35)]">
        {/* browser chrome — บอกว่านี่คือหน้า listing detail */}
        <div className="flex items-center gap-2 border-b border-border bg-hover px-3 py-2">
          <span className="flex shrink-0 gap-1">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
          </span>
          <span className="truncate text-[11px] text-muted-foreground">
            propertyhub.in.th/listings/…
          </span>
        </div>

        <div className="flex flex-col gap-4 p-4 min-[560px]:flex-row">
          {/* MAIN — ประกาศที่กำลังดูอยู่ (placeholder ล้วน) */}
          <div className="min-w-0 flex-1">
            <Thumb className="aspect-[16/10] rounded-lg" />
            <div className="mt-3 flex flex-col gap-2">
              <Line w="85%" />
              <Line w="60%" />
            </div>
            <div className="mt-3 text-[15px] font-bold tabular-nums text-foreground">
              ฿12,000 <span className="text-[11px] font-normal text-muted-foreground">/ เดือน</span>
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              <Line />
              <Line w="92%" />
              <Line w="70%" />
            </div>
          </div>

          {/* SIDEBAR — จุดที่แก้ */}
          <div className="w-full shrink-0 overflow-hidden rounded-lg border border-border min-[560px]:w-[236px]">
            <div className="border-b border-border px-3 py-2.5">
              <div className="text-[12.5px] font-semibold leading-snug text-foreground">
                ประกาศเช่าใน แอชตัน จุฬา สีลม
              </div>
            </div>
            <div className="divide-y divide-border px-3">
              {SAME_PROJECT.map((r) => (
                <ListRow key={r.title} r={r} />
              ))}
            </div>
            <div className="p-2.5">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2.5 text-[12.5px] font-semibold text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                ดูทั้งหมด 106 ประกาศในโครงการ
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
        ปุ่มสีน้ำเงินคือสิ่งที่เพิ่มเข้าไปใน sidebar กดดู dialog ที่เสนอได้
      </p>

      {/* DIALOG — รวมประกาศทั้งโครงการ (เช่า/ขาย) ไว้ในหน้าเดียว */}
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
                  ประกาศอื่นๆในโครงการ แอชตัน จุฬา สีลม
                </h4>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  ทั้งหมดในโครงการ <span className="font-semibold text-foreground">106 ประกาศ</span> (74 เช่า · 32 ขาย)
                </p>
              </div>
              <button
                type="button"
                aria-label="ปิด"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground outline-none transition-colors hover:bg-hover focus-visible:ring-2 focus-visible:ring-brand"
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
