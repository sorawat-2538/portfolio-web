import {
  AppWindow,
  ClipboardList,
  Code2,
  Component,
  Focus,
  Layers,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";

// map ชื่อไอคอน (string ใน profile.ts) → component จริงของ lucide
// หมายเหตุ: lucide เอา brand icon (Figma ฯลฯ) ออกแล้ว — ใช้ไอคอนทั่วไปแทน
const ICONS: Record<string, LucideIcon> = {
  AppWindow,
  Layers,
  Component,
  Focus,
  ClipboardList,
  Figma: PenTool,
  PenTool,
  Sparkles,
  Code2,
};

export function SkillsGrid() {
  return (
    <div className="mt-7 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
      {profile.skills.map((skill) => {
        const Icon = ICONS[skill.icon] ?? AppWindow;
        return (
          <div
            key={skill.label}
            className="flex items-center gap-4 rounded-[14px] border border-foreground bg-background px-5 py-4 text-foreground"
          >
            <Icon className="h-[22px] w-[22px] shrink-0" strokeWidth={1.7} />
            <span className="text-[15px] font-medium">{skill.label}</span>
          </div>
        );
      })}
    </div>
  );
}
