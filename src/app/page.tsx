import Link from "next/link";
import { Briefcase, ChevronRight, GraduationCap } from "lucide-react";
import { projectSlugs } from "@/data/projects";
import { SkillsGrid } from "@/components/home/skills-grid";
import { SkillsConstellation } from "@/components/home/skills-constellation";
import { AboutMe } from "@/components/home/about-me";
import { ContactMe } from "@/components/home/contact-me";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

function Divider() {
  return <div className="my-[50px] h-px bg-border" />;
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
        <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-background text-faint">
          {icon}
        </span>
      </div>
      <div className="pb-2">
        <span className="inline-flex rounded-full bg-hover px-3 py-1 text-[13px] text-muted-foreground">
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
    <main className="py-12 min-[900px]:py-[50px]">
      {/* HERO */}
      <Reveal>
        <section className="pb-[50px]">
          <h1 className="text-[clamp(32px,5.4vw,48px)] font-bold leading-[1.12] tracking-[-0.028em] text-foreground">
            <span className="hero-wave mr-2.5 inline-block origin-[70%_80%]">
              {profile.hero.emoji}
            </span>
            {profile.hero.greeting}
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

      {/* EMPLOYMENT */}
      <Reveal>
        <section>
          <SectionHeading>Employment History</SectionHeading>
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

      {/* SKILLS */}
      <Reveal>
        <section>
          <SectionHeading>Technical Skills</SectionHeading>
          <SkillsGrid />
        </section>
      </Reveal>

      <Divider />

      {/* SKILLS — constellation variant */}
      <Reveal>
        <SkillsConstellation />
      </Reveal>

      <Divider />

      {/* CONTACT */}
      <Reveal>
        <ContactMe />
      </Reveal>

      <Divider />

      {/* VIEW MY WORK CTA */}
      <Reveal>
        <div className="flex justify-end">
          <Link
            href={`/work/${projectSlugs[0]}`}
            className="group inline-flex items-center gap-5 text-right"
          >
            <span className="flex flex-col items-end gap-1 leading-none">
              <span className="text-[13px] uppercase tracking-[0.22em] text-faint">
                Selected work
              </span>
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
