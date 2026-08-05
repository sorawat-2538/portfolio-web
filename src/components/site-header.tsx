import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { MenuButton } from "@/components/sidebar/menu-button";
import { profile } from "@/data/profile";

function Avatar() {
  return (
    <div className="group relative">
      {/* avatar navbar — รูป original (พื้นขาว) + เส้นขอบ 1px เป็นตัวกำหนดขอบวงกลม
          ตัวเลือกอีกแบบที่เคยลอง: ลายเส้นโปร่งใสบนพื้น #E4E6EA ไม่มีขอบ (ไฟล์ avatar-nav-v2.png) */}
      <span className="relative block h-10 w-10 overflow-hidden rounded-full border border-border bg-white">
        <Image
          src={profile.hero.navAvatar}
          alt={profile.name}
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
      {/* hover toast */}
      <span className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-50 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-[12px] font-medium text-primary-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
        Please feel free to contact me 👋
        <span className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-primary" />
      </span>
    </div>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-foreground no-underline"
    >
      <svg
        width="32"
        height="20"
        viewBox="0 0 34 20"
        fill="none"
        aria-hidden="true"
        className="block"
      >
        <circle cx="7" cy="12.5" r="6" fill="currentColor" />
        <rect
          x="18.5"
          y="-1"
          width="6.2"
          height="22"
          rx="3.1"
          transform="rotate(22 21.6 10)"
          fill="currentColor"
        />
      </svg>
      <span className="text-lg font-bold tracking-[-0.02em]">
        {profile.name}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-5 sm:px-8 min-[900px]:px-0">
        {/* mobile — เมนูซ้าย · โลโก้ต่อท้ายชิดซ้าย · Resume ดันไปขวาสุด */}
        <div className="flex w-full items-center gap-3 min-[900px]:hidden">
          <MenuButton />
          <Logo />
          <a
            href={profile.resumeUrl}
            className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </div>

        {/* desktop — โลโก้ซ้าย · controls ขวา */}
        <div className="hidden min-[900px]:block">
          <Logo />
        </div>

        {/* desktop controls */}
        <nav className="hidden items-center gap-5 min-[900px]:flex">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13.5px] font-medium text-foreground transition-colors hover:bg-hover"
          >
            <Mail className="h-[15px] w-[15px]" />
            Contact Me
          </Link>
          <span className="h-5 w-px bg-border" />
          <Avatar />
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </nav>

      </div>
    </header>
  );
}
