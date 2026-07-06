"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { Mail } from "lucide-react";
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
                <span className="text-xl">📁</span>
                {group.title}
              </span>
              <ChevronDown
                className={
                  "h-5 w-5 shrink-0 text-faint transition-transform duration-200 " +
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
              <div className="flex flex-col gap-0.5 pb-4 pl-4 pr-0.5">
                {group.items.map((item) => {
                  const active = slug === item.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/work/${item.slug}`}
                      onClick={onNavigate}
                      className={
                        "block truncate rounded px-3 py-2 text-[16px] tracking-[-0.01em] transition-colors " +
                        (active
                          ? "bg-primary font-semibold text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground")
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

  // ปิด drawer ด้วยปุ่ม Esc + ล็อกสกอลล์ตอนเปิด
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* ── Desktop: sticky column (≥900px) ── */}
      <aside className="hidden shrink-0 min-[900px]:block min-[900px]:w-[278px] min-[900px]:pr-[30px]">
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-8">
          <NavAccordion />
        </div>
      </aside>

      {/* ── Mobile: overlay + drawer (<900px) ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/25 min-[900px]:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={
          "fixed left-0 top-0 z-50 h-screen w-[min(86vw,340px)] overflow-y-auto border-r border-border bg-background px-6 py-7 transition-transform duration-300 min-[900px]:hidden " +
          (open ? "translate-x-0" : "-translate-x-[105%]")
        }
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-lg font-bold tracking-[-0.02em] text-foreground">
            {profile.name}
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <NavAccordion onNavigate={() => setOpen(false)} />

        <div className="mt-6 flex flex-col gap-1 border-t border-border pt-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 py-1.5 text-sm text-muted-foreground"
          >
            <Mail className="h-[15px] w-[15px]" />
            {profile.email}
          </a>
        </div>
      </aside>
    </>
  );
}
