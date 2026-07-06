import Link from "next/link";
import { Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuButton } from "@/components/sidebar/menu-button";
import { profile } from "@/data/profile";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-foreground no-underline"
    >
      <svg
        width="32"
        height="19"
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

// LinkedIn brand mark (lucide removed brand icons; inline SVG keeps the real logo)
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-5 sm:px-8 min-[900px]:px-0">
        <Logo />

        {/* desktop controls */}
        <nav className="hidden items-center gap-[clamp(14px,2vw,24px)] min-[900px]:flex">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-[15px] w-[15px]" />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="h-[15px] w-[15px]" />
            LinkedIn
          </a>
          <span className="h-5 w-px bg-border" />
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </nav>

        {/* mobile controls */}
        <div className="flex items-center gap-2 min-[900px]:hidden">
          <ThemeToggle />
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
