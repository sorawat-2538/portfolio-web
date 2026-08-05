import Link from "next/link";
import { ArrowRight, Briefcase, ChevronRight, GraduationCap, Trophy } from "lucide-react";
import { projectSlugs } from "@/data/projects";
import { SkillsGrid } from "@/components/home/skills-grid";
import { WorkflowProcess as WorkFlow } from "@/components/home/work-flow";
import { AboutMe } from "@/components/home/about-me";
import { ContactMe } from "@/components/home/contact-me";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

function Divider() {
  return <div className="my-8 h-px bg-border min-[900px]:my-[50px]" />;
}

// Standard section title — English, bold, consistent everywhere.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

/** timeline entry with a continuous 2px line running through the icon nodes */
function TimelineItem({
  icon,
  period,
  title,
  company,
  children,
  first,
}: {
  icon: React.ReactNode;
  period: string;
  title: string;
  company?: string;
  children?: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div className="relative flex gap-5 pb-10 last:pb-0">
      <div className="relative flex w-11 shrink-0 flex-col items-center">
        {/* continuous line: starts at first node, runs to the bottom of every item */}
        <span
          className="absolute left-1/2 bottom-0 w-0.5 -translate-x-1/2 bg-border"
          style={{ top: first ? 22 : 0 }}
        />
        <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-background text-brand">
          {icon}
        </span>
      </div>
      <div className="pb-2">
        <span className="inline-flex rounded-full bg-hover px-3 py-1 text-[13px] font-medium text-muted-foreground">
          {period}
        </span>
        <h3 className="mt-3 text-[19px] font-bold tracking-[-0.01em] text-foreground">
          {title}
        </h3>
        {company && (
          <div className="mt-1 text-[14.5px] text-muted-foreground">{company}</div>
        )}
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="py-[30px] min-[900px]:py-[50px]">
      {/* HERO — มือถือเว้นบน/ล่าง 30px (user สั่ง) · desktop คงเดิม 50px */}
      <Reveal>
        <section className="pb-[30px] min-[900px]:pb-[50px]">
          <h1 className="text-[clamp(32px,5.4vw,48px)] font-bold leading-[1.12] tracking-[-0.028em] text-foreground">
            <span className="hero-wave mr-2.5 inline-block origin-[70%_80%]">
              {profile.hero.emoji}
            </span>
            {profile.hero.greeting}{" "}
            <span className="text-brand">{profile.hero.nickname}</span>
          </h1>
        </section>
      </Reveal>

      {/* ABOUT */}
      <Reveal>
        <AboutMe />
      </Reveal>

      <Divider />

      {/* EDUCATION */}
      <Reveal>
        <section>
          <SectionHeading>Education</SectionHeading>
          <div className="mt-8 flex flex-col">
            {profile.education.map((edu) => (
              <TimelineItem
                key={edu.title}
                icon={<GraduationCap className="h-[18px] w-[18px]" strokeWidth={1.6} />}
                period={edu.period}
                title={edu.title}
                first
              >
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {edu.detail}
                </p>
              </TimelineItem>
            ))}
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* CAREER JOURNEY */}
      <Reveal>
        <section>
          <SectionHeading>Career Journey</SectionHeading>
          <div className="mt-8 flex flex-col">
            {profile.employment.map((job, i) => (
              <TimelineItem
                key={job.company}
                icon={<Briefcase className="h-[18px] w-[18px]" strokeWidth={1.6} />}
                period={job.period}
                title={job.title}
                company={job.company}
                first={i === 0}
              >
                <p className="mt-3 text-[15.5px] leading-[1.7] text-muted-foreground">
                  {job.description}
                </p>
              </TimelineItem>
            ))}
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* ACHIEVEMENTS */}
      <Reveal>
        <section>
          <SectionHeading>Achievements</SectionHeading>
          <div className="mt-8 flex flex-col">
            {profile.achievements.map((a) => (
              <TimelineItem
                key={a.title}
                icon={<Trophy className="h-[18px] w-[18px]" strokeWidth={1.6} />}
                period={a.period}
                title={a.title}
                first
              >
                <p className="mt-3 text-[15.5px] leading-[1.7] text-muted-foreground">
                  {a.detail}
                </p>
              </TimelineItem>
            ))}
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* MY WORK FLOW — process กลางของผม (ย้ายมาจากหน้า case study Propertyhub
          เพราะไม่ผูกกับโปรเจกต์ไหน + ทุกคนที่เข้าเว็บควรได้เห็น)
          */}
      <Reveal>
        <section>
          <SectionHeading>My Work Flow</SectionHeading>
          <div className="mt-8">
            <WorkFlow />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* SKILLS */}
      <Reveal>
        <section>
          <SectionHeading>Technical Skills</SectionHeading>
          <SkillsGrid />
        </section>
      </Reveal>

      <Divider />

      {/* CONTACT */}
      <Reveal>
        <ContactMe />
      </Reveal>

      <Divider />

      {/* VIEW MY WORK CTA
          มือถือ = ปุ่มดำเต็มความกว้าง ตัวหนังสือขาว ไม่มีมุมโค้ง (user สั่ง)
          desktop (≥900px) = ตัวหนังสือใหญ่ + วงกลมลูกศร แบบเดิม */}
      <Reveal>
        <Link
          href={`/work/${projectSlugs[0]}`}
          className="flex w-full items-center justify-center gap-2 bg-foreground px-5 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90 min-[900px]:hidden"
        >
          View my work
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </Link>

        <div className="hidden justify-end min-[900px]:flex">
          <Link
            href={`/work/${projectSlugs[0]}`}
            className="group inline-flex items-center gap-5 text-right"
          >
            <span className="flex flex-col items-end gap-1 leading-none">
              <span className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.02em] text-foreground">
                View my work
              </span>
            </span>
            <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight className="h-[22px] w-[22px]" />
            </span>
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
