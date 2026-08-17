// SpecHandoffMock — ไฟล์ dev spec (.md) ที่เขียนส่งให้ทีม dev เอง
// ใช้ใน step "Handoff to Dev" ของ section Data for Future Growth
//
// สีและโครงเดียวกับ AnalysisTerminal (hero ของหน้านี้): navy + mono + traffic lights
// + rail สารบัญด้านซ้าย — ให้รู้สึกว่าเป็น "ไฟล์จริงในเครื่อง" ต่อเนื่องจาก hero
//
// กล่องสูงคงที่ เลื่อนอ่านแนวตั้งอย่างเดียว (ไม่มี scroll แนวนอน — บรรทัดยาวตัดขึ้นบรรทัดใหม่
// และเนื้อหาเขียนให้สั้นพอในหนึ่งบรรทัดอยู่แล้ว) เนื้อหาเป็นสเปกจริงทั้งไฟล์
// แก้สเปก = แก้ string SPEC ด้านล่างอย่างเดียว
// ไฮไลต์ syntax ด้วย tokenizer เล็กๆ ท้ายไฟล์ (heading / **bold** / `code`)

const SPEC = `# Dev Spec — Same Project Listings Optimization
## Sprint scope: listing_detail (Mobile + Desktop)

**Page:** \`/listings/[id]\`
**Goal:** grow 2–3 view sessions → lift Session CR
**Baseline (Mar 27 – Apr 23):** mobile 9.4% · desktop 2.6% click rate

---

## Shared rules

- **Card UI:** reuse the existing listing card — no UI changes
- **Max shown:** up to 10, sorted by \`updated_at DESC\`
- **Exclude:** never show the listing currently being viewed
- **"See all":** only when project listings > 10 (counted after exclusion)
- **Hidden:** hide the whole block when project listings < 2
- **Loading:** skeleton matching the card shape, on both breakpoints

---

## Feature 1 — Mobile: "Listings in the Same Project"

- Heading: "Rentals in the Same Project" / "For Sale" by transaction type
- Layout: vertical list, max 10 listings
- Sticky bottom button: "See all X listings in this project"
  (X = real total after excluding the current listing)
- Tap button → open bottom sheet (Feature 1b)
- Tap card → \`/listings/[id]\` in the same tab

### Feature 1b — Bottom sheet

- Header: "See More Rentals" · dismiss by X button or swipe down
- Filter chips, horizontal scroll:
  - transaction toggle — preset from the current listing
  - room type — All / Studio / 1 / 2 / 3 / 4 Bedrooms
  - price — range slider + histogram + min/max inputs
  - advanced — room size, in-unit amenities, building amenities
- Sort: "Found X listings" + Most recent / Price ↑ / Price ↓
- Results: vertical list, skeleton on fetch and on every filter change
- Infinite scroll — no "load more" button

---

## Feature 2 — Desktop: sidebar

- Same heading and same 10-listing rule as mobile
- Skeleton loading on initial fetch
- Bottom button: "See all X listings in this project" → opens the modal
- Click card → \`/listings/[id]\` in the same tab
- Hide the sidebar when project listings < 2

---

## Feature 3 — Desktop: "Other Listings in [Project Name]" modal

- Title: "Other Listings in [Project Name]"
- Subtitle: "Total X listings in this project (Y for rent, Z for sale)"
- Filter bar in a single row + sort dropdown on the far right
- Price filter opens a popover: slider + histogram + Clear / Cancel / Apply
- Advanced search opens a nested modal: Clear all / Cancel / Apply
- Results: "Found X listings", 4-column grid, first 20 then infinite scroll
- Click card → close the modal, then navigate
- Dismiss: X button or backdrop click

---

## Events — mobile

- \`same_project_section_view\` — section 50% in viewport
  \`listing_id\`, \`project_id\`, \`device\`, \`cards_shown\`
- \`same_project_card_click\` — tap a card in the section
  \`listing_id\`, \`source_listing_id\`, \`card_position\`
- \`same_project_see_all_click\` — tap "See all"
  \`listing_id\`, \`project_id\`, \`total_count\`
- \`same_project_sheet_card_click\` — tap a card in the sheet
  \`listing_id\`, \`source_listing_id\`, \`card_position\`
- \`same_project_sheet_filter_change\` — change any filter
  \`filter_type\`, \`filter_value\`, \`is_prefilter_override\`

## Events — desktop

- \`sidebar_view\` — sidebar enters the viewport
  \`listing_id\`, \`project_id\`, \`cards_shown\`
- \`sidebar_card_click\` — click a card
  \`listing_id\`, \`source_listing_id\`, \`card_position\`
- \`sidebar_see_all_click\` — click "See all"
  \`listing_id\`, \`project_id\`, \`total_count\`
- \`sidebar_scroll\` — 80% of the sidebar content
  \`listing_id\`, \`cards_shown\`
- \`modal_open\` — open from the sidebar button
  \`listing_id\`, \`project_id\`
- \`modal_close\` — close the modal
  \`close_method\`: backdrop | button | card_click
- \`modal_card_click\` — click a card in the modal
  \`listing_id\`, \`source_listing_id\`, \`card_position\`
- \`modal_filter_change\` — change any filter
  \`filter_type\`, \`filter_value\`, \`is_prefilter_override\`
- \`modal_scroll\` — 80% of the modal content
  \`listing_id\`, \`results_count\`

---

## Pre-filter logic

- transaction type — matches the current listing (rent / sale)
- room type — matches the current listing
- price — no preset, show every price range
- advanced search — no preset

\`is_prefilter_override\` = \`true\` when the user moves a filter
away from its preset value.

---

*Ref: measurement-plan.md · owner: S.Tunaram*`;

