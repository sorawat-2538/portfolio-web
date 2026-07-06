// Rotating tool constellation (image-5 style). Pure CSS animation — the outer
// ring spins, each bubble counter-spins so its text stays upright.
// Respects prefers-reduced-motion (see globals.css .orbit-ring / .orbit-node).

const TOOLS = [
  { name: "Figma", sub: "Design" },
  { name: "Claude", sub: "AI" },
  { name: "Cursor", sub: "AI IDE" },
  { name: "Next.js", sub: "Framework" },
  { name: "React", sub: "Frontend" },
  { name: "Tailwind", sub: "Styling" },
  { name: "GitHub", sub: "DevOps" },
  { name: "Vercel", sub: "Deploy" },
  { name: "AI Agents", sub: "AI" },
  { name: "Tokens", sub: "Design" },
];

const RADIUS = 158; // px from center
const BUBBLE = 80; // px diameter

export function SkillsConstellation() {
  return (
    <section className="grid items-center gap-10 min-[900px]:grid-cols-[1fr_460px]">
      {/* left: heading */}
      <div>
        <h2 className="text-[clamp(34px,5vw,52px)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-foreground">
          Tools
          <br />For
          <br />Work
        </h2>
        <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-muted-foreground">
          เครื่องมือที่ผมใช้จริงในการออกแบบ
          <br />
          และสร้างผลงาน ตั้งแต่ Design จนถึง AI และ Code
        </p>
      </div>

      {/* right: rotating constellation (hover to pause & read) */}
      <div className="flex justify-center overflow-hidden py-2">
        <div className="orbit-wrap relative aspect-square w-[min(440px,84vw)]">
          {/* faint guide ring */}
          <div className="absolute left-1/2 top-1/2 h-[336px] w-[336px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border" />

          {/* center node */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#facc15]">
              STACK
            </span>
            <span className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
              Design &amp; Code
            </span>
          </div>

          {/* rotating ring: spokes + bubbles */}
          <div className="orbit-ring absolute inset-0">
            {/* connector lines from center out to each bubble */}
            {TOOLS.map((t, i) => {
              const angle = (360 / TOOLS.length) * i;
              return (
                <div
                  key={`spoke-${t.name}`}
                  className="absolute left-1/2 top-1/2 h-0 origin-left border-t border-dashed border-border"
                  style={{ width: RADIUS, transform: `rotate(${angle}deg)` }}
                />
              );
            })}
            {TOOLS.map((t, i) => {
              const angle = (360 / TOOLS.length) * i;
              return (
                <div
                  key={t.name}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{ transform: `rotate(${angle}deg) translate(${RADIUS}px)` }}
                >
                  <div
                    className="absolute"
                    style={{
                      width: BUBBLE,
                      height: BUBBLE,
                      transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                    }}
                  >
                    <div className="orbit-node flex h-full w-full flex-col items-center justify-center rounded-full border border-border bg-[#F9FAFB] text-center">
                      <span className="text-[13px] font-bold leading-none tracking-[-0.01em] text-foreground">
                        {t.name}
                      </span>
                      <span className="mt-1 text-[10px] text-faint">{t.sub}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
