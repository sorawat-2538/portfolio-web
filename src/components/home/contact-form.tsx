// Contact MOCKUP — code-editor style เดียวกับ code-editor-mock (navy + mono +
// traffic lights) แต่เนื้อในเป็น HTML ของฟอร์มติดต่อ. Static + select-none,
// เนื้อสั้นพอให้แสดงพอดี ไม่ scroll ซ้ายขวา. ไม่ใช่ฟอร์มจริง — natural contact
// ที่กดได้จริงอยู่คอลัมน์ซ้าย.

const C = {
  punct: "text-slate-500",
  tag: "text-pink-400",
  attr: "text-sky-300",
  str: "text-amber-300",
  txt: "text-slate-200",
};

function Line({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-8 shrink-0 select-none pr-4 text-right text-slate-600">
        {n}
      </span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

const Caret = () => (
  <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-sky-300 motion-safe:animate-pulse" />
);

export function ContactForm() {
  return (
    <div className="float-slow select-none overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1a2b] shadow-[0_28px_60px_-20px_rgba(8,15,30,0.6)]">
      {/* ── CHROME — traffic lights + tabs ── */}
      <div className="flex items-center gap-4 border-b border-white/[0.06] bg-[#0f1f33] px-4 py-3">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <div className="flex items-center gap-1 font-mono text-[13px]">
          <span className="rounded-md border border-white/15 bg-white/[0.06] px-3 py-1 font-medium text-slate-100">
            index.html
          </span>
          <span className="px-3 text-slate-500">styles.css</span>
          <span className="px-3 text-slate-500">app.js</span>
        </div>
      </div>

      {/* ── CODE — contact form HTML (สั้นพอให้ fit ไม่ scroll) ── */}
      <div className="px-4 py-4 font-mono text-[13px] leading-[1.75]">
        <Line n={1}>
          <span className={C.punct}>&lt;!doctype html&gt;</span>
        </Line>
        <Line n={2}>
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>html</span>{" "}
          <span className={C.attr}>lang</span>
          <span className={C.punct}>=</span>
          <span className={C.str}>&quot;th&quot;</span>
          <span className={C.punct}>&gt;</span>
        </Line>
        <Line n={3}>
          {"  "}
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>body</span>
          <span className={C.punct}>&gt;</span>
        </Line>
        <Line n={4}>
          {"    "}
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>form</span>{" "}
          <span className={C.attr}>class</span>
          <span className={C.punct}>=</span>
          <span className={C.str}>&quot;contact&quot;</span>
          <span className={C.punct}>&gt;</span>
        </Line>
        <Line n={5}>
          {"      "}
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>input</span>{" "}
          <span className={C.attr}>name</span>
          <span className={C.punct}>=</span>
          <span className={C.str}>&quot;name&quot;</span>{" "}
          <span className={C.punct}>/&gt;</span>
        </Line>
        <Line n={6}>
          {"      "}
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>input</span>{" "}
          <span className={C.attr}>name</span>
          <span className={C.punct}>=</span>
          <span className={C.str}>&quot;email&quot;</span>{" "}
          <span className={C.punct}>/&gt;</span>
        </Line>
        <Line n={7}>
          {"      "}
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>textarea</span>{" "}
          <span className={C.attr}>name</span>
          <span className={C.punct}>=</span>
          <span className={C.str}>&quot;message&quot;</span>
          <span className={C.punct}>&gt;&lt;/</span>
          <span className={C.tag}>textarea</span>
          <span className={C.punct}>&gt;</span>
        </Line>
        <Line n={8}>
          {"      "}
          <span className={C.punct}>&lt;</span>
          <span className={C.tag}>button</span>
          <span className={C.punct}>&gt;</span>
          <span className={C.txt}>ส่งข้อความ →</span>
          <span className={C.punct}>&lt;/</span>
          <span className={C.tag}>button</span>
          <span className={C.punct}>&gt;</span>
          <Caret />
        </Line>
        <Line n={9}>
          {"    "}
          <span className={C.punct}>&lt;/</span>
          <span className={C.tag}>form</span>
          <span className={C.punct}>&gt;</span>
        </Line>
        <Line n={10}>
          {"  "}
          <span className={C.punct}>&lt;/</span>
          <span className={C.tag}>body</span>
          <span className={C.punct}>&gt;</span>
        </Line>
        <Line n={11}>
          <span className={C.punct}>&lt;/</span>
          <span className={C.tag}>html</span>
          <span className={C.punct}>&gt;</span>
        </Line>
      </div>

      {/* ── STATUS BAR ── */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[12px] text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Ln 8, Col 26
        </span>
        <span className="flex items-center gap-4">
          <span>HTML</span>
          <span>UTF-8</span>
        </span>
      </div>
    </div>
  );
}
