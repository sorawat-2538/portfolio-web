"use client";

import * as React from "react";
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
      {navGroups.map((group) => {
        const isOpen = !!open[group.key];
        return (
          <div key={group.key} className="border-b-2 border-foreground">
            <button
              type="button"
              onClick={() =>
                setOpen((s) => ({ ...s, [group.key]: !s[group.key] }))
              }
              className="flex w-full items-center justify-between gap-2.5 px-0.5 py-4 text-left text-foreground"
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
          "fixed left-0 top-0 z-[80] h-screen w-[min(86vw,340px)] overflow-y-auto border-r border-border bg-background px-6 pb-[34px] pt-7 transition-transform duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)] min-[900px]:hidden " +
          (open
            ? "translate-x-0 shadow-[0_0_60px_rgba(0,0,0,0.22)]"
            : "-translate-x-[105%]")
        }
      >
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2.5 text-foreground">
            <svg width="30" height="18" viewBox="0 0 34 20" fill="none" aria-hidden="true" className="block">
              <circle cx="7" cy="12.5" r="6" fill="currentColor" />
              <rect x="18.5" y="-1" width="6.2" height="22" rx="3.1" transform="rotate(22 21.6 10)" fill="currentColor" />
            </svg>
            <span className="text-lg font-bold tracking-[-0.02em]">
              {profile.name}
            </span>
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
      </aside>
    </>
  );
}
