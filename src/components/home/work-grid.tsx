import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, projectSlugs, type Project } from "@/data/projects";

export function WorkGrid() {
  return (
    <div className="mt-7 grid gap-6 sm:grid-cols-2">
      {projectSlugs.map((slug) => {
        const p: Project = projects[slug];
        return (
          <Link
            key={slug}
            href={`/work/${slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/30"
          >
            {/* thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden bg-hover">
              {p.heroImage ? (
                <Image
                  src={p.heroImage}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-mono text-[11px] tracking-[0.05em] text-faint">
                    เพิ่มรูปผลงาน
                  </span>
                </div>
              )}
              <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground backdrop-blur">
                {p.category}
              </span>
            </div>

            {/* body */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[19px] font-bold tracking-[-0.01em] text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">
                {p.tagline}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground">
                View Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
