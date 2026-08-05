"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Folder, Mail, X } from "lucide-react";
import { navGroups, groupKeyForSlug } from "@/data/nav";
import { profile } from "@/data/profile";
import { useSidebar } from "./sidebar-context";

function currentSlug(pathname: string): string | null {
  const m = pathname.match(/^\/work\/([^/]+)/);
  return m ? m[1] : null;
}

/** โครงเมนู (accordion) ใช้ร่วมทั้ง desktop และ drawer มือถือ */
function NavAccordion({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const slug = currentSlug(pathname);
  const activeGroup = groupKeyForSlug(slug);

  const [open, setOpen] = React.useState<Record<string, boolean>>({
    [activeGroup]: true,
  });

  // เปิดโฟลเดอร์ของงานที่กำลังดูให้อัตโนมัติเมื่อเปลี่ยนหน้า
  React.useEffect(() => {
    setOpen((s) => ({ ...s, [activeGroup]: true }));
  }, [activeGroup]);

  return (
    <nav>
      {navGroups.map((group, i) => {
        const isOpen = !!open[group.key];
        return (
          <div key={group.key} className="border-b-2 border-foreground">
            <button
              type="button"
              onClick={() =>
                setOpen((s) => ({ ...s, [group.key]: !s[group.key] }))
              }
              // โฟลเดอร์แรกตัด padding-top ทิ้ง — ไม่งั้นซ้อนกับ padding 20px ของ content แล้วห่างเกิน
              className={
                "flex w-full items-center justify-between gap-2.5 px-0.5 pb-4 text-left text-foreground " +
                (i === 0 ? "pt-0" : "pt-4")
              }
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap text-2xl font-semibold tracking-[-0.015em]">
                <Folder className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.8} />
                {group.title}
              </span>
              <ChevronDown
                className={
                  "h-5 w-5 shrink-0 text-foreground transition-transform duration-200 " +
                  (isOpen ? "rotate-180" : "")
                }
              />
            </button>
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-200"
              style={{
                maxHeight: isOpen ? group.items.length * 46 + 24 : 0,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="flex flex-col gap-0.5 pb-4 pl-4 pr-0">
                {group.items.map((item) => {
                  const active = slug === item.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/work/${item.slug}`}
                      onClick={onNavigate}
                      className={
                        "-mx-1 block truncate rounded-none px-3 py-2 text-[16px] tracking-[-0.01em] transition-colors " +
                        (active
                          ? "bg-primary font-semibold text-primary-foreground"
                          : "text-foreground hover:underline hover:underline-offset-4 hover:decoration-foreground")
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export function SiteSidebar() {
  const { open, setOpen } = useSidebar();

  // ปิด drawer ด้วยปุ่ม Esc
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* ── Desktop: sticky column with full-height right divider (≥900px) ── */}
      <aside className="hidden shrink-0 min-[900px]:block min-[900px]:w-[278px] min-[900px]:border-r min-[900px]:border-border min-[900px]:pr-[30px]">
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-[34px]">
          <NavAccordion />
        </div>
      </aside>

      {/* ── Mobile: overlay + drawer (<900px) ── */}
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 min-[900px]:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={
          // ไม่มี padding ที่ตัว aside — แบ่งเป็น 2 ส่วน (header / content) ที่คุม padding เอง
          // เส้นคั่นใต้ header จึงลากได้เต็มความกว้าง drawer (ไม่ถูก padding ตัดหัวท้าย)
          "fixed left-0 top-0 z-[80] flex h-screen w-[min(86vw,340px)] flex-col overflow-y-auto border-r border-border bg-background transition-transform duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)] min-[900px]:hidden " +
          (open
            ? "translate-x-0 shadow-[0_0_60px_rgba(0,0,0,0.22)]"
            : "-translate-x-[105%]")
        }
      >
        {/* ── ส่วนที่ 1: HEADER (navbar ของ drawer) ──
            avatar แทนชื่อ S.Tunaram (ย้ายมาจาก navbar มือถือ ที่วางคู่ปุ่มเมนูแล้วดูเบียด)
            เส้นคั่นเต็มความกว้าง แยกออกจาก content ด้านล่างชัดเจน */}
        <div className="flex h-[76px] shrink-0 items-center justify-between gap-3 border-b border-border px-5">
          <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-white">
            <Image
              src={profile.hero.navAvatar}
              alt={profile.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-border text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── ส่วนที่ 2: CONTENT (เมนู + CTA) — padding 20px รอบด้าน ── */}
        <div className="p-5">
          <NavAccordion onNavigate={() => setOpen(false)} />

          {/* CTA ปิดท้าย drawer — ปุ่มดำ ตัวหนังสือขาว ไม่มีมุมโค้ง (user สั่ง)
              แทนลิสต์ email/LinkedIn เดิม · พาไป section Contact Me บนหน้าแรก */}
          <div className="mt-6 border-t border-border pt-[18px]">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2.5 bg-foreground px-5 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
              Contact Me
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