const LINES = SPEC.split("\n");

// สีของ token ใน markdown
const C = {
  h1: "text-sky-300 font-semibold",
  h2: "text-sky-300",
  h3: "text-sky-400/85",
  bold: "text-slate-100 font-semibold",
  txt: "text-slate-300",
  code: "text-amber-300",
  dim: "text-slate-500",
};

/** แบ่งบรรทัดเป็นชิ้นๆ ตาม `code` และ **bold** แล้วย้อมสี */
function tokenize(line: string, base: string) {
  return line
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <span key={i} className={C.code}>
            {part.slice(1, -1)}
          </span>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className={C.bold}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return (
        <span key={i} className={base}>
          {part}
        </span>
      );
    });
}

function MdLine({ n, line }: { n: number; line: string }) {
  const t = line.trimStart();

  // สีพื้นของบรรทัด — heading / ตาราง / bullet / เส้นคั่น ใช้คนละโทน
  let base = C.txt;
  if (t.startsWith("###")) base = C.h3;
  else if (t.startsWith("##")) base = C.h2;
  else if (t.startsWith("#")) base = C.h1;
  else if (t === "---" || t.startsWith("*")) base = C.dim;

  return (
    <div className="flex">
      <span className="w-9 shrink-0 select-none pr-3 text-right text-slate-600">
        {n}
      </span>
      <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
        {line ? tokenize(line, base) : " "}
      </span>
    </div>
  );
}

export function SpecHandoffMock() {
  return (
    <div>
      <div className="select-none overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1a2b] shadow-[0_28px_60px_-24px_rgba(8,15,30,0.6)]">
        {/* ── CHROME ── */}
        <div className="flex items-center gap-4 border-b border-white/[0.06] bg-[#0f1f33] px-4 py-3">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </span>
          <div className="flex min-w-0 items-center gap-1 font-mono text-[13px]">
            <span className="truncate rounded-md border border-white/15 bg-white/[0.06] px-3 py-1 font-medium text-slate-100">
              dev-spec-same-project-listings.md
            </span>
            <span className="hidden px-3 text-slate-500 min-[760px]:inline">
              Listing Detail _Standalone_.html
            </span>
          </div>
        </div>

        {/* ── เนื้อไฟล์ markdown — สูงคงที่ เลื่อนแนวตั้งอย่างเดียว ── */}
        <div className="h-[clamp(320px,44vw,460px)] overflow-y-auto overflow-x-hidden px-[clamp(12px,2vw,20px)] py-[clamp(12px,2vw,16px)] font-mono text-[clamp(11px,1.25vw,12.5px)] leading-[1.85] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar]:w-2">
          {LINES.map((line, i) => (
            <MdLine key={i} n={i + 1} line={line} />
          ))}
        </div>

        {/* ── STATUS BAR ── */}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#0f1f33] px-4 py-2 font-mono text-[clamp(10.5px,1.2vw,12px)] text-slate-400">
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span className="truncate">markdown · {LINES.length} lines</span>
          </span>
          <span className="truncate">
            3 features · <span className="text-amber-300">14 events</span>
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
        เลื่อนอ่านในหน้าต่างได้ คือสเปกจริงที่ส่งให้ทีม dev ตั้งแต่กติกาที่ใช้ร่วมกันจนถึง event
        ทุกตัว ส่งคู่กับ standalone HTML จาก Claude Design ที่กดเล่นได้จริงในไฟล์เดียว
      </p>
    </div>
  );
}
