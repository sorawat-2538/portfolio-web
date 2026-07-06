"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "./sidebar-context";

export function MenuButton() {
  const { setOpen } = useSidebar();
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={() => setOpen(true)}
      className="inline-flex h-11 w-11 items-center justify-center rounded-[11px] border border-border text-foreground min-[900px]:hidden"
    >
      <Menu className="h-[19px] w-[19px]" />
    </button>
  );
}
