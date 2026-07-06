import Image from "next/image";
import { SkillsGrid } from "@/components/home/skills-grid";
import { WorkGrid } from "@/components/home/work-grid";
import { profile } from "@/data/profile";

function Divider() {
  return <div className="my-[50px] h-px bg-border" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(22px,2.8vw,30px)] font-bold leading-tight tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

export default function HomePage() {
  return (
    <main className="py-12 min-[900px]:py-[50px]">
      {/* HERO */}
      <section>
          <h1 className="text-[clamp(32px,5.4vw,48px)] leading-[1.12] tracking-[-0.028em] text-foreground">
            <span className="mr-2.5 inline-block">{profile.hero.emoji}</span>
            {profile.hero.greeting}
          </h1>
          <p className="mt-6 text-[clamp(16px,1.5vw,17.5px)] leading-[1.85] text-muted-foreground">
            {profile.hero.intro}
          </p>

          <div className="mt-8 rounded-r-xl border-l-[3px] border-foreground bg-hover px-7 py-7 sm:px-9 sm:py-8">
            <p className="text-[clamp(21px,2.9vw,29px)] font-bold leading-[1.4] tracking-[-0.015em] text-foreground">
              {profile.hero.statement}
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Image
              src={profile.hero.avatar}
              alt={profile.name}
              width={548}
              height={714}
              className="h-auto w-[clamp(200px,32vw,280px)] [image-rendering:pixelated]"
              priority
            />
          </div>
        </section>

        <Divider />

        {/* ABOUT */}
        <section>
          <SectionHeading>About</SectionHeading>
          {profile.about.map((para, i) => (
            <p
              key={i}
              className="mt-4 text-[17px] leading-[1.78] text-muted-foreground"
            >
              {para}
            </p>
          ))}
        </section>

        <Divider />

        {/* EDUCATION */}
        <section>
          <SectionHeading>Education</SectionHeading>
          <div className="mt-6 space-y-4">
            {profile.education.map((edu) => (
              <div
                key={edu.title}
                className="rounded-2xl border border-border bg-hover px-6 py-6"
              >
                <div className="text-[12.5px] text-faint">{edu.period}</div>
                <div className="mt-2.5 text-[17px] leading-snug text-foreground">
                  {edu.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {edu.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CERTIFICATION */}
        <section>
          <SectionHeading>Certification</SectionHeading>
          <div className="mt-6 space-y-4">
            {profile.certifications.map((cert, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-hover px-6 py-6"
              >
                <div className="text-[12.5px] text-faint">{cert.label}</div>
                <div className="mt-2.5 text-[17px] leading-snug text-foreground">
                  {cert.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cert.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* EMPLOYMENT */}
        <section>
          <SectionHeading>Employment History</SectionHeading>
          <div className="ml-1.5 mt-8 flex flex-col gap-9 border-l border-border pl-8">
            {profile.employment.map((job) => (
              <div key={job.company} className="relative">
                <span className="absolute -left-[34.5px] top-[7px] h-[9px] w-[9px] rounded-full bg-primary shadow-[0_0_0_4px_var(--background)]" />
                <div className="text-[13px] text-faint">{job.period}</div>
                <div className="mt-1.5 text-[18px] tracking-[-0.01em] text-foreground">
                  {job.title}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
                  <span className="text-[14.5px] text-muted-foreground">
                    {job.company}
                  </span>
                  <span className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {job.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* SKILLS */}
        <section>
          <SectionHeading>Technical Skills</SectionHeading>
          <SkillsGrid />
        </section>

        <Divider />

        {/* SELECTED WORK */}
        <section>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading>Selected Work</SectionHeading>
            <span className="text-[13px] uppercase tracking-[0.22em] text-faint">
              {profile.role}
            </span>
          </div>
          <WorkGrid />
        </section>
    </main>
  );
}
