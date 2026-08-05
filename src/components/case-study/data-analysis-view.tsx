// DataAnalysisView — หน้า /work/data-analysis
// เนื้อหาเดิมคือ section "AI in My Workflow" ที่ฝังอยู่ในหน้า Propertyhub เท่านั้น
// ย้ายออกมาเป็นหน้าของตัวเอง (ดูเหตุผลที่ data/data-analysis.ts)
//
// โครงหน้า = เหมือนหน้า project จริง:
//   badge → H1 → avatar bar → hero (terminal mockup) → Overview
//   → From Data to Decision (ClaudeSection) → prev/next
// ไม่มี section Tools — เครื่องมือโชว์เป็นการ์ดในขั้นแรกของไทม์ไลน์แทน
// ข้อความทั้งหมดแก้ที่ data/data-analysis.ts

import Image from "next/image";
import type { PlaceholderProject } from "@/data/projects";
import { dataAnalysis } from "@/data/data-analysis";
import { profile } from "@/data/profile";
import { StatusBadge } from "./status-badge";
import { AnalysisTerminal } from "./analysis-terminal";
import { ClaudeSection } from "./claude-section";
import { ProjectNav } from "./project-nav";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

export function DataAnalysisView({ project: p }: { project: PlaceholderProject }) {
  return (
    <article className="pt-5 pb-5 font-sans font-normal min-[900px]:py-[50px]">
      {/* ── HEADER — โครงเดียวกับหน้า project จริง ── */}
      <section>
        <StatusBadge status={p.status} />

        <h1 className="mt-5 text-[clamp(34px,5.4vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
          {p.title}
        </h1>

        <div className="mt-5 flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-white">
              <Image
                src={profile.hero.navAvatar}
                alt={profile.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[15px] font-semibold text-foreground">{profile.fullName}</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">{profile.headline}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-border" />

        {/* ── HERO — terminal mockup: session วิเคราะห์ data ผ่าน MCP
            (สไตล์เดียวกับ ContactForm ที่หน้า Contact Me · ตัวเลขในนั้นเป็นของจริง) ── */}
        <div className="mt-8 min-[900px]:mt-[50px]">
          <AnalysisTerminal />
        </div>
      </section>

      <div className="h-8 min-[900px]:h-[50px]" />

      {/* ── OVERVIEW — บอกว่าหน้านี้คืออะไร ทำอะไรได้ ── */}
      <section>
        <H2>Overview</H2>
        <div className="mt-[22px] space-y-[18px]">
          {dataAnalysis.overview.map((para, i) => (
            <p key={i} className="text-[17px] leading-[1.8] text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* หมายเหตุ: ไม่มี section Tools — เครื่องมือแสดงเป็นการ์ดในขั้นที่ 1 ของ
          From Data to Decision อยู่แล้ว (ตรงจุดที่ใช้จริง ไม่ต้องมีลิสต์ซ้ำด้านบน) */}

      <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />

      {/* ── 2 WORKFLOWS + insight + closing ── */}
      <ClaudeSection claude={dataAnalysis} title={p.title} />

      {/* ── footer nav (prev / next) — ลำดับอิงเมนู sidebar ── */}
      <ProjectNav slug="data-analysis" />
    </article>
  );
}
