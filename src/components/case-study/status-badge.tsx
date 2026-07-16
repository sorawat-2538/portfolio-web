// Status badge — โชว์บนหัว case study / หน้า placeholder
//   available  → เขียว (emerald)  จุดกระพริบ (ping)  "Available"
//   process    → เหลือง (amber)   จุดเต้น (pulse)    "On Process"
//   coming     → เทา (slate)      จุดนิ่ง            "Coming Soon"

import { STATUS_LABEL, type ProjectStatus } from "@/data/projects";

const STYLES: Record<
  ProjectStatus,
  { wrap: string; dot: string; ping: boolean }
> = {
  available: {
    wrap: "bg-emerald-500/10 text-emerald-700",
    dot: "bg-emerald-500",
    ping: true,
  },
  process: {
    wrap: "bg-amber-500/10 text-amber-700",
    dot: "bg-amber-500",
    ping: true,
  },
  coming: {
    wrap: "bg-slate-500/10 text-slate-600",
    dot: "bg-slate-400",
    ping: false,
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = STYLES[status];
  return (
    <span
      className={
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-medium " +
        s.wrap
      }
    >
      <span className="relative flex h-2 w-2">
        {s.ping && (
          <span
            className={
              "absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping " +
              s.dot
            }
          />
        )}
        <span className={"relative inline-flex h-2 w-2 rounded-full " + s.dot} />
      </span>
      {STATUS_LABEL[status]}
    </span>
  );
}
