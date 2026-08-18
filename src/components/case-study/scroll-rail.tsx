"use client";

// ScrollRail — ครอบ rail ที่เลื่อนแนวนอน (จอมือถือ / จอเว็บ) ให้ "กดค้างแล้วลาก" ได้ด้วยเมาส์
// บน MacBook ใช้ touchpad ปัดซ้ายขวาได้อยู่แล้ว แต่บน PC ที่มีแต่เมาส์จะเลื่อนไม่ได้เลย
// → drag to scroll แบบ free scroll (ไม่มี snap ไม่มีปุ่มลูกศร — หน้าตาเหมือนเดิมทุกอย่าง)
// ลากเกิน 6px = ถือว่าเป็นการลาก ไม่ใช่คลิก → กลืน click ทิ้ง กันเผลอเปิด lightbox ตอนปล่อยเมาส์
// touch / pen ไม่แตะ ปล่อยให้ browser จัดการ scroll เองตามปกติ

import { useRef, useState } from "react";

/** ระยะที่ถือว่า "ลาก" ไม่ใช่ "คลิก" */
const DRAG_THRESHOLD = 6;

export function ScrollRail({
  className,
  children,
}: {
  /** class ของตัว scroller (flex / gap / padding ฯลฯ) */
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // จุดตั้งต้นของการลาก + ระยะรวมที่ลากไป (ใช้ตัดสินว่าเป็น click หรือ drag)
  const drag = useRef({ startX: 0, startScroll: 0, moved: 0, active: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    // ไม่มีอะไรให้เลื่อน (เช่น rail ที่กลายเป็นกริดตั้งแต่ 560px ขึ้นไป) = ปล่อยให้คลิก/ลากตามปกติ
    if (el.scrollWidth <= el.clientWidth + 1) return;
    drag.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
      active: true,
    };
    setDragging(true);
    // กันไม่ให้ browser ลากรูป / เลือกข้อความระหว่างลาก
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  // ลากแล้วปล่อยบนปุ่ม/รูป → กลืน click ทิ้ง (capture phase มาก่อน onClick ของลูก)
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  return (
    <div
      ref={ref}
      className={className + (dragging ? " cursor-grabbing select-none" : "")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
