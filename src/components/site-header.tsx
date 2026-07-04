import Link from "next/link";
import { Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="flex items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Mail className="h-[15px] w-[15px]" />
            {profile.email}
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
