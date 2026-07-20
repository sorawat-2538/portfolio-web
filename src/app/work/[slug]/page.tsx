import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { PlaceholderView } from "@/components/case-study/placeholder-view";
import { PropertyhubAppView } from "@/components/case-study/propertyhub-app-view";
import { EarlyWorkView } from "@/components/case-study/early-work-view";
import {
  getPlaceholder,
  getProject,
  placeholderSlugs,
  projectSlugs,
  type ProjectSlug,
} from "@/data/projects";

// สร้างทุกหน้า case study ตอน build (static) → เร็ว + SEO ดี
// รวมทั้งหน้า placeholder ของงานที่ยังไม่มี case study เต็ม
export function generateStaticParams() {
  return [...projectSlugs, ...placeholderSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug) ?? getPlaceholder(slug);
  if (!project) return {};
  return {
    title: `${project.title} — S.Tunaram`,
    description: project.tagline,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProject(slug);
  if (project) {
    return <CaseStudyView slug={slug as ProjectSlug} project={project} />;
  }

  const placeholder = getPlaceholder(slug);
  if (placeholder) {
    // Propertyhub App มี case study เต็มแบบเฉพาะ (โครง app + design system + screens by tab)
    if (slug === "propertyhub-app") {
      return <PropertyhubAppView project={placeholder} />;
    }
    // Early Work — คลังงานเก่า render เป็น gallery แบ่งหมวด
    if (slug === "early-work") {
      return <EarlyWorkView />;
    }
    return <PlaceholderView project={placeholder} />;
  }

  notFound();
}
