"use client";

// Like / thumbs-up button. NOTE: this persists per-browser via localStorage only
// — the count reflects THIS visitor, not a global total. For a real cross-visitor
// counter, back it with a Route Handler + KV/Redis (see notes). Uses
// useSyncExternalStore (not useEffect+setState) to stay lint-clean and SSR-safe.

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";

const EVT = "phlike-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function LikeButton({ slug }: { slug: string }) {
  const key = `phlike:${slug}`;
  const liked = useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" ? localStorage.getItem(key) === "1" : false),
    () => false,
  );
  const count = liked ? 1 : 0;

  function toggle() {
    localStorage.setItem(key, liked ? "0" : "1");
    window.dispatchEvent(new Event(EVT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "Unlike this project" : "Like this project"}
      className={
        "inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2.5 text-[14px] font-medium transition-colors " +
        (liked
          ? "border-brand text-brand"
          : "border-border text-foreground hover:bg-hover")
      }
    >
      <span className="tabular-nums">{count}</span>
      <Heart className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
