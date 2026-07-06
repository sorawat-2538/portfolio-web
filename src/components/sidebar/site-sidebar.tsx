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

        <div className="mt-6 flex flex-col gap-1 border-t border-border pt-[18px]">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 py-1.5 text-sm text-muted-foreground"
          >
            <Mail className="h-[15px] w-[15px]" />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 py-1.5 text-sm text-muted-foreground"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[15px] w-[15px]">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </aside>
    </>
  );
}
