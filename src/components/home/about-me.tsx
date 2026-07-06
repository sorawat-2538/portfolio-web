import Image from "next/image";
import { profile } from "@/data/profile";

export function AboutMe() {
  return (
    <section className="flex flex-col items-center rounded-xl border border-border p-8 text-center sm:p-[50px]">
      {/* avatar */}
      <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full bg-hover ring-4 ring-[#f4d98c]/70">
        <Image
          src={profile.hero.avatar}
          alt={profile.name}
          fill
          sizes="150px"
          className="object-cover object-top [image-rendering:pixelated]"
        />
      </div>

      {/* headline / position */}
      <h2 className="mt-6 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] text-foreground">
        {profile.headline}
      </h2>

      {/* stats */}
      <div className="mt-5 flex items-center gap-7">
        {profile.stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-7">
            {i > 0 && <span className="h-10 w-px bg-border" />}
            <div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.02em] text-foreground">
                {s.value}
              </div>
              <div className="mt-1.5 text-[13px] text-muted-foreground">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* short summary */}
      <p className="mt-7 max-w-xl text-[16px] leading-[1.8] text-muted-foreground">
        {profile.aboutSummary}
      </p>

      {/* certifications */}
      <div className="mt-7 flex max-w-lg flex-wrap justify-center gap-3">
        {profile.certifications.map((cert) => (
          <span
            key={cert}
            className="rounded-full bg-hover px-4 py-2 text-[13.5px] font-medium text-foreground"
          >
            {cert}
          </span>
        ))}
      </div>
    </section>
  );
}
