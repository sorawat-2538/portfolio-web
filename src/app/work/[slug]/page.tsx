import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { PlaceholderView } from "@/components/case-study/placeholder-view";
import { PropertyhubAppView } from "@/components/case-study/propertyhub-app-view";
import { EarlyWorkView } from "@/components/case-study/early-work-view";
import { DataAnalysisView } from "@/components/case-study/data-analysis-view";
import { PropertyosView } from "@/components/case-study/propertyos-view";
import {
  getPlaceholder,
  getProject,
  navOrderSlugs,
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
  // งานที่ไม่ได้อยู่ในเมนู sidebar (ai-copilot / brand / market-insight / rentos / baandee)
  // ยังเปิดด้วย URL ตรงได้เหมือนเดิม แต่ไม่ต้องให้ search engine เก็บไปแสดง
  // เพราะเนื้อหายังเป็นร่างที่ยังไม่ได้ตรวจ — เอา noindex ออกเมื่อพร้อมเปิดจริง
  const inMenu = navOrderSlugs.includes(slug);
  return {
    title: `${project.title} — S.Tunaram`,
    description: project.tagline,
    ...(inMenu ? {} : { robots: { index: false, follow: false } }),
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
    // Data Analysis — 2 workflow การใช้ AI ขุด data (เนื้อหาที่ย้ายออกจาก Propertyhub)
    if (slug === "data-analysis") {
      return <DataAnalysisView project={placeholder} />;
    }
    // PropertyOS — 2 ฟีเจอร์ที่รับผิดชอบ: Chat System + Website Builder
    if (slug === "propertyos") {
      return <PropertyosView project={placeholder} />;
    }
    return <PlaceholderView slug={slug} project={placeholder} />;
  }

  notFound();
}
