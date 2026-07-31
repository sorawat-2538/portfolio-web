"use client";

import * as React from "react";

/** Fades + rises its children in when scrolled into view (once).
 *  `delay` (ms) staggers siblings. Respects prefers-reduced-motion via CSS.
 *
 *  ⚠️ ออกแบบให้ "ไม่พึ่ง JS" — ค่าตั้งต้นคือมองเห็นได้ (ดู .reveal ใน globals.css)
 *  ถ้า JS ไม่ทำงาน เนื้อหายังอ่านได้ครบ แค่ไม่มี animation
 *  JS จะซ่อน (.is-armed) เฉพาะ section ที่ยังอยู่นอกจอตอนโหลดเท่านั้น
 *  ส่วนที่อยู่ในจอแล้วปล่อยให้แสดงเลย — กันภาพกระพริบตอน hydrate */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // "plain" = แสดงเลย (ค่าตั้งต้น + กรณีอยู่ในจอแล้ว) · "armed" = ซ่อนรอเลื่อนถึง · "shown" = animate เข้ามาแล้ว
  const [state, setState] = React.useState<"plain" | "armed" | "shown">("plain");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // อยู่ในจอตั้งแต่แรก → ไม่ต้องซ่อน ไม่ต้อง animate (กันกระพริบ)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setState("armed");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      // threshold 0 = ปลอดภัยกับ section ที่สูงกว่าจอมาก ๆ
      // (ถ้าใช้ค่าอื่นเช่น 0.12 section ที่สูงเกิน ~8 เท่าของจอจะไม่มีวันถึงเกณฑ์ แล้วค้างซ่อนถาวร)
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls =
    state === "plain"
      ? "reveal"
      : state === "armed"
        ? "reveal is-armed"
        : "reveal is-armed is-visible";

  return (
    <div
      ref={ref}
      className={`${cls} ${className}`}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
