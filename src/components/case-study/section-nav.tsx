"use client";

// SectionNav — สารบัญลอยขอบขวาของหน้า case study (หน้ายาวมาก เลยต้องมีตัวช่วยกระโดด)
// ปกติ: ขีดสั้นๆ เรียงลงมา 1 ขีด = 1 section · ขีดของ section ที่กำลังอ่านจะยาวและเข้มกว่า
// hover: ขีดจางหาย แล้วแผงชื่อ section โผล่มาแทน · กดแล้วเลื่อนไปหัวข้อนั้น
// โชว์เฉพาะจอกว้าง (≥1100px) เพราะจอแคบไม่มีที่ว่างข้างเนื้อหา

import * as React from "react";

export type NavSection = { id: string; label: string };

export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = React.useState<string>(sections[0]?.id ?? "");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // section ที่ "กำลังอ่าน" = อันสุดท้ายที่ขอบบนเลยเส้น 30% ของจอไปแล้ว
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.3;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="หัวข้อในหน้านี้"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 min-[1100px]:block"
    >
      {/* collapsed — ขีดบอกตำแหน่ง (pr กว้างไว้หน่อยให้เมาส์เข้าง่าย) */}
      <div
        className={`flex flex-col items-end gap-2.5 py-3 pl-6 pr-3 transition-opacity duration-200 ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {sections.map((s) => (
          <span
            key={s.id}
            className={`h-[2px] rounded-full transition-all duration-200 ${
              active === s.id ? "w-7 bg-foreground" : "w-4 bg-foreground/25"
            }`}
          />
        ))}
      </div>

      {/* expanded — แผงชื่อ section (โผล่ตอน hover) */}
      <div
        className={`absolute right-0 top-1/2 w-[210px] -translate-y-1/2 rounded-xl border border-border bg-background/95 p-1.5 shadow-[0_18px_44px_-20px_rgba(30,50,90,0.35)] backdrop-blur transition-all duration-200 ${
          open ? "opacity-100" : "pointer-events-none translate-x-2 opacity-0"
        }`}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s.id)}
            className={`block w-full cursor-pointer rounded-lg px-3 py-[7px] text-left text-[13px] leading-[1.5] outline-none transition-colors focus:outline-none focus-visible:outline-none ${
              active === s.id
                ? "bg-hover font-semibold text-foreground"
                : "text-muted-foreground hover:bg-hover hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
