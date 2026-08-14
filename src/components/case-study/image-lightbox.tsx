"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";

/** รูปที่กดดูเต็มจอได้ — caption ใช้เป็นคำอธิบายบนหัว lightbox (ไม่ใส่ก็ได้) */
export type LightboxImg = { src: string; caption?: string; w: number; h: number };

/** Fullscreen, scrollable view of a single image.
 *  ใช้ร่วมกันทั้ง MeasurementStory และรูปประกอบใน Decision — แก้ที่นี่ที่เดียว */
export function Lightbox({
  img,
  title,
  onClose,
}: {
  img: LightboxImg;
  title: string;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const heading = img.caption ? `${title} — ${img.caption}` : title;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 text-white">
        <span className="min-w-0 truncate text-sm font-medium">{heading}</span>
        <button
          type="button"
          aria-label="ปิด"
          onClick={onClose}
          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
          <Image
            src={img.src}
            alt={heading}
            width={img.w}
            height={img.h}
            sizes="(max-width: 1024px) 100vw, 900px"
            unoptimized
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
