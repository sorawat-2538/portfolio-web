import {
  AppWindow,
  Bot,
  Boxes,
  Braces,
  BrainCircuit,
  Brush,
  ClipboardCheck,
  Code2,
  FileCode2,
  Frame,
  GitBranch,
  Image as ImageIcon,
  MousePointerClick,
  Palette,
  PenTool,
  Search,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";

const ICONS: Record<string, LucideIcon> = {
  Search,
  AppWindow,
  Palette,
  MousePointerClick,
  ClipboardCheck,
  Boxes,
  Workflow,
  Frame,
  PenTool,
  Image: ImageIcon,
  Brush,
  Code2,
  FileCode2,
  Sparkles,
  Bot,
  GitBranch,
  BrainCircuit,
  Braces,
};

export function SkillsGrid() {
  return (
    <div className="mt-7 space-y-8">
      {profile.skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-[16px] font-bold tracking-[-0.01em] text-foreground">
            {group.title}
          </h3>

          <div className="mt-4 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? Sparkles;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3.5 rounded-xl border border-border bg-card px-5 py-3.5"
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0 text-muted-foreground"
                    strokeWidth={1.7}
                  />
                  <span className="text-[15px] text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
