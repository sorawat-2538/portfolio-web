// Hero variant 3 — a MacBook-style laptop mockup (drawn in CSS, no external
// asset) with a tall full-page screenshot cropped into the 16:10 screen.
// Editorial: a headline sits beside/above the device. Self-contained + crisp.

import Image from "next/image";

export function LaptopMock({
  src,
  alt = "preview",
  width,
  height,
  priority,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[720px] select-none">
      {/* ── SCREEN ── black bezel + notch, screenshot cropped to top ── */}
      <div className="relative mx-auto w-full rounded-t-[16px] bg-[#0c0d10] px-[11px] pt-[13px] shadow-[0_34px_70px_-30px_rgba(20,32,60,0.55)]">
        {/* notch */}
        <div className="absolute left-1/2 top-0 h-[13px] w-[104px] -translate-x-1/2 rounded-b-[7px] bg-[#0c0d10]" />
        {/* screen */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-white">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            unoptimized
            className="absolute inset-x-0 top-0 block w-full"
          />
        </div>
        {/* thin screen-to-body seam */}
        <div className="h-[11px]" />
      </div>

      {/* ── BASE ── silver deck, wider than screen, hinge notch ── */}
      <div className="flex justify-center">
        <div className="relative h-[15px] w-[112%] rounded-b-[12px] rounded-t-[2px] bg-gradient-to-b from-[#d7dbe1] to-[#aeb4bd]">
          {/* hinge cutout */}
          <div className="absolute left-1/2 top-0 h-[6px] w-[132px] -translate-x-1/2 rounded-b-[7px] bg-[#9096a0]" />
          {/* foot shadow */}
          <div className="absolute inset-x-6 -bottom-2 h-3 rounded-[50%] bg-black/15 blur-md" />
        </div>
      </div>
    </div>
  );
}
