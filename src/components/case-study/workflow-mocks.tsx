// Small illustrative fake-UI mockups, one per AI workflow (not real
// screenshots). Minimal, token-based (light/dark).
//   • WorkflowMock1 — data console: connected sources + mini chart + insight
//   • WorkflowMock2 — idea → UI: a spec.md panel that generates a wireframe

import { Plug, BarChart3, Eye, Database, Check, FileText, ArrowRight, Sparkles } from "lucide-react";

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border bg-hover px-3.5 py-2.5">
      <span className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </span>
      <span className="text-[11.5px] font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

/** Workflow 1 — data insight console */
export function WorkflowMock1() {
  const sources = [
    { name: "GA4", Icon: BarChart3, color: "text-amber-500", bg: "bg-amber-400/15", note: "MCP", mcp: true },
    { name: "Clarity", Icon: Eye, color: "text-blue-500", bg: "bg-blue-400/15", note: "MCP", mcp: true },
    { name: "Zimple", Icon: Database, color: "text-violet-500", bg: "bg-violet-400/15", note: "ยืนยัน funnel", mcp: false },
  ];
  const bars = [40, 62, 52, 78, 68, 90];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_44px_-24px_rgba(30,50,90,0.3)]">
      <Chrome label="Data sources" />
      <div className="p-4">
        {/* sources */}
        <div className="flex flex-col gap-2">
          {sources.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-hover px-2.5 py-2"
            >
              <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${s.bg} ${s.color}`}>
                <s.Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="flex-1 text-[12.5px] font-medium text-foreground">{s.name}</span>
              {s.mcp ? (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-500">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                  {s.note}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-violet-400/15 px-2 py-0.5 text-[10px] font-medium text-violet-500">
                  {s.note}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* mini chart */}
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/40 to-brand"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* insight */}
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-brand/40 bg-brand/[0.05] px-3 py-2.5">
          <Plug className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-foreground">Insight</div>
            <div className="mt-1 h-1.5 w-[85%] rounded-full bg-hover" />
            <div className="mt-1 h-1.5 w-[60%] rounded-full bg-hover" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Workflow 2 — idea → UI (spec.md generates a wireframe) */
export function WorkflowMock2() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_44px_-24px_rgba(30,50,90,0.3)]">
      <Chrome label="spec.md → UI" />
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-4">
        {/* markdown spec */}
        <div className="rounded-lg border border-border bg-hover p-2.5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FileText className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-[10.5px] font-medium">spec.md</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5 font-mono">
            <span className="h-1.5 w-[70%] rounded-full bg-brand/40" />
            <span className="h-1.5 w-[90%] rounded-full bg-border" />
            <span className="h-1.5 w-[80%] rounded-full bg-border" />
            <span className="h-1.5 w-[55%] rounded-full bg-brand/40" />
            <span className="h-1.5 w-[85%] rounded-full bg-border" />
          </div>
        </div>

        {/* arrow */}
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand">
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </span>

        {/* generated wireframe */}
        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center gap-1.5 text-brand">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-[10.5px] font-medium">UI</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            <span className="block h-6 rounded bg-brand/15" />
            <div className="grid grid-cols-2 gap-1.5">
              <span className="block h-6 rounded bg-hover" />
              <span className="block h-6 rounded bg-hover" />
              <span className="block h-6 rounded bg-hover" />
              <span className="block h-6 rounded bg-hover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
