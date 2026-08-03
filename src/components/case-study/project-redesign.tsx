// Before / After ของหน้า Project Detail (Propertyhub) — ใช้ปิดท้าย "How I Measured?"
// Insight จาก analytics: ปุ่ม "ยูนิตเช่า/ยูนิตขาย" บนสุดแทบไม่มีคนกด ในขณะที่
// กล่อง CTA ล่างกว่าพา user ไปต่อได้ดีกว่า → เปลี่ยนปุ่มให้กดแล้วเลื่อนไปดู
// ประกาศในโครงการทันที ผู้ใช้ไม่ต้อง scroll หาเอง. Stylized mock, token-based.
//
// component นี้เป็น "ภาพ" อย่างเดียว — หัวข้อกับคำอธิบายมาจาก step ที่เรียกใช้
// (measure.steps ใน data/projects.ts) จะได้ไม่มีหัวข้อซ้อนหัวข้อ

import { ArrowDown, MousePointerClick, MapPin } from "lucide-react";

function MiniChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-hover px-3 py-2">
      <span className="flex shrink-0 gap-1">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </span>
      <span className="truncate text-[11px] text-muted-foreground">{url}</span>
    </div>
  );
}

function Line({ w = "100%", className = "" }: { w?: string; className?: string }) {
  return <span className={`block h-2 rounded-full bg-hover ${className}`} style={{ width: w }} />;
}

function MiniListing({ price }: { price: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex aspect-[4/3] items-center justify-center bg-hover">
        <MapPin className="h-3.5 w-3.5 text-faint" strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-1 p-1.5">
        <span className="text-[9.5px] font-bold tabular-nums text-brand">{price}</span>
        <Line w="80%" className="h-1.5" />
      </div>
    </div>
  );
}

export function ProjectRedesign() {
  return (
    <div>
      {/* before / after */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* BEFORE */}
        <figure className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_10px_30px_-18px_rgba(30,50,90,0.3)]">
            <MiniChrome url="propertyhub.in.th/project" />
            <div className="p-4">
              <div className="h-16 rounded-lg bg-hover" />
              <div className="mt-3 flex flex-col gap-1.5">
                <Line w="75%" />
                <Line w="50%" />
              </div>
              {/* top unit buttons — dead zone */}
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-md border border-border px-3 py-1.5 text-[11.5px] text-muted-foreground">
                  ยูนิตเช่า (24)
                </span>
                <span className="rounded-md border border-border px-3 py-1.5 text-[11.5px] text-muted-foreground">
                  ยูนิตขาย (15)
                </span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-[10.5px] font-medium text-red-600">
                  <MousePointerClick className="h-3 w-3" strokeWidth={2.2} />
                  คลิก 0.8%
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 opacity-70">
                <span className="h-8 w-1 rounded-full bg-brand" />
                <div className="min-w-0 flex-1">
                  <Line w="60%" />
                  <Line w="40%" className="mt-1" />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex items-start gap-2 text-[13.5px] leading-relaxed text-muted-foreground">
            <span className="mt-0.5 shrink-0 rounded bg-hover px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-faint">
              Before
            </span>
            ปุ่มยูนิตอยู่บนสุด แต่ click rate ต่ำมาก — คนเลื่อนหาประกาศเองอยู่แล้ว
          </figcaption>
        </figure>

        {/* AFTER */}
        <figure className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-brand/40 bg-card shadow-[0_14px_34px_-18px_rgba(45,104,255,0.35)]">
            <MiniChrome url="propertyhub.in.th/project" />
            <div className="p-4">
              <div className="h-16 rounded-lg bg-hover" />
              <div className="mt-3 flex flex-col gap-1.5">
                <Line w="75%" />
                <Line w="50%" />
              </div>
              {/* top unit buttons — now scroll to listings */}
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-1.5 text-[11.5px] font-medium text-white">
                  ยูนิตเช่า (24)
                  <ArrowDown className="h-3 w-3" strokeWidth={2.6} />
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-brand/10 px-3 py-1.5 text-[11.5px] font-medium text-brand ring-1 ring-brand/30">
                  ยูนิตขาย (15)
                  <ArrowDown className="h-3 w-3" strokeWidth={2.6} />
                </span>
              </div>
              {/* revealed in-project listings */}
              <div className="mt-3 rounded-lg bg-hover/60 p-2">
                <div className="mb-1.5 flex items-center gap-1 text-[10.5px] font-medium text-brand">
                  <ArrowDown className="h-3 w-3" strokeWidth={2.4} />
                  ประกาศในโครงการ
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <MiniListing price="฿18K" />
                  <MiniListing price="฿35K" />
                  <MiniListing price="฿4.2M" />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex items-start gap-2 text-[13.5px] leading-relaxed text-foreground">
            <span className="mt-0.5 shrink-0 rounded bg-brand/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
              After
            </span>
            เปลี่ยนปุ่มให้ “กดแล้วเลื่อนลงไปดูประกาศในโครงการ” ทันที — ตรงกับสิ่งที่ user อยากทำจริง
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
