// Browser-window mockup with an INNER-scrolling screen — drops a tall full-page
// screenshot inside a fixed-height "screen" so the reader can scroll through the
// whole page without the case-study page itself scrolling. Compact light chrome
// (colored dots + lock + address bar). Image goes through next/image so it's
// right-sized / AVIF / lazy-loaded. Token-based so it fits light/dark.

import Image from "next/image";
import { Lock } from "lucide-react";

export function ScrollWindow({
  src,
  url = "propertyhub.in.th",
  alt = "preview",
  width,
  height,
  priority,
}: {
  src: string;
  url?: string;
  alt?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full overflow-hidden rounded-[12px] border border-border bg-card shadow-[0_28px_60px_-22px_rgba(30,50,90,0.28)]">
      {/* ── CHROME (matches Hero 1 / ProductMock) ── */}
      <div className="flex items-center gap-3 border-b border-border bg-hover px-4 py-3">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-3 py-1 text-[12.5px] text-muted-foreground ring-1 ring-border">
          <Lock className="h-3 w-3 shrink-0 text-faint" strokeWidth={2.2} />
          <span className="truncate">{url}</span>
        </span>
      </div>

      {/* ── SCREEN — fixed height, scrolls inside ── */}
      <div className="relative">
        <div className="h-[clamp(380px,58vh,600px)] overflow-y-auto overscroll-none bg-white [scrollbar-width:thin]">
          {/* unoptimized: full-page screenshots are extremely tall (aspect ~1:4.6)
              and Next's optimizer pads some resized variants (1080/1920w) with a
              gray strip at the bottom. Serving the pre-sized source (1600w) as-is
              avoids that and stays crisp on retina. */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            unoptimized
            className="block h-auto w-full"
          />
        </div>
        {/* bottom fade — hints there's more to scroll */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-black/[0.07] to-transparent" />
      </div>
    </div>
  );
}
